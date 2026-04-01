import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { formatPhone, isValidPhone, cleanPhone } from "@/utils/phone";

const labelClass = "block text-[10px] font-semibold tracking-[.5px] text-muted-foreground uppercase mb-1";
const inputClass = "w-full bg-muted border border-border rounded-[8px] px-3 py-2.5 text-[13px] text-foreground outline-none focus:border-primary transition-colors";

const ProfilView = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [firmaAdi, setFirmaAdi] = useState("");
  const [telefon, setTelefon] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      if (data) {
        const profile = data as unknown as { firma_adi: string | null; telefon: string | null; email: string | null };
        setFirmaAdi(profile.firma_adi || "");
        setTelefon(profile.telefon || "");
        setEmail(profile.email || user.email || "");
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefon(formatPhone(e.target.value));
    if (phoneError) setPhoneError("");
  };

  const handleSave = async () => {
    if (!user) return;
    if (telefon && !isValidPhone(telefon)) {
      setPhoneError("Geçerli bir telefon numarası girin (05XX XXX XXXX)");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      firma_adi: firmaAdi,
      telefon: cleanPhone(telefon),
      updated_at: new Date().toISOString(),
    }).eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Kaydedildi", description: "Profil bilgileriniz güncellendi." });
    }
  };

  if (loading) return <div className="p-6 text-muted-foreground text-sm">Yükleniyor...</div>;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 lg:px-6 py-4 border-b border-border">
        <h2 className="text-[15px] font-semibold flex items-center gap-2">
          <span className="text-[18px]">👤</span> Profil & Hesap Ayarları
        </h2>
      </div>
      <div className="px-4 lg:px-6 py-5 max-w-[520px]">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>FİRMA ADI</label>
            <input value={firmaAdi} onChange={(e) => setFirmaAdi(e.target.value)} className={inputClass} placeholder="Firma adınız" />
          </div>
          <div>
            <label className={labelClass}>E-POSTA</label>
            <input value={email} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
            <p className="text-[10px] text-muted-foreground mt-1">E-posta değiştirilemez.</p>
          </div>
          <div>
            <label className={labelClass}>TELEFON</label>
            <input
              type="tel"
              value={telefon}
              onChange={handlePhoneChange}
              maxLength={13}
              className={`${inputClass} ${phoneError ? "border-destructive" : ""}`}
              placeholder="05XX XXX XXXX"
            />
            {phoneError && <p className="text-[10px] text-destructive mt-1">{phoneError}</p>}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-[8px] bg-primary text-primary-foreground text-[12px] font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilView;
