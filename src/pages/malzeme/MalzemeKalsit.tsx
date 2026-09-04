import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Layers } from "lucide-react";
import { MALZEME_ROUTES } from "./malzemeRoutes";
import { buildBreadcrumbJsonLd, buildProductOfferJsonLd } from "@/utils/seoSchemas";
import FiyatBanner from "@/components/landing/FiyatBanner";
import { getFiyatBySlug } from "@/data/fiyatData";

import HeroGorsel from "@/components/HeroGorsel";
const fiyat = getFiyatBySlug("kalsit")!;
const canonical = "https://hammaddem.co/malzeme/kalsit";
const title = "Kalsit Fiyatları 2026 | Kalsit Tozu Ton Fiyatı";
const description = "Kalsit tozu ton fiyatı 2026: 1.500–4.000 TL/ton, mikron ve saflığa göre. Boya, plastik ve kağıt sanayisine silobas teslimat. 30 dakikada teklif.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik silobas ile güvenli, kapalı sistem taşıma. Tozlanma ve fire minimumda." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const kullanim = ["Boya ve vernik üretimi", "Plastik ve polimer dolgu maddesi", "Kağıt üretimi ve kaplama", "Lastik sektörü dolgu maddesi", "Kimya ve ilaç sektörü", "Tarım (toprak pH düzenleyici)"];

const faq = [{"q": "Kalsit hangi mikron değerlerinde tedarik edilir?", "a": "2, 5, 10, 25 ve 90 mikron olmak üzere farklı inceliklerde kalsit tozu tedarik ediyoruz. İhtiyacınıza göre seçim yapabilirsiniz."}, {"q": "Kalsit neden silobas ile taşınır?", "a": "Kalsit tozu nem alımına ve tozlanmaya karşı hassas olduğundan kapalı sistem silobas araçları kullanılır. Bu yöntem ürün kalitesini ve saflığını korur."}, {"q": "Kalsit fiyatları nasıl belirlenir?", "a": "Mikron değeri, saflık oranı, miktar ve mesafeye göre fiyat değişir. Güncel kalsit fiyatı için online teklif alın."}, {"q": "Boya sektörü için hangi kalsit uygundur?", "a": "Boya üretiminde genellikle 2-10 mikron arasında, yüksek beyazlık değerine sahip kalsit tercih edilir."}, {"q": "Minimum sipariş miktarı nedir?", "a": "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz."}, {"q": "Kalsit ile kalsiyum karbonat aynı şey mi?", "a": "Evet, kalsit ve kalsiyum karbonat (CaCO₃) aynı kimyasal bileşiği ifade eder. Kalsit, kalsiyum karbonatın en yaygın doğal mineral formudur. Sektörde öğütülmüş kalsit, kalsit tozu ve GCC (Ground Calcium Carbonate) olarak da adlandırılır."}, {"q": "Öğütülmüş kalsit ile çökeltilmiş kalsit (PCC) farkı nedir?", "a": "Öğütülmüş kalsit (GCC), doğal kireçtaşının mekanik olarak öğütülmesiyle üretilir ve daha ekonomiktir. Çökeltilmiş kalsit (PCC), kimyasal proses ile üretilir; çok ince mikron değerleri ve yüksek beyazlık sağlar. Boya ve ilaç sektöründe PCC, genel dolgu uygulamalarında GCC tercih edilir."}, {"q": "Plastik sektöründe kalsit dolgu olarak nasıl kullanılır?", "a": "Plastik üretiminde kalsit (kalsiyum karbonat), hem maliyet düşürücü hem de mekanik özellikleri iyileştirici dolgu maddesi olarak kullanılır. PVC, polipropilen ve polietilen ürünlerine %10-40 oranında katılabilir. Sertlik, yüzey parlaklığı ve işlenebilirliği artırır."}];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Kalsit Silobas Taşıma", url: "/malzeme/kalsit" },
]);

