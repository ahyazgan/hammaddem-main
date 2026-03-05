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
        <meta name="description" content="Çimento, kalsit, kum, çakıl, mıcır silobas taşıma ve hafriyat tedariği. 11 ilde aynı gün teslimat, 15 dakikada online teklif. Ücretsiz kayıt olun." />
        <link rel="canonical" href="https://hammaddem.co/" />
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
