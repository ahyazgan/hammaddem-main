import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatHeroGorsel from "@/components/hafriyat/HafriyatHeroGorsel";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { HAFRIYAT_ILLER, HAFRIYAT_ILCELER } from "@/data/hafriyatData";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/utils/seoSchemas";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Shovel, Building2, Trash2, Layers, Mountain, Hammer } from "lucide-react";

const canonical = "https://hammaddem.co/hafriyat";
const title = "Hafriyat Firması | Kazı, Moloz, Taşıma – 30 Dk Teklif";
const description =
  "Hafriyat firması arıyorsanız: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma, dolgu. Marmara'da 11 il, lisanslı araçlar. 30 dakikada net fiyat.";

const hizmetler = [
  {
    icon: Shovel,
    title: "Temel & Bodrum Kazısı",
    desc: "Konut, site ve tesis projelerinde temel, bodrum ve havuz kazısı. İksa ile koordineli etaplı çalışma.",
    path: "/hafriyat/temel-kazisi",
  },
  {
    icon: Truck,
    title: "Hafriyat Toprağı Taşıma",
    desc: "Kazıdan çıkan toprağın lisanslı damperli araçlarla ruhsatlı döküm sahalarına nakli, döküm belgesiyle.",
    path: "/hizmetler/hafriyat-nakliyesi",
  },
  {
    icon: Trash2,
    title: "Moloz & İnşaat Atığı",
    desc: "Tadilat, yıkım ve şantiye molozunun yüklenmesi, ayrıştırılması ve mevzuata uygun bertarafı.",
    path: "/hafriyat/moloz-tasima",
  },
  {
    icon: Layers,
    title: "Dolgu Malzemesi",
    desc: "Stabilize, tuvenan, kırma taş ve dolgu toprağının ocaktan şantiyeye tesliği; serme-sıkıştırma desteği.",
    path: "/hafriyat/dolgu-malzemesi",
  },
  {
    icon: Mountain,
    title: "Arazi Düzenleme & Tesviye",
    desc: "Saha tesviyesi, kot düzenleme ve kazı-dolgu dengesi hesabıyla arazi hazırlığı.",
    path: "/hafriyat/dolgu-malzemesi",
  },
  {
    icon: Hammer,
    title: "Yıkım Sonrası Hafriyat",
    desc: "Kentsel dönüşüm yıkımları sonrası saha temizliği, moloz nakli ve arsanın inşaata hazırlanması.",
    path: "/hafriyat/yikim-sonrasi-hafriyat",
  },
];

const adimlar = [
  { step: "01", title: "İşinizi Bildirin", desc: "Formdan iş tipini, konumu ve tahmini hacmi girin. 2 dakika sürer, kayıt gerekmez." },
  { step: "02", title: "30 Dakikada Teklif", desc: "Ekibimiz sizi arar; işinize özel net m³ / kamyon fiyatını iletir." },
  { step: "03", title: "Keşif & Planlama", desc: "Gerekirse ücretsiz keşif yapılır, araç ve makine planı iş programınıza göre kurulur." },
  { step: "04", title: "İş Tamamlanır", desc: "Lisanslı araçlarla taşıma yapılır, döküm belgeleri tarafınıza iletilir." },
];

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Net Fiyat", desc: "Form doldurulduktan sonra 30 dakika içinde telefonla net fiyat teklifi." },
  { icon: Shield, title: "Lisanslı Araç & Ruhsatlı Döküm", desc: "Tüm taşımalar lisanslı araçlarla, ruhsatlı döküm sahalarına yapılır; belgeler size iletilir." },
  { icon: Truck, title: "Her Ölçekte İş", desc: "Tek kamyonluk molozdan on binlerce m³'lük saha kazısına kadar kapasite." },
  { icon: CheckCircle, title: "Tek Muhatap", desc: "Kazı, nakliye, döküm ve dolgu tek elden; şantiyeniz tek numarayla yönetir." },
];

const faq = [
  {
    q: "Hafriyat fiyatları nasıl hesaplanır?",
    a: "Hafriyat fiyatı genellikle m³ veya kamyon (sefer) başına verilir. Kazı hacmi, zemin türü (toprak, kil, kaya), döküm sahasına mesafe ve araç erişimi fiyatı belirleyen ana etkenlerdir. Formu doldurun; işinize özel net fiyatı 30 dakika içinde iletelim.",
  },
  {
    q: "Hafriyat toprağı dökümü için izin gerekir mi?",
    a: "Evet. Hafriyat toprağı ve inşaat atığı yalnızca lisanslı araçlarla taşınabilir ve belediyelerin ruhsat verdiği döküm sahalarına dökülebilir. Kaçak döküm hem araç sahibine hem iş sahibine yüksek ceza doğurur. Tüm işlerimiz belgeli ve mevzuata uygun yürütülür.",
  },
  {
    q: "Hangi bölgelerde hafriyat hizmeti veriyorsunuz?",
    a: "İstanbul (tüm ilçeler), Kocaeli, Bursa, Tekirdağ, Sakarya, Yalova, Balıkesir, Çanakkale, Edirne ile Ankara ve İzmir'de aktif olarak hizmet veriyoruz.",
  },
  {
    q: "Küçük işler için de teklif veriyor musunuz?",
    a: "Evet. Tek kamyonluk moloz ve tadilat atığından büyük saha kazılarına kadar her ölçekte iş için teklif veriyoruz; minimum hacim şartımız yok.",
  },
  {
    q: "Fiyat teklifi ücretli mi?",
    a: "Hayır. Teklif ve gerektiğinde yapılan keşif tamamen ücretsizdir; teklifi kabul etme zorunluluğunuz yoktur.",
  },
];

