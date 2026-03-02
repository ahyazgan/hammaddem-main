import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Sayfa Bulunamadı – Hammaddem</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-dot-pattern">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center px-4 pt-[100px] pb-16">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
            <p className="mb-2 text-xl font-semibold text-foreground">Sayfa Bulunamadı</p>
            <p className="mb-8 text-txt-2">Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
