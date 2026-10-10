import { createGuestQuoteHandler } from "../../supabase/functions/misafir-talep/handler";
import { cleanPhone, isValidPhone, todayInTurkey, isValidDeliveryDate } from "../../supabase/functions/_shared/quote-validation";

const valid = { kategori: "silobas", malzeme: "Çimento", miktar: 25.5, birim: "Ton", teslimat_ili: "İstanbul", adres: "Beykoz, örnek şantiye", yuk_adres: null, teslimat_tarihi: null, aciliyet: "normal", hizmet_tipi: "satin_alma", not_text: null, telefon: "+90 555 123 45 67" };
const request = (body: unknown = valid, key = "test-publishable") => new Request("https://example.test", { method: "POST", headers: { apikey: key, "Content-Type": "application/json" }, body: JSON.stringify(body) });
function setup() {
  const deps = { publicKeys: ["test-publishable"], recentCount: vi.fn().mockResolvedValue(0), generateNumber: vi.fn().mockResolvedValue("HMD-2026-0001"), insert: vi.fn().mockResolvedValue("HMD-2026-0001"), notify: vi.fn().mockResolvedValue(undefined) };
  return { ...deps, handler: createGuestQuoteHandler(deps) };
}

describe("guest quote endpoint", () => {
  it("persists normalized contact and full addresses before returning a receipt", async () => {
    const api = setup();
    const response = await api.handler(request({ ...valid, hizmet_tipi: "nakliye", yuk_adres: "  Fabrika 1  " }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ talep_no: "HMD-2026-0001" });
    expect(api.insert).toHaveBeenCalledWith(expect.objectContaining({ adres: valid.adres, yuk_adres: "Fabrika 1", telefon: "05551234567", miktar: 25.5, durum: "bekliyor" }));
    expect(api.insert.mock.invocationCallOrder[0]).toBeLessThan(api.notify.mock.invocationCallOrder[0]);
  });
  it.each([null, [], {}, { ...valid, telefon: 123 }, { ...valid, telefon: "12345678901" }, { ...valid, miktar: 0 }, { ...valid, miktar: -2 }, { ...valid, miktar: "25" }, { ...valid, adres: "   " }, { ...valid, adres: "a".repeat(501) }, { ...valid, hizmet_tipi: "nakliye" }, { ...valid, birim: "invalid" }, { ...valid, teslimat_tarihi: "2020-01-01" }])("rejects malformed input without writing: %j", async body => {
    const api = setup();
    expect((await api.handler(request(body))).status).toBe(400);
    expect(api.insert).not.toHaveBeenCalled();
  });
  it("accepts CORS preflight, rejects other methods, missing keys and malformed JSON", async () => {
    const api = setup();
    expect((await api.handler(new Request("https://example.test", { method: "OPTIONS" }))).headers.get("Access-Control-Allow-Methods")).toContain("POST");
    expect((await api.handler(new Request("https://example.test"))).status).toBe(405);
    expect((await api.handler(request(valid, "wrong"))).status).toBe(401);
    expect((await api.handler(new Request("https://example.test", { method: "POST", headers: { apikey: "test-publishable" }, body: "{" }))).status).toBe(400);
    expect(api.insert).not.toHaveBeenCalled();
  });
  it("enforces the persistent phone rate limit", async () => {
    const api = setup(); api.recentCount.mockResolvedValue(5);
    const response = await api.handler(request());
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("3600");
    expect(api.insert).not.toHaveBeenCalled();
  });
  it.each(["recentCount", "generateNumber", "insert"] as const)("does not acknowledge a failed %s", async operation => {
    const api = setup(); api[operation].mockRejectedValue(new Error("database unavailable"));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await api.handler(request())).status).toBe(500);
    expect(api.notify).not.toHaveBeenCalled();
    log.mockRestore();
  });
  it("keeps the successful receipt if the notification fails", async () => {
    const api = setup(); api.notify.mockRejectedValue(new Error("email unavailable"));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await api.handler(request())).status).toBe(200);
    log.mockRestore();
  });
});

it.each(["05551234567", "5551234567", "+90 (555) 123 45 67", "0090 555 1234567"])("normalizes %s consistently", phone => {
  expect(isValidPhone(phone)).toBe(true);
  expect(cleanPhone(phone)).toBe("05551234567");
});
it("uses the Turkish calendar day and rejects nonexistent dates", () => {
  expect(todayInTurkey(new Date("2026-10-10T22:00:00Z"))).toBe("2026-10-11");
  expect(isValidDeliveryDate("2027-02-30", "2026-10-10")).toBe(false);
});
