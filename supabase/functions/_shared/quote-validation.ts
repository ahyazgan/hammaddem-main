export function cleanPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("0090")) digits = digits.slice(4);
  else if (digits.startsWith("90") && digits.length === 12) digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith("5")) digits = `0${digits}`;
  return digits;
}

export const isValidPhone = (value: string): boolean => /^05\d{9}$/.test(cleanPhone(value));
export const isValidQuantity = (value: number | string): boolean =>
  String(value).trim() !== "" && Number.isFinite(Number(value)) && Number(value) > 0;

export function todayInTurkey(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);
}

export function isValidDeliveryDate(value: string, today = todayInTurkey()): boolean {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value && value >= today;
}

export interface GuestQuote {
  kategori: "silobas" | "hafriyat";
  malzeme: string;
  miktar: number;
  birim: string;
  teslimat_ili: string;
  adres: string;
  yuk_adres: string | null;
  teslimat_tarihi: string | null;
  aciliyet: "normal" | "acil" | "cok_acil";
  hizmet_tipi: "satin_alma" | "nakliye";
  not_text: string | null;
  telefon: string;
}

export function validateGuestQuote(input: unknown): GuestQuote {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Geçersiz talep bilgisi.");
  const body = input as Record<string, unknown>;
  const text = (key: string, max: number, required = false): string => {
    const value = body[key];
    if (value != null && typeof value !== "string") throw new Error("Alanların biçimi geçersiz.");
    const result = ((value as string) || "").trim();
    if (result.length > max) throw new Error("Giriş değerleri çok uzun.");
    if (required && !result) throw new Error("Malzeme, il, adres ve telefon alanlarını doldurun.");
    return result;
  };
  const kategori = text("kategori", 20, true);
  const hizmet_tipi = text("hizmet_tipi", 20, true);
  const aciliyet = text("aciliyet", 20) || "normal";
  const birim = text("birim", 20, true);
  if (!["silobas", "hafriyat"].includes(kategori) || !["satin_alma", "nakliye"].includes(hizmet_tipi)
    || !["normal", "acil", "cok_acil"].includes(aciliyet) || !["Ton", "m³", "Adet", "Kamyon"].includes(birim)) {
    throw new Error("Hizmet, kategori veya birim geçersiz.");
  }
  if (typeof body.miktar !== "number" || !isValidQuantity(body.miktar)) throw new Error("Miktar sıfırdan büyük olmalıdır.");
  const telefon = text("telefon", 30, true);
  if (!isValidPhone(telefon)) throw new Error("Geçerli bir cep telefonu numarası girin.");
  const teslimat_tarihi = text("teslimat_tarihi", 10);
  if (!isValidDeliveryDate(teslimat_tarihi)) throw new Error("Bugün veya sonraki bir tarih seçin.");
  const yuk_adres = text("yuk_adres", 500, hizmet_tipi === "nakliye");
  return {
    kategori: kategori as GuestQuote["kategori"], hizmet_tipi: hizmet_tipi as GuestQuote["hizmet_tipi"],
    aciliyet: aciliyet as GuestQuote["aciliyet"], birim, miktar: body.miktar,
    malzeme: text("malzeme", 200, true), teslimat_ili: text("teslimat_ili", 80, true),
    adres: text("adres", 500, true), yuk_adres: yuk_adres || null,
    teslimat_tarihi: teslimat_tarihi || null, not_text: text("not_text", 2000) || null,
    telefon: cleanPhone(telefon),
  };
}
