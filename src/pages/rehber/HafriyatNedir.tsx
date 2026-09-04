import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";
import { ArrowRight, Phone, BookOpen, Check, X } from "lucide-react";

import HeroGorsel from "@/components/HeroGorsel";
const canonical = "https://hammaddem.co/rehber/hafriyat-nedir";
const title = "Hafriyat Nedir? Hafriyat mı Harfiyat mı, Nasıl Yapılır";
const description =
  "Hafriyat nedir, hafriyat mı harfiyat mı (doğrusu: hafriyat), hafriyat toprağı ne demek, hafriyat işi nasıl yapılır ve ne kadar sürer. Terim sözlüğü.";

const sozluk = [
  { terim: "Hafriyat", tanim: "Bir yapı ya da altyapı imalatı için zeminin kazılması, çıkan malzemenin taşınması ve uygun sahaya dökülmesi işlerinin tümü." },
  { terim: "Hafriyat toprağı", tanim: "Kazıdan çıkan toprak, kil, kum ve kaya karışımı. İnşaat/yıkıntı atığından farklıdır; ayrı sahalara dökülür." },
  { terim: "Döküm sahası", tanim: "Belediyenin ruhsat verdiği, hafriyat toprağının kabul edildiği alan. Sahaya girişte döküm fişi düzenlenir." },
  { terim: "Kabarma katsayısı", tanim: "Kazılan zemin gevşediği için hacmi büyür. Toprakta %20–25, kilde %30–40, kayada %40–60 kabarma olur." },
  { terim: "İksa", tanim: "Derin kazılarda toprağın göçmesini önleyen destek sistemi (ankraj, fore kazık, berlin duvarı). Bitişik nizamda zorunludur." },
  { terim: "Şev", tanim: "Kazı duvarının göçmemesi için verilen eğim. Yer yeterliyse iksa yerine şevli kazı tercih edilir." },
  { terim: "Kot", tanim: "Bir noktanın referans yüzeye göre yüksekliği. Kazı taban kotu, kazının nereye kadar ineceğini belirler." },
  { terim: "Aplikasyon", tanim: "Projedeki yapı sınırlarının araziye işaretlenmesi. Kazı bu sınırlara göre başlar." },
  { terim: "Tesviye", tanim: "Arazinin hedef kota göre düzeltilmesi; kazı ve dolgunun birlikte kullanıldığı işlem." },
  { terim: "Tuvenan", tanim: "Ocaktan çıktığı hâliyle elenmemiş karışık malzeme. Kalın dolgu tabakalarında ekonomik çözümdür." },
  { terim: "Stabilize", tanim: "Belirli granülometride kırılmış ve elenmiş taş. Sıkıştığında yüksek taşıma gücü verir; yol ve temel altında kullanılır." },
  { terim: "Moloz", tanim: "Yıkım, tadilat ve inşaattan çıkan beton, tuğla, sıva ve karışık atık. Hafriyat toprağından ayrı değerlendirilir." },
];

const faq = [
  {
    q: "Hafriyat nedir?",
    a: "Hafriyat, bir inşaat ya da altyapı işi için zeminin kazılması, kazıdan çıkan malzemenin yüklenip taşınması ve ruhsatlı sahaya dökülmesi işlerinin bütününe verilen addır. Yalnızca kazı değil, nakliye ve döküm de hafriyatın parçasıdır.",
  },
  {
    q: "Hafriyat mı harfiyat mı, doğru yazımı hangisi?",
    a: "Doğrusu hafriyattır. Kelime Arapça kökenli 'hafr' (kazma) sözcüğünden gelir. Halk arasında sık kullanılan 'harfiyat' yazımı yanlıştır.",
  },
  {
    q: "Hafriyat toprağı ne demek?",
    a: "Kazıdan çıkan toprak, kil, kum ve kaya karışımına hafriyat toprağı denir. Mevzuatta inşaat/yıkıntı atığından (moloz) ayrı tanımlanır ve farklı sahalara dökülür.",
  },
  {
    q: "Hafriyat işi nasıl yapılır?",
    a: "Aplikasyon ve kot alma, bitkisel toprak sıyırma, zemin sınıfına göre şevli ya da iksalı kazı, lisanslı araçlarla nakliye, ruhsatlı sahaya döküm ve son olarak taban düzeltme adımlarıyla yürütülür.",
  },
  {
    q: "Hafriyat ne kadar sürer?",
    a: "Müstakil ev temeli (300–600 m³) 1–2 gün, tek bodrumlu apartman (1.000–2.000 m³) 3–5 gün, site bloğu (4.000–8.000 m³) 8–15 gün sürer. Süreyi ekip büyüklüğü ve döküm sahası mesafesi belirler.",
  },
];

