import { Phone } from "lucide-react";
import { useLocation } from "react-router-dom";

// Mobil yapışkan "Hemen Ara" çubuğu — trafiğin çoğu mobilden geliyor,
// numara ekranın altında her an tek dokunuş uzaklıkta durur.
const CallBar = () => {
  const { pathname } = useLocation();
  const hiddenPaths = ["/dashboard", "/giris", "/kayit", "/yazgan", "/sifre-sifirla"];
  if (hiddenPaths.some((p) => pathname.startsWith(p))) return null;

  return (
    <a
      href="tel:+905393308617"
      className="md:hidden fixed bottom-0 inset-x-0 z-[210] flex items-center justify-center gap-2 bg-primary text-primary-foreground text-[15px] font-bold py-3.5 pb-[calc(0.875rem+env(safe-area-inset-bottom))] shadow-[0_-2px_12px_rgba(0,0,0,.12)] no-underline"
    >
      <Phone size={18} /> Hemen Ara: 0539 330 86 17
    </a>
  );
};

export default CallBar;
