import { ArrowRight, Calculator, MapPinned, PackageSearch, Phone, Route, SearchCheck } from "lucide-react";
import { Link } from "react-router-dom";
import BrandIcon from "@/components/brand/BrandIcon";
import SectionHeading from "@/components/brand/SectionHeading";
import { BOLGE_ROUTES } from "@/pages/bolge/bolgeRoutes";

const resources = [
  { icon: Calculator, title: "Hafriyatınızı hesaplayın", desc: "Hacim ve tahmini sefer ihtiyacınızı hesaplayarak işe hazırlanın.", path: "/hafriyat/hesaplama", action: "Hesaplamaya geç" },
  { icon: PackageSearch, title: "Malzemenizi tanıyın", desc: "Kullanım alanlarını ve taşıma seçeneklerini inceleyin.", path: "/hammadde", action: "Malzemeleri incele" },
  { icon: SearchCheck, title: "Talebinizi takip edin", desc: "Talep numaranız ve telefonunuzla güncel durumunuza ulaşın.", path: "/talep-takip", action: "Talebimi sorgula" },
];

export default function ProjectResources() {
  return (
    <>
      <section id="hizmet-bolgeleri" className="px-4 md:px-10 py-16 md:py-24 bg-background">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[.85fr_1.15fr] gap-8 lg:gap-16 items-center">
          <div>
            <BrandIcon icon={MapPinned} size="lg" className="mb-6" />
            <SectionHeading eyebrow="Hizmet ağımız" title="İşinizin olduğu yerde.">
              Marmara, Ankara ve İzmir’de tedarik ve nakliye çözümleri. Bölgenizi seçin, yerel hizmetlerimizi inceleyin.
            </SectionHeading>
          </div>
          <div className="rounded-2xl border border-border bg-off p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-5 mb-5">
              <p className="text-sm font-bold text-navy">Aktif hizmet bölgeleri</p>
              <span className="text-xs font-semibold text-primary">{BOLGE_ROUTES.length} il</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {BOLGE_ROUTES.map((region) => (
                <Link key={region.path} to={region.path} className="group flex min-h-12 items-center justify-between gap-2 rounded-lg border border-border bg-white px-3 py-3 text-sm font-medium text-navy hover:border-primary/40 hover:text-primary transition-colors">
                  {region.label}<ArrowRight size={14} className="shrink-0 text-primary/70" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="mt-5 text-xs text-txt-2 leading-relaxed">Araç uygunluğu ve teslimat planı, talebinizin konumuna ve kapsamına göre netleştirilir.</p>
          </div>
        </div>
      </section>
      <section id="proje-rehberi" className="px-4 md:px-10 py-16 md:py-24 bg-off border-y border-border/70">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeading eyebrow="İşinizi kolaylaştıran araçlar" title="Bir sonraki adımınız hazır.">
            İhtiyacınızı belirlemekten talebinizi izlemeye kadar, ihtiyacınız olan bilgiler bir arada.
          </SectionHeading>
          <div className="grid md:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <Link key={resource.path} to={resource.path} className="group flex flex-col rounded-2xl border border-border bg-white p-6 hover:border-primary/40 transition-colors">
                <BrandIcon icon={resource.icon} className="mb-6" />
                <h3 className="text-lg font-bold text-navy tracking-tight mb-2">{resource.title}</h3>
                <p className="text-sm text-txt-2 leading-relaxed mb-6">{resource.desc}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">{resource.action}<ArrowRight size={16} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 md:px-10 py-12 md:py-16 bg-white">
        <div className="relative max-w-[1100px] mx-auto overflow-hidden rounded-2xl bg-navy p-7 md:p-10 grid lg:grid-cols-[1fr_auto] items-center gap-7">
          <Route size={230} strokeWidth={.6} aria-hidden="true" className="pointer-events-none absolute right-0 -top-10 text-white/5" />
          <div className="relative">
            <p className="text-[11px] font-bold tracking-[.16em] uppercase text-orange-300 mb-3">Projeniz için konuşalım</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">İhtiyacınızı birlikte netleştirelim.</h2>
            <p className="max-w-[570px] text-sm leading-relaxed text-slate-300">Malzeme, miktar ve konumu paylaşın. İşinize uygun tedarik ve araç seçeneklerini birlikte değerlendirelim.</p>
          </div>
          <div className="relative flex flex-col gap-3">
            <Link to="/teklif-al" className="brand-action bg-primary text-white hover:bg-accent-hover">Üyeliksiz teklif al <ArrowRight size={16} aria-hidden="true" /></Link>
            <a href="tel:+905393308617" className="brand-action border border-white/20 text-white hover:bg-white/10"><Phone size={16} aria-hidden="true" />0539 330 86 17</a>
          </div>
        </div>
      </section>
    </>
  );
}
