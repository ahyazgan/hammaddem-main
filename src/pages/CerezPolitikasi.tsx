import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CerezPolitikasi = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Çerez Politikası – Hammaddem</title>
      <meta name="description" content="Hammaddem çerez politikası. Sitede kullanılan çerezler, türleri ve yönetimi." />
      <link rel="canonical" href="https://hammaddem.co/cerez-politikasi" />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="max-w-[720px] mx-auto px-4 md:px-8 py-16 md:py-24">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 no-underline">
        <ArrowLeft size={16} /> Ana Sayfa
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">Çerez Politikası</h1>
      <p className="text-sm text-muted-foreground mb-10">Son güncelleme: 26 Şubat 2026</p>

      <div className="prose prose-sm max-w-none text-foreground/80 space-y-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3">
        <h2>1. Çerez Nedir?</h2>
        <p>Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınıza yerleştirilen küçük metin dosyalarıdır. Siteyi daha verimli kullanmanızı sağlar ve bize kullanım hakkında bilgi sunar.</p>

        <h2>2. Kullanılan Çerez Türleri</h2>
        <p><strong>Zorunlu Çerezler:</strong> Oturum yönetimi ve güvenlik için gereklidir. Bu çerezler olmadan platform düzgün çalışmaz.</p>
        <p><strong>Performans Çerezleri:</strong> Sayfa yüklenme süreleri ve hata raporları gibi anonim kullanım verilerini toplar.</p>
        <p><strong>İşlevsellik Çerezleri:</strong> Dil tercihi ve oturum bilgilerinizi hatırlar.</p>

        <h2>3. Üçüncü Taraf Çerezleri</h2>
        <p>Platformumuz analiz amacıyla üçüncü taraf hizmetleri kullanabilir. Bu hizmetlerin kendi gizlilik politikaları geçerlidir.</p>

        <h2>4. Çerez Yönetimi</h2>
        <p>Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak zorunlu çerezlerin engellenmesi platformun işleyişini olumsuz etkileyebilir.</p>

        <h2>5. Değişiklikler</h2>
        <p>Bu politika gerektiğinde güncellenebilir. Güncel hali her zaman bu sayfada yayımlanır.</p>
      </div>
    </div>
  </div>
);

export default CerezPolitikasi;
