import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Talep {
  id: string;
  talep_no: string;
  kategori: string;
  malzeme: string | null;
  miktar: number;
  birim: string;
  teslimat_ili: string | null;
  teslimat_tarihi: string | null;
  not_text: string | null;
  durum: string;
  hizmet_tipi: string;
  created_at: string;
  updated_at: string;
}

const durumConfig: Record<string, { badge: string; badgeClass: string; icon: string; iconBg: string }> = {
  bekliyor: { badge: "BEKLİYOR", badgeClass: "bg-yellow-50 text-yellow-600", icon: "⏳", iconBg: "bg-yellow-50" },
  teklif: { badge: "TEKLİF", badgeClass: "bg-blue-50 text-blue-600", icon: "💬", iconBg: "bg-blue-50" },
  onaylandi: { badge: "ONAYLANDI", badgeClass: "bg-green-50 text-green-600", icon: "✓", iconBg: "bg-green-50" },
  yolda: { badge: "YOLDA", badgeClass: "bg-primary/10 text-primary", icon: "🚛", iconBg: "bg-primary/10" },
  teslim: { badge: "TESLİM", badgeClass: "bg-green-50 text-green-600", icon: "✓", iconBg: "bg-green-50" },
};

const kategoriLabels: Record<string, string> = {
  insaat: "İnşaat",
  silobas: "Silobas",
  sanayi: "Sanayi",
  diger: "Diğer",
};

const filters = ["Tümü", "Bekliyor", "Aktif", "Tamamlandı"];
const filterMap: Record<string, string[]> = {
  "Tümü": [],
  "Bekliyor": ["bekliyor", "teklif"],
  "Aktif": ["onaylandi", "yolda"],
  "Tamamlandı": ["teslim"],
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const SiparislerimView = () => {
  const { user } = useAuth();
  const [talepler, setTalepler] = useState<Talep[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchTalepler = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("talepler")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (data) setTalepler(data as unknown as Talep[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchTalepler();
    const channel = supabase
      .channel("siparislerim-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "talepler" }, () => fetchTalepler())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const filtered = activeFilter === "Tümü"
    ? talepler
    : talepler.filter((t) => filterMap[activeFilter]?.includes(t.durum));

  const selected = talepler.find((t) => t.id === selectedId);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 lg:px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-semibold flex items-center gap-2 text-foreground">
            <span className="text-[18px]">◎</span> Siparişlerim
            <span className="text-[11px] font-mono text-muted-foreground font-normal ml-1">
              ({talepler.length} talep)
            </span>
          </h2>
        </div>
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-[5px] rounded-[5px] text-[11px] font-medium border transition-all ${
                activeFilter === f
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-transparent border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
              <span className="ml-1 text-[10px] font-mono opacity-60">
                {f === "Tümü" ? talepler.length : talepler.filter((t) => filterMap[f]?.includes(t.durum)).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* List */}
        <div className={`${selected ? "hidden lg:flex" : "flex"} flex-col flex-1 overflow-y-auto`}>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground text-[11px]">Yükleniyor...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-muted-foreground text-[12px]">Henüz sipariş bulunmuyor</div>
            </div>
          ) : (
            filtered.map((t) => {
              const cfg = durumConfig[t.durum] || durumConfig.bekliyor;
              const isSelected = t.id === selectedId;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={`flex items-center gap-3 px-4 lg:px-6 py-3 border-b border-border cursor-pointer transition-all ${
                    isSelected ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[16px] shrink-0 ${cfg.iconBg}`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[12px] font-semibold font-mono text-primary">#{t.talep_no}</span>
                      <span className={`px-1.5 py-[1px] rounded-[3px] text-[9px] font-semibold tracking-[.5px] uppercase ${cfg.badgeClass}`}>
                        {cfg.badge}
                      </span>
                      <span className={`px-1.5 py-[1px] rounded-[3px] text-[9px] font-semibold tracking-[.5px] uppercase ${
                        t.hizmet_tipi === "nakliye"
                          ? "bg-violet-50 text-violet-600"
                          : "bg-sky-50 text-sky-600"
                      }`}>
                        {t.hizmet_tipi === "nakliye" ? "🚛 NAKLİYE" : "📦 SATIN AL"}
                      </span>
                    </div>
                    <div className="text-[12px] font-medium truncate text-foreground">
                      {t.malzeme || kategoriLabels[t.kategori] || t.kategori} {t.teslimat_ili ? `— ${t.teslimat_ili}` : ""}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      {t.miktar} {t.birim} · {formatDate(t.created_at)}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[14px] font-bold font-mono text-foreground">{t.miktar} {t.birim}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-full lg:w-[360px] border-l border-border bg-card flex flex-col overflow-y-auto shrink-0">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-[12px] font-semibold font-mono text-primary">#{selected.talep_no}</span>
              <button onClick={() => setSelectedId(null)} className="text-muted-foreground hover:text-foreground text-sm transition-colors">✕</button>
            </div>

            <div className="px-4 py-3 border-b border-border">
              {(() => {
                const cfg = durumConfig[selected.durum] || durumConfig.bekliyor;
                return (
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold ${cfg.badgeClass}`}>
                    <span className="text-[14px]">{cfg.icon}</span> {cfg.badge}
                  </div>
                );
              })()}
            </div>

            <div className="px-4 py-3 space-y-3">
              {[
                { k: "Hizmet Tipi", v: selected.hizmet_tipi === "nakliye" ? "🚛 Nakliye" : "📦 Satın Alma" },
                { k: "Kategori", v: kategoriLabels[selected.kategori] || selected.kategori },
                { k: "Malzeme", v: selected.malzeme || "—" },
                { k: "Miktar", v: `${selected.miktar} ${selected.birim}` },
                { k: "Teslimat İli", v: selected.teslimat_ili || "—" },
                { k: "Teslimat Tarihi", v: selected.teslimat_tarihi ? new Date(selected.teslimat_tarihi).toLocaleDateString("tr-TR") : "—" },
                { k: "Oluşturulma", v: formatDate(selected.created_at) },
                { k: "Son Güncelleme", v: formatDate(selected.updated_at) },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-start">
                  <span className="text-[10px] font-semibold tracking-[.5px] text-muted-foreground uppercase">{item.k}</span>
                  <span className="text-[12px] font-medium text-right max-w-[180px] text-foreground">{item.v}</span>
                </div>
              ))}

              {selected.not_text && (
                <div className="mt-2 pt-2 border-t border-border">
                  <span className="text-[10px] font-semibold tracking-[.5px] text-muted-foreground uppercase block mb-1">Not</span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{selected.not_text}</p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-border">
              <span className="text-[10px] font-semibold tracking-[.5px] text-muted-foreground uppercase block mb-3">DURUM GEÇMİŞİ</span>
              <div className="flex gap-2.5 pb-2 relative">
                <div className={`w-[11px] h-[11px] rounded-full shrink-0 mt-0.5 ${
                  selected.durum === "bekliyor" ? "bg-primary shadow-[0_0_6px_rgba(232,98,10,0.4)] animate-pulse" : "bg-green-500"
                }`} />
                <div>
                  <div className="text-[11px] font-medium text-foreground">Talep Oluşturuldu</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{formatDate(selected.created_at)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiparislerimView;
