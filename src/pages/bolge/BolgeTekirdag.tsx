import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { MALZEME_ROUTES } from "@/pages/malzeme/malzemeRoutes";
import { BOLGE_ROUTES } from "./bolgeRoutes";
import { buildBreadcrumbJsonLd } from "@/utils/seoSchemas";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, MapPin } from "lucide-react";

const canonical = "https://hammaddem.co/hizmet-bolgeleri/tekirdag";
const title = "Tekirdağ Silobas & Hafriyat Hizmetleri – Hammaddem";
const description = "Tekirdağ'da silobas taşımacılığı ve hafriyat malzemesi tedariği. Çerkezköy ve Çorlu OSB bölgelerine hızlı teslimat. Online teklif alın.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik silobas ve hafriyat araçlarıyla güvenli teslimat." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Hizmet Bölgeleri", url: "/hizmet-bolgeleri/tekirdag" },
  { name: "Tekirdağ Silobas & Hafriyat", url: "/hizmet-bolgeleri/tekirdag" },
]);

const BolgeTekirdag = () => {
  const digerSehirler = BOLGE_ROUTES.filter((r) => r.path !== "/hizmet-bolgeleri/tekirdag");

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hammaddem – Tekirdağ Silobas & Hafriyat",
    description,
    url: canonical,
    telephone: "+905393308617",
    areaServed: { "@type": "City", name: "Tekirdağ", containedInPlace: { "@type": "Country", name: "Türkiye" } },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tekirdağ Silobas ve Hafriyat Hizmetleri",
    description,
    provider: { "@type": "Organization", name: "Hammaddem" },
    areaServed: { "@type": "City", name: "Tekirdağ" },
    url: canonical,
  };

  return (
    <>
      <Helmet>
        <title>{`Tekirdağ Silobas & Hafriyat Hizmetleri – Hammaddem`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="tekirdağ silobas, tekirdağ hafriyat, çerkezköy çimento, çorlu kum, tekirdağ çakıl, silobas tekirdağ" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <meta property="og:title" content={`Tekirdağ Silobas & Hafriyat Hizmetleri – Hammaddem`} />
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
                  Hizmet Bölgesi
                </span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Tekirdağ Silobas & Hafriyat
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Tekirdağ&apos;da silobas taşımacılığı ve hafriyat malzemesi tedariği. Çerkezköy ve Çorlu OSB bölgelerine hızlı teslimat. Online teklif alın.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/teklif-al" className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
                    Hemen Teklif Al <ArrowRight className="inline ml-1 w-4 h-4" />
                  </Link>
                  <a href="tel:+905393308617" className="px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all">
                    <Phone className="inline mr-1.5 w-4 h-4" /> Bizi Arayın
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Tekirdağ&apos;da Hizmetlerimiz</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Tekirdağ, Trakya&apos;nın sanayi başkenti olarak tekstil, kimya ve gıda sektörlerinde yoğun malzeme talebine sahiptir. Çerkezköy ve Çorlu OSB bölgeleri Türkiye&apos;nin en büyük organize sanayi alanları arasında yer almaktadır. Tekirdağ Limanı (Asyaport) ile uluslararası lojistik bağlantıya sahip olan şehirde düzenli silobas ve hafriyat teslimatları gerçekleştiriyoruz.</p>
              <p>Hammaddem ile Tekirdağ&apos;da çimento, kalsit, kireç, alçı, mermer tozu ve uçucu kül silobas taşımacılığı; kum, çakıl, mıcır ve stabilize malzeme tedariği hizmetlerine dijital platformdan ulaşın. OSB tesisleri, fabrikalar ve inşaat sahalarına aynı gün veya ertesi gün teslimat imkânı sunuyoruz.</p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Tekirdağ Hizmet Detayı</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="border border-border rounded-2xl p-6 bg-background hover:border-accent-border transition-colors">
                <h3 className="font-bold text-lg mb-2">Silobas Taşımacılığı</h3>
                <p className="text-sm text-txt-2 leading-relaxed mb-2">
                  Çimento, kalsit, uçucu kül, kireç, mermer tozu, alçı ve tüm toz/granül malzemeleri pnömatik silobas araçlarıyla Tekirdağ genelinde teslim ediyoruz.
                </p>
                <p className="text-xs text-txt-2 leading-relaxed mb-3">
                  <strong>Hizmet bölgeleri:</strong> Çerkezköy OSB, Çorlu OSB, Ergene, Kapaklı, Muratlı
                </p>
                <Link to="/hizmetler/silobas" className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-1 no-underline hover:underline">
                  Silobas hizmeti detayı <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="border border-border rounded-2xl p-6 bg-background hover:border-accent-border transition-colors">
                <h3 className="font-bold text-lg mb-2">Hafriyat & İnşaat Malzemesi</h3>
                <p className="text-sm text-txt-2 leading-relaxed mb-2">
                  Kum, çakıl, mıcır, stabilize malzeme tedariği. Tekirdağ ilçelerinde sanayi tesisleri ve inşaat şantiyelerine damperli araçlarla teslimat.
                </p>
                <p className="text-xs text-txt-2 leading-relaxed mb-3">
                  <strong>İlçeler:</strong> Çerkezköy, Çorlu, Ergene, Kapaklı, Süleymanpaşa, Muratlı
                </p>
                <Link to="/hizmetler/hafriyat-nakliyesi" className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-1 no-underline hover:underline">
                  Hafriyat hizmeti detayı <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Tekirdağ&apos;da Taşıdığımız Malzemeler</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[520px]">Detay ve fiyat için malzeme sayfasına tıklayın, Tekirdağ&apos;a özel teklif alın.</p>
            <div className="flex flex-wrap gap-2.5">
              {MALZEME_ROUTES.map((m) => (
                <Link key={m.path} to={`/malzeme/${m.path.split("/").pop()}/tekirdag`} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">
                  Tekirdağ — {m.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

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

        <section className="py-16 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Tekirdağ İçin Teklif Alın</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Üyelik gerekmeden talep formunu doldurun, dakikalar içinde size özel fiyat teklifi alın.
            </p>
            <Link to="/teklif-al" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
              Üyeliksiz Teklif Al <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Diğer Hizmet Bölgeleri</h2>
            <p className="text-sm text-txt-2 mb-6">Hizmet verdiğimiz diğer şehir sayfalarına göz atın.</p>
            <div className="flex flex-wrap gap-2.5">
              {digerSehirler.map((m) => (
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

export default BolgeTekirdag;
