import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Search, Package, Clock, CheckCircle, Truck, X } from "lucide-react";

interface TalepSonuc {
  id: string;
  talep_no: string;
  kategori: string;
  malzeme: string | null;
  miktar: number;
  birim: string;
  teslimat_ili: string | null;
  teslimat_tarihi: string | null;
  durum: string;
  teklif_fiyat: number | null;
  created_at: string;
  updated_at: string;
}

const durumInfo: Record<string, { label: string; desc: string; color: string; icon: React.ReactNode }> = {
  bekliyor:  { label: "Bekliyor",       desc: "Talebiniz alındı, ekibimiz fiyatlandırıyor.", color: "text-yellow-600 bg-yellow-50 border-yellow-200",  icon: <Clock className="w-5 h-5" /> },
  teklif:    { label: "Teklif Verildi", desc: "Fiyat teklifiniz hazır. Onay için bizi arayın.", color: "text-blue-600 bg-blue-50 border-blue-200",       icon: <Package className="w-5 h-5" /> },
  onaylandi: { label: "Onaylandı",      desc: "Teklifiniz onaylandı, hazırlık başladı.",       color: "text-green-600 bg-green-50 border-green-200",    icon: <CheckCircle className="w-5 h-5" /> },
  yolda:     { label: "Yolda",          desc: "Malzemeniz yola çıktı, yakında teslim edilecek.", color: "text-primary bg-primary/5 border-primary/20", icon: <Truck className="w-5 h-5" /> },
  teslim:    { label: "Teslim Edildi",  desc: "Talebiniz başarıyla teslim edildi.",             color: "text-green-700 bg-green-50 border-green-200",   icon: <CheckCircle className="w-5 h-5" /> },
  iptal:     { label: "İptal Edildi",   desc: "Bu talep iptal edilmiştir.",                     color: "text-red-600 bg-red-50 border-red-200",          icon: <X className="w-5 h-5" /> },
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" });

const TalepTakip = () => {
  const [telefon, setTelefon] = useState("");
  const [talepNo, setTalepNo] = useState("");
  const [sonuclar, setSonuclar] = useState<TalepSonuc[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hata, setHata] = useState("");

  const sorgula = async () => {
    const temizTelefon = telefon.replace(/\D/g, "");
    if (temizTelefon.length < 10) {
      setHata("Geçerli bir telefon numarası girin (10 hane).");
      return;
    }
    setLoading(true);
    setHata("");
    setSonuclar(null);

    try {
      // Anonim istemci talepler tablolarını RLS nedeniyle okuyamaz; SECURITY DEFINER RPC
      // yalnızca telefonu eşleşen kayıtların sınırlı alanlarını döner (bkz. migration 20260825000001).
      const { data, error } = await supabase.rpc("talep_sorgula", {
        p_telefon: temizTelefon,
        p_talep_no: talepNo.trim() ? talepNo.trim().toUpperCase() : null,
      });

      if (error) throw error;

      const bulunan = (data ?? []) as TalepSonuc[];
      if (bulunan.length === 0) {
        setHata("Bu telefon numarasına ait talep bulunamadı. Talep numarası ekleyerek tekrar deneyin.");
      } else {
        setSonuclar(bulunan);
      }
    } catch (err) {
      console.error("talep_sorgula hatası:", err);
      setHata("Sorgulama sırasında bir hata oluştu. Lütfen tekrar deneyin ya da bizi arayın: 0539 330 86 17");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Talep Takip | Hammaddem</title>
        <meta name="description" content="Telefon numaranızla hammadde talebinizin durumunu sorgulayın." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        <section className="pt-[120px] pb-16 px-4 md:px-10">
          <div className="max-w-[640px] mx-auto">
            {/* Başlık */}
            <div className="mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
                Üye Olmadan
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                Talep Durumunu Sorgula
              </h1>
              <p className="text-sm text-txt-2 leading-relaxed">
                Kayıt olmadan verdiğiniz talebinizin durumunu telefon numaranızla sorgulayabilirsiniz.
              </p>
            </div>

            {/* Sorgulama formu */}
            <div className="border border-border rounded-2xl p-6 bg-background mb-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-foreground block mb-1.5">
                    Telefon Numarası <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={telefon}
                    onChange={e => setTelefon(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sorgula()}
                    placeholder="05XX XXX XX XX"
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-foreground block mb-1.5">
                    Talep Numarası <span className="text-txt-2 font-normal">(opsiyonel)</span>
                  </label>
                  <input
                    type="text"
                    value={talepNo}
                    onChange={e => setTalepNo(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sorgula()}
                    placeholder="HMD-2026-0001"
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors uppercase"
                  />
                </div>

                {hata && (
                  <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{hata}</p>
                )}

                <button
                  onClick={sorgula}
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-accent-hover disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Sorgulanıyor...</span>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Talep Sorgula
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sonuçlar */}
            {sonuclar && (
              <div className="space-y-4">
                <p className="text-sm text-txt-2">{sonuclar.length} talep bulundu.</p>
                {sonuclar.map(talep => {
                  const durum = durumInfo[talep.durum] || durumInfo.bekliyor;
                  return (
                    <div key={talep.id} className="border border-border rounded-2xl overflow-hidden bg-background">
                      {/* Talep başlık */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                        <div>
                          <span className="text-xs font-mono text-txt-2">#{talep.talep_no}</span>
                          <h3 className="font-bold text-sm mt-0.5">
                            {talep.malzeme || talep.kategori}
                          </h3>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${durum.color}`}>
                          {durum.icon}
                          {durum.label}
                        </span>
                      </div>

                      {/* Detaylar */}
                      <div className="px-5 py-4 space-y-2">
                        <p className="text-sm text-txt-2">{durum.desc}</p>

                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div>
                            <span className="text-[10px] text-txt-2 uppercase font-semibold tracking-wide">Miktar</span>
                            <p className="text-sm font-semibold">{talep.miktar} {talep.birim}</p>
                          </div>
                          {talep.teslimat_ili && (
                            <div>
                              <span className="text-[10px] text-txt-2 uppercase font-semibold tracking-wide">Teslimat</span>
                              <p className="text-sm font-semibold">{talep.teslimat_ili}</p>
                            </div>
                          )}
                          <div>
                            <span className="text-[10px] text-txt-2 uppercase font-semibold tracking-wide">Talep Tarihi</span>
                            <p className="text-sm font-semibold">{formatDate(talep.created_at)}</p>
                          </div>
                          {talep.teslimat_tarihi && (
                            <div>
                              <span className="text-[10px] text-txt-2 uppercase font-semibold tracking-wide">Teslimat Tarihi</span>
                              <p className="text-sm font-semibold">{formatDate(talep.teslimat_tarihi)}</p>
                            </div>
                          )}
                        </div>

                        {/* Teklif fiyatı varsa göster */}
                        {talep.teklif_fiyat && (
                          <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200">
                            <span className="text-[10px] text-green-600 uppercase font-semibold tracking-wide block mb-0.5">Teklif Fiyatı</span>
                            <p className="text-lg font-bold text-green-700">
                              {talep.teklif_fiyat.toLocaleString("tr-TR")} ₺<span className="text-sm font-normal text-green-600 ml-1">/ ton</span>
                            </p>
                            <p className="text-xs text-green-600 mt-0.5">
                              Tahmini toplam: {(talep.teklif_fiyat * talep.miktar).toLocaleString("tr-TR")} ₺
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <p className="text-xs text-txt-2 text-center pt-2">
                  Detaylı takip için{" "}
                  <a href="/kayit" className="text-primary font-medium hover:underline">ücretsiz kayıt olun</a>
                  {" "}veya{" "}
                  <a href="tel:+905393308617" className="text-primary font-medium hover:underline">bizi arayın</a>.
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TalepTakip;
