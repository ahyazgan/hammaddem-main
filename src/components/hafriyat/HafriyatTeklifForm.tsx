import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { iller } from "@/constants/iller";
import { formatPhone, isValidPhone, cleanPhone } from "@/utils/phone";
import { HAFRIYAT_IS_TIPLERI } from "@/data/hafriyatData";

const birimler = ["m³", "Ton", "Kamyon"];

interface Props {
  /** Şehir sayfalarında ili önceden seçili getirir */
  defaultIl?: string;
  /** Form başlığı; lokasyon sayfalarında "Esenyurt'ta Hafriyat İşiniz mi Var?" gibi */
  baslik?: string;
  /** Hesaplama aracından gelen tahmini hacim */
  defaultMiktar?: number;
  /** "m³" | "Ton" | "Kamyon" */
  defaultBirim?: string;
}

const HafriyatTeklifForm = ({
  defaultIl = "",
  baslik = "Hafriyat İşiniz mi Var?",
  defaultMiktar = 100,
  defaultBirim = "m³",
}: Props) => {
  const { toast } = useToast();
  const [isTipi, setIsTipi] = useState("");
  const [il, setIl] = useState(defaultIl);
  const [konum, setKonum] = useState("");
  const [miktar, setMiktar] = useState(defaultMiktar);
  const [birim, setBirim] = useState(defaultBirim);
  const [tarih, setTarih] = useState("");
  const [telefon, setTelefon] = useState("");
  const [not_, setNot] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [talepNo, setTalepNo] = useState("");
  // Hesaplama aracı sayfasında kullanıcı ölçüleri değiştirdikçe miktar güncel kalsın;
  // ama kullanıcı miktarı kendi elle değiştirdiyse üzerine yazma.
  const [miktarElle, setMiktarElle] = useState(false);
  useEffect(() => {
    if (!miktarElle) setMiktar(defaultMiktar);
  }, [defaultMiktar, miktarElle]);

  const validate = () => {
    const errs: Record<string, boolean> = {};
    if (!isTipi) errs.isTipi = true;
    if (!il) errs.il = true;
    if (!telefon || !isValidPhone(telefon)) errs.telefon = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("misafir-talep", {
        body: {
          kategori: "hafriyat",
          malzeme: isTipi,
          miktar,
          birim,
          teslimat_ili: il,
          adres: konum ? `${il} / ${konum}` : il,
          teslimat_tarihi: tarih || null,
          aciliyet: "normal",
          hizmet_tipi: "nakliye",
          not_text: [`Hafriyat işi talebi (${isTipi})`, not_].filter(Boolean).join(" — "),
          telefon: cleanPhone(telefon),
        },
      });

      if (error) throw error;

      setTalepNo(data.talep_no);
      toast({ title: "Talebiniz alındı!", description: `${data.talep_no} numaralı talebiniz kaydedildi.` });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Talep gönderilemedi.";
      toast({ title: "Hata", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (talepNo) {
    return (
      <div className="w-full bg-background border border-border rounded-2xl shadow-elevated overflow-hidden">
        <div className="h-1 w-full bg-navy" />
        <div className="p-5 md:p-7 text-center">
          <div className="w-16 h-16 rounded-full bg-success-light border-2 border-success-border flex items-center justify-center mx-auto mb-3.5 text-[28px] animate-pop">
            ✓
          </div>
          <h3 className="text-lg font-bold tracking-tight mb-2">Talebiniz Alındı!</h3>
          <p className="text-[13px] text-txt-2 mb-4 leading-relaxed">
            Ekibimiz 30 dakika içinde sizi arayacak ve işinize özel net fiyat teklifini sunacak.
          </p>
          <div className="bg-off border border-border rounded-[10px] px-4 py-3 flex justify-between items-center">
            <span className="text-[13px] text-txt-2 font-medium">Takip Numaranız</span>
            <span className="font-mono font-bold text-navy text-sm">#{talepNo}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background border border-border rounded-2xl shadow-elevated overflow-hidden">
      <div className="h-1 w-full bg-navy" />
      <div className="p-5 md:p-7">
        <h3 className="text-base md:text-lg font-bold tracking-tight mb-1">{baslik}</h3>
        <p className="text-[12px] md:text-[13px] text-txt-2 mb-4">
          İşinizi bildirin, 30 dakika içinde net fiyat teklifi verelim. Kayıt gerekmez.
        </p>

        {/* İş tipi */}
        <div className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase mb-[7px]">
          İş Tipi <span className="text-destructive">*</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-1">
          {HAFRIYAT_IS_TIPLERI.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setIsTipi(t); setErrors((e) => ({ ...e, isTipi: false })); }}
              className={`px-3 py-1.5 rounded-full border-[1.5px] text-xs font-medium cursor-pointer bg-background transition-all ${
                isTipi === t
                  ? "border-navy bg-navy-light text-navy font-semibold"
                  : "border-border text-txt-2 hover:border-border2 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.isTipi && <div className="text-[11px] text-destructive font-medium mb-2">⚠ Lütfen iş tipini seçin.</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 mb-3">
          {/* İl */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">
              İl <span className="text-destructive">*</span>
            </label>
            <select
              value={il}
              onChange={(e) => { setIl(e.target.value); setErrors((er) => ({ ...er, il: false })); }}
              className={`py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-[13px] text-foreground outline-none transition-all appearance-none cursor-pointer focus:border-navy focus:bg-background focus:shadow-[0_0_0_3px_rgba(15,35,71,.08)] ${errors.il ? "border-destructive bg-destructive/5" : ""}`}
            >
              <option value="">Seçiniz…</option>
              {iller.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
            {errors.il && <div className="text-[11px] text-destructive font-medium">⚠ Lütfen il seçin.</div>}
          </div>

          {/* İlçe / konum */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">İlçe / Konum</label>
            <input
              type="text"
              value={konum}
              onChange={(e) => setKonum(e.target.value)}
              placeholder="Örn: Esenyurt, şantiye adresi"
              className="py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-[13px] text-foreground outline-none transition-all placeholder:text-txt-3 focus:border-navy focus:bg-background focus:shadow-[0_0_0_3px_rgba(15,35,71,.08)]"
            />
          </div>

          {/* Miktar */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">Tahmini Miktar</label>
            <div className="flex border-[1.5px] border-border rounded-[9px] overflow-hidden bg-off transition-all focus-within:bg-background focus-within:border-navy focus-within:shadow-[0_0_0_3px_rgba(15,35,71,.08)]">
              <button type="button" onClick={() => { setMiktarElle(true); setMiktar(Math.max(1, miktar - 25)); }} className="w-[38px] h-10 border-none bg-transparent text-txt-2 cursor-pointer text-lg flex items-center justify-center hover:bg-border">−</button>
              <input
                type="number"
                value={miktar}
                onChange={(e) => { setMiktarElle(true); setMiktar(Math.max(1, Number(e.target.value) || 1)); }}
                className="flex-1 min-w-0 border-none bg-transparent text-center text-sm font-semibold text-foreground font-mono outline-none"
              />
              <button type="button" onClick={() => { setMiktarElle(true); setMiktar(miktar + 25); }} className="w-[38px] h-10 border-none bg-transparent text-txt-2 cursor-pointer text-lg flex items-center justify-center hover:bg-border">+</button>
              <select
                value={birim}
                onChange={(e) => setBirim(e.target.value)}
                className="px-3 text-xs text-txt-3 border-l-[1.5px] border-border cursor-pointer whitespace-nowrap font-medium bg-off hover:bg-off2 hover:text-foreground transition-all appearance-none text-center"
              >
                {birimler.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Tarih */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">Başlangıç Tarihi</label>
            <input
              type="date"
              value={tarih}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setTarih(e.target.value)}
              className="py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-[13px] text-foreground outline-none transition-all focus:border-navy focus:bg-background focus:shadow-[0_0_0_3px_rgba(15,35,71,.08)]"
            />
          </div>

          {/* Telefon */}
          <div className="flex flex-col gap-[5px] sm:col-span-2">
            <label className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">
              Telefon <span className="text-destructive">*</span>
            </label>
            <input
              type="tel"
              value={telefon}
              onChange={(e) => { setTelefon(formatPhone(e.target.value)); setErrors((er) => ({ ...er, telefon: false })); }}
              placeholder="05XX XXX XXXX"
              maxLength={13}
              className={`py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-[13px] text-foreground outline-none transition-all placeholder:text-txt-3 focus:border-navy focus:bg-background focus:shadow-[0_0_0_3px_rgba(15,35,71,.08)] ${errors.telefon ? "border-destructive bg-destructive/5" : ""}`}
            />
            {errors.telefon && <div className="text-[11px] text-destructive font-medium">⚠ Geçerli bir telefon numarası girin (05XX XXX XXXX)</div>}
          </div>

          {/* Not */}
          <div className="flex flex-col gap-[5px] sm:col-span-2">
            <label className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">İş Detayı / Not</label>
            <textarea
              value={not_}
              onChange={(e) => setNot(e.target.value)}
              placeholder="Örn: 3 katlı bina temel kazısı, zemin killi, döküm dahil fiyat istiyorum…"
              rows={2}
              className="py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-[13px] text-foreground outline-none transition-all placeholder:text-txt-3 focus:border-navy focus:bg-background focus:shadow-[0_0_0_3px_rgba(15,35,71,.08)] resize-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 md:py-3.5 rounded-[10px] bg-navy text-primary-foreground text-sm font-bold border-none cursor-pointer transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Gönderiliyor..." : "✓ Ücretsiz Fiyat Teklifi Al"}
        </button>
        <p className="text-[11px] text-txt-3 text-center mt-2.5">
          Telefonunuza 30 dakika içinde net fiyat iletiyoruz · Kayıt gerekmez
        </p>
      </div>
    </div>
  );
};

export default HafriyatTeklifForm;
