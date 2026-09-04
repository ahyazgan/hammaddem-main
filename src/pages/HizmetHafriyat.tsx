import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatHeroGorsel from "@/components/hafriyat/HafriyatHeroGorsel";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/utils/seoSchemas";
import { SEFER_FIYATLARI, KAMYON_KAPASITELERI } from "@/data/hafriyatFiyatData";
import { HAFRIYAT_ILLER } from "@/data/hafriyatData";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Info } from "lucide-react";

const canonical = "https://hammaddem.co/hizmetler/hafriyat-nakliyesi";
const title = "Hafriyat Kamyonu Kiralama | Sefer, Saatlik, Günlük 2026";
const description =
  "Hafriyat kamyonu kiralama fiyatları 2026: sefer başı, saatlik ve günlük damperli kamyon. Hafriyat nakliyesi, lisanslı araçlar. 30 dakikada teklif.";

const tl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const tasinanlar = [
  { ad: "Hafriyat toprağı", path: "/hafriyat" },
  { ad: "Moloz & inşaat atığı", path: "/hafriyat/moloz-tasima" },
  { ad: "Kum", path: "/malzeme/kum" },
  { ad: "Çakıl", path: "/malzeme/cakil" },
  { ad: "Mıcır", path: "/malzeme/micir" },
  { ad: "Stabilize", path: "/malzeme/stabilize" },
];

const fiyatModelleri = [
  {
    baslik: "Sefer bazlı (en yaygın)",
    aciklama:
      "Hafriyat ve moloz taşımada standart model. Yükleme noktası ile döküm sahası arası bir gidiş-dönüş bir sefer sayılır; fiyat mesafeye göre belirlenir. Kaç sefer gerektiğini kazı hacmi belirler.",
  },
  {
    baslik: "Saatlik çalışma",
    aciklama:
      "Kamyon için saatlik ücret, ancak araç şantiye içinde sürekli çalışıyor ya da makineye bağlı bekliyorsa uygulanır. Şehir içi döküm işlerinde saatlik model iş sahibi aleyhine olur; trafikte geçen süre de faturalanır.",
  },
  {
    baslik: "Günlük / proje bazlı",
    aciklama:
      "Uzun süreli şantiyelerde araç günlük ya da aylık tahsis edilir. Fiyat, günlük yapılabilecek sefer sayısı üzerinden hesaplanır; süreklilik olduğunda sefer başı maliyet düşer.",
  },
];

const adimlar = [
  { step: "01", title: "İşi bildirin", desc: "Yük tipi, konum, tahmini hacim ve tarih; 2 dakika sürer." },
  { step: "02", title: "Araç planı", desc: "Hacme ve erişime göre kamyon tipi ve sefer sayısı çıkarılır." },
  { step: "03", title: "Net fiyat", desc: "30 dakika içinde telefonla sefer/gün fiyatı iletilir." },
  { step: "04", title: "Sevkiyat", desc: "Lisanslı araç görevlendirilir, döküm belgesi teslim edilir." },
];

const avantajlar = [
  { icon: Clock, title: "30 Dakikada Teklif", desc: "Talebi iletin, aynı saat içinde net sefer fiyatı alın." },
  { icon: Shield, title: "Lisanslı Araç, Belgeli Döküm", desc: "Taşıma izin belgesi ve döküm fişi iş sahibine iletilir." },
  { icon: Truck, title: "Filo Esnekliği", desc: "Tek kamyondan çok araçlı konvoya, dar sokağa küçük tonaj." },
  { icon: CheckCircle, title: "Tek Muhatap", desc: "Yükleme, nakliye ve döküm koordinasyonu tek elden." },
];

const faq = [
  {
    q: "Hafriyat kamyonu kiralama fiyatları ne kadar?",
    a: "2026'da sefer başına 12–15 m³ kamyon 2.500–3.500 TL, 16–20 m³ kırkayak 3.500–4.500 TL, 24–30 m³ damperli tır 4.500–5.500 TL aralığındadır. Döküm sahası bedeli ayrıca hesaplanır; mesafe arttıkça fiyat üst banda yaklaşır.",
  },
  {
    q: "Hafriyat kamyonu saatlik mi, sefer başına mı kiralanır?",
    a: "Şehir içi hafriyat ve moloz taşımada standart model sefer başınadır; trafikte geçen süre iş sahibine yansımaz. Saatlik model, aracın şantiye içinde sürekli çalıştığı veya iş makinesine bağlı beklediği durumlarda uygulanır.",
  },
  {
    q: "Kaç kamyon gerekeceğini nasıl bilirim?",
    a: "Yerinde kazı hacmini kabarma katsayısıyla çarpıp kamyon kapasitesine bölerek bulunur. Hesaplama aracımız bunu otomatik yapar: 100 m³ killi zemin kazısı, 12–15 m³ kamyonla yaklaşık 9–11 sefer eder.",
  },
  {
    q: "Şoför ve yakıt fiyata dahil mi?",
    a: "Evet. Sefer ve günlük fiyatlarımız araç, şoför ve yakıtı kapsar. Yükleme için ekskavatör gerekiyorsa ayrıca planlanır ve teklifte kalem olarak gösterilir.",
  },
  {
    q: "Aylık kamyon kiralama yapıyor musunuz?",
    a: "Uzun süreli şantiyelerde araç tahsisi yapıyoruz. Aylık çalışmada günlük sefer sayısı ve güzergâh üzerinden fiyat çıkarılır; süreklilik olduğunda sefer başı maliyet düşer.",
  },
];

