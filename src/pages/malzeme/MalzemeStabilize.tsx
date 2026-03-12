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

const fiyat = getFiyatBySlug("stabilize")!;
const canonical = "https://hammaddem.co/malzeme/stabilize";
const title = "Stabilize Fiyatları 2026 | Stabilize Malzeme Satış & Teslimat – Hammaddem";
const description = "Toptan stabilize malzeme satış ve teslimatı. Yol stabilizesi, temel dolgu stabilizesi. 11 ilde hızlı teslimat, ton bazında stabilize fiyatı için online teklif alın.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Damperli araçlarla güvenli teslimat. Saha koşullarına uygun araç seçimi." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const kullanim = ["Yol ve park yeri temel tabakası", "Şantiye içi geçici yol yapımı", "Açık alan zemin düzenlemesi", "Bina temel dolgusu", "Havalimanı ve liman sahaları", "Maden ocağı yolları"];

const faq = [{"q": "Stabilize malzeme ile kırma taş arasındaki fark nedir?", "a": "Stabilize, farklı boyutlarda kırma taş, kil ve ince malzeme karışımıdır; sıkıştırıldığında yüksek mukavemet kazanır. Kırma taş tek granülometride üretilir."}, {"q": "Stabilize hangi granülometrilerde mevcut?", "a": "Genellikle 0-30 mm ve 0-50 mm olmak üzere iki ana granülometride stabilize tedarik ediyoruz."}, {"q": "Yol için kaç ton stabilize gerekir?", "a": "1 m² için sıkıştırılmış 15 cm temel tabakasına yaklaşık 0,25-0,30 ton stabilize gerekir. Hesaplama için bilgilerinizi talepte belirtebilirsiniz."}, {"q": "Stabilize fiyatları nasıl belirlenir?", "a": "Granülometri, miktar ve mesafeye göre fiyat değişir. Güncel fiyat için online teklif alın."}, {"q": "Minimum sipariş miktarı nedir?", "a": "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz."}, {"q": "Stabilize zemin nasıl yapılır?", "a": "Stabilize zemin yapımında önce zemin temizlenir ve tesviye edilir. Ardından 15-20 cm kalınlığında stabilize serilir, titreşimli silindir ile nem kontrolü yapılarak sıkıştırılır. Gerekirse birden fazla kat uygulanır. Doğru nem oranında sıkıştırma, zemin mukavemeti için kritiktir."}, {"q": "Stabilize ile şose (şosepier) farkı nedir?", "a": "Şose (macadam), büyük boyutlu kırma taşlarla döşenen tarihi yol yapım yöntemidir. Stabilize ise farklı granülometrilerde malzeme karışımı içeren modern zemin iyileştirme malzemesidir. Günümüzde stabilize, şosenin yerini almış daha ekonomik ve hızlı bir çözümdür."}, {"q": "Park yeri ve şantiye yolu için stabilize mi, beton mu tercih edilir?", "a": "Geçici şantiye yolları ve hafif trafikli park alanları için stabilize daha ekonomik ve hızlı bir çözümdür. Yoğun araç trafiği veya kalıcı uygulamalar için asfalt veya beton tercih edilir. Stabilize zemin üzerine ilerleyen süreçte asfalt da dökülebilir."}];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Stabilize Malzeme", url: "/malzeme/stabilize" },
]);

const MalzemeStabilize = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/stabilize");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Stabilize Malzeme Satış & Teslimat – Hammaddem",
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
        <meta name="keywords" content="stabilize malzeme, stabilize fiyatları, yol stabilizesi, temel dolgu, toptan stabilize, stabilize taş" />
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
                  Stabilize Malzeme Satış & Teslimat
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Toptan stabilize malzeme satış ve teslimatı. Yol stabilizesi, temel dolgu stabilizesi. 11 ilde hızlı teslimat, ton bazında stabilize fiyatı için online teklif alın.
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Stabilize Malzeme Nedir? Yol Stabilizesi, Temel Dolgu ve Zemin İyileştirme</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Stabilize, kırma taş, doğal taş ve kil karışımından oluşan, sıkıştırıldığında yüksek mukavemet kazanan bir zemin iyileştirme malzemesidir. Granülometri olarak genellikle 0-30 mm veya 0-50 mm aralığında üretilir. Yol yapımında temel tabakası, şantiye içi ulaşım yolları ve açık alan zemin düzenlemesinde yaygın kullanılır.</p>
              <p>Hammaddem ile stabilize malzeme tedariğini dijital platformdan yönetin. Granülometri, miktar ve teslimat adresinizi belirterek 30 dakika içinde fiyat teklifi alın. 11 ilde damperli araçlarla güvenilir teslimat sağlıyoruz.</p>
              <p>Stabilize malzemenin doğru sıkıştırılması ve nemlendirilmesi, zemin dayanımı için kritik öneme sahiptir. Teknik destek için uzmanlarımıza danışabilirsiniz.</p>
            </div>
          </div>
        </section>

        {/* Stabilize Türleri */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Stabilize Malzeme Türleri: 0-30 mm ve 0-50 mm Stabilize</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kullanım amacına ve yük taşıma ihtiyacına göre farklı stabilize malzeme boyutları bulunmaktadır.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "0-30 mm Stabilize", desc: "En yaygın kullanılan stabilize boyutu. Yol temel tabakası ve park alanları için." },
                { title: "0-50 mm Stabilize", desc: "Ağır taşıt trafiği için. Fabrika sahaları ve lojistik depo zemini." },
                { title: "Yol Stabilizesi", desc: "Karayolu alt temel tabakası. Asfalt öncesi zemin hazırlığı için." },
                { title: "Şantiye Yol Stabilizesi", desc: "Geçici inşaat yolları için hızlı ve ekonomik zemin çözümü." },
                { title: "Temel Dolgu Stabilizesi", desc: "Bina ve yapı temellerinde dolgu ve zemin iyileştirme amaçlı." },
                { title: "Havalimanı ve Liman Stabilizesi", desc: "Yüksek yük kapasitesi gerektiren özel saha zemini malzemesi." },
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Stabilize Malzeme Kullanım Alanları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Stabilize Malzeme hangi sektör ve uygulamalarda kullanılır?</p>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem ile Stabilize Malzeme Tedarik Edin?</h2>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Stabilize Malzeme Hakkında Sık Sorulan Sorular</h2>
            <p className="text-sm text-txt-2 mb-8">Stabilize Malzeme fiyatları, taşıma yöntemleri ve teslimat hakkında merak ettiğiniz her şey.</p>
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
              Stabilize Malzeme İçin Teklif Alın
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

export default MalzemeStabilize;
