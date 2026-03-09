import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = userData.user.id;

    // Check admin role
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { talepId, mesaj } = await req.json();

    if (!talepId || !mesaj) {
      return new Response(JSON.stringify({ error: "Missing talepId or mesaj" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get talep info
    const { data: talep } = await adminClient
      .from("talepler")
      .select("*")
      .eq("id", talepId)
      .single();

    if (!talep) {
      return new Response(JSON.stringify({ error: "Talep not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get customer email from profiles
    const { data: profile } = await adminClient
      .from("profiles")
      .select("email, firma_adi")
      .eq("user_id", talep.user_id)
      .single();

    if (!profile?.email) {
      return new Response(JSON.stringify({ error: "Customer email not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email
    const emailResponse = await resend.emails.send({
      from: Deno.env.get("RESEND_FROM_EMAIL") || "Hammaddem <noreply@hammaddem.co>",
      to: [profile.email],
      subject: `Teklif: #${talep.talep_no}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #e8620a; margin-bottom: 4px;">Yeni Teklif</h2>
          <p style="color: #666; font-size: 14px;">Merhaba ${profile.firma_adi || ""},</p>
          <p style="font-size: 14px; color: #333;">
            <strong>#${talep.talep_no}</strong> numaralı talebiniz için teklif hazırlandı:
          </p>
          <div style="background: #f8f8f8; border-left: 3px solid #e8620a; padding: 16px; margin: 16px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #333;">${mesaj}</p>
          </div>
          <table style="width: 100%; font-size: 13px; color: #555; margin: 16px 0;">
            <tr><td style="padding: 4px 0;"><strong>Malzeme:</strong></td><td>${talep.malzeme || talep.kategori}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Miktar:</strong></td><td>${talep.miktar} ${talep.birim}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Teslimat İli:</strong></td><td>${talep.teslimat_ili || "—"}</td></tr>
          </table>
          <p style="font-size: 13px; color: #999;">Detaylar için panele giriş yapabilirsiniz.</p>
        </div>
      `,
    });

    console.log("Teklif email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error sending teklif email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
