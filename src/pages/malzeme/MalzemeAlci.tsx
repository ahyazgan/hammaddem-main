import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Package } from "lucide-react";
import { MALZEME_ROUTES } from "./malzemeRoutes";

const canonical = "https://hammaddem.co/malzeme/alci";
const title = "Alçı Silobas Taşıma & Tedariği – Hammaddem";
const description = "Alçı tozu silobas taşımacılığı. İnşaat alçısı, sıva alçısı, alçıpan alçısı tedariği. Online teklif alın.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik silobas ile alçı tozu tozlanma ve fire riski minimuma iner." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const faq = [
  { q: "Alçı türleri nelerdir?", a: "Yapı alçısı (inşaat alçısı), sıva alçısı, alçıpan alçısı ve kalıp alçısı gibi türler vardır. Kullanım amacına göre farklı sertleşme süresi ve dayanıklılık özellikleri sunulur. Hammaddem ile ihtiyacınıza uygun alçı türünü silobas ile tedarik ediyoruz." },
  { q: "Alçı nasıl üretilir?", a: "Alçıtaşı (jips) yüksek sıcaklıkta pişirilerek kısmen suyu uçurulur; öğütülerek toz alçı elde edilir. Su ile karıştırıldığında tekrar katılaşır. İnşaat ve dekorasyonda sıva, alçıpan ve süsleme malzemesi olarak kullanılır." },
  { q: "Alçı silobas ile nasıl taşınır?", a: "Alçı tozu pnömatik silobas araçlarıyla taşınır. Boşaltma silo veya depoya hava basıncı ile aktarılır. Talep oluşturarak miktar ve teslimat adresinize göre teklif alabilirsiniz." },
  { q: "Alçıpan fabrikasına teslimat yapıyor musunuz?", a: "Evet. Alçıpan ve diğer alçı ürünleri üreten tesislere alçı tozu teslimatı yapıyoruz. 11 ilde hizmet veriyoruz; talep formundan teklif alabilirsiniz." },
];

const MalzemeAlci = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/alci");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Alçı Silobas Taşıma ve Alçı Tedariği",
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

        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">Malzeme</span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">Alçı Silobas Taşıma & Tedarik</h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Alçı tozu silobas taşımacılığı ile inşaat alçısı, sıva alçısı ve alçıpan alçısı tedariği sunuyoruz. İnşaat ve dekorasyon sektörü için 11 ilde teslimat, online teklif alın.
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
                  <Package className="w-32 h-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Bu Malzeme Nedir?</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>
                Alçı, alçıtaşı (jips, kalsiyum sülfat dihidrat) mineralinin ısıtılıp öğütülmesiyle elde edilen toz bir bağlayıcı malzemedir. Su ile karıştırıldığında kısa sürede katılaşır. Yapı alçısı, sıva alçısı, alçıpan alçısı ve kalıp alçısı gibi türler inşaat ve dekorasyonda sıva, bölme duvar ve tavan kaplama için kullanılır.
              </p>
              <p>
                Alçıpan levha üretimi, inşaat sıvası ve süsleme elemanları alçı tüketiminin başlıca alanlarıdır. Hammaddem ile alçı tozu silobas taşımacılığı, 11 ilde güvenli teslimat ile sunulur.
              </p>
              <p>
                İnşaat alçısı, sıva alçısı veya alçıpan tesisi teslimatı için talep oluşturarak teklif alabilirsiniz. Ton bazında tedarik ve teslimat adresinize göre fiyatlandırma yapılır.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Kullanım Alanları</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["İnşaat sıvası ve duvar sıvası", "Alçıpan levha üretimi", "Dekoratif sıva ve süsleme", "Kalıp alçısı ve maket", "Tavan kaplama ve bölme duvar", "Onarım ve restorasyon"].map((m) => (
                <li key={m} className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-txt-2">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

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

        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Sıkça Sorulan Sorular</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-2xl px-6 bg-background data-[state=open]:border-accent-border transition-colors">
                  <AccordionTrigger className="text-sm md:text-base font-semibold text-left hover:no-underline py-5">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-txt-2 leading-relaxed pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Alçı İçin Teklif Alın</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">Hesap oluşturun, talep formunu doldurun, dakikalar içinde size özel fiyat teklifi alın.</p>
            <Link to="/kayit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
              Teklif Alın / Kayıt Olun <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">İlgili Malzemeler</h2>
            <p className="text-sm text-txt-2 mb-6">Diğer malzeme sayfalarımıza göz atın.</p>
            <div className="flex flex-wrap gap-2.5">
              {ilgiliMalzemeler.map((m) => (
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

export default MalzemeAlci;
