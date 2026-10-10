import { validateGuestQuote, type GuestQuote } from "../_shared/quote-validation.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
export type SavedQuote = GuestQuote & { talep_no: string; durum: "bekliyor" };
interface Dependencies {
  publicKeys: string[];
  recentCount: (phone: string, since: string) => Promise<number>;
  generateNumber: () => Promise<string>;
  insert: (quote: SavedQuote) => Promise<string>;
  notify: (quote: SavedQuote) => Promise<void>;
  background?: (task: Promise<void>) => void;
}

const HOUR = 60 * 60 * 1000;
export function createGuestQuoteHandler(deps: Dependencies) {
  const requests = new Map<string, { count: number; expires: number }>();
  const json = (body: object, status = 200) => new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, "Content-Type": "application/json", ...(status === 429 ? { "Retry-After": "3600" } : {}) },
  });
  return async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (req.method !== "POST") return json({ error: "Yalnızca POST isteği kabul edilir." }, 405);
    // Publishable keys are not JWTs. Check the project's public key in the handler.
    if (!deps.publicKeys.length) return json({ error: "Talep servisi yapılandırılamadı." }, 503);
    if (!deps.publicKeys.includes(req.headers.get("apikey") || "")) return json({ error: "Geçersiz proje anahtarı." }, 401);

    const now = Date.now();
    for (const [key, value] of requests) if (value.expires <= now) requests.delete(key);
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("cf-connecting-ip");
    if (ip) {
      const entry = requests.get(ip) || { count: 0, expires: now + HOUR };
      entry.count++;
      requests.set(ip, entry);
      if (entry.count > 5) return json({ error: "Çok fazla talep gönderdiniz. Lütfen bir saat sonra tekrar deneyin." }, 429);
    }
    let quote: GuestQuote;
    try {
      const raw = await req.text();
      if (raw.length > 16000) return json({ error: "Giriş değerleri çok uzun." }, 400);
      quote = validateGuestQuote(JSON.parse(raw));
    } catch (err) {
      return json({ error: err instanceof SyntaxError ? "Geçersiz talep biçimi." : err instanceof Error ? err.message : "Geçersiz talep." }, 400);
    }
    try {
      if (await deps.recentCount(quote.telefon, new Date(now - HOUR).toISOString()) >= 5) {
        return json({ error: "Bu telefon numarasından çok fazla talep gönderildi. Lütfen bir saat sonra tekrar deneyin." }, 429);
      }
      const number = await deps.generateNumber();
      if (!/^HMD-\d{4}-\d+$/.test(number)) throw new Error("Talep numarası üretilemedi.");
      const record: SavedQuote = { ...quote, talep_no: number, durum: "bekliyor" };
      const receipt = await deps.insert(record);
      const notification = deps.notify({ ...record, talep_no: receipt }).catch(err => console.error("Talep bildirim hatası:", err));
      if (deps.background) deps.background(notification);
      else await notification;
      return json({ talep_no: receipt });
    } catch (err) {
      console.error("Talep kayıt hatası:", err);
      return json({ error: "Talep kaydedilemedi. Lütfen tekrar deneyin." }, 500);
    }
  };
}
