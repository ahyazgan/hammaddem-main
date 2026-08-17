import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const COOKIE_KEY = "hammaddem_cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-[60px] md:bottom-0 left-0 right-0 z-[200] p-4 md:p-6 animate-fade-up">
      <div className="max-w-[720px] mx-auto bg-background border border-border rounded-2xl shadow-elevated p-5 md:p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-foreground mb-1">Çerez Kullanımı</h3>
            <p className="text-xs text-txt-2 leading-relaxed mb-4">
              Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz.{" "}
              <Link to="/cerez-politikasi" className="text-primary hover:underline">
                Çerez Politikamızı
              </Link>{" "}
              inceleyebilirsiniz.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={accept}
                className="px-5 py-2 rounded-lg text-xs font-semibold text-primary-foreground bg-primary shadow-[0_2px_8px_rgba(232,98,10,.28)] hover:bg-accent-hover transition-all"
              >
                Kabul Et
              </button>
              <button
                onClick={reject}
                className="px-5 py-2 rounded-lg text-xs font-semibold text-foreground bg-transparent border border-border hover:bg-off transition-all"
              >
                Reddet
              </button>
            </div>
          </div>
          <button
            onClick={reject}
            className="text-txt-3 hover:text-foreground transition-colors shrink-0"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
