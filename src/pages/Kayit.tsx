import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.svg";
import { formatPhone, isValidPhone, cleanPhone } from "@/utils/phone";

const getPasswordStrength = (pw: string): { level: number; label: string; color: string } => {
  if (!pw) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Zayıf", color: "bg-red-500" };
  if (score <= 2) return { level: 2, label: "Orta", color: "bg-yellow-500" };
  if (score <= 3) return { level: 3, label: "İyi", color: "bg-blue-500" };
  return { level: 4, label: "Güçlü", color: "bg-green-500" };
};

const Kayit = () => {
  const [firmaAdi, setFirmaAdi] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
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
              {password && (() => {
                const strength = getPasswordStrength(password);
                return (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength.level ? strength.color : "bg-muted"}`} />
                      ))}
                    </div>
                    <p className={`text-[11px] mt-1 ${strength.level <= 1 ? "text-red-500" : strength.level <= 2 ? "text-yellow-500" : strength.level <= 3 ? "text-blue-500" : "text-green-500"}`}>
                      {strength.label}
                    </p>
                  </div>
                );
              })()}
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input accent-primary cursor-pointer"
                required
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                <Link to="/kullanim-kosullari" className="text-primary hover:underline" target="_blank">Kullanım Koşulları</Link>'nı ve{" "}
                <Link to="/gizlilik-politikasi" className="text-primary hover:underline" target="_blank">Gizlilik Politikası</Link>'nı okudum, kabul ediyorum.
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
            </button>
          </div>

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
