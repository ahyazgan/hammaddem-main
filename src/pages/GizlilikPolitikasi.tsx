import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GizlilikPolitikasi = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Gizlilik Politikası – Hammaddem</title>
      <meta name="description" content="Hammaddem gizlilik politikası. Kişisel verilerin toplanması, kullanımı ve güvenliği." />
      <link rel="canonical" href="https://hammaddem.co/gizlilik-politikasi" />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="max-w-[720px] mx-auto px-4 md:px-8 py-16 md:py-24">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 no-underline">
        <ArrowLeft size={16} /> Ana Sayfa
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">Gizlilik Politikası</h1>
      <p className="text-sm text-muted-foreground mb-10">Son güncelleme: 26 Şubat 2026</p>

      <div className="prose prose-sm max-w-none text-foreground/80 space-y-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3">
        <h2>1. Toplanan Veriler</h2>
        <p>Platformumuzu kullandığınızda ad, e-posta, telefon numarası, firma adı gibi kişisel bilgilerinizi; talep detayları, teslimat adresi gibi hizmet bilgilerinizi ve tarayıcı türü, IP adresi gibi teknik bilgilerinizi toplayabiliriz.</p>

        <h2>2. Verilerin Kullanımı</h2>
        <p>Toplanan veriler; teklif hazırlama ve hizmet sunumu, müşteri iletişimi ve destek, platform iyileştirme ve analiz, yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılır.</p>

        <h2>3. Verilerin Paylaşımı</h2>
        <p>Kişisel verileriniz üçüncü taraflarla yalnızca hizmet sunumu için gerekli olduğunda (lojistik iş ortakları, ödeme altyapısı) ve yasal zorunluluk halinde paylaşılır. Verileriniz pazarlama amacıyla üçüncü taraflara satılmaz.</p>

        <h2>4. Veri Güvenliği</h2>
        <p>Verileriniz SSL şifreleme ile korunur. Erişim yetkilendirmesi ve düzenli güvenlik denetimleri uygulanır. Güvenlik ihlali durumunda kullanıcılar en kısa sürede bilgilendirilir.</p>

        <h2>5. Çerezler</h2>
        <p>Platformumuz oturum yönetimi ve analiz amacıyla çerez kullanır. Detaylı bilgi için <Link to="/cerez-politikasi" className="text-primary hover:underline">Çerez Politikası</Link> sayfamızı inceleyebilirsiniz.</p>

        <h2>6. Haklarınız</h2>
        <p>KVKK kapsamındaki haklarınız için <Link to="/kvkk" className="text-primary hover:underline">KVKK sayfamızı</Link> ziyaret edebilir veya hammaddem@outlook.com adresine başvurabilirsiniz.</p>
      </div>
    </div>
  </div>
);

export default GizlilikPolitikasi;
