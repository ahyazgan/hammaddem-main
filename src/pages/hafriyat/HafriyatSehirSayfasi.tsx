import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatHeroGorsel from "@/components/hafriyat/HafriyatHeroGorsel";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { HAFRIYAT_ILLER, HAFRIYAT_ILCELER, hafriyatLokatif, type HafriyatLokasyon } from "@/data/hafriyatData";
import { DOKUM_UCRETLERI } from "@/data/hafriyatFiyatData";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildLocalBusinessJsonLd, buildServiceJsonLd } from "@/utils/seoSchemas";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, MapPin } from "lucide-react";

const BASE_URL = "https://hammaddem.co";

interface Props {
  lokasyon: HafriyatLokasyon;
}

const HafriyatSehirSayfasi = ({ lokasyon }: Props) => {
  const canonical = `${BASE_URL}${lokasyon.path}`;
  const lokatif = hafriyatLokatif(lokasyon);
  const [h1Bas, h1Son] = (lokasyon.h1 ?? `${lokasyon.ad} Hafriyat Firması — Kazı, Moloz ve Hafriyat Taşıma`).split(" — ");
  const ilAdi = lokasyon.parent
    ? HAFRIYAT_ILLER.find((i) => i.slug === lokasyon.parent)?.ad ?? "İstanbul"
    : lokasyon.ad;

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    ...(lokasyon.parent
      ? [
          { name: `${ilAdi} Hafriyat`, url: `/hafriyat/${lokasyon.parent}` },
          { name: `${lokasyon.ad} Hafriyat`, url: lokasyon.path },
        ]
      : [{ name: `${lokasyon.ad} Hafriyat`, url: lokasyon.path }]),
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbItems);
  const faqJsonLd = buildFaqJsonLd(lokasyon.faq);
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: `Hammaddem – ${lokasyon.ad} Hafriyat Firması`,
    description: lokasyon.description,
    url: canonical,
    city: lokasyon.ad,
  });
  const serviceJsonLd = buildServiceJsonLd({
    name: `${lokasyon.ad} Hafriyat Firması – Kazı, Moloz, Hafriyat Taşıma`,
    description: lokasyon.description,
    url: canonical,
    city: lokasyon.ad,
  });

  const dokumBilgisi = DOKUM_UCRETLERI.find((d) => d.slug === (lokasyon.parent ?? lokasyon.slug));
  const digerIller = HAFRIYAT_ILLER.filter((l) => l.slug !== (lokasyon.parent ?? lokasyon.slug));
  const istanbulIlceleri = HAFRIYAT_ILCELER.filter((l) => l.slug !== lokasyon.slug);
  const ilceleriGoster = lokasyon.parent === "istanbul" || lokasyon.slug === "istanbul";

  return (
    <>
      <Helmet>
        <title>{lokasyon.title}</title>
        <meta name="description" content={lokasyon.description} />
        <meta name="keywords" content={lokasyon.keywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={lokasyon.title} />
        <meta property="og:description" content={lokasyon.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://hammaddem.co/og/il-${lokasyon.parent ?? lokasyon.slug}.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={lokasyon.title} />
        <meta name="twitter:description" content={lokasyon.description} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero + Form */}
        <section id="hafriyat-teklif" className="pt-[110px] pb-14 md:pb-20 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div className="pt-2 lg:pt-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border">
                    <MapPin className="w-3 h-3" /> {lokasyon.ad}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-muted border border-border text-txt-2">
                    Hafriyat
                  </span>
                </div>
                <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                  {h1Bas} —
                  <br />
                  <span className="text-navy">{h1Son}</span>
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-6 max-w-[500px]">
                  {lokatif} lisanslı araçlarla temel kazısı, hafriyat toprağı taşıma,
                  moloz kaldırma ve dolgu işleri. Formu doldurun, işinize özel net
                  fiyatı 30 dakika içinde telefonla iletelim.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "Lisanslı araçlar, ruhsatlı döküm sahaları",
                    "Ücretsiz keşif ve net m³ / kamyon fiyatı",
                    "Küçük-büyük her ölçekte iş kabul edilir",
                  ].map((m) => (
                    <li key={m} className="flex items-start gap-2.5 text-sm text-txt-2">
                      <CheckCircle className="w-[18px] h-[18px] text-navy shrink-0 mt-0.5" />
                      {m}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+905393308617"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all"
                >
                  <Phone className="w-4 h-4" /> 0539 330 86 17
                </a>
                <HafriyatHeroGorsel
                  src={`/images/il-${lokasyon.parent ?? lokasyon.slug}.webp`}
                  alt={`${lokatif} hafriyat taşıma: Avrupa tipi damperli kamyon, ${ilAdi} manzarasıyla`}
                  caption={`${ilAdi} genelinde lisanslı hafriyat filosu`}
                />
              </div>

              <HafriyatTeklifForm
                defaultIl={ilAdi}
                baslik={`${lokatif} Hafriyat İşiniz mi Var?`}
              />
            </div>
          </div>
        </section>

        {/* Benzersiz bölge içeriği */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              {lokatif} Hafriyat Hizmeti
            </h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              {lokasyon.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-txt-2 uppercase tracking-wider mb-3">
                {lokasyon.ad} — Hizmet Verdiğimiz Bölgeler
              </h3>
              <div className="flex flex-wrap gap-2">
                {lokasyon.bolgeler.map((b) => (
                  <span key={b} className="px-3 py-1.5 rounded-full text-xs font-medium bg-navy-light border border-navy-border text-navy">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hizmet listesi */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">
              {lokatif} Verdiğimiz Hafriyat Hizmetleri
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { ad: "Temel & Bodrum Kazısı", path: "/hafriyat/temel-kazisi" },
                { ad: "Hafriyat Toprağı Taşıma", path: "/hizmetler/hafriyat-nakliyesi" },
                { ad: "Moloz & İnşaat Atığı Kaldırma", path: "/hafriyat/moloz-tasima" },
                { ad: "Dolgu Malzemesi Temini", path: "/hafriyat/dolgu-malzemesi" },
                { ad: "Arazi Düzenleme & Tesviye", path: "/hafriyat/dolgu-malzemesi" },
                { ad: "Yıkım Sonrası Hafriyat", path: "/hafriyat/yikim-sonrasi-hafriyat" },
              ].map((h) => {
                const sinif = "flex items-center gap-3 border border-border rounded-xl px-4 py-3.5 bg-background hover:border-navy-border transition-colors no-underline";
                const govde = (
                  <>
                    <CheckCircle className="w-4 h-4 text-navy shrink-0" />
                    <span className="text-sm font-medium text-foreground">{h.ad}</span>
                  </>
                );
                return h.path ? (
                  <Link key={h.ad} to={h.path} className={sinif}>{govde}</Link>
                ) : (
                  <div key={h.ad} className={sinif}>{govde}</div>
                );
              })}
            </div>
            {dokumBilgisi && (
              <div className="mt-8 border border-navy-border bg-navy-light/40 rounded-2xl p-5 md:p-6">
                <h3 className="font-bold text-sm md:text-base mb-2">
                  {ilAdi} Hafriyat Döküm Ücreti — {dokumBilgisi.kalemler[0].ucret} {dokumBilgisi.kalemler[0].birim}
                </h3>
                <p className="text-sm text-txt-2 leading-relaxed mb-3">
                  {dokumBilgisi.kalemler[0].kalem}. Döküm bedeli taşıma ücretinden ayrı bir kalemdir ve
                  {" "}{ilAdi} özelinde sefer fiyatını doğrudan etkiler. Tekliflerimizde döküm dahil net fiyat veriyoruz.
                </p>
                <Link
                  to={`/rehber/hafriyat-dokum-ucretleri#${dokumBilgisi.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-navy no-underline hover:underline"
                >
                  {ilAdi} döküm ücretleri ve saha listesi <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
            <div className="mt-6">
              <Link to="/hafriyat" className="inline-flex items-center gap-1 text-sm font-semibold text-navy no-underline hover:underline">
                Tüm hafriyat hizmetlerimizi inceleyin <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Neden */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">
              {lokatif} Neden Hammaddem?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Clock, title: "30 Dk'da Teklif", desc: "Form sonrası aynı saat içinde net fiyat." },
                { icon: Shield, title: "Belgeli İş", desc: "Lisanslı araç, ruhsatlı döküm, evraklar sizde." },
                { icon: Truck, title: "Yerel Filo", desc: `${lokasyon.ad} bölgesini tanıyan araç ve operatörler.` },
                { icon: CheckCircle, title: "Tek Muhatap", desc: "Kazı, nakliye ve döküm tek elden yönetilir." },
              ].map((a) => (
                <div key={a.title} className="flex flex-col gap-3 border border-border rounded-2xl p-6 bg-background hover:border-navy-border transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-navy-light flex items-center justify-center shrink-0">
                    <a.icon className="w-5 h-5 text-navy" />
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

        {/* FAQ */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              {lokasyon.ad} Hafriyat — Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {lokasyon.faq.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HafriyatKaynaklar
          haric={lokasyon.path}
          baslik="Fiyat, Hesaplama ve Rehberler"
          aciklama={`${lokatif} bütçenizi kendiniz çıkarın: m³ fiyatları, döküm ücretleri, kamyon kapasiteleri ve hesaplama aracı.`}
          koyu
        />

        {/* CTA */}
        <section className="py-16 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              {lokasyon.ad} Hafriyat İşiniz İçin Teklif Alın
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Formu doldurun ya da arayın; 30 dakika içinde {lokasyon.ad} bölgesine özel net fiyat verelim.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#hafriyat-teklif" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-navy no-underline shadow-[0_2px_12px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px transition-all">
                Fiyat Teklifi Al <ArrowRight className="w-4 h-4" />
              </a>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
          </div>
        </section>

        {/* İç linkler */}
        <section className="py-12 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto space-y-8">
            {ilceleriGoster && istanbulIlceleri.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mb-3">İstanbul İlçelerinde Hafriyat</h3>
                <div className="flex flex-wrap gap-2">
                  {istanbulIlceleri.map((l) => (
                    <Link key={l.path} to={l.path} className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                      {l.ad}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mb-3">Diğer Şehirlerde Hafriyat</h3>
              <div className="flex flex-wrap gap-2">
                {digerIller.map((l) => (
                  <Link key={l.path} to={l.path} className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                    {l.ad} Hafriyat
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HafriyatSehirSayfasi;
