import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import WhatsAppButton from "./components/WhatsAppButton";
import CallBar from "./components/CallBar";
import CookieConsent from "./components/CookieConsent";
import { kombinasyonRoutes } from "./pages/kombinasyon/kombinasyonRoutes";
import { hafriyatRoutes } from "./pages/hafriyat/hafriyatRoutes";

// Eager: ana sayfa hemen yüklenmeli
import Index from "./pages/Index";

// Lazy: diğer sayfalar ihtiyaç halinde yüklensin
const HafriyatHub = lazy(() => import("./pages/hafriyat/HafriyatHub"));
const HafriyatFiyatlar = lazy(() => import("./pages/hafriyat/HafriyatFiyatlar"));
const HafriyatHesaplama = lazy(() => import("./pages/hafriyat/HafriyatHesaplama"));
const HafriyatTemelKazisi = lazy(() => import("./pages/hafriyat/TemelKazisi"));
const HafriyatMolozTasima = lazy(() => import("./pages/hafriyat/MolozTasima"));
const RehberDokumUcretleri = lazy(() => import("./pages/rehber/DokumUcretleri"));
const RehberKamyonKacM3 = lazy(() => import("./pages/rehber/KamyonKacM3"));
const TeklifAl = lazy(() => import("./pages/TeklifAl"));
const Giris = lazy(() => import("./pages/Giris"));
const Kayit = lazy(() => import("./pages/Kayit"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const SifreSifirla = lazy(() => import("./pages/SifreSifirla"));
const KullanimKosullari = lazy(() => import("./pages/KullanimKosullari"));
const GizlilikPolitikasi = lazy(() => import("./pages/GizlilikPolitikasi"));
const Kvkk = lazy(() => import("./pages/Kvkk"));
const CerezPolitikasi = lazy(() => import("./pages/CerezPolitikasi"));
const HizmetSilobas = lazy(() => import("./pages/HizmetSilobas"));
const HizmetHafriyat = lazy(() => import("./pages/HizmetHafriyat"));
const Hakkimizda = lazy(() => import("./pages/Hakkimizda"));
const Iletisim = lazy(() => import("./pages/Iletisim"));
const TasiyiciOlun = lazy(() => import("./pages/TasiyiciOlun"));
const SSS = lazy(() => import("./pages/SSS"));
const Hammadde = lazy(() => import("./pages/Hammadde"));
const Fiyatlar = lazy(() => import("./pages/Fiyatlar"));
const MalzemeCimento = lazy(() => import("./pages/malzeme/MalzemeCimento"));
const MalzemeKum = lazy(() => import("./pages/malzeme/MalzemeKum"));
const MalzemeCakil = lazy(() => import("./pages/malzeme/MalzemeCakil"));
const MalzemeMicir = lazy(() => import("./pages/malzeme/MalzemeMicir"));
const MalzemeKalsit = lazy(() => import("./pages/malzeme/MalzemeKalsit"));
const MalzemeKirec = lazy(() => import("./pages/malzeme/MalzemeKirec"));
const MalzemeUcucuKul = lazy(() => import("./pages/malzeme/MalzemeUcucuKul"));
const MalzemeStabilize = lazy(() => import("./pages/malzeme/MalzemeStabilize"));
const MalzemeMermerTozu = lazy(() => import("./pages/malzeme/MalzemeMermerTozu"));
const MalzemeAlci = lazy(() => import("./pages/malzeme/MalzemeAlci"));
const BolgeIstanbul = lazy(() => import("./pages/bolge/BolgeIstanbul"));
const BolgeAnkara = lazy(() => import("./pages/bolge/BolgeAnkara"));
const BolgeIzmir = lazy(() => import("./pages/bolge/BolgeIzmir"));
const BolgeBursa = lazy(() => import("./pages/bolge/BolgeBursa"));
const BolgeKocaeli = lazy(() => import("./pages/bolge/BolgeKocaeli"));
const BolgeTekirdag = lazy(() => import("./pages/bolge/BolgeTekirdag"));
const BolgeSakarya = lazy(() => import("./pages/bolge/BolgeSakarya"));
const BolgeYalova = lazy(() => import("./pages/bolge/BolgeYalova"));
const BolgeBalikesir = lazy(() => import("./pages/bolge/BolgeBalikesir"));
const BolgeCanakkale = lazy(() => import("./pages/bolge/BolgeCanakkale"));
const BolgeEdirne = lazy(() => import("./pages/bolge/BolgeEdirne"));
const TalepTakip = lazy(() => import("./pages/TalepTakip"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const GoogleAnalytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        (window.dataLayer = window.dataLayer || []).push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: pathname });
  }, [pathname]);

  return null;
};

