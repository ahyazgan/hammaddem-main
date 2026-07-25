import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import OrderCard from "@/components/landing/OrderCard";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";
import { CheckCircle, Clock, Phone, ShieldCheck, UserX } from "lucide-react";

const canonical = "https://hammaddem.co/teklif-al";
const title = "Üyeliksiz Teklif Al – 30 Dakikada Fiyat | Hammaddem";
const description =
  "Üye olmadan fiyat teklifi alın: hafriyat, silobas, kum, çakıl, çimento… 2 dakikada formu doldurun, 30 dakika içinde telefonunuza net fiyat gelsin. Kayıt gerekmez, ücretsizdir.";

const avantajlar = [
  { icon: UserX, title: "Üyelik Gerekmez", desc: "Kayıt olmadan, sadece telefon numaranızla talep oluşturun." },
  { icon: Clock, title: "30 Dakikada Fiyat", desc: "Talebiniz düşer düşmez ekibimiz arar, net fiyatı iletir." },
  { icon: ShieldCheck, title: "Ücretsiz & Bağlayıcı Değil", desc: "Teklif almak tamamen ücretsizdir; kabul zorunluluğu yoktur." },
  { icon: CheckCircle, title: "Takip Numarası", desc: "Talep numaranızla üye olmadan da durumunuzu sorgulayın." },
];

const faq = [
  {
    q: "Üye olmadan fiyat teklifi alabilir miyim?",
    a: "Evet. Formu misafir olarak doldurmanız yeterli; yalnızca telefon numaranız gerekir. 30 dakika içinde sizi arayıp net fiyatı iletiyoruz.",
  },
  {
    q: "Teklif almak ücretli mi ya da bağlayıcı mı?",
    a: "Hayır. Teklif tamamen ücretsizdir ve hiçbir bağlayıcılığı yoktur; fiyatı beğenmezseniz kabul etmek zorunda değilsiniz.",
  },
  {
    q: "Talebimi üye olmadan nasıl takip ederim?",
    a: "Talebinizi gönderdikten sonra size bir takip numarası veriyoruz. Talep Takip sayfasından bu numara ve telefonunuzla durumu sorgulayabilirsiniz.",
  },
  {
    q: "Üyelik ne işe yarıyor?",
    a: "Üyelik zorunlu değildir; ancak hesap oluşturursanız tüm taleplerinizi panelden yönetebilir, dijital irsaliye ve sipariş geçmişinize ulaşabilirsiniz.",
  },
];

const TeklifAl = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Üyeliksiz Teklif Al", url: "/teklif-al" },
  ]);
  const faqJsonLd = buildFaqJsonLd(faq);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="üyeliksiz teklif, kayıt olmadan fiyat al, hafriyat fiyat teklifi, silobas fiyat, kum fiyatı, çakıl fiyatı, online teklif" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero + Form */}
        <section className="pt-[100px] pb-14 md:pb-20 px-4 md:px-10">
          <div className="max-w-[880px] mx-auto flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4 mt-6">
              Üyelik Gerekmez
            </span>
            <h1 className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-tight leading-[1.12] mb-4">
              Üye Olmadan <span className="text-primary">Fiyat Teklifi</span> Alın
            </h1>
            <p className="text-sm md:text-base text-txt-2 leading-[1.7] mb-8 max-w-[560px]">
              Hafriyat işi, silobas yükü ya da malzeme alımı — hangisi olursa olsun
              aşağıdaki formu misafir olarak doldurun. 30 dakika içinde sizi arayıp
              net fiyatı iletelim. Kayıt yok, ücret yok, bağlayıcılık yok.
            </p>

            <OrderCard />

            <p className="text-xs text-txt-3 mt-5">
              Hafriyat işine özel form için{" "}
              <Link to="/hafriyat" className="text-navy font-semibold hover:underline">
                hafriyat sayfasını
              </Link>{" "}
              kullanabilirsiniz.
            </p>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {avantajlar.map((a) => (
                <div key={a.title} className="flex flex-col gap-3 border border-border rounded-2xl p-6 bg-background hover:border-accent-border transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                    <a.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm mb-1">{a.title}</h2>
                    <p className="text-xs text-txt-2 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Üyeliksiz Teklif Hakkında Sık Sorulanlar
            </h2>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alt CTA */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-3">
              Formla uğraşmak istemiyor musunuz?
            </h2>
            <p className="text-sm text-txt-2 mb-6">
              Bizi doğrudan arayın; bilgileri telefonda alıp teklifinizi hazırlayalım.
            </p>
            <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
              <Phone className="w-4 h-4" /> 0539 330 86 17
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TeklifAl;
