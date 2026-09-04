import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Layers } from "lucide-react";
import { MALZEME_ROUTES } from "./malzemeRoutes";
import { buildBreadcrumbJsonLd, buildProductOfferJsonLd } from "@/utils/seoSchemas";
import FiyatBanner from "@/components/landing/FiyatBanner";
import { getFiyatBySlug } from "@/data/fiyatData";

import HeroGorsel from "@/components/HeroGorsel";
const fiyat = getFiyatBySlug("alci")!;
const canonical = "https://hammaddem.co/malzeme/alci";
const title = "Alçı Fiyatları 2026 | Ton Fiyatı ve Silobas Teslimat";
const description = "Alçı ton fiyatı 2026: 3.000–6.000 TL/ton. Yapı alçısı, sıva alçısı ve sanayi alçısı; silobas ve big-bag teslimat. 30 dakikada teklif.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik silobas ile güvenli, kapalı sistem taşıma. Tozlanma ve fire minimumda." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const kullanim = ["İç cephe sıva ve alçı uygulaması", "Alçıpan (drywall) üretimi", "Dekoratif alçı ve stüko", "Tıbbi alçı (ortopedik)", "Çimento retarder katkısı", "Tarım (jips olarak toprak düzenleyici)"];

const faq = [{"q": "İnşaat alçısı ile sanayi alçısı arasındaki fark nedir?", "a": "İnşaat alçısı düşük sertlik ve hızlı priz özelliğiyle iç sıva ve alçı uygulamalarında kullanılır. Sanayi alçısı ise daha yüksek saflık ve özgün priz süreleriyle özel üretim süreçlerinde tercih edilir."}, {"q": "Alçı neden silobas ile taşınır?", "a": "Alçı neme karşı çok hassastır; kapalı sistem silobas ile taşınarak erken hidrasyon ve ürün kaybı önlenir."}, {"q": "Alçı fiyatları nasıl belirlenir?", "a": "Alçı türü (inşaat/sanayi), saflık derecesi, miktar ve mesafeye göre fiyat değişir."}, {"q": "Aynı gün teslimat mümkün mü?", "a": "Stok ve lokasyona bağlı olarak aynı gün teslimat yapılabilmektedir."}, {"q": "Minimum sipariş miktarı nedir?", "a": "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz."}, {"q": "Sıva alçısı ile ince sıva alçısı farkı nedir?", "a": "Sıva alçısı (kaba alçı), duvarlara ilk kat uygulamasında kullanılır; 6-15 mm kalınlıkta sürülür. İnce sıva alçısı ise üst kat bitirme işleminde kullanılır, 1-4 mm kalınlık verir ve daha pürüzsüz yüzey sağlar. Alçıpan üzerinde özel alçı ürünleri tercih edilmelidir."}, {"q": "Alçıpan (drywall) üretiminde hangi alçı kullanılır?", "a": "Alçıpan üretiminde sanayi kalitesinde alçı taşı (jips, CaSO₄·2H₂O) kullanılır. Bu alçı özel priz süreleri ve akışkanlık özellikleri gerektirir. Alçıpan fabrikaları için düzenli ve büyük hacimli silobas teslimatı sağlıyoruz."}, {"q": "Alçı çimento ile karıştırılır mı?", "a": "Genel olarak alçı ve çimento aynı karışımda kullanılmamalıdır; alçı içindeki sülfat, beton içindeki alüminatlı bileşiklerle reaksiyona girerek genleşme ve çatlama yapabilir. Her malzeme kendi uygulamasında ayrı kullanılmalıdır."}];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Alçı Silobas Taşıma", url: "/malzeme/alci" },
]);

