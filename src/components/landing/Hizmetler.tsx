import { Link } from "react-router-dom";
import SitePhoto from "@/components/SitePhoto";
import { Truck, Mountain, Package, MapPinned, Clock3 } from "lucide-react";
import BrandIcon from "@/components/brand/BrandIcon";
import SectionHeading from "@/components/brand/SectionHeading";

const hizmetler = [
  {
    icon: Truck,
    title: "Silobas Taşımacılığı",
    desc: "Çimento, kül, kalsit ve tüm toz/granül sanayi malzemeleri için silobas hizmeti.",
    products: ["Çimento", "Alçı", "Kireç", "Kalsit", "Mermer Tozu", "Kül", "Curuf"],
    color: "orange" as const,
    href: "#siparis-formu",
    linkLabel: "Teklif Al →",
    image: "/images/hizmet-silobas.webp",
    imageAlt: "Avrupa tipi alüminyum silobas dorseli çekici çimento fabrikasında siloya pnömatik boşaltım yapıyor",
  },
  {
    icon: Mountain,
    title: "Hafriyat İşleri & Malzemeleri",
    desc: "Temel kazısı, hafriyat toprağı taşıma, moloz kaldırma ve kum, çakıl, mıcır, stabilize tedariği.",
    products: ["Temel Kazısı", "Moloz", "Kum", "Çakıl", "Mıcır", "Stabilize", "Dolgu"],
    color: "navy" as const,
    href: "/hafriyat",
    linkLabel: "Hafriyat Sayfası →",
    image: "/images/hizmet-hafriyat.webp",
    imageAlt: "Ekskavatör İstanbul'da şantiyede temel kazısı yaparken hafriyat toprağını Avrupa tipi damperli kamyona yüklüyor",
  },
];

const extras = [
  { icon: Package, title: "Projenize özel tedarik", desc: "Miktar ve teslimat programına uygun toplu sipariş planlaması." },
  { icon: MapPinned, title: "11 ilde hizmet ağı", desc: "Şantiye ve tesis konumuna göre güzergâh ve araç planı." },
  { icon: Clock3, title: "Ortalama 30 dakikada teklif", desc: "Malzeme, miktar ve adres bilgisine göre hazırlanan fiyat teklifi." },
];

const Hizmetler = () => {
  return (
    <section id="hizmetler" className="relative py-16 md:py-24 px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-x-5 mb-2 flex-wrap">
          <SectionHeading eyebrow="Hizmetlerimiz" title="Yükünüze uygun çözüm.">
            Hammadde tedarikinden hafriyat nakliyesine, ihtiyacınıza uygun aracı ve teslimat planını birlikte belirleyelim.
          </SectionHeading>
          <a href="#siparis-formu" className="mb-10 md:mb-12 min-h-11 text-sm font-semibold text-primary no-underline flex items-center gap-1 hover:underline">
            Teklif Al →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {hizmetler.map((h) => (
            <div
              key={h.title}
              className={`group border-[1.5px] border-border rounded-2xl overflow-hidden transition-all duration-200 cursor-default bg-background hover:-translate-y-1 hover:shadow-elevated flex flex-col ${h.color === "orange" ? "hover:border-accent-border" : "hover:border-navy-border"
                }`}
            >
              <div className="w-full aspect-video overflow-hidden relative">
                <SitePhoto
                  src={h.image}
                  alt={h.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 md:p-7 pb-0 flex-1">
                <h3 className="text-xl font-extrabold tracking-tight mb-2">{h.title}</h3>
                <p className="text-sm text-txt-2 leading-[1.7] mb-5">{h.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {h.products.map((p) => (
                    <span key={p} className={`px-3 py-[5px] rounded-full text-xs font-medium bg-off2 text-txt-2 border border-border transition-colors ${h.color === "orange" ? "group-hover:bg-accent-light group-hover:text-primary group-hover:border-accent-border" : "group-hover:bg-navy-light group-hover:text-navy group-hover:border-navy-border"
                      }`}>{p}</span>
                  ))}
                </div>
              </div>
              <div className="px-5 md:px-7 py-4 border-t border-border flex items-center justify-between bg-off">
                <div className="flex gap-4">
                  <div className="flex items-center gap-[5px] text-xs text-txt-2 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" /> Aktif
                  </div>
                  <span className="text-xs text-txt-2 font-medium">11 İl</span>
                </div>
                {h.href.startsWith("#") ? (
                  <a href={h.href} className={`text-xs font-semibold no-underline ${h.color === "orange" ? "text-primary" : "text-navy"}`}>
                    {h.linkLabel}
                  </a>
                ) : (
                  <Link to={h.href} className={`text-xs font-semibold no-underline ${h.color === "orange" ? "text-primary" : "text-navy"}`}>
                    {h.linkLabel}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Extra services */}
        <div className="mt-5 border-[1.5px] border-border rounded-2xl p-5 md:p-7 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all hover:border-border2 hover:shadow-card bg-background">
          {extras.map((e) => (
            <div key={e.title} className="flex gap-3.5 items-start">
              <BrandIcon icon={e.icon} size="sm" />
              <div>
                <h4 className="text-sm font-bold tracking-tight mb-2 text-navy">{e.title}</h4>
                <p className="text-sm text-txt-2 leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hizmetler;
