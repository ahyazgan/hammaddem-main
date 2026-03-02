import { useState, ReactNode } from "react";
import { iller } from "@/constants/iller";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import SilobasIcon from "@/components/SilobasIcon";
import HafriyatIcon from "@/components/HafriyatIcon";

const categories: { id: string; icon: ReactNode; label: string }[] = [
  { id: "insaat", icon: <HafriyatIcon className="w-5 h-5" />, label: "Hafriyat & İnşaat" },
  { id: "silobas", icon: <SilobasIcon className="w-5 h-5" />, label: "Silobas" },
];

const categoryMaterials: Record<string, string[]> = {
  insaat: ["Kum", "Çakıl", "Mıcır", "Kırma Taş", "Moloz", "Toprak", "Stabilize", "Dolgu Malzemesi", "Balast", "Çimento", "Demir", "Beton", "Tuğla", "Kereste", "Diğer"],
  silobas: ["Çimento", "Alçı", "Kireç", "Kalsit", "Mermer Tozu", "Silis", "Perlit", "Kül", "Curuf", "Diğer"],
};

const birimler = ["Ton", "m³", "Adet"];
const aciliyetler = [
  { id: "normal", label: "Normal", icon: "🟢" },
  { id: "acil", label: "Acil", icon: "🟡" },
  { id: "cok_acil", label: "Çok Acil", icon: "🔴" },
];

const inputClass = "w-full bg-muted border border-border rounded-[6px] px-2.5 py-[7px] text-[12px] text-foreground outline-none focus:border-primary transition-colors";
const labelClass = "block text-[10px] font-semibold tracking-[.5px] text-muted-foreground mb-1";

