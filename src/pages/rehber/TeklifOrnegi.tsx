import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";
import { ArrowRight, Phone, FileText, Printer, AlertTriangle } from "lucide-react";

import HeroGorsel from "@/components/HeroGorsel";
const canonical = "https://hammaddem.co/rehber/hafriyat-fiyat-teklifi-ornegi";
const title = "Hafriyat Fiyat Teklifi Örneği ve Sözleşme Maddeleri";
const description =
  "Hafriyat fiyat teklifi örneği: kalem kalem teklif tablosu, m³ ve sefer birim fiyatı, döküm bedeli ile sözleşmede olması gereken maddeler. 30 dk'da teklif.";

const tl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Örnek: 1.200 m³ yerinde kazı, killi zemin, 12–15 m³ kamyon, 25 km döküm mesafesi */
const ornekKalemler = [
  { no: "1", kalem: "Temel kazısı (killi zemin)", miktar: "1.200", birim: "m³", bf: 210, tutar: 252000 },
  { no: "2", kalem: "Yükleme ve nakliye (döküm sahasına 25 km)", miktar: "125", birim: "sefer", bf: 0, tutar: 0, not: "1. kaleme dahil" },
  { no: "3", kalem: "Döküm sahası bedeli", miktar: "125", birim: "sefer", bf: 1500, tutar: 187500 },
  { no: "4", kalem: "Taşıma izin belgesi ve evrak", miktar: "1", birim: "götürü", bf: 6500, tutar: 6500 },
  { no: "5", kalem: "Kazı tabanı düzeltme ve sıkıştırma", miktar: "400", birim: "m²", bf: 45, tutar: 18000 },
];
const araToplam = ornekKalemler.reduce((t, k) => t + k.tutar, 0);
const kdv = araToplam * 0.2;

const sozlesmeMaddeleri = [
  { b: "İşin tanımı ve sınırları", a: "Kazı alanı, derinlik, hedef kot ve hangi işlerin dahil olduğu (yükleme, nakliye, döküm, tesviye) açıkça yazılmalı." },
  { b: "Birim fiyat ve ölçüm esası", a: "Fiyatın m³ mü sefer mi olduğu ve hacmin yerinde ölçüyle mi kamyon hacmiyle mi hesaplanacağı belirtilmeli. En sık anlaşmazlık burada çıkar." },
  { b: "Döküm bedeli kime ait", a: "Döküm sahası ücretinin fiyata dahil olup olmadığı yazılmalı; dahil değilse hangi tarifeye göre yansıtılacağı belirtilmeli." },
  { b: "Süre ve iş programı", a: "Başlangıç tarihi, günlük hedef hacim ve gecikme halinde ne olacağı tanımlanmalı." },
  { b: "Belgeler", a: "Taşıma izin belgesi ve her seferin döküm fişinin iş sahibine teslim edileceği taahhüt edilmeli." },
  { b: "Beklenmeyen durumlar", a: "Kaya çıkması, su gelmesi, iksa ihtiyacı gibi hallerde fiyatın nasıl güncelleneceği önceden yazılmalı." },
  { b: "Ödeme koşulları", a: "Avans, hakediş dönemleri ve ölçüm tutanağına bağlı ödeme şekli netleştirilmeli." },
  { b: "İş güvenliği ve sigorta", a: "Sahada iş güvenliği sorumluluğu, üçüncü kişi zararlarına karşı sigorta durumu belirtilmeli." },
];

const sorular = [
  "Fiyat m³ mü, sefer mi? Hacim yerinde ölçüyle mi hesaplanıyor?",
  "Döküm sahası bedeli fiyata dahil mi?",
  "Molozu hangi sahaya döküyorsunuz, döküm fişi veriyor musunuz?",
  "Araçlarınızın taşıma izin belgesi var mı?",
  "Kaya çıkarsa fiyat nasıl değişir, yazılı mı?",
  "Günde kaç sefer/kaç m³ taşıyabiliyorsunuz?",
  "Kazı tabanı teslimi ve saha temizliği dahil mi?",
];

