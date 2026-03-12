import { useState } from "react";
import { useTalepler } from "@/contexts/TaleplerContext";

const durumConfig: Record<string, { badge: string; badgeClass: string; icon: string; iconBg: string }> = {
  bekliyor: { badge: "BEKLİYOR", badgeClass: "bg-yellow-50 text-yellow-600", icon: "⏳", iconBg: "bg-yellow-50" },
  teklif: { badge: "TEKLİF", badgeClass: "bg-blue-50 text-blue-600", icon: "💬", iconBg: "bg-blue-50" },
  onaylandi: { badge: "ONAYLANDI", badgeClass: "bg-green-50 text-green-600", icon: "✓", iconBg: "bg-green-50" },
  yolda: { badge: "YOLDA", badgeClass: "bg-primary/10 text-primary", icon: "🚛", iconBg: "bg-primary/10" },
  teslim: { badge: "TESLİM", badgeClass: "bg-green-50 text-green-600", icon: "✓", iconBg: "bg-green-50" },
};

const filters = ["Tümü", "Bekliyor", "Aktif", "Tamamlandı"];
const filterMap: Record<string, string[]> = {
  "Tümü": [],
  "Bekliyor": ["bekliyor", "teklif"],
  "Aktif": ["onaylandi", "yolda"],
  "Tamamlandı": ["teslim"],
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} dk önce`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} saat önce`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Dün";
  return `${days} gün önce`;
}

const OrderActivity = () => {
  const { talepler, loading } = useTalepler();
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const filtered = activeFilter === "Tümü"
    ? talepler
    : talepler.filter((t) => filterMap[activeFilter]?.includes(t.durum));

  return (
    <div className="flex-1 overflow-y-auto px-4 lg:px-6 pb-4 scrollbar-thin">
      <div className="sticky top-0 bg-background pt-3.5 pb-2.5 border-b border-border mb-2.5 z-5 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-muted-foreground">SİPARİŞ AKTİVİTESİ</span>
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-2 py-[3px] rounded text-[10px] font-medium border transition-all ${
                activeFilter === f
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-transparent border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground text-[11px]">Yükleniyor...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-[11px]">
          Henüz talep bulunmuyor. Yukarıdan yeni talep oluşturabilirsiniz.
        </div>
      ) : (
        filtered.map((t) => {
          const cfg = durumConfig[t.durum] || durumConfig.bekliyor;
          return (
            <div
              key={t.id}
              className="flex items-center gap-2.5 py-2.5 border-b border-border last:border-b-0 cursor-pointer rounded hover:bg-muted hover:px-2 transition-all"
            >
              <div className={`w-8 h-8 rounded-[7px] flex items-center justify-center text-[15px] shrink-0 ${cfg.iconBg}`}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[12px] font-medium truncate max-w-[160px] text-foreground">
                    {t.malzeme || t.kategori} {t.teslimat_ili ? `— ${t.teslimat_ili}` : ""}
                  </span>
                  <span className={`px-1.5 py-[1px] rounded-[3px] text-[9px] font-semibold tracking-[.5px] uppercase shrink-0 ${cfg.badgeClass}`}>
                    {cfg.badge}
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  #{t.talep_no} · {t.miktar} {t.birim} · {t.kategori}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[12px] font-semibold font-mono text-foreground">{t.miktar} {t.birim}</div>
                <div className="text-[10px] text-muted-foreground">{timeAgo(t.created_at)}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderActivity;