const NewRequestWizard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [selectedCat, setSelectedCat] = useState("");
  const [hizmetTipi, setHizmetTipi] = useState("satin_alma");
  const [material, setMaterial] = useState("");
  const [customMaterial, setCustomMaterial] = useState("");
  const [quantity, setQuantity] = useState("100");
  const [birim, setBirim] = useState("Ton");
  const [city, setCity] = useState("");
  const [adres, setAdres] = useState("");
  const [date, setDate] = useState("");
  const [aciliyet, setAciliyet] = useState("normal");
  const [tekrarli, setTekrarli] = useState(false);
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [talepNo, setTalepNo] = useState("");

  const reset = () => {
    setStep(0); setSelectedCat(""); setHizmetTipi("satin_alma"); setMaterial(""); setCustomMaterial(""); setQuantity("100"); setBirim("Ton");
    setCity(""); setAdres(""); setDate(""); setAciliyet("normal"); setTekrarli(false); setNote(""); setSuccess(false); setTalepNo("");
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    const { data: noData } = await supabase.rpc("generate_talep_no");
    const generatedNo = (noData as string) || `HMD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;

    const { error } = await supabase.from("talepler").insert({
      user_id: user.id,
      talep_no: generatedNo,
      kategori: selectedCat,
      malzeme: (material === "Diğer" ? customMaterial : material) || null,
      miktar: Number(quantity) || 0,
      birim,
      teslimat_ili: city || null,
      adres: adres || null,
      teslimat_tarihi: date || null,
      aciliyet,
      tekrarli,
      not_text: note || null,
      durum: "bekliyor",
      hizmet_tipi: hizmetTipi,
    });

    setLoading(false);

    if (error) {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    } else {
      setTalepNo(generatedNo);
      setSuccess(true);
      toast({ title: "Talep oluşturuldu", description: `${generatedNo} numaralı talebiniz alındı.` });
    }
  };

  const finalMaterial = (material === "Diğer" ? customMaterial : material) || "—";

  return (
    <div className="px-4 lg:px-6 py-5 border-b border-border shrink-0">
      <div className="flex items-center justify-between mb-3.5">
        <div className="text-[13px] font-semibold flex items-center gap-2 text-foreground">
          <div className="w-[22px] h-[22px] rounded-[5px] bg-primary/10 border border-primary/30 flex items-center justify-center text-[11px]">
            ＋
          </div>
          Yeni Talep Oluştur
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((s) => (
            <div key={s} className={`h-[2px] w-7 rounded-[1px] transition-colors ${
              success ? "bg-primary/40" : s === step ? "bg-primary" : s < step ? "bg-primary/40" : "bg-border"
            }`} />
          ))}
        </div>
      </div>

      {!success ? (
        <>
          {step === 0 && (
            <div className="animate-fade-up">
              <div className="text-[12px] text-muted-foreground mb-2.5 font-medium">Hangi kategori?</div>
              {/* Hizmet Tipi Toggle */}
              <div className="flex rounded-[6px] border border-border overflow-hidden mb-3">
                <button
                  onClick={() => setHizmetTipi("satin_alma")}
                  className={`flex-1 py-1.5 text-[11px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-1 border-none ${
                    hizmetTipi === "satin_alma"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-border"
                  }`}
                >
                  📦 Satın Al
                </button>
                <button
                  onClick={() => setHizmetTipi("nakliye")}
                  className={`flex-1 py-1.5 text-[11px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-1 border-none border-l border-border ${
                    hizmetTipi === "nakliye"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-border"
                  }`}
                >
                  🚛 Nakliye
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCat(c.id)}
                    className={`bg-muted border rounded-lg p-2.5 cursor-pointer text-center transition-all ${
                      selectedCat === c.id
                        ? "border-primary bg-primary/10 shadow-[inset_0_0_0_1px_rgba(232,98,10,0.2)]"
                        : "border-border hover:border-muted-foreground/30 hover:bg-muted"
                    }`}
                  >
                    <div className="text-xl mb-1 flex items-center justify-center">{c.icon}</div>
                    <div className={`text-[10px] font-medium leading-tight ${selectedCat === c.id ? "text-foreground" : "text-muted-foreground"}`}>
                      {c.label}
                    </div>
                  </div>
                ))}
              </div>
              <button
                disabled={!selectedCat}
                onClick={() => setStep(1)}
                className="w-full h-[30px] rounded-[6px] bg-primary text-primary-foreground text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_16px_rgba(232,98,10,0.15)]"
              >
                Devam →
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-up">
              <div className="text-[12px] text-muted-foreground mb-2.5 font-medium">Detaylar</div>
              <div className="grid grid-cols-2 gap-2 mb-2.5">
                <div>
                  <label className={labelClass}>MALZEME</label>
                  <select value={material} onChange={(e) => { setMaterial(e.target.value); if (e.target.value !== "Diğer") setCustomMaterial(""); }} className={inputClass}>
                    <option value="">Seç…</option>
                    {(categoryMaterials[selectedCat] || []).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {material === "Diğer" && (
                    <input value={customMaterial} onChange={(e) => setCustomMaterial(e.target.value)} placeholder="Malzeme adını yazın…" className={`${inputClass} mt-1.5`} />
                  )}
                </div>

                <div>
                  <label className={labelClass}>MİKTAR</label>
                  <div className="flex items-center bg-muted border border-border rounded-[6px] overflow-hidden h-8 focus-within:border-primary">
                    <button onClick={() => setQuantity(String(Math.max(1, Number(quantity) - 10)))} className="w-8 h-full text-muted-foreground hover:bg-border transition-colors text-base">−</button>
                    <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="flex-1 bg-transparent text-center text-[12px] font-semibold font-mono text-foreground outline-none border-none" />
                    <button onClick={() => setQuantity(String(Number(quantity) + 10))} className="w-8 h-full text-muted-foreground hover:bg-border transition-colors text-base">+</button>
                    <select value={birim} onChange={(e) => setBirim(e.target.value)} className="px-1.5 text-[11px] text-muted-foreground border-l border-border font-mono h-full bg-transparent outline-none cursor-pointer">
                      {birimler.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>TESLİMAT İLİ</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className={inputClass}>
                    <option value="">Seç…</option>
                    {iller.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>TARİH</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
                </div>

                <div className="col-span-2">
                  <label className={labelClass}>ADRES (İlçe / Detay)</label>
                  <input value={adres} onChange={(e) => setAdres(e.target.value)} placeholder="Ör: Tuzla OSB, Fabrika girişi…" className={inputClass} />
                </div>

                <div className="col-span-2">
                  <label className={labelClass}>ACİLİYET</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {aciliyetler.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => setAciliyet(a.id)}
                        className={`bg-muted border rounded-[6px] px-2 py-1.5 cursor-pointer text-center transition-all text-[11px] font-medium ${
                          aciliyet === a.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-muted-foreground/30"
                        }`}
                      >
                        {a.icon} {a.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    onClick={() => setTekrarli(!tekrarli)}
                    className="flex items-center gap-2 cursor-pointer text-[11px] text-muted-foreground hover:text-foreground transition-colors select-none"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center text-[9px] transition-all ${
                      tekrarli ? "bg-primary border-primary text-primary-foreground" : "border-border bg-muted"
                    }`}>
                      {tekrarli && "✓"}
                    </div>
                    🔄 Bu talebi her ay otomatik tekrarla
                  </label>
                </div>

                <div className="col-span-2">
                  <label className={labelClass}>NOT</label>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Opsiyonel…" className={`${inputClass} resize-none`} />
                </div>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => setStep(0)} className="px-3 h-[30px] rounded-[6px] bg-transparent border border-border text-muted-foreground text-[11px] hover:border-primary hover:text-foreground transition-all">←</button>
                <button onClick={() => setStep(2)} className="flex-1 h-[30px] rounded-[6px] bg-primary text-primary-foreground text-[11px] font-semibold hover:opacity-90 transition-all shadow-[0_0_16px_rgba(232,98,10,0.15)]">
                  Özet →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <div className="text-[12px] text-muted-foreground mb-2.5 font-medium">Özet — doğru mu?</div>
              <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                {[
                  { k: "Hizmet", v: hizmetTipi === "nakliye" ? "🚛 Nakliye" : "📦 Satın Alma" },
                  { k: "Kategori", v: categories.find(c => c.id === selectedCat)?.label || "—" },
                  { k: "Malzeme", v: finalMaterial },
                  { k: "Miktar", v: quantity ? `${quantity} ${birim}` : "—" },
                  { k: "Konum", v: city ? (adres ? `${city}, ${adres}` : city) : "—" },
                  { k: "Tarih", v: date || "—" },
                  { k: "Aciliyet", v: aciliyetler.find(a => a.id === aciliyet)?.label || "Normal" },
                  ...(tekrarli ? [{ k: "Tekrar", v: "🔄 Aylık" }] : []),
                  { k: "Teklif", v: "Ücretsiz", orange: true },
                ].map((item, idx) => (
                  <div key={idx} className="bg-muted border border-border rounded-[6px] px-2.5 py-2">
                    <div className="text-[10px] text-muted-foreground mb-0.5">{item.k}</div>
                    <div className={`text-[12px] font-semibold font-mono ${"orange" in item && item.orange ? "text-primary" : "text-foreground"}`}>{item.v}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => setStep(1)} className="px-3 h-[30px] rounded-[6px] bg-transparent border border-border text-muted-foreground text-[11px] hover:border-primary hover:text-foreground transition-all">←</button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 h-[30px] rounded-[6px] bg-primary text-primary-foreground text-[11px] font-semibold hover:opacity-90 transition-all shadow-[0_0_16px_rgba(232,98,10,0.15)] disabled:opacity-50"
                >
                  {loading ? "Gönderiliyor..." : "✓ Gönder"}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="py-4 text-center animate-fade-up">
          <div className="w-14 h-14 rounded-full bg-green-50 border-[1.5px] border-green-300 flex items-center justify-center mx-auto mb-3 text-2xl animate-pop">
            ✓
          </div>
          <h4 className="text-sm font-semibold mb-1.5 text-foreground">Talep Alındı</h4>
          <p className="text-[11px] text-muted-foreground mb-3">15 dakika içinde fiyat teklifiniz hazırlanacak.</p>
          <div className="bg-muted border border-border rounded-[6px] px-3 py-2 flex justify-between items-center font-mono text-[11px] text-muted-foreground mb-2.5">
            <span>Takip No</span>
            <span className="text-primary text-[12px]">{talepNo}</span>
          </div>
          <button onClick={reset} className="w-full h-[30px] rounded-[6px] bg-muted border border-border text-muted-foreground text-[11px] font-medium hover:border-primary hover:text-primary transition-all">
            ＋ Yeni Talep
          </button>
        </div>
      )}
    </div>
  );
};

export default NewRequestWizard;
