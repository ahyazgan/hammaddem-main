import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, MapPin, Building2 } from "lucide-react";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildProductOfferJsonLd } from "@/utils/seoSchemas";
import { getKomboIcerik } from "@/data/kombinasyonData";
import FiyatBanner from "@/components/landing/FiyatBanner";
import { getFiyatBySlug } from "@/data/fiyatData";

const MALZEME_ETIKET: Record<string, string> = {
  cimento: "Çimento",
  kum: "Kum",
  cakil: "Çakıl",
  micir: "Mıcır",
  kalsit: "Kalsit",
  kirec: "Kireç",
  alci: "Alçı",
  "mermer-tozu": "Mermer Tozu",
  "ucucu-kul": "Uçucu Kül",
  stabilize: "Stabilize",
};

const TUM_SEHIRLER = ["istanbul", "ankara", "izmir", "bursa", "kocaeli"];
const TUM_MALZEMELER = ["cimento", "kum", "cakil", "micir", "kalsit", "kirec", "alci", "mermer-tozu", "ucucu-kul", "stabilize"];

const SEHIR_ETIKET: Record<string, string> = {
  istanbul: "İstanbul",
  ankara: "Ankara",
  izmir: "İzmir",
  bursa: "Bursa",
  kocaeli: "Kocaeli",
};

// Şehir adının doğru çekim ekleri — şablonla "'da/'a" basmak
// İzmir'de ve Kocaeli'nde için yanlış sonuç veriyordu.
const SEHIR_EK: Record<string, { bulunma: string; yonelme: string }> = {
  istanbul: { bulunma: "İstanbul'da", yonelme: "İstanbul'a" },
  ankara: { bulunma: "Ankara'da", yonelme: "Ankara'ya" },
  izmir: { bulunma: "İzmir'de", yonelme: "İzmir'e" },
  bursa: { bulunma: "Bursa'da", yonelme: "Bursa'ya" },
  kocaeli: { bulunma: "Kocaeli'nde", yonelme: "Kocaeli'ne" },
};

interface Props {
  malzemeSlug: string;
  sehirSlug: string;
  title: string;
  description: string;
  canonical: string;
  keywords: string;
}

// Agrega (kum, çakıl, mıcır, stabilize) damperli araçla taşınır; toz/dökme malzeme silobasla.
const SILOBAS_MALZEMELER = new Set(["cimento", "kalsit", "kirec", "alci", "mermer-tozu", "ucucu-kul"]);

