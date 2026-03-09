interface Props {
  onNavChange?: (nav: string) => void;
}

const timelineItems = [
  { title: "Talep Oluşturuldu", time: "Bugün 08:14", status: "done" },
  { title: "Teklif Onaylandı", time: "Bugün 10:30", status: "done" },
  { title: "Yükleme & Yolda", time: "Bugün 13:45 — devam ediyor", status: "active" },
  { title: "Teslim Edilecek", time: "~Bugün 17:00", status: "pending" },
];

const quickStats = [
  { label: "Toplam Ton", value: "284t", color: "text-primary" },
  { label: "Teslimat", value: "12", color: "" },
  { label: "Ort. Süre", value: "2.4g", color: "" },
  { label: "Başarı", value: "%94", color: "text-green-600" },
];

const quickLinks = [
  { icon: "＋", label: "Yeni Talep Oluştur", desc: "Hızlıca yeni sipariş verin", nav: "yeni-talep" },
  { icon: "📦", label: "Siparişlerim", desc: "Tüm taleplerinizi görün", nav: "siparisler" },
  { icon: "📋", label: "Fiyat Teklifi Al", desc: "Ücretsiz teklif talep edin", nav: "yeni-talep" },
  { icon: "📞", label: "Destek", desc: "7/24 müşteri desteği", nav: "destek" },
];

const RightPanel = ({ onNavChange }: Props) => (
  <div className="flex flex-col overflow-hidden bg-card w-full">
    {/* Quick Links */}
    <div className="p-4 border-b border-border shrink-0">
      <div className="text-[11px] font-semibold text-muted-foreground mb-3">
        HIZLI ERİŞİM
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {quickLinks.map((link, i) => (
          <div
            key={i}
            onClick={() => onNavChange?.(link.nav)}
            className="bg-muted border border-border rounded-lg p-2.5 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group"
          >
            <div className="text-base mb-1">{link.icon}</div>
            <div className="text-[11px] font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</div>
            <div className="text-[9px] text-muted-foreground mt-0.5">{link.desc}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Timeline */}
    <div className="p-4 border-b border-border shrink-0">
      <div className="text-[11px] font-semibold text-muted-foreground mb-3">#HMD-0841 DURUM</div>
      <div>
        {timelineItems.map((item, i) => (
          <div key={i} className="flex gap-2.5 pb-3 relative">
            {i < timelineItems.length - 1 && (
              <div className="absolute left-[6px] top-[14px] w-px bg-border" style={{ height: "calc(100% - 14px)" }} />
            )}
            <div className={`w-[13px] h-[13px] rounded-full border-[1.5px] shrink-0 mt-[1px] flex items-center justify-center relative z-[1] ${
              item.status === "done"
                ? "bg-green-500 border-green-500"
                : item.status === "active"
                ? "bg-primary border-primary shadow-[0_0_8px_rgba(232,98,10,0.4)] animate-pulse"
                : "bg-background border-border"
            }`} />
            <div className="flex-1">
              <div className="text-[11px] font-medium mb-[1px] text-foreground">{item.title}</div>
              <div className="text-[10px] text-muted-foreground font-mono">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Quick stats */}
    <div className="p-4 flex-1 overflow-y-auto">
      <div className="text-[11px] font-semibold text-muted-foreground mb-3">BU AY ÖZET</div>
      <div className="grid grid-cols-2 gap-1.5">
        {quickStats.map((s, i) => (
          <div key={i} className="bg-muted border border-border rounded-[7px] p-2.5">
            <div className="text-[10px] text-muted-foreground mb-1">{s.label}</div>
            <div className={`text-[16px] font-bold font-mono ${s.color || "text-foreground"}`}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RightPanel;
