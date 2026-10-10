import { useQuoteAnalytics } from "@/hooks/use-quote-analytics";
import { useEffect, useId, useRef, useState } from "react";
import { Package, Info, Smartphone, Clock3, Check, AlertCircle } from "lucide-react";
import { BulkTruckIcon } from "@/components/brand/BrandIcon";
import { useNavigate } from "react-router-dom";
import { submitGuestRequest, isValidQuantity, isValidDeliveryDate, todayInTurkey } from "@/lib/guest-request";
import { useToast } from "@/hooks/use-toast";
import { iller } from "@/constants/iller";
import { formatPhone, isValidPhone, cleanPhone } from "@/utils/phone";
import SilobasIcon from "@/components/SilobasIcon";
import HafriyatIcon from "@/components/HafriyatIcon";

const silobasMalzemeler = ["Çimento", "Alçı", "Kireç", "Kalsit", "Mermer Tozu", "Silis Kumu", "Perlit", "Kül", "Curuf", "Diğer"];
const hafriyatMalzemeler = ["Kum", "Çakıl", "Mıcır", "Kırma Taş", "Moloz", "Toprak", "Stabilize", "Dolgu Malzemesi", "Balast", "Diğer"];

type YukTipi = "silobas" | "hafriyat" | "";
type HizmetTipi = "satin_alma" | "nakliye";

const aciliyetler = [
  { id: "normal", label: "Normal", color: "bg-emerald-600" },
  { id: "acil", label: "Acil", color: "bg-amber-500" },
  { id: "cok_acil", label: "Çok Acil", color: "bg-red-600" },
];

const birimler = ["Ton", "m³", "Adet"];

