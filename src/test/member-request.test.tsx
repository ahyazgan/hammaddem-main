import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import NewRequestWizard from "@/components/dashboard/NewRequestWizard";
import { buildMemberTalepEmail, createMemberTalepNotifyHandler, type MemberTalep } from "../../supabase/functions/talep-bildirim/handler";

const mocks = vi.hoisted(() => ({ invoke: vi.fn(), from: vi.fn(), rpc: vi.fn(), toast: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: mocks.invoke }, from: mocks.from, rpc: mocks.rpc } }));
vi.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: mocks.toast }), toast: mocks.toast }));
vi.mock("@/contexts/AuthContext", () => ({ useAuth: () => ({ user: { id: "user-1" } }) }));

afterEach(() => { cleanup(); vi.clearAllMocks(); });

const TALEP_ID = "11111111-2222-4333-8444-555555555555";
const NOW = Date.parse("2026-11-01T10:00:00Z");
const talep: MemberTalep = {
  id: TALEP_ID, talep_no: "HMD-2026-0100", kategori: "insaat", malzeme: "Kum", miktar: 100, birim: "Ton",
  teslimat_ili: "İstanbul", adres: "Tuzla <OSB>", teslimat_tarihi: null, aciliyet: "acil", hizmet_tipi: "satin_alma",
  tekrarli: false, not_text: null, created_at: new Date(NOW - 60_000).toISOString(),
  firma_adi: null, email: "musteri@example.com", telefon: "05551234567",
};
const post = (body: unknown, token = "user-token") => new Request("https://example.test", {
  method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body),
});
function setup(record: MemberTalep | null = talep) {
  const deps = {
    getUserId: vi.fn().mockImplementation(async (token: string) => token === "user-token" ? "user-1" : null),
    loadTalep: vi.fn().mockResolvedValue(record),
    notify: vi.fn().mockResolvedValue(undefined),
    now: () => NOW,
  };
  return { ...deps, handler: createMemberTalepNotifyHandler(deps) };
}

describe("member request notification endpoint", () => {
  it("emails the team once for the caller's fresh request", async () => {
    const api = setup();
    const first = await api.handler(post({ talepId: TALEP_ID }));
    expect(first.status).toBe(200);
    expect(await first.json()).toEqual({ sent: true });
    expect(api.loadTalep).toHaveBeenCalledWith(TALEP_ID, "user-1");
    expect(await (await api.handler(post({ talepId: TALEP_ID }))).json()).toEqual({ sent: false });
    expect(api.notify).toHaveBeenCalledTimes(1);
  });

  it("rejects missing sessions, malformed ids and other users' requests without emailing", async () => {
    const api = setup(null);
    expect((await api.handler(new Request("https://example.test", { method: "POST", body: "{}" }))).status).toBe(401);
    expect((await api.handler(post({ talepId: TALEP_ID }, "stranger"))).status).toBe(401);
    expect((await api.handler(post({ talepId: "1; drop table" }))).status).toBe(400);
    expect((await api.handler(post({ talepId: TALEP_ID }))).status).toBe(404);
    expect((await api.handler(new Request("https://example.test", { method: "OPTIONS" }))).headers.get("Access-Control-Allow-Methods")).toContain("POST");
    expect(api.notify).not.toHaveBeenCalled();
  });

  it("does not announce old requests again", async () => {
    const api = setup({ ...talep, created_at: new Date(NOW - 11 * 60_000).toISOString() });
    expect(await (await api.handler(post({ talepId: TALEP_ID }))).json()).toEqual({ sent: false });
    expect(api.notify).not.toHaveBeenCalled();
  });

  it("reports a failed email and allows a retry", async () => {
    const api = setup();
    api.notify.mockRejectedValueOnce(new Error("Resend 500"));
    expect((await api.handler(post({ talepId: TALEP_ID }))).status).toBe(502);
    expect(await (await api.handler(post({ talepId: TALEP_ID }))).json()).toEqual({ sent: true });
    expect(api.notify).toHaveBeenCalledTimes(2);
  });

  it("puts a callable phone and escaped customer details in the email", () => {
    const { subject, html } = buildMemberTalepEmail(talep);
    expect(subject).toContain("HMD-2026-0100");
    expect(html).toContain('href="tel:05551234567"');
    expect(html).toContain("Tuzla &lt;OSB&gt;");
    expect(html).toContain("musteri@example.com");
    expect(html).not.toContain("<OSB>");
  });
});

function mockTables(profilePhone: string) {
  const profileUpdate = vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) });
  const talepInsert = vi.fn().mockReturnValue({ select: () => ({ single: async () => ({ data: { id: TALEP_ID }, error: null }) }) });
  mocks.from.mockImplementation((table: string) => table === "profiles"
    ? { select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { telefon: profilePhone } }) }) }), update: profileUpdate }
    : { insert: talepInsert });
  mocks.rpc.mockResolvedValue({ data: "HMD-2026-0100" });
  mocks.invoke.mockResolvedValue({ data: { sent: true }, error: null });
  return { profileUpdate, talepInsert };
}
function fillDetails() {
  fireEvent.click(screen.getByText("Hafriyat & İnşaat"));
  fireEvent.click(screen.getByRole("button", { name: /Devam/ }));
  const [material, , city] = screen.getAllByRole("combobox");
  fireEvent.change(material, { target: { value: "Kum" } });
  fireEvent.change(city, { target: { value: "İstanbul" } });
}

describe("member request wizard", () => {
  it("requires a phone, saves it to the profile and notifies the team after saving", async () => {
    const { profileUpdate, talepInsert } = mockTables("");
    render(<NewRequestWizard />);
    fillDetails();
    const summary = screen.getByRole("button", { name: /Özet/ });
    expect(summary).toBeDisabled();
    fireEvent.change(screen.getByLabelText("TELEFON"), { target: { value: "0555 12" } });
    expect(summary).toBeDisabled();
    expect(screen.getByText(/Geçerli bir cep telefonu/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("TELEFON"), { target: { value: "+90 555 123 45 67" } });
    fireEvent.click(summary);
    expect(screen.getByText("0555 123 4567")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Gönder/ }));
    expect(await screen.findByText("Talep Alındı")).toBeInTheDocument();
    expect(profileUpdate).toHaveBeenCalledWith({ telefon: "05551234567" });
    expect(talepInsert).toHaveBeenCalledWith(expect.objectContaining({ user_id: "user-1", malzeme: "Kum", teslimat_ili: "İstanbul" }));
    expect(mocks.invoke).toHaveBeenCalledWith("talep-bildirim", { body: { talepId: TALEP_ID } });
  });

  it("prefills a saved phone and does not rewrite the profile", async () => {
    const { profileUpdate } = mockTables("05321234567");
    render(<NewRequestWizard />);
    fillDetails();
    await waitFor(() => expect(screen.getByLabelText("TELEFON")).toHaveValue("0532 123 4567"));
    fireEvent.click(screen.getByRole("button", { name: /Özet/ }));
    fireEvent.click(screen.getByRole("button", { name: /Gönder/ }));
    expect(await screen.findByText("Talep Alındı")).toBeInTheDocument();
    expect(profileUpdate).not.toHaveBeenCalled();
    expect(mocks.invoke).toHaveBeenCalledWith("talep-bildirim", { body: { talepId: TALEP_ID } });
  });
});
