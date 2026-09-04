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
const fiyat = getFiyatBySlug("kirec")!;
const canonical = "https://hammaddem.co/malzeme/kirec";
const title = "Kireç Tedarikçisi | Sönmemiş & Sönmüş Kireç Fiyatları 2026";
const description = "Sönmemiş, sönmüş ve mikronize kireç tedariki. Kireç fiyatları 2026: 2.000–5.000 TL/ton. Dökme silobas ve big-bag teslimat. 30 dakikada teklif.";

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Online talep formunu doldur, 30 dakika içinde rekabetçi fiyat teklifi al." },
  { icon: Shield, title: "Güvenli Taşıma", desc: "Pnömatik silobas ile güvenli, kapalı sistem taşıma. Tozlanma ve fire minimumda." },
  { icon: Truck, title: "11 İlde Teslimat", desc: "Türkiye genelinde geniş araç filomuz ile hızlı ve güvenilir teslimat." },
  { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişinizi anlık takip edin, teslimat durumunu panelden görün." },
];

const kullanim = ["İnşaat harç ve sıva uygulamaları", "Atık su ve içme suyu arıtma", "Baca gazı arıtma (desülfürizasyon)", "Tarım arazisi pH düzenleme", "Çelik ve metalurji sektörü", "Kimya ve ilaç üretimi"];

const faq = [{"q": "Sönmüş kireç ile sönmemiş kireç arasındaki fark nedir?", "a": "Sönmemiş kireç (CaO) kireçtaşının pişirilmesiyle elde edilir, suya temas ettiğinde sönmüş kirece (Ca(OH)₂) dönüşür. Her iki türü de tedarik ediyoruz."}, {"q": "Kireç neden silobas ile taşınır?", "a": "Kireç hava nemi ile reaksiyona girdiğinden kapalı sistem silobas zorunludur. Bu sayede ürün kalitesi ve güvenlik korunur."}, {"q": "Atık su arıtma için hangi kireç kullanılır?", "a": "Atık su arıtmada genellikle sönmüş kireç (kalsiyum hidroksit) kullanılır. Doz hesabı için uzmanlarımız destek verebilir."}, {"q": "Kireç ton fiyatı ne kadar? (2026)", "a": `2026 itibarıyla kireç ton fiyatı ${fiyat.minFiyat.toLocaleString("tr-TR")} – ${fiyat.maxFiyat.toLocaleString("tr-TR")} TL aralığındadır. Sönmemiş kireç (CaO) saflığa göre üst banda, sönmüş kireç alt-orta banda yakındır. Kesin fiyat için teklif alın.`}, {"q": "Kireç fiyatları nasıl belirlenir?", "a": "Kireç türü (sönmüş/sönmemiş), saflık derecesi, miktar ve mesafeye göre fiyat belirlenir."}, {"q": "Minimum sipariş miktarı nedir?", "a": "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz."}, {"q": "Mikronize kireç nedir, satışı nasıl yapılır?", "a": "Mikronize kireç, mikron boyutuna öğütülmüş sönmüş veya sönmemiş kireçtir; boya, plastik, yem katkısı ve su arıtmada kullanılır. 10 ton üzeri siparişlerde dökme silobas, küçük hacimlerde big-bag veya torbalı ambalaj ile mikronize kireç satışı ve teslimatı yapıyoruz."}, {"q": "Kireç hangi ambalajlarla teslim edilir?", "a": "Kireç ambalajlama seçeneği sipariş miktarına göre belirlenir: 10 ton üzeri dökme silobas ile pnömatik boşaltma, 1-1,5 tonluk big-bag veya palet üzerinde 25 kg torbalı teslimat yapıyoruz."}, {"q": "Sönmemiş kireç tedarikçisi nasıl seçilir?", "a": "İyi bir kireç tedarikçisi; saflık oranını belgeleyebilmeli, kapalı sistem silobas lojistiği sunabilmeli ve düzenli sevkiyat kapasitesine sahip olmalıdır. Hammaddem, çalıştığı kireç üreticilerinin analiz sertifikalarıyla birlikte tedarik hizmeti sunar."}, {"q": "Kireç tozu nedir ve sönmüş kireçten farkı nedir?", "a": "Kireç tozu genellikle sönmüş kireç (kalsiyum hidroksit, Ca(OH)₂) için kullanılan yaygın bir tanımlamadır. İnce öğütülmüş hali ile inşaat sıvalarında, çevre uygulamalarında ve atık su arıtmada kullanılır. Sönmemiş kireçten (CaO) farklı olarak su ile reaksiyona girmeden kullanılabilir."}, {"q": "Tarım arazilerinde kireç hangi amaçla kullanılır?", "a": "Tarımda kireç (tarımsal kireç / kalsiyum karbonat veya sönmüş kireç), asitli toprakların pH değerini yükseltmek için kullanılır. Toprak pH'ını 6-7 aralığına getirerek bitki besin alımını iyileştirir, alüminyum ve manganez toksisitesini azaltır. Dönüm başına gereken miktar toprak analizine göre belirlenir."}, {"q": "Baca gazı arıtmada hangi kireç kullanılır?", "a": "Baca gazı desülfürizasyon (FGD) sistemlerinde genellikle sönmüş kireç (Ca(OH)₂) veya kireçtaşı (CaCO₃) kullanılır. Kireç, SO₂ gazıyla reaksiyona girerek alçı (kalsiyum sülfat) oluşturur ve zararlı emisyonları azaltır."}];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "/" },
  { name: "Kireç Tedariki & Fiyatları", url: "/malzeme/kirec" },
]);

