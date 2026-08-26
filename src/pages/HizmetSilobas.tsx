import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SilobasIcon from "@/components/SilobasIcon";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone } from "lucide-react";

const malzemeler = [
  "Çimento", "Uçucu Kül", "Kireç", "Kalsit", "Mermer Tozu",
  "Alçı", "Curuf", "Silis Kumu", "Talk", "Barit",
];

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik boşaltma sistemi ile tozlanma ve fire riski minimuma iner." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const nasılCalısır = [
  { step: "01", title: "Talep Oluştur", desc: "Malzeme türü, miktar ve teslimat adresini girin." },
  { step: "02", title: "Teklif Alın", desc: "En uygun fiyat teklifini dakikalar içinde alın." },
  { step: "03", title: "Onaylayın", desc: "Teklifi onaylayın, taşıma planlanır." },
  { step: "04", title: "Teslimat", desc: "Silobas aracı ile güvenli teslimat yapılır." },
];

const faq = [
  { q: "Silobas taşımacılığı yapan firmalar nasıl seçilir?", a: "Silobas taşımacılığı yapan firmalar arasında seçim yaparken; araç filosunun pnömatik boşaltma donanımı, gıda/kimyasal uyumluluğu, sigorta kapsamı ve düzenli sefer kapasitesine bakılmalıdır. Hammaddem, 11 ilde çalışan silobas firmalarının kapasitesini tek platformda birleştirir." },
  { q: "Silobas kiralama nasıl çalışır, ücreti nedir?", a: "Silobas kiralama; sefer bazlı, günlük veya aylık sözleşmeyle yapılabilir. Ücret; mesafe, malzeme türü, sefer sayısı ve bekleme süresine göre belirlenir. Düzenli sevkiyatlarda sefer başı maliyet belirgin şekilde düşer — ihtiyacınızı iletin, aynı gün kiralama teklifi alın." },
  { q: "Hangi yükler silobas ile taşınır?", a: "Silobas yalnızca toz ve ince granül dökme yükler için uygundur: çimento, uçucu kül, kireç, kalsit, alçı, mermer tozu, silis kumu, talk, barit gibi. Kum, çakıl ve mıcır gibi iri agregalar silobasla değil damperli araçla taşınır." },
  { q: "Silobas aracı nasıl boşaltma yapar?", a: "Silobas, kompresör yardımıyla ürünü basınçlı hava ile alıcı silosuna aktarır (pnömatik boşaltma). Boşaltma süresi yükün türüne göre 30-90 dakika arasındadır ve ürün hava ile temas etmeden aktarılır." },
];

const HizmetSilobas = () => {
  // Not: /hizmetler diye bir rota yok — breadcrumb var olmayan URL'e işaret etmemeli.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://hammaddem.co/" },
      { "@type": "ListItem", position: 2, name: "Silobas Taşımacılığı", item: "https://hammaddem.co/hizmetler/silobas" },
    ],
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

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Silobas Taşımacılığı",
    description: "Silobas ile çimento, kalsit, kül, kireç ve tüm toz/granül hammadde taşımacılığı. 11 ilde hızlı teslimat, online teklif.",
    provider: {
      "@type": "Organization",
      name: "Hammaddem",
      url: "https://hammaddem.co",
      telephone: "+905393308617",
      email: "hammaddem@outlook.com",
    },
    areaServed: "TR",
    serviceType: "Logistics",
    url: "https://hammaddem.co/hizmetler/silobas",
    availableLanguage: "tr",
  };

  return (
    <>
      <Helmet>
        <title>Silobas Nakliye Firması | Çimento, Kalsit Taşıma & Kiralama</title>
        <meta name="description" content="Silobas nakliye firması: dökme çimento, kalsit, kireç, uçucu kül taşıma ve sefer bazlı silobas kiralama. Silobas kaç ton alır? 30 dakikada teklif." />
        <meta name="keywords" content="silobas nakliye firmaları, silobas nakliye fiyatları, silobas nakliye, silobas firmaları, silobas kiralama, silobas taşımacılığı, silobas taşımacılığı yapan firmalar, silobas kaç ton çimento alır" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://hammaddem.co/hizmetler/silobas" />
        <meta property="og:title" content="Silobas Nakliye Firması – Hammaddem" />
        <meta property="og:description" content="Çimento, kalsit, kül ve tüm toz hammadde taşımacılığı. Online teklif al, 11 ilde teslimat." />
        <meta property="og:url" content="https://hammaddem.co/hizmetler/silobas" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Silobas Nakliye Firması – Hammaddem" />
        <meta name="twitter:description" content="Silobas ile çimento, kalsit, kül taşımacılığı. 11 ilde hızlı teslimat." />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
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
                  Silobas Hizmeti
                </span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Silobas Nakliye — Çimento, Kalsit, Kül Taşıma ve Kiralama
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Çimento, kalsit, uçucu kül ve tüm toz/granül sanayi malzemelerinizi
                  pnömatik silobas araçlarıyla güvenle taşıyoruz. Sefer bazlı taşıma veya
                  silobas kiralama — 11 ilde hızlı teslimat, rekabetçi fiyat.
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
                  <SilobasIcon className="w-32 h-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Malzemeler */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Taşıdığımız Malzemeler</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[520px]">
              Toz ve granül yapıdaki tüm sanayi hammaddelerini silobas araçlarımızla güvenle taşıyoruz.
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
              4 adımda silobas taşımacılığı talebinizi oluşturun ve teslim alın.
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

        {/* Silobas Kiralama */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Silobas Kiralama</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Tek seferlik taşımanın yanında <strong>silobas kiralama</strong> hizmeti de sunuyoruz: düzenli sevkiyatı olan beton santralleri, çimento bayileri ve sanayi tesisleri için günlük veya aylık silobas kiralama sözleşmesi yapılır; araç ve şoför belirlenen program dahilinde tesise tahsis edilir. Sefer bazlı çalışmaya göre ton başı maliyet belirgin şekilde düşer.</p>
              <p>Silobas taşımacılığı yapan firmalar arasından kapasite, güzergâh ve fiyat karşılaştırması yapmakla vakit kaybetmeyin — ihtiyacınızı tek formla iletin, 11 ildeki filo kapasitemizden aynı gün kiralama teklifi alın.</p>
            </div>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="py-16 px-4 md:px-10">
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

        {/* SSS */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Silobas Taşımacılığı Hakkında Sık Sorulan Sorular</h2>
            <div className="space-y-4 mt-6">
              {faq.map((f, i) => (
                <div key={i} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Silobas Taşımacılığı İçin Teklif Alın
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

export default HizmetSilobas;