const MalzemeAlci = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/alci");

  const productJsonLd = buildProductOfferJsonLd(fiyat, { description, url: canonical });
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Alçı Silobas Taşıma & Tedariği – Hammaddem",
    description,
    provider: { "@type": "Organization", name: "Hammaddem", url: "https://hammaddem.co" },
    areaServed: "TR",
    url: canonical,
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
        <meta name="keywords" content="alçı silobas, toptan alçı, alçı fiyatları, inşaat alçısı, sanayi alçısı, alçı tedariği" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero */}
        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
                  Malzeme
                </span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Alçı Fiyatları 2026 — Ton Fiyatı ve Teslimat
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Alçı silobas taşımacılığı ve toptan alçı tedariği. İnşaat alçısı, sanayi alçısı çeşitleri. 11 ilde hızlı teslimat, ton bazında alçı fiyatı için online teklif alın.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/teklif-al"
                    className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
                  >
                    Hemen Teklif Al <ArrowRight className="inline ml-1 w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+905393308617"
                    className="px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all"
                  >
                    <Phone className="inline mr-1.5 w-4 h-4" /> 0539 330 86 17
                  </a>
                </div>
              </div>
              <HeroGorsel src="/images/malzeme-alci.webp" alt="Alçı tesisinde beyaz silolara hortumla bağlı silobas dorse" />
            </div>
          </div>
        </section>

        {/* Fiyat Banner */}
        <FiyatBanner fiyat={fiyat} />

        {/* Bu malzeme nedir? */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Alçı Nedir? İnşaat Alçısı, Sıva Alçısı ve Alçıpan Alçısı Çeşitleri</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Alçı (kalsiyum sülfat hemihidrat, CaSO₄·½H₂O), alçıtaşının (jips) pişirilmesiyle elde edilen ve inşaat, dekorasyon ile sanayi sektörlerinde yaygın kullanılan bir bağlayıcı malzemedir. Su ile karıştırıldığında hızla sertleşir ve yüksek yüzey kalitesi sağlar. İnşaat alçısı, sıva alçısı ve sanayi alçısı başlıca kullanım türleridir.</p>
              <p>Alçı tozu, nem alımına karşı son derece hassastır; suyla temas ettiğinde erken priz yapabilir. Bu nedenle kapalı sistem pnömatik silobas araçlarıyla taşınır. Hammaddem ile alçı tedariğini güvenle yönetin; alçı türü, miktar ve teslimat adresinizi belirterek teklif alın.</p>
              <p>İnşaat şantiyeleri, alçıpan ve sıva üreticilerine 11 ilde alçı teslimatı yapıyoruz.</p>
            </div>
          </div>
        </section>

        {/* Alçı Türleri */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Alçı Çeşitleri: İnşaat, Sıva, Sanayi ve Alçıpan Alçısı</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kullanım amacına göre farklı alçı türleri bulunmaktadır.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "İnşaat Alçısı", desc: "Hızlı priz, iç mekan duvar sıvası için. β-alçı olarak da bilinir." },
                { title: "Sıva Alçısı (Kaba Alçı)", desc: "Duvara ilk kat uygulaması. 6-15 mm kalınlıkta uygulanır." },
                { title: "İnce Sıva Alçısı", desc: "Üst kat bitirme. Pürüzsüz yüzey için 1-4 mm kalınlıkta." },
                { title: "Alçıpan (Drywall) Alçısı", desc: "Alçıpan üretiminde kullanılan sanayi kalitesinde alçı tozu." },
                { title: "Sanayi Alçısı (α-alçı)", desc: "Yüksek dayanım. Medikal alçı, seramik kalıp ve özel uygulamalar." },
                { title: "Rötar Alçısı", desc: "Çimento üretiminde priz süresini düzenlemek için katkı alçısı." },
              ].map((t) => (
                <div key={t.title} className="border border-border rounded-2xl p-5 bg-background hover:border-accent-border transition-colors">
                  <h3 className="font-bold text-sm mb-2">{t.title}</h3>
                  <p className="text-xs text-txt-2 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kullanım Alanları */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Alçı Kullanım Alanları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Alçı hangi sektör ve uygulamalarda kullanılır?</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {kullanim.map((m) => (
                <li key={m} className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-txt-2">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Neden Hammaddem */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem ile Alçı Tedarik Edin?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {avantajlar.map((a) => (
                <div key={a.title} className="flex gap-4 items-start border border-border rounded-2xl p-6 bg-background hover:border-accent-border transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                    <a.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">{a.title}</h3>
                    <p className="text-sm text-txt-2 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Alçı Hakkında Sık Sorulan Sorular</h2>
            <p className="text-sm text-txt-2 mb-8">Alçı fiyatları, taşıma yöntemleri ve teslimat hakkında merak ettiğiniz her şey.</p>
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-2xl px-6 bg-background data-[state=open]:border-accent-border transition-colors">
                  <AccordionTrigger className="text-sm md:text-base font-semibold text-left hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-txt-2 leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Alçı İçin Teklif Alın
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Üyelik gerekmeden talep formunu doldurun, 30 dakika içinde size özel fiyat teklifi alın.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/teklif-al"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
              >
                Ücretsiz Teklif Al <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+905393308617"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all"
              >
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
          </div>
        </section>

        {/* İlgili Malzemeler */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">İlgili Malzemeler</h2>
            <p className="text-sm text-txt-2 mb-6">Hammaddem ile tedarik edebileceğiniz diğer malzemelere göz atın.</p>
            <div className="flex flex-wrap gap-2.5">
              {ilgiliMalzemeler.map((m) => (
                <Link
                  key={m.path}
                  to={m.path}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline"
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MalzemeAlci;
