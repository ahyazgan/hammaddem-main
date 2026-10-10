import { ArrowRight, ClipboardList, FileCheck2, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import BrandIcon from "@/components/brand/BrandIcon";
import SectionHeading from "@/components/brand/SectionHeading";

const steps = [
  { num: "01", icon: ClipboardList, label: "İHTİYACINIZ", title: "İşinizi anlatın", desc: "Malzeme ya da iş tipini, miktarı ve teslimat adresini belirtin. Üyelik açmadan talebinizi oluşturun." },
  { num: "02", icon: FileCheck2, label: "TEKLİFİNİZ", title: "Detayları netleştirelim", desc: "Ekibimiz talebinizi değerlendirir. İşin kapsamı, araç ihtiyacı ve teslimat koşullarına göre teklifinizi iletir." },
  { num: "03", icon: MapPinned, label: "TESLİMATINIZ", title: "Birlikte takip edelim", desc: "Onayınızın ardından teslimat planı oluşturulur. Talep numaranızla güncel duruma kolayca ulaşın." },
];

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" className="py-16 md:py-24 px-4 md:px-10 bg-background border-b border-border/70">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading eyebrow="Talebinizden teslimata" title="Üç adımda, tüm detaylar net.">
          İhtiyacınızı bize iletin. Tedarik ve nakliye sürecini birlikte planlayalım.
        </SectionHeading>
        <ol className="grid md:grid-cols-3 gap-5 list-none">
          {steps.map((step, index) => (
            <li key={step.num} className="relative rounded-2xl bg-off border border-border/70 p-6 md:p-7">
              <div className="flex items-center justify-between mb-7">
                <BrandIcon icon={step.icon} size="lg" />
                <span aria-hidden="true" className="text-4xl font-extrabold tracking-tight text-navy/15">{step.num}</span>
              </div>
              <p className="text-[10px] font-bold tracking-[.16em] text-primary mb-2">{step.label}</p>
              <h3 className="text-xl font-bold tracking-tight text-navy mb-3">{step.title}</h3>
              <p className="text-sm text-txt-2 leading-relaxed">{step.desc}</p>
              {index < steps.length - 1 && <span aria-hidden="true" className="hidden md:flex absolute -right-4 top-14 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-border text-primary"><ArrowRight size={15} /></span>}
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border pt-5">
          <p className="text-sm text-txt-2">Zaten bir talebiniz var mı? Güncel durumunu görüntüleyin.</p>
          <Link to="/talep-takip" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy hover:text-primary">Talebimi takip et <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
