import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";
import { HAFRIYAT_BELGELERI, BELGE_ADIMLARI, BELGE_FAQ, DOKUM_UCRETLERI } from "@/data/hafriyatFiyatData";
import { ArrowRight, Phone, FileText, ShieldCheck, AlertTriangle, ExternalLink } from "lucide-react";

import HeroGorsel from "@/components/HeroGorsel";
const canonical = "https://hammaddem.co/rehber/hafriyat-tasima-izin-belgesi";
const title = "Hafriyat Taşıma İzin Belgesi Nasıl Alınır? (2026)";
const description =
  "Hafriyat taşıma izin belgesi ve kabul belgesi nasıl alınır: başvuru adımları, gerekli evraklar, döküm fişi, mavi plaka ve cezalar. Belgeleri biz alıyoruz.";

const TasimaIzinBelgesi = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Hafriyat Taşıma İzin Belgesi", url: "/rehber/hafriyat-tasima-izin-belgesi" },
  ]);
  const faqJsonLd = buildFaqJsonLd(BELGE_FAQ);
  const istanbul = DOKUM_UCRETLERI.find((d) => d.slug === "istanbul");

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="hafriyat taşıma izin belgesi, hafriyat toprağı taşıma ve kabul belgesi, hafriyat kabul belgesi, hafriyat taşıma belgesi, ibb hafriyat kabul belgesi, hafriyat izin belgesi, hafriyat taşıma izin belgesi nasıl alınır, hafriyat döküm belgesi nereden alınır, hafriyat izni nasıl alınır"
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://hammaddem.co/og/rehber-tasima-izin-belgesi.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
                <li className="text-txt-2 font-medium">Taşıma İzin Belgesi</li>
              </ol>
            </nav>
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                <FileText className="w-3 h-3" /> Rehber
              </span>
              <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                Hafriyat Taşıma İzin ve Kabul Belgesi —<br />
                <span className="text-navy">Nasıl Alınır?</span>
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-5">
                Hafriyat toprağı ve inşaat/yıkıntı atığı taşımak için üç ayrı belge devreye girer:
                aracı yetkilendiren <strong>taşıma izin belgesi</strong>, iş sahibinin beyanı olan{" "}
                <strong>kabul belgesi</strong> ve her seferin sahaya girişini kanıtlayan{" "}
                <strong>döküm fişi</strong>. Hangisinin kimde olduğunu bilmek, denetimde sorumluluğu belirler.
              </p>
              <div className="flex items-start gap-2.5 text-sm text-txt-2 bg-navy-light border border-navy-border rounded-xl px-4 py-3.5 max-w-[700px]">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
                <span>
                  Hammaddem işlerinde saha koordinasyonu, araç izin belgeleri ve döküm fişlerinin
                  toplanması bize aittir; şantiyeniz ayrıca evrak takibi yapmaz.
                </span>
              </div>
            </div>
            <HeroGorsel src="/images/rehber-tasima-izin-belgesi.webp" alt="Kamyon kabininde taşıma belgelerini kontrol eden saha denetçisi ve şoför" width={1200} height={600} className="mt-10 max-w-[760px]" />
          </div>
        </section>

        {/* Belge tablosu */}
        <section className="py-12 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Hangi Belge, Kimde Olmalı?</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Belgelerin karışması en sık yapılan hata: nakliyecinin izin belgesi, iş sahibinin kabul
              belgesinin yerine geçmez.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Belge</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Kimde</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Nereden</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Açıklama</th>
                  </tr>
                </thead>
                <tbody>
                  {HAFRIYAT_BELGELERI.map((b) => (
                    <tr key={b.belge} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm font-semibold text-foreground">{b.belge}</td>
                      <td className="px-5 py-4 text-xs text-txt-2">{b.kim}</td>
                      <td className="px-5 py-4 text-xs text-txt-2">{b.nereden}</td>
                      <td className="px-5 py-4 text-xs text-txt-2 leading-relaxed">{b.aciklama}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Adımlar */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Başvuru Adımları</h2>
            <ol className="space-y-3">
              {BELGE_ADIMLARI.map((a, i) => (
                <li key={a.baslik} className="flex gap-4 border border-border rounded-2xl p-5 bg-background">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-navy-light text-navy font-mono font-bold text-sm flex items-center justify-center">{i + 1}</div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{a.baslik}</h3>
                    <p className="text-sm text-txt-2 leading-relaxed">{a.aciklama}</p>
                  </div>
                </li>
              ))}
            </ol>
            {istanbul && (
              <div className="mt-8 border border-border rounded-2xl bg-off p-5">
                <h3 className="font-bold text-sm mb-2">İstanbul örneği: belge bedeli</h3>
                <p className="text-sm text-txt-2 leading-relaxed mb-3">
                  İBB'nin 2026 çevre ücret tarifesinde hafriyat toprağı ve inşaat/yıkıntı atıkları
                  taşıma izin belgesi <strong>kamyon başına 655 TL</strong>, depolama bedeli
                  <strong> ton başına 78 TL</strong> olarak belirlendi.
                </p>
                {istanbul.kaynaklar.slice(0, 1).map((k) => (
                  <a key={k.url} href={k.url} target="_blank" rel="noopener noreferrer nofollow" className="text-xs text-txt-2 hover:text-navy inline-flex items-start gap-1.5 no-underline hover:underline">
                    <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{k.ad} ({k.tarih})</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Ceza */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Belgesiz Taşımanın Sonuçları</h2>
            <div className="flex items-start gap-2.5 text-sm text-txt-2 bg-accent-light border border-accent-border rounded-xl px-4 py-3.5 mb-4">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              <span>
                İzinsiz taşıma ve ruhsatsız sahaya döküm, 2872 sayılı Çevre Kanunu kapsamında idari
                para cezası gerektirir. Tutarlar her yıl yeniden değerleme oranıyla güncellenir.
              </span>
            </div>
            <p className="text-sm text-txt-2 leading-[1.8] mb-4">
              Cezanın en sık gözden kaçan yanı, <strong>yalnızca şoföre kesilmemesi</strong>: atığın
              sahibi olan iş sahibi ve müteahhit de sorumlu tutulabilir. Buna ek olarak kaçak dökülen
              sahanın temizlenmesi masrafı da yüklenir; bu tutar çoğu zaman düzgün taşımanın maliyetinin
              kat kat üstündedir. Ruhsat ve iskân süreçlerinde döküm fişlerinin istenmesi de ayrı bir
              risktir — fiş yoksa süreç tıkanır.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/rehber/moloz-nereye-dokulur" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                Moloz nereye dökülür?
              </Link>
              <Link to="/rehber/hafriyat-dokum-ucretleri" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                Döküm ücretleri 2026
              </Link>
              <Link to="/rehber/hafriyat-topragi-yonetmeligi" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                Yönetmelik özeti
              </Link>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Sık Sorulan Sorular</h2>
            <div className="space-y-4">
              {BELGE_FAQ.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-txt-3 mt-6 leading-relaxed">
              Bu sayfa genel bilgilendirme amaçlıdır; başvuru usulleri ve bedeller belediyeden
              belediyeye ve yıldan yıla değişir. Bağlayıcı bilgi için ilgili büyükşehir belediyesinin
              güncel duyurularına bakın.
            </p>
          </div>
        </section>

        <HafriyatKaynaklar haric="/rehber/hafriyat-tasima-izin-belgesi" koyu />

        <section id="teklif" className="py-14 md:py-20 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div className="pt-2">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Evrak Süreci Dahil, Anahtar Teslim</h2>
              <p className="text-sm text-txt-2 leading-[1.7] mb-6 max-w-[460px]">
                Saha koordinasyonu, izin belgeleri ve döküm fişleri bizde. İşinizi bildirin;
                belgeli ve döküm dahil net fiyatı 30 dakika içinde iletelim.
              </p>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
              <div className="mt-6">
                <Link to="/hafriyat" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy no-underline hover:underline">
                  Tüm hafriyat hizmetleri <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <HafriyatTeklifForm baslik="Belgeli Hafriyat Teklifi" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TasimaIzinBelgesi;
