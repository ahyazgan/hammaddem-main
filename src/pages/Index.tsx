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
        <title>Hafriyat İşleri & Hammadde Tedarik Platformu | Hammaddem</title>
        <meta name="description" content="Hafriyat işleri ve hammadde tedariğinde tek adres: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma, çimento-kum-çakıl silobas taşıma. 11 ilde hizmet, 30 dakikada online fiyat teklifi." />
        <meta name="keywords" content="hafriyat, hafriyat işleri, hafriyat firması, temel kazısı, moloz taşıma, hammadde tedarik, silobas taşıma, çimento silobas, kum satış, çakıl satış, mıcır, kalsit" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Turkish" />
        <meta name="author" content="Hammaddem" />
        <link rel="canonical" href="https://hammaddem.co/" />
        <meta property="og:title" content="Hafriyat İşleri & Hammadde Tedarik Platformu | Hammaddem" />
        <meta property="og:description" content="Hafriyat işleri ve hammadde tedariğinde tek adres: temel kazısı, hafriyat taşıma, moloz, silobas yükleri. 11 ilde hizmet, 30 dakikada online fiyat teklifi." />
        <meta property="og:url" content="https://hammaddem.co/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta property="og:site_name" content="Hammaddem" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hafriyat İşleri & Hammadde Tedarik | Hammaddem" />
        <meta name="twitter:description" content="Temel kazısı, hafriyat taşıma, moloz ve silobas yükleri. 11 ilde hizmet, 30 dakikada fiyat teklifi." />
        <meta name="twitter:image" content="https://hammaddem.co/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Hammaddem",
          "url": "https://hammaddem.co",
          "logo": "https://hammaddem.co/favicon.png",
          "telephone": "+905393308617",
          "email": "hammaddem@outlook.com",
          "areaServed": "TR",
          "sameAs": [],
          "description": "Türkiye'nin dijital B2B hammadde tedarik platformu. Çimento, kalsit, kum, çakıl ve diğer hammaddelerin silobas taşıma ve hafriyat tedariği.",
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
