import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import SiparislerimView from "@/components/dashboard/SiparislerimView";

const mocks = vi.hoisted(() => ({ from: vi.fn(), toast: vi.fn() }));
vi.mock("@/contexts/AuthContext", () => ({ useAuth: () => ({ user: { id: "customer-1" } }) }));
vi.mock("@/hooks/use-toast", () => ({ toast: mocks.toast }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: {
  from: mocks.from, channel: () => ({ on: () => ({ subscribe: () => ({}) }) }), removeChannel: vi.fn(),
} }));

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.clearAllMocks(); });
it("keeps the request open and reports a failed cancellation instead of hiding it", async () => {
  vi.spyOn(window, "confirm").mockReturnValue(true);
  const request = { id: "request-1", talep_no: "HMD-TEST", kategori: "silobas", malzeme: "Çimento", miktar: 25, birim: "Ton", durum: "bekliyor", created_at: "2026-10-10", updated_at: "2026-10-10" };
  const updateQuery = { eq: vi.fn(), in: vi.fn(), select: vi.fn(), single: vi.fn().mockResolvedValue({ error: { message: "stale request" } }) };
  updateQuery.eq.mockReturnValue(updateQuery); updateQuery.in.mockReturnValue(updateQuery); updateQuery.select.mockReturnValue(updateQuery);
  const read = vi.fn().mockResolvedValue({ data: [request], error: null });
  mocks.from.mockReturnValue({ select: () => ({ eq: () => ({ order: read }) }), update: () => updateQuery });
  render(<SiparislerimView />);
  fireEvent.click(await screen.findByText("#HMD-TEST"));
  fireEvent.click(screen.getByRole("button", { name: "Talebi İptal Et" }));
  await waitFor(() => expect(mocks.toast).toHaveBeenCalledWith(expect.objectContaining({ title: "Talep iptal edilemedi", variant: "destructive" })));
  expect(screen.getByRole("button", { name: "Talebi İptal Et" })).toBeEnabled();
  expect(updateQuery.eq).toHaveBeenCalledWith("user_id", "customer-1");
  expect(updateQuery.in).toHaveBeenCalledWith("durum", ["bekliyor", "teklif"]);
});
