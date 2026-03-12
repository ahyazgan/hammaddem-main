import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Hizmetler from "@/components/landing/Hizmetler";
import Neden from "@/components/landing/Neden";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Çimento, Kum, Çakıl Silobas Taşıma & Hafriyat | Hammaddem</title>
        <meta name="description" content="Çimento, kalsit, kum, çakıl, mıcır silobas taşıma ve hafriyat tedariği. 11 ilde aynı gün teslimat, 30 dakikada online teklif. Ücretsiz kayıt olun." />
        <meta name="keywords" content="silobas taşıma, çimento silobas, hafriyat, kum satış, çakıl satış, mıcır, kalsit, hammadde tedarik, inşaat malzemeleri, nakliye, lojistik" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Turkish" />
        <meta name="author" content="Hammaddem" />
        <link rel="canonical" href="https://hammaddem.co/" />
        <meta property="og:title" content="Çimento, Kum, Çakıl Silobas Taşıma & Hafriyat | Hammaddem" />
        <meta property="og:description" content="Çimento, kalsit, kum, çakıl, mıcır silobas taşıma ve hafriyat tedariği. 11 ilde aynı gün teslimat, 30 dakikada online teklif." />
        <meta property="og:url" content="https://hammaddem.co/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
        <meta property="og:site_name" content="Hammaddem" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Çimento, Kum, Çakıl Silobas Taşıma & Hafriyat | Hammaddem" />
        <meta name="twitter:description" content="Çimento, kalsit, kum, çakıl, mıcır silobas taşıma ve hafriyat tedariği. 11 ilde aynı gün teslimat." />
        <meta name="twitter:image" content="https://hammaddem.co/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Hammaddem",
          "url": "https://hammaddem.co",
          "logo": "https://hammaddem.co/favicon.png",
          "telephone": "+905393308617",
          "email": "info@hammaddem.co",
          "areaServed": "TR",
          "sameAs": [],
          "description": "Çimento, kalsit, kum, çakıl ve diğer hammaddelerin silobas taşıma ve hafriyat tedariği platformu.",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Hammaddem",
          "url": "https://hammaddem.co",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://hammaddem.co/kayit",
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
        <Footer />
      </div>
    </>
  );
};

export default Index;
