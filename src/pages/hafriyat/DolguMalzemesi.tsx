import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/utils/seoSchemas";
import { DOLGU_FIYATLARI, DOLGU_FAQ } from "@/data/hafriyatFiyatData";
import { HAFRIYAT_ILLER } from "@/data/hafriyatData";
import { ArrowRight, Phone, Info, Layers, CheckCircle, Mountain } from "lucide-react";

const canonical = "https://hammaddem.co/hafriyat/dolgu-malzemesi";
const title = "Dolgu Toprağı Fiyatı 2026 | Stabilize Dolgu, Tesviye";
const description =
  "Dolgu toprağı fiyatı 2026: kamyon ve ton bazında dolgu toprağı, stabilize ve tuvenan dolgu, arazi tesviyesi. Kazı-dolgu dengesiyle maliyet düşürme.";

const tl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const tesviyeAdimlari = [
  { baslik: "Kot etüdü", desc: "Mevcut arazi kotu ile hedef kot arasındaki fark ölçülür; kazı ve dolgu hacimleri ayrı ayrı çıkarılır." },
  { baslik: "Kazı-dolgu dengesi", desc: "Sahadan çıkan uygun malzeme dolguda değerlendirilir; böylece hem döküm hem malzeme alımı azalır." },
  { baslik: "Serme ve sıkıştırma", desc: "Dolgu 20–30 cm tabakalar hâlinde serilir, silindirle sıkıştırılır; gerekiyorsa sıkışma testi yapılır." },
  { baslik: "Son kot ve teslim", desc: "Yüzey son kota getirilir, drenaj eğimi verilir ve saha imalata hazır teslim edilir." },
];

const DolguMalzemesi = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Dolgu Malzemesi", url: "/hafriyat/dolgu-malzemesi" },
  ]);
  const faqJsonLd = buildFaqJsonLd(DOLGU_FAQ);
  const serviceJsonLd = buildServiceJsonLd({
    name: "Dolgu Malzemesi Temini ve Arazi Tesviyesi",
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
          content="dolgu toprağı fiyatı, dolgu toprağı, dolgu malzemesi fiyatları, dolgu fiyatları, stabilize dolgu fiyatı, stabilize dolgu nedir, tuvenan dolgu nedir, arazi tesviyesi, tesviye işleri, arazi düzenleme, dolgu malzemesi nedir inşaat"
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

        <section id="teklif" className="pt-[110px] pb-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-txt-3">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link to="/" className="hover:text-navy transition-colors no-underline">Ana Sayfa</Link></li>
                <li className="text-txt-3/50">/</li>
                <li><Link to="/hafriyat" className="hover:text-navy transition-colors no-underline">Hafriyat İşleri</Link></li>
                <li className="text-txt-3/50">/</li>
                <li className="text-txt-2 font-medium">Dolgu Malzemesi</li>
              </ol>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                  <Layers className="w-3 h-3" /> Dolgu & Tesviye
                </span>
                <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                  Dolgu Toprağı ve Stabilize Dolgu —<br />
                  <span className="text-navy">2026 Fiyatları</span>, Arazi Tesviyesi
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-6">
                  Dolgu toprağı, stabilize, tuvenan ve kırmataş dolguyu ocaktan şantiyenize taşıyor;
                  serme-sıkıştırma ve arazi tesviyesini aynı teklif altında yürütüyoruz.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "Kazı-dolgu dengesi hesabıyla malzeme ve döküm tasarrufu",
                    "Tabaka tabaka serme ve silindirle sıkıştırma",
                    "Kazı ve dolgu tek fiyatta, tek muhatapla",
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
              <HafriyatTeklifForm baslik="Dolgu ve Tesviye Teklifi" />
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Dolgu Malzemesi Fiyatları 2026</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Dolgu malzemesinde fiyatın büyük kısmı nakliyedir; ocak veya kaynak saha ne kadar yakınsa
              ton başına maliyet o kadar düşer. Aşağıdaki aralıklar teslim fiyatlarıdır.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full min-w-[620px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Malzeme</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Nerede kullanılır</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Ton Fiyatı (TL)</th>
                  </tr>
                </thead>
                <tbody>
                  {DOLGU_FIYATLARI.map((d) => (
                    <tr key={d.malzeme} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm font-semibold text-foreground whitespace-nowrap">{d.malzeme}</td>
                      <td className="px-5 py-4 text-xs text-txt-2 leading-relaxed">{d.kullanim}</td>
                      <td className="px-5 py-4 text-right text-base font-mono font-bold text-navy tabular-nums whitespace-nowrap">{tl(d.min)} – {tl(d.max)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs text-txt-2 bg-off2 border border-border rounded-lg px-3.5 py-2.5 max-w-[660px]">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
              <span>
                Stabilize için malzeme sayfamızda daha ayrıntılı bilgi var:{" "}
                <Link to="/malzeme/stabilize" className="text-navy font-semibold no-underline hover:underline">stabilize malzeme fiyatı</Link>.
                Kaç ton gerektiğini bilmiyorsanız{" "}
                <Link to="/hafriyat/hesaplama" className="text-navy font-semibold no-underline hover:underline">hesaplama aracını</Link> kullanın.
              </span>
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 flex items-center gap-2">
              <Mountain className="w-6 h-6 text-navy" /> Kazı-Dolgu Dengesi: Maliyeti Düşüren Hesap
            </h2>
            <p className="text-sm text-txt-2 leading-[1.8] mb-6">
              Bir sahada hem kazı hem dolgu varsa, kazıdan çıkan uygun malzemeyi dışarı taşıyıp yerine
              yeni malzeme almak iki kat masraftır. Zemin sınıfı uygunsa (bitkisel toprak ve organik
              malzeme hariç) kazı fazlası sahada değerlendirilir: hem döküm bedeli hem malzeme alımı
              azalır. Kot planınızı iletin; hangi hacmin sahada kalabileceğini birlikte çıkaralım.
            </p>
            <h3 className="text-lg font-extrabold tracking-tight mb-4">Arazi Tesviyesi Nasıl Yapılır?</h3>
            <ol className="space-y-3">
              {tesviyeAdimlari.map((a, i) => (
                <li key={a.baslik} className="flex gap-4 border border-border rounded-2xl p-5 bg-background">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-navy-light text-navy font-mono font-bold text-sm flex items-center justify-center">{i + 1}</div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{a.baslik}</h4>
                    <p className="text-sm text-txt-2 leading-relaxed">{a.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Sık Sorulan Sorular</h2>
            <div className="space-y-4">
              {DOLGU_FAQ.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-txt-2 uppercase tracking-wider mt-10 mb-3">Dolgu ve Tesviye Yaptığımız İller</h3>
            <div className="flex flex-wrap gap-2.5">
              {HAFRIYAT_ILLER.map((l) => (
                <Link key={l.path} to={l.path} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                  {l.ad}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <HafriyatKaynaklar haric="/hafriyat/dolgu-malzemesi" />

        <section className="py-14 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Dolgu ve Tesviye İçin Net Fiyat</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Saha ölçüsü ve hedef kotu iletin; malzeme, nakliye ve sıkıştırma dahil fiyatı
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

export default DolguMalzemesi;