const OrderCard = () => {
  const fieldId = useId();
  const submitting = useRef(false);
  const card = useRef<HTMLDivElement>(null);
  const previousStep = useRef(1);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [hizmetTipi, setHizmetTipi] = useState<HizmetTipi>("satin_alma");
  const [yukTipi, setYukTipi] = useState<YukTipi>("");
  const [malzeme, setMalzeme] = useState("");
  const [yukAdres, setYukAdres] = useState("");
  const [adres, setAdres] = useState("");
  const [miktar, setMiktar] = useState<number | string>(25);
  const [birim, setBirim] = useState("Ton");
  const [il, setIl] = useState("");
  const [tarih, setTarih] = useState("");
  const [telefon, setTelefon] = useState("");
  const [not_, setNot] = useState("");
  const [aciliyet, setAciliyet] = useState("normal");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [talepNo, setTalepNo] = useState("");
  const analytics = useQuoteAnalytics("order", step);

  useEffect(() => {
    if (previousStep.current !== step) card.current?.scrollIntoView?.({ block: "start", behavior: "smooth" });
    previousStep.current = step;
  }, [step]);

  const colorClass = yukTipi === "silobas" ? "orange" : yukTipi === "hafriyat" ? "navy" : "";
  const malzemeler = yukTipi === "silobas" ? silobasMalzemeler : yukTipi === "hafriyat" ? hafriyatMalzemeler : [];

  const validateStep2 = () => {
    const errs: Record<string, boolean> = {};
    if (!malzeme) errs.malzeme = true;
    if (!il) errs.il = true;
    if (!telefon || !isValidPhone(telefon)) errs.telefon = true;
    if (hizmetTipi === "nakliye" && !yukAdres.trim()) errs.yukAdres = true;
    if (!adres.trim()) errs.adres = true;
    if (!isValidQuantity(miktar)) errs.miktar = true;
    if (!isValidDeliveryDate(tarih)) errs.tarih = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (submitting.current) return;
    if (!validateStep2()) { setStep(2); return; }
    submitting.current = true;
    setLoading(true);
    analytics.submit();
    try {
      const receipt = await submitGuestRequest({
        kategori: yukTipi,
        malzeme,
        miktar: Number(miktar),
        birim,
        teslimat_ili: il,
        adres: adres.trim(),
        yuk_adres: hizmetTipi === "nakliye" ? yukAdres.trim() : null,
        teslimat_tarihi: tarih || null,
        aciliyet,
        hizmet_tipi: hizmetTipi,
        not_text: not_,
        telefon: cleanPhone(telefon),
      });
      analytics.success();
      setTalepNo(receipt);
      setShowSuccess(true);
      setStep(4);
      toast({ title: "Talep alındı!", description: `${receipt} numaralı talebiniz kaydedildi.` });
    } catch (err) {
      analytics.error();
      const mesaj = err instanceof Error && err.message ? err.message : "Talep gönderilemedi.";
      toast({ title: "Hata", description: mesaj, variant: "destructive" });
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  const resetForm = () => {
    analytics.reset();
    setStep(1);
    setHizmetTipi("satin_alma");
    setYukTipi("");
    setMalzeme("");
    setYukAdres("");
    setAdres("");
    setMiktar(25);
    setBirim("Ton");
    setIl("");
    setTarih("");
    setTelefon("");
    setNot("");
    setAciliyet("normal");
    setShowSuccess(false);
    setErrors({});
    setLoading(false);
    setTalepNo("");
  };

  const topbarColor = colorClass === "orange"
    ? "bg-primary"
    : colorClass === "navy"
    ? "bg-navy"
    : "bg-border";

  return (
    <div onClickCapture={analytics.start} onChangeCapture={analytics.start} ref={card} id="siparis-formu" className="scroll-mt-24 w-full max-w-[760px] bg-background border border-border rounded-xl sm:rounded-2xl md:rounded-[20px] shadow-elevated overflow-hidden animate-fade-up" style={{ animationDelay: '.18s' }}>
      {/* Top color bar */}
      <div className={`h-1 w-full transition-colors duration-400 ${topbarColor}`} />

      {/* Card header */}
      <div className="px-3 sm:px-4 md:px-7 pt-3 sm:pt-4 md:pt-[18px] flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
        <div className="text-[12px] sm:text-[13px] font-semibold text-txt-2 flex items-center gap-1.5">
          <Package size={16} className="text-primary" aria-hidden="true" /> Sipariş Oluştur
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-off2 text-txt-3 font-mono">
            MİSAFİR
          </span>
        </div>

        {/* Step track */}
        <div className="flex items-center gap-1 md:gap-1.5">
          {[
            { num: 1, label: "Yük Tipi" },
            { num: 2, label: "Detaylar" },
            { num: 3, label: "Gönder" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-1 md:gap-[5px]">
              <div
                className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center text-[9px] font-bold font-mono transition-all ${
                  step > s.num
                    ? "bg-success border-success text-primary-foreground"
                    : step === s.num
                    ? colorClass === "orange"
                      ? "border-primary text-primary"
                      : colorClass === "navy"
                      ? "border-navy text-navy"
                      : "border-border2 text-txt-3"
                    : "border-border2 text-txt-3"
                }`}
              >
                {step > s.num ? <Check size={12} aria-hidden="true" /> : s.num}
              </div>
              <span className={`text-[10px] font-medium transition-colors hidden sm:inline ${step === s.num ? "text-foreground" : "text-txt-3"}`}>
                {s.label}
              </span>
              {i < 2 && <div className="w-3 md:w-5 h-px bg-border2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="px-3 sm:px-4 md:px-7 pt-3 sm:pt-4 md:pt-5 pb-4 sm:pb-5 md:pb-7">
        {/* Step 1 - Type Select */}
        {step === 1 && (
          <div className="animate-step-in">
            <h3 className="text-[15px] sm:text-base md:text-[19px] font-bold tracking-tight mb-1">Ne taşıtmak istiyorsunuz?</h3>
            <p className="text-[12px] sm:text-[13px] text-txt-2 mb-3 sm:mb-4 md:mb-[18px]">Hizmet tipini ve yük kategorisini seçin.</p>

            {/* Hizmet Tipi Toggle */}
            <div className="flex rounded-[10px] border-[1.5px] border-border overflow-hidden mb-3 sm:mb-4 md:mb-[18px]">
              <button
                onClick={() => setHizmetTipi("satin_alma")}
                className={`flex-1 py-2.5 text-xs sm:text-[13px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5 border-none ${
                  hizmetTipi === "satin_alma"
                    ? "bg-primary text-primary-foreground"
                    : "bg-off text-txt-2 hover:bg-off2"
                }`}
              >
                <Package size={16} aria-hidden="true" /> Malzeme Satın Al
              </button>
              <button
                onClick={() => setHizmetTipi("nakliye")}
                className={`flex-1 py-2.5 text-xs sm:text-[13px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5 border-none border-l-[1.5px] border-border ${
                  hizmetTipi === "nakliye"
                    ? "bg-primary text-primary-foreground"
                    : "bg-off text-txt-2 hover:bg-off2"
                }`}
              >
                <BulkTruckIcon className="h-5 w-6" aria-hidden="true" /> Sadece Nakliye
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 md:mb-[18px]">
              {/* Silobas */}
              <button
                onClick={() => { setYukTipi("silobas"); setMalzeme(""); }}
                className={`relative border-2 rounded-xl sm:rounded-[14px] p-3 sm:p-4 md:p-5 cursor-pointer transition-all text-left bg-background ${
                  yukTipi === "silobas"
                    ? "border-primary bg-accent-light shadow-[0_0_0_3px_rgba(232,98,10,.1)] -translate-y-0.5 shadow-card"
                    : "border-border hover:shadow-card hover:-translate-y-0.5"
                }`}
              >
                <div className={`absolute top-3 right-3 md:top-3.5 md:right-3.5 w-[22px] h-[22px] rounded-full flex items-center justify-center text-primary-foreground text-[11px] font-bold transition-all ${
                  yukTipi === "silobas" ? "opacity-100 scale-100 bg-primary" : "opacity-0 scale-[.4]"
                }`}><Check size={14} aria-hidden="true" /></div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] rounded-[10px] sm:rounded-[11px] flex items-center justify-center text-lg sm:text-xl md:text-2xl mb-1.5 sm:mb-2 md:mb-3 bg-accent-light transition-transform hover:scale-105"><SilobasIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" /></div>
                <div className="text-[13px] sm:text-sm md:text-base font-bold tracking-tight mb-0.5 sm:mb-1">Silobas Yükü</div>
                <div className="text-[10px] sm:text-[11px] md:text-xs text-txt-2 leading-relaxed mb-1.5 sm:mb-2 md:mb-3">
                  Toz ve granül malzemelerin kapalı sistem silobas araçlarıyla taşınması.
                </div>
                <div className="flex flex-wrap gap-1">
                  {["Çimento", "Alçı", "Kireç", "Kalsit", "Kül", "+5"].map((t) => (
                    <span key={t} className={`px-2 py-[3px] rounded text-[10px] font-semibold border ${
                      yukTipi === "silobas"
                        ? "bg-accent-light/50 text-primary border-accent-border"
                        : "bg-off2 text-txt-3 border-border"
                    }`}>{t}</span>
                  ))}
                </div>
              </button>

              {/* Hafriyat */}
              <button
                onClick={() => { setYukTipi("hafriyat"); setMalzeme(""); }}
                className={`relative border-2 rounded-xl sm:rounded-[14px] p-3 sm:p-4 md:p-5 cursor-pointer transition-all text-left bg-background ${
                  yukTipi === "hafriyat"
                    ? "border-navy bg-navy-light shadow-[0_0_0_3px_rgba(15,35,71,.1)] -translate-y-0.5 shadow-card"
                    : "border-border hover:shadow-card hover:-translate-y-0.5"
                }`}
              >
                <div className={`absolute top-3 right-3 md:top-3.5 md:right-3.5 w-[22px] h-[22px] rounded-full flex items-center justify-center text-primary-foreground text-[11px] font-bold transition-all ${
                  yukTipi === "hafriyat" ? "opacity-100 scale-100 bg-navy" : "opacity-0 scale-[.4]"
                }`}><Check size={14} aria-hidden="true" /></div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] rounded-[10px] sm:rounded-[11px] flex items-center justify-center text-lg sm:text-xl md:text-2xl mb-1.5 sm:mb-2 md:mb-3 bg-navy-light transition-transform hover:scale-105"><HafriyatIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" /></div>
                <div className="text-[13px] sm:text-sm md:text-base font-bold tracking-tight mb-0.5 sm:mb-1">Hafriyat & İnşaat</div>
                <div className="text-[10px] sm:text-[11px] md:text-xs text-txt-2 leading-relaxed mb-1.5 sm:mb-2 md:mb-3">
                  Kum, çakıl, mıcır ve kırma taş gibi ağır yüklerin açık damperli araçlarla taşınması.
                </div>
                <div className="flex flex-wrap gap-1">
                  {["Kum", "Çakıl", "Mıcır", "Stabilize", "Toprak", "+5"].map((t) => (
                    <span key={t} className={`px-2 py-[3px] rounded text-[10px] font-semibold border ${
                      yukTipi === "hafriyat"
                        ? "bg-navy-light/50 text-navy border-navy-border"
                        : "bg-off2 text-txt-3 border-border"
                    }`}>{t}</span>
                  ))}
                </div>
              </button>
            </div>

            <div className="flex items-start gap-[9px] px-3 py-2.5 rounded-[9px] bg-off2 border border-border text-[11px] md:text-xs text-txt-2 leading-relaxed mb-4 md:mb-[18px]">
              <Info size={17} className="shrink-0 text-primary mt-px" aria-hidden="true" />
              Kayıt gerekmez. Misafir olarak sipariş oluşturabilirsiniz — telefon numaranıza teklif iletiyoruz.
            </div>

            <button
              disabled={!yukTipi}
              onClick={() => setStep(2)}
              className={`w-full py-3 md:py-3.5 rounded-[10px] text-primary-foreground text-sm md:text-[15px] font-bold border-none cursor-pointer transition-all flex items-center justify-center gap-2 disabled:bg-border2 disabled:text-txt-3 disabled:shadow-none disabled:cursor-not-allowed ${
                yukTipi === "silobas"
                  ? "bg-primary shadow-[0_4px_16px_rgba(232,98,10,.28)] hover:bg-accent-hover hover:shadow-[0_6px_24px_rgba(232,98,10,.38)] hover:-translate-y-px"
                  : yukTipi === "hafriyat"
                  ? "bg-navy shadow-[0_4px_16px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:shadow-[0_6px_24px_rgba(15,35,71,.35)] hover:-translate-y-px"
                  : ""
              }`}
            >
              Devam Et →
            </button>
          </div>
        )}

        {/* Step 2 - Details Form */}
        {step === 2 && (
          <div className="animate-step-in">
            <div className="flex items-center gap-2.5 mb-4 md:mb-[18px]">
              <div className={`w-9 h-9 md:w-[38px] md:h-[38px] rounded-[9px] flex items-center justify-center text-lg ${
                colorClass === "orange" ? "bg-accent-light" : "bg-navy-light"
              }`}>
                {yukTipi === "silobas" ? <SilobasIcon className="w-5 h-5" /> : <HafriyatIcon className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold tracking-tight">
                  {yukTipi === "silobas" ? "Silobas Yükü" : "Hafriyat & İnşaat"} Detayları
                </h3>
                <p className="text-[11px] md:text-xs text-txt-2">
                  {hizmetTipi === "nakliye" ? "Taşınacak malzeme ve güzergah bilgilerini girin." : "Malzeme bilgilerini girin, size en uygun teklifi hazırlayalım."}
                </p>
              </div>
            </div>

            {/* Material chips */}
            <div className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase mb-[7px]">
              {hizmetTipi === "nakliye" ? "Taşınacak Malzeme *" : "Malzeme / Ürün *"}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
              {malzemeler.map((m) => (
                <button
                  key={m}
                  onClick={() => { setMalzeme(m); setErrors(e => ({ ...e, malzeme: false })); }}
                  className={`px-3 py-1.5 rounded-full border-[1.5px] text-xs font-medium cursor-pointer bg-background transition-all ${
                    malzeme === m
                      ? colorClass === "orange"
                        ? "border-primary bg-accent-light text-primary font-semibold"
                        : "border-navy bg-navy-light text-navy font-semibold"
                      : "border-border text-txt-2 hover:border-border2 hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            {errors.malzeme && <div className="text-[11px] text-destructive font-medium mb-3"><AlertCircle size={12} className="inline mr-1" aria-hidden="true" /> Lütfen bir malzeme seçin.</div>}

            {/* Form grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {/* Yükleme Adresi - only for nakliye */}
              {hizmetTipi === "nakliye" && (
                <div className="flex flex-col gap-[5px] sm:col-span-2">
                  <label htmlFor={fieldId + "-yukAdres"} className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">
                    Yükleme Adresi <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id={fieldId + "-yukAdres"} maxLength={500} aria-invalid={!!errors.yukAdres}
                    value={yukAdres}
                    onChange={(e) => { setYukAdres(e.target.value); setErrors(er => ({ ...er, yukAdres: false })); }}
                    placeholder="Malzemenin yükleneceği adres / konum"
                    className={`py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-base sm:text-[13px] text-foreground outline-none transition-all placeholder:text-txt-3 focus:border-primary focus:bg-background focus:shadow-[0_0_0_3px_rgba(232,98,10,.08)] ${errors.yukAdres ? "border-destructive bg-destructive/5" : ""}`}
                  />
                  {errors.yukAdres && <div className="text-[11px] text-destructive font-medium"><AlertCircle size={12} className="inline mr-1" aria-hidden="true" /> Lütfen yükleme adresini girin.</div>}
                </div>
              )}
              {/* Miktar */}
              <div className="flex flex-col gap-[5px]">
                <label htmlFor={fieldId + "-miktar"} className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">
                  Miktar <span className="text-destructive">*</span>
                </label>
                <div className={`flex border-[1.5px] border-border rounded-[9px] overflow-hidden bg-off transition-all focus-within:bg-background ${
                  colorClass === "orange" ? "focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(232,98,10,.08)]" : "focus-within:border-navy focus-within:shadow-[0_0_0_3px_rgba(15,35,71,.08)]"
                }`}>
                  <button onClick={() => setMiktar(Math.max(1, Number(miktar) - 5))} className="w-[38px] h-10 border-none bg-transparent text-txt-2 cursor-pointer text-lg flex items-center justify-center hover:bg-border">−</button>
                  <input
                    type="number"
                    id={fieldId + "-miktar"} min="0" step="any" inputMode="decimal" aria-invalid={!!errors.miktar}
                    value={miktar}
                    onChange={(e) => { setMiktar(e.target.value); setErrors(er => ({ ...er, miktar: false })); }}
                    className="flex-1 min-w-0 border-none bg-transparent text-center text-base sm:text-sm font-semibold text-foreground font-mono outline-none"
                  />
                  <button onClick={() => setMiktar(Number(miktar) + 5)} className="w-[38px] h-10 border-none bg-transparent text-txt-2 cursor-pointer text-lg flex items-center justify-center hover:bg-border">+</button>
                  <select
                    aria-label="Miktar birimi"
                    value={birim}
                    onChange={(e) => setBirim(e.target.value)}
                    className="px-3 text-xs text-txt-3 border-l-[1.5px] border-border cursor-pointer flex items-center whitespace-nowrap font-medium bg-off hover:bg-off2 hover:text-foreground transition-all appearance-none text-center"
                  >
                    {birimler.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {errors.miktar && <p className="text-xs text-destructive">Miktar sıfırdan büyük olmalıdır.</p>}
              {/* İl */}
              <div className="flex flex-col gap-[5px]">
                <label htmlFor={fieldId + "-il"} className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">
                  Teslimat İli <span className="text-destructive">*</span>
                </label>
                <select
                  id={fieldId + "-il"} autoComplete="address-level1" aria-invalid={!!errors.il}
                  value={il}
                  onChange={(e) => { setIl(e.target.value); setErrors(er => ({ ...er, il: false })); }}
                  className={`py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-base sm:text-[13px] text-foreground outline-none transition-all appearance-none cursor-pointer focus:border-primary focus:bg-background focus:shadow-[0_0_0_3px_rgba(232,98,10,.08)] ${errors.il ? "border-destructive bg-destructive/5" : ""}`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239aa3b2' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '32px'
                  }}
                >
                  <option value="">Seçiniz…</option>
                  {iller.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
                {errors.il && <div className="text-[11px] text-destructive font-medium"><AlertCircle size={12} className="inline mr-1" aria-hidden="true" /> Lütfen bir il seçin.</div>}
              </div>

              <div className="flex flex-col gap-[5px] sm:col-span-2">
                <label htmlFor={fieldId + "-adres"} className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">Teslimat Adresi <span className="text-destructive">*</span></label>
                <textarea id={fieldId + "-adres"} value={adres} maxLength={500} rows={2} autoComplete="street-address" aria-invalid={!!errors.adres}
                  onChange={e => { setAdres(e.target.value); setErrors(er => ({ ...er, adres: false })); }}
                  placeholder="İlçe, mahalle, sokak ve şantiye / tesis bilgisi"
                  className="py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-base sm:text-[13px] text-foreground outline-none focus:border-primary resize-none" />
                {errors.adres && <p className="text-[11px] text-destructive">Lütfen teslimat adresini girin.</p>}
              </div>
              {/* Tarih */}
              <div className="flex flex-col gap-[5px]">
                <label htmlFor={fieldId + "-tarih"} className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">İstenen Tarih</label>
                <input
                  type="date"
                  id={fieldId + "-tarih"} aria-invalid={!!errors.tarih}
                  value={tarih}
                  min={todayInTurkey()}
                  onChange={(e) => { setTarih(e.target.value); setErrors(er => ({ ...er, tarih: false })); }}
                  className="py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-base sm:text-[13px] text-foreground outline-none transition-all focus:border-primary focus:bg-background focus:shadow-[0_0_0_3px_rgba(232,98,10,.08)]"
                />
              </div>

              {errors.tarih && <p className="text-xs text-destructive">Bugün veya sonraki bir tarih seçin.</p>}
              {/* Telefon */}
              <div className="flex flex-col gap-[5px]">
                <label htmlFor={fieldId + "-telefon"} className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">
                  Telefon <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  id={fieldId + "-telefon"} autoComplete="tel" aria-invalid={!!errors.telefon}
                  value={telefon}
                  onChange={(e) => { setTelefon(formatPhone(e.target.value)); setErrors(er => ({ ...er, telefon: false })); }}
                  placeholder="05XX XXX XXXX"
                  maxLength={25}
                  className={`py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-base sm:text-[13px] text-foreground outline-none transition-all placeholder:text-txt-3 focus:border-primary focus:bg-background focus:shadow-[0_0_0_3px_rgba(232,98,10,.08)] ${errors.telefon ? "border-destructive bg-destructive/5" : ""}`}
                />
                {errors.telefon && <div className="text-[11px] text-destructive font-medium"><AlertCircle size={12} className="inline mr-1" aria-hidden="true" /> Geçerli bir telefon numarası girin (05XX XXX XXXX)</div>}
              </div>

              {/* Aciliyet */}
              <div className="flex flex-col gap-[5px] sm:col-span-2">
                <label className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">Aciliyet</label>
                <div className="grid grid-cols-3 gap-2">
                  {aciliyetler.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAciliyet(a.id)}
                      className={`py-2 rounded-[9px] border-[1.5px] text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                        aciliyet === a.id
                          ? colorClass === "orange"
                            ? "border-primary bg-accent-light text-primary font-semibold"
                            : "border-navy bg-navy-light text-navy font-semibold"
                          : "border-border bg-off text-txt-2 hover:border-border2"
                      }`}
                    >
                      <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${a.color}`} /> {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Not */}
              <div className="flex flex-col gap-[5px] sm:col-span-2">
                <label htmlFor={fieldId + "-not"} className="text-[11px] font-semibold text-txt-2 tracking-wider uppercase">Ek Not</label>
                <textarea
                  id={fieldId + "-not"} maxLength={2000}
                  value={not_}
                  onChange={(e) => setNot(e.target.value)}
                  placeholder="Varsa ek bilgi..."
                  rows={2}
                  className="py-2.5 px-3.5 bg-off border-[1.5px] border-border rounded-[9px] text-base sm:text-[13px] text-foreground outline-none transition-all placeholder:text-txt-3 focus:border-primary focus:bg-background focus:shadow-[0_0_0_3px_rgba(232,98,10,.08)] resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 mt-1">
              <button onClick={() => setStep(1)} className="py-3 px-4 md:px-5 rounded-[10px] bg-transparent border-[1.5px] border-border2 text-txt-2 text-[13px] font-semibold cursor-pointer transition-all hover:text-foreground">
                ← Geri
              </button>
              <button
                onClick={() => { if (validateStep2()) setStep(3); }}
                className={`flex-1 py-3 rounded-[10px] text-primary-foreground text-[13px] font-bold border-none cursor-pointer transition-all flex items-center justify-center gap-2 ${
                  colorClass === "orange"
                    ? "bg-primary shadow-[0_4px_16px_rgba(232,98,10,.28)] hover:bg-accent-hover hover:-translate-y-px"
                    : "bg-navy shadow-[0_4px_16px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px"
                }`}
              >
                Özete Git →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Summary */}
        {step === 3 && (
          <div className="animate-step-in">
            <h3 className="text-sm md:text-base font-bold tracking-tight mb-3.5">Talebinizi Onaylayın</h3>
            <div className="bg-off border border-border rounded-xl overflow-hidden mb-3.5">
              {[
                { key: "Hizmet", val: hizmetTipi === "nakliye" ? "Sadece Nakliye" : "Satın Alma" },
                { key: "Yük Tipi", val: yukTipi === "silobas" ? "Silobas" : "Hafriyat" },
                { key: hizmetTipi === "nakliye" ? "Taşınacak Malzeme" : "Malzeme", val: malzeme },
                { key: "Miktar", val: `${miktar} ${birim}` },
                ...(hizmetTipi === "nakliye" && yukAdres ? [{ key: "Yükleme Adresi", val: yukAdres }] : []),
                { key: "Teslimat İli", val: il },
                { key: "Teslimat Adresi", val: adres.trim() },
                ...(tarih ? [{ key: "İstenen Tarih", val: new Date(tarih + "T12:00:00").toLocaleDateString("tr-TR") }] : []),
                ...(not_.trim() ? [{ key: "Ek Not", val: not_.trim() }] : []),
                { key: "Aciliyet", val: aciliyetler.find(a => a.id === aciliyet)?.label },
                { key: "Telefon", val: telefon },
                { key: "Ücret", val: "Ücretsiz teklif", isFree: true },
              ].map((row) => (
                <div key={row.key} className="flex justify-between items-start gap-4 px-3 md:px-4 py-2.5 border-b border-border last:border-b-0 text-[12px] md:text-[13px]">
                  <span className="text-txt-2 font-medium shrink-0">{row.key}</span>
                  <span className={`min-w-0 break-words text-right font-semibold font-mono text-[11px] md:text-xs ${row.isFree ? "text-success text-[13px]" : "text-foreground"}`}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            <div className={`flex gap-2.5 p-3 rounded-[10px] text-[11px] md:text-xs text-txt-2 leading-relaxed mb-3.5 ${
              colorClass === "orange" ? "bg-accent-light border border-accent-border" : "bg-navy-light border border-navy-border"
            }`}>
              <Clock3 size={18} className="shrink-0 text-primary" aria-hidden="true" />
              Talebiniz kaydedildikten sonra ekibimiz malzeme, adres ve miktar bilgilerini değerlendirerek sizinle iletişime geçer.
            </div>

            <div className="flex gap-2.5">
              <button onClick={() => setStep(2)} className="py-3 px-4 md:px-5 rounded-[10px] bg-transparent border-[1.5px] border-border2 text-txt-2 text-[13px] font-semibold cursor-pointer transition-all hover:text-foreground">
                ← Geri
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex-1 py-3 rounded-[10px] text-primary-foreground text-[13px] font-bold border-none cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  colorClass === "orange"
                    ? "bg-primary shadow-[0_4px_16px_rgba(232,98,10,.28)] hover:bg-accent-hover hover:-translate-y-px"
                    : "bg-navy shadow-[0_4px_16px_rgba(15,35,71,.25)] hover:bg-navy-hover hover:-translate-y-px"
                }`}
              >
                {!loading && <Check size={16} aria-hidden="true" />}{loading ? "Gönderiliyor..." : "Talebi Gönder"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4 - Success */}
        {step === 4 && showSuccess && (
          <div className="text-center py-3">
            <div className="w-16 h-16 md:w-[70px] md:h-[70px] rounded-full bg-success-light border-2 border-success-border flex items-center justify-center mx-auto mb-3.5 text-[28px] md:text-[30px] animate-pop">
              <Check size={30} className="text-success" aria-hidden="true" />
            </div>
            <h3 className="text-lg md:text-xl font-bold tracking-tight mb-2">Talebiniz Alındı!</h3>
            <p className="text-[12px] md:text-[13px] text-txt-2 mb-4 md:mb-[18px] leading-relaxed">
              Ekibimiz talep detaylarını değerlendirecek ve<br />
              işinize özel fiyat teklifi için sizinle iletişime geçecektir.
            </p>

            <div className="bg-off border border-border rounded-[10px] px-3 md:px-4 py-3 flex justify-between items-center mb-3.5">
              <span className="text-[12px] md:text-[13px] text-txt-2 font-medium">Takip Numaranız</span>
              <span className="font-mono font-bold text-primary text-sm">
                #{talepNo}
              </span>
            </div>

            <button onClick={() => navigate("/talep-takip?talep=" + encodeURIComponent(talepNo))} className="w-full py-3 mb-3 rounded-lg bg-primary text-primary-foreground font-semibold">Talebimi Takip Et →</button>

            <div className="border-[1.5px] border-accent-border bg-accent-light rounded-xl p-4 text-left mb-3">
              <h4 className="text-[13px] font-bold text-primary mb-1"><Smartphone size={15} className="inline mr-1.5" aria-hidden="true" /> Siparişinizi panelden takip edin</h4>
              <p className="text-[11px] md:text-xs text-txt-2 leading-relaxed mb-3">
                Hesap oluşturarak tüm siparişlerinizi gerçek zamanlı takip edebilir, dijital irsaliyelerinize anında ulaşabilirsiniz.
              </p>
              <button onClick={() => navigate("/kayit")} className="w-full py-[11px] rounded-lg bg-primary text-primary-foreground text-[13px] font-bold border-none cursor-pointer transition-all hover:bg-accent-hover">
                Ücretsiz Hesap Oluştur →
              </button>
            </div>

            <button
              onClick={resetForm}
              className="w-full py-2.5 rounded-lg bg-transparent border-[1.5px] border-border2 text-txt-2 text-[13px] font-semibold cursor-pointer transition-all hover:text-foreground"
            >
              + Yeni Talep Oluştur
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
