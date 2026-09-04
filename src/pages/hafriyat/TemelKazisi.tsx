import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatHeroGorsel from "@/components/hafriyat/HafriyatHeroGorsel";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/utils/seoSchemas";
import {
  M3_FIYATLARI,
  TEMEL_KAZI_SURELERI,
  TEMEL_KAZI_ASAMALARI,
  TEMEL_KAZI_OZEL_DURUMLAR,
  TEMEL_KAZI_FAQ,
} from "@/data/hafriyatFiyatData";
import { HAFRIYAT_ILLER } from "@/data/hafriyatData";
import { ArrowRight, Phone, Info, Shovel, Clock, Calculator, CheckCircle } from "lucide-react";

const canonical = "https://hammaddem.co/hafriyat/temel-kazisi";
const title = "Temel Kazısı | 2026 Birim Fiyat, Süre, Aşamalar";
const description =
  "Temel kazısı 2026: m³ birim fiyat, kaç gün sürer, aşamaları, kot verme ve su çıkması. Bodrum, havuz ve bitişik nizam kazıları. 30 dakikada teklif.";

const tl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const altHizmetler = [
  { baslik: "Bodrum kazısı", desc: "Tek veya çok bodrumlu projelerde iksa ile koordineli etaplı derin kazı." },
  { baslik: "Havuz kazısı", desc: "Villa ve site havuzlarında hassas kot ve şev kontrolüyle kazı." },
  { baslik: "Kanal kazısı", desc: "Altyapı, kanalizasyon ve içme suyu hattı için hendek kazısı." },
  { baslik: "Kaya kazısı", desc: "Kırıcılı ekskavatörle sert zemin ve kaya sökümü, nakliyesi." },
];

