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
      <meta name="description" content="Hammaddem, Yazgan Nakliye güvencesiyle silobas taşımacılığı ve hafriyat nakliyesini tek dijital platformda sunar. İstanbul merkezli ekibimizi tanıyın." />
      <link rel="canonical" href="https://hammaddem.co/hakkimizda" />
      <meta property="og:title" content="Hakkımızda – Hammaddem | Yazgan Nakliye Kuruluşu" />
      <meta property="og:description" content="Hammaddem, Yazgan Nakliye güvencesiyle silobas taşımacılığı ve hafriyat nakliyesini tek dijital platformda sunar." />
      <meta property="og:url" content="https://hammaddem.co/hakkimizda" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://hammaddem.co/og/hakkimizda-filo.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Helmet>

    <div className="min-h-screen bg-dot-pattern">
      <Navbar />

      <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
                Hakkımızda
              </span>
              <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                Hammaddem Nedir?
              </h1>
              <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-6">
                Hammaddem, Türkiye genelinde silobas taşımacılığı ve hafriyat nakliyesi başta olmak üzere
                hammadde tedarik süreçlerini tek bir dijital platformda birleştiren yenilikçi bir lojistik çözümüdür.
                Amacımız; üreticiler, tedarikçiler ve taşıyıcılar arasındaki bağlantıyı hızlandırmak,
                maliyetleri düşürmek ve süreçleri şeffaf hale getirmektir.
              </p>
              <p className="text-base text-txt-2 leading-[1.7] mb-6">
                İstanbul merkezli ekibimiz, sektördeki yıllara dayanan deneyimini teknoloji ile birleştirerek
                hem alıcılara hem de taşıyıcılara değer yaratan bir ekosistem inşa etmektedir.
              </p>
              <p className="text-base text-txt-2 leading-[1.7]">
                Hammaddem bir <strong>Yazgan Nakliyat</strong> kuruluşudur: masa başı bir aracı değil,
                nakliye sektörünün içinden gelen bir işletmeyiz. Taşımalar kendi araç kapasitemiz ve
                anlaşmalı taşıyıcı ağımızla yürütülür; işi hem ekrandan hem sahadan biliriz.
              </p>
            </div>
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/hakkimizda-filo.webp"
                alt="Çimento silolarının altında yükleme yapan iki Avrupa tipi silobas ve hortumu bağlayan saha çalışanı"
                width={1000}
                height={1250}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Sektörde Güven</p>
                    <p className="text-xs text-txt-2">Yazgan Nakliyat Güvencesiyle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
            to="/teklif-al"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
          >
            Üyeliksiz Teklif Al <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  </>
);

export default Hakkimizda;
