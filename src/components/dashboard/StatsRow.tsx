import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Stats {
  aktifSiparis: number;
  teslimat: number;
  bekleyenTeklif: number;
  toplamTon: number;
}

const colorMap: Record<string, string> = {
  accent: "hsl(var(--primary))",
  green: "#22c55e",
  blue: "#3b82f6",
  yellow: "#eab308",
};

const StatsRow = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ aktifSiparis: 0, teslimat: 0, bekleyenTeklif: 0, toplamTon: 0 });

  const fetchStats = async () => {
    if (!user) return;
    const { data } = await supabase.from("talepler").select("durum, miktar");
    if (!data) return;

    const aktifSiparis = data.filter((t) => ["bekliyor", "teklif", "onaylandi", "yolda"].includes(t.durum)).length;
    const teslimat = data.filter((t) => t.durum === "teslim").length;
    const bekleyenTeklif = data.filter((t) => t.durum === "teklif").length;
    const toplamTon = data.reduce((sum, t) => sum + (t.miktar || 0), 0);

    setStats({ aktifSiparis, teslimat, bekleyenTeklif, toplamTon });
  };

  useEffect(() => {
    fetchStats();
    const channel = supabase
      .channel("stats-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "talepler" }, () => fetchStats())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const items = [
    { label: "AKTİF SİPARİŞ", value: String(stats.aktifSiparis), sub: "Devam eden siparişler", color: "accent" },
    { label: "TESLİMAT", value: String(stats.teslimat), sub: "Tamamlanan teslimatlar", color: "green" },
    { label: "BEKLEYEN TEKLİF", value: String(stats.bekleyenTeklif), sub: "Onayın bekleniyor", color: "blue" },
    { label: "TOPLAM TAŞIMA", value: `${stats.toplamTon}t`, sub: "Toplam ton", color: "yellow" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border shrink-0">
      {items.map((s, i) => (
        <div key={i} className="relative px-4 lg:px-6 py-4 border-r border-border last:border-r-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: colorMap[s.color] }} />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-muted-foreground font-medium tracking-[.3px]">{s.label}</span>
          </div>
          <div className="text-[22px] font-bold tracking-tight font-mono leading-none mb-1 text-foreground">{s.value}</div>
          <div className="text-[10px] text-muted-foreground">{s.sub}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
