import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, MapPin } from "lucide-react";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";

const canonical = "https://hammaddem.co/malzeme/kirec/bursa";
const title = "Bursa Kireç Silobas Taşıma | Hammaddem";
const description = "Bursa'da kireç silobas taşıma. DOSAB, NOSAB, Nilüfer OSB ve Bursa genelinde hızlı teslimat. Ton bazında rekabetçi fiyat, 30 dakikada online teklif alın.";

const comboFaq = [
  {
    "q": "Bursa'da Kireç silobas taşıma nasıl çalışır?",
    "a": "Hammaddem platformu üzerinden talep oluşturun; Bursa bölgesindeki araç filomuz 30 dakika içinde size özel fiyat teklifi sunar. Teklifi onayladığınızda teslimat sürecini dijital panelden takip edebilirsiniz."
  },
  {
    "q": "Bursa'da Kireç için minimum sipariş miktarı nedir?",
    "a": "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz. Özel durumlar için bizimle iletişime geçin."
  },
  {
    "q": "Bursa'da aynı gün teslimat yapıyor musunuz?",
    "a": "Evet, Bursa bölgesinde araç müsaitliğine göre aynı gün teslimat seçeneği sunulmaktadır. Talep oluştururken teslimat tarihinizi belirtin."
  }
];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Kireç Taşıma", url: "/malzeme/kirec" },
  { name: "Bursa Kireç Taşıma", url: "/malzeme/kirec/bursa" },
]);

const faqJsonLd = buildFaqJsonLd(comboFaq);


const MalzemeKirecBursa = () => {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hammaddem – Bursa Kireç Tedariği",
    description,
    url: canonical,
    telephone: "+905393308617",
    areaServed: { "@type": "City", name: "Bursa", containedInPlace: { "@type": "Country", name: "Türkiye" } },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Bursa Kireç Silobas Taşıma",
    description,
    provider: { "@type": "Organization", name: "Hammaddem", url: "https://hammaddem.co" },
    areaServed: { "@type": "City", name: "Bursa" },
    url: canonical,
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="bursa kireç, kireç bursa, bursa kirec fiyatı, sönmüş kireç, sönmemiş kireç" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border">
                    Bursa
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-muted border border-border text-txt-2">
                    Kireç
                  </span>
                </div>
                <h1 className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Bursa&apos;da Kireç Silobas Taşıma
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Bursa'da kireç silobas taşıma için Hammaddem'i tercih edin. DOSAB, NOSAB, Nilüfer OSB ve Bursa genelinde kireç teslimatı yapıyoruz. Ton bazında rekabetçi fiyat için 30 dakika içinde teklif alın.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/kayit" className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
                    Hemen Teklif Al <ArrowRight className="inline ml-1 w-4 h-4" />
                  </Link>
                  <a href="tel:+905393308617" className="px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all">
                    <Phone className="inline mr-1.5 w-4 h-4" /> 0539 330 86 17
                  </a>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-accent-light border-2 border-accent-border flex items-center justify-center">
                  <MapPin className="w-32 h-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Bursa&apos;da Kireç Silobas Taşıma Nasıl Çalışır?
            </h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>
                Bursa&apos;da kireç silobas taşıma için Hammaddem platformunu kullanın.
                DOSAB, NOSAB, Nilüfer OSB ve Bursa genelinde kireç teslimatı gerçekleştiriyoruz.
                Online talep formunu doldurarak 30 dakika içinde size özel fiyat teklifi alabilirsiniz.
              </p>
              <p>
                Kireç silobas taşıma sürecinde araç planlaması, teslimat zamanlaması ve
                takip işlemlerini Hammaddem platformu üzerinden dijital olarak yönetin.
                Bursa genelinde aktif araç filomuzla aynı gün veya ertesi gün teslimat seçenekleri sunuyoruz.
              </p>
              <p>
                Ton bazında rekabetçi kireç fiyatları için hemen kayıt olun ve teklif alın.
                Düzenli tedarik ihtiyaçlarınız için özel sözleşme koşulları oluşturulabilir.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">
              Bursa&apos;da Kireç İçin Neden Hammaddem?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Clock, title: "30 Dk'da Teklif", desc: "Online talepten 30 dakika içinde fiyat teklifi." },
                { icon: Shield, title: "Güvenli Teslimat", desc: "Pnömatik silobas, kapalı sistem taşıma." },
                { icon: Truck, title: "Bursa Hizmet", desc: "DOSAB, NOSAB, Nilüfer OSB ve Bursa genelinde hızlı teslimat." },
                { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişi panelden anlık takip edin." },
              ].map((a) => (
                <div key={a.title} className="flex flex-col gap-3 border border-border rounded-2xl p-6 bg-background hover:border-accent-border transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                    <a.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{a.title}</h3>
                    <p className="text-xs text-txt-2 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Bursa Kireç İçin Teklif Alın
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Kayıt olun, talep formunu doldurun, 30 dakika içinde Bursa&apos;a özel fiyat teklifi alın.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/kayit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
                Ücretsiz Teklif Al <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
          </div>
        </section>

        
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Bursa Kireç Taşıma Hakkında Sık Sorulan Sorular</h2>
            <div className="space-y-4 mt-6">
              {comboFaq.map((f, i) => (
                <div key={i} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mb-3">Kireç — Diğer Şehirler</h3>
                <div className="flex flex-wrap gap-2">
                  <a key="istanbul" href="/malzeme/kirec/istanbul" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">İstanbul</a>
                  <a key="ankara" href="/malzeme/kirec/ankara" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">Ankara</a>
                  <a key="izmir" href="/malzeme/kirec/izmir" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">İzmir</a>
                  <a key="kocaeli" href="/malzeme/kirec/kocaeli" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">Kocaeli</a>
                  <a key="gaziantep" href="/malzeme/kirec/gaziantep" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">Gaziantep</a>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mb-3">Bursa — Diğer Malzemeler</h3>
                <div className="flex flex-wrap gap-2">
                  <a key="cimento" href="/malzeme/cimento/bursa" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">Çimento</a>
                  <a key="kalsit" href="/malzeme/kalsit/bursa" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">Kalsit</a>
                  <a key="alci" href="/malzeme/alci/bursa" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">Alçı</a>
                  <a key="mermer-tozu" href="/malzeme/mermer-tozu/bursa" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">Mermer Tozu</a>
                  <a key="ucucu-kul" href="/malzeme/ucucu-kul/bursa" className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">Uçucu Kül</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MalzemeKirecBursa;
