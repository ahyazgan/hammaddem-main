import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { MALZEME_ROUTES } from "@/pages/malzeme/malzemeRoutes";
import { BOLGE_ROUTES } from "./bolgeRoutes";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, MapPin } from "lucide-react";

const canonical = "https://hammaddem.co/hizmet-bolgeleri/ankara";
const title = "Ankara Silobas & Hafriyat Hizmetleri – Hammaddem";
const description = "Ankara'da silobas taşımacılığı ve hafriyat malzemesi tedariği. OSB ve şantiye teslim, hızlı teslimat. Online teklif alın.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik silobas ve hafriyat araçlarıyla güvenli teslimat." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const BolgeAnkara = () => {
  const digerSehirler = BOLGE_ROUTES.filter((r) => r.path !== "/hizmet-bolgeleri/ankara");

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hammaddem – Ankara Silobas & Hafriyat",
    description,
    url: canonical,
    telephone: "+905393308617",
    areaServed: { "@type": "City", name: "Ankara", containedInPlace: { "@type": "Country", name: "Türkiye" } },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ankara Silobas ve Hafriyat Hizmetleri",
    description,
    provider: { "@type": "Organization", name: "Hammaddem" },
    areaServed: { "@type": "City", name: "Ankara" },
    url: canonical,
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
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">Hizmet Bölgesi</span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">Ankara Silobas & Hafriyat</h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Ankara'da silobas taşımacılığı ve hafriyat malzemesi tedariği ile OSB'ler, şantiyeler ve sanayi tesislerine hızlı teslimat sunuyoruz. Çimento, kalsit, kum, mıcır ve tüm inşaat malzemeleri için talep oluşturarak dakikalar içinde teklif alabilirsiniz.
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
                  <MapPin className="w-32 h-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Şehirdeki Hizmetlerimiz</h2>
            <p className="text-sm text-txt-2 mb-6 max-w-[600px]">
              Ankara'da OSB'ler, şantiyeler ve sanayi bölgelerine silobas ve hafriyat hizmeti veriyoruz.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="border border-border rounded-2xl p-6 bg-background hover:border-accent-border transition-colors">
                <h3 className="font-bold text-lg mb-2">Silobas Taşımacılığı</h3>
                <p className="text-sm text-txt-2 leading-relaxed">
                  Çimento, kalsit, uçucu kül, kireç, mermer tozu, alçı ve tüm toz/granül malzemeleri pnömatik silobas araçlarıyla Ankara genelinde teslim ediyoruz. Beton santralleri ve fabrikalara kapalı sistem boşaltma.
                </p>
                <Link to="/hizmetler/silobas" className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3 no-underline hover:underline">
                  Silobas hizmeti <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="border border-border rounded-2xl p-6 bg-background hover:border-accent-border transition-colors">
                <h3 className="font-bold text-lg mb-2">Hafriyat & İnşaat Malzemesi</h3>
                <p className="text-sm text-txt-2 leading-relaxed">
                  Kum, çakıl, mıcır, stabilize malzeme ve hafriyat tedariği. Şantiye ve inşaat sahalarına damperli araçlarla teslimat. OSB ve sanayi bölgelerine hızlı teslimat.
                </p>
                <Link to="/hizmetler/hafriyat-nakliyesi" className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3 no-underline hover:underline">
                  Hafriyat hizmeti <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Taşıdığımız Malzemeler</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[520px]">Ankara'da tedarik ettiğimiz malzemeler. Detay için malzeme sayfalarına göz atın.</p>
            <div className="flex flex-wrap gap-2.5">
              {MALZEME_ROUTES.map((m) => (
                <Link key={m.path} to={m.path} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

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

        <section className="py-16 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Ankara İçin Teklif Alın</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">Hesap oluşturun, talep formunu doldurun, dakikalar içinde size özel fiyat teklifi alın.</p>
            <Link to="/kayit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
              Teklif Alın / Kayıt Olun <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10 bg-off">
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

export default BolgeAnkara;
