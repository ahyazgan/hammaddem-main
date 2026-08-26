import { Phone, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { whatsappUrl } from "./WhatsAppButton";

// Mobil yapışkan iletişim çubuğu — trafiğin çoğu mobilden geliyor,
// WhatsApp ve arama ekranın altında her an tek dokunuş uzaklıkta durur.
// Numara "Ara" butonunda açıkça yazar: kullanıcı aramadan da not alabilir.
const CallBar = () => {
  const { pathname } = useLocation();
  const hiddenPaths = ["/dashboard", "/giris", "/kayit", "/yazgan", "/sifre-sifirla"];
  if (hiddenPaths.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-[210] flex gap-2 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] bg-background/95 backdrop-blur border-t border-border shadow-[0_-2px_12px_rgba(0,0,0,.08)]">
      <a
        href={whatsappUrl(pathname)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile yazın"
        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white text-[15px] font-bold py-3 no-underline active:opacity-90"
      >
        <MessageCircle size={18} fill="white" strokeWidth={0} /> WhatsApp
      </a>
      <a
        href="tel:+905393308617"
        aria-label="Hemen ara: 0539 330 86 17"
        className="flex-[1.35] flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground text-[15px] font-bold py-3 no-underline active:opacity-90"
      >
        <Phone size={18} /> 0539 330 86 17
      </a>
    </div>
  );
};

export default CallBar;
