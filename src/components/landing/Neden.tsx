import { Clock3, ShieldCheck, MapPinned, Smartphone, PackageCheck } from "lucide-react";
import BrandIcon, { BulkTruckIcon } from "@/components/brand/BrandIcon";
import SectionHeading from "@/components/brand/SectionHeading";

const items = [
  { icon: Clock3, title: "Zamanınız değerli", desc: "Malzeme, güzergâh ve miktarı birlikte değerlendirerek talebinize özel teklif hazırlıyoruz.", stat: "30", unit: "dk", label: "Ortalama teklif süresi" },
  { icon: ShieldCheck, title: "Güvenle ilerleyin", desc: "Talebinizden teslimata kadar süreci ekibimizle birlikte, tek muhatap üzerinden yönetin.", stat: "%98", unit: "", label: "Müşteri memnuniyeti" },
  { icon: BulkTruckIcon, title: "Yüke uygun araç", desc: "Toz ve granül için silobas; agrega ve hafriyat için damperli araç planlaması.", stat: "20+", unit: "", label: "Araç kapasitesi" },
  { icon: MapPinned, title: "Bölgenize yakın çözümler", desc: "Şantiye ve tesis konumunuza göre yükleme, güzergâh ve teslimat planı oluşturun.", stat: "11", unit: "il", label: "Aktif hizmet bölgesi" },
  { icon: Smartphone, title: "Talebiniz elinizin altında", desc: "Telefon ve talep numaranızla teklifinizi ve güncel sipariş durumunu görüntüleyin.", stat: "7/24", unit: "", label: "Dijital talep erişimi" },
  { icon: PackageCheck, title: "Sahada biriken deneyim", desc: "Farklı malzeme, tesis ve şantiye ihtiyaçlarına göre şekillenen tedarik ve nakliye hizmeti.", stat: "250+", unit: "", label: "Tamamlanan teslimat" },
];

export default function Neden() {
  return (
    <section id="neden-biz" className="py-16 md:py-24 px-4 md:px-10 bg-[#f5f6f8] border-y border-border/70">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading eyebrow="Hammaddem farkı" title="Güçlü saha deneyimi. Net bir süreç.">
          Doğru malzeme, uygun araç ve planlı teslimat. İşinizin her adımında aynı özenle yanınızdayız.
        </SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((item) => (
            <article key={item.title} className="relative overflow-hidden rounded-2xl border border-border bg-background p-6 md:p-7">
              <div className="flex items-center justify-between gap-4 mb-6">
                <BrandIcon icon={item.icon} size="lg" />
                <span aria-hidden="true" className="h-px w-12 bg-border" />
              </div>
              <p className="text-[38px] md:text-[42px] font-extrabold tracking-[-.045em] text-navy leading-none tabular-nums">
                {item.stat}<span className="ml-1.5 text-xl font-semibold tracking-tight text-primary">{item.unit}</span>
              </p>
              <p className="mt-2 mb-5 text-[11px] font-semibold uppercase tracking-[.1em] text-txt-2">{item.label}</p>
              <div className="border-t border-border pt-5">
                <h3 className="text-base font-bold text-navy tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-txt-2">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
