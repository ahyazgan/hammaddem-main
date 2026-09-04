import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/utils/seoSchemas";
import {
  M3_FIYATLARI,
  SEFER_FIYATLARI,
  FIYAT_FAKTORLERI,
  BOLGE_EGILIMLERI,
  DOKUM_UCRETLERI,
  FIYAT_FAQ,
  HAFRIYAT_FIYAT_GUNCELLEME,
} from "@/data/hafriyatFiyatData";
import { ArrowRight, Phone, Info, Calculator, TrendingUp } from "lucide-react";

import HeroGorsel from "@/components/HeroGorsel";
const canonical = "https://hammaddem.co/hafriyat/fiyatlar";
const title = "Hafriyat Fiyatları 2026 | m³ Fiyatı, Sefer ve Döküm Ücreti";
const description =
  "Hafriyat fiyatları 2026: yumuşak zemin 120–180 TL/m³, kayalık 260–400 TL/m³; kamyon sefer 2.500–5.500 TL. İl il güncel tablo, 30 dakikada net teklif.";

const tl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const egilimEtiket: Record<string, { metin: string; sinif: string }> = {
  alt: { metin: "Alt bant", sinif: "bg-success-light text-success border-success-border" },
  orta: { metin: "Orta bant", sinif: "bg-navy-light text-navy border-navy-border" },
  ust: { metin: "Üst bant", sinif: "bg-accent-light text-primary border-accent-border" },
};

