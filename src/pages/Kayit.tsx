import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.svg";
import { formatPhone, isValidPhone, cleanPhone } from "@/utils/phone";

const Kayit = () => {
  const [firmaAdi, setFirmaAdi] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setTelefon(formatted);
    if (phoneError) setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhone(telefon)) {
      setPhoneError("Geçerli bir telefon numarası girin (05XX XXX XXXX)");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, { firma_adi: firmaAdi, telefon: cleanPhone(telefon) });
    setLoading(false);

    if (error) {
      toast({ title: "Kayıt başarısız", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Kayıt başarılı", description: "E-posta adresinize doğrulama linki gönderildi." });
      navigate("/giris");
    }
  };

  return (
    <>
    <Helmet>
      <title>Kayıt Ol – Hammaddem</title>
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href="https://hammaddem.co/kayit" />
    </Helmet>
    <div className="min-h-screen bg-off flex items-center justify-center px-3 sm:px-4 py-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-5 sm:mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <img src={logo} alt="Hammaddem" className="h-8 sm:h-9 w-auto" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Kayıt Ol</h1>
          <p className="text-muted-foreground mt-1.5 sm:mt-2 text-xs sm:text-sm">Yeni hesap oluşturun</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-elevated">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-1.5 block">Firma Adı</label>
              <input
                type="text"
                value={firmaAdi}
                onChange={(e) => setFirmaAdi(e.target.value)}
                placeholder="Firma adınız"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-1.5 block">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@firma.com"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-1.5 block">Telefon</label>
              <input
                type="tel"
                value={telefon}
                onChange={handlePhoneChange}
                placeholder="05XX XXX XXXX"
                required
                maxLength={13}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${phoneError ? "border-destructive" : "border-input"}`}
              />
              {phoneError && <p className="text-[11px] text-destructive mt-1">{phoneError}</p>}
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-1.5 block">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
            </button>
          </div>

          <div className="flex items-center gap-3 my-4 sm:my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground font-medium">veya</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            type="button"
            onClick={async () => {
              const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: window.location.origin + "/dashboard" },
              });
              if (error) toast({ title: "Hata", description: error.message, variant: "destructive" });
            }}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.41l3.56-2.77.01-.55z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google ile Kayıt Ol
          </button>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
            Zaten hesabınız var mı?{" "}
            <Link to="/giris" className="text-primary font-medium hover:underline">
              Giriş Yap
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default Kayit;