const TemelKazisi = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Temel Kazısı", url: "/hafriyat/temel-kazisi" },
  ]);
  const faqJsonLd = buildFaqJsonLd(TEMEL_KAZI_FAQ);
  const serviceJsonLd = buildServiceJsonLd({
    name: "Temel Kazısı – Bodrum, Havuz ve Kanal Kazısı",
    description,
    url: canonical,
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="temel kazısı, temel kazısı birim fiyat, inşaat temel kazı fiyatları, temel kazısı kaç gün sürer, temel kazısı nasıl yapılır, bina temel kazısı nasıl yapılır, temel kazısı aşamaları, temel kazısı kot verme, bitişik nizam temel kazısı, bodrum kazısı, havuz kazısı, kanal kazısı, kazı işleri"
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og/hafriyat-temel-kazisi.jpg" />
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

        {/* Hero + form */}
        <section id="teklif" className="pt-[110px] pb-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-txt-3">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link to="/" className="hover:text-navy transition-colors no-underline">Ana Sayfa</Link></li>
                <li className="text-txt-3/50">/</li>
                <li><Link to="/hafriyat" className="hover:text-navy transition-colors no-underline">Hafriyat İşleri</Link></li>
                <li className="text-txt-3/50">/</li>
                <li className="text-txt-2 font-medium">Temel Kazısı</li>
              </ol>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                  <Shovel className="w-3 h-3" /> Temel Kazısı
                </span>
                <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                  Temel Kazısı —<br />
                  <span className="text-navy">2026 Fiyatları</span>, Kaç Gün Sürer, Nasıl Yapılır
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-6">
                  Konut, site ve tesis projelerinde temel, bodrum ve havuz kazısı; iksa ile koordineli
                  etaplı çalışma, lisanslı araçlarla nakliye ve ruhsatlı sahaya döküm. Aşağıda
                  birim fiyat, süre ve süreç bilgisini kaynağıyla bulacaksınız.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "Aplikasyon, kot alma ve taban teslimi dahil",
                    "İksa ve susuzlaştırma gereken işlerde koordineli plan",
                    "Nakliye + döküm belgesi tek fiyatta",
                  ].map((m) => (
                    <li key={m} className="flex items-start gap-2.5 text-sm text-txt-2">
                      <CheckCircle className="w-[18px] h-[18px] text-navy shrink-0 mt-0.5" />
                      {m}
                    </li>
                  ))}
                </ul>
                <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                  <Phone className="w-4 h-4" /> 0539 330 86 17
                </a>
                <HafriyatHeroGorsel
                  src="/images/hafriyat-temel-kazisi.webp"
                  alt="İksa perdeli derin temel çukurunda kazı yapan ekskavatör ve rampada bekleyen damperli kamyon, kenarda ölçüm yapan mühendis"
                  caption="İksa ile koordineli etaplı temel kazısı"
                />
              </div>
              <HafriyatTeklifForm baslik="Temel Kazısı Fiyat Teklifi" />
            </div>
          </div>
        </section>

        {/* Birim fiyat */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Temel Kazısı m³ Birim Fiyatı 2026
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Birim fiyat kazı, yükleme ve nakliyeyi kapsar; döküm sahası bedeli ve KDV hariçtir.
              İksa (ankraj, fore kazık) gereken işler ayrı kalem olarak fiyatlanır.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background mb-4">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Zemin Sınıfı</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Kazı Karakteri</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">m³ Fiyatı (TL)</th>
                  </tr>
                </thead>
                <tbody>
                  {M3_FIYATLARI.map((z) => (
                    <tr key={z.zemin} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm font-semibold text-foreground whitespace-nowrap">{z.zemin}</td>
                      <td className="px-5 py-4 text-xs text-txt-2 leading-relaxed">{z.aciklama}</td>
                      <td className="px-5 py-4 text-right text-base font-mono font-bold text-navy tabular-nums whitespace-nowrap">{tl(z.min)} – {tl(z.max)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/hafriyat/hesaplama" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-navy no-underline shadow-[0_2px_12px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px transition-all">
              <Calculator className="w-4 h-4" /> Kazı Hacmini ve Bütçeyi Hesaplayın
            </Link>
          </div>
        </section>

        {/* Süre */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 flex items-center gap-2">
              <Clock className="w-6 h-6 text-navy" /> Temel Kazısı Kaç Gün Sürer?
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Süre, kazı hacmi kadar <strong>döküm sahasının uzaklığına</strong> da bağlıdır: kamyon
              gidiş-dönüşü uzadıkça günlük taşınan hacim düşer.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background mb-4">
              <table className="w-full min-w-[620px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Proje Ölçeği</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Kazı Hacmi</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Süre</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Ekip</th>
                  </tr>
                </thead>
                <tbody>
                  {TEMEL_KAZI_SURELERI.map((s) => (
                    <tr key={s.olcek} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm font-semibold text-foreground">{s.olcek}</td>
                      <td className="px-5 py-4 text-right text-sm font-mono text-txt-2 tabular-nums whitespace-nowrap">{s.hacim}</td>
                      <td className="px-5 py-4 text-right text-sm font-mono font-bold text-navy tabular-nums whitespace-nowrap">{s.sure}</td>
                      <td className="px-5 py-4 text-xs text-txt-2">{s.ekip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-start gap-2 text-xs text-txt-2 bg-off2 border border-border rounded-lg px-3.5 py-2.5 max-w-[660px]">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
              <span>
                Tablo, tek ekiple günde ~400–600 m³ kazı-nakliye varsayımına dayanır. İksa, kaya
                kazısı, su çıkması ve şehir içi sevkiyat kısıtları süreyi uzatır.
              </span>
            </div>
          </div>
        </section>

        {/* Aşamalar */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">
              Temel Kazısı Nasıl Yapılır? — 5 Aşama
            </h2>
            <ol className="space-y-3">
              {TEMEL_KAZI_ASAMALARI.map((a, i) => (
                <li key={a.baslik} className="flex gap-4 border border-border rounded-2xl p-5 bg-background">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-navy-light text-navy font-mono font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{a.baslik}</h3>
                    <p className="text-sm text-txt-2 leading-relaxed">{a.aciklama}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Özel durumlar */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Zorlu Kazılar: Su, Bitişik Nizam, Kaya
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Temel kazısında süreyi ve maliyeti asıl belirleyen, sahada karşılaşılan bu dört durumdur.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEMEL_KAZI_OZEL_DURUMLAR.map((d) => (
                <div key={d.baslik} className="border border-border rounded-2xl p-5 bg-background">
                  <h3 className="font-bold text-sm mb-1.5">{d.baslik}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{d.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alt hizmetler */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Kazı Hizmetlerimiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {altHizmetler.map((h) => (
                <div key={h.baslik} className="border border-border rounded-2xl p-5 bg-background">
                  <h3 className="font-bold text-sm mb-1.5">{h.baslik}</h3>
                  <p className="text-xs text-txt-2 leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-txt-2 uppercase tracking-wider mt-10 mb-3">
              Temel Kazısı Yaptığımız İller
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {HAFRIYAT_ILLER.map((l) => (
                <Link key={l.path} to={l.path} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                  {l.ad}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Temel Kazısı — Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {TEMEL_KAZI_FAQ.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HafriyatKaynaklar haric="/hafriyat/temel-kazisi" koyu />

        {/* CTA */}
        <section className="py-14 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Temel Kazınız İçin Net Fiyat
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Parsel ölçüsü, derinlik ve konumu iletin; zemin durumuna göre net m³ fiyatını
              30 dakika içinde telefonla verelim.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#teklif" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-navy no-underline shadow-[0_2px_12px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px transition-all">
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

export default TemelKazisi;
