import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Package, Layers } from "lucide-react";
import { buildBreadcrumbJsonLd } from "@/utils/seoSchemas";

const canonical = "https://hammaddem.co/hammadde";
const title = "Hammadde Tedarik | Çimento, Kum, Çakıl, Kalsit, Mıcır – Hammaddem";
const description = "Hammadde tedarik platformu. Çimento, kum, çakıl, kalsit, mıcır, kireç, alçı, mermer tozu ve daha fazlası için online hammadde siparişi verin. 11 ilde hızlı teslimat, uygun fiyat.";

const malzemeler = [
  { name: "Çimento", path: "/malzeme/cimento", desc: "Portland, CEM I, CEM II çimento türleri. Silobas ile güvenli taşıma." },
  { name: "Kum", path: "/malzeme/kum", desc: "İnce kum, kaba kum, dere kumu. İnşaat ve sıva uygulamaları için." },
  { name: "Çakıl", path: "/malzeme/cakil", desc: "Kırmataş çakıl, dere çakılı. Beton ve temel dolgusu için." },
  { name: "Kalsit", path: "/malzeme/kalsit", desc: "Endüstriyel kalsit tozu. Boya, plastik, kauçuk sektöründe kullanılır." },
  { name: "Mıcır", path: "/malzeme/micir", desc: "Yol yapımı ve beton agregası için çeşitli boyutlarda mıcır." },
  { name: "Kireç", path: "/malzeme/kirec", desc: "Sönmüş ve sönmemiş kireç. İnşaat, tarım ve endüstriyel kullanım." },
  { name: "Alçı", path: "/malzeme/alci", desc: "Yapı alçısı ve sıva alçısı. Hızlı priz süresi, yüksek kalite." },
  { name: "Mermer Tozu", path: "/malzeme/mermer-tozu", desc: "Beyaz ve renkli mermer tozu. Boya ve dolgu malzemesi olarak kullanılır." },
  { name: "Uçucu Kül", path: "/malzeme/ucucu-kul", desc: "Termik santral uçucu külü. Çimento ve beton katkısı olarak ekonomik çözüm." },
  { name: "Stabilize", path: "/malzeme/stabilize", desc: "Yol altı stabilizasyon malzemesi. Zemin sağlamlaştırma ve yol yapımı." },
];

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi hammadde fiyat teklifi al." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş lojistik ağımızla hızlı ve güvenilir hammadde teslimatı." },
  { icon: Shield, title: "Kalite Garantisi", desc: "Standartlara uygun hammadde tedariki. Her teslimat kalite kontrollüdür." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Hammadde siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const faq = [
  { q: "Hammadde nedir?", a: "Hammadde, bir ürünün üretiminde kullanılan işlenmemiş veya az işlenmiş doğal malzemeye verilen addır. İnşaat sektöründe çimento, kum, çakıl, kalsit, mıcır, kireç gibi malzemeler hammadde olarak kullanılır." },
  { q: "Hammadde tedariki nasıl çalışır?", a: "Hammaddem platformunda ihtiyaç duyduğunuz hammaddeyi ve miktarı belirterek talep oluşturursunuz. Sistem, bölgenizdeki uygun tedarikçileri eşleştirir ve 30 dakika içinde fiyat teklifi alırsınız." },
  { q: "Hangi hammaddeleri tedarik edebilirsiniz?", a: "Çimento, kum, çakıl, kalsit, mıcır, kireç, alçı, mermer tozu, uçucu kül ve stabilize gibi inşaat ve endüstriyel hammaddeleri tedarik ediyoruz." },
  { q: "Hammadde silobas ile nasıl taşınır?", a: "Toz ve granül hammaddeler (çimento, kalsit, kireç, alçı, uçucu kül) pnömatik silobas araçlarıyla taşınır. Kum, çakıl ve mıcır gibi agrega hammaddeleri ise damperli kamyonlarla nakledilir." },
  { q: "Hammadde fiyatları nasıl belirlenir?", a: "Hammadde fiyatları; malzeme türü, miktar, teslimat bölgesi ve piyasa koşullarına göre değişir. Güncel hammadde fiyatı için online teklif almanızı öneririz." },
  { q: "Minimum sipariş miktarı ne kadar?", a: "Hammadde türüne göre değişmekle birlikte, genellikle 10 ton ve üzeri siparişleri kabul ediyoruz. Özel durumlar için bize ulaşın." },
  { q: "Hangi illerde hammadde teslimatı yapıyorsunuz?", a: "İstanbul, Ankara, İzmir, Bursa, Kocaeli başta olmak üzere Türkiye genelinde 11 ilde hammadde teslimatı gerçekleştiriyoruz." },
  { q: "Hammadde kalitesi nasıl garanti altına alınıyor?", a: "Tedarik ettiğimiz tüm hammaddeler ilgili Türk Standartları (TS) ve Avrupa Standartları (EN) normlarına uygundur. Taşıyıcı firmalar platform standartlarımızı karşılamak zorundadır." },
];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Hammadde Tedarik", url: "/hammadde" },
]);

