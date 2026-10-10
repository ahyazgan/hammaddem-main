import type { QuoteTerms } from "@/lib/quote-terms";

export default function QuoteTermsFields({ value, onChange, disabled }: { value: QuoteTerms; onChange: (value: QuoteTerms) => void; disabled: boolean }) {
  const fieldClass = "mt-1 w-full bg-[#111520] border border-[#30364a] rounded-lg px-3 py-2 text-base text-[#e8eaf0] focus:outline-none focus:border-[#e8620a]";
  return <fieldset disabled={disabled} className="space-y-3 mb-3 text-xs text-[#b4bdd0]">
    <legend className="sr-only">Teklif koşulları</legend>
    <label className="block">Fiyat türü<select className={fieldClass} value={value.priceBasis} onChange={e => onChange({ ...value, priceBasis: e.target.value as QuoteTerms["priceBasis"] })}><option value="unit">Birim fiyat</option><option value="total">İşin toplam fiyatı</option></select></label>
    <label className="block">KDV<select className={fieldClass} value={value.vat} onChange={e => onChange({ ...value, vat: e.target.value as QuoteTerms["vat"] })}><option value="unspecified">Seçin</option><option value="included">Dahil</option><option value="excluded">Hariç</option></select></label>
    {([
      ["scope", "Teklife dahil", "Malzeme, nakliye, yükleme gibi dahil olan kalemler"],
      ["exclusions", "Kapsam dışı / ek ücretler", "Bekleme, döküm, boşaltma vb. Yoksa “Ek ücret yok” yazın."],
      ["delivery", "Teslimat koşulları", "Planlanan tarih, saha erişimi ve boşaltma koşulları"],
      ["payment", "Ödeme koşulları", "Ödeme zamanı ve yöntemi"],
    ] as const).map(([key, label, placeholder]) => <label key={key} className="block">{label}<textarea maxLength={1500} rows={2} className={fieldClass} value={value[key]} placeholder={placeholder} onChange={e => onChange({ ...value, [key]: e.target.value })} /></label>)}
    <label className="block">Geçerlilik tarihi<input type="date" className={fieldClass} value={value.validUntil} onChange={e => onChange({ ...value, validUntil: e.target.value })} /></label>
    <p>Bu alanlar müşteriye görünür. Yalnızca bu işe ait teklif koşullarını yazın; özel şirket içi not eklemeyin.</p>
  </fieldset>;
}
