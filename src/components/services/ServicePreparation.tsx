import { Link } from "react-router-dom";
import { ClipboardList, Truck, MapPinned, ArrowRight } from "lucide-react";
import BrandIcon, { TipperTruckIcon } from "@/components/brand/BrandIcon";

type Service = "silobas" | "hafriyat" | "hammadde";
const guides: Record<Service, { title: string; intro: string; load: string; vehicle: string; site: string; checklist: string[] }> = {
  silobas: {
    title: "Yüke uygun silobas, sahaya uygun plan",
    intro: "Teklif yalnızca kilometreye göre hazırlanmaz. Ürünün özellikleri, yükleme tesisi ve alıcı silosunun koşulları birlikte değerlendirilir.",
    load: "Çimento, uçucu kül, kalsit ve benzeri kuru dökme toz veya uygun granül ürünler. Ürünün teknik özellikleri ve önceki yükle uyumluluğu kontrol edilir.",
    vehicle: "Avrupa tipi çekiciyle kullanılan kuru dökme yük silobası; pnömatik boşaltma donanımı ve ürüne uygun dorse. Sıvı tankerinden farklıdır. İri agrega için damperli araç değerlendirilir.",
    site: "Alıcı silo bağlantısı, hortum mesafesi, boşaltma noktası ve güvenli araç erişimi önceden paylaşılır. Donanım uygunluğu teyit edilmeden boşaltma planı kesinleştirilmez.",
    checklist: ["Ürünün adı, teknik özellikleri ve ton miktarı", "Yükleme tesisi ile teslimat ili / ilçesi", "İstenen tarih ve tesisin çalışma saatleri", "Alıcı silo ve boşaltma bağlantısı bilgileri", "Tek sefer mi, düzenli sevkiyat mı olduğu"],
  },
  hafriyat: {
    title: "Hafriyat nakliyesini sahaya göre planlayalım",
    intro: "Toprağın veya malzemenin türü, saha erişimi ve boşaltma noktası araç seçimini belirler. Hacim hesabı tek başına kesin sefer sayısı vermez.",
    load: "Hafriyat toprağı, uygun inşaat atığı ve agrega ayrı değerlendirilir. Karışık veya içeriği bilinmeyen atığın bileşimi teklif öncesinde açıklanmalıdır.",
    vehicle: "Şantiye erişimine göre damperli kamyon veya Avrupa tipi çekiciye bağlı damperli yarı römork. Hacim kadar malzeme yoğunluğu ve aracın izin verilen yükü de dikkate alınır.",
    site: "Yol genişliği, zemin durumu, manevra ve güvenli damper kaldırma alanı değerlendirilir. Yükleme makinesi, boşaltma noktası ve gerekli belgelerin sorumluluğu teklifte netleştirilir.",
    checklist: ["Malzeme / atık türü ve tahmini m³ veya ton", "Yükleme adresi, giriş genişliği ve saha koşulları", "Boşaltma noktası ve varsa kabul bilgileri", "İş makinesi ihtiyacı ve yükleme sorumlusu", "Çalışma tarihi, saat aralığı ve bekleme koşulları"],
  },
  hammadde: {
    title: "Doğru malzeme, açık teslimat koşulları",
    intro: "Malzeme alımı ile yalnızca nakliye talebini ayırarak başlayın. Ürün özelliklerini ve teklif kapsamını birlikte netleştirelim.",
    load: "Çimento, kum, çakıl, mıcır, kalsit ve diğer hammaddelerde kullanım amacı, tane boyutu veya ürün sınıfı belirtilir. Gerekli teknik belgeler teklif aşamasında talep edilir.",
    vehicle: "Uygun kuru toz ürünlerde silobas, kum ve iri agregada damperli araç değerlendirilir. Ambalajlı ürünlerde farklı yükleme ve araç düzeni gerekebilir.",
    site: "Teslimat adresi, boşaltma imkânı ve kabul saatleri paylaşılır. Nakliye, yükleme, boşaltma, KDV ve tartım esasının fiyata dahil olup olmadığı kontrol edilir.",
    checklist: ["Malzemenin adı, kullanım amacı ve istenen özellikler", "Miktar ve birim; ton ile m³ ayrı belirtilmeli", "Malzeme dahil alım mı, sadece nakliye mi", "Teslimat adresi ve tercih edilen tarih", "İstenen analiz / ürün belgesi ve kabul koşulları"],
  },
};

export default function ServicePreparation({ service }: { service: Service }) {
  const guide = guides[service];
  const cards = [
    { icon: ClipboardList, title: "Yük ve malzeme", description: guide.load },
    { icon: service === "hafriyat" ? TipperTruckIcon : Truck, title: "Araç seçimi", description: guide.vehicle },
    { icon: MapPinned, title: "Saha ve teslimat", description: guide.site },
  ];
  return <section className="py-16 md:py-20 px-4 md:px-10 bg-off2 border-y border-border" aria-label="Teklif hazırlık rehberi">
    <div className="max-w-[1100px] mx-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Teklif öncesi</p>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight max-w-2xl">{guide.title}</h2>
      <p className="text-txt-2 leading-relaxed mt-4 max-w-2xl">{guide.intro}</p>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {cards.map(({ icon, title, description }) => <article key={title} className="bg-background border border-border rounded-2xl p-6">
          <BrandIcon icon={icon} className="mb-4" /><h3 className="font-bold mb-2">{title}</h3><p className="text-sm text-txt-2 leading-relaxed">{description}</p>
        </article>)}
      </div>
      <div className="mt-6 rounded-2xl bg-background border border-border p-6 md:p-8 grid md:grid-cols-2 gap-6">
        <div><h3 className="text-xl font-bold">Talebinizde bunları belirtin</h3><p className="text-sm text-txt-2 mt-3 leading-relaxed">Bilmiyorsanız tahmini bilgiyi yazabilirsiniz. Kesin fiyat ve teslimat planı, eksik bilgiler tamamlandıktan sonra teklif koşullarında belirtilir.</p><Link to="/teklif-al" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary text-white px-5 py-3 text-sm font-semibold">Talebimi oluştur <ArrowRight size={16} /></Link></div>
        <ul className="space-y-3">{guide.checklist.map((item, index) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed"><span className="shrink-0 font-mono text-primary font-semibold">0{index + 1}</span>{item}</li>)}</ul>
      </div>
    </div>
  </section>;
}
