import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import OrderCard from "@/components/landing/OrderCard";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import AdminTalepler from "@/components/dashboard/admin/AdminTalepler";
import TalepTakip from "@/pages/TalepTakip";
import { createGuestQuoteHandler, type SavedQuote } from "../../supabase/functions/misafir-talep/handler";

const mocks = vi.hoisted(() => ({ invoke: vi.fn(), from: vi.fn(), rpc: vi.fn(), toast: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: mocks.invoke }, from: mocks.from, rpc: mocks.rpc } }));
vi.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: mocks.toast }), toast: mocks.toast }));
vi.mock("@/components/landing/Navbar", () => ({ default: () => null }));
vi.mock("@/components/landing/Footer", () => ({ default: () => null }));

afterEach(() => { cleanup(); vi.clearAllMocks(); });
const renderForm = () => render(<MemoryRouter><OrderCard /></MemoryRouter>);
const fill = (label: RegExp, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
function fillOrder() {
  fireEvent.click(screen.getByRole("button", { name: /Silobas Yükü/ }));
  fireEvent.click(screen.getByRole("button", { name: /Devam Et/ }));
  fireEvent.click(screen.getByRole("button", { name: "Çimento" }));
  fill(/^Miktar \*/, "25.5"); fill(/Teslimat İli/, "İstanbul"); fill(/Teslimat Adresi/, "Beykoz, deneme şantiyesi"); fill(/^Telefon/, "+90 555 123 45 67");
}

it("carries a guest request from the form through persistence, admin pricing and public tracking", async () => {
  let saved: SavedQuote;
  const handler = createGuestQuoteHandler({ publicKeys: ["test"], recentCount: async () => 0, generateNumber: async () => "HMD-2026-0001", insert: async quote => { saved = quote; return quote.talep_no; }, notify: async () => {} });
  mocks.invoke.mockImplementation(async (_name, options) => {
    const response = await handler(new Request("https://example.test", { method: "POST", headers: { apikey: "test" }, body: JSON.stringify(options.body) }));
    return { data: await response.json(), error: null };
  });
  renderForm(); fillOrder();
  fireEvent.click(screen.getByRole("button", { name: /Özete Git/ }));
  expect(screen.getByText("Beykoz, deneme şantiyesi")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Talebi Gönder/ }));
  expect(await screen.findByText("Talebiniz Alındı!")).toBeInTheDocument();
  expect(saved!).toMatchObject({ adres: "Beykoz, deneme şantiyesi", telefon: "05551234567", miktar: 25.5 });
  expect(screen.getByRole("button", { name: /Talebimi Takip Et/ })).toBeInTheDocument();
  cleanup();

  const record = { ...saved!, birim: "m³", id: "test-1", created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  let price: number;
  const eq = vi.fn().mockResolvedValue({ error: null });
  const update = vi.fn().mockImplementation(payload => { price = payload.teklif_fiyat; return { eq }; });
  mocks.from.mockReturnValue({ update });
  render(<AdminTalepler talepler={[]} misafirTalepler={[record]} profiles={{}} onRefresh={vi.fn()} />);
  fireEvent.click(screen.getByText("#HMD-2026-0001"));
  expect(screen.getByText("₺/m³")).toBeInTheDocument();
  fill(/Birim fiyat/, "1250");
  fireEvent.click(screen.getByRole("button", { name: "Teklifi Kaydet" }));
  await waitFor(() => expect(eq).toHaveBeenCalledWith("id", "test-1"));
  expect(mocks.from).toHaveBeenCalledWith("misafir_talepler");
  expect(update).toHaveBeenCalledWith(expect.objectContaining({ teklif_fiyat: 1250, durum: "teklif" }));
  expect(mocks.invoke).toHaveBeenCalledTimes(1); // Guest pricing sends no email.
  cleanup();

  mocks.rpc.mockResolvedValue({ data: [{ ...record, durum: "teklif", teklif_fiyat: price! }], error: null });
  render(<HelmetProvider><MemoryRouter initialEntries={["/talep-takip?talep=HMD-2026-0001"]}><TalepTakip /></MemoryRouter></HelmetProvider>);
  expect(screen.getByLabelText(/Talep Numarası/)).toHaveValue("HMD-2026-0001");
  fill(/Telefon Numarası/, "5551234567");
  fireEvent.click(screen.getByRole("button", { name: /Talep Sorgula/ }));
  expect(await screen.findByText("Teklif Verildi")).toBeInTheDocument();
  expect(screen.getByText("/ m³")).toBeInTheDocument();
  expect(mocks.rpc).toHaveBeenCalledWith("talep_sorgula", { p_telefon: "05551234567", p_talep_no: "HMD-2026-0001" });
});

