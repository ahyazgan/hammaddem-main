import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HafriyatIcon from "@/components/HafriyatIcon";
import { CheckCircle, Clock, Shield, Truck, ArrowRight, Phone, Mountain } from "lucide-react";

const malzemeler = [
  "Kum", "Çakıl", "Mıcır", "Kırma Taş", "Stabilize",
  "Balast", "Toprak", "Dolgu Malzemesi", "Asfalt Agregası", "Filler",
];

const avantajlar = [
  { icon: Clock, title: "Hızlı Tedarik", desc: "Bölgenizdeki en yakın ocak ve tedarikçiden hızlı teslimat organizasyonu." },
  { icon: Mountain, title: "Geniş Ürün Yelpazesi", desc: "Kum, çakıl, mıcır, stabilize ve tüm hafriyat malzemelerinde tek durak çözüm." },
  { icon: Truck, title: "Toplu Sipariş Avantajı", desc: "Büyük projeleriniz için özel fiyatlandırma ve öncelikli teslimat." },
  { icon: Shield, title: "Kalite Garantisi", desc: "Tedarikçi ağımızdaki tüm malzemeler kalite standartlarına uygun." },
];

const nasılCalısır = [
  { step: "01", title: "Malzeme Seçin", desc: "İhtiyacınız olan hafriyat malzemesini ve miktarı belirleyin." },
  { step: "02", title: "Teklif Alın", desc: "Bölgenize uygun en iyi fiyat teklifini alın." },
  { step: "03", title: "Onaylayın", desc: "Teklifi onaylayın, teslimat planını belirleyin." },
  { step: "04", title: "Teslimat", desc: "Damperli araçlarla şantiyenize güvenli teslimat." },
];

const kullanımAlanları = [
  "Konut İnşaatları", "Yol Yapım Projeleri", "Alt Yapı Çalışmaları",
  "Beton Santralleri", "Peyzaj & Çevre Düzenlemesi", "Sanayi Tesisleri",
];

const HizmetHafriyat = () => {
  return (
    <>
      <Helmet>
        <title>Hafriyat & İnşaat Malzemeleri – Kum, Çakıl, Mıcır | Hammaddem</title>
        <meta name="description" content="Kum, çakıl, mıcır, stabilize ve tüm hafriyat malzemeleri tedariği. 11 ilde hızlı teslimat, toplu sipariş avantajı. Hammaddem ile projenize güç katın." />
        <link rel="canonical" href="https://hammaddem.co/hizmetler/hafriyat-nakliyesi" />
        <meta property="og:title" content="Hafriyat & İnşaat Malzemeleri – Hammaddem" />
        <meta property="og:description" content="Kum, çakıl, mıcır ve tüm hafriyat malzemeleri tedariği. Online teklif al, 11 ilde teslimat." />
        <meta property="og:url" content="https://hammaddem.co/hizmetler/hafriyat-nakliyesi" />
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        {/* Hero */}
        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-light text-navy border border-navy-border mb-4">
                  Hafriyat Hizmeti
                </span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Hafriyat & İnşaat Malzemeleri
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-8 max-w-[500px]">
                  Kum, çakıl, mıcır, stabilize ve her türlü hafriyat malzemesini
                  projenizin ihtiyacına göre tedarik ediyoruz. Türkiye genelinde 11 ilde
                  hızlı teslimat ve rekabetçi fiyatlarla yanınızdayız.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/kayit"
                    className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
                  >
                    Hemen Teklif Al <ArrowRight className="inline ml-1 w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+905393308617"
                    className="px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline hover:border-primary hover:text-primary transition-all"
                  >
                    <Phone className="inline mr-1.5 w-4 h-4" /> Bizi Arayın
                  </a>
                </div>
              </div>

              {/* Visual */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-navy-light border-2 border-navy-border flex items-center justify-center">
                  <HafriyatIcon className="w-32 h-32 text-navy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Malzemeler */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Tedarik Ettiğimiz Malzemeler</h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[520px]">
              İnşaat ve altyapı projeleriniz için ihtiyaç duyduğunuz tüm hafriyat malzemelerini tedarik ediyoruz.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {malzemeler.map((m) => (
                <span
                  key={m}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-background border border-border hover:border-navy-border hover:text-navy transition-colors"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Nasıl Çalışır */}
        <section className="py-16 md:py-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Nasıl Çalışır?</h2>
            <p className="text-sm text-txt-2 mb-10 max-w-[500px]">
              4 adımda hafriyat malzemesi tedarik sürecinizi başlatın.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {nasılCalısır.map((s) => (
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

        {/* Kullanım Alanları */}
        <section className="py-16 px-4 md:px-10 bg-off">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Kullanım Alanları</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {kullanımAlanları.map((a) => (
                <div key={a} className="flex items-center gap-3 border border-border rounded-xl p-4 bg-background">
                  <CheckCircle className="w-5 h-5 text-green shrink-0" />
                  <span className="text-sm font-medium">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="py-16 md:py-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-10">Neden Hammaddem?</h2>
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
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 px-4 md:px-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Hafriyat Malzemesi İçin Teklif Alın
            </h2>
            <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
              Hesap oluşturun, ihtiyacınızı belirtin, dakikalar içinde size özel fiyat teklifi alın.
            </p>
            <Link
              to="/kayit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
            >
              Ücretsiz Hesap Oluştur <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HizmetHafriyat;
