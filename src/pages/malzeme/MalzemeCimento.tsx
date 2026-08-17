import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Package, Layers } from "lucide-react";
import { MALZEME_ROUTES } from "./malzemeRoutes";
import { buildBreadcrumbJsonLd, buildProductOfferJsonLd } from "@/utils/seoSchemas";
import FiyatBanner from "@/components/landing/FiyatBanner";
import { getFiyatBySlug } from "@/data/fiyatData";

const fiyat = getFiyatBySlug("cimento")!;
const canonical = "https://hammaddem.co/malzeme/cimento";
const title = "Çimento Fiyatları & Silobas Taşıma | Toptan Çimento Tedariği – Hammaddem";
const description = "Çimento silobas taşımacılığı ve toptan çimento tedariği. Portland, CEM I, CEM II çimento türlerinde 11 ilde hızlı teslimat. Ton bazında rekabetçi fiyat, online teklif alın.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik silobas ile güvenli, kapalı sistem taşıma. Tozlanma ve fire minimumda." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const kullanim = ["Beton santralleri ve hazır beton üretimi", "Prefabrik ve betonarme inşaat", "Yol yapımı ve altyapı projeleri", "Briket, bordür ve parke taşı üretimi", "Sıva ve şap uygulamaları", "Endüstriyel zemin ve betonarme yapılar"];

const faq = [{"q": "Çimento silobas ile nasıl taşınır?", "a": "Çimento, pnömatik basınçlı silobas araçlarıyla toz halinde taşınır. Boşaltma silo veya depoya hava basıncı ile aktarılır; tozlanma ve fire minimumda tutulur."}, {"q": "Hangi çimento türlerini taşıyorsunuz?", "a": "Portland (CEM I), CEM II (kompoze), CEM III (cüruflu), beyaz çimento ve özel çimento türlerini silobas ile taşıyoruz."}, {"q": "Çimento fiyatları nasıl belirlenir?", "a": "Fiyatlar malzeme türü, miktar, mesafe ve teslimat koşullarına göre değişir. En güncel fiyat için online teklif almanızı öneririz."}, {"q": "Beton santraline teslimat yapıyor musunuz?", "a": "Evet. Beton santralleri, hazır beton tesisleri ve inşaat sahalarına 11 ilde çimento teslimatı yapıyoruz."}, {"q": "Minimum sipariş miktarı nedir?", "a": "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz. Özel durumlar için bizimle iletişime geçin."}, {"q": "CEM I ile CEM II çimento farkı nedir?", "a": "CEM I (Portland çimento), %95 üzerinde klinker içerir ve en yüksek dayanım sınıfını temsil eder. CEM II (kompoze çimento), klinker yanı sıra uçucu kül, cüruf veya kireçtaşı gibi katkılar içerir; daha ekonomik ve daha düşük CO₂ emisyonlu bir seçenektir. Her ikisi de TS EN 197-1 standardına uygundur."}, {"q": "Beyaz çimento ne zaman kullanılır?", "a": "Beyaz çimento, dekoratif beton, mimarî beton, mozaik, terazzo ve estetik yüzey kaplama uygulamalarında tercih edilir. Demir oksit içeriğinin düşük tutulmasıyla elde edilen beyazlık, boya ve pigmentlerle kolay renklendirilmesine olanak tanır."}, {"q": "Çimento ton başına ne kadar tutar?", "a": "Çimento fiyatları çimento türüne (CEM I, CEM II, beyaz çimento), miktara ve teslimat mesafesine göre değişir. Piyasa koşullarına bağlı olarak da dalgalanabilir. Güncel ton başına çimento fiyatı için online teklif formundan talepte bulunabilirsiniz."}];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Malzemeler", url: "/malzeme/cimento" },
  { name: "Çimento Silobas Taşıma", url: "/malzeme/cimento" },
]);

const MalzemeCimento = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/cimento");

  const productJsonLd = buildProductOfferJsonLd(fiyat, { description, url: canonical });
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Çimento Silobas Taşıma | Toptan Çimento Tedariği – Hammaddem",
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
        <meta name="keywords" content="çimento silobas taşıma, toptan çimento, çimento fiyatları, CEM I çimento, portland çimento, çimento tedariği" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
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
                  Çimento Taşıma & Toptan Tedarik
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Çimento silobas taşımacılığı ve toptan çimento tedariği. Portland, CEM I, CEM II çimento türlerinde 11 ilde hızlı teslimat. Ton bazında rekabetçi fiyat, online teklif alın.
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
              <div className="hidden md:flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-accent-light border-2 border-accent-border flex items-center justify-center">
                  <Package className="w-32 h-32 text-primary" />
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Çimento Nedir? Portland Çimento, CEM I, CEM II ve Beyaz Çimento</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Çimento, inşaat ve altyapı sektörünün temel bağlayıcı malzemesidir. Klinkerin öğütülmesiyle elde edilen toz halindeki çimento; Portland (CEM I), CEM II (kompoze), CEM III (cüruflu) ve beyaz çimento gibi türlere ayrılır. Beton santrallerinde agrega ve su ile karıştırılarak hazır beton üretiminde, ayrıca prefabrik, yol yapımı ve şantiyelerde yaygın kullanılır.</p>
              <p>Çimento silobas ile taşınır; pnömatik boşaltma sayesinde tozlanma ve fire azaltılır. Ton bazında tedarik edilen çimentoda fiyat, mesafe ve miktara göre değişir. Hammaddem ile talep oluşturup dakikalar içinde teklif alabilir, 11 ilde güvenli teslimat ile siparişinizi tamamlayabilirsiniz.</p>
              <p>Beton santrali, hazır beton tesisi veya şantiye teslimatı için çimento türü, miktar ve teslimat adresinizi belirterek hemen teklif alın. Rekabetçi fiyat ve düzenli teslimat ile çimento tedarikini tek elden yönetin.</p>
            </div>
          </div>
        </section>

        {/* Çimento Türleri */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Çimento Türleri: Portland, CEM II, CEM III ve Beyaz Çimento</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kullanım amacına göre farklı çimento türleri ve dayanım sınıfları bulunmaktadır.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Portland Çimento (CEM I)", desc: "En yüksek klinker oranı. Yüksek dayanım gerektiren betonarme yapılar için." },
                { title: "Kompoze Çimento (CEM II)", desc: "Uçucu kül veya cüruf katkılı. Ekonomik ve çevre dostu seçenek." },
                { title: "Cüruflu Çimento (CEM III)", desc: "Yüksek cüruf içerikli. Sülfata dayanıklı, deniz yapıları için uygun." },
                { title: "Beyaz Çimento", desc: "Dekoratif beton, terazzo ve mozaik uygulamaları için estetik çimento." },
                { title: "Hızlı Prizli Çimento", desc: "Acil onarım ve hızlı kalıp alma gerektiren uygulamalar için." },
                { title: "42,5 R / 52,5 R Dayanım Sınıfı", desc: "Yüksek erken dayanım. Prefabrik ve ön gerilmeli beton üretimi için." },
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Çimento Kullanım Alanları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Çimento hangi sektör ve uygulamalarda kullanılır?</p>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem ile Çimento Tedarik Edin?</h2>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Çimento Hakkında Sık Sorulan Sorular</h2>
            <p className="text-sm text-txt-2 mb-8">Çimento fiyatları, taşıma yöntemleri ve teslimat hakkında merak ettiğiniz her şey.</p>
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
              Çimento İçin Teklif Alın
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

export default MalzemeCimento;
