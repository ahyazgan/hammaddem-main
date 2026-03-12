import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import StatsRow from "@/components/dashboard/StatsRow";
import OrderActivity from "@/components/dashboard/OrderActivity";
import RightPanel from "@/components/dashboard/RightPanel";
import NewRequestWizard from "@/components/dashboard/NewRequestWizard";
import SiparislerimView from "@/components/dashboard/SiparislerimView";
import ProfilView from "@/components/dashboard/ProfilView";
import BildirimlerView from "@/components/dashboard/BildirimlerView";
import FaturaView from "@/components/dashboard/FaturaView";
import DestekView from "@/components/dashboard/DestekView";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/giris" replace />;
  }

  const handleNavChange = (nav: string) => {
    if (nav === "yeni-talep") {
      setActiveNav("dashboard");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById("yeni-talep-wizard");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    } else {
      setActiveNav(nav);
    }
  };

  return (
    <>
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="h-screen overflow-hidden bg-background bg-dot-pattern text-foreground font-sans text-[13px] grid grid-cols-1 md:grid-cols-[220px_1fr] grid-rows-[48px_1fr]">
      <DashboardTopbar user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <DashboardSidebar activeNav={activeNav} onNavChange={handleNavChange} open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />

      <main className="bg-background overflow-y-auto flex flex-col col-span-1">
        {activeNav === "siparisler" || activeNav === "gecmis" || activeNav === "insaat" || activeNav === "silobas" ? (
          <SiparislerimView
            kategoriFilter={activeNav === "insaat" || activeNav === "silobas" ? activeNav : undefined}
            initialFilter={activeNav === "gecmis" ? "Tamamlandı" : undefined}
          />
        ) : activeNav === "profil" ? (
          <ProfilView />
        ) : activeNav === "bildirimler" ? (
          <BildirimlerView />
        ) : activeNav === "fatura" ? (
          <FaturaView />
        ) : activeNav === "destek" ? (
          <DestekView />
        ) : (
          <>
            <StatsRow />
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] min-h-0">
              <div className="border-r border-border flex flex-col overflow-hidden">
                <NewRequestWizard />
                <OrderActivity />
              </div>
              <div className="hidden lg:flex">
                <RightPanel onNavChange={handleNavChange} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
    </>
  );
};

export default Dashboard;
