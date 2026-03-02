import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface Talep {
  id: string;
  talep_no: string;
  kategori: string;
  malzeme: string | null;
  miktar: number;
  birim: string;
  durum: string;
  hizmet_tipi: string;
  teslimat_ili: string | null;
  adres: string | null;
  aciliyet: string;
  teslimat_tarihi: string | null;
  created_at: string;
}

interface Profile {
  firma_adi: string | null;
  email: string | null;
  telefon: string | null;
}

const kategoriLabels: Record<string, string> = {
  insaat: "İnşaat", silobas: "Silobas", sanayi: "Sanayi", diger: "Diğer",
  hafriyat: "Hafriyat",
};

const generatePDF = (talep: Talep, profile: Profile | null) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pw = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header bar
  doc.setFillColor(232, 98, 10);
  doc.rect(0, 0, pw, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("HAMMADDEM", 14, 8);
  doc.setFont("helvetica", "normal");
  doc.text("Dijital Irsaliye / Fatura", pw - 14, 8, { align: "right" });

  // Title
  y = 28;
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`Irsaliye #${talep.talep_no}`, 14, y);

  // Status badge
  y += 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const durumText = talep.durum === "teslim" ? "TESLIM EDILDI" : talep.durum === "onaylandi" ? "ONAYLANDI" : talep.durum === "yolda" ? "YOLDA" : talep.durum.toUpperCase();
  doc.setTextColor(100, 100, 100);
  doc.text(`Durum: ${durumText}`, 14, y);
  doc.text(`Tarih: ${new Date(talep.created_at).toLocaleDateString("tr-TR")}`, pw - 14, y, { align: "right" });

  // Divider
  y += 6;
  doc.setDrawColor(220, 220, 220);
  doc.line(14, y, pw - 14, y);

  // Customer info
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Musteri Bilgileri", 14, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);

  const customerRows = [
    ["Firma", profile?.firma_adi || "-"],
    ["E-posta", profile?.email || "-"],
    ["Telefon", profile?.telefon || "-"],
  ];
  customerRows.forEach(([k, v]) => {
    doc.text(`${k}:`, 14, y);
    doc.setTextColor(30, 30, 30);
    doc.text(v, 55, y);
    doc.setTextColor(80, 80, 80);
    y += 6;
  });

  // Divider
  y += 3;
  doc.line(14, y, pw - 14, y);

  // Order details
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Siparis Detaylari", 14, y);

  y += 8;
  doc.setFontSize(9);

  // Table header
  doc.setFillColor(245, 245, 245);
  doc.rect(14, y - 4, pw - 28, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(80, 80, 80);
  const cols = [14, 55, 95, 125, 160];
  doc.text("Hizmet", cols[0], y);
  doc.text("Kategori", cols[1], y);
  doc.text("Malzeme", cols[2], y);
  doc.text("Miktar", cols[3], y);
  doc.text("Konum", cols[4], y);

  // Table row
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 30);
  doc.text(talep.hizmet_tipi === "nakliye" ? "Nakliye" : "Satin Alma", cols[0], y);
  doc.text(kategoriLabels[talep.kategori] || talep.kategori, cols[1], y);
  doc.text(talep.malzeme || "-", cols[2], y);
  doc.text(`${talep.miktar} ${talep.birim}`, cols[3], y);
  doc.text(talep.teslimat_ili || "-", cols[4], y);

  // Additional details
  y += 12;
  doc.setDrawColor(220, 220, 220);
  doc.line(14, y, pw - 14, y);
  y += 8;

  const details = [
    ["Aciliyet", talep.aciliyet === "cok_acil" ? "Cok Acil" : talep.aciliyet === "acil" ? "Acil" : "Normal"],
    ["Teslimat Tarihi", talep.teslimat_tarihi ? new Date(talep.teslimat_tarihi).toLocaleDateString("tr-TR") : "Belirtilmedi"],
    ["Adres", talep.adres || "-"],
  ];
  doc.setTextColor(80, 80, 80);
  details.forEach(([k, v]) => {
    doc.text(`${k}:`, 14, y);
    doc.setTextColor(30, 30, 30);
    doc.text(v, 55, y);
    doc.setTextColor(80, 80, 80);
    y += 6;
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(220, 220, 220);
  doc.line(14, footerY - 5, pw - 14, footerY - 5);
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text("Bu belge Hammaddem platformu tarafindan otomatik olusturulmustur.", 14, footerY);
  doc.text(`Olusturulma: ${new Date().toLocaleDateString("tr-TR")} ${new Date().toLocaleTimeString("tr-TR")}`, pw - 14, footerY, { align: "right" });

  doc.save(`Irsaliye_${talep.talep_no}.pdf`);
};

const FaturaView = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [talepler, setTalepler] = useState<Talep[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [{ data: talepData }, { data: profileData }] = await Promise.all([
        supabase
          .from("talepler")
          .select("id, talep_no, kategori, malzeme, miktar, birim, durum, hizmet_tipi, teslimat_ili, adres, aciliyet, teslimat_tarihi, created_at")
          .eq("user_id", user.id)
          .in("durum", ["teslim", "onaylandi", "yolda"])
          .order("created_at", { ascending: false }),
        supabase
          .from("profiles")
          .select("firma_adi, email, telefon")
          .eq("user_id", user.id)
          .single(),
      ]);
      if (talepData) setTalepler(talepData as unknown as Talep[]);
      if (profileData) setProfile(profileData as unknown as Profile);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const durumLabel: Record<string, { label: string; cls: string }> = {
    onaylandi: { label: "Onaylandı", cls: "text-emerald-500" },
    yolda: { label: "Yolda", cls: "text-primary" },
    teslim: { label: "Teslim", cls: "text-emerald-500" },
  };

  const handleDownload = (talep: Talep) => {
    try {
      generatePDF(talep, profile);
      toast({ title: "PDF indirildi", description: `${talep.talep_no} irsaliyesi hazırlandı.` });
    } catch {
      toast({ title: "Hata", description: "PDF oluşturulamadı.", variant: "destructive" });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 lg:px-6 py-4 border-b border-border">
        <h2 className="text-[15px] font-semibold flex items-center gap-2">
          <span className="text-[18px]">📄</span> Fatura & İrsaliye
        </h2>
        <p className="text-[11px] text-muted-foreground mt-1">Onaylanmış ve teslim edilmiş siparişlerinize ait belgeler.</p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-muted-foreground text-sm">Yükleniyor...</div>
      ) : talepler.length === 0 ? (
        <div className="p-10 text-center">
          <div className="text-3xl mb-3">📄</div>
          <h3 className="text-sm font-semibold mb-1 text-foreground">Henüz belge yok</h3>
          <p className="text-[11px] text-muted-foreground">Siparişleriniz onaylandığında fatura ve irsaliyeler burada görünecek.</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {talepler.map((t) => {
            const d = durumLabel[t.durum] || { label: t.durum, cls: "text-muted-foreground" };
            return (
              <div key={t.id} className="px-4 lg:px-6 py-3.5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center text-sm">📄</div>
                  <div>
                    <div className="text-[12px] font-semibold text-foreground">
                      <span className="font-mono text-primary">#{t.talep_no}</span>
                      <span className="mx-1.5 text-muted-foreground">·</span>
                      {t.malzeme || "—"}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono">
                      {t.miktar} {t.birim} · {new Date(t.created_at).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-semibold uppercase ${d.cls}`}>{d.label}</span>
                  <button
                    onClick={() => handleDownload(t)}
                    className="text-[11px] font-semibold text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors flex items-center gap-1.5"
                  >
                    ⬇ PDF İndir
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FaturaView;
