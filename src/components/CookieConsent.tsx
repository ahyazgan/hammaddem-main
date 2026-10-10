import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

import { CONSENT_KEY, PREFERENCES_EVENT, saveConsent } from "@/lib/analytics";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try { consent = localStorage.getItem(CONSENT_KEY); } catch { /* Offer a choice when storage is blocked. */ }
    const timer = !consent ? setTimeout(() => setVisible(true), 1500) : undefined;
    const open = () => setVisible(true);
    window.addEventListener(PREFERENCES_EVENT, open);
    return () => { clearTimeout(timer); window.removeEventListener(PREFERENCES_EVENT, open); };
  }, []);

  const accept = () => {
    saveConsent("accepted");
    setVisible(false);
  };

  const reject = () => {
    saveConsent("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="region" aria-label="Analiz tercihi" className="fixed bottom-[68px] md:bottom-0 left-0 right-0 z-[200] p-4 md:p-6 animate-fade-up">
      <div className="max-w-[720px] mx-auto bg-background border border-border rounded-2xl shadow-elevated p-5 md:p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-foreground mb-1">Analiz tercihiniz</h3>
            <p className="text-xs text-txt-2 leading-relaxed mb-4">
              İzin verirseniz ziyaretleri, iletişim tıklamalarını ve teklif adımlarını ölçeriz. Telefon, adres ve talep notlarını analize göndermeyiz. Tercihinizi sayfanın altından değiştirebilirsiniz.{" "}
              <Link to="/cerez-politikasi" className="text-primary hover:underline">
                Çerez Politikamızı
              </Link>{" "}
              inceleyebilirsiniz.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={accept}
                className="min-h-11 px-4 py-2 rounded-lg text-xs font-semibold text-primary-foreground bg-primary shadow-[0_2px_8px_rgba(232,98,10,.28)] hover:bg-accent-hover transition-all"
              >
                Analize İzin Ver
              </button>
              <button
                onClick={reject}
                className="min-h-11 px-4 py-2 rounded-lg text-xs font-semibold text-foreground bg-transparent border border-border hover:bg-off transition-all"
              >
                Yalnızca Gerekli
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
