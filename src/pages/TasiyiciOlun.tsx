import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Truck, TrendingUp, Shield, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const avantajlar = [
  { icon: TrendingUp, title: "Düzenli İş İmkanı", desc: "Sürekli büyüyen talep havuzumuz sayesinde boş dönüş yapmadan çalışın." },
  { icon: Shield, title: "Güvenli Ödeme", desc: "Teslimat onayından sonra ödemeleriniz zamanında ve güvenle yapılır." },
  { icon: Clock, title: "Esnek Çalışma", desc: "Size uygun güzergâh ve takvimde iş seçin, kendi programınızı oluşturun." },
  { icon: Truck, title: "Dijital Takip", desc: "Tüm iş süreçlerinizi dijital panelden takip edin, evrak karmaşasından kurtulun." },
];

const TasiyiciOlun = () => {
  const [form, setForm] = useState({ ad: "", telefon: "", aracTipi: "", plaka: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Başvurunuz alındı! En kısa sürede sizinle iletişime geçeceğiz.");
      setForm({ ad: "", telefon: "", aracTipi: "", plaka: "" });
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <Helmet>
        <title>Taşıyıcı Olun – Hammaddem | Araç Sahipleri İçin İş Fırsatı</title>
        <meta name="description" content="Kamyon, tır veya silobas aracınızla Hammaddem platformuna katılın. Düzenli iş, güvenli ödeme ve dijital takip ile kazancınızı artırın." />
        <link rel="canonical" href="https://hammaddem.co/tasiyici-olun" />
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
                  Taşıyıcı Ağı
                </span>
                <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Aracınızla Kazanın
                </h1>
                <p className="text-base md:text-lg text-txt-2 leading-[1.7] mb-10 max-w-[500px]">
                  Kamyon, tır veya silobas aracınızla Hammaddem taşıyıcı ağına katılın.
                  Sürekli iş imkanı, güvenli ödeme sistemi ve dijital iş takibi ile
                  nakliye süreçlerinizi kolaylaştırın.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {avantajlar.map((a) => (
                    <div key={a.title} className="flex gap-3 items-start border border-border rounded-xl p-4 bg-background">
                      <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center shrink-0">
                        <a.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm mb-0.5">{a.title}</h3>
                        <p className="text-xs text-txt-2 leading-relaxed">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="border border-border rounded-2xl p-6 md:p-8 bg-background flex flex-col gap-4 sticky top-[90px]">
                <h2 className="text-lg font-bold mb-1">Taşıyıcı Başvuru Formu</h2>
                <p className="text-sm text-txt-2 mb-2">Bilgilerinizi bırakın, sizi arayalım.</p>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Ad Soyad</label>
                  <input type="text" required value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="Adınız Soyadınız" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Telefon</label>
                  <input type="tel" required value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="05XX XXX XX XX" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Araç Tipi</label>
                  <select value={form.aracTipi} onChange={(e) => setForm({ ...form, aracTipi: e.target.value })} required
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
                    <option value="">Seçiniz</option>
                    <option value="silobas">Silobas</option>
                    <option value="damperli">Damperli Kamyon</option>
                    <option value="tir">Tır</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Plaka</label>
                  <input type="text" required value={form.plaka} onChange={(e) => setForm({ ...form, plaka: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="34 ABC 123" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                  <ArrowRight className="w-4 h-4" /> {loading ? "Gönderiliyor..." : "Başvur"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TasiyiciOlun;
