import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AdminStats from "./admin/AdminStats";
import AdminTalepler, { type Talep } from "./admin/AdminTalepler";
import AdminUsers from "./admin/AdminUsers";

interface Profile {
  user_id: string;
  firma_adi: string | null;
  email: string | null;
}

const tabs = [
  { id: "stats", label: "📊 Özet", mobileLabel: "📊" },
  { id: "talepler", label: "📦 Talepler", mobileLabel: "📦" },
  { id: "users", label: "👥 Kullanıcılar", mobileLabel: "👥" },
  { id: "settings", label: "⚙ Ayarlar", mobileLabel: "⚙" },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const [talepler, setTalepler] = useState<Talep[]>([]);
  const [misafirTalepler, setMisafirTalepler] = useState<Talep[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<{ key: string; value: string; label: string | null }[]>([]);
  const [savingSettings, setSavingSettings] = useState(false);

  const fetchAll = useCallback(async () => {
    const [{ data: talepData }, { data: misafirData }, { data: profileData }] = await Promise.all([
      supabase.from("talepler").select("*").order("created_at", { ascending: false }),
      supabase.from("misafir_talepler").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("user_id, firma_adi, email"),
    ]);
    if (talepData) setTalepler(talepData as unknown as Talep[]);
    if (misafirData) setMisafirTalepler(misafirData as unknown as Talep[]);
    if (profileData) {
      const map: Record<string, Profile> = {};
      (profileData as unknown as Profile[]).forEach(p => { map[p.user_id] = p; });
      setProfiles(map);
      setUserCount(profileData.length);
    }
    setLoading(false);
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("key, value, label").order("key");
    if (data) setSiteSettings(data as { key: string; value: string; label: string | null }[]);
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    let hasError = false;
    for (const s of siteSettings) {
      const { error } = await supabase.from("site_settings").update({ value: s.value, updated_at: new Date().toISOString() }).eq("key", s.key);
      if (error) hasError = true;
    }
    setSavingSettings(false);
    if (hasError) {
      toast({ title: "Hata", description: "Bazı ayarlar kaydedilemedi.", variant: "destructive" });
    } else {
      toast({ title: "Kaydedildi", description: "Site ayarları güncellendi." });
    }
  };

  useEffect(() => {
    fetchAll();
    fetchSettings();
    const ch = supabase
      .channel("admin-all")
      .on("postgres_changes", { event: "*", schema: "public", table: "talepler" }, () => fetchAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "misafir_talepler" }, () => fetchAll())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [fetchAll]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Tab Bar */}
      <div className="px-4 lg:px-6 border-b border-[#1c2133] shrink-0 flex items-center gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-[12px] font-medium whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-[#e8620a] text-[#e8eaf0]"
                : "border-transparent text-[#5a6278] hover:text-[#e8eaf0]"
            }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden text-lg">{tab.mobileLabel}</span>
          </button>
        ))}
        <span className="ml-auto text-[11px] font-mono text-[#5a6278] hidden md:block">
          {talepler.length + misafirTalepler.length} talep · {userCount} kullanıcı
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-[#5a6278] text-[11px]">Yükleniyor...</div>
      ) : (
        <>
          {activeTab === "stats" && (
            <AdminStats talepler={talepler} misafirTalepler={misafirTalepler} userCount={userCount} />
          )}
          {activeTab === "talepler" && (
            <AdminTalepler talepler={talepler} misafirTalepler={misafirTalepler} profiles={profiles} onRefresh={fetchAll} />
          )}
          {activeTab === "users" && <AdminUsers />}
          {activeTab === "settings" && (
            <div className="p-4 lg:p-6 overflow-y-auto">
              <div className="bg-[#0d1017] border border-[#1c2133] rounded-xl p-5">
                <h3 className="text-[13px] font-semibold text-[#e8eaf0] mb-4">Hero İstatistikleri</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  {siteSettings.filter(s => s.key.startsWith("stat_")).map(s => (
                    <div key={s.key} className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#5a6278] font-medium">{s.label || s.key}</label>
                      <input
                        value={s.value}
                        onChange={e => {
                          const updated = siteSettings.map(item =>
                            item.key === s.key ? { ...item, value: e.target.value } : item
                          );
                          setSiteSettings(updated);
                        }}
                        className="bg-[#111520] border border-[#1c2133] rounded-md px-2.5 py-1.5 text-[12px] text-[#e8eaf0] focus:outline-none focus:border-[#e8620a] transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={saveSettings}
                  disabled={savingSettings}
                  className="px-5 py-2 rounded-md bg-[#e8620a] text-white text-[12px] font-semibold hover:bg-[#c0520a] disabled:opacity-40 transition-colors"
                >
                  {savingSettings ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;