const faq = [
  {
    q: "Hafriyat fiyat teklifi nasıl hazırlanır?",
    a: "Teklif kalem kalem yazılır: kazı (m³ × birim fiyat), nakliye (sefer sayısı), döküm sahası bedeli, evrak ve varsa tesviye. Her kalemin miktarı, birimi ve birim fiyatı ayrı gösterilir; KDV ayrıca belirtilir. Tek satırlık 'hafriyat işi: X TL' teklifleri karşılaştırılamaz.",
  },
  {
    q: "Teklifte hangi kalemler mutlaka olmalı?",
    a: "Kazı, yükleme-nakliye, döküm sahası bedeli, taşıma izin belgesi ve evrak, kazı tabanı düzeltme. Ayrıca iksa, susuzlaştırma ve kaya kırımı gerekiyorsa bunlar ayrı kalem olarak gösterilmelidir.",
  },
  {
    q: "Hafriyat sözleşmesinde neye dikkat etmeliyim?",
    a: "Ölçüm esası (yerinde hacim mi kamyon hacmi mi), döküm bedelinin kime ait olduğu, beklenmeyen durumlarda fiyat güncellemesi ve belgelerin teslimi. Bu dört madde yazılı değilse anlaşmazlık riski yüksektir.",
  },
  {
    q: "Teklifleri nasıl karşılaştırmalıyım?",
    a: "Toplam tutara değil, birim fiyat ve kapsama bakın. Döküm hariç verilen bir teklif, döküm dahil verilenden ucuz görünür ama gerçekte pahalıya gelebilir. Aşağıdaki 7 soruyu her firmaya sorun.",
  },
];

