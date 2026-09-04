import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatTeklifForm from "@/components/hafriyat/HafriyatTeklifForm";
import HafriyatKaynaklar from "@/components/hafriyat/HafriyatKaynaklar";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/utils/seoSchemas";
import {
  M3_FIYATLARI,
  SEFER_FIYATLARI,
  MALZEME_YOGUNLUKLARI,
  HESAPLAMA_FAQ,
} from "@/data/hafriyatFiyatData";
import { ArrowRight, Phone, Info, Calculator, Ruler, Truck, Coins } from "lucide-react";

import HeroGorsel from "@/components/HeroGorsel";
const canonical = "https://hammaddem.co/hafriyat/hesaplama";
const title = "Hafriyat Hesaplama | m³, Kamyon Sayısı ve Maliyet Aracı";
const description =
  "Hafriyat hesaplama aracı: alan × derinlik ile kazı hacmi (m³), kabarma katsayısı, kaç kamyon gerekir ve 2026 tahmini maliyet. 30 dakikada net teklif.";

const tl = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const say = (n: number) => (Math.round(n * 10) / 10).toString().replace(".", ",");

const HafriyatHesaplama = () => {
  const [en, setEn] = useState(10);
  const [boy, setBoy] = useState(20);
  const [derinlik, setDerinlik] = useState(3);
  const [zeminIdx, setZeminIdx] = useState(1);
  const [kamyonIdx, setKamyonIdx] = useState(0);
  const [dokumBedeli, setDokumBedeli] = useState(1500);

  const zemin = M3_FIYATLARI[zeminIdx];
  const kamyon = SEFER_FIYATLARI[kamyonIdx];

  const alan = Math.max(0, en) * Math.max(0, boy);
  const yerinde = alan * Math.max(0, derinlik);
  const kabarmis = yerinde * zemin.kabarma;
  const sefer = kabarmis > 0 ? Math.ceil(kabarmis / kamyon.m3) : 0;

  const kaziMin = yerinde * zemin.min;
  const kaziMax = yerinde * zemin.max;
  const dokumToplam = sefer * Math.max(0, dokumBedeli);
  const toplamMin = kaziMin + dokumToplam;
  const toplamMax = kaziMax + dokumToplam;
  const sadeceTasimaMin = sefer * kamyon.min + dokumToplam;
  const sadeceTasimaMax = sefer * kamyon.max + dokumToplam;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hafriyat İşleri", url: "/hafriyat" },
    { name: "Hafriyat Hesaplama", url: "/hafriyat/hesaplama" },
  ]);
  const faqJsonLd = buildFaqJsonLd(HESAPLAMA_FAQ);

  const inputCls =
    "w-full py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-sm text-foreground font-mono tabular-nums outline-none transition-all focus:border-navy focus:bg-background focus:shadow-[0_0_0_3px_rgba(15,35,71,.08)]";
  const labelCls = "text-[11px] font-semibold text-txt-2 tracking-wider uppercase mb-1.5 block";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="hafriyat hesaplama, hafriyat maliyeti hesaplama, hafriyat hesabı nasıl yapılır, hafriyat metreküp hesaplama, hafriyat m3 hesaplama, temel kazı hesabı nasıl yapılır, kazı dolgu hesabı, hafriyat kabarma katsayısı, hafriyat fiyat hesaplama"
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og/hafriyat-hesaplama.jpg" />
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
                <li className="text-txt-2 font-medium">Hesaplama</li>
              </ol>
            </nav>
            <div className="max-w-[720px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                <Calculator className="w-3 h-3" /> Ücretsiz Araç
              </span>
              <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-5">
                Hafriyat Hesaplama —<br />
                <span className="text-navy">m³</span>, Kamyon Sayısı ve Tahmini Maliyet
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7]">
                Kazı alanınızın ölçülerini girin: yerinde hacmi, kabarma sonrası kamyona yüklenecek
                hacmi, kaç sefer gerekeceğini ve 2026 piyasa aralıklarına göre tahmini bütçeyi
                anında görün.
              </p>
            </div>
            <HeroGorsel src="/images/hafriyat-hesaplama.webp" alt="Ekskavatör kepçesiyle dolan damperli kamyon kasası, hacim ve sefer hesabı için" width={1600} height={686} className="mt-10" />
          </div>
        </section>

        {/* Hesaplayıcı */}
        <section className="pb-14 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
            {/* Girdi */}
            <div className="border border-border rounded-2xl bg-background overflow-hidden">
              <div className="h-1 w-full bg-navy" />
              <div className="p-5 md:p-7">
                <h2 className="text-base md:text-lg font-bold tracking-tight mb-1 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-navy" /> Kazı Bilgileri
                </h2>
                <p className="text-[12px] text-txt-2 mb-5">Ölçüleri metre cinsinden girin.</p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className={labelCls} htmlFor="hesap-en">En (m)</label>
                    <input id="hesap-en" type="number" min={0} value={en} onChange={(e) => setEn(Math.max(0, Number(e.target.value) || 0))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="hesap-boy">Boy (m)</label>
                    <input id="hesap-boy" type="number" min={0} value={boy} onChange={(e) => setBoy(Math.max(0, Number(e.target.value) || 0))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="hesap-derinlik">Derinlik (m)</label>
                    <input id="hesap-derinlik" type="number" min={0} step="0.5" value={derinlik} onChange={(e) => setDerinlik(Math.max(0, Number(e.target.value) || 0))} className={inputCls} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelCls} htmlFor="hesap-zemin">Zemin Türü</label>
                  <select id="hesap-zemin" value={zeminIdx} onChange={(e) => setZeminIdx(Number(e.target.value))} className={`${inputCls} font-sans cursor-pointer`}>
                    {M3_FIYATLARI.map((z, i) => (
                      <option key={z.zemin} value={i}>
                        {z.zemin} (kabarma ×{z.kabarma.toString().replace(".", ",")})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className={labelCls} htmlFor="hesap-kamyon">Kamyon Tipi</label>
                  <select id="hesap-kamyon" value={kamyonIdx} onChange={(e) => setKamyonIdx(Number(e.target.value))} className={`${inputCls} font-sans cursor-pointer`}>
                    {SEFER_FIYATLARI.map((s, i) => (
                      <option key={s.arac} value={i}>
                        {s.arac} — {s.kapasite}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelCls} htmlFor="hesap-dokum">Sefer Başına Döküm Bedeli (TL)</label>
                  <input id="hesap-dokum" type="number" min={0} step="100" value={dokumBedeli} onChange={(e) => setDokumBedeli(Math.max(0, Number(e.target.value) || 0))} className={inputCls} />
                  <p className="text-[11px] text-txt-3 mt-1.5">
                    Bilmiyorsanız varsayılanı bırakın.{" "}
                    <Link to="/rehber/hafriyat-dokum-ucretleri" className="text-navy font-semibold no-underline hover:underline">
                      İl il döküm ücretleri →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Sonuç */}
            <div className="border border-navy-border rounded-2xl bg-navy-light/40 overflow-hidden">
              <div className="p-5 md:p-7">
                <h2 className="text-base md:text-lg font-bold tracking-tight mb-5 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-navy" /> Sonuç
                </h2>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-background border border-border rounded-xl p-3.5">
                    <div className="text-[10px] font-semibold text-txt-3 uppercase tracking-wider mb-1">Yerinde Kazı</div>
                    <div className="text-lg font-mono font-bold text-foreground tabular-nums leading-tight">{say(yerinde)}</div>
                    <div className="text-[11px] text-txt-3">m³</div>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-3.5">
                    <div className="text-[10px] font-semibold text-txt-3 uppercase tracking-wider mb-1">Kabarmış</div>
                    <div className="text-lg font-mono font-bold text-foreground tabular-nums leading-tight">{say(kabarmis)}</div>
                    <div className="text-[11px] text-txt-3">m³ (kamyonda)</div>
                  </div>
                  <div className="bg-background border border-navy-border rounded-xl p-3.5">
                    <div className="text-[10px] font-semibold text-txt-3 uppercase tracking-wider mb-1">Sefer</div>
                    <div className="text-lg font-mono font-bold text-navy tabular-nums leading-tight">{sefer}</div>
                    <div className="text-[11px] text-txt-3">kamyon</div>
                  </div>
                </div>

                <div className="bg-background border border-border rounded-xl divide-y divide-border mb-4">
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="text-[13px] text-txt-2">Kazı + yükleme + nakliye</span>
                    <span className="text-sm font-mono font-semibold tabular-nums whitespace-nowrap">{tl(kaziMin)} – {tl(kaziMax)} TL</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="text-[13px] text-txt-2">Döküm bedeli ({sefer} sefer)</span>
                    <span className="text-sm font-mono font-semibold tabular-nums whitespace-nowrap">{tl(dokumToplam)} TL</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-navy-light/60">
                    <span className="text-[13px] font-bold text-foreground">Tahmini toplam</span>
                    <span className="text-base font-mono font-extrabold text-navy tabular-nums whitespace-nowrap">{tl(toplamMin)} – {tl(toplamMax)} TL</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-txt-2 bg-background border border-border rounded-lg px-3 py-2.5 mb-4">
                  <Truck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-navy" />
                  {sefer > 0 && sefer <= 10 ? (
                    <span>
                      Kazı hazırsa (moloz yüklü / dolgu taşıma) spot sefer fiyatıyla yalnızca nakliye + döküm:{" "}
                      <strong className="font-mono tabular-nums">{tl(sadeceTasimaMin)} – {tl(sadeceTasimaMax)} TL</strong>
                    </span>
                  ) : (
                    <span>
                      Bu hacimde iş <strong>m³ birim fiyatıyla</strong> fiyatlanır; sefer başına spot fiyat
                      (2.500–5.500 TL) yalnızca birkaç kamyonluk küçük işler için geçerlidir. Hacim büyüdükçe
                      birim fiyat düşer.
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-2 text-[11px] text-txt-3 mb-5">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    Sonuç, 2026 piyasa aralıklarıyla hesaplanan ön bütçedir; KDV hariçtir. Kesin fiyat
                    zemin etüdü, döküm mesafesi ve iş programına göre belirlenir.
                  </span>
                </div>

                <a href="#teklif" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-[10px] bg-navy text-primary-foreground text-sm font-bold no-underline shadow-[0_4px_16px_rgba(15,35,71,.25)] hover:bg-navy-hover transition-all">
                  Bu İş İçin Net Fiyat Al <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Nasıl hesaplanır */}
        <section className="py-14 px-4 md:px-10 bg-off">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Hafriyat Hesabı Nasıl Yapılır?
            </h2>
            <ol className="space-y-4">
              {[
                { b: "Yerinde hacmi bulun", a: "Kazı alanı (en × boy) ile derinliği çarpın. Temel kazısında plan ölçülerine her kenardan 0,5–1 m çalışma payı ekleyin; şevli kazıda üst genişlik artar." },
                { b: "Kabarma katsayısını uygulayın", a: "Kazılan zemin gevşer ve hacmi büyür: toprakta %20–25, kilde %30–40, kayada %40–60. Kamyona yüklenecek hacim = yerinde hacim × katsayı." },
                { b: "Sefer sayısını hesaplayın", a: "Kabarmış hacmi kamyon kasa kapasitesine bölün ve yukarı yuvarlayın. Ağır kil ve kayada kamyon tonajdan dolabilir; kasa dolmadan sefer yapılır." },
                { b: "Maliyeti toplayın", a: "Toplam = (yerinde m³ × m³ birim fiyatı) + (sefer sayısı × döküm bedeli). Yalnızca taşıma yaptıracaksanız m³ fiyatı yerine sefer ücretini kullanın." },
              ].map((s, i) => (
                <li key={s.b} className="flex gap-4 border border-border rounded-2xl p-5 bg-background">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-navy-light text-navy font-mono font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{s.b}</h3>
                    <p className="text-sm text-txt-2 leading-relaxed">{s.a}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="text-lg font-extrabold tracking-tight mt-10 mb-4">Kabarma ve Yoğunluk Tablosu</h3>
            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="bg-off2 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3">Malzeme</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3">Yoğunluk</th>
                    <th className="text-right text-[11px] font-bold text-txt-3 uppercase tracking-wider px-5 py-3">Kabarma</th>
                  </tr>
                </thead>
                <tbody>
                  {MALZEME_YOGUNLUKLARI.map((m) => (
                    <tr key={m.malzeme} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-3 text-sm font-medium text-foreground">{m.malzeme}</td>
                      <td className="px-5 py-3 text-right text-sm font-mono text-txt-2 tabular-nums whitespace-nowrap">{m.yogunluk}</td>
                      <td className="px-5 py-3 text-right text-sm font-mono text-txt-2 tabular-nums whitespace-nowrap">{m.kabarma}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-14 px-4 md:px-10">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Hafriyat Hesaplama — Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {HESAPLAMA_FAQ.map((f) => (
                <div key={f.q} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HafriyatKaynaklar haric="/hafriyat/hesaplama" koyu />

        {/* Form */}
        <section id="teklif" className="py-14 md:py-20 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div className="pt-2">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                Hesabı Net Fiyata Çevirelim
              </h2>
              <p className="text-sm text-txt-2 leading-[1.7] mb-4 max-w-[460px]">
                Hesapladığınız <strong className="font-mono">{say(yerinde)} m³</strong> için işinize özel,
                döküm dahil net fiyatı 30 dakika içinde telefonla iletelim. Kayıt gerekmez.
              </p>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-navy hover:text-navy transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
            <HafriyatTeklifForm
              baslik="Hesabınıza Göre Teklif Alın"
              defaultMiktar={Math.max(1, Math.round(yerinde))}
              defaultBirim="m³"
            />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HafriyatHesaplama;
