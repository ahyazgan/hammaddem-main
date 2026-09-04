import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";
import { DOKUM_UCRETLERI } from "@/data/hafriyatFiyatData";
import { ArrowRight, Phone, AlertTriangle, MapPin, ExternalLink, Info } from "lucide-react";

import HeroGorsel from "@/components/HeroGorsel";
const canonical = "https://hammaddem.co/rehber/moloz-nereye-dokulur";
const title = "Moloz Nereye Atılır? İstanbul, Ankara, Bursa, İzmir 2026";
const description =
  "Moloz nereye atılır: İstanbul, Ankara, Bursa, İzmir'de döküm yerleri, belediye moloz hizmeti ve izinsiz döküm cezası. Aynı gün moloz taşıma teklifi.";

const faq = [
  {
    q: "Moloz nereye atılır?",
    a: "Moloz ve inşaat/yıkıntı atığı yalnızca büyükşehir belediyelerinin işlettiği ruhsatlı döküm sahalarına veya Çevre Bakanlığı lisanslı geri kazanım tesislerine dökülebilir. Boş arsa, dere yatağı, orman kenarı ve yol kenarı yasaktır.",
  },
  {
    q: "İstanbul'da moloz nereye dökülür?",
    a: "İstanbul'da hafriyat ve inert atık için İSTAÇ'ın işlettiği Odayeri (Eyüpsultan) ve Kömürcüoda (Şile) tesisleri ile Silivri, Çatalca, Arnavutköy ve Tuzla çevresindeki lisanslı özel sahalar kullanılır. Saha seçimini şantiyeye en yakın açık saha belirler.",
  },
  {
    q: "Belediye moloz alıyor mu?",
    a: "Büyükşehir ve ilçe belediyeleri sınırlı miktarda evsel tadilat molozunu randevu ve ücret karşılığı alabiliyor. Şantiye ve yıkım molozu bu kapsamda değildir; ayrıca randevu sırası günler sürebilir. Firma ile çalışmanın farkı aynı gün servis ve yükleme dahil hizmettir.",
  },
  {
    q: "İzinsiz moloz dökmenin cezası ne kadar?",
    a: "İzinsiz döküm, 2872 sayılı Çevre Kanunu kapsamında idari para cezasına tabidir. Ceza tutarları her yıl yeniden değerleme oranıyla güncellenir; ceza yalnızca aracı kullanana değil, atığın sahibi olan iş sahibine de kesilebilir ve sahanın temizlenmesi masrafı ayrıca yüklenir.",
  },
  {
    q: "Molozun döküldüğünü nasıl kanıtlarım?",
    a: "Aracın döküm sahasına girişinde düzenlenen döküm fişini isteyin. Fiş, taşınan miktarı ve tarihi gösterir ve kaçak döküm iddiasına karşı iş sahibinin tek belgesidir.",
  },
];

