import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (per isolate lifetime)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

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

    const { data, error } = await supabase.from("misafir_talepler").insert({
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
    }).select("talep_no").single();

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Talep kaydedilemedi." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
