import { MessageCircle, Phone } from "lucide-react";

// Talep kaydı başarısız olduğunda gösterilir; müşteri aynı bilgileri WhatsApp'tan iletir.
export default function QuoteFallback({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <div role="alert" className="mt-3 rounded-[10px] border border-destructive/30 bg-destructive/5 p-3 text-left">
      <p className="text-[13px] font-bold text-foreground mb-1">Talebinizi WhatsApp'tan iletin</p>
      <p className="text-[11px] md:text-xs text-txt-2 leading-relaxed mb-2.5">
        Form şu an talebinizi kaydedemedi. Girdiğiniz bilgiler WhatsApp'ta hazır mesaj olarak açılır; göndermeniz yeterli.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-[9px] bg-[#25D366] text-white text-[13px] font-bold py-2.5 no-underline hover:opacity-90"
        >
          <MessageCircle size={16} fill="white" strokeWidth={0} aria-hidden="true" /> WhatsApp ile gönder
        </a>
        <a
          href="tel:+905393308617"
          className="flex-1 flex items-center justify-center gap-2 rounded-[9px] border-[1.5px] border-border2 bg-background text-foreground text-[13px] font-semibold py-2.5 no-underline hover:border-primary hover:text-primary"
        >
          <Phone size={16} aria-hidden="true" /> 0539 330 86 17
        </a>
      </div>
    </div>
  );
}
