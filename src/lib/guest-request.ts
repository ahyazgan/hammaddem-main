import { supabase } from "@/integrations/supabase/client";
import { validateGuestQuote } from "../../supabase/functions/_shared/quote-validation";
export { isValidQuantity, isValidDeliveryDate, todayInTurkey } from "../../supabase/functions/_shared/quote-validation";

export async function submitGuestRequest(input: unknown): Promise<string> {
  const body = validateGuestQuote(input);
  const { data, error } = await supabase.functions.invoke("misafir-talep", { body });
  if (error) {
    const response = error.context;
    if (response instanceof Response && [400, 429].includes(response.status)) {
      const detail = await response.clone().json().catch(() => null);
      if (typeof detail?.error === "string") throw new Error(detail.error);
    }
    throw new Error("Talebinizin kaydı doğrulanamadı. Talep Takip sayfasından kontrol edin veya bizi arayın: 0539 330 86 17.");
  }
  if (typeof data?.talep_no !== "string" || !/^HMD-\d{4}-\d+$/.test(data.talep_no)) {
    throw new Error("Talep numarası alınamadı. Yeniden göndermeden önce Talep Takip sayfasından kontrol edin.");
  }
  return data.talep_no;
}

const aciliyetEtiketi = { normal: "Normal", acil: "Acil", cok_acil: "Çok acil" };

// Kayıt başarısız olursa talep kaybolmasın: aynı bilgiler hazır WhatsApp mesajı olur.
export function guestRequestWhatsappUrl(input: unknown): string {
  let lines = ["Merhaba, siteden teklif talebi gönderemedim. Fiyat almak istiyorum."];
  try {
    const q = validateGuestQuote(input);
    lines = [
      "Merhaba, siteden teklif talebi gönderemedim. Talep bilgilerim:",
      `Hizmet: ${q.hizmet_tipi === "nakliye" ? "Sadece nakliye" : "Malzeme satın alma"}`,
      `Yük tipi: ${q.kategori === "silobas" ? "Silobas" : "Hafriyat & inşaat"}`,
      `Malzeme: ${q.malzeme}`,
      `Miktar: ${q.miktar} ${q.birim}`,
      ...(q.yuk_adres ? [`Yükleme adresi: ${q.yuk_adres}`] : []),
      `Teslimat ili: ${q.teslimat_ili}`,
      `Teslimat adresi: ${q.adres}`,
      ...(q.teslimat_tarihi ? [`İstenen tarih: ${q.teslimat_tarihi.split("-").reverse().join(".")}`] : []),
      `Aciliyet: ${aciliyetEtiketi[q.aciliyet]}`,
      ...(q.not_text ? [`Not: ${q.not_text.slice(0, 500)}`] : []),
      `Telefon: ${q.telefon}`,
    ];
  } catch { /* Eksik bilgiyle bile WhatsApp'a yönlendir. */ }
  return `https://wa.me/905393308617?text=${encodeURIComponent(lines.join("\n"))}`;
}
