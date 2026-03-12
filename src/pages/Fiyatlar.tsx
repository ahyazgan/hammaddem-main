import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ArrowRight, TrendingUp, Info, Phone } from "lucide-react";
import { FIYAT_DATA } from "@/data/fiyatData";
import { buildBreadcrumbJsonLd } from "@/utils/seoSchemas";

const canonical = "https://hammaddem.co/fiyatlar";
const title = "Hammadde Fiyatları 2026 | Çimento, Kum, Çakıl, Kalsit Fiyat Listesi – Hammaddem";
const description = "Güncel hammadde fiyatları: çimento fiyatı, kum fiyatı, çakıl fiyatı, mıcır fiyatı, kalsit fiyatı, kireç fiyatı. Ton bazında güncel fiyat aralıkları ve online teklif. Mart 2026 güncel liste.";

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Hammadde Fiyatları", url: "/fiyatlar" },
]);

const Fiyatlar = () => {
  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hammadde Fiyatları 2026",
    description,
    url: canonical,
    numberOfItems: FIYAT_DATA.length,
    itemListElement: FIYAT_DATA.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: f.label,
        url: `https://hammaddem.co/malzeme/${f.slug}`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "TRY",
          lowPrice: f.minFiyat,
          highPrice: f.maxFiyat,
          offerCount: 1,
          unitText: f.birim,
        },
      },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Çimento ton fiyatı ne kadar?", acceptedAnswer: { "@type": "Answer", text: "2026 yılı itibarıyla dökme çimento (silobas) ton fiyatı 2.500 – 4.500 TL arasında değişmektedir. Fiyat; çimento türü (CEM I, CEM II), miktar, mesafe ve piyasa koşullarına göre farklılık gösterir." } },
      { "@type": "Question", name: "Kum ton fiyatı ne kadar?", acceptedAnswer: { "@type": "Answer", text: "İnşaat kumu ton fiyatı 250 – 600 TL arasında değişmektedir. Dere kumu, kırma kum ve yıkanmış kum türlerine göre fiyat farklılık gösterir." } },
      { "@type": "Question", name: "Çakıl ton fiyatı ne kadar?", acceptedAnswer: { "@type": "Answer", text: "Çakıl ton fiyatı 200 – 500 TL arasında değişmektedir. Granülometri, çakıl türü ve teslimat bölgesine göre fiyat değişir." } },
      { "@type": "Question", name: "Hammadde fiyatları neden değişiyor?", acceptedAnswer: { "@type": "Answer", text: "Hammadde fiyatları; enerji maliyetleri, döviz kuru, arz-talep dengesi, nakliye mesafesi ve mevsimsel talep dalgalanmalarına göre değişiklik gösterir." } },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="hammadde fiyatları, çimento fiyatı, kum fiyatı, çakıl fiyatı, mıcır fiyatı, kalsit fiyatı, kireç fiyatı, alçı fiyatı, 2026 fiyat listesi, inşaat malzemesi fiyatları" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(productListJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero */}
        <section className="pt-[120px] pb-12 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-txt-3">
              <ol className="flex items-center gap-1.5">
                <li><Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link></li>
                <li className="text-txt-3/50">/</li>
                <li className="text-txt-2 font-medium">Hammadde Fiyatları</li>
              </ol>
            </nav>
            <div className="max-w-[700px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
                <TrendingUp className="w-3 h-3" /> Güncel Fiyatlar
              </span>
              <h1 className="text-[32px] md:text-[48px] font-extrabold leading-[1.1] tracking-tight text-foreground mb-4">
                Hammadde Fiyatları<br />
                <span className="text-primary">2026</span>
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-relaxed mb-4 max-w-[560px]">
                Çimento, kum, çakıl, kalsit, mıcır, kireç ve diğer hammadde fiyatlarını ton bazında karşılaştırın. Güncel piyasa fiyat aralıkları ve online teklif imkânı.
              </p>
              <div className="flex items-start gap-1.5 text-xs text-txt-3 bg-off2 border border-border rounded-lg px-3 py-2 max-w-[500px]">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Aşağıdaki fiyatlar tahmini piyasa aralıklarıdır. Kesin fiyat; miktar, mesafe ve piyasa koşullarına göre değişir. Güncel fiyat için online teklif alın.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Fiyat Tablosu */}
        <section className="py-12 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-border">
              <table className="w-full">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-xs font-bold text-txt-3 uppercase tracking-wider px-6 py-4">Malzeme</th>
                    <th className="text-left text-xs font-bold text-txt-3 uppercase tracking-wider px-6 py-4">Fiyat Aralığı (TL/Ton)</th>
                    <th className="text-left text-xs font-bold text-txt-3 uppercase tracking-wider px-6 py-4">Not</th>
                    <th className="text-right text-xs font-bold text-txt-3 uppercase tracking-wider px-6 py-4">Güncelleme</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {FIYAT_DATA.map((f, i) => (
                    <tr key={f.slug} className={`border-b border-border last:border-b-0 hover:bg-off2/50 transition-colors ${i % 2 === 0 ? "bg-background" : "bg-off2/30"}`}>
                      <td className="px-6 py-4">
                        <Link to={`/malzeme/${f.slug}`} className="text-sm font-semibold text-foreground hover:text-primary transition-colors no-underline">
                          {f.label}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-mono font-bold text-primary">
                          {f.minFiyat.toLocaleString("tr-TR")} – {f.maxFiyat.toLocaleString("tr-TR")}
                        </span>
                        <span className="text-xs text-txt-3 ml-1">TL</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-txt-3 max-w-[200px]">{f.not}</td>
                      <td className="px-6 py-4 text-right text-xs text-txt-3 whitespace-nowrap">{f.guncelleme}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to="/kayit"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary bg-accent-light border border-accent-border hover:bg-primary hover:text-white transition-colors no-underline"
                        >
                          Teklif Al <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden grid gap-3">
              {FIYAT_DATA.map((f) => (
                <div key={f.slug} className="p-4 rounded-xl border border-border bg-background">
                  <div className="flex items-center justify-between mb-2">
                    <Link to={`/malzeme/${f.slug}`} className="text-sm font-semibold text-foreground hover:text-primary transition-colors no-underline">
                      {f.label}
                    </Link>
                    <span className="text-[10px] text-txt-3">{f.guncelleme}</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-xl font-mono font-bold text-primary">
                      {f.minFiyat.toLocaleString("tr-TR")} – {f.maxFiyat.toLocaleString("tr-TR")}
                    </span>
                    <span className="text-xs text-txt-3">TL/ton</span>
                  </div>
                  <p className="text-[11px] text-txt-3 mb-3">{f.not}</p>
                  <Link
                    to="/kayit"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary bg-accent-light border border-accent-border no-underline"
                  >
                    Teklif Al <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fiyat SSS */}
        <section className="py-16 px-4 md:px-10 bg-off2">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8 text-foreground">Hammadde Fiyatları Hakkında Sık Sorulan Sorular</h2>
            <div className="space-y-5">
              {[
                { q: "Çimento ton fiyatı ne kadar?", a: "2026 yılı itibarıyla dökme çimento (silobas) ton fiyatı 2.500 – 4.500 TL arasında değişmektedir. Fiyat; çimento türü (CEM I, CEM II), miktar, mesafe ve piyasa koşullarına göre farklılık gösterir. Güncel çimento fiyatı için online teklif alın." },
                { q: "Kum ton fiyatı ne kadar?", a: "İnşaat kumu ton fiyatı 250 – 600 TL arasında değişmektedir. Dere kumu, kırma kum ve yıkanmış kum türlerine göre fiyat farklılık gösterir. Bölge ve miktara bağlı olarak indirim uygulanabilir." },
                { q: "Çakıl ton fiyatı ne kadar?", a: "Çakıl ton fiyatı 200 – 500 TL arasında değişmektedir. Granülometri, çakıl türü ve teslimat bölgesine göre fiyat değişir." },
                { q: "Hammadde fiyatları neden değişiyor?", a: "Hammadde fiyatları; enerji maliyetleri, döviz kuru, arz-talep dengesi, nakliye mesafesi ve mevsimsel talep dalgalanmalarına göre değişiklik gösterir. En güncel fiyat bilgisi için platformumuz üzerinden teklif alabilirsiniz." },
                { q: "Toplu siparişte indirim var mı?", a: "Evet, düzenli ve yüksek hacimli siparişlerde özel fiyatlandırma uygulanmaktadır. Düzenli tedarik anlaşması için bizimle iletişime geçin." },
              ].map((item) => (
                <div key={item.q} className="p-5 rounded-xl bg-background border border-border">
                  <h3 className="text-sm font-bold text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 md:px-10 bg-primary/5 border-t border-primary/10">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Kesin Fiyat Teklifi Alın</h2>
            <p className="text-txt-2 text-sm md:text-base mb-6">
              Miktar, malzeme türü ve teslimat adresinizi belirterek 30 dakika içinde size özel fiyat teklifi alın.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/kayit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors no-underline"
              >
                Ücretsiz Teklif Al <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+905393308617"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary hover:text-primary transition-colors no-underline"
              >
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Fiyatlar;