const HizmetHafriyat = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Hafriyat Kamyonu Kiralama", url: "/hizmetler/hafriyat-nakliyesi" },
  ]);
  const faqJsonLd = buildFaqJsonLd(faq);
  const serviceJsonLd = buildServiceJsonLd({
    name: "Hafriyat Kamyonu Kiralama ve Hafriyat Nakliyesi",
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
          content="hafriyat kamyonu kiralama, hafriyat kamyonu kiralama fiyatları, hafriyat kamyonu sefer fiyatları, hafriyat kamyonu saatlik ücret, hafriyat kamyonu ücreti, damperli kamyon kiralama, damperli kamyon kiralama fiyatları, kamyon kiralama fiyatları, hafriyat nakliye, hafriyat nakliye birim fiyat, hafriyat taşıma"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og/hizmet-kamyon-kiralama.jpg" />
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
                <li className="text-txt-2 font-medium">Kamyon Kiralama</li>
              </ol>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                  <Truck className="w-3 h-3" /> Araç Kiralama
                </span>
                <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                  Hafriyat Kamyonu Kiralama —<br />
                  <span className="text-navy">Sefer, Saatlik ve Günlük</span> Fiyatlar 2026
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-6">
                  Damperli kamyon ve kırkayak filomuzla hafriyat toprağı, moloz, kum, çakıl ve
                  stabilize nakliyesi. Şoför ve yakıt dahil; lisanslı araç, belgeli döküm.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "Tek kamyondan çok araçlı konvoya ölçeklenebilir filo",
                    "Şoför, yakıt ve sigorta fiyata dahil",
                    "Dar sokak ve site içi işlerde küçük tonajlı araç",
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
                  src="/images/hizmet-kamyon-kiralama.webp"
                  alt="Kiralamaya hazır, sıralı beş adet Avrupa tipi damperli hafriyat kamyonu ve sevkiyat sorumlusu"
                  caption="Sefer ve günlük kiralamaya hazır damperli filo"
                />
              </div>
              <HafriyatTeklifForm baslik="Kamyon Kiralama Teklifi" defaultMiktar={1} defaultBirim="Kamyon" />
            </div>
          </div>
        </section>

        {/* Sefer fiyatları */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Kamyon Tipine Göre Sefer Fiyatları
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Şehir içi ortalama mesafe için 2026 piyasa aralıkları; döküm sahası bedeli hariçtir.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background mb-4">
              <table className="w-full min-w-[620px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5">Araç</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Kasa Hacmi</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Yük</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">Sefer Fiyatı (TL)</th>
                  </tr>
                </thead>
                <tbody>
                  {SEFER_FIYATLARI.map((s, i) => (
                    <tr key={s.arac} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm font-semibold text-foreground whitespace-nowrap">{s.arac}</td>
                      <td className="px-5 py-4 text-right text-sm font-mono text-txt-2 tabular-nums whitespace-nowrap">{s.kapasite}</td>
                      <td className="px-5 py-4 text-right text-sm font-mono text-txt-2 tabular-nums whitespace-nowrap">
                        {KAMYON_KAPASITELERI.find((k) => k.m3 === s.kapasite)?.ton ?? ["≈ 15 ton", "16 – 20 ton", "24 – 28 ton"][i]}
                      </td>
                      <td className="px-5 py-4 text-right text-base font-mono font-bold text-navy tabular-nums whitespace-nowrap">{tl(s.min)} – {tl(s.max)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-start gap-2 text-xs text-txt-2 bg-off2 border border-border rounded-lg px-3.5 py-2.5 max-w-[660px]">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-navy" />
              <span>
                Kaç kamyon gerektiğini bilmiyorsanız{" "}
                <Link to="/hafriyat/hesaplama" className="text-navy font-semibold no-underline hover:underline">hesaplama aracını</Link>{" "}
                kullanın; kapasite ayrıntıları için{" "}
                <Link to="/rehber/hafriyat-kamyonu-kac-m3" className="text-navy font-semibold no-underline hover:underline">kamyon kaç m³ alır</Link>{" "}
                rehberine bakın.
              </span>
            </div>
          </div>
        </section>

        {/* Fiyat modelleri */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Sefer mi, Saatlik mi, Günlük mü?
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Yanlış fiyat modeli, doğru fiyattan daha pahalıya gelir. İşinize uygun modeli birlikte seçelim.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fiyatModelleri.map((m) => (
                <div key={m.baslik} className="border border-border rounded-2xl p-5 bg-background">
                  <h3 className="font-bold text-sm mb-2">{m.baslik}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{m.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Taşıdıklarımız */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Ne Taşıyoruz?</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[560px]">
              Damperli araçlarımız hem şantiyeden çıkan atığı hem de sahaya girecek malzemeyi taşır.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {tasinanlar.map((t) => (
                <Link key={t.path} to={t.path} className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors no-underline">
                  {t.ad}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Nasıl çalışır */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Nasıl Çalışır?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {adimlar.map((s) => (
                <div key={s.step} className="border border-border rounded-2xl p-6 bg-background hover:border-navy-border hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-navy-light text-navy font-mono font-bold text-sm flex items-center justify-center mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Neden Hammaddem?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {avantajlar.map((a) => (
                <div key={a.title} className="flex gap-4 items-start border border-border rounded-2xl p-6 bg-background hover:border-navy-border transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center shrink-0">
                    <a.icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">{a.title}</h3>
                    <p className="text-sm text-txt-2 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-txt-2 uppercase tracking-wider mt-10 mb-3">Araç Görevlendirdiğimiz İller</h3>
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
              Kamyon Kiralama — Sık Sorulan Sorular
            </h2>
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

        <HafriyatKaynaklar haric="/hizmetler/hafriyat-nakliyesi" koyu />

        {/* CTA */}
        <section className="py-14 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Araç Planınızı Çıkaralım
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Yük tipini, konumu ve hacmi iletin; uygun kamyon tipini, sefer sayısını ve net fiyatı
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

export default HizmetHafriyat;
