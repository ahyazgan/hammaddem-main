import { Phone, MessageCircle, FileText } from "lucide-react";
import { readQuoteTerms, quoteExpired, quoteTotal } from "@/lib/quote-terms";

interface Props {
  request: { talep_no: string; teklif_fiyat?: number | null; teklif_detaylari?: unknown; miktar: number; birim: string; durum: string };
}

export default function QuoteSummary({ request }: Props) {
  const price = request.teklif_fiyat;
  if (price == null || !Number.isFinite(price) || price <= 0) return null;
  const terms = readQuoteTerms(request.teklif_detaylari);
  const expired = quoteExpired(terms);
  const active = request.durum === "teklif";
  const currency = (value: number) => value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const message = `${request.talep_no} numaralı talebimin ${expired ? "teklifini güncellemek" : "teklif kapsamını ve teslimat koşullarını görüşmek"} istiyorum.`;
  return (
    <section aria-label="Teklif özeti" className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-foreground">
      <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wide"><FileText size={16} /> Teklif özeti</div>
      <p className="mt-3 text-2xl font-bold break-words">{currency(price)} ₺ {terms.priceBasis === "unit" && <span className="text-sm font-normal">/ {request.birim}</span>}</p>
      <p className="text-sm mt-1">{terms.priceBasis === "unit" ? "Miktara göre tahmini tutar" : "Toplam teklif tutarı"}: <strong>{currency(quoteTotal(price, request.miktar, terms))} ₺</strong></p>
      <p className="text-xs text-txt-2 mt-1">{terms.vat === "included" ? "KDV dahil." : terms.vat === "excluded" ? "KDV hariç; vergi ilavesiyle ödenecek tutar değişir." : "KDV bilgisi belirtilmemiş; ekibimizle teyit edin."}</p>
      <dl className="mt-4 space-y-3 text-sm">
        {[
          ["Teklife dahil", terms.scope], ["Kapsam dışı / ek ücretler", terms.exclusions],
          ["Teslimat koşulları", terms.delivery], ["Ödeme koşulları", terms.payment],
        ].map(([label, value]) => <div key={label}><dt className="font-semibold">{label}</dt><dd className="text-txt-2 whitespace-pre-wrap break-words mt-0.5">{value || "Belirtilmedi; onay öncesinde teyit edin."}</dd></div>)}
        <div><dt className="font-semibold">Geçerlilik</dt><dd className="text-txt-2">{terms.validUntil ? `${new Date(`${terms.validUntil}T12:00:00+03:00`).toLocaleDateString("tr-TR")} gün sonuna kadar (Türkiye saati)` : "Belirtilmedi; güncel fiyatı teyit edin."}</dd></div>
      </dl>
      {active && <>
        <p className={`mt-4 text-sm ${expired ? "text-amber-800" : "text-txt-2"}`}>{expired ? "Bu teklifin geçerlilik süresi doldu. Güncel fiyat ve uygunluk için ekibimize ulaşın." : "Teklif ve teslimat planını görüşmek için bize ulaşın. Talep oluşturmak veya bu bağlantıları açmak sipariş onayı değildir."}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <a href="tel:+905393308617" className="inline-flex items-center gap-2 bg-primary text-white rounded-lg px-3 py-2 text-sm font-semibold"><Phone size={16} /> Teklifi görüş</a>
          <a href={`https://wa.me/905393308617?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border bg-background rounded-lg px-3 py-2 text-sm font-semibold"><MessageCircle size={16} /> WhatsApp</a>
        </div>
      </>}
    </section>
  );
}
