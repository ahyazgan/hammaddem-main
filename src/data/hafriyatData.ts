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
  /** Sayfa H1'i; "—" ile ayrılan ikinci parça vurgulu (lacivert) satır olarak basılır */
  h1?: string;
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
    title: "İstanbul Hafriyat Firması | Kazı, Moloz, 30 Dk Teklif",
    h1: "İstanbul Hafriyat Firması — Temel Kazısı, Moloz ve Hafriyat Taşıma",
    description:
      "İstanbul'da lisanslı hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. Avrupa ve Anadolu yakası, 39 ilçe. 30 dakikada net teklif.",
    keywords:
      "istanbul hafriyat firmaları, istanbul hafriyat firması, hafriyat firmaları istanbul, istanbul hafriyat, istanbul anadolu yakası hafriyat firmaları, istanbul avrupa yakası hafriyat firmaları, istanbul hafriyat şirketleri",
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
    title: "Kocaeli Hafriyat Firması | Gebze, İzmit Kazı & Moloz",
    h1: "Kocaeli Hafriyat Firması — Gebze, İzmit, Çayırova, Dilovası",
    description:
      "Kocaeli'de hafriyat firması: Gebze, İzmit, Çayırova ve Dilovası OSB'lerde temel kazısı, hafriyat taşıma, moloz ve dolgu. Lisanslı araç, 30 dakikada teklif.",
    keywords:
      "kocaeli hafriyat firmaları, gebze hafriyat firmaları, izmit hafriyat firmaları, gebze hafriyat şirketi, kocaeli hafriyatçılar, kocaeli kepçe kiralama",
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
    title: "Bursa Hafriyat Firması | Kazı, Moloz Taşıma, Dolgu",
    h1: "Bursa Hafriyat Firması — Nilüfer, Osmangazi, İnegöl",
    description:
      "Bursa'da hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz taşıma ve stabilize dolgu. Nilüfer, Osmangazi, İnegöl, Gemlik. 30 dakikada teklif.",
    keywords:
      "bursa hafriyat firmaları, bursa hafriyat, moloz taşıma bursa, bursa moloz taşıma fiyatları, nilüfer hafriyat, inegöl hafriyat, bursa kepçe kiralama",
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
    title: "Tekirdağ Hafriyat Firması | Çorlu, Çerkezköy Kazı",
    h1: "Tekirdağ Hafriyat Firması — Çorlu, Çerkezköy, Kapaklı",
    description:
      "Tekirdağ'da hafriyat firması: Çorlu, Çerkezköy, Kapaklı ve Ergene sanayi bölgelerinde temel kazısı, hafriyat taşıma, dolgu. Lisanslı araç, 30 dk teklif.",
    keywords:
      "tekirdağ hafriyat firmaları, çorlu hafriyat firmaları, çerkezköy hafriyat firmaları, tekirdağ hafriyat döküm sahası, çorlu kepçe kiralama, çerkezköy hafriyat inşaat",
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
    title: "Sakarya Hafriyat Firması | Adapazarı Kazı & Dolgu",
    h1: "Sakarya Hafriyat Firması — Adapazarı, Serdivan, Hendek",
    description:
      "Sakarya'da hafriyat firması: Adapazarı, Serdivan, Hendek'te temel kazısı, hafriyat toprağı taşıma, dolgu ve kum-çakıl temini. 30 dakikada fiyat teklifi.",
    keywords:
      "sakarya hafriyat firmaları, adapazarı hafriyat firmaları, sakarya hafriyat şirketleri, sakarya hafriyat döküm sahası, sakarya kepçe kiralama, sakarya hafriyat",
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
    title: "Yalova Hafriyat Firması | Villa Kazısı, Moloz, Dolgu",
    h1: "Yalova Hafriyat Firması — Çınarcık, Termal, Çiftlikköy",
    description:
      "Yalova'da hafriyat firması: villa ve site projelerinde temel kazısı, moloz taşıma, dolgu. Dar alanlara küçük tonajlı araç. 30 dakikada fiyat teklifi.",
    keywords:
      "yalova hafriyat firmaları, yalova hafriyat döküm sahası, yalova kepçe kiralama, çınarcık hafriyat, yalova hafriyat",
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
    title: "Balıkesir Hafriyat Firması | Bandırma, Edremit Kazı",
    h1: "Balıkesir Hafriyat Firması — Bandırma, Edremit, Ayvalık",
    description:
      "Balıkesir'de hafriyat firması: Bandırma, Edremit, Ayvalık'ta temel kazısı, hafriyat taşıma, dolgu ve moloz. Lisanslı araç filosu, 30 dakikada teklif.",
    keywords:
      "balıkesir hafriyat firmaları, bandırma hafriyat firmaları, bandırma hafriyat, balıkesir hafriyat, balıkesir hafriyat döküm sahası, balıkesir kepçe kiralama",
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
    title: "Çanakkale Hafriyat Firması | Kazı, Moloz, Dolgu İşleri",
    h1: "Çanakkale Hafriyat Firması — Merkez, Biga, Gelibolu",
    description:
      "Çanakkale'de hafriyat firması: Merkez, Biga, Gelibolu'da temel kazısı, hafriyat toprağı taşıma, moloz ve dolgu. Lisanslı araçlar, 30 dakikada teklif.",
    keywords:
      "çanakkale hafriyat firmaları, çanakkale hafriyat, biga hafriyat, çanakkale moloz taşıma, gelibolu hafriyat",
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
    title: "Edirne Hafriyat Firması | Kazı, Moloz, Dolgu İşleri",
    h1: "Edirne Hafriyat Firması — Keşan, Uzunköprü, Merkez",
    description:
      "Edirne'de hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz ve dolgu. Trakya genelinde lisanslı araçlar. 30 dakikada fiyat teklifi alın.",
    keywords:
      "edirne hafriyat firmaları, edirne hafriyat, edirne kepçe kiralama, kırklareli hafriyat firmaları, lüleburgaz hafriyat firmaları",
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
    title: "Ankara Hafriyat Firması | Kazı, Moloz, Döküm Ücretleri",
    h1: "Ankara Hafriyat Firması — Kazı, Moloz Taşıma, Döküm",
    description:
      "Ankara'da hafriyat firması: temel kazısı, hafriyat taşıma, moloz kaldırma. Ankara hafriyat döküm sahaları ve 2026 döküm ücretleri. 30 dakikada teklif alın.",
    keywords:
      "ankara hafriyat firmaları, hafriyat firmaları ankara, ankara hafriyat fiyatları, ankara hafriyat döküm sahaları, ankara moloz taşıma, ankara kepçe kiralama",
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
    title: "İzmir Hafriyat Firması | Kazı, Moloz, Hafriyat Taşıma",
    h1: "İzmir Hafriyat Firması — Kazı, Moloz ve Hafriyat Taşıma",
    description:
      "İzmir'de hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma, dolgu. Bornova, Torbalı, Menemen, Aliağa. 30 dakikada net fiyat teklifi.",
    keywords:
      "izmir hafriyat firmaları, izmir hafriyat firması, hafriyat firmaları izmir, izmir hafriyat şirketleri, izmir hafriyat fiyatları, izmir moloz taşıma, izmir kepçe kiralama",
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
    title: "Esenyurt Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Esenyurt Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Esenyurt'ta hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. Mahalle bazlı hızlı sevkiyat, lisanslı araç. 30 dakikada net teklif.",
    keywords:
      "esenyurt hafriyat firmaları, esenyurt hafriyat, esenyurt kepçe kiralama, esenyurt hafriyat firması, esenyurt moloz taşıma",
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
    title: "Başakşehir Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Başakşehir Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Başakşehir'de hafriyat firması: temel kazısı, hafriyat taşıma, moloz kaldırma. Kayaşehir ve Bahçeşehir'e hızlı sevkiyat, lisanslı araç. 30 dakikada teklif.",
    keywords:
      "başakşehir hafriyat firmaları, başakşehir hafriyat, başakşehir kepçe kiralama, bahçeşehir hafriyat, başakşehir hafriyat firması, başakşehir moloz taşıma",
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
    title: "Arnavutköy Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Arnavutköy Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Arnavutköy ve Hadımköy'de hafriyat firması: temel kazısı, hafriyat taşıma, moloz. Döküm sahalarına en yakın filo, lisanslı araç. 30 dakikada net teklif.",
    keywords:
      "arnavutköy hafriyat firmaları, arnavutköy hafriyat, hadımköy hafriyat firmaları, hadımköy hafriyat, arnavutköy hafriyat döküm sahası, arnavutköy hafriyat firması, arnavutköy moloz taşıma",
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
    title: "Tuzla Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Tuzla Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Tuzla'da hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. Orhanlı ve OSB bölgesine hızlı sevkiyat, lisanslı araç. 30 dk teklif.",
    keywords:
      "tuzla hafriyat firmaları, tuzla hafriyat, tuzla hafriyat döküm sahası, tuzla kepçe kiralama, orhanlı hafriyat, tuzla hafriyat firması, tuzla moloz taşıma",
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
    title: "Pendik Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Pendik Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Pendik ve Kurtköy'de hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. Mahalle bazlı hızlı sevkiyat, lisanslı araç. 30 dk teklif.",
    keywords:
      "pendik hafriyat firmaları, pendik hafriyat, kurtköy hafriyat firmaları, kurtköy hafriyat, pendik moloz taşıma, pendik hafriyat firması, pendik moloz taşıma",
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
    title: "Sancaktepe Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Sancaktepe Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Sancaktepe'de hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. Mahalle bazlı hızlı sevkiyat, lisanslı araç. 30 dakikada teklif.",
    keywords:
      "sancaktepe hafriyat firmaları, sancaktepe hafriyat, sancaktepe hafriyat firması, sancaktepe moloz taşıma",
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
    title: "Beylikdüzü Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Beylikdüzü Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Beylikdüzü'nde hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. Gürpınar dahil hızlı sevkiyat, lisanslı araç. 30 dakikada teklif.",
    keywords:
      "beylikdüzü hafriyat firmaları, beylikdüzü hafriyat, beylikdüzü kepçe kiralama, gürpınar hafriyat, beylikdüzü hafriyat firması, beylikdüzü moloz taşıma",
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
    title: "Ümraniye Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Ümraniye Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Ümraniye'de hafriyat firması: temel kazısı, hafriyat toprağı taşıma, moloz kaldırma. Dudullu dahil hızlı sevkiyat, lisanslı araç. 30 dakikada net teklif.",
    keywords:
      "ümraniye hafriyat firmaları, ümraniye hafriyat, ümraniye belediye moloz taşıma fiyatları, dudullu hafriyat, ümraniye hafriyat firması, ümraniye moloz taşıma",
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
  {
    slug: "kartal",
    ad: "Kartal",
    parent: "istanbul",
    path: "/hafriyat/istanbul/kartal",
    title: "Kartal Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Kartal Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Kartal'da hafriyat firması: kentsel dönüşüm yıkımlarında temel kazısı, moloz kaldırma, hafriyat taşıma. Lisanslı araç, aynı gün servis, 30 dk teklif.",
    keywords:
      "kartal hafriyat firmaları, kartal hafriyat, kartal moloz taşıma, kartal temel kazısı, yakacık hafriyat, soğanlık hafriyat, kartal hafriyat firması",
    intro: [
      "Kartal, eski sanayi parsellerinin konuta dönüştüğü ve kentsel dönüşümün en yoğun yaşandığı Anadolu yakası ilçelerinden. Yakacık, Soğanlık ve Cevizli hattındaki yıkım-yeniden yapım projelerinde temel kazısı, yıkım molozu kaldırma ve hafriyat nakli hizmeti veriyoruz.",
      "Kartal'da parseller çoğunlukla dar ve bitişik nizam olduğu için kazı, iksa imalatıyla etaplı ilerler. E-5 ve sahil yolu bağlantısı sayesinde Anadolu yakası döküm sahalarına erişim hızlıdır; bu da sefer süresini ve maliyeti aşağı çeker.",
    ],
    bolgeler: ["Yakacık", "Soğanlık", "Cevizli", "Orhantepe", "Esentepe", "Uğur Mumcu", "Hürriyet", "Petrol İş"],
    faq: [
      {
        q: "Kartal'da kentsel dönüşüm yıkım molozunu alıyor musunuz?",
        a: "Evet. Yıkım sonrası moloz yükleme, ayrıştırma ve ruhsatlı sahaya nakil Kartal'da en sık yaptığımız işlerden. Döküm belgeleri iş sahibine iletilir.",
      },
      {
        q: "Bitişik nizam parselde kazı yapabiliyor musunuz?",
        a: "Evet. Komşu binaya bitişik kazılarda iksa projesine uygun, etaplı çalışıyoruz; küçük tonajlı araç ve mini ekskavatör kombinasyonuyla dar parsellere giriyoruz.",
      },
    ],
  },
  {
    slug: "maltepe",
    ad: "Maltepe",
    parent: "istanbul",
    path: "/hafriyat/istanbul/maltepe",
    title: "Maltepe Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Maltepe Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Maltepe'de hafriyat firması: temel kazısı, moloz kaldırma, hafriyat toprağı taşıma. Başıbüyük ve Gülsuyu'nda eğimli arazi kazısı. 30 dakikada teklif.",
    keywords:
      "maltepe hafriyat firmaları, maltepe hafriyat, maltepe moloz taşıma, maltepe temel kazısı, başıbüyük hafriyat, küçükyalı hafriyat, maltepe hafriyat firması",
    intro: [
      "Maltepe'de sahil hattındaki konut projelerinden Başıbüyük ve Gülsuyu'ndaki dönüşüm alanlarına kadar kazı ve hafriyat taşıma hizmeti veriyoruz. Küçükyalı ve Altayçeşme'deki tadilat molozu işlerinden site ölçekli temel kazılarına kadar her ölçekte çalışıyoruz.",
      "İlçenin kuzeyi belirgin şekilde eğimlidir; Başıbüyük ve Büyükbakkalköy hattındaki parsellerde kazı çoğu zaman istinat ve şev çözümleriyle birlikte planlanır. Eğimli arazide araç manevrası kısıtlı olduğundan sevkiyat düzenini önceden kuruyoruz.",
    ],
    bolgeler: ["Küçükyalı", "Altayçeşme", "Bağlarbaşı", "Cevizli", "Başıbüyük", "Gülsuyu", "Zümrütevler", "Fındıklı"],
    faq: [
      {
        q: "Maltepe'de eğimli arazide kazı yapıyor musunuz?",
        a: "Evet. Başıbüyük ve Gülsuyu gibi eğimli bölgelerde şev güvenliği ve istinat imalatıyla koordineli, etaplı kazı yapıyoruz.",
      },
      {
        q: "Maltepe'de daire tadilat molozu için de geliyor musunuz?",
        a: "Geliyoruz. Çuval bazlı veya küçük tonajlı araçla tek seferlik moloz kaldırma işleri de alıyoruz; minimum hacim şartımız yok.",
      },
    ],
  },
  {
    slug: "atasehir",
    ad: "Ataşehir",
    parent: "istanbul",
    path: "/hafriyat/istanbul/atasehir",
    title: "Ataşehir Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Ataşehir Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Ataşehir'de hafriyat firması: ofis ve rezidans projelerinde derin bodrum kazısı, moloz kaldırma, hafriyat taşıma. Gece sevkiyatı, 30 dakikada teklif.",
    keywords:
      "ataşehir hafriyat firmaları, ataşehir hafriyat, ataşehir moloz taşıma, ataşehir temel kazısı, küçükbakkalköy hafriyat, içerenköy hafriyat, ataşehir hafriyat firması",
    intro: [
      "Ataşehir, finans merkezi çevresindeki ofis ve rezidans yatırımlarıyla İstanbul'un en yoğun derin kazı bölgelerinden biri. Çok katlı bodrum otoparkı olan projelerde iksa ile koordineli etaplı kazı, hafriyat nakli ve moloz kaldırma hizmeti veriyoruz.",
      "İlçedeki şantiyeler yoğun trafik akslarının üzerinde olduğu için sevkiyat saatleri kritiktir. Gerekli izinler alındığında gece yüklemesi planlayarak gündüz trafiğine takılmadan yüksek hacimli tahliye yapıyoruz.",
    ],
    bolgeler: ["Barbaros", "Küçükbakkalköy", "İçerenköy", "Yenisahra", "Ferhatpaşa", "Örnek", "Esatpaşa", "İnönü"],
    faq: [
      {
        q: "Ataşehir'de çok katlı bodrum kazısı yapıyor musunuz?",
        a: "Evet. Ofis ve rezidans projelerinde 3–4 bodrum katına kadar derin kazıları iksa imalatçısıyla koordineli, etaplı olarak yürütüyoruz.",
      },
      {
        q: "Gece hafriyat sevkiyatı mümkün mü?",
        a: "Gerekli izinler alındığında gece sevkiyatı planlıyoruz; Ataşehir'in yoğun akslarında bu, iş programını belirgin şekilde hızlandırır.",
      },
    ],
  },
  {
    slug: "avcilar",
    ad: "Avcılar",
    parent: "istanbul",
    path: "/hafriyat/istanbul/avcilar",
    title: "Avcılar Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Avcılar Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Avcılar'da hafriyat firması: dönüşüm projelerinde temel kazısı, zemin iyileştirme kazısı, moloz kaldırma ve hafriyat taşıma. 30 dakikada fiyat teklifi.",
    keywords:
      "avcılar hafriyat firmaları, avcılar hafriyat, avcılar moloz taşıma, avcılar temel kazısı, ambarlı hafriyat, firuzköy hafriyat, avcılar hafriyat firması",
    intro: [
      "Avcılar, alüvyonlu zemin yapısı ve deprem riski nedeniyle kentsel dönüşümün öncelikli ilan edildiği ilçelerden. Merkez, Denizköşkler ve Gümüşpala hattındaki yıkım-yeniden yapım projelerinde temel kazısı, yıkım molozu kaldırma ve hafriyat nakli yapıyoruz.",
      "Bölgede zemin iyileştirme ve derin temel uygulamaları sık görülür; bu da kazı hacmini büyütür. Ambarlı liman ve E-5 bağlantısı sayesinde Avrupa yakası döküm sahalarına sevkiyat planı kolay kurulur.",
    ],
    bolgeler: ["Merkez", "Denizköşkler", "Gümüşpala", "Ambarlı", "Firuzköy", "Cihangir", "Tahtakale", "Üniversite"],
    faq: [
      {
        q: "Avcılar'da zemin iyileştirme kazılarını yapıyor musunuz?",
        a: "Evet. Derin temel ve zemin iyileştirme projelerinde çıkan yüksek hacimli hafriyatın taşınması ve uygun dolgu malzemesinin getirilmesi uzmanlık alanımızdır.",
      },
      {
        q: "Avcılar'da yıkım sonrası saha temizliği yapıyor musunuz?",
        a: "Yapıyoruz. Yıkım molozunun ayrıştırılması, yüklenmesi ve ruhsatlı sahaya nakli ile arsanın inşaata hazır teslimi hizmetimize dahildir.",
      },
    ],
  },
  {
    slug: "kucukcekmece",
    ad: "Küçükçekmece",
    parent: "istanbul",
    path: "/hafriyat/istanbul/kucukcekmece",
    title: "Küçükçekmece Hafriyat Firması | Kazı, Moloz, Teklif",
    h1: "Küçükçekmece Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Küçükçekmece'de hafriyat firması: Halkalı, Sefaköy ve İkitelli'de temel kazısı, moloz kaldırma, hafriyat taşıma. Lisanslı araç, 30 dakikada teklif.",
    keywords:
      "küçükçekmece hafriyat firmaları, küçükçekmece hafriyat, küçükçekmece moloz taşıma, halkalı hafriyat, sefaköy hafriyat, ikitelli hafriyat, küçükçekmece temel kazısı",
    intro: [
      "Küçükçekmece; Halkalı'daki büyük konut etapları, Sefaköy'ün yoğun kent dokusu ve İkitelli OSB'ye komşu sanayi parselleriyle sürekli hafriyat talebi üretir. Konut temellerinden tesis sahalarına kadar kazı, nakliye ve moloz işlerini üstleniyoruz.",
      "İlçede hem çok bloklu site kazıları hem dar sokaklarda tadilat molozu işleri bir arada yürür. Aynı gün içinde farklı tonajda araç görevlendirerek her iki ölçeğe de aynı ekiple cevap veriyoruz.",
    ],
    bolgeler: ["Halkalı", "Sefaköy", "İkitelli", "Atakent", "Kanarya", "Cennet", "Söğütlüçeşme", "Yeşilova"],
    faq: [
      {
        q: "İkitelli OSB'deki tesislere hizmet veriyor musunuz?",
        a: "Evet. İkitelli OSB ve çevresindeki üretim tesisi, depo ve atölye inşaatlarında saha kazısı, tesviye ve moloz işlerini düzenli yürütüyoruz.",
      },
      {
        q: "Halkalı'daki site projelerinde etaplı çalışıyor musunuz?",
        a: "Evet. Çok bloklu projelerde etaplı kazı ve sevkiyat planı kurup, blok teslim programına uygun şekilde ilerliyoruz.",
      },
    ],
  },
  {
    slug: "silivri",
    ad: "Silivri",
    parent: "istanbul",
    path: "/hafriyat/istanbul/silivri",
    title: "Silivri Hafriyat Firması | Kazı, Moloz Taşıma, Teklif",
    h1: "Silivri Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Silivri'de hafriyat firması: villa, site ve depo projelerinde temel kazısı, dolgu, moloz taşıma. Döküm sahalarına yakınlık avantajı, 30 dk teklif.",
    keywords:
      "silivri hafriyat firmaları, silivri hafriyat, silivri moloz taşıma, silivri temel kazısı, selimpaşa hafriyat, silivri hafriyat döküm sahası, silivri hafriyat firması",
    intro: [
      "Silivri; sahil hattındaki villa ve site projeleri ile D-100 aksındaki lojistik depo yatırımlarıyla Avrupa yakasının batı ucundaki en hareketli inşaat bölgesi. Temel kazısı, arazi tesviyesi, dolgu ve moloz taşıma işlerini tek elden yürütüyoruz.",
      "Bölgenin en büyük avantajı, İstanbul'un lisanslı hafriyat döküm sahalarının önemli bölümünün Silivri ve çevresinde olması. Sahaya mesafe kısa olduğu için sefer süresi ve buna bağlı m³ maliyeti, merkez ilçelere göre belirgin şekilde düşük kalır.",
    ],
    bolgeler: ["Merkez", "Selimpaşa", "Gümüşyaka", "Ortaköy", "Alipaşa", "Değirmenköy", "Çanta", "Semizkumlar"],
    faq: [
      {
        q: "Silivri'de hafriyat neden daha uygun fiyatlı?",
        a: "Lisanslı döküm sahalarının çoğu bu bölgede olduğu için kamyon gidiş-dönüş süresi kısalır; günlük sefer sayısı artar ve m³ başına maliyet düşer.",
      },
      {
        q: "Silivri'de depo ve lojistik tesis sahası kazısı yapıyor musunuz?",
        a: "Evet. Geniş arazili depo projelerinde saha tesviyesi, kazı-dolgu dengesi hesabı ve stabilize dolgu teminini birlikte planlıyoruz.",
      },
    ],
  },
  {
    slug: "catalca",
    ad: "Çatalca",
    parent: "istanbul",
    path: "/hafriyat/istanbul/catalca",
    title: "Çatalca Hafriyat Firması | Kazı, Dolgu, Tesviye İşleri",
    h1: "Çatalca Hafriyat Firması — Kazı, Dolgu ve Arazi Tesviyesi",
    description:
      "Çatalca'da hafriyat firması: arazi tesviyesi, temel kazısı, dolgu malzemesi ve hafriyat taşıma. Geniş arazi projelerinde çok araçlı sevkiyat, 30 dk teklif.",
    keywords:
      "çatalca hafriyat firmaları, çatalca hafriyat, çatalca kazı, çatalca dolgu, çatalca arazi tesviye, çatalca hafriyat döküm sahası, çatalca hafriyat firması",
    intro: [
      "Çatalca, geniş tarım ve sanayi arazileriyle İstanbul'un tesviye ve dolgu işlerinin yoğunlaştığı ilçesi. Depo ve tesis sahalarından çiftlik ve villa projelerine kadar arazi düzenleme, temel kazısı ve dolgu malzemesi temini yapıyoruz.",
      "Bölgedeki projelerde kazı kadar dolgu da belirleyicidir: arazi kotunu düzenlerken kazıdan çıkan uygun malzemeyi sahada değerlendirip hem döküm hem malzeme maliyetini düşürüyoruz. Çatalca çevresindeki döküm sahalarına yakınlık sevkiyatı hızlandırır.",
    ],
    bolgeler: ["Kaleiçi", "Ferhatpaşa", "Ovayenice", "Hallaçlı", "Karacaköy", "Ormanlı", "Subaşı", "Çanakça"],
    faq: [
      {
        q: "Çatalca'da arazi tesviyesi yapıyor musunuz?",
        a: "Evet. Kot planına göre saha tesviyesi, kazı-dolgu dengesi hesabı ve serme-sıkıştırma işlerini tek teklif altında yürütüyoruz.",
      },
      {
        q: "Dolgu malzemesini de siz mi getiriyorsunuz?",
        a: "Getiriyoruz. Stabilize, tuvenan ve kırma taş dolgu malzemesini ocaktan sahaya taşıyor, kazı ve dolguyu tek fiyatla teklif ediyoruz.",
      },
    ],
  },
  {
    slug: "buyukcekmece",
    ad: "Büyükçekmece",
    parent: "istanbul",
    path: "/hafriyat/istanbul/buyukcekmece",
    title: "Büyükçekmece Hafriyat Firması | Kazı, Moloz, Teklif",
    h1: "Büyükçekmece Hafriyat Firması — Temel Kazısı ve Moloz Taşıma",
    description:
      "Büyükçekmece'de hafriyat firması: villa ve site projelerinde temel kazısı, moloz kaldırma, dolgu ve hafriyat taşıma. Lisanslı araç, 30 dakikada teklif.",
    keywords:
      "büyükçekmece hafriyat firmaları, büyükçekmece hafriyat, büyükçekmece moloz taşıma, mimarsinan hafriyat, kumburgaz hafriyat, büyükçekmece temel kazısı",
    intro: [
      "Büyükçekmece; göl çevresindeki villa siteleri, Kumburgaz–Celaliye sahil hattı ve TÜYAP çevresindeki ticari yapılarla sürekli inşaat trafiğine sahne oluyor. Temel kazısı, hafriyat nakli, moloz kaldırma ve dolgu işlerinde ilçe genelinde hizmet veriyoruz.",
      "Sahil şeridindeki parsellerde taban suyu seviyesi yüksek olabildiği için kazı, susuzlaştırma planıyla birlikte kurulur. Site içi ve dar giriş gerektiren villa projelerinde küçük tonajlı araçlarla çalışıyoruz.",
    ],
    bolgeler: ["Mimarsinan", "Kumburgaz", "Celaliye", "Kamiloba", "Türkoba", "Atatürk", "Dizdariye", "Fatih"],
    faq: [
      {
        q: "Büyükçekmece'de villa temel kazısı yapıyor musunuz?",
        a: "Evet. Göl çevresi ve sahil hattındaki villa ve site projelerinde temel kazısı, hafriyat nakli ve dolgu hizmetini tek pakette veriyoruz.",
      },
      {
        q: "Taban suyu çıkan parsellerde ne yapıyorsunuz?",
        a: "Drenaj hendeği ve dalgıç pompayla susuzlaştırma planı kuruyor, kazıyı taban bozulmadan tamamlıyoruz; gerekirse kuyu tipi drenaj uyguluyoruz.",
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
