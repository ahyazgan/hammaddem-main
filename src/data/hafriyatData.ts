// Hafriyat SEO sayfaları için lokasyon bazlı benzersiz içerik.
// Her lokasyonun intro paragrafları ve SSS'leri özgün tutulmalı —
// kopya içerik Google'da sayfaların birbirini bastırmasına yol açar.

export interface HafriyatFaq {
  q: string;
  a: string;
}

export interface HafriyatLokasyon {
  slug: string;
  ad: string;
  /** İlçeler için bağlı olduğu il slug'ı; iller için undefined */
  parent?: string;
  /** Düzensiz bulunma hali (örn. "Beylikdüzü'nde"); boşsa hafriyatLokatif üretir */
  lokatif?: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  intro: string[];
  bolgeler: string[];
  faq: HafriyatFaq[];
}

export const HAFRIYAT_IS_TIPLERI = [
  "Temel Kazısı",
  "Bodrum / Havuz Kazısı",
  "Hafriyat Toprağı Taşıma",
  "Moloz & İnşaat Atığı",
  "Dolgu Malzemesi",
  "Arazi Düzenleme / Tesviye",
  "Yıkım Sonrası Hafriyat",
  "Diğer",
] as const;

export const HAFRIYAT_ILLER: HafriyatLokasyon[] = [
  {
    slug: "istanbul",
    ad: "İstanbul",
    path: "/hafriyat/istanbul",
    title: "İstanbul Hafriyat Firması – Kazı, Moloz, Hafriyat İşleri | Hammaddem",
    description:
      "İstanbul'da hafriyat işleri: temel kazısı, moloz taşıma, hafriyat toprağı nakli. Avrupa ve Anadolu yakasında damperli araç filosu. 30 dakikada fiyat teklifi alın.",
    keywords:
      "istanbul hafriyat, istanbul hafriyat firması, istanbul kazı işleri, istanbul moloz taşıma, hafriyat istanbul, istanbul temel kazısı",
    intro: [
      "İstanbul, Türkiye'deki hafriyat hacminin açık ara en yükseğine sahip şehir. Kentsel dönüşüm projeleri, yeni konut ve ticari inşaatlar ile altyapı çalışmaları her gün binlerce kamyon hafriyat toprağı üretiyor. Hammaddem olarak Avrupa ve Anadolu yakasının tamamında temel kazısı, hafriyat toprağı taşıma, moloz kaldırma ve dolgu malzemesi temini hizmeti veriyoruz.",
      "İstanbul'da hafriyat çalışması, İBB'nin hafriyat toprağı yönetimi mevzuatına tabidir: taşıma araçlarının lisanslı, döküm sahalarının ruhsatlı olması gerekir. Ekibimiz döküm sahası koordinasyonu ve gerekli evrak süreçleriyle birlikte anahtar teslim çözüm sunar; şantiyenizin ceza riskiyle uğraşmasına gerek kalmaz.",
    ],
    bolgeler: [
      "Esenyurt", "Başakşehir", "Arnavutköy", "Beylikdüzü", "Tuzla",
      "Pendik", "Sancaktepe", "Ümraniye", "Eyüpsultan", "Kâğıthane",
    ],
    faq: [
      {
        q: "İstanbul'da hafriyat fiyatları nasıl belirlenir?",
        a: "Fiyat; kazı hacmi (m³), zemin türü, döküm sahasına uzaklık ve araç sayısına göre belirlenir. İstanbul'da döküm sahası mesafesi fiyatın en büyük kalemidir. Formu doldurun, işinize özel net fiyatı 30 dakika içinde iletelim.",
      },
      {
        q: "İstanbul'da hafriyat dökümü için izin gerekiyor mu?",
        a: "Evet. İstanbul'da hafriyat toprağı yalnızca İBB lisanslı araçlarla taşınabilir ve ruhsatlı döküm sahalarına dökülebilir. Çalıştığımız tüm araçlar lisanslıdır; döküm belgeleri tarafınıza iletilir.",
      },
      {
        q: "Hem Avrupa hem Anadolu yakasında çalışıyor musunuz?",
        a: "Evet. Esenyurt'tan Tuzla'ya, Arnavutköy'den Pendik'e kadar İstanbul'un tüm ilçelerinde kazı ve hafriyat taşıma hizmeti veriyoruz.",
      },
    ],
  },
  {
    slug: "kocaeli",
    ad: "Kocaeli",
    path: "/hafriyat/kocaeli",
    title: "Kocaeli Hafriyat Firması – Gebze, İzmit Kazı & Moloz | Hammaddem",
    description:
      "Kocaeli'de hafriyat: Gebze, İzmit, Çayırova ve Dilovası'nda temel kazısı, hafriyat taşıma, dolgu. Sanayi tesisleri ve konut projeleri için hızlı teklif.",
    keywords:
      "kocaeli hafriyat, gebze hafriyat, izmit hafriyat, kocaeli kazı işleri, gebze moloz taşıma, kocaeli hafriyat firması",
    intro: [
      "Kocaeli, Türkiye sanayisinin kalbi olarak sürekli büyüyen fabrika, depo ve lojistik tesisi inşaatlarına sahne oluyor. Gebze, Dilovası, Çayırova ve İzmit hattındaki OSB'lerde tesis temellerinden saha tesviyesine kadar her ölçekte hafriyat işini üstleniyoruz.",
      "Bölgedeki engebeli topografya nedeniyle Kocaeli projelerinde kazı ile birlikte dolgu ihtiyacı da sık görülür. Kazıdan çıkan uygun malzemeyi dolguda değerlendirerek hem döküm hem malzeme maliyetini düşüren çözümler sunuyoruz.",
    ],
    bolgeler: ["Gebze", "İzmit", "Çayırova", "Dilovası", "Darıca", "Körfez", "Derince", "Başiskele"],
    faq: [
      {
        q: "Gebze OSB'de tesis kazısı yapıyor musunuz?",
        a: "Evet. Gebze, GOSB, TAYSAD ve Dilovası OSB bölgelerinde fabrika temeli, depo sahası ve altyapı kazıları ana çalışma alanlarımızdandır.",
      },
      {
        q: "Kocaeli'de hafriyat için minimum iş hacmi var mı?",
        a: "Minimum hacim şartımız yok; tek kamyonluk moloz işinden on binlerce m³'lük saha kazısına kadar her ölçekte teklif veriyoruz.",
      },
      {
        q: "Kocaeli'de hafriyat fiyat teklifi ne kadar sürede gelir?",
        a: "Formu doldurduktan sonra 30 dakika içinde telefonla arayıp net fiyat iletiyoruz. Büyük sahalar için ücretsiz keşif planlıyoruz.",
      },
    ],
  },
  {
    slug: "bursa",
    ad: "Bursa",
    path: "/hafriyat/bursa",
    title: "Bursa Hafriyat Firması – Kazı, Dolgu, Moloz Taşıma | Hammaddem",
    description:
      "Bursa'da hafriyat işleri: Nilüfer, Osmangazi, İnegöl'de temel kazısı, hafriyat toprağı taşıma ve dolgu malzemesi. 30 dakikada fiyat teklifi.",
    keywords:
      "bursa hafriyat, bursa hafriyat firması, bursa kazı işleri, nilüfer hafriyat, bursa moloz taşıma, inegöl hafriyat",
    intro: [
      "Bursa'da konut üretiminin yoğunlaştığı Nilüfer ve Osmangazi ile sanayinin merkezi İnegöl ve Kestel hattında hafriyat hizmeti veriyoruz. Temel ve bodrum kazıları, hafriyat toprağı nakli, moloz kaldırma ve stabilize dolgu işlerini tek elden yönetiyoruz.",
      "Bursa Ovası'nın yumuşak zeminlerinde kazı hızlı ilerler ancak şev güvenliği ve yeraltı suyu yönetimi kritiktir. Deneyimli operatörlerimiz iksa ve susuzlaştırma gereken projelerde müteahhitle koordineli çalışır.",
    ],
    bolgeler: ["Nilüfer", "Osmangazi", "Yıldırım", "İnegöl", "Kestel", "Gürsu", "Mudanya", "Gemlik"],
    faq: [
      {
        q: "Bursa'da hangi hafriyat işlerini yapıyorsunuz?",
        a: "Temel ve bodrum kazısı, hafriyat toprağı taşıma, moloz ve inşaat atığı kaldırma, dolgu malzemesi temini ile arazi tesviyesi Bursa'daki ana hizmetlerimizdir.",
      },
      {
        q: "Bursa'da hafriyat m³ fiyatı ne kadar?",
        a: "Fiyat zemin sınıfına, kazı derinliğine ve döküm mesafesine göre değişir. Formdan konum ve tahmini hacmi iletin; Bursa'ya özel güncel birim fiyatı aynı gün bildirelim.",
      },
      {
        q: "Gemlik ve Mudanya sahil hattında çalışıyor musunuz?",
        a: "Evet, Gemlik ve Mudanya dahil Bursa'nın tüm merkez ve çevre ilçelerinde araç görevlendiriyoruz.",
      },
    ],
  },
  {
    slug: "tekirdag",
    ad: "Tekirdağ",
    path: "/hafriyat/tekirdag",
    title: "Tekirdağ Hafriyat Firması – Çorlu, Çerkezköy Kazı | Hammaddem",
    description:
      "Tekirdağ'da hafriyat: Çorlu, Çerkezköy, Kapaklı sanayi bölgelerinde temel kazısı, hafriyat taşıma, dolgu. Hızlı ve lisanslı hizmet.",
    keywords:
      "tekirdağ hafriyat, çorlu hafriyat, çerkezköy hafriyat, tekirdağ kazı, kapaklı hafriyat, tekirdağ moloz taşıma",
    intro: [
      "Tekirdağ; Çorlu, Çerkezköy ve Kapaklı üçgenindeki sanayi yatırımları ve İstanbul'dan taşan konut talebiyle Trakya'nın en hareketli inşaat pazarı haline geldi. Fabrika temelleri, lojistik depo sahaları ve konut projelerinde kazı ve hafriyat taşıma hizmeti sunuyoruz.",
      "Trakya'nın killi zeminlerinde yağışlı sezonda kazı planlaması özel önem ister. İş programınıza uygun araç sayısını önceden tahsis ederek şantiyenizde beklemesiz sevkiyat düzeni kuruyoruz.",
    ],
    bolgeler: ["Çorlu", "Çerkezköy", "Kapaklı", "Süleymanpaşa", "Ergene", "Malkara", "Saray"],
    faq: [
      {
        q: "Çerkezköy OSB'de hafriyat hizmeti veriyor musunuz?",
        a: "Evet. Çerkezköy OSB, Çorlu ve Ergene sanayi bölgelerindeki tesis inşaatları Tekirdağ'daki ana iş alanlarımızdandır.",
      },
      {
        q: "Tekirdağ'da kaç kamyonla çalışabiliyorsunuz?",
        a: "İş hacmine göre tek araçtan çok araçlı konvoylara kadar ölçeklenebiliyoruz. Yoğun sevkiyat gereken projelerde günlük kamyon planını birlikte çıkarıyoruz.",
      },
      {
        q: "Tekirdağ hafriyat fiyat teklifini nasıl alırım?",
        a: "Sayfadaki formu doldurmanız yeterli; 30 dakika içinde arayıp Tekirdağ'a özel net fiyat veriyoruz.",
      },
    ],
  },
  {
    slug: "sakarya",
    ad: "Sakarya",
    path: "/hafriyat/sakarya",
    title: "Sakarya Hafriyat Firması – Adapazarı Kazı & Dolgu | Hammaddem",
    description:
      "Sakarya'da hafriyat: Adapazarı, Serdivan, Hendek'te temel kazısı, hafriyat toprağı taşıma, dolgu malzemesi. 30 dakikada teklif alın.",
    keywords:
      "sakarya hafriyat, adapazarı hafriyat, sakarya kazı işleri, serdivan hafriyat, hendek hafriyat, sakarya dolgu",
    intro: [
      "Sakarya'da Adapazarı ve Serdivan'daki konut projelerinden Hendek ve Akyazı'daki sanayi tesislerine kadar geniş bir alanda hafriyat hizmeti veriyoruz. Temel kazısı, hafriyat nakli, moloz kaldırma ve dolgu işlerinde tek muhatapla çalışırsınız.",
      "Sakarya Ovası'nın alüvyonlu zemini deprem yönetmeliği gereği derin temel ve zemin iyileştirme uygulamalarını sık gerektirir. Bu tip projelerde kazı hacmi büyür; doğru araç planlamasıyla döküm trafiğini şantiye programınıza uyduruyoruz.",
    ],
    bolgeler: ["Adapazarı", "Serdivan", "Erenler", "Hendek", "Akyazı", "Arifiye", "Sapanca"],
    faq: [
      {
        q: "Sakarya'da zemin iyileştirme kazıları yapıyor musunuz?",
        a: "Evet. Derin temel ve zemin iyileştirme projelerinde çıkan yüksek hacimli hafriyatın taşınması ve uygun dolgu malzemesinin getirilmesi uzmanlık alanımızdır.",
      },
      {
        q: "Sakarya'da hangi ilçelere hizmet veriyorsunuz?",
        a: "Adapazarı, Serdivan, Erenler, Hendek, Akyazı, Arifiye ve Sapanca başta olmak üzere tüm Sakarya ilçelerine hizmet veriyoruz.",
      },
      {
        q: "Dolgu malzemesini de siz mi getiriyorsunuz?",
        a: "Evet; stabilize, tuvenan ve kırma taş dolgu malzemelerini ocaktan şantiyenize biz taşıyoruz, kazı ve dolguyu tek fiyatla teklif edebiliyoruz.",
      },
    ],
  },
  {
    slug: "yalova",
    ad: "Yalova",
    path: "/hafriyat/yalova",
    title: "Yalova Hafriyat Firması – Kazı, Moloz, Dolgu İşleri | Hammaddem",
    description:
      "Yalova'da hafriyat işleri: Çiftlikköy, Çınarcık ve merkez ilçede temel kazısı, moloz taşıma, dolgu. Hızlı fiyat teklifi için formu doldurun.",
    keywords:
      "yalova hafriyat, yalova kazı işleri, yalova moloz taşıma, çınarcık hafriyat, çiftlikköy hafriyat, yalova hafriyat firması",
    intro: [
      "Yalova'da villa ve site projelerinin yoğunlaştığı Çınarcık–Termal hattı ile sanayi yatırımlarının sürdüğü Çiftlikköy ve Altınova'da hafriyat hizmeti veriyoruz. Temel kazısı, moloz kaldırma ve dolgu işlerinde bölgeyi iyi tanıyan ekiplerle çalışıyoruz.",
      "Yalova'nın eğimli sahil topografyasında kazı çoğu zaman şev desteği ve istinat imalatıyla birlikte planlanır. Dar sokaklı yerleşimlerde küçük tonajlı araç seçenekleriyle site içi projelere de sorunsuz giriyoruz.",
    ],
    bolgeler: ["Merkez", "Çiftlikköy", "Çınarcık", "Termal", "Altınova", "Armutlu"],
    faq: [
      {
        q: "Yalova'da villa temel kazısı yapıyor musunuz?",
        a: "Evet. Çınarcık ve Termal bölgesindeki villa ve site projeleri için temel kazısı, hafriyat nakli ve dolgu hizmetini tek pakette sunuyoruz.",
      },
      {
        q: "Dar alanlara girecek küçük araçlarınız var mı?",
        a: "Var. Dar sokak ve site içi işlerde küçük tonajlı damperli araçlar görevlendiriyoruz; talep formuna alan kısıtınızı not etmeniz yeterli.",
      },
      {
        q: "Yalova hafriyat fiyatı neye göre değişir?",
        a: "Kazı hacmi, zemin eğimi, araç erişimi ve döküm mesafesi fiyatı belirler. Formu doldurun, Yalova'ya özel net teklifi 30 dakikada iletelim.",
      },
    ],
  },
  {
    slug: "balikesir",
    ad: "Balıkesir",
    path: "/hafriyat/balikesir",
    title: "Balıkesir Hafriyat Firması – Bandırma, Edremit Kazı | Hammaddem",
    description:
      "Balıkesir'de hafriyat: Bandırma, Edremit, Altıeylül'de temel kazısı, hafriyat taşıma, dolgu malzemesi. Online formla hızlı fiyat teklifi.",
    keywords:
      "balıkesir hafriyat, bandırma hafriyat, edremit hafriyat, balıkesir kazı işleri, balıkesir moloz, ayvalık hafriyat",
    intro: [
      "Balıkesir'de merkez Altıeylül–Karesi bölgesinden Bandırma limanı çevresine ve Edremit Körfezi'nin turizm yerleşimlerine kadar hafriyat hizmeti veriyoruz. Konut temelleri, tesis sahaları ve yazlık projelerinde kazı, taşıma ve dolgu işlerini üstleniyoruz.",
      "Körfez bölgesinde yaz sezonu öncesi biten inşaat takvimleri nedeniyle kış ve bahar aylarında kazı talebi yoğunlaşır. Sezon planınıza göre araç kapasitesini önceden rezerve ederek işinizin sarkmamasını sağlıyoruz.",
    ],
    bolgeler: ["Altıeylül", "Karesi", "Bandırma", "Edremit", "Ayvalık", "Burhaniye", "Gönen", "Susurluk"],
    faq: [
      {
        q: "Edremit ve Ayvalık'ta yazlık projeler için çalışıyor musunuz?",
        a: "Evet. Edremit Körfezi hattındaki site ve yazlık projelerinde temel kazısı ve hafriyat taşıma hizmeti veriyoruz; sezon öncesi teslim programına uyum sağlıyoruz.",
      },
      {
        q: "Bandırma'daki sanayi tesislerine hizmet veriyor musunuz?",
        a: "Bandırma liman ve OSB çevresindeki tesis inşaatlarında saha kazısı ve dolgu işleri ana çalışma alanlarımızdandır.",
      },
      {
        q: "Balıkesir'de fiyat teklifi için ne bilmeniz gerekiyor?",
        a: "Konum, işin tipi ve tahmini hacim yeterli. Formu doldurduğunuzda 30 dakika içinde arayıp net fiyat veriyoruz.",
      },
    ],
  },
  {
    slug: "canakkale",
    ad: "Çanakkale",
    path: "/hafriyat/canakkale",
    title: "Çanakkale Hafriyat Firması – Kazı, Moloz, Dolgu | Hammaddem",
    description:
      "Çanakkale'de hafriyat işleri: merkez, Biga ve Çan'da temel kazısı, hafriyat toprağı taşıma, dolgu. 30 dakikada fiyat teklifi alın.",
    keywords:
      "çanakkale hafriyat, çanakkale kazı işleri, biga hafriyat, çanakkale moloz taşıma, gelibolu hafriyat, çan hafriyat",
    intro: [
      "Çanakkale'de merkez ilçedeki konut projeleri, Biga'daki sanayi yatırımları ve boğaz hattındaki altyapı çalışmaları için hafriyat hizmeti veriyoruz. Temel kazısı, hafriyat nakli ve dolgu malzemesi teminini tek elden yönetiyoruz.",
      "1915 Çanakkale Köprüsü sonrası bölgede hızlanan konut ve turizm yatırımları hafriyat talebini artırdı. Gelibolu yakası dahil il genelinde araç görevlendiriyor, uzak şantiyelerde günlük sevkiyat planıyla çalışıyoruz.",
    ],
    bolgeler: ["Merkez", "Biga", "Çan", "Gelibolu", "Lapseki", "Ezine", "Ayvacık"],
    faq: [
      {
        q: "Çanakkale'nin Gelibolu yakasında çalışıyor musunuz?",
        a: "Evet. Gelibolu ve Lapseki dahil boğazın iki yakasında da kazı ve hafriyat taşıma hizmeti veriyoruz.",
      },
      {
        q: "Biga'daki sanayi projelerine hizmetiniz var mı?",
        a: "Biga OSB ve çevresindeki tesis inşaatlarında saha kazısı, tesviye ve dolgu işlerini üstleniyoruz.",
      },
      {
        q: "Çanakkale'de hafriyat fiyatı nasıl öğrenirim?",
        a: "Formdan konum ve iş tipini iletin; 30 dakika içinde arayıp Çanakkale'ye özel net fiyat teklifi sunalım.",
      },
    ],
  },
  {
    slug: "edirne",
    ad: "Edirne",
    path: "/hafriyat/edirne",
    title: "Edirne Hafriyat Firması – Kazı, Moloz, Dolgu | Hammaddem",
    description:
      "Edirne'de hafriyat işleri: merkez, Keşan ve Uzunköprü'de temel kazısı, hafriyat taşıma, dolgu malzemesi. Online formla hızlı teklif.",
    keywords:
      "edirne hafriyat, edirne kazı işleri, keşan hafriyat, edirne moloz taşıma, uzunköprü hafriyat, edirne hafriyat firması",
    intro: [
      "Edirne'de merkez ilçedeki konut ve kamu projelerinden Keşan ve İpsala hattındaki lojistik yatırımlara kadar hafriyat hizmeti veriyoruz. Temel kazısı, hafriyat toprağı nakli, moloz kaldırma ve dolgu işlerini üstleniyoruz.",
      "Sınır kapılarına uzanan karayolu ve gümrük sahası projeleri Edirne'de büyük hacimli tesviye ve dolgu ihtiyacı doğuruyor. Trakya genelindeki araç ağımız sayesinde yoğun sevkiyat gerektiren işlerde de kapasite sorunu yaşatmıyoruz.",
    ],
    bolgeler: ["Merkez", "Keşan", "Uzunköprü", "İpsala", "Havsa", "Meriç"],
    faq: [
      {
        q: "Edirne'de hangi bölgelere hizmet veriyorsunuz?",
        a: "Merkez, Keşan, Uzunköprü, İpsala ve Havsa başta olmak üzere Edirne'nin tüm ilçelerine hizmet veriyoruz.",
      },
      {
        q: "Büyük hacimli dolgu işlerini yapabiliyor musunuz?",
        a: "Evet. Yol, saha ve gümrük projeleri gibi on binlerce m³'lük tesviye ve dolgu işlerinde çok araçlı sevkiyat düzeniyle çalışıyoruz.",
      },
      {
        q: "Edirne hafriyat teklifi ne kadar sürede hazır olur?",
        a: "Online formu doldurduktan sonra 30 dakika içinde telefonla net fiyat iletiyoruz; büyük işlerde ücretsiz keşif yapıyoruz.",
      },
    ],
  },
  {
    slug: "ankara",
    ad: "Ankara",
    path: "/hafriyat/ankara",
    title: "Ankara Hafriyat Firması – Kazı, Moloz, Hafriyat İşleri | Hammaddem",
    description:
      "Ankara'da hafriyat işleri: Çankaya, Yenimahalle, Sincan'da temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. 30 dakikada fiyat teklifi.",
    keywords:
      "ankara hafriyat, ankara hafriyat firması, ankara kazı işleri, ankara moloz taşıma, sincan hafriyat, çankaya hafriyat",
    intro: [
      "Ankara'da Çankaya ve Yenimahalle'deki konut projelerinden Sincan ve Kahramankazan'daki sanayi tesislerine kadar geniş bir alanda hafriyat hizmeti veriyoruz. Temel ve bodrum kazıları, hafriyat nakli, moloz kaldırma ve dolgu malzemesi temini ana iş kollarımızdır.",
      "Başkentin kaya ağırlıklı zeminlerinde kazı çoğu zaman kırıcı ekskavatör gerektirir ve iş programını doğrudan etkiler. Zemin tipine göre doğru makine-kamyon kombinasyonunu kurarak metreküp maliyetinizi düşürüyoruz.",
    ],
    bolgeler: ["Çankaya", "Yenimahalle", "Etimesgut", "Sincan", "Keçiören", "Mamak", "Gölbaşı", "Kahramankazan"],
    faq: [
      {
        q: "Ankara'da kaya kazısı yapıyor musunuz?",
        a: "Evet. Ankara'nın sert zeminlerinde kırıcılı ekskavatörlerle kaya kazısı yapıyor, çıkan malzemenin nakli ve dökümünü tek fiyatla teklif ediyoruz.",
      },
      {
        q: "Ankara'da moloz ve inşaat atığını nereye döküyorsunuz?",
        a: "Büyükşehir belediyesinin ruhsatlı döküm sahalarını kullanıyoruz; döküm belgeleri şantiyenize iletilir, mevzuat riski taşımazsınız.",
      },
      {
        q: "Ankara hafriyat m³ fiyatını nasıl öğrenebilirim?",
        a: "Formdan konumu, iş tipini ve tahmini hacmi iletin; zemin durumuna göre net birim fiyatı 30 dakika içinde telefonla bildirelim.",
      },
    ],
  },
  {
    slug: "izmir",
    ad: "İzmir",
    path: "/hafriyat/izmir",
    title: "İzmir Hafriyat Firması – Kazı, Moloz, Hafriyat İşleri | Hammaddem",
    description:
      "İzmir'de hafriyat işleri: Bornova, Çiğli, Torbalı'da temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. Online formla 30 dakikada teklif.",
    keywords:
      "izmir hafriyat, izmir hafriyat firması, izmir kazı işleri, izmir moloz taşıma, torbalı hafriyat, bornova hafriyat",
    intro: [
      "İzmir'de Bayraklı ve Bornova'daki yüksek katlı projelerden Torbalı ve Kemalpaşa'daki sanayi tesislerine kadar her ölçekte hafriyat işi üstleniyoruz. Temel kazısı, hafriyat nakli, moloz kaldırma ve dolgu hizmetlerini tek elden sunuyoruz.",
      "İzmir'de kentsel dönüşümün hızlandığı bölgelerde yıkım sonrası hafriyat ve saha temizliği talebi yüksek. Yıkım molozunun ayrıştırılması ve ruhsatlı sahalara nakli konusunda deneyimli ekiplerle çalışıyoruz.",
    ],
    bolgeler: ["Bornova", "Bayraklı", "Çiğli", "Karşıyaka", "Buca", "Torbalı", "Kemalpaşa", "Menemen"],
    faq: [
      {
        q: "İzmir'de yıkım sonrası hafriyat hizmeti veriyor musunuz?",
        a: "Evet. Kentsel dönüşüm yıkımları sonrası moloz ayrıştırma, yükleme ve ruhsatlı döküm sahasına nakil İzmir'deki ana hizmetlerimizdendir.",
      },
      {
        q: "Torbalı ve Kemalpaşa sanayi bölgelerinde çalışıyor musunuz?",
        a: "Torbalı, Kemalpaşa OSB ve Menemen hattındaki fabrika ve depo inşaatlarında saha kazısı ve dolgu işlerini düzenli olarak yürütüyoruz.",
      },
      {
        q: "İzmir hafriyat fiyat teklifini nasıl alırım?",
        a: "Sayfadaki formu doldurun; işinize özel net fiyatı 30 dakika içinde telefonla iletelim. Büyük sahalarda ücretsiz keşif yapıyoruz.",
      },
    ],
  },
];