const Hammadde = () => {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: { "@type": "Organization", name: "Hammaddem", url: "https://hammaddem.co" },
    areaServed: "TR",
    url: canonical,
    serviceType: "Hammadde Tedarik ve Lojistik",
    offers: malzemeler.map((m) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: m.name, description: m.desc },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="hammadde, hammadde tedarik, hammadde fiyatları, inşaat hammaddesi, hammadde platformu, çimento hammadde, kum hammadde, çakıl hammadde, kalsit hammadde, hammadde lojistik" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero */}
        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-txt-3">
              <ol className="flex items-center gap-1.5">
                <li><Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link></li>
                <li className="text-txt-3/50">/</li>
                <li className="text-txt-2 font-medium">Hammadde Tedarik</li>
              </ol>
            </nav>

            <div className="max-w-[700px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
                Hammadde Platformu
              </span>
              <h1 className="text-[32px] md:text-[48px] font-extrabold leading-[1.1] tracking-tight text-foreground mb-4">
                Hammadde Tedarik<br />
                <span className="text-primary">Platformu</span>
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-relaxed mb-8 max-w-[560px]">
                Çimento, kum, çakıl, kalsit, mıcır ve daha fazlası için Türkiye'nin dijital hammadde tedarik platformu. Online sipariş verin, 30 dakikada teklif alın, 11 ilde teslimat imkânından yararlanın.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/kayit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Ücretsiz Teklif Al <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/hakkimizda"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-off2 transition-colors"
                >
                  Nasıl Çalışır?
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Malzeme Listesi */}
        <section className="py-16 px-4 md:px-10 bg-off2">
          <div className="max-w-[1100px] mx-auto">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Hammadde Çeşitleri</h2>
              <p className="text-txt-2 text-base max-w-[500px]">
                İnşaat ve endüstriyel üretimde kullandığınız tüm hammaddeleri tek platformdan tedarik edin.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {malzemeler.map((m) => (
                <Link
                  key={m.path}
                  to={m.path}
                  className="group p-5 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-card transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                        {m.name} Hammaddesi
                      </h3>
                      <p className="text-xs text-txt-3 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-primary">
                    Detaylı İncele <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Neden Hammaddem?</h2>
              <p className="text-txt-2 text-base max-w-[500px]">
                Hammadde tedarik sürecinizi dijitalleştirin, maliyetlerinizi düşürün.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {avantajlar.map((a) => (
                <div key={a.title} className="p-5 rounded-xl bg-off2 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mb-4">
                    <a.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2">{a.title}</h3>
                  <p className="text-xs text-txt-3 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hizmet Bölgeleri */}
        <section className="py-16 px-4 md:px-10 bg-off2">
          <div className="max-w-[1100px] mx-auto">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Hammadde Teslimat Bölgeleri</h2>
              <p className="text-txt-2 text-base max-w-[500px]">
                Türkiye'nin önde gelen sanayi ve inşaat merkezlerinde hammadde tedariki sağlıyoruz.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "İstanbul", path: "/hizmet-bolgeleri/istanbul" },
                { name: "Ankara", path: "/hizmet-bolgeleri/ankara" },
                { name: "İzmir", path: "/hizmet-bolgeleri/izmir" },
                { name: "Bursa", path: "/hizmet-bolgeleri/bursa" },
                { name: "Kocaeli", path: "/hizmet-bolgeleri/kocaeli" },
              ].map((b) => (
                <Link
                  key={b.path}
                  to={b.path}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border text-sm font-medium text-foreground hover:border-primary/30 hover:text-primary transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  {b.name} Hammadde Tedariki
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[800px] mx-auto">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Hammadde Hakkında Sık Sorulan Sorular</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {faq.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-5 data-[state=open]:shadow-card"
                >
                  <AccordionTrigger className="text-sm font-semibold text-foreground py-4 text-left hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-txt-2 leading-relaxed pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 md:px-10 bg-primary/5 border-t border-primary/10">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Hammadde Siparişinizi Hemen Oluşturun</h2>
            <p className="text-txt-2 text-sm md:text-base mb-6">
              30 dakika içinde fiyat teklifi alın, ihtiyaç duyduğunuz hammaddeyi en uygun koşullarda tedarik edin.
            </p>
            <Link
              to="/kayit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              Ücretsiz Teklif Al <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Hammadde;
