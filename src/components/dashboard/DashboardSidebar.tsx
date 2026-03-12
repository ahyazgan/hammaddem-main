import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  activeNav: string;
  onNavChange: (nav: string) => void;
  open: boolean;
  onClose: () => void;
  user: User;
}

const hizmetItems = [
  { id: "insaat", icon: "🏗", label: "İnşaat Mal." },
  { id: "silobas", icon: "⊙", label: "Silobas / Toz" },
  { id: "sanayi", icon: "⚙", label: "Sanayi" },
];


const DashboardSidebar = ({ activeNav, onNavChange, open, onClose, user }: Props) => {
  const { signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const initials = (user.user_metadata?.firma_adi || user.email || "U").substring(0, 2).toUpperCase();
  const displayName = user.user_metadata?.firma_adi || user.email || "Kullanıcı";

  const [counts, setCounts] = useState({ aktif: 0, gecmis: 0, unreadNotif: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [talepRes, notifRes] = await Promise.all([
        supabase.from("talepler").select("durum").eq("user_id", user.id),
        supabase.from("bildirimler").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("okundu", false),
      ]);
      const data = talepRes.data;
      const aktif = data ? data.filter(t => ["bekliyor", "teklif", "onaylandi", "yolda"].includes(t.durum)).length : 0;
      const gecmis = data ? data.filter(t => t.durum === "teslim").length : 0;
      const unreadNotif = notifRes.count ?? 0;
      setCounts({ aktif, gecmis, unreadNotif });
    };
    fetchCounts();
    const channel = supabase
      .channel("sidebar-counts")
      .on("postgres_changes", { event: "*", schema: "public", table: "talepler" }, () => fetchCounts())
      .on("postgres_changes", { event: "*", schema: "public", table: "bildirimler" }, () => fetchCounts())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const navItems = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "yeni-talep", icon: "＋", label: "Yeni Talep" },
    { id: "siparisler", icon: "◎", label: "Siparişlerim", pill: counts.aktif > 0 ? String(counts.aktif) : undefined },
    { id: "gecmis", icon: "↻", label: "Geçmiş", pill: counts.gecmis > 0 ? String(counts.gecmis) : undefined },
  ];

  const hesapItems = [
    { id: "profil", icon: "👤", label: "Profil & Ayarlar" },
    { id: "bildirimler", icon: "🔔", label: "Bildirimler", pill: counts.unreadNotif > 0 ? String(counts.unreadNotif) : undefined, pillOrange: true },
    { id: "fatura", icon: "📄", label: "Fatura & İrsaliye" },
    { id: "destek", icon: "💬", label: "Destek" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const activeClass = "bg-primary/10 border border-primary/30 text-foreground";
  const inactiveClass = "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent";

  const sidebarNavContent = (
    <div className="flex-1 overflow-y-auto">
      <div className="px-2.5 mb-1">
        <div className="text-[10px] font-semibold tracking-[1.2px] uppercase text-muted-foreground px-2 pt-2 pb-1.5">
          Ana Menü
        </div>
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => { onNavChange(item.id); onClose(); }}
            className={`flex items-center gap-2 px-2.5 py-[7px] rounded-[6px] cursor-pointer text-[12px] font-medium mb-[1px] transition-all ${
              activeNav === item.id ? activeClass : inactiveClass
            }`}
          >
            <span className={`text-[14px] w-[18px] text-center shrink-0 ${activeNav === item.id ? "text-primary" : ""}`}>
              {item.icon}
            </span>
            {item.label}
            {item.pill && (
              <span className="ml-auto bg-muted rounded-[10px] px-[7px] py-[1px] text-[10px] font-mono text-muted-foreground">
                {item.pill}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="h-px bg-border mx-2.5 my-2" />

      <div className="px-2.5 mb-1">
        <div className="text-[10px] font-semibold tracking-[1.2px] uppercase text-muted-foreground px-2 pt-2 pb-1.5">
          Hizmetler
        </div>
        {hizmetItems.map((item) => (
          <div
            key={item.id}
            onClick={() => { onNavChange(item.id); onClose(); }}
            className={`flex items-center gap-2 px-2.5 py-[7px] rounded-[6px] cursor-pointer text-[12px] font-medium mb-[1px] transition-all ${
              activeNav === item.id ? activeClass : inactiveClass
            }`}
          >
            <span className="text-[14px] w-[18px] text-center shrink-0">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>


      {isAdmin && (
        <>
          <div className="h-px bg-border mx-2.5 my-2" />
          <div className="px-2.5 mb-1">
            <div className="text-[10px] font-semibold tracking-[1.2px] uppercase text-muted-foreground px-2 pt-2 pb-1.5">
              Yönetim
            </div>
            <div
              onClick={() => navigate("/yazgan")}
              className="flex items-center gap-2 px-2.5 py-[7px] rounded-[6px] cursor-pointer text-[12px] font-medium mb-[1px] transition-all text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
            >
              <span className="text-[14px] w-[18px] text-center shrink-0">⚡</span>
              Admin Panel
            </div>
          </div>
        </>
      )}

      <div className="h-px bg-border mx-2.5 my-2" />

      <div className="px-2.5 mb-1">
        <div className="text-[10px] font-semibold tracking-[1.2px] uppercase text-muted-foreground px-2 pt-2 pb-1.5">
          Hesap
        </div>
        {hesapItems.map((item) => (
          <div
            key={item.id}
            onClick={() => { onNavChange(item.id); onClose(); }}
            className={`flex items-center gap-2 px-2.5 py-[7px] rounded-[6px] cursor-pointer text-[12px] font-medium mb-[1px] transition-all ${
              activeNav === item.id ? activeClass : inactiveClass
            }`}
          >
            <span className="text-[14px] w-[18px] text-center shrink-0">{item.icon}</span>
            {item.label}
            {item.pill && (
              <span className={`ml-auto rounded-[10px] px-[7px] py-[1px] text-[10px] font-mono ${
                item.pillOrange ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {item.pill}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const sidebarFooter = (
    <div className="shrink-0 px-2.5 pb-2.5 pt-2 border-t border-border">
      <div
        onClick={handleSignOut}
        className="flex items-center gap-2 px-2.5 py-2 rounded-[6px] bg-muted border border-border cursor-pointer hover:border-primary transition-colors"
      >
        <div className="w-7 h-7 rounded-[6px] bg-gradient-to-br from-primary to-[hsl(var(--accent-hover))] flex items-center justify-center text-[11px] font-bold text-primary-foreground shrink-0">
          {initials}
        </div>
        <div>
          <div className="text-[12px] font-medium truncate max-w-[120px] text-foreground">{displayName}</div>
          <div className="text-[10px] text-muted-foreground">Çıkış Yap</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex bg-card border-r border-border flex-col overflow-hidden py-3">
        {sidebarNavContent}
        {sidebarFooter}
      </aside>

      {open && (
        <div className="fixed inset-0 z-[200] md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border flex flex-col py-3 animate-fade-down">
            <div className="flex items-center justify-between px-4 mb-2 shrink-0">
              <span className="text-[13px] font-semibold text-foreground">Menü</span>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            {sidebarNavContent}
            {sidebarFooter}
          </aside>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
