import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Kvkk = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>KVKK Aydınlatma Metni – Hammaddem</title>
      <meta name="description" content="Hammaddem KVKK aydınlatma metni. Kişisel verilerin korunması ve haklarınız." />
      <link rel="canonical" href="https://hammaddem.co/kvkk" />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <div className="max-w-[720px] mx-auto px-4 md:px-8 py-16 md:py-24">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 no-underline">
        <ArrowLeft size={16} /> Ana Sayfa
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">KVKK Aydınlatma Metni</h1>
      <p className="text-sm text-muted-foreground mb-10">Son güncelleme: 26 Şubat 2026</p>

      <div className="prose prose-sm max-w-none text-foreground/80 space-y-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3">
        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Hammaddem olarak veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda açıklanan çerçevede işlemekteyiz.</p>

        <h2>1. Veri Sorumlusu</h2>
        <p>Hammaddem — İstanbul, Türkiye<br />İletişim: hammaddem@outlook.com</p>

        <h2>2. İşlenen Kişisel Veriler</h2>
        <p>Kimlik bilgileri (ad, soyad), iletişim bilgileri (e-posta, telefon, adres), firma bilgileri, işlem güvenliği bilgileri (IP adresi, oturum bilgileri) ve hizmet kullanım bilgileri (talep detayları, teslimat bilgileri) işlenmektedir.</p>

        <h2>3. İşleme Amaçları</h2>
        <p>Kişisel verileriniz; hizmet sunumu ve sözleşme yükümlülüklerinin yerine getirilmesi, teklif hazırlanması, müşteri ilişkileri yönetimi, yasal yükümlülüklerin ifası ve platform güvenliğinin sağlanması amacıyla işlenir.</p>

        <h2>4. Hukuki Sebepler</h2>
        <p>Verileriniz KVKK madde 5/2 kapsamında; sözleşmenin kurulması ve ifası, hukuki yükümlülük, meşru menfaat ve açık rızanız doğrultusunda işlenir.</p>

        <h2>5. Veri Aktarımı</h2>
        <p>Kişisel verileriniz; hizmet sağlayıcılar (hosting, e-posta), lojistik iş ortakları ve yasal mercilere KVKK'nın 8. ve 9. maddelerinde belirtilen şartlara uygun olarak aktarılabilir.</p>

        <h2>6. Haklarınız</h2>
        <p>KVKK madde 11 uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK madde 7 kapsamında silinmesini veya yok edilmesini isteme, düzeltme/silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme, aleyhine bir sonuç çıkmasına itiraz etme ve kanuna aykırı işleme sebebiyle zararın giderilmesini talep etme haklarına sahipsiniz.</p>

        <h2>7. Başvuru</h2>
        <p>Haklarınızı kullanmak için hammaddem@outlook.com adresine kimliğinizi tespit edici bilgilerle birlikte yazılı başvuruda bulunabilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanacaktır.</p>
      </div>
    </div>
  </div>
);

export default Kvkk;