it("blocks blank address, zero quantity and past date before confirmation", () => {
  renderForm(); fillOrder(); fill(/Teslimat Adresi/, "   "); fill(/^Miktar \*/, "0"); fill(/İstenen Tarih/, "2020-01-01");
  fireEvent.click(screen.getByRole("button", { name: /Özete Git/ }));
  expect(screen.getByText("Lütfen teslimat adresini girin.")).toBeInTheDocument();
  expect(screen.getByText("Miktar sıfırdan büyük olmalıdır.")).toBeInTheDocument();
  expect(screen.getByText("Bugün veya sonraki bir tarih seçin.")).toBeInTheDocument();
  expect(mocks.invoke).not.toHaveBeenCalled();
});

it("keeps the summary on an invalid receipt, then permits a successful retry", async () => {
  mocks.invoke.mockResolvedValueOnce({ data: {}, error: null }).mockResolvedValueOnce({ data: { talep_no: "HMD-2026-0002" }, error: null });
  renderForm(); fillOrder(); fireEvent.click(screen.getByRole("button", { name: /Özete Git/ }));
  fireEvent.click(screen.getByRole("button", { name: /Talebi Gönder/ }));
  await waitFor(() => expect(mocks.toast).toHaveBeenCalledWith(expect.objectContaining({ variant: "destructive" })));
  expect(screen.queryByText("Talebiniz Alındı!")).not.toBeInTheDocument();
  expect(screen.getByText("Beykoz, deneme şantiyesi")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Talebi Gönder/ }));
  expect(await screen.findByText("#HMD-2026-0002")).toBeInTheDocument();
});

it("allows only one pending submission", async () => {
  let resolve: (value: unknown) => void;
  mocks.invoke.mockImplementation(() => new Promise(r => { resolve = r; }));
  renderForm(); fillOrder(); fireEvent.click(screen.getByRole("button", { name: /Özete Git/ }));
  const send = screen.getByRole("button", { name: /Talebi Gönder/ });
  fireEvent.click(send); fireEvent.click(send);
  expect(mocks.invoke).toHaveBeenCalledTimes(1);
  resolve!({ data: { talep_no: "HMD-2026-0003" }, error: null });
  expect(await screen.findByText("#HMD-2026-0003")).toBeInTheDocument();
});

it("includes the work address and pickup location for excavation requests", async () => {
  mocks.invoke.mockResolvedValue({ data: { talep_no: "HMD-2026-0004" }, error: null });
  render(<MemoryRouter><HafriyatTeklifForm defaultIl="İstanbul" /></MemoryRouter>);
  fireEvent.click(screen.getByRole("button", { name: /Temel Kazısı/i }));
  fill(/İlçe \/ İş Adresi/, "Esenyurt, deneme şantiyesi"); fill(/^Telefon/, "05551234567");
  fireEvent.click(screen.getByRole("button", { name: /Ücretsiz Fiyat Teklifi Al/ }));
  expect(await screen.findByText("Talebiniz Alındı!")).toBeInTheDocument();
  expect(mocks.invoke).toHaveBeenCalledWith("misafir-talep", { body: expect.objectContaining({ adres: "Esenyurt, deneme şantiyesi", yuk_adres: "İstanbul / Esenyurt, deneme şantiyesi", birim: "m³" }) });
  expect(screen.getByRole("link", { name: /Talebimi Takip Et/ })).toHaveAttribute("href", "/talep-takip?talep=HMD-2026-0004");
});