const MalzemeKalsit = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/kalsit");

  const productJsonLd = buildProductOfferJsonLd(fiyat, { description, url: canonical });
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Kalsit Silobas Taşıma | Kalsit Tozu Tedariği – Hammaddem",
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
        <meta name="keywords" content="kalsit silobas, kalsit tozu, toptan kalsit, kalsit fiyatları, öğütülmüş kalsit, kalsit tedariği" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og/malzeme-kalsit.jpg" />
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
                  Kalsit Fiyatları 2026 — Kalsit Tozu Ton Fiyatı
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Kalsit tozu ve öğütülmüş kalsit silobas taşımacılığı. Boya, plastik, kağıt sektörü için toptan kalsit tedariği. 11 ilde hızlı teslimat, online teklif alın.
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
              <HeroGorsel src="/images/malzeme-kalsit.webp" alt="Beyaz kalsit ocağı ve öğütme tesisinde bekleyen silobas çekici" />
            </div>
          </div>
        </section>

        {/* Fiyat Banner */}
        <FiyatBanner fiyat={fiyat} />

        {/* Bu malzeme nedir? */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Kalsit Nedir? Öğütülmüş Kalsit Tozu, Kalsiyum Karbonat (CaCO₃)</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Kalsit (kalsiyum karbonat, CaCO₃), boya, plastik, kağıt, lastik ve kimya sektörlerinde dolgu malzemesi olarak yaygın kullanılan endüstriyel bir mineraldir. Beyazlık derecesi ve inceliği (mikron cinsinden) kullanım alanını belirler. 2, 5, 10, 25 ve 90 mikron kalsit başlıca ticari formlarıdır.</p>
              <p>Kalsit tozu, tozlanma ve nem alımına karşı hassas olduğundan pnömatik silobas araçlarıyla taşınır. Kapalı sistem boşaltma ile ürün kalitesi korunur. Hammaddem ile kalsit tedariğini dijital platformdan yönetin; mikron değeri, miktar ve teslimat adresinizi belirterek teklif alın.</p>
              <p>Sanayi tesisleri, boya fabrikaları ve plastik üreticilerine 11 ilde kalsit tozu tedariği yapıyoruz. Düzenli ve güvenilir tedarik için online talep oluşturun.</p>
            </div>
          </div>
        </section>

        {/* Kalsit Türleri */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Kalsit Türleri: Mikron Değerlerine Göre Kalsit Çeşitleri</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kalsit, mikron inceliğine göre farklı sektörlerde kullanılmaktadır.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "2-5 Mikron Kalsit", desc: "Boya, vernik ve ilaç sektörü için ultra ince, yüksek beyazlıklı kalsit." },
                { title: "10 Mikron Kalsit", desc: "Plastik ve kauçuk dolgu maddesi. Yüzey kalitesini artırır." },
                { title: "25 Mikron Kalsit", desc: "PVC, polipropilen ve masterbatch üretiminde ekonomik dolgu." },
                { title: "90 Mikron Kalsit", desc: "Kağıt, yapıştırıcı ve genel endüstriyel uygulamalar için kaba kalsit." },
                { title: "Öğütülmüş Kalsit (GCC)", desc: "Doğal kireçtaşından mekanik öğütme ile üretilen kalsit tozu." },
                { title: "Çökeltilmiş Kalsit (PCC)", desc: "Kimyasal proses ile üretilen ultra beyaz, çok ince kalsit." },
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Kalsit Kullanım Alanları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kalsit hangi sektör ve uygulamalarda kullanılır?</p>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem ile Kalsit Tedarik Edin?</h2>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Kalsit Hakkında Sık Sorulan Sorular</h2>
            <p className="text-sm text-txt-2 mb-8">Kalsit fiyatları, taşıma yöntemleri ve teslimat hakkında merak ettiğiniz her şey.</p>
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
              Kalsit İçin Teklif Alın
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

export default MalzemeKalsit;
