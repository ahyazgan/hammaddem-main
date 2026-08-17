import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone } from "lucide-react";

const malzemeler = [
  "Kum", "Çakıl", "Mıcır", "Stabilize", "Toprak",
  "Moloz", "İnşaat Atığı", "Hafriyat Toprağı",
];

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Damperli araçlarımız ile güvenli ve hızlı hafriyat malzemesi taşımacılığı." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const nasılCalısır = [
  { step: "01", title: "Talep Oluştur", desc: "Malzeme türü, miktar ve teslimat adresini girin." },
  { step: "02", title: "Teklif Alın", desc: "En uygun fiyat teklifini dakikalar içinde alın." },
  { step: "03", title: "Onaylayın", desc: "Teklifi onaylayın, taşıma planlanır." },
  { step: "04", title: "Teslimat", desc: "Damperli araç ile güvenli teslimat yapılır." },
];

const HizmetHafriyat = () => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    // Not: /hizmetler diye bir rota yok — breadcrumb var olmayan URL'e işaret etmemeli.
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://hammaddem.co/" },
      { "@type": "ListItem", position: 2, name: "Hafriyat Malzemeleri", item: "https://hammaddem.co/hizmetler/hafriyat-nakliyesi" },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hafriyat Malzemeleri Taşımacılığı",
    description: "Hafriyat, kum, çakıl, mıcır ve inşaat malzemeleri taşımacılığı. 11 ilde hızlı teslimat, online teklif.",
    provider: {
      "@type": "Organization",
      name: "Hammaddem",
      url: "https://hammaddem.co",
      telephone: "+905393308617",
      email: "hammaddem@outlook.com",
    },
    areaServed: "TR",
    serviceType: "Logistics",
    url: "https://hammaddem.co/hizmetler/hafriyat-nakliyesi",
    availableLanguage: "tr",
  };

  return (
    <>
      <Helmet>
        <title>Hafriyat Malzemeleri Taşımacılığı – Kum, Çakıl, Mıcır | Hammaddem</title>
        <meta name="description" content="Hafriyat, kum, çakıl, mıcır ve inşaat malzemeleri taşımacılığı. Damperli araçlarla 11 ilde hızlı teslimat. Online teklif alın, ton başına rekabetçi fiyatlar." />
        <meta name="keywords" content="hafriyat taşımacılığı, kum taşıma, çakıl taşıma, mıcır taşıma, inşaat malzemeleri, hafriyat nakliyesi, damper araç, moloz taşıma" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://hammaddem.co/hizmetler/hafriyat-nakliyesi" />
        <meta property="og:title" content="Hafriyat Malzemeleri Taşımacılığı – Hammaddem" />
        <meta property="og:description" content="Hafriyat, kum, çakıl taşımacılığı. 11 ilde hızlı teslimat, online teklif." />
        <meta property="og:url" content="https://hammaddem.co/hizmetler/hafriyat-nakliyesi" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hafriyat Malzemeleri Taşımacılığı – Hammaddem" />
        <meta name="twitter:description" content="Hafriyat, kum, çakıl taşımacılığı. 11 ilde hızlı teslimat." />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero */}
        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
                  Hafriyat Hizmeti
                </span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Hafriyat Malzemeleri Taşımacılığı
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Kum, çakıl, mıcır, stabilize ve tüm hafriyat malzemelerinizi
                  damperli araçlarımızla güvenle taşıyoruz. Türkiye genelinde 11 ilde
                  hızlı teslimat ve rekabetçi fiyatlarla hizmetinizdeyiz.
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

              {/* Visual */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-accent-light border-2 border-accent-border flex items-center justify-center">
                  <Truck className="w-32 h-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Malzemeler */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Taşıdığımız Hafriyat Malzemeleri</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[520px]">
              İnşaat ve altyapı projelerine ihtiyaç duyulan tüm hafriyat malzemelerini damperli araçlarımızla taşıyoruz.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {malzemeler.map((m) => (
                <span
                  key={m}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Nasıl Çalışır */}
        <section className="py-16 md:py-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Nasıl Çalışır?</h2>
            <p className="text-sm text-txt-2 mb-10 max-w-[500px]">
              4 adımda hafriyat malzemeleri taşımacılığı talebinizi oluşturun ve teslim alın.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {nasılCalısır.map((s) => (
                <div key={s.step} className="border border-border rounded-2xl p-6 bg-background hover:border-accent-border hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-accent-light text-primary font-mono font-bold text-sm flex items-center justify-center mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem?</h2>
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

        {/* CTA */}
        <section className="py-16 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Hafriyat Malzemeleri İçin Teklif Alın
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Üyelik gerekmeden talep formunu doldurun, dakikalar içinde size özel fiyat teklifi alın.
            </p>
            <Link
              to="/teklif-al"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
            >
              Üyeliksiz Teklif Al <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HizmetHafriyat;