const MalzemeKirec = () => {
  const ilgiliMalzemeler = MALZEME_ROUTES.filter((r) => r.path !== "/malzeme/kirec");

  const productJsonLd = buildProductOfferJsonLd(fiyat, { description, url: canonical });
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Kireç Silobas Taşıma | Sönmüş & Sönmemiş Kireç – Hammaddem",
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
        <meta name="keywords" content="kireç tedarikçisi, sönmüş kireç, sönmemiş kireç, mikronize kireç, kireç silobas, toptan kireç, kireç fiyatları 2026, kireç ambalajlama, kalsiyum oksit" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og/malzeme-kirec.jpg" />
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
                  Kireç Fiyatları 2026 — Sönmemiş ve Sönmüş Kireç
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Sönmemiş kireç (CaO), sönmüş kireç (Ca(OH)₂) ve mikronize kireç tedarik hizmeti. Pnömatik silobas ile kapalı sistem kireç lojistiği; dökme, big-bag veya torbalı teslimat. İnşaat, çevre ve sanayi için 11 ilde.
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
              <HeroGorsel priority src="/images/malzeme-kirec.webp" alt="Kireç fırını ve kireçtaşı yığını önünde yüklemeye hazır silobas" />
            </div>
          </div>
        </section>

        {/* Fiyat Banner */}
        <FiyatBanner fiyat={fiyat} />

        {/* Bu malzeme nedir? */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Kireç Nedir? Sönmüş Kireç, Sönmemiş Kireç ve Kireç Tozu</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Kireç, kireçtaşının yüksek sıcaklıkta pişirilmesiyle elde edilen ve inşaat, çevre, tarım ve kimya sektörlerinde yaygın kullanılan temel bir endüstriyel üründür. Sönmemiş kireç (CaO, kalsinasyon ürünü) ve sönmüş kireç (Ca(OH)₂, su ile reaksiyona girmişhidrat kireç) olmak üzere iki ana formda bulunur.</p>
              <p>Kireç, nem alımına ve hava temasına karşı son derece reaktif olduğundan kapalı sistem silobas araçlarıyla taşınması zorunludur. Hammaddem ile kireç tedariğinizi güvenle yönetin; sönmüş veya sönmemiş kireç, miktar ve teslimat bilgilerinizi belirterek teklif alın.</p>
              <p>İnşaat şantiyeleri, atık su arıtma tesisleri, sanayi fabrikaları ve tarım arazilerine 11 ilde kireç teslimatı yapıyoruz.</p>
            </div>
          </div>
        </section>

        {/* Kireç Tedarikçisi & Lojistik */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Sönmemiş ve Sönmüş Kireç Tedarikçisi</h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>Hammaddem, Türkiye'nin önde gelen kireç üreticileriyle çalışan bir kireç tedarikçisidir. Sönmemiş kireç (CaO), sönmüş kireç (Ca(OH)₂) ve mikronize kireç tedarik hizmetimiz; üretici seçimi, kalite kontrolü, silobas lojistiği ve şantiyeye/tesise teslimatı tek noktadan kapsar. Toptan kireç alımlarında düzenli sevkiyat programı oluşturur, saflık ve analiz sertifikalarını sipariş öncesi paylaşırız.</p>
              <p>Kireç lojistik hizmeti, pnömatik silobas araçlarla kapalı sistemde yürütülür: ürün havayla ve nemle temas etmeden yüklenir, taşınır ve alıcı silosuna basınçla aktarılır. Böylece tozlanma, fire ve kalite kaybı en aza iner. Arıtma tesisleri ve sanayi kuruluşları için düzenli kireç tedarik sözleşmeleri de yapıyoruz.</p>
            </div>
          </div>
        </section>

        {/* Kireç Türleri */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Kireç Türleri: Sönmüş, Sönmemiş ve Kireçtaşı</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kullanım amacına göre farklı kireç türleri bulunmaktadır.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Sönmemiş Kireç (CaO)", desc: "Kalsiyum oksit. Yüksek ısı üretir, çelik ve kimya sektöründe kullanılır." },
                { title: "Sönmüş Kireç (Ca(OH)₂)", desc: "Kalsiyum hidroksit / kireç tozu. İnşaat, arıtma ve tarımda yaygın kullanım." },
                { title: "Kireçtaşı (CaCO₃)", desc: "Ham kireç hammaddesi. Baca gazı arıtma ve tarımsal amaçlarda kullanılır." },
                { title: "Tarımsal Kireç", desc: "Toprak pH düzenleyici. Asit toprakları iyileştirir, bitkisel verimi artırır." },
                { title: "Sanayi Kireci", desc: "Yüksek saflıkta kireç. Çelik, şeker ve kağıt sektörü üretim prosesleri için." },
                { title: "Hidrate Kireç", desc: "Hazır sönmüş kireç tozu. İnşaat sıvası ve atık su arıtma için kullanıma hazır." },
                { title: "Mikronize Kireç", desc: "İnce öğütülmüş (1-100 mikron) kireç. Boya, plastik, yem ve su arıtma için silobas, big-bag veya torbalı satış." },
              ].map((t) => (
                <div key={t.title} className="border border-border rounded-2xl p-5 bg-background hover:border-accent-border transition-colors">
                  <h3 className="font-bold text-sm mb-2">{t.title}</h3>
                  <p className="text-xs text-txt-2 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ambalaj ve Teslimat */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Kireç Ambalaj ve Teslimat Seçenekleri</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kireç ambalajlama seçeneği sipariş miktarına ve kullanım yerinize göre belirlenir.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Dökme / Silobas", desc: "10 ton ve üzeri siparişlerde pnömatik silobas ile dökme teslimat. Alıcı silosuna basınçlı boşaltma, sıfır ambalaj atığı." },
                { title: "Big-Bag (1-1,5 ton)", desc: "Silosu olmayan tesisler için 1-1,5 tonluk big-bag ambalaj. Vinç veya forklift ile kolay indirme." },
                { title: "Torbalı (25 kg)", desc: "Küçük şantiye ve bayiler için palet üzerinde 25 kg torbalı kireç. Kamyon veya kamyonetle teslimat." },
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Kireç Kullanım Alanları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">Kireç hangi sektör ve uygulamalarda kullanılır?</p>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem ile Kireç Tedarik Edin?</h2>
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Kireç Hakkında Sık Sorulan Sorular</h2>
            <p className="text-sm text-txt-2 mb-8">Kireç fiyatları, taşıma yöntemleri ve teslimat hakkında merak ettiğiniz her şey.</p>
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
              Kireç İçin Teklif Alın
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

export default MalzemeKirec;
