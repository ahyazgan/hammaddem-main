import { useState, useEffect } from "react";
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

const tipIcons: Record<string, string> = {
  talep: "📋", teklif: "💰", durum: "🔄", teslim: "✅", bilgi: "ℹ️",
};

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}dk önce`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}sa önce`;
  return `${Math.floor(hours / 24)}g önce`;
}

const BildirimlerView = () => {
  const { user } = useAuth();
  const [bildirimler, setBildirimler] = useState<Bildirim[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBildirimler = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("bildirimler")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setBildirimler(data as unknown as Bildirim[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchBildirimler();
    if (!user) return;
    const ch = supabase
      .channel("bildirimler-view")
      .on("postgres_changes", { event: "*", schema: "public", table: "bildirimler", filter: `user_id=eq.${user.id}` }, () => fetchBildirimler())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase.from("bildirimler").update({ okundu: true }).eq("user_id", user.id).eq("okundu", false);
    fetchBildirimler();
  };

  const markRead = async (id: string) => {
    if (!user) return;
    await supabase.from("bildirimler").update({ okundu: true }).eq("id", id).eq("user_id", user.id);
    fetchBildirimler();
  };

  const unreadCount = bildirimler.filter(b => !b.okundu).length;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 lg:px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 className="text-[15px] font-semibold flex items-center gap-2">
          <span className="text-[18px]">🔔</span> Bildirimler
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-[10px] font-mono px-1.5 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </h2>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-[11px] text-primary font-medium hover:underline">
            Tümünü okundu işaretle
          </button>
        )}
      </div>

      <div className="divide-y divide-border">
        {loading ? (
          <div className="p-6 text-center text-muted-foreground text-sm">Yükleniyor...</div>
        ) : bildirimler.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">Henüz bildirim yok</div>
        ) : (
          bildirimler.map((b) => (
            <div
              key={b.id}
              onClick={() => !b.okundu && markRead(b.id)}
              className={`px-4 lg:px-6 py-3.5 cursor-pointer transition-colors ${
                b.okundu ? "opacity-60" : "bg-primary/[0.03] hover:bg-primary/[0.06]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-sm shrink-0">
                  {tipIcons[b.tip] || "ℹ️"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[12px] font-semibold text-foreground">{b.baslik}</span>
                    {!b.okundu && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{b.mesaj}</p>
                  <span className="text-[10px] text-muted-foreground font-mono mt-1 block">{timeAgo(b.created_at)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BildirimlerView;
