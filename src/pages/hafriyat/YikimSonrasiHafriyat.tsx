import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/utils/seoSchemas";
import { MOLOZ_FIYATLARI } from "@/data/hafriyatFiyatData";
import { HAFRIYAT_ILCELER } from "@/data/hafriyatData";
import { ArrowRight, Phone, Hammer, AlertTriangle, CheckCircle, Info } from "lucide-react";

const canonical = "https://hammaddem.co/hafriyat/yikim-sonrasi-hafriyat";
const title = "Yıkım Sonrası Hafriyat ve Moloz Taşıma | Dönüşüm";
const description =
  "Yıkım sonrası hafriyat: kentsel dönüşüm ve bina yıkımı molozunun lisanslı araçlarla taşınması, ayrıştırma, döküm belgesi ve fiyatlandırma. 30 dk teklif.";

const tl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const asamalar = [
  { b: "Yıkım öncesi planlama", a: "Yıkım firması ve iş sahibiyle birlikte moloz hacmi tahmin edilir, araç sayısı ve döküm sahası önceden belirlenir. Plansız yıkımda moloz sahada birikir ve yıkım durur." },
  { b: "Ayrıştırma", a: "Beton-tuğla (inert), metal, ahşap ve karışık atık ayrılır. Metal ve inert malzeme geri kazanıma gider; bu hem bertaraf maliyetini düşürür hem mevzuata uygunluk sağlar." },
  { b: "Yükleme ve nakliye", a: "Ekskavatör ve kırıcıyla yükleme yapılır, lisanslı damperli araçlarla ruhsatlı sahaya taşınır. Yoğun yıkımlarda çok araçlı konvoy düzeni kurulur." },
  { b: "Saha teslimi", a: "Moloz kaldırıldıktan sonra saha süpürülür, gerekiyorsa kot düzeltmesi ve tesviye yapılıp arsa temel kazısına hazır teslim edilir." },
];

const faq = [
  {
    q: "Yıkım da yapıyor musunuz?",
    a: "Yıkım işini yıkım firmaları üstlenir; biz yıkım sonrası oluşan molozun ayrıştırılması, yüklenmesi ve ruhsatlı sahaya nakli ile sahanın temizlenmesini yapıyoruz. Yıkım firmanızla koordineli çalışır, gerekirse çalıştığımız firmalara yönlendiririz.",
  },
  {
    q: "Yıkım molozu taşıma fiyatı ne kadar?",
    a: "Kamyonla moloz taşıma 2026'da 3.000–7.500 TL/sefer, döküm sahası bedeli sefer başına 1.200–3.500 TL aralığındadır. Yıkım molozunda hacim yüksek olduğu için toplam maliyet sefer sayısıyla belirlenir; hacim büyüdükçe birim fiyat düşer.",
  },
  {
    q: "Asbest çıkarsa ne oluyor?",
    a: "1980'ler ve öncesi yapılarda asbestli malzeme bulunabilir. Asbest tehlikeli atıktır; normal moloz akışına karışamaz, yetkili firmalarca sökülüp lisanslı tesise gönderilmesi gerekir. Yıkım öncesi asbest taraması yapılmadan işe başlanmamalıdır.",
  },
  {
    q: "Molozun döküldüğünü nasıl belgeleyeceğim?",
    a: "Her seferin döküm fişi düzenlenir ve iş sahibine iletilir. Kentsel dönüşüm süreçlerinde ve iskân aşamasında bu fişler istenebilir.",
  },
  {
    q: "Yıkımdan sonra temel kazısını da yapıyor musunuz?",
    a: "Evet. Saha temizliğinin ardından temel kazısı, hafriyat nakli ve dolgu işlerini aynı ekiple sürdürüyoruz; iki iş için ayrı firma aramanıza gerek kalmaz.",
  },
];

