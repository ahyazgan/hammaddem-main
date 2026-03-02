import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Bildirim {
  id: string;
  baslik: string;
  mesaj: string;
  tip: string;
  okundu: boolean;
  created_at: string;
}

const tipIcon: Record<string, string> = {
  talep: "📦",
  teklif: "💬",
  durum: "🚛",
  teslim: "✓",
  bilgi: "ℹ️",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Az önce";
  if (mins < 60) return `${mins} dk önce`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} saat önce`;
  const days = Math.floor(hours / 24);
  return `${days} gün önce`;
}

const NotificationsDropdown = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [bildirimler, setBildirimler] = useState<Bildirim[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = bildirimler.filter((b) => !b.okundu).length;

  const fetchBildirimler = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("bildirimler")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setBildirimler(data as unknown as Bildirim[]);
  };

  const markAllRead = async () => {
    if (!user) return;
    await supabase
      .from("bildirimler")
      .update({ okundu: true })
      .eq("okundu", false);
    setBildirimler((prev) => prev.map((b) => ({ ...b, okundu: true })));
  };

  useEffect(() => {
    fetchBildirimler();
    const channel = supabase
      .channel("bildirimler-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "bildirimler" }, (payload) => {
        setBildirimler((prev) => [payload.new as unknown as Bildirim, ...prev].slice(0, 20));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-[30px] h-[30px] rounded-[6px] bg-muted border border-border flex items-center justify-center cursor-pointer text-[14px] text-muted-foreground hover:text-foreground transition-colors"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-[3px] -right-[3px] w-[14px] h-[14px] rounded-full bg-primary border-2 border-background text-[8px] font-bold text-primary-foreground flex items-center justify-center font-mono">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-[38px] w-[320px] bg-card border border-border rounded-lg shadow-lg z-[100] overflow-hidden animate-fade-down">
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
            <span className="text-[11px] font-semibold text-muted-foreground">BİLDİRİMLER</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] text-muted-foreground hover:text-primary transition-colors"
              >
                Tümünü okundu işaretle
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {bildirimler.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-[11px]">
                Henüz bildirim yok
              </div>
            ) : (
              bildirimler.map((b) => (
                <div
                  key={b.id}
                  className={`flex gap-2.5 px-3 py-2.5 border-b border-border last:border-b-0 transition-colors ${
                    b.okundu ? "opacity-60" : "bg-primary/5"
                  }`}
                >
                  <div className="w-7 h-7 rounded-[6px] bg-muted border border-border flex items-center justify-center text-[13px] shrink-0 mt-0.5">
                    {tipIcon[b.tip] || "ℹ️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] font-semibold text-foreground">{b.baslik}</span>
                      {!b.okundu && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] text-muted-foreground leading-relaxed">{b.mesaj}</div>
                    <div className="text-[9px] text-muted-foreground font-mono mt-1">{timeAgo(b.created_at)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
