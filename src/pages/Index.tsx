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
        <title>Hammadde Tedarik Platformu | Çimento, Kum, Çakıl Silobas Taşıma | Hammaddem</title>
        <meta name="description" content="Hammadde tedarik ve lojistik platformu. Çimento, kalsit, kum, çakıl, mıcır silobas taşıma ve hafriyat tedariği. 11 ilde aynı gün teslimat, 30 dakikada online teklif. Ücretsiz kayıt olun." />
        <meta name="keywords" content="hammadde, hammadde tedarik, hammadde platformu, silobas taşıma, çimento silobas, hafriyat, kum satış, çakıl satış, mıcır, kalsit, inşaat hammaddesi" />
        <link rel="canonical" href="https://hammaddem.co/" />
        <meta property="og:title" content="Hammadde Tedarik Platformu | Çimento, Kum, Çakıl Silobas Taşıma | Hammaddem" />
        <meta property="og:description" content="Hammadde tedarik ve lojistik platformu. Çimento, kalsit, kum, çakıl, mıcır silobas taşıma ve hafriyat tedariği. 11 ilde aynı gün teslimat, 30 dakikada online teklif." />
        <meta property="og:url" content="https://hammaddem.co/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hammaddem.co/og-image.png" />
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
          "description": "Türkiye'nin dijital B2B hammadde tedarik platformu. Çimento, kalsit, kum, çakıl ve diğer hammaddelerin silobas taşıma ve hafriyat tedariği.",
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
