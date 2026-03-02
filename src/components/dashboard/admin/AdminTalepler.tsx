import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Search, Filter } from "lucide-react";

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
  user_id?: string;
  telefon?: string;
  created_at: string;
  updated_at: string;
  aciliyet?: string;
  hizmet_tipi?: string;
  adres?: string | null;
  yuk_adres?: string | null;
}

interface Profile {
  user_id: string;
  firma_adi: string | null;
  email: string | null;
}

interface Props {
  talepler: Talep[];
  misafirTalepler: Talep[];
  profiles: Record<string, Profile>;
  onRefresh: () => void;
}

const durumOptions = [
  { value: "bekliyor", label: "Bekliyor", cls: "text-[#eab308]" },
  { value: "teklif", label: "Teklif", cls: "text-[#3b82f6]" },
  { value: "onaylandi", label: "Onaylandı", cls: "text-[#22c55e]" },
  { value: "yolda", label: "Yolda", cls: "text-[#e8620a]" },
  { value: "teslim", label: "Teslim", cls: "text-[#22c55e]" },
];

const kategoriLabels: Record<string, string> = {
  insaat: "İnşaat", silobas: "Silobas", sanayi: "Sanayi", diger: "Diğer",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

const AdminTalepler = ({ talepler, misafirTalepler, profiles, onRefresh }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [teklifMesaj, setTeklifMesaj] = useState("");
  const [search, setSearch] = useState("");
  const [filterDurum, setFilterDurum] = useState<string>("all");
  const [filterType, setFilterType] = useState<"all" | "kayitli" | "misafir">("all");
  const [showFilters, setShowFilters] = useState(false);

  // Combine and tag
  const allTalepler = [
    ...talepler.map(t => ({ ...t, _type: "kayitli" as const })),
    ...misafirTalepler.map(t => ({ ...t, _type: "misafir" as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Filter
  const filtered = allTalepler.filter(t => {
    if (filterType !== "all" && t._type !== filterType) return false;
    if (filterDurum !== "all" && t.durum !== filterDurum) return false;
    if (search) {
      const q = search.toLowerCase();
      const p = t._type === "kayitli" && t.user_id ? profiles[t.user_id] : null;
      return (
        t.talep_no.toLowerCase().includes(q) ||
        (t.malzeme?.toLowerCase().includes(q)) ||
        (t.kategori?.toLowerCase().includes(q)) ||
        (t.teslimat_ili?.toLowerCase().includes(q)) ||
        (p?.firma_adi?.toLowerCase().includes(q)) ||
        (p?.email?.toLowerCase().includes(q)) ||
        (t.telefon?.includes(q))
      );
    }
    return true;
  });

  const selected = filtered.find(t => t.id === selectedId);
  const profile = selected?._type === "kayitli" && selected.user_id ? profiles[selected.user_id] : null;

  const updateDurum = async (id: string, durum: string, type: "kayitli" | "misafir") => {
    setUpdating(true);
    const table = type === "misafir" ? "misafir_talepler" : "talepler";
    await supabase.from(table).update({ durum, updated_at: new Date().toISOString() } as any).eq("id", id);
    onRefresh();
    setUpdating(false);
  };

  const sendTeklif = async (talep: typeof allTalepler[0]) => {
    if (!teklifMesaj.trim() || talep._type !== "kayitli" || !talep.user_id) return;
    setUpdating(true);
    try {
      await Promise.all([
        supabase.from("talepler").update({ durum: "teklif", updated_at: new Date().toISOString() }).eq("id", talep.id),
        supabase.from("bildirimler").insert({
          user_id: talep.user_id,
          talep_id: talep.id,
          tip: "teklif",
          baslik: `Teklif: #${talep.talep_no}`,
          mesaj: teklifMesaj,
        }),
      ]);
      await supabase.functions.invoke("send-teklif-email", {
        body: { talepId: talep.id, mesaj: teklifMesaj },
      });
      toast({ title: "Teklif gönderildi", description: "Müşteriye bildirim iletildi." });
    } catch {
      toast({ title: "Hata", description: "Teklif gönderilemedi.", variant: "destructive" });
    }
    setTeklifMesaj("");
    setUpdating(false);
    onRefresh();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Search & Filters */}
      <div className="px-4 lg:px-6 py-3 border-b border-[#1c2133] flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a6278]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Talep no, malzeme, müşteri..."
            className="w-full bg-[#111520] border border-[#1c2133] rounded-lg pl-9 pr-3 py-2 text-[12px] text-[#e8eaf0] placeholder:text-[#5a6278] focus:outline-none focus:border-[#e8620a] transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 py-2 rounded-lg text-[11px] font-medium border flex items-center gap-1.5 transition-all ${
            showFilters ? "bg-[rgba(232,98,10,0.12)] border-[rgba(232,98,10,0.3)] text-[#e8620a]" : "border-[#1c2133] text-[#5a6278] hover:text-[#e8eaf0]"
          }`}
        >
          <Filter size={12} /> Filtrele
        </button>
        <span className="text-[11px] text-[#5a6278] font-mono ml-auto">{filtered.length} sonuç</span>
      </div>

      {showFilters && (
        <div className="px-4 lg:px-6 py-2.5 border-b border-[#1c2133] bg-[#0a0d14] flex flex-wrap gap-2">
          <select
            value={filterDurum}
            onChange={e => setFilterDurum(e.target.value)}
            className="bg-[#111520] border border-[#1c2133] rounded-md px-2.5 py-1.5 text-[11px] text-[#e8eaf0] focus:outline-none"
          >
            <option value="all">Tüm Durumlar</option>
            {durumOptions.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value as any)}
            className="bg-[#111520] border border-[#1c2133] rounded-md px-2.5 py-1.5 text-[11px] text-[#e8eaf0] focus:outline-none"
          >
            <option value="all">Tümü</option>
            <option value="kayitli">Kayıtlı</option>
            <option value="misafir">Misafir</option>
          </select>
        </div>
      )}

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* List */}
        <div className={`${selected ? "hidden lg:flex" : "flex"} flex-col flex-1 overflow-y-auto`}>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#5a6278] text-[12px]">Sonuç bulunamadı</div>
          ) : (
            filtered.map(t => {
              const p = t._type === "kayitli" && t.user_id ? profiles[t.user_id] : null;
              const durumCfg = durumOptions.find(d => d.value === t.durum) || durumOptions[0];
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={`flex items-center gap-3 px-4 lg:px-6 py-3 border-b border-[#1c2133] cursor-pointer transition-all ${
                    t.id === selectedId ? "bg-[rgba(232,98,10,0.06)] border-l-2 border-l-[#e8620a]" : "hover:bg-[#0d1017]"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[12px] font-semibold font-mono text-[#e8620a]">#{t.talep_no}</span>
                      <span className={`text-[9px] font-semibold uppercase ${durumCfg.cls}`}>{durumCfg.label}</span>
                      {t._type === "misafir" && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-[rgba(249,115,22,0.1)] border border-[rgba(249,115,22,0.2)] text-[#f97316] font-semibold uppercase">Misafir</span>
                      )}
                    </div>
                    <div className="text-[12px] font-medium truncate text-[#e8eaf0]">
                      {t.malzeme || kategoriLabels[t.kategori] || t.kategori} — {t.miktar} {t.birim}
                    </div>
                    <div className="text-[10px] text-[#5a6278] font-mono mt-0.5">
                      {p?.firma_adi || p?.email || t.telefon || "—"} · {formatDate(t.created_at)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail */}
        {selected && (
          <div className="w-full lg:w-[400px] border-l border-[#1c2133] bg-[#0d1017] flex flex-col overflow-y-auto shrink-0">
            <div className="px-4 py-3 border-b border-[#1c2133] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold font-mono text-[#e8620a]">#{selected.talep_no}</span>
                {selected._type === "misafir" && (
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-[rgba(249,115,22,0.1)] border border-[rgba(249,115,22,0.2)] text-[#f97316] font-semibold">MİSAFİR</span>
                )}
              </div>
              <button onClick={() => setSelectedId(null)} className="text-[#5a6278] hover:text-[#e8eaf0] text-sm">✕</button>
            </div>

            {/* Customer */}
            <div className="px-4 py-3 border-b border-[#1c2133]">
              <span className="text-[10px] font-semibold tracking-[.5px] text-[#5a6278] uppercase block mb-1">
                {selected._type === "misafir" ? "MİSAFİR" : "MÜŞTERİ"}
              </span>
              {selected._type === "kayitli" && profile ? (
                <>
                  <div className="text-[12px] font-medium text-[#e8eaf0]">{profile.firma_adi || "—"}</div>
                  <div className="text-[10px] text-[#5a6278]">{profile.email || "—"}</div>
                </>
              ) : (
                <div className="text-[12px] font-medium text-[#e8eaf0]">📞 {selected.telefon || "—"}</div>
              )}
            </div>

            {/* Details */}
            <div className="px-4 py-3 space-y-2 border-b border-[#1c2133]">
              {[
                { k: "Kategori", v: kategoriLabels[selected.kategori] || selected.kategori },
                { k: "Malzeme", v: selected.malzeme || "—" },
                { k: "Miktar", v: `${selected.miktar} ${selected.birim}` },
                { k: "Hizmet", v: selected.hizmet_tipi === "nakliye" ? "Sadece Nakliye" : "Satın Alma" },
                { k: "Aciliyet", v: selected.aciliyet || "normal" },
                { k: "Teslimat İli", v: selected.teslimat_ili || "—" },
                { k: "Teslimat Tarihi", v: selected.teslimat_tarihi ? new Date(selected.teslimat_tarihi).toLocaleDateString("tr-TR") : "—" },
                { k: "Adres", v: selected.adres || "—" },
                ...(selected.yuk_adres ? [{ k: "Yükleme Adresi", v: selected.yuk_adres }] : []),
              ].map((item, i) => (
                <div key={i} className="flex justify-between gap-2">
                  <span className="text-[10px] font-semibold tracking-[.5px] text-[#5a6278] uppercase shrink-0">{item.k}</span>
                  <span className="text-[12px] font-medium text-right text-[#e8eaf0]">{item.v}</span>
                </div>
              ))}
              {selected.not_text && (
                <div className="pt-2 border-t border-[#1c2133]">
                  <span className="text-[10px] font-semibold tracking-[.5px] text-[#5a6278] uppercase block mb-1">NOT</span>
                  <p className="text-[11px] text-[#9aa3b8]">{selected.not_text}</p>
                </div>
              )}
            </div>

            {/* Status Update */}
            <div className="px-4 py-3 border-b border-[#1c2133]">
              <span className="text-[10px] font-semibold tracking-[.5px] text-[#5a6278] uppercase block mb-2">DURUM GÜNCELLE</span>
              <div className="flex flex-wrap gap-1.5">
                {durumOptions.map(d => (
                  <button
                    key={d.value}
                    disabled={updating || selected.durum === d.value}
                    onClick={() => updateDurum(selected.id, d.value, selected._type)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-medium border transition-all ${
                      selected.durum === d.value
                        ? "bg-[rgba(232,98,10,0.12)] border-[rgba(232,98,10,0.3)] text-[#e8620a]"
                        : "border-[#1c2133] text-[#5a6278] hover:text-[#e8eaf0] hover:border-[#5a6278]"
                    } disabled:opacity-40`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Send Offer (only for registered users) */}
            {selected._type === "kayitli" && (
              <div className="px-4 py-3">
                <span className="text-[10px] font-semibold tracking-[.5px] text-[#5a6278] uppercase block mb-2">TEKLİF GÖNDER</span>
                <textarea
                  value={teklifMesaj}
                  onChange={e => setTeklifMesaj(e.target.value)}
                  placeholder="Teklif detaylarını yazın..."
                  className="w-full bg-[#111520] border border-[#1c2133] rounded-md px-3 py-2 text-[12px] text-[#e8eaf0] placeholder:text-[#5a6278] resize-none h-20 focus:outline-none focus:border-[#e8620a] transition-colors"
                />
                <button
                  disabled={updating || !teklifMesaj.trim()}
                  onClick={() => sendTeklif(selected)}
                  className="mt-2 w-full py-2 rounded-md bg-[#e8620a] text-white text-[12px] font-semibold hover:bg-[#c0520a] disabled:opacity-40 transition-colors"
                >
                  Teklif Gönder
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTalepler;