const HafriyatNedir = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Hafriyat Nedir?", url: "/rehber/hafriyat-nedir" },
  ]);
  const faqJsonLd = buildFaqJsonLd(faq);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="hafriyat nedir, hafriyat ne demek, hafriyat mı harfiyat mı, hafriyat nasıl yazılır, hafriyat çalışması nedir, hafriyat işi nedir, hafriyat toprağı ne demek, hafriyat nasıl yapılır, hafriyat ne kadar sürer" />
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
                <li className="text-txt-2 font-medium">Hafriyat Nedir?</li>
              </ol>
            </nav>
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                <BookOpen className="w-3 h-3" /> Rehber
              </span>
              <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                Hafriyat Nedir? —<br />
                <span className="text-navy">Süreç, Terimler</span> ve Doğru Yazım
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7]">
                <strong>Hafriyat</strong>, bir yapı ya da altyapı işi için zeminin kazılması, kazıdan
                çıkan malzemenin taşınması ve ruhsatlı sahaya dökülmesi işlerinin tümüdür. Sahada
                sadece "kazı" anlamında kullanılsa da mevzuat açısından nakliye ve döküm de hafriyatın
                parçasıdır — sorumluluk kazı bitince sona ermez.
              </p>
            </div>
            <HeroGorsel src="/images/rehber-hafriyat-nedir.webp" alt="Tipik bir hafriyat sahası: kazı yapan ekskavatör, toprak yığını, yüklenen kamyon ve şantiye konteyneri" width={1200} height={600} className="mt-10 max-w-[760px]" />
          </div>
        </section>

        {/* Yazım kutusu */}
        <section className="pb-12 px-4 md:px-10">
          <div className="max-w-[760px] mx-auto">
            <div className="border border-navy-border rounded-2xl bg-navy-light/40 p-6">
              <h2 className="text-lg font-extrabold tracking-tight mb-3">Hafriyat mı, harfiyat mı?</h2>
              <div className="flex flex-wrap gap-3 mb-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-success-light border border-success-border text-success font-bold text-sm">
                  <Check className="w-4 h-4" /> hafriyat
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border text-txt-3 font-medium text-sm line-through">
                  <X className="w-4 h-4" /> harfiyat
                </span>
              </div>
              <p className="text-sm text-txt-2 leading-relaxed">
                Doğru yazım <strong>hafriyat</strong>tır. Kelime Arapça <em>hafr</em> (kazma) kökünden
                gelir. "Harfiyat" yaygın bir söyleyiş hatasıdır; resmî yazışmalarda ve sözleşmelerde
                kullanılmamalıdır.
              </p>
            </div>
          </div>
        </section>

        {/* Süreç */}
        <section className="py-12 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Hafriyat İşi Nasıl Yapılır?</h2>
            <p className="text-sm text-txt-2 leading-[1.8] mb-6">
              Hafriyat beş adımda yürür: <strong>aplikasyon ve kot alma</strong> ile yapı sınırları araziye
              işaretlenir; <strong>bitkisel toprak sıyrılır</strong>; zemin sınıfına göre <strong>şevli
              ya da iksalı kazı</strong> yapılır; çıkan malzeme <strong>lisanslı araçlarla ruhsatlı
              sahaya taşınır</strong>; son olarak <strong>kazı tabanı düzeltilip sıkıştırılarak</strong>{" "}
              imalata hazır teslim edilir. Ayrıntılı anlatım ve süre tablosu için{" "}
              <Link to="/hafriyat/temel-kazisi" className="text-navy font-semibold no-underline hover:underline">temel kazısı sayfamıza</Link>{" "}
              bakabilirsiniz.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/hafriyat/fiyatlar" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground bg-background border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                Hafriyat fiyatları 2026
              </Link>
              <Link to="/hafriyat/hesaplama" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground bg-background border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                Hafriyat hesaplama
              </Link>
              <Link to="/rehber/hafriyat-kamyonu-kac-m3" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground bg-background border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                Kamyon kaç m³ alır?
              </Link>
            </div>
          </div>
        </section>

        {/* Sözlük */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Hafriyat Terimleri Sözlüğü</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[600px]">
              Teklif ve sözleşmelerde karşınıza çıkacak terimler.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sozluk.map((s) => (
                <div key={s.terim} className="border border-border rounded-2xl p-5 bg-background">
                  <h3 className="font-bold text-sm mb-1.5 text-navy">{s.terim}</h3>
                  <p className="text-xs text-txt-2 leading-relaxed">{s.tanim}</p>
                </div>
              ))}
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

        <HafriyatKaynaklar haric="/rehber/hafriyat-nedir" />

        <section className="py-14 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Hafriyat İşiniz mi Var?</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Kazı, nakliye ve döküm dahil net fiyatı 30 dakika içinde telefonla verelim.
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

export default HafriyatNedir;
