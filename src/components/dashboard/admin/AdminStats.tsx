import { useMemo } from "react";

interface Talep {
  id: string;
  durum: string;
  kategori: string;
  miktar: number;
  created_at: string;
}

interface Props {
  talepler: Talep[];
  misafirTalepler: Talep[];
  userCount: number;
}

const AdminStats = ({ talepler, misafirTalepler, userCount }: Props) => {
  const stats = useMemo(() => {
    const all = [...talepler, ...misafirTalepler];
    const bekliyor = all.filter(t => t.durum === "bekliyor").length;
    const teslim = all.filter(t => t.durum === "teslim").length;
    const thisMonth = all.filter(t => {
      const d = new Date(t.created_at);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    // Category breakdown
    const cats: Record<string, number> = {};
    all.forEach(t => { cats[t.kategori] = (cats[t.kategori] || 0) + 1; });

    // Status breakdown
    const statuses: Record<string, number> = {};
    all.forEach(t => { statuses[t.durum] = (statuses[t.durum] || 0) + 1; });

    // Last 7 days trend
    const days: { label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("tr-TR", { weekday: "short" });
      const count = all.filter(t => t.created_at.slice(0, 10) === key).length;
      days.push({ label, count });
    }
    const maxDay = Math.max(...days.map(d => d.count), 1);

    return { total: all.length, bekliyor, teslim, thisMonth, cats, statuses, days, maxDay, registered: talepler.length, misafir: misafirTalepler.length };
  }, [talepler, misafirTalepler, userCount]);

  const cards = [
    { label: "Toplam Talep", value: stats.total, icon: "📦", accent: "text-primary" },
    { label: "Bekleyen", value: stats.bekliyor, icon: "⏳", accent: "text-[#eab308]" },
    { label: "Teslim Edilen", value: stats.teslim, icon: "✅", accent: "text-[#22c55e]" },
    { label: "Bu Ay", value: stats.thisMonth, icon: "📅", accent: "text-[#3b82f6]" },
    { label: "Kayıtlı Kullanıcı", value: userCount, icon: "👥", accent: "text-[#8b5cf6]" },
    { label: "Misafir Talep", value: stats.misafir, icon: "🔓", accent: "text-[#f97316]" },
  ];

  const durumLabels: Record<string, { label: string; color: string }> = {
    bekliyor: { label: "Bekliyor", color: "#eab308" },
    teklif: { label: "Teklif", color: "#3b82f6" },
    onaylandi: { label: "Onaylandı", color: "#22c55e" },
    yolda: { label: "Yolda", color: "#e8620a" },
    teslim: { label: "Teslim", color: "#10b981" },
  };

  const kategoriLabels: Record<string, string> = {
    insaat: "İnşaat", silobas: "Silobas", sanayi: "Sanayi", diger: "Diğer",
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 overflow-y-auto">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map(c => (
          <div key={c.label} className="bg-[#0d1017] border border-[#1c2133] rounded-xl p-4">
            <div className="text-lg mb-1">{c.icon}</div>
            <div className={`text-2xl font-bold font-mono ${c.accent}`}>{c.value}</div>
            <div className="text-[10px] text-[#5a6278] font-medium mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 7-Day Trend */}
        <div className="bg-[#0d1017] border border-[#1c2133] rounded-xl p-4 lg:col-span-2">
          <h3 className="text-[11px] font-semibold text-[#5a6278] uppercase tracking-wider mb-4">Son 7 Gün</h3>
          <div className="flex items-end gap-2 h-[120px]">
            {stats.days.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-[#5a6278]">{d.count}</span>
                <div className="w-full rounded-t-md bg-primary/20 relative" style={{ height: `${(d.count / stats.maxDay) * 80 + 10}px` }}>
                  <div className="absolute inset-x-0 bottom-0 bg-primary rounded-t-md" style={{ height: `${(d.count / stats.maxDay) * 100}%` }} />
                </div>
                <span className="text-[9px] text-[#5a6278]">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-[#0d1017] border border-[#1c2133] rounded-xl p-4">
          <h3 className="text-[11px] font-semibold text-[#5a6278] uppercase tracking-wider mb-4">Durum Dağılımı</h3>
          <div className="space-y-2.5">
            {Object.entries(stats.statuses).map(([key, count]) => {
              const cfg = durumLabels[key] || { label: key, color: "#5a6278" };
              const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span style={{ color: cfg.color }} className="font-medium">{cfg.label}</span>
                    <span className="text-[#5a6278] font-mono">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-[#1c2133] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-[#0d1017] border border-[#1c2133] rounded-xl p-4">
        <h3 className="text-[11px] font-semibold text-[#5a6278] uppercase tracking-wider mb-3">Kategori Dağılımı</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(stats.cats).map(([key, count]) => (
            <div key={key} className="flex items-center gap-3 bg-[#111520] rounded-lg p-3 border border-[#1c2133]">
              <div className="text-xl font-bold font-mono text-primary">{count}</div>
              <div className="text-[11px] text-[#9aa3b8] font-medium">{kategoriLabels[key] || key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
