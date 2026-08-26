import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Hizmetler from "@/components/landing/Hizmetler";
import Neden from "@/components/landing/Neden";
import MusteriYorumlari from "@/components/landing/MusteriYorumlari";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Hammaddem | Hafriyat İşleri ve Hammadde Nakliyesi</title>
        <meta name="description" content="Hafriyat işleri ve hammadde nakliyesinde tek adres: temel kazısı, hafriyat taşıma, moloz; silobas ile çimento, kum, çakıl. 11 il, 30 dakikada teklif." />
        <meta name="keywords" content="hammaddem, hafriyat işleri, hafriyat nakliye, hammadde tedarik, silobas nakliye, temel kazısı, moloz taşıma, kum çakıl fiyatları" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Turkish" />
        <meta name="author" content="Hammaddem" />
        <link rel="canonical" href="https://hammaddem.co/" />
        <meta property="og:title" content="Hammaddem | Hafriyat İşleri ve Hammadde Nakliyesi" />
        <meta property="og:description" content="Hafriyat işleri ve hammadde nakliyesinde tek adres: temel kazısı, hafriyat taşıma, moloz; silobas ile çimento, kum, çakıl. 11 il, 30 dakikada teklif." />
        <meta property="og:url" content="https://hammaddem.co/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta property="og:site_name" content="Hammaddem" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hammaddem | Hafriyat ve Hammadde Nakliyesi" />
        <meta name="twitter:description" content="Temel kazısı, hafriyat taşıma, moloz ve silobas yükleri. 11 ilde hizmet, 30 dakikada fiyat teklifi." />
        <meta name="twitter:image" content="https://hammaddem.co/og-image.png" />
        {/* Not: index.html'deki Organization şeması SEO:START/END bloğunun içinde
            kaldığı için prerender sırasında eziliyor. Google'ın gördüğü şema
            burasıdır — işletme kimliği burada güncel tutulmalı. legalName ve adres
            vergi levhasıyla birebir aynı olmalı (Google İşletme Profili itirazında
            site ile profil karşılaştırılır). */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Hammaddem",
          "legalName": "Yazgan Nakliye İnşaat ve Orman Ürünleri Sanayi ve Ticaret Limited Şirketi",
          "brand": { "@type": "Brand", "name": "Hammaddem" },
          "url": "https://hammaddem.co",
          "logo": "https://hammaddem.co/favicon.png",
          "telephone": "+905393308617",
          "email": "hammaddem@outlook.com",
          "foundingDate": "1997-01-01",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Beykoz",
            "addressRegion": "İstanbul",
            "addressCountry": "TR",
          },
          "areaServed": ["İstanbul", "Kocaeli", "Bursa", "Tekirdağ", "Sakarya", "Yalova", "Balıkesir", "Çanakkale", "Edirne", "Ankara", "İzmir"],
          "sameAs": [],
          "description": "1997'den beri hafriyat ve nakliye hizmeti veren işletme. Temel kazısı, hafriyat toprağı taşıma, moloz kaldırma, dolgu ve arazi tesviyesi; silobas ile dökme çimento, kalsit, kireç ve damperli araçlarla kum, çakıl, mıcır teslimatı.",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Hammaddem",
          "url": "https://hammaddem.co",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://hammaddem.co/teklif-al",
            "query-input": "required name=search_term_string"
          }
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-dot-pattern">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Hizmetler />
        <Neden />
        <MusteriYorumlari />
        <Footer />
      </div>
    </>
  );
};

export default Index;