const MolozNereyeDokulur = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Moloz Nereye Dökülür", url: "/rehber/moloz-nereye-dokulur" },
  ]);
  const faqJsonLd = buildFaqJsonLd(faq);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="moloz nereye atılır, moloz nereye dökülür, moloz nereye atılır istanbul, moloz döküm yeri, moloz atma yeri, moloz döküm sahası, moloz cezası ne kadar, moloz dökmenin cezası, moloz dökme cezası 2026, belediye moloz taşıma ücreti"
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
                <li className="text-txt-2 font-medium">Moloz Nereye Dökülür</li>
              </ol>
            </nav>
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                <MapPin className="w-3 h-3" /> Rehber
              </span>
              <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                Moloz Nereye Dökülür? —<br />
                <span className="text-navy">Şehir Şehir</span> Döküm Yerleri ve Cezalar
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-5">
                Kısa cevap: moloz ve inşaat atığı yalnızca <strong>ruhsatlı döküm sahalarına</strong> ya da
                lisanslı geri kazanım tesislerine dökülebilir. Boş arsaya, dere yatağına veya yol kenarına
                döküm idari para cezasına tabidir ve ceza iş sahibine de kesilir.
              </p>
              <div className="flex items-start gap-2.5 text-sm text-txt-2 bg-accent-light border border-accent-border rounded-xl px-4 py-3.5 max-w-[700px]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span>
                  Aracın nereye döktüğünü sorun ve <strong>döküm fişini</strong> isteyin. Fiş yoksa,
                  kaçak döküm iddiasında sorumluluğu üstlenen taraf siz olursunuz.
                </span>
              </div>
            </div>
            <HeroGorsel src="/images/rehber-moloz-nereye-dokulur.webp" alt="Belediye döküm tesisi girişinde bariyer önünde bekleyen yüklü damperli kamyon" width={1200} height={600} className="mt-10 max-w-[760px]" />
          </div>
        </section>

        <section className="pb-8 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto flex flex-wrap gap-2.5">
            {DOKUM_UCRETLERI.map((d) => (
              <a key={d.slug} href={`#${d.slug}`} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                {d.ad}
              </a>
            ))}
          </div>
        </section>

        {DOKUM_UCRETLERI.map((d, i) => (
          <section key={d.slug} id={d.slug} className={`py-12 px-4 md:px-10 scroll-mt-24 ${i % 2 === 0 ? "bg-off" : ""}`}>
            <div className="max-w-[1100px] mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                {d.ad}'da Moloz ve Hafriyat Nereye Dökülür?
              </h2>
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mb-2.5">Döküm sahaları</h3>
                <div className="flex flex-wrap gap-2">
                  {d.sahalar.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium bg-navy-light border border-navy-border text-navy">{s}</span>
                  ))}
                </div>
              </div>
              <div className="border border-border rounded-2xl bg-background p-5 mb-5">
                <div className="text-xs font-semibold text-txt-3 uppercase tracking-wider mb-1.5">Döküm bedeli</div>
                <div className="text-lg font-mono font-bold text-navy tabular-nums mb-1">
                  {d.kalemler[0].ucret} <span className="text-sm font-sans font-medium text-txt-2">{d.kalemler[0].birim}</span>
                </div>
                <p className="text-xs text-txt-2 leading-relaxed">{d.kalemler[0].kalem}</p>
                <Link to={`/rehber/hafriyat-dokum-ucretleri#${d.slug}`} className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-navy no-underline hover:underline">
                  {d.ad} tüm döküm ücretleri <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {d.kaynaklar.map((k) => (
                  <a key={k.url} href={k.url} target="_blank" rel="noopener noreferrer nofollow" className="text-xs text-txt-2 hover:text-navy inline-flex items-start gap-1.5 no-underline hover:underline">
                    <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{k.ad}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Belediye Moloz Hizmeti mi, Firma mı?
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border border-border rounded-2xl p-5 bg-background">
                <h3 className="font-bold text-sm mb-2">Belediye moloz hizmeti</h3>
                <p className="text-sm text-txt-2 leading-relaxed">
                  Sınırlı miktarda evsel tadilat molozu için randevu ve ücret karşılığı alınır. Şantiye
                  ve yıkım molozu kapsam dışıdır; randevu sırası günler sürebilir ve yükleme genellikle
                  size aittir.
                </p>
              </div>
              <div className="border border-navy-border rounded-2xl p-5 bg-navy-light/40">
                <h3 className="font-bold text-sm mb-2">Hafriyat firması</h3>
                <p className="text-sm text-txt-2 leading-relaxed">
                  Aynı gün servis, yükleme dahil hizmet, her ölçekte araç ve döküm fişi. Şantiye ve
                  yıkım molozu dahil tüm atık tipleri alınır.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-txt-2 bg-off2 border border-border rounded-lg px-3.5 py-2.5">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
              <span>
                Moloz taşıma fiyatları ve araç seçenekleri için{" "}
                <Link to="/hafriyat/moloz-tasima" className="text-navy font-semibold no-underline hover:underline">moloz taşıma sayfamıza</Link>{" "}
                bakın; belge süreci için{" "}
                <Link to="/rehber/hafriyat-tasima-izin-belgesi" className="text-navy font-semibold no-underline hover:underline">taşıma izin belgesi rehberini</Link>{" "}
                ve{" "}
                <Link to="/rehber/hafriyat-topragi-yonetmeligi" className="text-navy font-semibold no-underline hover:underline">yönetmelik özetini</Link>{" "}
                inceleyin.
              </span>
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Sık Sorulan Sorular</h2>
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

        <HafriyatKaynaklar haric="/rehber/moloz-nereye-dokulur" />

        <section id="teklif" className="py-14 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div className="pt-2">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Molozu Biz Taşıyalım</h2>
              <p className="text-sm text-txt-2 leading-[1.7] mb-6 max-w-[460px]">
                Ruhsatlı sahaya döküm, döküm fişi ve yükleme dahil. Konum ve miktarı iletin;
                30 dakikada net fiyat verelim.
              </p>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
            <HafriyatTeklifForm baslik="Moloz Taşıma Teklifi" defaultMiktar={1} defaultBirim="Kamyon" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MolozNereyeDokulur;
