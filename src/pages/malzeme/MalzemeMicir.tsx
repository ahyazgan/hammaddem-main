import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Package } from "lucide-react";
import { MALZEME_ROUTES } from "./malzemeRoutes";
import { buildBreadcrumbJsonLd, buildProductOfferJsonLd } from "@/utils/seoSchemas";
import FiyatBanner from "@/components/landing/FiyatBanner";
import { getFiyatBySlug } from "@/data/fiyatData";

import HeroGorsel from "@/components/HeroGorsel";
const fiyat = getFiyatBySlug("micir")!;
const canonical = "https://hammaddem.co/malzeme/micir";
const title = "Mıcır Fiyatları 2026 | Ton Fiyatı 200–450 TL";
const description = "Mıcır ton fiyatı 2026: 200–450 TL/ton. Kırma taş, bazalt ve kireçtaşı mıcır; 1 kamyon mıcır fiyatı ve 11 ilde teslimat. 30 dakikada teklif.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Damperli araçlarla güvenli teslimat. Saha koşullarına uygun araç seçimi." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const kullanim = ["Asfalt ve yol yapımı", "Hazır beton üretimi", "Temel dolgu ve stabilizasyon", "Demiryolu balastı", "Drenaj sistemleri", "Peyzaj ve çevre düzenlemesi"];

const faq = [{"q": "Hangi mıcır türlerini tedarik ediyorsunuz?", "a": "Bazalt mıcır, kireçtaşı mıcır ve granit mıcır başta olmak üzere 8-16 mm, 16-22 mm ve 22-32 mm granülometrilerde tedarik yapıyoruz."}, {"q": "Mıcır fiyatları nasıl belirlenir?", "a": "Kayaç türü, granülometri, miktar ve mesafeye göre fiyat değişir. Online teklif formundan güncel fiyat alabilirsiniz."}, {"q": "Asfalt mıcırı tedarik ediyor musunuz?", "a": "Evet, asfalt üretimine uygun kırma taş ve mıcır tedariki yapıyoruz."}, {"q": "Minimum sipariş miktarı nedir?", "a": "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz."}, {"q": "Mıcır ile çakıl arasındaki fark nedir?", "a": "Çakıl doğal yuvarlak agregadır, mıcır ise kırma işlemiyle elde edilen köşeli agregadır. Beton ve asfalt üretiminde mıcır, drenajda çakıl tercih edilir."}, {"q": "Kırma taş ile mıcır aynı şey mi?", "a": "Evet, mıcır ve kırma taş aynı malzemeyi ifade eder. Kaya bloklarının kırılıp elenmesiyle üretilen köşeli agrega, sektörde hem 'mıcır' hem de 'kırma taş' olarak adlandırılır. Bazalt, kireçtaşı ve granit başlıca kırma taş türleridir."}, {"q": "0-5 mm mıcır ile 5-12 mm mıcır farkı nedir?", "a": "0-5 mm ince mıcır (taş unu dahil) beton karışımında ince agrega ve dolgu olarak kullanılır. 5-12 mm mıcır hazır beton ve asfalt üretiminde, 12-25 mm iri mıcır ise temel dolgu ve drenaj sistemlerinde tercih edilir."}, {"q": "Yol yapımında hangi mıcır kullanılır?", "a": "Yol yapımında alt temel için genellikle 0-31,5 mm kırma taş (stabilize mıcır), asfalt binder tabakası için 12-22 mm ve asfalt aşınma tabakası için 8-12 mm mıcır kullanılır. Doğru granülometri için uzmanlarımıza danışabilirsiniz."}];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Mıcır Satış & Teslimat", url: "/malzeme/micir" },
]);

const MalzemeMicir = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/micir");

  const productJsonLd = buildProductOfferJsonLd(fiyat, { description, url: canonical });
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mıcır Satış & Teslimat | Mıcır Fiyatları – Hammaddem",
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
        <meta name="keywords" content="mıcır fiyatları, toptan mıcır, kırma taş, bazalt mıcır, mıcır teslimat, inşaat mıcırı" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og/malzeme-micir.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
                  Mıcır Fiyatları 2026 — Ton ve Kamyon Fiyatı
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Toptan mıcır satış ve teslimatı. Kırma taş, bazalt mıcır, kireçtaşı mıcır çeşitleri. 11 ilde hızlı teslimat, ton bazında mıcır fiyatı için online teklif alın.
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
              <HeroGorsel src="/images/malzeme-micir.webp" alt="Taş ocağı kırma-eleme tesisinde gri mıcır yükleyen damperli kamyon" />
            </div>
          </div>
        </section>

        {/* Fiyat Banner */}
        <FiyatBanner fiyat={fiyat} />

        {/* Bu malzeme nedir? */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Mıcır (Kırma Taş) Nedir? Bazalt, Kireçtaşı ve Granit Mıcır</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Mıcır (kırma taş), kaya bloklarının kırılıp elenmesiyle elde edilen köşeli agrega malzemesidir. Beton karışımında, asfalt üretiminde ve temel dolgu uygulamalarında yaygın kullanılır. Bazalt, kireçtaşı ve granit başta olmak üzere farklı kayaç türlerinden üretilen mıcır, kullanım amacına göre seçilir.</p>
              <p>Hammaddem ile mıcır tedariğini dijital platformdan yönetin. 8-16 mm, 16-22 mm ve 22-32 mm olmak üzere farklı granülometrilerde mıcır tedarik ediyoruz. 11 ilde güvenilir teslimat, ton bazında rekabetçi fiyatlar.</p>
              <p>Online talep formundan mıcır türü, miktar ve teslimat adresinizi belirterek 30 dakika içinde fiyat teklifi alın.</p>
            </div>
          </div>
        </section>

        {/* Mıcır Türleri */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Mıcır Türleri ve Boyutları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kayaç türü ve granülometriye göre farklı mıcır çeşitleri bulunmaktadır.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Bazalt Mıcır", desc: "Yüksek sertlik ve dayanıklılık. Asfalt ve yol yapımında tercih edilir." },
                { title: "Kireçtaşı Mıcır", desc: "Beton üretimi ve temel dolgu uygulamalarında kullanılan ekonomik mıcır." },
                { title: "Granit Mıcır", desc: "Dekoratif peyzaj ve yüksek trafikli yol kaplamalarında kullanılır." },
                { title: "İnce Mıcır (0-5 mm)", desc: "Beton karışımı ince agrega ve dolgu uygulamaları için." },
                { title: "Orta Mıcır (8-16 mm)", desc: "Hazır beton ve asfalt üretiminin temel agrega boyutu." },
                { title: "İri Mıcır (16-32 mm)", desc: "Temel dolgu, drenaj ve demiryolu balastı uygulamaları için." },
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Mıcır Kullanım Alanları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Mıcır hangi sektör ve uygulamalarda kullanılır?</p>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem ile Mıcır Tedarik Edin?</h2>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Mıcır Hakkında Sık Sorulan Sorular</h2>
            <p className="text-sm text-txt-2 mb-8">Mıcır fiyatları, taşıma yöntemleri ve teslimat hakkında merak ettiğiniz her şey.</p>
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
              Mıcır İçin Teklif Alın
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

export default MalzemeMicir;
