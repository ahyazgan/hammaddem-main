import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Giris from "./pages/Giris";
import Kayit from "./pages/Kayit";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import SifreSifirla from "./pages/SifreSifirla";
import KullanimKosullari from "./pages/KullanimKosullari";
import GizlilikPolitikasi from "./pages/GizlilikPolitikasi";
import Kvkk from "./pages/Kvkk";
import CerezPolitikasi from "./pages/CerezPolitikasi";
import HizmetSilobas from "./pages/HizmetSilobas";
import HizmetHafriyat from "./pages/HizmetHafriyat";
import Hakkimizda from "./pages/Hakkimizda";
import Iletisim from "./pages/Iletisim";
import TasiyiciOlun from "./pages/TasiyiciOlun";
import SSS from "./pages/SSS";
import MalzemeCimento from "./pages/malzeme/MalzemeCimento";
import MalzemeKum from "./pages/malzeme/MalzemeKum";
import MalzemeCakil from "./pages/malzeme/MalzemeCakil";
import MalzemeMicir from "./pages/malzeme/MalzemeMicir";
import MalzemeKalsit from "./pages/malzeme/MalzemeKalsit";
import MalzemeKirec from "./pages/malzeme/MalzemeKirec";
import MalzemeUcucuKul from "./pages/malzeme/MalzemeUcucuKul";
import MalzemeStabilize from "./pages/malzeme/MalzemeStabilize";
import MalzemeMermerTozu from "./pages/malzeme/MalzemeMermerTozu";
import MalzemeAlci from "./pages/malzeme/MalzemeAlci";
import BolgeIstanbul from "./pages/bolge/BolgeIstanbul";
import BolgeAnkara from "./pages/bolge/BolgeAnkara";
import BolgeIzmir from "./pages/bolge/BolgeIzmir";
import BolgeBursa from "./pages/bolge/BolgeBursa";
import BolgeKocaeli from "./pages/bolge/BolgeKocaeli";
import BolgeGaziantep from "./pages/bolge/BolgeGaziantep";
import WhatsAppButton from "./components/WhatsAppButton";
import NotFound from "./pages/NotFound";
import { kombinasyonRoutes } from "./pages/kombinasyon/kombinasyonRoutes";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/giris" element={<Giris />} />
              <Route path="/kayit" element={<Kayit />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/yazgan" element={<Admin />} />
              <Route path="/sifre-sifirla" element={<SifreSifirla />} />
              <Route path="/kullanim-kosullari" element={<KullanimKosullari />} />
              <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
              <Route path="/kvkk" element={<Kvkk />} />
              <Route path="/cerez-politikasi" element={<CerezPolitikasi />} />
              <Route path="/hizmetler/silobas" element={<HizmetSilobas />} />
              <Route path="/hizmetler/hafriyat-nakliyesi" element={<HizmetHafriyat />} />
              <Route path="/hakkimizda" element={<Hakkimizda />} />
              <Route path="/iletisim" element={<Iletisim />} />
              <Route path="/tasiyici-olun" element={<TasiyiciOlun />} />
              <Route path="/sss" element={<SSS />} />
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
              <Route path="/hizmet-bolgeleri/gaziantep" element={<BolgeGaziantep />} />
              {kombinasyonRoutes.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
