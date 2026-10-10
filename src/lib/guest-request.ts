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