export const HAFRIYAT_ILCELER: HafriyatLokasyon[] = [
  {
    slug: "esenyurt",
    ad: "Esenyurt",
    parent: "istanbul",
    path: "/hafriyat/istanbul/esenyurt",
    title: "Esenyurt Hafriyat – Temel Kazısı & Moloz Taşıma | Hammaddem",
    description:
      "Esenyurt'ta hafriyat işleri: site ve konut projeleri için temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. 30 dakikada fiyat teklifi.",
    keywords: "esenyurt hafriyat, esenyurt kazı, esenyurt moloz taşıma, esenyurt hafriyat firması, esenyurt temel kazısı",
    intro: [
      "Esenyurt, İstanbul'un en yoğun konut üretimine sahip ilçesi olarak sürekli hafriyat talebi üretiyor. Site temellerinden dönüşüm projelerine kadar ilçe genelinde kazı ve hafriyat taşıma hizmeti veriyoruz.",
      "İlçedeki yoğun trafik nedeniyle sevkiyat saatlerinin doğru planlanması Esenyurt projelerinde maliyeti doğrudan etkiler. Gece sevkiyatı ve saat dışı yükleme seçenekleriyle şantiye programınızı aksatmıyoruz.",
    ],
    bolgeler: ["Mehterçeşme", "Saadetdere", "Ardıçlı", "Hoşdere", "Kıraç", "Akçaburgaz"],
    faq: [
      {
        q: "Esenyurt'ta hafriyat dökümü nereye yapılıyor?",
        a: "Esenyurt çevresindeki İBB ruhsatlı döküm sahalarını kullanıyoruz; en yakın uygun saha üzerinden fiyatlandırarak nakliye maliyetini düşük tutuyoruz.",
      },
      {
        q: "Site içi dar alanlarda çalışabiliyor musunuz?",
        a: "Evet. Dar giriş ve site içi işlerde uygun tonajda araç ve mini iş makinesi kombinasyonuyla çalışıyoruz.",
      },
    ],
  },
  {
    slug: "basaksehir",
    ad: "Başakşehir",
    parent: "istanbul",
    path: "/hafriyat/istanbul/basaksehir",
    title: "Başakşehir Hafriyat – Kazı & Hafriyat Taşıma | Hammaddem",
    description:
      "Başakşehir'de hafriyat: Kayaşehir ve Bahçeşehir'de temel kazısı, hafriyat toprağı taşıma, dolgu. Hızlı fiyat teklifi için formu doldurun.",
    keywords: "başakşehir hafriyat, kayaşehir hafriyat, bahçeşehir hafriyat, başakşehir kazı işleri, başakşehir moloz",
    intro: [
      "Başakşehir; Kayaşehir etapları, Bahçeşehir konut bölgeleri ve şehir hastanesi çevresindeki yatırımlarla İstanbul'un en aktif inşaat sahalarından biri. Bölgede temel kazısı, hafriyat nakli ve dolgu malzemesi temini hizmeti veriyoruz.",
      "Kanal İstanbul güzergâhına komşu bölgelerdeki projelerde büyük hacimli tesviye işleri öne çıkıyor. Çok araçlı sevkiyat düzenimizle yüksek hacimli işlerde de günlük programı aksatmadan çalışıyoruz.",
    ],
    bolgeler: ["Kayaşehir", "Bahçeşehir", "Başak", "Güvercintepe", "Şahintepe", "Altınşehir"],
    faq: [
      {
        q: "Başakşehir'de büyük site kazılarını üstleniyor musunuz?",
        a: "Evet. Çok bloklu site projelerinde etaplı kazı ve sevkiyat planlaması yaparak on binlerce m³'lük hafriyatı program dahilinde taşıyoruz.",
      },
      {
        q: "Bahçeşehir tarafında da çalışıyor musunuz?",
        a: "Bahçeşehir, Ispartakule ve çevresi dahil Başakşehir'in tüm mahallelerinde hizmet veriyoruz.",
      },
    ],
  },
  {
    slug: "arnavutkoy",
    ad: "Arnavutköy",
    parent: "istanbul",
    path: "/hafriyat/istanbul/arnavutkoy",
    title: "Arnavutköy Hafriyat – Kazı, Dolgu, Tesviye İşleri | Hammaddem",
    description:
      "Arnavutköy'de hafriyat: havalimanı bölgesi ve konut projelerinde kazı, dolgu, tesviye ve hafriyat taşıma. 30 dakikada teklif alın.",
    keywords: "arnavutköy hafriyat, arnavutköy kazı, arnavutköy dolgu, hadımköy hafriyat, arnavutköy hafriyat firması",
    intro: [
      "Arnavutköy, İstanbul Havalimanı çevresindeki lojistik yatırımları ve yeni konut bölgeleriyle hafriyat hacmi en hızlı büyüyen ilçelerden. Hadımköy sanayi bölgesinden Taşoluk'a kadar ilçe genelinde kazı, tesviye ve hafriyat taşıma hizmeti veriyoruz.",
      "Bölgede geniş arazili depo ve tesis projeleri saha tesviyesi ile kazı-dolgu dengesi hesabı gerektirir. Arazinizin kot planına göre kazı fazlasını değerlendirip dolgu ihtiyacını azaltan çözümler öneriyoruz.",
    ],
    bolgeler: ["Hadımköy", "Taşoluk", "Bolluca", "Haraççı", "Ömerli", "Durusu"],
    faq: [
      {
        q: "Havalimanı bölgesindeki lojistik projelerde çalışıyor musunuz?",
        a: "Evet. İstanbul Havalimanı çevresi ve Hadımköy'deki depo ve tesis inşaatlarında saha kazısı ve tesviye işlerini düzenli yürütüyoruz.",
      },
      {
        q: "Arnavutköy'de dolgu malzemesi temin ediyor musunuz?",
        a: "Stabilize, tuvenan ve kırma taş dolgu malzemelerini ocaktan sahaya taşıyoruz; kazı ve dolguyu tek teklif altında fiyatlandırıyoruz.",
      },
    ],
  },
  {
    slug: "tuzla",
    ad: "Tuzla",
    parent: "istanbul",
    path: "/hafriyat/istanbul/tuzla",
    title: "Tuzla Hafriyat – Kazı & Moloz Taşıma İşleri | Hammaddem",
    description:
      "Tuzla'da hafriyat: sanayi tesisleri ve konut projelerinde temel kazısı, hafriyat taşıma, moloz kaldırma. Hızlı ve lisanslı hizmet.",
    keywords: "tuzla hafriyat, tuzla kazı işleri, tuzla moloz taşıma, tuzla hafriyat firması, orhanlı hafriyat",
    intro: [
      "Tuzla; tersaneler bölgesi, deri OSB ve Orhanlı sanayi hattıyla Anadolu yakasının önemli hafriyat pazarlarından. Sanayi tesisleri ve konut projelerinde temel kazısı, hafriyat nakli ve moloz kaldırma hizmeti veriyoruz.",
      "Sabiha Gökçen Havalimanı çevresi ve Orhanlı'daki lojistik yatırımlar bölgede saha tesviyesi talebini artırıyor. TEM bağlantılı güzergâh planlamasıyla sevkiyatı trafiğe takılmadan yürütüyoruz.",
    ],
    bolgeler: ["Orhanlı", "Aydınlı", "İçmeler", "Mimar Sinan", "Şifa", "Akfırat"],
    faq: [
      {
        q: "Tuzla'da sanayi tesisi kazıları yapıyor musunuz?",
        a: "Evet. Tuzla OSB, deri OSB ve Orhanlı bölgesindeki fabrika ve depo inşaatlarında saha kazısı ana iş alanlarımızdandır.",
      },
      {
        q: "Tuzla'dan hafriyat dökümü nereye yapılıyor?",
        a: "Anadolu yakasındaki İBB ruhsatlı döküm sahalarını kullanıyoruz; döküm belgeleri şantiyenize iletilir.",
      },
    ],
  },
  {
    slug: "pendik",
    ad: "Pendik",
    parent: "istanbul",
    path: "/hafriyat/istanbul/pendik",
    title: "Pendik Hafriyat – Temel Kazısı & Hafriyat Taşıma | Hammaddem",
    description:
      "Pendik'te hafriyat işleri: konut ve dönüşüm projelerinde temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. 30 dakikada fiyat teklifi.",
    keywords: "pendik hafriyat, pendik kazı, pendik moloz taşıma, pendik hafriyat firması, kurtköy hafriyat",
    intro: [
      "Pendik'te Kurtköy ve Şeyhli'deki yeni konut bölgelerinden sahil hattındaki dönüşüm projelerine kadar kazı ve hafriyat taşıma hizmeti veriyoruz. Temel kazısı, moloz kaldırma ve dolgu işlerinde tek muhatapla çalışırsınız.",
      "Sabiha Gökçen çevresindeki ticari yatırımlar ve metro hattı etkisiyle Kurtköy aksında inşaat temposu yüksek. Bölgeyi tanıyan operatörlerimiz dar zamanlı iş programlarına uyum sağlar.",
    ],
    bolgeler: ["Kurtköy", "Şeyhli", "Kaynarca", "Velibaba", "Güzelyalı", "Yenişehir"],
    faq: [
      {
        q: "Pendik'te kentsel dönüşüm yıkım hafriyatı alıyor musunuz?",
        a: "Evet. Yıkım sonrası moloz yükleme, ayrıştırma ve ruhsatlı sahaya nakil Pendik'te sık yürüttüğümüz işlerdendir.",
      },
      {
        q: "Kurtköy'de hafriyat fiyatı ne kadar?",
        a: "Hacim, zemin ve döküm mesafesine göre değişir. Formdan bilgileri iletin; Kurtköy'e özel net fiyatı 30 dakikada bildirelim.",
      },
    ],
  },
  {
    slug: "sancaktepe",
    ad: "Sancaktepe",
    parent: "istanbul",
    path: "/hafriyat/istanbul/sancaktepe",
    title: "Sancaktepe Hafriyat – Kazı & Moloz İşleri | Hammaddem",
    description:
      "Sancaktepe'de hafriyat: konut ve site projelerinde temel kazısı, hafriyat taşıma, moloz kaldırma. Online formla hızlı fiyat teklifi.",
    keywords: "sancaktepe hafriyat, sancaktepe kazı, sancaktepe moloz taşıma, samandıra hafriyat, sarıgazi hafriyat",
    intro: [
      "Sancaktepe, Anadolu yakasının en hızlı yapılaşan ilçelerinden biri olarak Samandıra ve Sarıgazi bölgelerinde yoğun hafriyat talebi üretiyor. Konut temelleri, site kazıları ve moloz kaldırma işlerinde ilçe genelinde hizmet veriyoruz.",
      "Şile Otoyolu ve çevre bağlantıları sayesinde Sancaktepe'den Anadolu yakası döküm sahalarına hızlı erişim mümkün; bu da taşıma maliyetini bölge lehine düşürüyor. Doğru saha seçimiyle m³ başına en uygun fiyatı çıkarıyoruz.",
    ],
    bolgeler: ["Samandıra", "Sarıgazi", "Yenidoğan", "Abdurrahmangazi", "Eyüp Sultan", "Veysel Karani"],
    faq: [
      {
        q: "Sancaktepe'de küçük ölçekli moloz işleri alıyor musunuz?",
        a: "Evet. Tek kamyonluk moloz ve tadilat atığı işlerinden büyük site kazılarına kadar her ölçekte talep alıyoruz.",
      },
      {
        q: "Sancaktepe'de hafriyat teklifi nasıl alırım?",
        a: "Sayfadaki formu doldurmanız yeterli; 30 dakika içinde arayıp net fiyat iletiyoruz.",
      },
    ],
  },
  {
    slug: "beylikduzu",
    ad: "Beylikdüzü",
    lokatif: "Beylikdüzü'nde",
    parent: "istanbul",
    path: "/hafriyat/istanbul/beylikduzu",
    title: "Beylikdüzü Hafriyat – Temel Kazısı & Moloz Taşıma | Hammaddem",
    description:
      "Beylikdüzü'nde hafriyat işleri: site ve rezidans projelerinde temel kazısı, hafriyat taşıma, moloz kaldırma. 30 dakikada fiyat teklifi.",
    keywords: "beylikdüzü hafriyat, beylikdüzü kazı, beylikdüzü moloz taşıma, gürpınar hafriyat, beylikdüzü hafriyat firması",
    intro: [
      "Beylikdüzü'nde rezidans ve site projelerinin yoğunlaştığı Adnan Kahveci, Yakuplu ve Gürpınar bölgelerinde temel kazısı, hafriyat nakli ve moloz kaldırma hizmeti veriyoruz. Derin bodrumlu projelerde etaplı kazı planlamasıyla çalışıyoruz.",
      "İlçenin marmara kıyısındaki eğimli parselleri istinat ve şev çözümleri gerektirir; kazı programını statik projeye uygun kurup iksa imalatçılarıyla koordineli ilerliyoruz.",
    ],
    bolgeler: ["Adnan Kahveci", "Yakuplu", "Gürpınar", "Barış", "Cumhuriyet", "Kavaklı"],
    faq: [
      {
        q: "Beylikdüzü'nde derin bodrum kazısı yapıyor musunuz?",
        a: "Evet. Çok katlı bodrumlu rezidans projelerinde iksa ile koordineli etaplı kazı ve hafriyat nakli hizmeti veriyoruz.",
      },
      {
        q: "Beylikdüzü hafriyat fiyatını etkileyen nedir?",
        a: "Kazı derinliği, zemin sınıfı ve döküm sahası mesafesi ana etkenlerdir. Formu doldurun; projenize özel fiyatı aynı gün iletelim.",
      },
    ],
  },
  {
    slug: "umraniye",
    ad: "Ümraniye",
    parent: "istanbul",
    path: "/hafriyat/istanbul/umraniye",
    title: "Ümraniye Hafriyat – Kazı & Moloz Taşıma İşleri | Hammaddem",
    description:
      "Ümraniye'de hafriyat: konut ve ticari projelerde temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. Hızlı fiyat teklifi için formu doldurun.",
    keywords: "ümraniye hafriyat, ümraniye kazı, ümraniye moloz taşıma, ümraniye hafriyat firması, dudullu hafriyat",
    intro: [
      "Ümraniye'de finans merkezi çevresindeki ticari projelerden Dudullu OSB'deki sanayi yapılarına ve ilçe genelindeki dönüşüm inşaatlarına kadar kazı ve hafriyat hizmeti veriyoruz. Yoğun kent dokusunda güvenli kazı ve temiz sevkiyat önceliğimizdir.",
      "Merkezi konumdaki şantiyelerde saat kısıtları ve dar sokaklar sevkiyatı zorlaştırır. Gece yükleme izinleri ve uygun tonajlı araç seçimiyle Ümraniye'nin sıkışık bölgelerinde de programı aksatmadan çalışıyoruz.",
    ],
    bolgeler: ["Dudullu", "İnkılap", "Çakmak", "Ihlamurkuyu", "Tatlısu", "Yamanevler"],
    faq: [
      {
        q: "Ümraniye'de gece hafriyat sevkiyatı yapıyor musunuz?",
        a: "Gerekli izinler alındığında gece sevkiyatı planlıyoruz; yoğun bölge şantiyelerinde trafiğe takılmadan hızlı tahliye sağlıyoruz.",
      },
      {
        q: "Dudullu OSB'deki tesislere hizmet veriyor musunuz?",
        a: "Evet. Dudullu OSB ve çevresindeki sanayi yapılarında kazı, tesviye ve moloz işlerini düzenli yürütüyoruz.",
      },
    ],
  },
];

