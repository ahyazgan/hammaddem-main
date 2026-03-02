import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.svg";

const SifreSifirla = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: "Hata", description: "Şifreler eşleşmiyor.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Hata", description: "Şifre en az 6 karakter olmalıdır.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Şifreniz güncellendi. Giriş yapabilirsiniz." });
      navigate("/giris");
    }
  };

  if (!isRecovery) {
    return (
      <>
        <Helmet>
          <title>Şifre Sıfırla – Hammaddem</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen bg-off flex items-center justify-center px-3 sm:px-4 py-6">
        <div className="w-full max-w-md text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logo} alt="Hammaddem" className="h-8 sm:h-9 w-auto" />
          </Link>
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 shadow-elevated">
            <h1 className="text-xl font-bold text-foreground mb-2">Geçersiz Bağlantı</h1>
            <p className="text-sm text-muted-foreground mb-4">Bu şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.</p>
            <Link to="/giris" className="text-primary font-medium text-sm hover:underline">
              Giriş sayfasına dön →
            </Link>
          </div>
        </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Şifre Sıfırla – Hammaddem</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-off flex items-center justify-center px-3 sm:px-4 py-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-5 sm:mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <img src={logo} alt="Hammaddem" className="h-8 sm:h-9 w-auto" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Yeni Şifre Belirle</h1>
          <p className="text-muted-foreground mt-1.5 text-xs sm:text-sm">Hesabınız için yeni bir şifre oluşturun.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-elevated">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground mb-1 block">Yeni Şifre</label>
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
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground mb-1 block">Şifre Tekrar</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SifreSifirla;
