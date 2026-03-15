import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Package, Layers } from "lucide-react";
import { MALZEME_ROUTES } from "./malzemeRoutes";
import { buildBreadcrumbJsonLd } from "@/utils/seoSchemas";
import FiyatBanner from "@/components/landing/FiyatBanner";
import { getFiyatBySlug } from "@/data/fiyatData";

const fiyat = getFiyatBySlug("cakil")!;
const canonical = "https://hammaddem.co/malzeme/cakil";
const title = "Çakıl Fiyatları 2026 | Çakıl Satış & Teslimat – Hammaddem";
const description = "Toptan çakıl satış ve teslimatı. İnce çakıl, iri çakıl, dere çakılı çeşitleri. 11 ilde hızlı teslimat, ton bazında çakıl fiyatı için online teklif alın.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Damperli araçlarla güvenli teslimat. Saha koşullarına uygun araç seçimi." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const kullanim = ["Hazır beton ve beton santrali üretimi", "Drenaj sistemi ve zemin filtrasyonu", "Yol ve altyapı yapımı", "Peyzaj ve bahçe düzenlemesi", "Demiryolu balastı", "Havuz tabanı ve sızma zemin"];

const faq = [{"q": "Hangi çakıl granülometrileri mevcut?", "a": "0-8 mm ince çakıl, 8-16 mm orta çakıl ve 16-32 mm iri çakıl olmak üzere farklı granülometrilerde çakıl tedarik ediyoruz."}, {"q": "Çakıl fiyatları nasıl belirlenir?", "a": "Çakıl fiyatı; granülometri, ton miktarı, mesafe ve teslimat koşullarına göre değişir. Güncel fiyat için online teklif alın."}, {"q": "Drenaj için hangi çakıl uygundur?", "a": "Drenaj uygulamalarında genellikle 8-16 mm veya 16-32 mm yuvarlak çakıl tercih edilir. İhtiyacınıza göre öneri sunabiliriz."}, {"q": "Minimum sipariş miktarı nedir?", "a": "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz."}, {"q": "Çakıl yıkanmış mı teslim ediliyor?", "a": "Talebe göre yıkanmış veya doğal çakıl tedarik edebiliyoruz. Talep formunda belirtmeniz yeterlidir."}, {"q": "Dere çakılı nedir, nerelerde kullanılır?", "a": "Dere çakılı, akarsuların taşıdığı ve aşındırdığı yuvarlak, pürüzsüz doğal agregadır. Drenaj sistemleri, peyzaj düzenlemesi, bahçe zemin kaplamaları ve havuz tabanlarında kullanılır. Köşeli kırma çakıldan daha estetik görünüm sağlar."}, {"q": "Bahçe için kaç mm çakıl kullanılır?", "a": "Bahçe ve peyzaj uygulamalarında genellikle 8-16 mm ince çakıl tercih edilir. Yürüme yolları için 8-16 mm, dekoratif kaplama için 16-32 mm iri çakıl uygundur. Zemin örtüsü olarak 5-8 cm kalınlık önerilir."}, {"q": "Çakıl ile mıcır arasındaki fark nedir?", "a": "Çakıl doğal, yuvarlak kenarlı bir agregadır; akarsu veya denizde aşınarak oluşur. Mıcır ise kaya bloklarının kırılmasıyla elde edilen köşeli agregadır. Drenaj ve peyzajda çakıl, beton ve asfalt üretiminde mıcır tercih edilir."}];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Çakıl Satış & Teslimat", url: "/malzeme/cakil" },
]);

const MalzemeCakil = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/cakil");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Çakıl Satış & Teslimat | Çakıl Fiyatları – Hammaddem",
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
        <meta name="keywords" content="çakıl fiyatları, toptan çakıl, dere çakılı, iri çakıl, ince çakıl, çakıl teslimat" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
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
                  Çakıl Satış & Teslimat
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Toptan çakıl satış ve teslimatı. İnce çakıl, iri çakıl, dere çakılı çeşitleri. 11 ilde hızlı teslimat, ton bazında çakıl fiyatı için online teklif alın.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/kayit"
                    className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
                  >
                    Hemen Teklif Al <ArrowRight className="inline ml-1 w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+905393308617"
                    className="px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all"
                  >
                    <Phone className="inline mr-1.5 w-4 h-4" /> Bizi Arayın
                  </a>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-accent-light border-2 border-accent-border flex items-center justify-center">
                  <Layers className="w-32 h-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fiyat Banner */}
        <FiyatBanner fiyat={fiyat} />

        {/* Bu malzeme nedir? */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Çakıl Nedir? Dere Çakılı, Bahçe Çakılı ve Beton Çakılı</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Çakıl, beton üretimi, drenaj sistemleri ve yol yapımında yaygın kullanılan doğal bir agrega malzemesidir. İnce çakıl (0-8 mm), orta çakıl (8-16 mm) ve iri çakıl (16-32 mm) olarak sınıflandırılır. Granülometri açısından TS 706 standartlarına uygunluk, yapı kalitesi için büyük önem taşır.</p>
              <p>Hammaddem ile çakıl tedariğini dijital platformdan yönetin. Ton bazında çakıl fiyatları için online teklif oluşturun, 11 ilde güvenilir teslimat alın. Beton santralleri, altyapı projeleri ve peyzaj uygulamaları için düzenli çakıl tedariki sağlıyoruz.</p>
              <p>Çakıl türü, miktar ve teslimat adresinizi belirterek 30 dakika içinde rekabetçi fiyat teklifi alın.</p>
            </div>
          </div>
        </section>

        {/* Çakıl Çeşitleri */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Çakıl Çeşitleri</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kullanım amacına göre farklı çakıl türleri bulunmaktadır.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Dere Çakılı", desc: "Doğal yuvarlak çakıl. Drenaj, peyzaj ve havuz tabanı için idealdir." },
                { title: "İnce Çakıl (0-8 mm)", desc: "Beton karışımı ve bahçe zemin kaplamasında kullanılır." },
                { title: "Orta Çakıl (8-16 mm)", desc: "Drenaj sistemleri ve yürüme yolları için tercih edilir." },
                { title: "İri Çakıl (16-32 mm)", desc: "Yol yapımı, demiryolu balastı ve zemin filtrasyonunda kullanılır." },
                { title: "Yıkanmış Çakıl", desc: "Kil ve ince malzemelerden arındırılmış, beton üretimine uygun çakıl." },
                { title: "Bahçe Çakılı", desc: "Dekoratif peyzaj ve bahçe zemin örtüsü için estetik çakıl çeşitleri." },
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Çakıl Kullanım Alanları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Çakıl hangi sektör ve uygulamalarda kullanılır?</p>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem ile Çakıl Tedarik Edin?</h2>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Çakıl Hakkında Sık Sorulan Sorular</h2>
            <p className="text-sm text-txt-2 mb-8">Çakıl fiyatları, taşıma yöntemleri ve teslimat hakkında merak ettiğiniz her şey.</p>
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
              Çakıl İçin Teklif Alın
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Hesap oluşturun, talep formunu doldurun, 30 dakika içinde size özel fiyat teklifi alın.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/kayit"
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

export default MalzemeCakil;