export const HAFRIYAT_LOKASYONLAR: HafriyatLokasyon[] = [
  ...HAFRIYAT_ILLER,
  ...HAFRIYAT_ILCELER,
];

export function getHafriyatLokasyon(slug: string, parent?: string): HafriyatLokasyon | undefined {
  return HAFRIYAT_LOKASYONLAR.find((l) => l.slug === slug && l.parent === parent);
}

/** "İstanbul'da", "Pendik'te", "Kocaeli'de" gibi bulunma hali üretir. */
export function hafriyatLokatif(lokasyon: HafriyatLokasyon): string {
  if (lokasyon.lokatif) return lokasyon.lokatif;
  const ad = lokasyon.ad;
  const kucuk = ad.toLocaleLowerCase("tr-TR");
  const unluler = "aeıioöuü";
  const sertUnsuzler = "fstkçşhp";
  const sonHarf = kucuk[kucuk.length - 1];
  let sonUnlu = "a";
  for (let i = kucuk.length - 1; i >= 0; i--) {
    if (unluler.includes(kucuk[i])) {
      sonUnlu = kucuk[i];
      break;
    }
  }
  const kalin = "aıou".includes(sonUnlu);
  const unsuz = sertUnsuzler.includes(sonHarf) ? "t" : "d";
  return `${ad}'${unsuz}${kalin ? "a" : "e"}`;
}
