import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (per isolate lifetime)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

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

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Çok fazla talep gönderdiniz. Lütfen daha sonra tekrar deneyin." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "3600" },
        }
      );
    }

    const body = await req.json();

    // Validate required fields
    const { kategori, malzeme, miktar, birim, teslimat_ili, adres, yuk_adres, teslimat_tarihi, aciliyet, hizmet_tipi, not_text, telefon } = body;

    if (!kategori || !telefon) {
      return new Response(JSON.stringify({ error: "Kategori ve telefon zorunludur." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Basic phone validation
    const cleanPhone = (telefon || "").replace(/\s/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return new Response(JSON.stringify({ error: "Geçersiz telefon numarası." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Input length validation
    if (kategori.length > 200 || (malzeme && malzeme.length > 200) || (not_text && not_text.length > 2000) || (adres && adres.length > 500)) {
      return new Response(JSON.stringify({ error: "Giriş değerleri çok uzun." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // DB-level rate limit: check recent requests from same phone
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count: recentCount } = await supabase
      .from("misafir_talepler")
      .select("*", { count: "exact", head: true })
      .eq("telefon", cleanPhone)
      .gte("created_at", oneHourAgo);

    if (recentCount !== null && recentCount >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ error: "Bu telefon numarasından çok fazla talep gönderildi. Lütfen daha sonra tekrar deneyin." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "3600" },
        }
      );
    }

    // Generate talep_no
    const { data: talepNo } = await supabase.rpc("generate_misafir_talep_no");
    const generatedNo = talepNo || `HMD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;

    const yeniTalep = {
      talep_no: generatedNo,
      kategori,
      malzeme: malzeme || null,
      miktar: Number(miktar) || 0,
      birim: birim || "Ton",
      teslimat_ili: teslimat_ili || null,
      adres: adres || null,
      yuk_adres: yuk_adres || null,
      teslimat_tarihi: teslimat_tarihi || null,
      aciliyet: aciliyet || "normal",
      hizmet_tipi: hizmet_tipi || "satin_alma",
      not_text: not_text || null,
      telefon: cleanPhone,
      durum: "bekliyor",
    };

    const { data, error } = await supabase
      .from("misafir_talepler")
      .insert(yeniTalep)
      .select("talep_no")
      .single();

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Talep kaydedilemedi." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Talep kaydedildi; bildirim maili başarısız olsa bile müşteriye başarı döneriz.
    await notifyNewTalep({ ...yeniTalep, talep_no: data.talep_no });

    return new Response(JSON.stringify({ talep_no: data.talep_no }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Beklenmeyen hata." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
