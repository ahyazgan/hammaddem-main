import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ArrowRight, Target, Eye, Users, Zap } from "lucide-react";

const degerler = [
  { icon: Target, title: "Misyon", desc: "Hammadde tedarik süreçlerini dijitalleştirerek sektörde şeffaflık ve verimlilik sağlamak." },
  { icon: Eye, title: "Vizyon", desc: "Türkiye'nin en güvenilir hammadde lojistik platformu olmak ve sektörün dijital dönüşümüne öncülük etmek." },
  { icon: Users, title: "Güvenilirlik", desc: "Yüzlerce tedarikçi ve taşıyıcı ile güçlü bir ağ kurarak müşterilerimize kesintisiz hizmet sunuyoruz." },
  { icon: Zap, title: "Hız", desc: "Dijital altyapımız sayesinde teklif alma sürecini dakikalara indiriyoruz." },
];

const Hakkimizda = () => (
  <>
    <Helmet>
      <title>Hakkımızda – Hammaddem | Hammadde Tedarik Platformu</title>
      <meta name="description" content="Hammaddem, Türkiye genelinde hammadde tedarik ve lojistik süreçlerini dijitalleştiren yenilikçi bir platformdur. Vizyonumuz ve değerlerimiz hakkında bilgi alın." />
      <link rel="canonical" href="https://hammaddem.co/hakkimizda" />
    </Helmet>

    <div className="min-h-screen bg-dot-pattern">
      <Navbar />

      <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
            Hakkımızda
          </span>
          <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
            Hammaddem Nedir?
          </h1>
          <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-6 max-w-[640px]">
            Hammaddem, Türkiye genelinde silobas taşımacılığı ve hafriyat nakliyesi başta olmak üzere
            hammadde tedarik süreçlerini tek bir dijital platformda birleştiren yenilikçi bir lojistik çözümüdür.
            Amacımız; üreticiler, tedarikçiler ve taşıyıcılar arasındaki bağlantıyı hızlandırmak,
            maliyetleri düşürmek ve süreçleri şeffaf hale getirmektir.
          </p>
          <p className="text-base text-txt-2 leading-[1.7] mb-12 max-w-[640px]">
            İstanbul merkezli ekibimiz, sektördeki yıllara dayanan deneyimini teknoloji ile birleştirerek
            hem alıcılara hem de taşıyıcılara değer yaratan bir ekosistem inşa etmektedir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {degerler.map((d) => (
              <div key={d.title} className="flex gap-4 items-start border border-border rounded-2xl p-6 bg-background hover:border-accent-border transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                  <d.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{d.title}</h3>
                  <p className="text-sm text-txt-2 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 md:px-10 bg-off">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Platformumuza Katılın</h2>
          <p className="text-sm text-txt-2 mb-8 max-w-[460px] mx-auto">
            Hammadde tedarik süreçlerinizi dijitalleştirin, zamandan ve maliyetten tasarruf edin.
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

export default Hakkimizda;
