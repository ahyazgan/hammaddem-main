import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";
import {
  KAMYON_KAPASITELERI,
  MALZEME_YOGUNLUKLARI,
  SEFER_FIYATLARI,
  KAMYON_FAQ,
  KAMYON_KAYNAKLARI,
} from "@/data/hafriyatFiyatData";
import { ArrowRight, Phone, Info, Truck, ExternalLink, Calculator } from "lucide-react";

const canonical = "https://hammaddem.co/rehber/hafriyat-kamyonu-kac-m3";
const title = "Hafriyat Kamyonu Kaç m³ Alır? 10 Teker, Kırkayak, Tır";
const description =
  "Hafriyat kamyonu kaç m³ alır: 10 teker 12–15 m³, kırkayak 16–20 m³, tır 24–30 m³; ton karşılıkları ve yoğunluk tablosu. 1 kamyon hafriyat kaç para?";

const tl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const KamyonKacM3 = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Hafriyat Kamyonu Kaç m³ Alır?", url: "/rehber/hafriyat-kamyonu-kac-m3" },
  ]);
  const faqJsonLd = buildFaqJsonLd(KAMYON_FAQ);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="hafriyat kamyonu kaç m3, hafriyat kamyonu kaç m3 alır, 1 kamyon kaç m3 toprak alır, bir kamyon kaç m3, kamyon kaç m3 hafriyat alır, hafriyat kamyonu kaç ton, kırkayak kamyon kaç m3 hafriyat alır, 10 teker kamyon kaç ton yük alır, hafriyat tırı kaç m3, hafriyat toprağı yoğunluğu"
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        <section className="pt-[110px] pb-10 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-txt-3">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link to="/" className="hover:text-navy transition-colors no-underline">Ana Sayfa</Link></li>
                <li className="text-txt-3/50">/</li>
                <li><Link to="/hafriyat" className="hover:text-navy transition-colors no-underline">Hafriyat İşleri</Link></li>
                <li className="text-txt-3/50">/</li>
                <li className="text-txt-2 font-medium">Kamyon Kapasitesi</li>
              </ol>
            </nav>
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                <Truck className="w-3 h-3" /> Rehber
              </span>
              <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                Hafriyat Kamyonu Kaç m³ ve Kaç Ton Alır?
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-5">
                Kısa cevap: sahada "bir kamyon hafriyat" denince kastedilen <strong>10 teker damperli
                kamyon</strong> kasasına <strong>12–15 m³</strong> kabarmış malzeme alır; bu, yerinde
                ölçüyle yaklaşık <strong>10–12 m³</strong> kazıya karşılık gelir. Yasal net yük sınırı
                ise yaklaşık <strong>15 tondur</strong>.
              </p>
              <div className="flex items-start gap-2 text-xs text-txt-2 bg-off2 border border-border rounded-lg px-3.5 py-2.5 max-w-[660px]">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
                <span>
                  Kamyon bazen kasası dolmadan <strong>tonajdan</strong> dolar: ıslak kil veya kırılmış
                  kaya taşırken 15 tonluk sınır, 12 m³'te dolabilir. Bu yüzden ağır malzemede sefer
                  sayısı hacim hesabından fazla çıkar.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Kapasite tablosu */}
        <section className="py-12 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Araç Tipine Göre Kapasite Tablosu
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[620px]">
              Hacim değerleri kasaya yüklenen (kabarmış) malzeme içindir; ton değerleri yasal net yük
              sınırlarıdır.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full min-w-[620px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Araç</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Hacim (m³)</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Yük (ton)</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Tipik Kullanım</th>
                  </tr>
                </thead>
                <tbody>
                  {KAMYON_KAPASITELERI.map((k) => (
                    <tr key={k.arac} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm font-semibold text-foreground">{k.arac}</td>
                      <td className="px-5 py-4 text-right text-sm font-mono font-bold text-navy tabular-nums whitespace-nowrap">{k.m3}</td>
                      <td className="px-5 py-4 text-right text-sm font-mono text-txt-2 tabular-nums whitespace-nowrap">{k.ton}</td>
                      <td className="px-5 py-4 text-xs text-txt-2 leading-relaxed">{k.kullanim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Kabarma */}
        <section className="py-12 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              1 Kamyon Kaç m³ Toprak Alır? — Kabarma Etkisi
            </h2>
            <p className="text-sm text-txt-2 leading-[1.8] mb-4">
              Kazılan zemin yerinden çıkınca gevşer ve hacmi büyür; buna <strong>kabarma</strong> denir.
              Yerinde 100 m³ olan kazı, toprakta yaklaşık 125 m³, kilde 135 m³, kayada 150 m³ olarak
              kamyona yüklenir. Bu yüzden "10 m³ kamyon" ile 100 m³'lük kazı 10 seferde değil,
              12–15 seferde taşınır.
            </p>
            <p className="text-sm text-txt-2 leading-[1.8] mb-6">
              Teklif alırken hacmin <strong>yerinde ölçü mü, kamyon hacmi mi</strong> olduğunu netleştirin;
              iki taraf farklı hacimden konuşursa sefer sayısı ve fiyat tutmaz.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background mb-6">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3">Malzeme</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3">Yoğunluk</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3">Kabarma</th>
                  </tr>
                </thead>
                <tbody>
                  {MALZEME_YOGUNLUKLARI.map((m) => (
                    <tr key={m.malzeme} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-3 text-sm font-medium text-foreground">{m.malzeme}</td>
                      <td className="px-5 py-3 text-right text-sm font-mono text-txt-2 tabular-nums whitespace-nowrap">{m.yogunluk}</td>
                      <td className="px-5 py-3 text-right text-sm font-mono text-txt-2 tabular-nums whitespace-nowrap">{m.kabarma}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/hafriyat/hesaplama" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-navy no-underline shadow-[0_2px_12px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px transition-all">
              <Calculator className="w-4 h-4" /> Kaç Kamyon Gerektiğini Hesaplayın
            </Link>
          </div>
        </section>

        {/* Sefer fiyatı */}
        <section className="py-12 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              1 Kamyon Hafriyat Kaç Para?
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[620px]">
              2026 piyasa aralıkları — şehir içi ortalama mesafe için, döküm bedeli hariç.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {SEFER_FIYATLARI.map((s) => (
                <div key={s.arac} className="border border-border rounded-2xl p-5 bg-background">
                  <h3 className="font-bold text-sm mb-1">{s.arac}</h3>
                  <p className="text-xs text-txt-3 mb-3">{s.kapasite}</p>
                  <div className="text-xl font-mono font-bold text-navy tabular-nums">{tl(s.min)} – {tl(s.max)}</div>
                  <div className="text-xs text-txt-3">TL / sefer</div>
                </div>
              ))}
            </div>
            <Link to="/hafriyat/fiyatlar" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy no-underline hover:underline">
              m³ fiyatları ve il il fiyat farkları <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* SSS */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Kamyon Kapasitesi — Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {KAMYON_FAQ.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mt-8 mb-2.5">Kaynaklar</h3>
            <ul className="space-y-1.5">
              {KAMYON_KAYNAKLARI.map((k) => (
                <li key={k.url}>
                  <a href={k.url} target="_blank" rel="noopener noreferrer nofollow" className="text-xs text-txt-2 hover:text-navy inline-flex items-start gap-1.5 no-underline hover:underline">
                    <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{k.ad}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <HafriyatKaynaklar haric="/rehber/hafriyat-kamyonu-kac-m3" koyu />

        <section id="teklif" className="py-14 md:py-20 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div className="pt-2">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                Kaç Kamyon Gerektiğini Biz Söyleyelim
              </h2>
              <p className="text-sm text-txt-2 leading-[1.7] mb-6 max-w-[460px]">
                Konumu ve tahmini hacmi iletin; araç planını, sefer sayısını ve döküm dahil net fiyatı
                30 dakika içinde telefonla iletelim.
              </p>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
            <HafriyatTeklifForm baslik="Araç ve Fiyat Planı Alın" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default KamyonKacM3;
