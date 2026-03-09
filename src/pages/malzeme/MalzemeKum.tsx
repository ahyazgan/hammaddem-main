import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Package } from "lucide-react";
import { MALZEME_ROUTES } from "./malzemeRoutes";

const canonical = "https://hammaddem.co/malzeme/kum";
const title = "İnşaat Kumu Satış & Teslimat | Kum Fiyatları – Hammaddem";
const description = "İnşaat kumu, dere kumu, maden kumu satış ve teslimat. Toptan kum tedariği, 11 ilde aynı gün teslimat. Ücretsiz teklif alın.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Teslimat", desc: "Kapalı veya açık kasa araçlarla kum teslimatı, fire ve kayıp minimumda." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const faq = [
  { q: "Hangi kum türlerini satıyorsunuz?", a: "İnşaat kumu (dere kumu), kırma kum, silis kumu ve maden kumu tedarik ediyoruz. Elek boyutlarına göre ince veya iri kum seçenekleri mevcuttur. İhtiyacınıza uygun tür için teklif alabilirsiniz." },
  { q: "Kum teslimatı nasıl yapılıyor?", a: "Kum, kamyon veya damperli araçlarla şantiye, tesis veya belirttiğiniz adrese teslim edilir. Miktar ve mesafeye göre araç sayısı planlanır. Talep formunda adres ve miktar bilgisini girerek teklif alabilirsiniz." },
  { q: "Aynı gün teslimat yapılıyor mu?", a: "11 ilde hizmet verdiğimiz bölgelerde talep saatine ve stok durumuna göre aynı gün veya ertesi gün teslimat yapılabilir. Detay için talebinizi oluşturmanız yeterlidir." },
  { q: "Kum fiyatları nasıl belirlenir?", a: "Fiyat, kum türü, miktar (m³ veya ton), teslimat mesafesi ve araç tipine göre değişir. En güncel fiyat için 'Hemen Teklif Al' ile talebinizi iletmenizi öneririz." },
];

const MalzemeKum = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/kum");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "İnşaat Kumu Satış ve Teslimat",
    description,
    provider: { "@type": "Organization", name: "Hammaddem" },
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
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">Malzeme</span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">İnşaat Kumu Satış & Teslimat</h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  İnşaat kumu, dere kumu ve maden kumu satışı ile beton, sıva ve dolgu ihtiyaçlarınızı karşılıyoruz. Toptan kum tedariği, 11 ilde aynı gün veya ertesi gün teslimat seçenekleri. Ücretsiz teklif alarak m³ veya ton bazında sipariş verebilirsiniz.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/kayit" className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
                    Hemen Teklif Al <ArrowRight className="inline ml-1 w-4 h-4" />
                  </Link>
                  <a href="tel:+905393308617" className="px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all">
                    <Phone className="inline mr-1.5 w-4 h-4" /> Bizi Arayın
                  </a>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-accent-light border-2 border-accent-border flex items-center justify-center">
                  <Package className="w-32 h-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Bu Malzeme Nedir?</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>
                İnşaat kumu, doğal veya kırma kaynaklı mineral agregadır. Dere kumu (yıkanmış doğal kum), kırma kum (taş kırma sonucu) ve silis kumu (yüksek SiO₂) gibi türlere ayrılır. Elek boyutlarına göre ince (0–2 mm) veya iri kum sınıfları beton, sıva ve dolgu uygulamalarında kullanılır.
              </p>
              <p>
                Beton üretiminde çimento ve çakıl ile karıştırılarak dayanıklı yapı malzemesi elde edilir; sıva ve şap işlerinde ince kum tercih edilir. Dolgu ve zemin düzenlemesinde de kum yaygın kullanılır. Hammaddem ile toptan kum tedariği, 11 ilde hızlı teslimat ve rekabetçi fiyatlarla sunulur.
              </p>
              <p>
                Miktar (m³ veya ton), kum türü ve teslimat adresinize göre anında teklif alabilirsiniz. Şantiye, beton santrali veya tesis teslimatı için talep formunu doldurmanız yeterlidir.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Kullanım Alanları</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Beton üretimi ve hazır beton", "Sıva ve şap uygulamaları", "Dolgu ve zemin düzenlemesi", "Briket ve blok üretimi", "Peyzaj ve bahçe düzenlemesi", "Altyapı ve yol dolgusu"].map((m) => (
                <li key={m} className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-txt-2">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem ile Taşıyın / Tedarik Edin?</h2>
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

        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Sıkça Sorulan Sorular</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-2xl px-6 bg-background data-[state=open]:border-accent-border transition-colors">
                  <AccordionTrigger className="text-sm md:text-base font-semibold text-left hover:no-underline py-5">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-txt-2 leading-relaxed pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Kum İçin Teklif Alın</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">Hesap oluşturun, talep formunu doldurun, dakikalar içinde size özel fiyat teklifi alın.</p>
            <Link to="/kayit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
              Teklif Alın / Kayıt Olun <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">İlgili Malzemeler</h2>
            <p className="text-sm text-txt-2 mb-6">Diğer malzeme sayfalarımıza göz atın.</p>
            <div className="flex flex-wrap gap-2.5">
              {ilgiliMalzemeler.map((m) => (
                <Link key={m.path} to={m.path} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">
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

export default MalzemeKum;
