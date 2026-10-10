import { publishedCaseStudies } from "@/data/caseStudies";

const labels = { silobas: "Silobas taşımacılığı", hafriyat: "Hafriyat nakliyesi", hammadde: "Hammadde tedariki" };
export default function CaseStudies() {
  const items = publishedCaseStudies();
  if (!items.length) return null;
  return <section className="py-16 px-4 md:px-10" aria-labelledby="case-studies-title">
    <div className="max-w-[1100px] mx-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Sahadan</p>
      <h2 id="case-studies-title" className="text-3xl font-bold mb-8">Tamamlanan işlerden örnekler</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{items.map(item => <article key={item.id} className="border border-border rounded-2xl overflow-hidden bg-background">
        <img src={item.photo.src} alt={item.photo.alt} loading="lazy" width={800} height={600} className="aspect-[4/3] object-cover w-full" />
        <div className="p-6"><p className="text-xs text-primary font-semibold">{labels[item.service]} · {item.city}</p><h3 className="font-bold text-lg mt-2">{item.title}</h3><time dateTime={item.completedMonth} className="text-xs text-txt-3">{new Date(`${item.completedMonth}-01T12:00:00`).toLocaleDateString("tr-TR", { month: "long", year: "numeric" })}</time><p className="text-sm text-txt-2 mt-4 leading-relaxed">{item.work}</p><p className="text-sm mt-3 leading-relaxed"><strong>Sonuç: </strong>{item.outcome}</p></div>
      </article>)}</div>
    </div>
  </section>;
}