const TeklifOrnegi = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Fiyat Teklifi Örneği", url: "/rehber/hafriyat-fiyat-teklifi-ornegi" },
  ]);
  const faqJsonLd = buildFaqJsonLd(faq);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="hafriyat fiyat teklifi örneği, hafriyat teklif örneği, hafriyat teklif formu örneği, hafriyat teklif formu, hafriyat fiyat teklifi, hafriyat sözleşmesi, hafriyat nakliye sözleşmesi örneği" />
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
                <li className="text-txt-2 font-medium">Teklif Örneği</li>
              </ol>
            </nav>
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                <FileText className="w-3 h-3" /> Şablon
              </span>
              <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                Hafriyat Fiyat Teklifi Örneği ve<br />
                <span className="text-navy">Sözleşme Maddeleri</span>
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7]">
                Tek satırlık "hafriyat işi: X TL" teklifleri karşılaştırılamaz. Aşağıda kalem kalem
                örnek bir teklif, sözleşmede bulunması gereken maddeler ve teklif alırken sorulacak
                7 soru var. Sayfayı yazdırıp şablon olarak kullanabilirsiniz.
              </p>
            </div>
            <HeroGorsel src="/images/rehber-teklif-ornegi.webp" alt="Şantiye ofisi masasında baret, hesap makinesi ve teklif evrakı; camdan görünen ekskavatör" width={1200} height={600} className="mt-10 max-w-[760px]" />
          </div>
        </section>

        {/* Örnek teklif */}
        <section className="py-12 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Örnek Teklif Tablosu</h2>
              <span className="inline-flex items-center gap-1.5 text-xs text-txt-3">
                <Printer className="w-3.5 h-3.5" /> Yazdırıp şablon olarak kullanın
              </span>
            </div>
            <p className="text-sm text-txt-2 mb-6 max-w-[680px]">
              Senaryo: <strong>1.200 m³ yerinde kazı</strong>, killi zemin, 12–15 m³ kamyon,
              döküm sahasına 25 km. Rakamlar 2026 piyasa aralıklarından örnek amaçlı seçilmiştir.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full min-w-[680px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-4 py-3.5">No</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-4 py-3.5">Kalem</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-4 py-3.5">Miktar</th>
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-4 py-3.5">Birim</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-4 py-3.5">Birim Fiyat</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-4 py-3.5">Tutar (TL)</th>
                  </tr>
                </thead>
                <tbody>
                  {ornekKalemler.map((k) => (
                    <tr key={k.no} className="border-b border-border">
                      <td className="px-4 py-3.5 text-sm font-mono text-txt-3">{k.no}</td>
                      <td className="px-4 py-3.5 text-sm text-foreground">{k.kalem}</td>
                      <td className="px-4 py-3.5 text-right text-sm font-mono tabular-nums text-txt-2">{k.miktar}</td>
                      <td className="px-4 py-3.5 text-xs text-txt-2">{k.birim}</td>
                      <td className="px-4 py-3.5 text-right text-sm font-mono tabular-nums text-txt-2">{k.bf ? tl(k.bf) : "—"}</td>
                      <td className="px-4 py-3.5 text-right text-sm font-mono font-semibold tabular-nums">{k.tutar ? tl(k.tutar) : <span className="text-xs font-sans font-normal text-txt-3">{k.not}</span>}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-border bg-off2/40">
                    <td colSpan={5} className="px-4 py-3 text-sm font-semibold text-right">Ara toplam</td>
                    <td className="px-4 py-3 text-right text-sm font-mono font-bold tabular-nums">{tl(araToplam)}</td>
                  </tr>
                  <tr className="border-b border-border bg-off2/40">
                    <td colSpan={5} className="px-4 py-3 text-sm text-right text-txt-2">KDV (%20)</td>
                    <td className="px-4 py-3 text-right text-sm font-mono tabular-nums text-txt-2">{tl(kdv)}</td>
                  </tr>
                  <tr className="bg-navy-light/60">
                    <td colSpan={5} className="px-4 py-4 text-sm font-extrabold text-right">GENEL TOPLAM</td>
                    <td className="px-4 py-4 text-right text-base font-mono font-extrabold text-navy tabular-nums">{tl(araToplam + kdv)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-start gap-2.5 text-xs text-txt-2 bg-accent-light border border-accent-border rounded-lg px-3.5 py-2.5 max-w-[720px]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              <span>
                Bu tablo <strong>örnektir</strong>, fiyat listesi değildir. Gerçek fiyat zemin, mesafe,
                erişim ve iş programına göre belirlenir. Kendi işiniz için{" "}
                <Link to="/hafriyat/hesaplama" className="text-navy font-semibold no-underline hover:underline">hesaplama aracını</Link>{" "}
                kullanın ya da 30 dakikada net teklif alın.
              </span>
            </div>
          </div>
        </section>

        {/* Sözleşme maddeleri */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Sözleşmede Olması Gereken 8 Madde</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[640px]">
              Anlaşmazlıkların çoğu ölçüm esası ve döküm bedelinin yazılmamasından çıkar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sozlesmeMaddeleri.map((m, i) => (
                <div key={m.b} className="flex gap-3.5 border border-border rounded-2xl p-5 bg-background">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-navy-light text-navy font-mono font-bold text-xs flex items-center justify-center">{i + 1}</div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{m.b}</h3>
                    <p className="text-xs text-txt-2 leading-relaxed">{m.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7 soru */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Teklif Alırken Sorulacak 7 Soru</h2>
            <p className="text-sm text-txt-2 mb-6">Aynı soruları her firmaya sorun; ancak o zaman teklifler karşılaştırılabilir olur.</p>
            <ol className="space-y-2.5">
              {sorular.map((s, i) => (
                <li key={s} className="flex gap-3 items-start border border-border rounded-xl px-4 py-3.5 bg-background">
                  <span className="w-6 h-6 shrink-0 rounded-md bg-navy-light text-navy font-mono font-bold text-[11px] flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span className="text-sm text-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14 px-4 md:px-10">
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

        <HafriyatKaynaklar haric="/rehber/hafriyat-fiyat-teklifi-ornegi" koyu />

        <section id="teklif" className="py-14 md:py-20 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div className="pt-2">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Kendi İşiniz İçin Kalem Kalem Teklif</h2>
              <p className="text-sm text-txt-2 leading-[1.7] mb-6 max-w-[460px]">
                Yukarıdaki formatta, döküm bedeli ve evrak dahil kalem kalem teklifi 30 dakika içinde
                telefonla iletelim. Kayıt gerekmez.
              </p>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
              <div className="mt-6">
                <Link to="/hafriyat/fiyatlar" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy no-underline hover:underline">
                  Güncel birim fiyat aralıkları <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <HafriyatTeklifForm baslik="Kalem Kalem Teklif Alın" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TeklifOrnegi;
