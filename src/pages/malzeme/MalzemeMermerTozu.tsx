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

const fiyat = getFiyatBySlug("mermer-tozu")!;
const canonical = "https://hammaddem.co/malzeme/mermer-tozu";
const title = "Mermer Tozu Fiyatları & Silobas Taşıma – Hammaddem";
const description = "Mermer tozu silobas taşımacılığı ve toptan tedariği. Boya, plastik, seramik sektörü için mermer tozu. 11 ilde hızlı teslimat, online teklif alın.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik silobas ile güvenli, kapalı sistem taşıma. Tozlanma ve fire minimumda." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const kullanim = ["Boya ve vernik dolgu maddesi", "Plastik ve PVC dolgu katkısı", "Seramik ve fayans üretimi", "Yapı kimyasalları (macun, astar)", "Kağıt kaplama ve dolgu", "Tarım (toprak pH düzenleyici)"];

const faq = [{"q": "Mermer tozu hangi mikron değerlerinde tedarik edilir?", "a": "5, 10, 25 ve 90 mikron olmak üzere farklı inceliklerde mermer tozu tedarik ediyoruz."}, {"q": "Mermer tozu ile kalsit arasındaki fark nedir?", "a": "Her ikisi de kalsiyum karbonat (CaCO₃) kaynaklıdır. Mermer tozu mermer işleme atığından veya mermer öğütmeden, kalsit ise kireçtaşının öğütülmesinden elde edilir. Beyazlık ve saflık değerleri farklılık gösterebilir."}, {"q": "Mermer tozu neden silobas ile taşınır?", "a": "Nem alımına ve tozlanmaya karşı hassas olduğundan kapalı sistem silobas kullanılır."}, {"q": "Boya sektörü için hangi mermer tozu uygundur?", "a": "Boya üretiminde yüksek beyazlık değerine (ISO brightness >95) sahip, 5-10 mikron inceliğinde mermer tozu tercih edilir."}, {"q": "Minimum sipariş miktarı nedir?", "a": "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz."}, {"q": "Mermer tozu boya üretiminde nasıl kullanılır?", "a": "Boya üretiminde mermer tozu, hem dolgu hem de fonksiyonel pigment olarak kullanılır. Örtücülüğü artırır, viskoziteyi düzenler ve film kalınlığını iyileştirir. İç cephe boyalarında %20-40, dış cephe boyalarında %15-30 oranında kullanılabilir. 5-10 mikron inceliği ve ISO brightness >95 değeri tercih edilir."}, {"q": "Mermer tozu seramik üretiminde nasıl kullanılır?", "a": "Seramik ve fayans üretiminde mermer tozu, ham madde karışımına katkı malzemesi olarak eklenir. Pişirme sıcaklığını düşürür, yüzey parlaklığını artırır ve kırılma dayanımını iyileştirir. Sır (glazür) formülasyonlarında da kullanılmaktadır."}, {"q": "Beyaz mermer tozu ile gri mermer tozu farkı nedir?", "a": "Beyaz mermer tozu, Marmara veya kalsitten üretilir; ISO brightness değeri 90 üzerindedir ve boya, plastik, kağıt sektöründe tercih edilir. Gri veya renkli mermer tozu ise dekoratif beton, zemin kaplama ve peyzaj uygulamalarında estetik amaçlı kullanılır."}];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Mermer Tozu Silobas Taşıma", url: "/malzeme/mermer-tozu" },
]);

const MalzemeMermerTozu = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/mermer-tozu");

  const productJsonLd = buildProductOfferJsonLd(fiyat, { description, url: canonical });
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mermer Tozu Silobas Taşıma & Tedariği – Hammaddem",
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
        <meta name="keywords" content="mermer tozu, mermer tozu silobas, toptan mermer tozu, mermer tozu fiyatları, mermer tozu tedariği" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
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
                  Mermer Tozu Taşıma & Tedarik
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Mermer tozu silobas taşımacılığı ve toptan tedariği. Boya, plastik, seramik sektörü için mermer tozu. 11 ilde hızlı teslimat, online teklif alın.
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Mermer Tozu Nedir? Beyaz Mermer Tozu, Öğütülmüş Mermer (CaCO₃)</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Mermer tozu, mermer işleme tesislerinde kesme ve parlatma işlemleri sırasında ortaya çıkan veya doğrudan mermer bloklarının öğütülmesiyle üretilen ince granüllü bir kalsiyum karbonat malzemesidir. Yüksek beyazlık derecesi ve homojen tanecik yapısı sayesinde boya, plastik, seramik, kağıt ve yapı kimyasalları sektörlerinde dolgu malzemesi olarak kullanılır.</p>
              <p>Mermer tozu, nem alımına ve tozlanmaya karşı hassas olduğundan pnömatik silobas araçlarıyla kapalı sistemde taşınır. Hammaddem ile mermer tozu tedariğini güvenle yönetin; mikron değeri, beyazlık derecesi ve teslimat bilgilerinizi belirterek teklif alın.</p>
              <p>Sanayi tesisleri ve üreticilere 11 ilde mermer tozu teslimatı yapıyoruz.</p>
            </div>
          </div>
        </section>

        {/* Mermer Tozu Türleri */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Mermer Tozu Çeşitleri: Mikron ve Beyazlık Değerine Göre</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Mermer tozu, mikron inceliği ve beyazlık derecesine göre farklı sektörlere hitap eder.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "5-10 Mikron (Boya Kalitesi)", desc: "ISO brightness >95. Boya, vernik ve iç cephe uygulamaları için." },
                { title: "10-25 Mikron (Plastik Kalitesi)", desc: "PVC ve plastik dolgu maddesi. Maliyet düşürücü katkı." },
                { title: "25-90 Mikron (Genel Sanayi)", desc: "Yapıştırıcı, macun ve genel endüstriyel uygulamalar." },
                { title: "Beyaz Mermer Tozu", desc: "Yüksek beyazlık (>90 ISO). Boya, seramik ve kağıt için." },
                { title: "Dekoratif Mermer Tozu", desc: "Terazzo zemin, dekoratif beton ve peyzaj uygulamaları." },
                { title: "Seramik Katkı Tozu", desc: "Fayans ve seramik üretiminde ham madde katkısı." },
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Mermer Tozu Kullanım Alanları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Mermer Tozu hangi sektör ve uygulamalarda kullanılır?</p>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem ile Mermer Tozu Tedarik Edin?</h2>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Mermer Tozu Hakkında Sık Sorulan Sorular</h2>
            <p className="text-sm text-txt-2 mb-8">Mermer Tozu fiyatları, taşıma yöntemleri ve teslimat hakkında merak ettiğiniz her şey.</p>
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
              Mermer Tozu İçin Teklif Alın
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

export default MalzemeMermerTozu;