const KombinasyonSayfasi = ({ malzemeSlug, sehirSlug, title, description, canonical, keywords }: Props) => {
  const kombo = getKomboIcerik(malzemeSlug, sehirSlug);
  const malzemeAdi = MALZEME_ETIKET[malzemeSlug] ?? malzemeSlug;
  const sehirAdi = SEHIR_ETIKET[sehirSlug] ?? sehirSlug;
  const sehirDe = SEHIR_EK[sehirSlug]?.bulunma ?? `${sehirAdi}'da`;
  const sehirE = SEHIR_EK[sehirSlug]?.yonelme ?? `${sehirAdi}'a`;
  const fiyat = getFiyatBySlug(malzemeSlug);
  const silobasMi = SILOBAS_MALZEMELER.has(malzemeSlug);
  const aracTipi = silobasMi ? "Silobas" : "Damperli Araç";
  const aracIle = silobasMi ? "silobas ile" : "damperli araçla";

  const faqSorular = kombo?.faq ?? [
    {
      q: `${sehirDe} ${malzemeAdi} teslimatı nasıl çalışır?`,
      a: `Talep oluşturun; ${sehirAdi} bölgesindeki filomuz ${malzemeAdi.toLocaleLowerCase("tr-TR")} yükünü ${aracIle} taşır ve 30 dakika içinde size özel net fiyat teklifi sunar.`,
    },
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "/" },
    { name: `${malzemeAdi} Taşıma`, url: `/malzeme/${malzemeSlug}` },
    { name: `${sehirAdi} ${malzemeAdi} Taşıma`, url: canonical.replace("https://hammaddem.co", "") },
  ]);

  const faqJsonLd = buildFaqJsonLd(faqSorular);

  // Not: fiziksel şube olmayan şehirlerde adressiz LocalBusiness basmak
  // spam sinyali riski taşır — şehir sayfalarında Service şeması kullanılır.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${sehirAdi} ${malzemeAdi} Tedariği – ${aracTipi} ile Teslimat`,
    description,
    provider: { "@type": "Organization", name: "Hammaddem", url: "https://hammaddem.co", telephone: "+905393308617" },
    areaServed: { "@type": "City", name: sehirAdi, containedInPlace: { "@type": "Country", name: "Türkiye" } },
    url: canonical,
  };

  const productJsonLd = fiyat
    ? buildProductOfferJsonLd(fiyat, {
        name: `${sehirAdi} ${malzemeAdi}`,
        description,
        url: canonical,
      })
    : null;

  const digerSehirler = TUM_SEHIRLER.filter((s) => s !== sehirSlug);
  const digerMalzemeler = TUM_MALZEMELER.filter((m) => m !== malzemeSlug).slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        {productJsonLd && <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>}
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero */}
        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border">
                    {sehirAdi}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-muted border border-border text-txt-2">
                    {malzemeAdi}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-muted border border-border text-txt-2">
                    {aracTipi}
                  </span>
                </div>
                <h1 className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  {sehirDe} {malzemeAdi} Fiyatları 2026
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  {description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/teklif-al" className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
                    Hemen Teklif Al <ArrowRight className="inline ml-1 w-4 h-4" />
                  </Link>
                  <a href="tel:+905393308617" className="px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all">
                    <Phone className="inline mr-1.5 w-4 h-4" /> 0539 330 86 17
                  </a>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-accent-light border-2 border-accent-border flex items-center justify-center">
                  <MapPin className="w-32 h-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fiyat Banner — gerçek fiyat aralığı şehir sayfalarında da görünür */}
        {fiyat && <FiyatBanner fiyat={fiyat} />}

        {/* Benzersiz tanıtım */}
        {kombo && (
          <section className="py-16 px-4 md:px-10 bg-off">
            <div className="max-w-[1100px] mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
                {sehirDe} {malzemeAdi} Tedariği Hakkında
              </h2>
              <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
                <p>{kombo.aciklama}</p>
              </div>
            </div>
          </section>
        )}

        {/* Nasıl Çalışır - benzersiz */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              {sehirDe} {malzemeAdi} Silobas Taşıma Nasıl Çalışır?
            </h2>
            <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
              <p>{kombo?.hizmetDetay ?? `${sehirDe} ${malzemeAdi} silobas taşıma için Hammaddem platformunu kullanın. Online talep formunu doldurarak 30 dakika içinde size özel fiyat teklifi alabilirsiniz.`}</p>
            </div>
          </div>
        </section>

        {/* Şehre özel yerel bilgi */}
        {kombo && (
          <section className="py-16 px-4 md:px-10 bg-off">
            <div className="max-w-[1100px] mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
                <Building2 className="inline mr-2 w-7 h-7 text-primary" />
                {sehirAdi} Hizmet Bölgeleri ve Sanayi Alanları
              </h2>
              <div className="prose prose-sm max-w-none text-txt-2 leading-[1.8] space-y-4">
                <p>{kombo.yerelBilgi}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {kombo.sehir.osblar.map((osb) => (
                  <span key={osb} className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent-light border border-accent-border text-primary">
                    {osb}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Neden Hammaddem */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">
              {sehirDe} {malzemeAdi} İçin Neden Hammaddem?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Clock, title: "30 Dk'da Teklif", desc: "Online talepten 30 dakika içinde fiyat teklifi." },
                { icon: Shield, title: "Güvenli Teslimat", desc: "Pnömatik silobas, kapalı sistem taşıma." },
                { icon: Truck, title: `${sehirAdi} Hizmet`, desc: `${kombo?.sehir.lojistik ?? `${sehirAdi} genelinde aktif araç filomuzla hızlı teslimat.`}` },
                { icon: CheckCircle, title: "Dijital Takip", desc: "Siparişi panelden anlık takip edin." },
              ].map((a) => (
                <div key={a.title} className="flex flex-col gap-3 border border-border rounded-2xl p-6 bg-background hover:border-accent-border transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                    <a.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{a.title}</h3>
                    <p className="text-xs text-txt-2 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 px-4 md:px-10 bg-off">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              {sehirAdi} {malzemeAdi} İçin Teklif Alın
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Üyelik gerekmeden talep formunu doldurun, 30 dakika içinde {sehirE} özel fiyat teklifi alın.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/teklif-al" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all">
                Ücretsiz Teklif Al <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+905393308617" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all">
                <Phone className="w-4 h-4" /> 0539 330 86 17
              </a>
            </div>
          </div>
        </section>

        {/* FAQ - benzersiz, şehir+malzeme özel */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              {sehirAdi} {malzemeAdi} Taşıma Hakkında Sık Sorulan Sorular
            </h2>
            <div className="space-y-4 mt-6">
              {faqSorular.map((f, i) => (
                <div key={i} className="border border-border rounded-2xl p-6 bg-background">
                  <h3 className="font-bold text-sm md:text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* İç linkler */}
        <section className="py-10 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mb-3">{malzemeAdi} — Diğer Şehirler</h3>
                <div className="flex flex-wrap gap-2">
                  {digerSehirler.map((s) => (
                    <a key={s} href={`/malzeme/${malzemeSlug}/${s}`} className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">
                      {SEHIR_ETIKET[s]}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-txt-2 uppercase tracking-wider mb-3">{sehirAdi} — Diğer Malzemeler</h3>
                <div className="flex flex-wrap gap-2">
                  {digerMalzemeler.map((m) => (
                    <a key={m} href={`/malzeme/${m}/${sehirSlug}`} className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-accent-border hover:text-primary transition-colors no-underline">
                      {MALZEME_ETIKET[m]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default KombinasyonSayfasi;
