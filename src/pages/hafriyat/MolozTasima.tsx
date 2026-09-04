import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatHeroGorsel from "@/components/hafriyat/HafriyatHeroGorsel";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/utils/seoSchemas";
import { MOLOZ_FIYATLARI, MOLOZ_TIPLERI, MOLOZ_FAQ, DOKUM_UCRETLERI } from "@/data/hafriyatFiyatData";
import { HAFRIYAT_ILCELER, HAFRIYAT_ILLER } from "@/data/hafriyatData";
import { ArrowRight, Phone, Info, Trash2, CheckCircle, AlertTriangle } from "lucide-react";

const canonical = "https://hammaddem.co/hafriyat/moloz-tasima";
const title = "Moloz Taşıma Fiyatları 2026 | Kamyon, Çuval, Konteyner";
const description =
  "Moloz taşıma fiyatları 2026: kamyon 3.000–7.500 TL, çuval 90–180 TL, konteyner 5.000–11.000 TL. İstanbul ve Marmara'da aynı gün moloz kaldırma.";

const tl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const MolozTasima = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Moloz Taşıma", url: "/hafriyat/moloz-tasima" },
  ]);
  const faqJsonLd = buildFaqJsonLd(MOLOZ_FAQ);
  const serviceJsonLd = buildServiceJsonLd({
    name: "Moloz Taşıma – Kamyon, Çuval ve Konteyner ile Moloz Kaldırma",
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
          content="moloz taşıma, moloz taşıma fiyatları, moloz taşıma ücreti, moloz atma ücreti, moloz kaldırma ücreti, moloz kaldırma, moloz atma, moloz nakliye, moloz kamyonu, moloz konteyneri, istanbul moloz taşıma, moloz nereye atılır, tadilat molozu"
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og/hafriyat-moloz-tasima.jpg" />
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
                <li className="text-txt-2 font-medium">Moloz Taşıma</li>
              </ol>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                  <Trash2 className="w-3 h-3" /> Moloz & İnşaat Atığı
                </span>
                <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                  Moloz Taşıma —<br />
                  <span className="text-navy">2026 Fiyatları</span>: Kamyon, Çuval ve Konteyner
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-6">
                  Tadilat molozundan yıkım atığına, tek çuvaldan çok kamyonluk şantiye işine kadar
                  moloz kaldırma. Yükleme, nakliye ve ruhsatlı sahaya döküm tek fiyatta; döküm
                  belgesi tarafınıza iletilir.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "Aynı gün servis, dar sokağa uygun küçük tonajlı araç",
                    "Yükleme dahil — el gücü ya da mini ekskavatörle",
                    "Lisanslı araç, ruhsatlı döküm, belgeli teslim",
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
                  src="/images/hafriyat-moloz-tasima.webp"
                  alt="Şehir sokağında lastikli ekskavatör inşaat molozunu damperli kamyona yüklüyor"
                  caption="Şehir içi moloz yükleme ve nakliye"
                />
              </div>
              <HafriyatTeklifForm baslik="Moloz Taşıma Teklifi Alın" defaultMiktar={1} defaultBirim="Kamyon" />
            </div>
          </div>
        </section>

        {/* Fiyat tablosu */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Moloz Taşıma Fiyatları 2026
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Aşağıdaki aralıklar şehir içi ortalama mesafe içindir. Molozun cinsi (karışık, beton,
              tehlikeli atık içeren) ve erişim zorluğu fiyatı değiştirir.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background mb-4">
              <table className="w-full min-w-[620px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Hizmet</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Kapsam</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Fiyat</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Birim</th>
                  </tr>
                </thead>
                <tbody>
                  {MOLOZ_FIYATLARI.map((m) => (
                    <tr key={m.hizmet} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm font-semibold text-foreground whitespace-nowrap">{m.hizmet}</td>
                      <td className="px-5 py-4 text-xs text-txt-2 leading-relaxed">{m.aciklama}</td>
                      <td className="px-5 py-4 text-right text-base font-mono font-bold text-navy tabular-nums whitespace-nowrap">{tl(m.min)} – {tl(m.max)}</td>
                      <td className="px-5 py-4 text-xs text-txt-2 whitespace-nowrap">{m.birim.replace("TL / ", "")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-start gap-2 text-xs text-txt-2 bg-off2 border border-border rounded-lg px-3.5 py-2.5 max-w-[660px]">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
              <span>
                Teklifleri karşılaştırırken <strong>döküm dahil mi</strong> diye sorun: döküm bedeli
                tek başına sefer başına 1.200–3.500 TL tutabilir.{" "}
                <Link to="/rehber/hafriyat-dokum-ucretleri" className="text-navy font-semibold no-underline hover:underline">
                  İl il döküm ücretleri →
                </Link>
              </span>
            </div>
          </div>
        </section>

        {/* Moloz tipleri */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">
              Hangi Molozu Kaldırıyoruz?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOLOZ_TIPLERI.map((t) => (
                <div key={t.tip} className="border border-border rounded-2xl p-5 bg-background">
                  <h3 className="font-bold text-sm mb-1.5">{t.tip}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{t.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nereye dökülür + ceza */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Moloz Nereye Dökülür? Kaçak Dökümün Bedeli
            </h2>
            <p className="text-sm text-txt-2 leading-[1.8] mb-4">
              Moloz ve inşaat atığı yalnızca belediyelerin ruhsat verdiği döküm sahalarına veya
              lisanslı geri kazanım tesislerine dökülebilir. Taşımayı yapan aracın{" "}
              <strong>taşıma izin belgesi</strong>, sahaya girişte de <strong>döküm fişi</strong>{" "}
              düzenlenmesi gerekir. Boş arsaya, dere yatağına veya yol kenarına döküm, çevre mevzuatına
              göre idari para cezası doğurur; ceza yalnızca şoföre değil, atığın sahibi olan iş
              sahibine de kesilir.
            </p>
            <div className="flex items-start gap-2.5 text-sm text-txt-2 bg-accent-light border border-accent-border rounded-xl px-4 py-3.5 mb-6">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              <span>
                Ucuz teklif veren aracın molozu nereye döktüğünü sorun. Kaçak dökümde ceza ve
                temizleme masrafı iş sahibine döner — tasarruf ettiğiniz tutarın kat kat üstünde.
              </span>
            </div>
            <h3 className="text-sm font-semibold text-txt-2 uppercase tracking-wider mb-3">
              İl bazında döküm sahaları ve ücretler
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {DOKUM_UCRETLERI.map((d) => (
                <Link key={d.slug} to={`/rehber/hafriyat-dokum-ucretleri#${d.slug}`} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                  {d.ad}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bölgeler */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Moloz Taşıma Hizmeti Verdiğimiz Bölgeler
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[560px]">
              Bölgenize özel fiyat ve aynı gün servis için şehir sayfasına gidin.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {HAFRIYAT_ILLER.map((l) => (
                <Link key={l.path} to={l.path} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                  {l.ad} Moloz Taşıma
                </Link>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-txt-2 uppercase tracking-wider mb-3">İstanbul İlçeleri</h3>
            <div className="flex flex-wrap gap-2">
              {HAFRIYAT_ILCELER.map((l) => (
                <Link key={l.path} to={l.path} className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                  {l.ad}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Moloz Taşıma — Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {MOLOZ_FAQ.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HafriyatKaynaklar haric="/hafriyat/moloz-tasima" />

        {/* CTA */}
        <section className="py-14 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Molozunuzu Bugün Kaldıralım
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Konum ve tahmini miktarı iletin; uygun araç tipini ve döküm dahil net fiyatı
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

export default MolozTasima;
