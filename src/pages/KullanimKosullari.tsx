import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const KullanimKosullari = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Kullanım Koşulları – Hammaddem</title>
      <meta name="description" content="Hammaddem kullanım koşulları. Platform kullanım şartları ve yükümlülükler." />
      <link rel="canonical" href="https://hammaddem.co/kullanim-kosullari" />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="max-w-[720px] mx-auto px-4 md:px-8 py-16 md:py-24">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 no-underline">
        <ArrowLeft size={16} /> Ana Sayfa
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">Kullanım Koşulları</h1>
      <p className="text-sm text-muted-foreground mb-10">Son güncelleme: 26 Şubat 2026</p>

      <div className="prose prose-sm max-w-none text-foreground/80 space-y-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3">
        <h2>1. Genel Bilgiler</h2>
        <p>Bu web sitesi Hammaddem tarafından işletilmektedir. Siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız siteyi kullanmayınız.</p>

        <h2>2. Hizmet Kapsamı</h2>
        <p>Hammaddem, silobas ve hafriyat lojistik sektöründe dijital talep toplama ve teklif sunma platformudur. Platform üzerinden oluşturulan talepler bağlayıcı sipariş niteliği taşımaz; nihai anlaşma taraflar arasında ayrıca yapılır.</p>

        <h2>3. Kullanıcı Yükümlülükleri</h2>
        <p>Kullanıcılar, platforma doğru ve güncel bilgiler sağlamakla yükümlüdür. Yanıltıcı bilgi veren kullanıcıların hesapları askıya alınabilir. Platforma zarar verecek her türlü otomatik erişim, veri kazıma veya kötüye kullanım yasaktır.</p>

        <h2>4. Fikri Mülkiyet</h2>
        <p>Site içeriği, logo, tasarım ve yazılım dahil tüm materyaller Hammaddem'e aittir. İzinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır.</p>

        <h2>5. Sorumluluk Sınırı</h2>
        <p>Hammaddem, platformda sunulan fiyat tekliflerinin doğruluğu konusunda azami özeni gösterir ancak piyasa koşullarından kaynaklanan değişikliklerden sorumlu tutulamaz. Platform kesintileri veya teknik aksaklıklardan doğan zararlardan sorumluluk kabul edilmez.</p>

        <h2>6. Değişiklikler</h2>
        <p>Hammaddem, bu koşulları önceden bildirimde bulunmaksızın güncelleme hakkını saklı tutar. Güncel koşullar her zaman bu sayfada yayımlanır.</p>

        <h2>7. Uygulanacak Hukuk</h2>
        <p>Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda İstanbul mahkemeleri ve icra daireleri yetkilidir.</p>
      </div>
    </div>
  </div>
);

export default KullanimKosullari;