const HafriyatFiyatlar = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Hafriyat Fiyatları", url: "/hafriyat/fiyatlar" },
  ]);
  const faqJsonLd = buildFaqJsonLd(FIYAT_FAQ);
  const serviceJsonLd = buildServiceJsonLd({
    name: "Hafriyat Fiyatlandırma – Kazı, Nakliye ve Döküm",
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
          content="hafriyat fiyatları, hafriyat fiyatları 2026, hafriyat m3 fiyatı, hafriyat m3 fiyatı 2026, hafriyat fiyat listesi, hafriyat ücreti, hafriyat fiyatı nasıl hesaplanır, istanbul hafriyat fiyatları, kazı m3 fiyatı, hafriyat nakliye fiyatları"
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero */}
        <section className="pt-[110px] pb-12 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-txt-3">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link to="/" className="hover:text-navy transition-colors no-underline">Ana Sayfa</Link></li>
                <li className="text-txt-3/50">/</li>
                <li><Link to="/hafriyat" className="hover:text-navy transition-colors no-underline">Hafriyat İşleri</Link></li>
                <li className="text-txt-3/50">/</li>
                <li className="text-txt-2 font-medium">Fiyatlar</li>
              </ol>
            </nav>
            <div className="max-w-[720px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                <TrendingUp className="w-3 h-3" /> Güncelleme: {HAFRIYAT_FIYAT_GUNCELLEME}
              </span>
              <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                Hafriyat Fiyatları 2026 —<br />
                <span className="text-navy">m³ Fiyatı</span>, Kamyon Sefer ve Döküm Ücretleri
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-5">
                Hafriyat fiyatı iki şekilde verilir: kazılan hacme göre <strong>m³ birim fiyatı</strong> ya da
                taşınan araca göre <strong>kamyon sefer ücreti</strong>. Aşağıdaki tablolar piyasada
                yaygın olarak karşılaşılan 2026 aralıklarıdır; döküm sahası bedeli ayrı bir kalemdir.
              </p>
              <div className="flex items-start gap-2 text-xs text-txt-2 bg-off2 border border-border rounded-lg px-3.5 py-2.5 max-w-[620px] mb-6">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
                <span>
                  Bu sayfadaki rakamlar sektör yayınlarından derlenmiş <strong>piyasa aralıklarıdır</strong>,
                  Hammaddem'in sabit fiyat listesi değildir. İşinize özel net fiyat; hacim, zemin ve döküm
                  mesafesine göre 30 dakika içinde telefonla iletilir.
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#teklif" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-navy no-underline shadow-[0_2px_12px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px transition-all">
                  İşime Özel Fiyat Al <ArrowRight className="w-4 h-4" />
                </a>
                <Link to="/hafriyat/hesaplama" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                  <Calculator className="w-4 h-4" /> Hesaplama Aracı
                </Link>
              </div>
            </div>
            <HeroGorsel src="/images/hafriyat-fiyatlar.webp" alt="Döküm sahası girişindeki kantar üzerinde yüklü damperli hafriyat kamyonu" width={1600} height={686} className="mt-10" />
          </div>
        </section>

        {/* m³ tablosu */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Hafriyat m³ Fiyatı 2026 — Zemin Türüne Göre
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[620px]">
              m³ fiyatı kazı, yükleme ve nakliyeyi kapsar; döküm sahası bedeli ve KDV hariçtir.
              Kaya kazısı kırıcı gerektirdiği için ilerleme yavaşlar, birim fiyat yükselir.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full min-w-[620px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Zemin Türü</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Açıklama</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Kabarma</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">m³ Fiyatı (TL)</th>
                  </tr>
                </thead>
                <tbody>
                  {M3_FIYATLARI.map((z) => (
                    <tr key={z.zemin} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm font-semibold text-foreground whitespace-nowrap">{z.zemin}</td>
                      <td className="px-5 py-4 text-xs text-txt-2 leading-relaxed">{z.aciklama}</td>
                      <td className="px-5 py-4 text-right text-sm font-mono text-txt-2 tabular-nums whitespace-nowrap">×{z.kabarma.toString().replace(".", ",")}</td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <span className="text-base font-mono font-bold text-navy tabular-nums">{tl(z.min)} – {tl(z.max)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-txt-3 mt-3">
              Kabarma katsayısı: kazılan zemin gevşediği için kamyona yüklenen hacim yerinde hacimden büyüktür.
              100 m³ yerinde kazı, kile göre 135 m³ olarak taşınır.
            </p>
          </div>
        </section>

        {/* Sefer tablosu */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Kamyon Sefer Ücretleri — 1 Kamyon Hafriyat Kaç Para?
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[620px]">
              Kazı hazırsa (moloz yüklü, dolgu taşıma, ocak sevkiyatı) fiyat sefer başına verilir.
              Aşağıdaki aralıklar şehir içi ortalama mesafe içindir; döküm bedeli hariçtir.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SEFER_FIYATLARI.map((s) => (
                <div key={s.arac} className="border border-border rounded-2xl p-5 bg-background">
                  <h3 className="font-bold text-sm mb-1">{s.arac}</h3>
                  <p className="text-xs text-txt-3 mb-3">Kasa hacmi: {s.kapasite}</p>
                  <div className="text-xl font-mono font-bold text-navy tabular-nums">{tl(s.min)} – {tl(s.max)}</div>
                  <div className="text-xs text-txt-3">TL / sefer</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-2 text-xs text-txt-2 bg-navy-light border border-navy-border rounded-lg px-3.5 py-2.5 max-w-[720px]">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
              <span>
                Mesafe arttıkça sefer süresi uzar, günlük sefer sayısı düşer ve birim fiyat yükselir.
                Döküm sahası 30 km'nin ötesindeyse fiyat üst banda yaklaşır.
              </span>
            </div>
          </div>
        </section>

        {/* Faktörler */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">
              Hafriyat Fiyatını Belirleyen 6 Faktör
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FIYAT_FAKTORLERI.map((f, i) => (
                <div key={f.baslik} className="border border-border rounded-2xl p-5 bg-background">
                  <div className="w-8 h-8 rounded-lg bg-navy-light text-navy font-mono font-bold text-xs flex items-center justify-center mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-sm mb-1.5">{f.baslik}</h3>
                  <p className="text-xs text-txt-2 leading-relaxed">{f.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bölgesel */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              İl İl Hafriyat Fiyat Eğilimi
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[620px]">
              Aynı iş, döküm sahasının uzaklığı ve belediye tarifesi yüzünden ilden ile farklı fiyatlanır.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BOLGE_EGILIMLERI.map((b) => (
                <div key={b.bolge} className="border border-border rounded-2xl p-5 bg-background">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-sm">{b.bolge}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${egilimEtiket[b.egilim].sinif}`}>
                      {egilimEtiket[b.egilim].metin}
                    </span>
                  </div>
                  <p className="text-xs text-txt-2 leading-relaxed">{b.neden}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Döküm özeti */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Döküm Ücreti — Fiyatın Ayrı Kalemi
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[660px]">
              Hafriyat toprağı yalnızca ruhsatlı sahalara dökülebilir ve saha bedeli ayrıca ödenir.
              2026 tarifelerinden özet:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              {DOKUM_UCRETLERI.map((d) => (
                <Link key={d.slug} to={`/rehber/hafriyat-dokum-ucretleri#${d.slug}`} className="border border-border rounded-xl p-4 bg-background hover:border-navy-border transition-colors no-underline">
                  <div className="text-xs font-bold text-foreground mb-1.5">{d.ad}</div>
                  <div className="text-[11px] text-txt-2 leading-snug">{d.kalemler[0].ucret} {d.kalemler[0].birim}</div>
                  <div className="text-[10px] text-txt-3 mt-1 truncate">{d.kalemler[0].kalem}</div>
                </Link>
              ))}
            </div>
            <Link to="/rehber/hafriyat-dokum-ucretleri" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy no-underline hover:underline">
              Tüm döküm ücretleri ve saha listesi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* SSS */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Hafriyat Fiyatları — Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {FIYAT_FAQ.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HafriyatKaynaklar haric="/hafriyat/fiyatlar" koyu />

        {/* Teklif formu */}
        <section id="teklif" className="py-14 md:py-20 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div className="pt-2">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                Tablo Değil, İşinize Özel Net Fiyat
              </h2>
              <p className="text-sm text-txt-2 leading-[1.7] mb-6 max-w-[460px]">
                Yukarıdaki aralıklar bütçe planlaması içindir. Konum, hacim ve zemin bilgisini iletin;
                döküm bedeli dahil net fiyatı 30 dakika içinde telefonla verelim.
              </p>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
            <HafriyatTeklifForm baslik="Hafriyat Fiyat Teklifi Alın" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HafriyatFiyatlar;
