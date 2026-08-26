import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const WHATSAPP_NUMBER = "905393308617";

// Sayfa bağlamına göre mesaj: kireç sayfasından yazan "kireç tedariki",
// Çanakkale hafriyat sayfasından yazan "canakkale hafriyat işi" diye başlar.
const konuFromPath = (pathname: string): string => {
  const seg = pathname.split("/").filter(Boolean);
  const oku = (s: string) => s.replace(/-/g, " ");
  if (seg[0] === "malzeme" && seg[1]) return `${oku(seg[1])} tedariki`;
  if (seg[0] === "hafriyat" && seg[1]) return `${oku(seg[1])} hafriyat işi`;
  if (seg[0] === "hafriyat") return "hafriyat işi";
  if (seg[0] === "hizmetler" && seg[1] === "silobas") return "silobas taşımacılığı";
  if (seg[0] === "hizmetler") return "hafriyat nakliyesi";
  if (seg[0] === "hizmet-bolgeleri" && seg[1]) return `${oku(seg[1])} bölgesinde hammadde tedariki`;
  return "hammadde tedariki";
};

// Sayfa bağlamlı WhatsApp linki — hem masaüstü balonu hem mobil CallBar kullanır.
export const whatsappUrl = (pathname: string): string => {
  const message = `Merhaba, ${konuFromPath(pathname)} hakkında fiyat almak istiyorum.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Masaüstü yüzen balon. Mobilde gizli: orada WhatsApp, CallBar'ın içinde.
const WhatsAppButton = () => {
  const { pathname } = useLocation();
  const hiddenPaths = ["/dashboard", "/giris", "/kayit", "/yazgan", "/sifre-sifirla"];
  if (hiddenPaths.some(p => pathname.startsWith(p))) return null;

  const url = whatsappUrl(pathname);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,.45)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,.55)] transition-all duration-200"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
};

export default WhatsAppButton;