const YikimSonrasiHafriyat = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Yıkım Sonrası Hafriyat", url: "/hafriyat/yikim-sonrasi-hafriyat" },
  ]);
  const faqJsonLd = buildFaqJsonLd(faq);
  const serviceJsonLd = buildServiceJsonLd({ name: "Yıkım Sonrası Hafriyat ve Moloz Nakli", description, url: canonical });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="yıkım sonrası hafriyat, yıkım hafriyat, yıkım hafriyat fiyatları, yıkım ve hafriyat, bina yıkım ve hafriyat fiyatları, kentsel dönüşüm yıkım, yıkım molozu taşıma" />
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

        <section id="teklif" className="pt-[110px] pb-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-txt-3">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link to="/" className="hover:text-navy transition-colors no-underline">Ana Sayfa</Link></li>
                <li className="text-txt-3/50">/</li>
                <li><Link to="/hafriyat" className="hover:text-navy transition-colors no-underline">Hafriyat İşleri</Link></li>
                <li className="text-txt-3/50">/</li>
                <li className="text-txt-2 font-medium">Yıkım Sonrası Hafriyat</li>
              </ol>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                  <Hammer className="w-3 h-3" /> Kentsel Dönüşüm
                </span>
                <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                  Yıkım Sonrası Hafriyat —<br />
                  <span className="text-navy">Moloz Nakli</span> ve Saha Teslimi
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-6">
                  Bina yıkıldıktan sonra iş bitmez: molozun ayrıştırılması, lisanslı araçlarla ruhsatlı
                  sahaya taşınması ve arsanın temel kazısına hazır teslim edilmesi gerekir. Bu bölümü
                  biz üstleniyoruz.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "Yıkım firmanızla koordineli, beklemesiz sevkiyat",
                    "İnert, metal ve ahşap ayrıştırması",
                    "Döküm fişi ve saha temizliği dahil",
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
              </div>
              <HafriyatTeklifForm baslik="Yıkım Molozu İçin Teklif" defaultMiktar={1} defaultBirim="Kamyon" />
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Yıkım Sonrası Süreç</h2>
            <ol className="space-y-3">
              {asamalar.map((a, i) => (
                <li key={a.b} className="flex gap-4 border border-border rounded-2xl p-5 bg-background">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-navy-light text-navy font-mono font-bold text-sm flex items-center justify-center">{i + 1}</div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{a.b}</h3>
                    <p className="text-sm text-txt-2 leading-relaxed">{a.a}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-start gap-2.5 text-sm text-txt-2 bg-accent-light border border-accent-border rounded-xl px-4 py-3.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              <span>
                <strong>Asbest uyarısı:</strong> Eski yapılarda asbestli malzeme bulunabilir. Asbest
                tehlikeli atıktır, normal moloz akışına karışamaz; yıkım öncesi tarama yapılmadan işe
                başlanmamalıdır. Tespit edilirse yetkili firmalarca sökülüp lisanslı tesise gönderilir.
              </span>
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Yıkım Molozu Taşıma Fiyatları</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Yıkım molozunda maliyeti sefer sayısı belirler; hacim büyüdükçe birim fiyat düşer.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background mb-4">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Hizmet</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Fiyat</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Birim</th>
                  </tr>
                </thead>
                <tbody>
                  {MOLOZ_FIYATLARI.filter((m) => m.hizmet !== "Çuval bazlı moloz taşıma").map((m) => (
                    <tr key={m.hizmet} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm font-semibold text-foreground">{m.hizmet}</td>
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
                Kaç sefer gerekeceğini{" "}
                <Link to="/hafriyat/hesaplama" className="text-navy font-semibold no-underline hover:underline">hesaplama aracıyla</Link>{" "}
                çıkarabilir, il bazlı döküm bedelleri için{" "}
                <Link to="/rehber/hafriyat-dokum-ucretleri" className="text-navy font-semibold no-underline hover:underline">döküm ücretleri rehberine</Link>{" "}
                bakabilirsiniz.
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
            <h3 className="text-sm font-semibold text-txt-2 uppercase tracking-wider mt-10 mb-3">Dönüşüm Yoğun İlçelerde Hizmet</h3>
            <div className="flex flex-wrap gap-2">
              {HAFRIYAT_ILCELER.map((l) => (
                <Link key={l.path} to={l.path} className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                  {l.ad}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <HafriyatKaynaklar haric="/hafriyat/yikim-sonrasi-hafriyat" />

        <section className="py-14 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Yıkım Programınıza Uyalım</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Yıkım tarihini ve bina ölçüsünü iletin; araç planını ve döküm dahil net fiyatı
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

export default YikimSonrasiHafriyat;
