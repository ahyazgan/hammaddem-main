import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  onNavChange?: (nav: string) => void;
}

interface SonTalep {
  id: string;
  talep_no: string;
  malzeme: string | null;
  kategori: string;
  durum: string;
  miktar: number;
  birim: string;
  created_at: string;
}

const durumTimeline: Record<string, { steps: { title: string; status: "done" | "active" | "pending" }[] }> = {
  bekliyor: { steps: [{ title: "Talep Oluşturuldu", status: "done" }, { title: "Teklif Hazırlanıyor", status: "active" }, { title: "Onay & Yükleme", status: "pending" }, { title: "Teslim", status: "pending" }] },
  teklif:   { steps: [{ title: "Talep Oluşturuldu", status: "done" }, { title: "Teklif Gönderildi", status: "done" }, { title: "Onayınız Bekleniyor", status: "active" }, { title: "Teslim", status: "pending" }] },
  onaylandi:{ steps: [{ title: "Talep Oluşturuldu", status: "done" }, { title: "Teklif Onaylandı", status: "done" }, { title: "Yükleme & Yolda", status: "active" }, { title: "Teslim", status: "pending" }] },
  yolda:    { steps: [{ title: "Talep Oluşturuldu", status: "done" }, { title: "Teklif Onaylandı", status: "done" }, { title: "Yükleme & Yolda", status: "done" }, { title: "Teslim Ediliyor", status: "active" }] },
  teslim:   { steps: [{ title: "Talep Oluşturuldu", status: "done" }, { title: "Teklif Onaylandı", status: "done" }, { title: "Yükleme & Yolda", status: "done" }, { title: "Teslim Edildi", status: "done" }] },
  iptal:    { steps: [{ title: "Talep Oluşturuldu", status: "done" }, { title: "İptal Edildi", status: "active" }, { title: "—", status: "pending" }, { title: "—", status: "pending" }] },
};

const quickLinks = [
  { icon: "＋", label: "Yeni Talep", desc: "Yeni sipariş verin", nav: "yeni-talep" },
  { icon: "📦", label: "Siparişlerim", desc: "Tüm talepleriniz", nav: "siparisler" },
  { icon: "📄", label: "Fatura", desc: "Belgeleri indirin", nav: "fatura" },
  { icon: "💬", label: "Destek", desc: "7/24 destek", nav: "destek" },
];

const RightPanel = ({ onNavChange }: Props) => {
  const { user } = useAuth();
  const [sonTalep, setSonTalep] = useState<SonTalep | null>(null);
  const [ozet, setOzet] = useState({ toplamTon: 0, teslimat: 0, aktif: 0, basari: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("talepler")
        .select("id, talep_no, malzeme, kategori, durum, miktar, birim, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        const aktifler = (data as any[]).filter(t => !["teslim", "iptal"].includes(t.durum));
        setSonTalep((aktifler[0] || data[0]) as unknown as SonTalep);
        const toplamTon = (data as any[]).reduce((s, t) => s + (t.miktar || 0), 0);
        const teslimat = (data as any[]).filter(t => t.durum === "teslim").length;
        const aktif = (data as any[]).filter(t => ["bekliyor", "teklif", "onaylandi", "yolda"].includes(t.durum)).length;
        const basari = data.length > 0 ? Math.round((teslimat / data.length) * 100) : 0;
        setOzet({ toplamTon, teslimat, aktif, basari });
      }
      setLoading(false);
    };
    fetch();
    const ch = supabase.channel("rightpanel-data")
      .on("postgres_changes", { event: "*", schema: "public", table: "talepler" }, fetch)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user]);

  const timeline = sonTalep ? (durumTimeline[sonTalep.durum] || durumTimeline.bekliyor) : null;

  return (
    <div className="flex flex-col overflow-hidden bg-card w-full">
      {/* Quick Links */}
      <div className="p-4 border-b border-border shrink-0">
        <div className="text-[11px] font-semibold text-muted-foreground mb-3">HIZLI ERİŞİM</div>
        <div className="grid grid-cols-2 gap-1.5">
          {quickLinks.map((link, i) => (
            <div key={i} onClick={() => onNavChange?.(link.nav)}
              className="bg-muted border border-border rounded-lg p-2.5 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group">
              <div className="text-base mb-1">{link.icon}</div>
              <div className="text-[11px] font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">{link.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Son Talep Timeline */}
      <div className="p-4 border-b border-border shrink-0">
        {loading ? (
          <div className="text-[11px] text-muted-foreground">Yükleniyor...</div>
        ) : sonTalep && timeline ? (
          <>
            <div className="text-[11px] font-semibold text-muted-foreground mb-3">#{sonTalep.talep_no} DURUM</div>
            {timeline.steps.map((item, i) => (
              <div key={i} className="flex gap-2.5 pb-3 relative">
                {i < timeline.steps.length - 1 && (
                  <div className="absolute left-[6px] top-[14px] w-px bg-border" style={{ height: "calc(100% - 14px)" }} />
                )}
                <div className={`w-[13px] h-[13px] rounded-full border-[1.5px] shrink-0 mt-[1px] relative z-[1] ${
                  item.status === "done" ? "bg-green-500 border-green-500"
                  : item.status === "active" ? "bg-primary border-primary shadow-[0_0_8px_rgba(232,98,10,0.4)] animate-pulse"
                  : "bg-background border-border"
                }`} />
                <div className={`text-[11px] font-medium ${item.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                  {item.title}
                </div>
              </div>
            ))}
            <button onClick={() => onNavChange?.("siparisler")} className="text-[10px] text-primary font-medium hover:underline">
              Tüm siparişleri gör →
            </button>
          </>
        ) : (
          <div className="text-center py-2">
            <div className="text-[11px] text-muted-foreground mb-2">Henüz talep yok</div>
            <button onClick={() => onNavChange?.("yeni-talep")} className="text-[11px] text-primary font-semibold hover:underline">
              + İlk talebini oluştur
            </button>
          </div>
        )}
      </div>

      {/* Gerçek Özet */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-muted-foreground mb-3">GENEL ÖZET</div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "Toplam Ton", value: `${ozet.toplamTon}t`, color: "text-primary" },
            { label: "Teslimat", value: String(ozet.teslimat), color: "" },
            { label: "Aktif Talep", value: String(ozet.aktif), color: "" },
            { label: "Başarı", value: `%${ozet.basari}`, color: "text-green-600" },
          ].map((s, i) => (
            <div key={i} className="bg-muted border border-border rounded-[7px] p-2.5">
              <div className="text-[10px] text-muted-foreground mb-1">{s.label}</div>
              <div className={`text-[16px] font-bold font-mono ${s.color || "text-foreground"}`}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
