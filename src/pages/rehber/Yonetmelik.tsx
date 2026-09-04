import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";
import { ArrowRight, Phone, Scale, ExternalLink, AlertTriangle } from "lucide-react";

import HeroGorsel from "@/components/HeroGorsel";
const canonical = "https://hammaddem.co/rehber/hafriyat-topragi-yonetmeligi";
const title = "Hafriyat Toprağı Yönetmeliği | Şantiye İçin Özet";
const description =
  "Hafriyat toprağı yönetmeliği özeti: iş sahibinin yükümlülükleri, taşıma ve kabul belgesi, lisanslı araç ile ruhsatlı döküm sahası şartı ve cezalar.";

const yukumlulukler = [
  {
    taraf: "İş sahibi / müteahhit (atık üreticisi)",
    maddeler: [
      "Kazıdan çıkacak hafriyat toprağı ve atık miktarını önceden beyan etmek",
      "Atığı ruhsatlı saha ya da lisanslı tesise göndermek, taşıma-kabul belgesini almak",
      "Hafriyat toprağı ile inşaat/yıkıntı atığını kaynağında ayrı toplamak",
      "Döküm fişlerini saklamak; denetim ve iskân aşamasında ibraz etmek",
    ],
  },
  {
    taraf: "Taşıyıcı (nakliyeci)",
    maddeler: [
      "Araç başına taşıma izin belgesi almak ve araçta bulundurmak",
      "Yalnızca izin verilen sahaya dökmek, güzergâh dışına çıkmamak",
      "Yükü örtmek, yol kirliliğine yol açmamak",
      "Her sefer için döküm fişi düzenletip iş sahibine iletmek",
    ],
  },
  {
    taraf: "Belediye / idare",
    maddeler: [
      "Döküm sahalarını belirlemek, işletmek ve ücret tarifesini ilan etmek",
      "Taşıma izin ve kabul belgelerini düzenlemek",
      "Denetim yapmak, kaçak döküme idari yaptırım uygulamak",
      "Geri kazanım tesislerinin kurulmasını teşvik etmek",
    ],
  },
];

const faq = [
  {
    q: "Hafriyat toprağı hangi yönetmeliğe tabi?",
    a: "Hafriyat toprağı ve inşaat/yıkıntı atıkları, Çevre ve Şehircilik mevzuatı kapsamındaki 'Hafriyat Toprağı, İnşaat ve Yıkıntı Atıklarının Kontrolü Yönetmeliği' ile düzenlenir. Yaptırımlar 2872 sayılı Çevre Kanunu'na dayanır. Yönetmelik zaman içinde değişikliğe uğradığı için güncel metin mevzuat.gov.tr üzerinden takip edilmelidir.",
  },
  {
    q: "Sorumluluk kimde: nakliyecide mi, iş sahibinde mi?",
    a: "Her ikisinde de. Atığın üreticisi olarak iş sahibi, atığın mevzuata uygun bertarafından sorumludur; taşıyıcı ise izinli araç ve doğru saha kullanmakla yükümlüdür. Kaçak dökümde ceza her iki tarafa da uygulanabilir.",
  },
  {
    q: "Hafriyat toprağı ile moloz aynı yere mi dökülür?",
    a: "Hayır. Hafriyat toprağı (toprak, kil, kaya) hafriyat depolama sahalarına; inşaat/yıkıntı atığı (beton, tuğla, sıva) ise inert atık depolama ya da geri kazanım tesislerine gider. Bu yüzden atık kaynağında ayrı toplanmalıdır.",
  },
  {
    q: "Yönetmeliğe aykırılığın yaptırımı nedir?",
    a: "İzinsiz taşıma ve ruhsatsız sahaya döküm, Çevre Kanunu kapsamında idari para cezası gerektirir; tutarlar her yıl yeniden değerleme oranıyla güncellenir. Ayrıca kirletilen alanın temizlenmesi masrafı sorumluya yüklenir.",
  },
  {
    q: "Bu süreci firma yürütebilir mi?",
    a: "Evet. Hammaddem işlerinde saha koordinasyonu, araç izin belgeleri ve döküm fişlerinin toplanması bize aittir; iş sahibinin yalnızca beyan ve dosyalama yükümlülüğü kalır.",
  },
];

