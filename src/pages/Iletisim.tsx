import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Iletisim = () => {
  const [form, setForm] = useState({ ad: "", email: "", mesaj: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("iletisim_mesajlari").insert({
        ad_soyad: form.ad,
        email: form.email,
        mesaj: form.mesaj,
      });
      if (error) throw error;
      toast.success("Mesajınız alındı, en kısa sürede dönüş yapacağız.");
      setForm({ ad: "", email: "", mesaj: "" });
    } catch (err: any) {
      toast.error("Mesaj gönderilemedi, lütfen tekrar deneyin veya bizi arayın.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>İletişim – Hammaddem | Bize Ulaşın</title>
        <meta name="description" content="Hammaddem ile iletişime geçin. Hammadde tedarik ve lojistik konularında sorularınız için bize yazın veya arayın." />
        <link rel="canonical" href="https://hammaddem.co/iletisim" />
      </Helmet>

      <div className="min-h-screen bg-dot-pattern">
        <Navbar />

        <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
              İletişim
            </span>
            <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
              Bize Ulaşın
            </h1>
            <p className="text-base text-txt-2 leading-[1.7] mb-12 max-w-[540px]">
              Sorularınız, önerileriniz veya iş birliği talepleriniz için aşağıdaki kanallardan bize ulaşabilirsiniz.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact info */}
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-start border border-border rounded-2xl p-6 bg-background">
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Telefon</h3>
                    <a href="tel:+905393308617" className="text-sm text-txt-2 no-underline hover:text-primary transition-colors">+90 (539) 330 8617</a>
                  </div>
                </div>
                <div className="flex gap-4 items-start border border-border rounded-2xl p-6 bg-background">
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">E-posta</h3>
                    <a href="mailto:hammaddem@outlook.com" className="text-sm text-txt-2 no-underline hover:text-primary transition-colors">hammaddem@outlook.com</a>
                  </div>
                </div>
                <div className="flex gap-4 items-start border border-border rounded-2xl p-6 bg-background">
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Adres</h3>
                    <p className="text-sm text-txt-2">İstanbul, Türkiye</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="border border-border rounded-2xl p-6 md:p-8 bg-background flex flex-col gap-4">
                <h2 className="text-lg font-bold mb-1">Mesaj Gönderin</h2>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Ad Soyad</label>
                  <input
                    type="text"
                    required
                    value={form.ad}
                    onChange={(e) => setForm({ ...form, ad: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">E-posta</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Mesajınız</label>
                  <textarea
                    required
                    rows={4}
                    value={form.mesaj}
                    onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                    placeholder="Mesajınızı yazın..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> {loading ? "Gönderiliyor..." : "Gönder"}
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

export default Iletisim;
