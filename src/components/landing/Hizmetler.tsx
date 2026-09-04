import { Link } from "react-router-dom";
import { Truck, Mountain, Package, MapPin, FileText, CheckCircle } from "lucide-react";

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
    imageAlt: "Ekskavatör şantiyede temel kazısı yaparken hafriyat toprağını damperli kamyona yüklüyor",
  },
];

const extras = [
  { icon: "📦", title: "Toplu Sipariş", desc: "Büyük projeler için özel fiyatlandırma." },
  { icon: "📍", title: "Türkiye Geneli", desc: "11 ilde aktif teslimat ağı." },
  { icon: "⚡", title: "Hızlı Teklif", desc: "48 saat içinde net fiyat teklifi." },
];

const Hizmetler = () => {
  return (
    <section id="hizmetler" className="relative py-16 md:py-24 px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between gap-5 mb-12 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-3.5">
              Hizmetler
            </span>
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold tracking-tight leading-[1.1] mb-3.5">
              Ne Sunuyoruz?
            </h2>
            <p className="text-base text-txt-2 leading-[1.7] max-w-[520px]">
              Hammadde tedarikinden teslimatına kadar tüm süreci dijitalleştiriyoruz.
            </p>
          </div>
          <a href="#siparis-formu" className="text-[13px] font-semibold text-primary no-underline flex items-center gap-1 hover:underline">
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
              <div className="w-full h-48 sm:h-56 overflow-hidden relative">
                <img
                  src={h.image}
                  alt={h.imageAlt}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-[12px] flex items-center justify-center text-[24px] shadow-lg backdrop-blur-md bg-white/90 border border-white/20`}>
                  {h.color === "orange" ? "🌫️" : "🏗️"}
                </div>
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
              <div className="w-10 h-10 rounded-[10px] flex-shrink-0 flex items-center justify-center text-lg bg-off2 border border-border">
                {e.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight mb-1">{e.title}</h4>
                <p className="text-xs text-txt-2 leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hizmetler;
