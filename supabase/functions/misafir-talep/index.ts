import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createGuestQuoteHandler } from "./handler.ts";

const escapeHtml = (v: unknown): string =>
  String(v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const aciliyetEtiketi: Record<string, string> = {
  normal: "🟢 Normal",
  acil: "🟡 Acil",
  cok_acil: "🔴 Çok Acil",
};

/**
 * Yeni talep düştüğünde işletmeye bildirim maili atar.
 * Mail atılamazsa talep kaydı yine de geçerlidir; hata sadece loglanır.
 */
async function notifyNewTalep(talep: Record<string, unknown>): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("NOTIFY_EMAIL");

  if (!apiKey || !to) {
    console.warn("Bildirim maili atlandı: RESEND_API_KEY veya NOTIFY_EMAIL tanımlı değil.");
    return;
  }

  const satirlar: Array<[string, unknown]> = [
    ["Hizmet", talep.hizmet_tipi === "nakliye" ? "🚛 Sadece Nakliye" : "📦 Satın Alma"],
    ["Kategori", talep.kategori === "silobas" ? "Silobas" : "Hafriyat & İnşaat"],
    ["Malzeme", talep.malzeme],
    ["Miktar", `${talep.miktar} ${talep.birim}`],
    ["Teslimat İli", talep.teslimat_ili],
    ["Teslimat / İş Adresi", talep.adres],
    ["Yükleme Adresi", talep.yuk_adres],
    ["İstenen Tarih", talep.teslimat_tarihi],
    ["Aciliyet", aciliyetEtiketi[String(talep.aciliyet)] ?? talep.aciliyet],
    ["Not", talep.not_text],
  ];

  const telefon = String(talep.telefon ?? "");
  const ozet = [talep.malzeme, `${talep.miktar} ${talep.birim}`, talep.teslimat_ili]
    .filter(Boolean)
    .join(" · ");

  const html = `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #e8620a; margin: 0 0 4px;">🔔 Yeni Talep</h2>
      <p style="margin: 0 0 16px; font-size: 13px; color: #888;">
        Takip no: <strong style="color: #333;">#${escapeHtml(talep.talep_no)}</strong>
      </p>
      <a href="tel:${escapeHtml(telefon)}"
         style="display: inline-block; background: #e8620a; color: #fff; text-decoration: none;
                font-size: 16px; font-weight: bold; padding: 12px 20px; border-radius: 8px; margin-bottom: 16px;">
        📞 ${escapeHtml(telefon)}
      </a>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #333;">
        ${satirlar
          .filter(([, v]) => v !== null && v !== undefined && v !== "")
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 7px 0; color: #777; width: 130px; border-bottom: 1px solid #eee;">${escapeHtml(k)}</td>
            <td style="padding: 7px 0; font-weight: 600; border-bottom: 1px solid #eee;">${escapeHtml(v)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="font-size: 12px; color: #999; margin-top: 20px;">
        Talebi panelden yönetmek için: <a href="https://www.hammaddem.co/admin" style="color: #e8620a;">hammaddem.co/admin</a>
      </p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: Deno.env.get("RESEND_FROM_EMAIL") || "Hammaddem <noreply@hammaddem.co>",
        to: to.split(",").map((a) => a.trim()).filter(Boolean),
        subject: `🔔 Yeni talep #${talep.talep_no} · ${ozet}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Bildirim maili gönderilemedi:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Bildirim maili hatası:", err);
  }
}

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const publicKeys = Object.values(JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") || "{}"))
  .filter((key): key is string => typeof key === "string" && !!key);
const legacyKey = Deno.env.get("SUPABASE_ANON_KEY");
if (legacyKey) publicKeys.push(legacyKey);

declare const EdgeRuntime: { waitUntil: (task: Promise<void>) => void };

Deno.serve(createGuestQuoteHandler({
  publicKeys,
  async recentCount(phone, since) {
    const { count, error } = await supabase.from("misafir_talepler")
      .select("*", { count: "exact", head: true }).eq("telefon", phone).gte("created_at", since);
    if (error || count === null) throw new Error("Talep sıklığı kontrol edilemedi.");
    return count;
  },
  async generateNumber() {
    const { data, error } = await supabase.rpc("generate_misafir_talep_no");
    if (error || !data) throw new Error("Talep numarası üretilemedi.");
    return data;
  },
  async insert(quote) {
    const { data, error } = await supabase.from("misafir_talepler").insert(quote).select("talep_no").single();
    if (error || !data) throw new Error("Talep kaydedilemedi.");
    return data.talep_no;
  },
  notify: quote => notifyNewTalep({ ...quote }),
  // Email cannot delay an acknowledged database write.
  background: typeof EdgeRuntime !== "undefined" ? task => EdgeRuntime.waitUntil(task) : undefined,
}));