const Yonetmelik = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Hafriyat Toprağı Yönetmeliği", url: "/rehber/hafriyat-topragi-yonetmeligi" },
  ]);
  const faqJsonLd = buildFaqJsonLd(faq);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="hafriyat toprağı yönetmeliği, hafriyat toprağı inşaat ve yıkıntı atıklarının kontrolü yönetmeliği, hafriyat yönetmeliği, hafriyat döküm sahası yönetmeliği, hafriyat toprağı atık kodu" />
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
                <li className="text-txt-2 font-medium">Yönetmelik</li>
              </ol>
            </nav>
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                <Scale className="w-3 h-3" /> Mevzuat Özeti
              </span>
              <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                Hafriyat Toprağı Yönetmeliği —<br />
                <span className="text-navy">Şantiye İçin</span> Yükümlülük Özeti
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-5">
                Hafriyat toprağı ve inşaat/yıkıntı atıkları, "Hafriyat Toprağı, İnşaat ve Yıkıntı
                Atıklarının Kontrolü Yönetmeliği" ile düzenlenir; yaptırımlar 2872 sayılı Çevre
                Kanunu'na dayanır. Bu sayfa madde madde bir hukuk metni değil, sahada kimin neyden
                sorumlu olduğunu gösteren bir özettir.
              </p>
              <div className="flex items-start gap-2.5 text-sm text-txt-2 bg-off2 border border-border rounded-xl px-4 py-3.5">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
                <span>
                  Yönetmelik zaman içinde değişikliğe uğramıştır. Bağlayıcı metin için resmî kaynağa
                  bakın:{" "}
                  <a href="https://www.mevzuat.gov.tr/" target="_blank" rel="noopener noreferrer nofollow" className="text-navy font-semibold no-underline hover:underline inline-flex items-center gap-1">
                    mevzuat.gov.tr <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
              </div>
            </div>
            <HeroGorsel src="/images/rehber-yonetmelik.webp" alt="Tekerlek yıkama ünitesinden geçen brandalı damperli kamyon ve tabletle denetim yapan mühendis" width={1200} height={600} className="mt-10 max-w-[760px]" />
          </div>
        </section>

        <section className="py-12 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Kim, Neyden Sorumlu?</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[620px]">
              En sık yapılan hata, sorumluluğun tamamen nakliyeciye ait sanılmasıdır. Atığın üreticisi
              olarak iş sahibi de zincirin içindedir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {yukumlulukler.map((y) => (
                <div key={y.taraf} className="border border-border rounded-2xl p-5 bg-background">
                  <h3 className="font-bold text-sm mb-3 text-navy">{y.taraf}</h3>
                  <ul className="space-y-2">
                    {y.maddeler.map((m) => (
                      <li key={m} className="text-xs text-txt-2 leading-relaxed flex gap-2">
                        <span className="text-navy shrink-0">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Belge Zinciri</h2>
            <p className="text-sm text-txt-2 leading-[1.8] mb-6">
              Yönetmeliğin şantiyedeki karşılığı üç belgedir: aracı yetkilendiren{" "}
              <strong>taşıma izin belgesi</strong>, iş sahibinin beyanı olan{" "}
              <strong>taşıma ve kabul belgesi</strong> ve her seferi kanıtlayan{" "}
              <strong>döküm fişi</strong>. Zincirin bir halkası eksikse, atık ruhsatlı sahaya gitmiş
              olsa bile belgeleyemezsiniz. Ayrıca hafriyat toprağı ile moloz kaynağında ayrı
              toplanmalı; ikisi farklı tesislere gider.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/rehber/hafriyat-tasima-izin-belgesi" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-navy no-underline shadow-[0_2px_12px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px transition-all">
                Belgeler nasıl alınır? <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/rehber/moloz-nereye-dokulur" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                Moloz nereye dökülür?
              </Link>
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
            <p className="text-xs text-txt-3 mt-6 leading-relaxed">
              Bu sayfa genel bilgilendirme amaçlıdır ve hukuki görüş yerine geçmez. Uygulama
              belediyeden belediyeye değişebilir; bağlayıcı bilgi için ilgili idareye ve resmî mevzuat
              metnine başvurun.
            </p>
          </div>
        </section>

        <HafriyatKaynaklar haric="/rehber/hafriyat-topragi-yonetmeligi" />

        <section className="py-14 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Mevzuat Yükünü Biz Taşıyalım</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Lisanslı araç, ruhsatlı saha, izin belgeleri ve döküm fişleri bizde. İşinizi bildirin;
              belgeli ve net fiyatı 30 dakika içinde iletelim.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/hafriyat" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-navy no-underline shadow-[0_2px_12px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px transition-all">
                Teklif Al <ArrowRight className="w-4 h-4" />
              </Link>
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

export default Yonetmelik;
