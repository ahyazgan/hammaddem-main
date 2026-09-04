import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";
import { DOKUM_UCRETLERI, DOKUM_FAQ, HAFRIYAT_FIYAT_GUNCELLEME } from "@/data/hafriyatFiyatData";
import { ArrowRight, Phone, Info, MapPin, FileText, ExternalLink } from "lucide-react";

import HeroGorsel from "@/components/HeroGorsel";
const canonical = "https://hammaddem.co/rehber/hafriyat-dokum-ucretleri";
const title = "Hafriyat Döküm Ücretleri 2026 | İstanbul, Ankara, Kocaeli";
const description =
  "2026 hafriyat döküm ücretleri il il: İstanbul İSTAÇ sahaları, Ankara, Kocaeli, Bursa döküm bedeli ve saha listesi. Kamyon başı döküm parası hesabı.";

const DokumUcretleri = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Hafriyat Döküm Ücretleri", url: "/rehber/hafriyat-dokum-ucretleri" },
  ]);
  const faqJsonLd = buildFaqJsonLd(DOKUM_FAQ);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="hafriyat döküm ücreti, istanbul hafriyat döküm fiyatları 2026, hafriyat döküm ücreti ankara, hafriyat döküm sahası ücreti, ibb hafriyat döküm ücreti, istaç hafriyat döküm fiyatları, hafriyat döküm parası ne kadar, hafriyat döküm sahası istanbul, hafriyat döküm belgesi nereden alınır"
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
                <li className="text-txt-2 font-medium">Döküm Ücretleri</li>
              </ol>
            </nav>
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                <FileText className="w-3 h-3" /> Rehber · {HAFRIYAT_FIYAT_GUNCELLEME}
              </span>
              <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                Hafriyat Döküm Ücretleri 2026 —<br />
                <span className="text-navy">İstanbul, Ankara, Bursa, İzmir, Kocaeli</span>
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-5">
                Hafriyat toprağı yalnızca ruhsatlı sahalara dökülebilir ve saha bedeli, taşıma ücretinden
                ayrı ödenir. Belediyeler bu bedeli ton, m³ veya araç başına belirler; iller arasındaki
                fark, aynı işin fiyatını doğrudan değiştirir.
              </p>
              <div className="flex items-start gap-2 text-xs text-txt-2 bg-off2 border border-border rounded-lg px-3.5 py-2.5 max-w-[660px]">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
                <span>
                  Aşağıdaki tarifeler belediye meclis kararları ve resmî ücret listelerinden derlenmiştir;
                  her satırın kaynağı ve tarihi verilmiştir. Tarifeler yıl içinde güncellenebilir —
                  bağlayıcı bilgi için ilgili belediyenin güncel tarifesine bakın.
                </span>
              </div>
            </div>
            <HeroGorsel src="/images/rehber-dokum-ucretleri.webp" alt="Ruhsatlı döküm sahasında yükünü boşaltan damperli kamyon ve toprağı seren dozer" width={1200} height={600} className="mt-10 max-w-[760px]" />
          </div>
        </section>

        {/* İl kısayolları */}
        <section className="pb-8 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto flex flex-wrap gap-2.5">
            {DOKUM_UCRETLERI.map((d) => (
              <a key={d.slug} href={`#${d.slug}`} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                {d.ad}
              </a>
            ))}
          </div>
        </section>

        {/* İl blokları */}
        {DOKUM_UCRETLERI.map((d, idx) => (
          <section key={d.slug} id={d.slug} className={`py-12 px-4 md:px-10 scroll-mt-24 ${idx % 2 === 0 ? "bg-off" : ""}`}>
            <div className="max-w-[1100px] mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                {d.ad} Hafriyat Döküm Ücreti
              </h2>
              <p className="text-sm text-txt-2 leading-[1.75] mb-6 max-w-[760px]">{d.ozet}</p>

              <div className="overflow-x-auto rounded-2xl border border-border bg-background mb-5">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="bg-off2 border-b border-border">
                      <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3">Kalem</th>
                      <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3 whitespace-nowrap">Ücret</th>
                      <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3 whitespace-nowrap">Birim</th>
                      <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3">Not</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.kalemler.map((k) => (
                      <tr key={k.kalem} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-3.5 text-sm font-medium text-foreground">{k.kalem}</td>
                        <td className="px-5 py-3.5 text-right text-sm font-mono font-bold text-navy tabular-nums whitespace-nowrap">{k.ucret}</td>
                        <td className="px-5 py-3.5 text-xs text-txt-2 whitespace-nowrap">{k.birim}</td>
                        <td className="px-5 py-3.5 text-xs text-txt-3 leading-relaxed">{k.not ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Döküm sahaları
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {d.sahalar.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium bg-navy-light border border-navy-border text-navy">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mb-2.5">Kaynaklar</h3>
                  <ul className="space-y-1.5">
                    {d.kaynaklar.map((k) => (
                      <li key={k.url}>
                        <a href={k.url} target="_blank" rel="noopener noreferrer nofollow" className="text-xs text-txt-2 hover:text-navy inline-flex items-start gap-1.5 no-underline hover:underline">
                          <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                          <span>{k.ad} <span className="text-txt-3">({k.tarih})</span></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link to={d.hafriyatPath} className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-navy no-underline hover:underline">
                {d.ad} hafriyat firması: kazı, moloz, döküm dahil teklif <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        ))}

        {/* Döküm bedeli sefer fiyatına nasıl yansır */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Döküm Bedeli Sefer Fiyatına Nasıl Yansır?
            </h2>
            <p className="text-sm text-txt-2 leading-[1.8] mb-4">
              Bir kamyon hafriyatın toplam maliyeti üç kalemden oluşur: <strong>kazı ve yükleme</strong>,{" "}
              <strong>nakliye</strong> ve <strong>döküm bedeli</strong>. Kantarlı sahalarda döküm ton
              üzerinden hesaplanır; 15 tonluk bir kamyon İstanbul'da 78 TL/ton tarifesiyle yaklaşık
              1.170 TL, Ankara'da 160 TL/ton + KDV tarifesiyle yaklaşık 2.880 TL döküm bedeli doğurur.
              Kantarsız sahalarda ise araç tipine göre sabit bedel alınır (Bursa'da 18 m³ üzeri araç için
              5.100 TL, İzmir'de dört dingilli kamyon için 3.125 TL gibi).
            </p>
            <p className="text-sm text-txt-2 leading-[1.8] mb-6">
              Bu yüzden yalnızca "m³ fiyatı" üzerinden yapılan karşılaştırmalar yanıltıcı olur.
              Teklifleri kıyaslarken <strong>döküm dahil mi</strong> sorusunu mutlaka sorun.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/hafriyat/hesaplama" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-navy no-underline shadow-[0_2px_12px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px transition-all">
                Kendi İşinizi Hesaplayın <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/hafriyat/fiyatlar" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                Hafriyat Fiyatları 2026
              </Link>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Döküm Ücretleri — Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {DOKUM_FAQ.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HafriyatKaynaklar haric="/rehber/hafriyat-dokum-ucretleri" />

        <section id="teklif" className="py-14 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div className="pt-2">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                Döküm Dahil, Belgeli Teklif
              </h2>
              <p className="text-sm text-txt-2 leading-[1.7] mb-6 max-w-[460px]">
                Saha koordinasyonu, taşıma izin belgesi ve döküm fişi bizde. İşinizi bildirin;
                döküm bedeli dahil net fiyatı 30 dakika içinde iletelim.
              </p>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
            <HafriyatTeklifForm baslik="Döküm Dahil Fiyat Alın" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DokumUcretleri;
