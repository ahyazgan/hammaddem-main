import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { buildMemberTalepEmail, createMemberTalepNotifyHandler } from "./handler.ts";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

Deno.serve(createMemberTalepNotifyHandler({
  async getUserId(token) {
    const { data, error } = await supabase.auth.getUser(token);
    return error ? null : data.user?.id ?? null;
  },
  async loadTalep(id, userId) {
    const { data: talep } = await supabase.from("talepler")
      .select("id, talep_no, kategori, malzeme, miktar, birim, teslimat_ili, adres, teslimat_tarihi, aciliyet, hizmet_tipi, tekrarli, not_text, created_at")
      .eq("id", id).eq("user_id", userId).maybeSingle();
    if (!talep) return null;
    const { data: profile } = await supabase.from("profiles").select("firma_adi, email, telefon").eq("user_id", userId).maybeSingle();
    return { ...talep, firma_adi: profile?.firma_adi || null, email: profile?.email || null, telefon: profile?.telefon || null };
  },
  async notify(talep) {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    const to = Deno.env.get("NOTIFY_EMAIL");
    if (!apiKey || !to) {
      console.warn("Bildirim maili atlandı: RESEND_API_KEY veya NOTIFY_EMAIL tanımlı değil.");
      return;
    }
    const { subject, html } = buildMemberTalepEmail(talep);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: Deno.env.get("RESEND_FROM_EMAIL") || "Hammaddem <noreply@hammaddem.co>",
        to: to.split(",").map((a) => a.trim()).filter(Boolean),
        subject,
        html,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  },
}));
