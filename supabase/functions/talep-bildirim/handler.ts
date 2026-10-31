export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

export interface MemberTalep {
  id: string;
  talep_no: string;
  kategori: string;
  malzeme: string | null;
  miktar: number;
  birim: string;
  teslimat_ili: string | null;
  adres: string | null;
  teslimat_tarihi: string | null;
  aciliyet: string;
  hizmet_tipi: string;
  tekrarli: boolean;
  not_text: string | null;
  created_at: string;
  firma_adi: string | null;
  email: string | null;
  telefon: string | null;
}
interface Dependencies {
  getUserId: (token: string) => Promise<string | null>;
  loadTalep: (id: string, userId: string) => Promise<MemberTalep | null>;
  notify: (talep: MemberTalep) => Promise<void>;
  now?: () => number;
}

// Only fresh requests are announced, so the endpoint cannot be used to resend old ones.
const WINDOW = 10 * 60 * 1000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function createMemberTalepNotifyHandler(deps: Dependencies) {
  const sent = new Set<string>();
  const json = (body: object, status = 200) => new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
  return async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (req.method !== "POST") return json({ error: "Yalnızca POST isteği kabul edilir." }, 405);
    const auth = req.headers.get("Authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
    const userId = token ? await deps.getUserId(token).catch(() => null) : null;
    if (!userId) return json({ error: "Oturum doğrulanamadı." }, 401);

    let talepId: unknown;
    try { talepId = (await req.json())?.talepId; } catch { /* aşağıda reddedilir */ }
    if (typeof talepId !== "string" || !UUID.test(talepId)) return json({ error: "Geçersiz talep." }, 400);

    const talep = await deps.loadTalep(talepId, userId);
    if (!talep) return json({ error: "Talep bulunamadı." }, 404);
    const age = (deps.now?.() ?? Date.now()) - new Date(talep.created_at).getTime();
    if (sent.has(talep.id) || !(age >= 0 && age <= WINDOW)) return json({ sent: false });

    sent.add(talep.id);
    try {
      await deps.notify(talep);
    } catch (err) {
      sent.delete(talep.id);
      console.error("Üye talep bildirimi gönderilemedi:", err);
      return json({ error: "Bildirim gönderilemedi." }, 502);
    }
    return json({ sent: true });
  };
}

const escapeHtml = (v: unknown): string =>
  String(v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const aciliyetEtiketi: Record<string, string> = { normal: "🟢 Normal", acil: "🟡 Acil", cok_acil: "🔴 Çok Acil" };
const kategoriEtiketi: Record<string, string> = { insaat: "Hafriyat & İnşaat", hafriyat: "Hafriyat & İnşaat", silobas: "Silobas" };

export function buildMemberTalepEmail(talep: MemberTalep): { subject: string; html: string } {
  const satirlar: Array<[string, unknown]> = [
    ["Firma", talep.firma_adi],
    ["E-posta", talep.email],
    ["Hizmet", talep.hizmet_tipi === "nakliye" ? "🚛 Sadece Nakliye" : "📦 Satın Alma"],
    ["Kategori", kategoriEtiketi[talep.kategori] ?? talep.kategori],
    ["Malzeme", talep.malzeme],
    ["Miktar", `${talep.miktar} ${talep.birim}`],
    ["Teslimat İli", talep.teslimat_ili],
    ["Adres", talep.adres],
    ["İstenen Tarih", talep.teslimat_tarihi],
    ["Aciliyet", aciliyetEtiketi[talep.aciliyet] ?? talep.aciliyet],
    ["Tekrar", talep.tekrarli ? "🔄 Aylık" : null],
    ["Not", talep.not_text],
  ];
  const telefon = talep.telefon || "";
  const ozet = [talep.malzeme, `${talep.miktar} ${talep.birim}`, talep.teslimat_ili].filter(Boolean).join(" · ");
  const html = `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #e8620a; margin: 0 0 4px;">🔔 Yeni Üye Talebi</h2>
      <p style="margin: 0 0 16px; font-size: 13px; color: #888;">
        Takip no: <strong style="color: #333;">#${escapeHtml(talep.talep_no)}</strong>
      </p>
      ${telefon ? `<a href="tel:${escapeHtml(telefon)}"
         style="display: inline-block; background: #e8620a; color: #fff; text-decoration: none;
                font-size: 16px; font-weight: bold; padding: 12px 20px; border-radius: 8px; margin-bottom: 16px;">
        📞 ${escapeHtml(telefon)}
      </a>` : ""}
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #333;">
        ${satirlar
          .filter(([, v]) => v !== null && v !== undefined && v !== "")
          .map(([k, v]) => `
          <tr>
            <td style="padding: 7px 0; color: #777; width: 130px; border-bottom: 1px solid #eee;">${escapeHtml(k)}</td>
            <td style="padding: 7px 0; font-weight: 600; border-bottom: 1px solid #eee;">${escapeHtml(v)}</td>
          </tr>`)
          .join("")}
      </table>
      <p style="font-size: 12px; color: #999; margin-top: 20px;">
        Talebi panelden yönetmek için: <a href="https://hammaddem.co/admin" style="color: #e8620a;">hammaddem.co/admin</a>
      </p>
    </div>
  `;
  return { subject: `🔔 Yeni üye talebi #${talep.talep_no} · ${ozet}`, html };
}