// Router hariç tüm uygulama ağacı — prerender (SSR) girişi de bunu kullanır.
export const AppRoutes = () => (
  <ErrorBoundary>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <GoogleAnalytics />
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/giris" element={<Giris />} />
                <Route path="/kayit" element={<Kayit />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/sifre-sifirla" element={<SifreSifirla />} />
                <Route path="/kullanim-kosullari" element={<KullanimKosullari />} />
                <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
                <Route path="/kvkk" element={<Kvkk />} />
                <Route path="/cerez-politikasi" element={<CerezPolitikasi />} />
                <Route path="/hizmetler/silobas" element={<HizmetSilobas />} />
                <Route path="/hizmetler/hafriyat-nakliyesi" element={<HizmetHafriyat />} />
                <Route path="/teklif-al" element={<TeklifAl />} />
                <Route path="/hafriyat" element={<HafriyatHub />} />
                <Route path="/hafriyat/fiyatlar" element={<HafriyatFiyatlar />} />
                <Route path="/hafriyat/hesaplama" element={<HafriyatHesaplama />} />
                <Route path="/hafriyat/temel-kazisi" element={<HafriyatTemelKazisi />} />
                <Route path="/hafriyat/moloz-tasima" element={<HafriyatMolozTasima />} />
                <Route path="/rehber/hafriyat-dokum-ucretleri" element={<RehberDokumUcretleri />} />
                <Route path="/rehber/hafriyat-kamyonu-kac-m3" element={<RehberKamyonKacM3 />} />
                {hafriyatRoutes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}
                <Route path="/hakkimizda" element={<Hakkimizda />} />
                <Route path="/iletisim" element={<Iletisim />} />
                <Route path="/tasiyici-olun" element={<TasiyiciOlun />} />
                <Route path="/sss" element={<SSS />} />
                <Route path="/hammadde" element={<Hammadde />} />
                <Route path="/fiyatlar" element={<Fiyatlar />} />
                <Route path="/malzeme/cimento" element={<MalzemeCimento />} />
                <Route path="/malzeme/kum" element={<MalzemeKum />} />
                <Route path="/malzeme/cakil" element={<MalzemeCakil />} />
                <Route path="/malzeme/micir" element={<MalzemeMicir />} />
                <Route path="/malzeme/kalsit" element={<MalzemeKalsit />} />
                <Route path="/malzeme/kirec" element={<MalzemeKirec />} />
                <Route path="/malzeme/ucucu-kul" element={<MalzemeUcucuKul />} />
                <Route path="/malzeme/stabilize" element={<MalzemeStabilize />} />
                <Route path="/malzeme/mermer-tozu" element={<MalzemeMermerTozu />} />
                <Route path="/malzeme/alci" element={<MalzemeAlci />} />
                <Route path="/hizmet-bolgeleri/istanbul" element={<BolgeIstanbul />} />
                <Route path="/hizmet-bolgeleri/ankara" element={<BolgeAnkara />} />
                <Route path="/hizmet-bolgeleri/izmir" element={<BolgeIzmir />} />
                <Route path="/hizmet-bolgeleri/bursa" element={<BolgeBursa />} />
                <Route path="/hizmet-bolgeleri/kocaeli" element={<BolgeKocaeli />} />
                <Route path="/hizmet-bolgeleri/tekirdag" element={<BolgeTekirdag />} />
                <Route path="/hizmet-bolgeleri/sakarya" element={<BolgeSakarya />} />
                <Route path="/hizmet-bolgeleri/yalova" element={<BolgeYalova />} />
                <Route path="/hizmet-bolgeleri/balikesir" element={<BolgeBalikesir />} />
                <Route path="/hizmet-bolgeleri/canakkale" element={<BolgeCanakkale />} />
                <Route path="/hizmet-bolgeleri/edirne" element={<BolgeEdirne />} />
                <Route path="/talep-takip" element={<TalepTakip />} />
                {kombinasyonRoutes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}
                <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <WhatsAppButton />
        <CallBar />
        <CookieConsent />
      </AuthProvider>
    </TooltipProvider>
  </ErrorBoundary>
);

// Analytics yalnızca burada: entry-server.tsx AppRoutes'u doğrudan render ettiği
// için prerender çıktısına script sızmaz, script sadece tarayıcıda yüklenir.
// (Vercel Analytics çerezsiz çalışır, KVKK açısından onay gerektirmez.)
const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <Analytics />
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