const HafriyatHub = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
  ]);

  const serviceJsonLd = buildServiceJsonLd({
    name: "Hafriyat İşleri – Kazı, Taşıma, Moloz, Dolgu",
    description,
    url: canonical,
  });

  const faqJsonLd = buildFaqJsonLd(faq);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="hafriyat firması, hafriyat firmaları, hafriyat şirketi, hafriyat şirketleri, hafriyat işleri, hafriyat işi, hafriyat taşeronu arayan firmalar, hafriyat fiyatları, moloz taşıma, temel kazısı"
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og/hafriyat-hub.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero + Form */}
        <section id="hafriyat-teklif" className="pt-[110px] pb-14 md:pb-20 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div className="pt-2 lg:pt-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                  Hafriyat İşleri
                </span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Hafriyat Firması — Kazı, Moloz,
                  <br />
                  Hafriyat Taşıma. <span className="text-navy">30 Dakikada</span> Teklif
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-6 max-w-[500px]">
                  Temel kazısı, hafriyat toprağı taşıma, moloz kaldırma, dolgu…
                  İşinizi bildirin; lisanslı araç filomuz ve deneyimli ekibimizle
                  net fiyat teklifini aynı saat içinde iletelim.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "Lisanslı araçlar, ruhsatlı döküm sahaları, belgeli teslim",
                    "Tek kamyonluk işten büyük saha kazısına her ölçek",
                    "İstanbul ve Marmara genelinde aktif filo",
                  ].map((m) => (
                    <li key={m} className="flex items-start gap-2.5 text-sm text-txt-2">
                      <CheckCircle className="w-4.5 h-4.5 w-[18px] h-[18px] text-navy shrink-0 mt-0.5" />
                      {m}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+905393308617"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all"
                >
                  <Phone className="w-4 h-4" /> Hemen Arayın: 0539 330 86 17
                </a>
                <HafriyatHeroGorsel
                  src="/images/hafriyat-hub.webp"
                  alt="Şantiyede ekskavatör hafriyat toprağını Avrupa tipi damperli kamyonlara yüklüyor, arkada bekleyen kamyon konvoyu"
                  caption="Lisanslı damperli filo ve deneyimli ekip"
                />
              </div>

              <HafriyatTeklifForm />
            </div>
          </div>
        </section>

        {/* Hizmetler */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Hafriyat Hizmetlerimiz</h2>
            <p className="text-sm text-txt-2 mb-10 max-w-[560px]">
              Kazıdan döküme, molozdan dolguya — şantiyenizin toprakla ilgili tüm işlerini tek elden yönetiyoruz.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hizmetler.map((h) => (
                <Link
                  key={h.title}
                  to={h.path}
                  className="block border border-border rounded-2xl p-6 bg-background hover:border-navy-border hover:-translate-y-1 transition-all no-underline"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center mb-4">
                    <h.icon className="w-5 h-5 text-navy" />
                  </div>
                  <h3 className="font-bold text-base mb-2 text-foreground">{h.title}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{h.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-navy">
                    Detay ve fiyatlar <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Nasıl çalışır */}
        <section className="py-16 md:py-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Nasıl Çalışır?</h2>
            <p className="text-sm text-txt-2 mb-10 max-w-[500px]">
              İş bildirmekten teslimata 4 adım. Süreci baştan sona biz yönetiyoruz.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {adimlar.map((s) => (
                <div key={s.step} className="border border-border rounded-2xl p-6 bg-background hover:border-navy-border hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-navy-light text-navy font-mono font-bold text-sm flex items-center justify-center mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neden */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {avantajlar.map((a) => (
                <div key={a.title} className="flex gap-4 items-start border border-border rounded-2xl p-6 bg-background hover:border-navy-border transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center shrink-0">
                    <a.icon className="w-5 h-5 text-navy" />
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

        {/* Bölgeler */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              <Building2 className="inline mr-2 w-7 h-7 text-navy" />
              Hafriyat Hizmet Bölgeleri
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[560px]">
              Bölgenize özel bilgi ve fiyat için şehir sayfasına gidin.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {HAFRIYAT_ILLER.map((l) => (
                <Link key={l.path} to={l.path} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                  {l.ad} Hafriyat
                </Link>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-txt-2 uppercase tracking-wider mb-3">İstanbul İlçeleri</h3>
            <div className="flex flex-wrap gap-2.5">
              {HAFRIYAT_ILCELER.map((l) => (
                <Link key={l.path} to={l.path} className="px-4 py-2 rounded-full text-xs font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                  {l.ad}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <HafriyatKaynaklar haric="/hafriyat" koyu />

        {/* FAQ */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Hafriyat Hakkında Sık Sorulan Sorular
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

        {/* CTA */}
        <section className="py-16 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Hafriyat İşinizi Şimdi Bildirin
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              2 dakikada formu doldurun; 30 dakika içinde net fiyat teklifiniz telefonunuzda olsun.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#hafriyat-teklif" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-navy no-underline shadow-[0_2px_12px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px transition-all cursor-pointer">
                Fiyat Teklifi Al <ArrowRight className="w-4 h-4" />
              </a>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HafriyatHub;
