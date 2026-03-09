import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const WHATSAPP_NUMBER = "905393308617";
const MESSAGE = "Merhaba, hammadde tedariki hakkında bilgi almak istiyorum.";

const WhatsAppButton = () => {
  const { pathname } = useLocation();
  const hiddenPaths = ["/dashboard", "/giris", "/kayit", "/yazgan", "/sifre-sifirla"];
  if (hiddenPaths.some(p => pathname.startsWith(p))) return null;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,.45)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,.55)] transition-all duration-200"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
};

export default WhatsAppButton;
