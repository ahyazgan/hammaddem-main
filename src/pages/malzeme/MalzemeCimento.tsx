import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Package } from "lucide-react";
import { MALZEME_ROUTES } from "./malzemeRoutes";

const canonical = "https://hammaddem.co/malzeme/cimento";
const title = "Çimento Silobas Taşıma | Toptan Çimento Tedariği – Hammaddem";
const description = "Çimento silobas taşımacılığı ve toptan çimento tedariği. Portland, CEM I, CEM II çimento türlerinde 11 ilde hızlı teslimat. Online teklif alın.";

const avantajlar = [
  { icon: Clock, title: "15 Dakikada Teklif", desc: "Online talep formunu doldur, dakikalar içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik silobas ile çimento tozlanması ve fire riski minimuma iner." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const faq = [
  { q: "Çimento silobas ile nasıl taşınır?", a: "Çimento, pnömatik basınçlı silobas araçlarıyla toz halinde taşınır. Boşaltma silo veya depoya hava basıncı ile aktarılır; tozlanma ve fire minimumda tutulur. Hammaddem ile talep oluşturup teklif alarak süreci başlatabilirsiniz." },
  { q: "Hangi çimento türlerini taşıyorsunuz?", a: "Portland (CEM I), CEM II (kompoze), CEM III (cüruflu), beyaz çimento ve özel çimento türlerini silobas ile taşıyoruz. İhtiyacınıza uygun tür ve miktar için online teklif alabilirsiniz." },
  { q: "Çimento fiyatları ton bazında mı?", a: "Fiyatlar malzeme türü, miktar, mesafe ve teslimat koşullarına göre değişir. En güncel ve rekabetçi fiyat için 'Hemen Teklif Al' ile talebinizi iletmenizi öneririz." },
  { q: "Beton santraline teslimat yapıyor musunuz?", a: "Evet. Beton santralleri, hazır beton tesisleri ve inşaat sahalarına 11 ilde çimento teslimatı yapıyoruz. Teslimat noktası ve kapasite bilgisini talep formunda belirtmeniz yeterlidir." },
];

const MalzemeCimento = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/cimento");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Çimento Silobas Taşıma ve Toptan Çimento Tedariği",
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

        {/* Hero */}
        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
                  Malzeme
                </span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Çimento Taşıma & Tedarik
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Çimento silobas taşımacılığı ve toptan çimento tedariği ile inşaat ve beton sektörünün ihtiyacını karşılıyoruz.
                  Portland, CEM I, CEM II ve beyaz çimento türlerinde 11 ilde hızlı teslimat sunuyoruz. Online teklif alarak ton bazında rekabetçi fiyatlarla sipariş verebilirsiniz.
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
                  <Package className="w-32 h-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bu malzeme nedir? */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Bu Malzeme Nedir?</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>
                Çimento, inşaat ve altyapı sektörünün temel bağlayıcı malzemesidir. Klinkerin öğütülmesiyle elde edilen toz halindeki çimento; Portland (CEM I), CEM II (kompoze), CEM III (cüruflu) ve beyaz çimento gibi türlere ayrılır. Beton santrallerinde agrega ve su ile karıştırılarak hazır beton üretiminde, ayrıca prefabrik, yol yapımı ve şantiyelerde yaygın kullanılır.
              </p>
              <p>
                Çimento silobas ile taşınır; pnömatik boşaltma sayesinde tozlanma ve fire azaltılır. Ton bazında tedarik edilen çimentoda fiyat, mesafe ve miktara göre değişir. Hammaddem ile talep oluşturup dakikalar içinde teklif alabilir, 11 ilde güvenli teslimat ile siparişinizi tamamlayabilirsiniz.
              </p>
              <p>
                Beton santrali, hazır beton tesisi veya şantiye teslimatı için çimento türü, miktar ve teslimat adresinizi belirterek hemen teklif alın. Rekabetçi fiyat ve düzenli teslimat ile çimento tedarikini tek elden yönetin.
              </p>
            </div>
          </div>
        </section>

        {/* Kullanım Alanları */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Kullanım Alanları</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Beton santralleri ve hazır beton üretimi",
                "Prefabrik ve betonarme inşaat",
                "Yol yapımı ve altyapı projeleri",
                "Briket, bordür ve parke taşı üretimi",
                "Sıva ve şap uygulamaları",
                "Endüstriyel zemin ve betonarme yapılar",
              ].map((m) => (
                <li key={m} className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-txt-2">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Neden Hammaddem */}
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

        {/* SSS */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Sıkça Sorulan Sorular</h2>
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
        <section className="py-16 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Çimento İçin Teklif Alın
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Hesap oluşturun, talep formunu doldurun, dakikalar içinde size özel fiyat teklifi alın.
            </p>
            <Link
              to="/kayit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
            >
              Teklif Alın / Kayıt Olun <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* İlgili Malzemeler */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">İlgili Malzemeler</h2>
            <p className="text-sm text-txt-2 mb-6">Diğer malzeme sayfalarımıza göz atın.</p>
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
