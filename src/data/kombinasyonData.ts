// Şehir + Malzeme kombinasyonları için benzersiz içerik verisi
// Her sayfa Google'ın duplicate content tespitinden korunmak için gerçek, özgün bilgi içerir

export interface SehirBilgi {
  slug: string;
  ad: string;
  osblar: string[];
  ilceler: string[];
  sanayi: string;
  lojistik: string;
  inşaatBolgeleri: string;
  nufus: string;
}

export interface MalzemeSehirIcerik {
  // Her malzeme+şehir için özgün paragraflar
  aciklama: string;          // Giriş paragrafı - 100+ kelime
  hizmetDetay: string;       // Nasıl çalışır - 100+ kelime
  yerelBilgi: string;        // Şehre özel bölgeler - 80+ kelime
  faqSorular: Array<{ q: string; a: string }>;
}

// Şehir bazında temel bilgiler
export const SEHIR_BILGI: Record<string, SehirBilgi> = {
  istanbul: {
    slug: "istanbul",
    ad: "İstanbul",
    osblar: ["İkitelli OSB", "Tuzla OSB", "Dudullu OSB", "Beylikdüzü OSB", "DOSAB"],
    ilceler: ["Esenyurt", "Arnavutköy", "Tuzla", "Pendik", "Büyükçekmece", "Çekmeköy", "Silivri", "Gebze (yakın bölge)"],
    sanayi: "Türkiye'nin en büyük sanayi ve lojistik merkezi; tekstil, metal, kimya, gıda ve inşaat sektörleri",
    lojistik: "Avrupa ve Anadolu yakası için ayrı araç filomuz, Boğaz geçişi koordinasyonu, 7/24 aktif lojistik",
    inşaatBolgeleri: "Başakşehir ve Arnavutköy'deki büyük konut projeleri, Tuzla sanayi bölgesi, Halkalı ve Esenyurt kentsel dönüşüm alanları",
    nufus: "16 milyon",
  },
  ankara: {
    slug: "ankara",
    ad: "Ankara",
    osblar: ["OSTİM OSB", "ASO 1. OSB", "ASO 2. OSB", "Sincan OSB", "Pursaklar OSB", "Kahramankazan OSB"],
    ilceler: ["Sincan", "Pursaklar", "Etimesgut", "Yenimahalle", "Mamak", "Keçiören", "Polatlı"],
    sanayi: "Savunma sanayi, makine üretimi, gıda sektörü ve devlet yatırım projeleri ağırlıklı",
    lojistik: "İç Anadolu dağıtım merkezi; Konya, Eskişehir, Kırıkkale güzergahlarına bağlantı",
    inşaatBolgeleri: "Etimesgut ve Sincan'daki TOKİ konut projeleri, Kahramankazan OSB genişleme alanları, Yenimahalle kentsel dönüşüm",
    nufus: "5.7 milyon",
  },
  izmir: {
    slug: "izmir",
    ad: "İzmir",
    osblar: ["Atatürk OSB (AOSB)", "Kemalpaşa OSB", "Çiğli OSB", "Torbalı OSB", "Aliağa Kimya Sanayi"],
    ilceler: ["Kemalpaşa", "Torbalı", "Çiğli", "Aliağa", "Menemen", "Bornova", "Bayraklı"],
    sanayi: "Ege'nin en büyük liman şehri; ihracat odaklı gıda, otomotiv yan sanayi, kimya ve tekstil",
    lojistik: "İzmir Limanı ve Aliağa Limanı entegrasyonu; Ege bölgesi dağıtım merkezi",
    inşaatBolgeleri: "Bayraklı ve Bornova dönüşüm projeleri, Torbalı lojistik parkı, Çiğli sanayi genişleme bölgeleri",
    nufus: "4.4 milyon",
  },
  bursa: {
    slug: "bursa",
    ad: "Bursa",
    osblar: ["Bursa OSB", "BOSAB (Bursa Otomotiv ve Yan Sanayi İhtisas OSB)", "Nilüfer Teknoloji Geliştirme Bölgesi", "Gemlik İhtisas OSB"],
    ilceler: ["Nilüfer", "Osmangazi", "Yıldırım", "Gemlik", "İnegöl", "Mudanya"],
    sanayi: "Türkiye'nin otomotiv başkenti; Renault, Fiat ve yüzlerce yan sanayi firması; tekstil ve gıda",
    lojistik: "Gemlik Limanı'na yakınlık, İstanbul güzergahı (2 saat), İzmir bağlantısı, TIR parkları",
    inşaatBolgeleri: "Nilüfer'deki hızlı konut gelişimi, OSB genişleme projeleri, Mudanya sahil projeleri",
    nufus: "3.2 milyon",
  },
  kocaeli: {
    slug: "kocaeli",
    ad: "Kocaeli",
    osblar: ["GOSB (Gebze OSB)", "Dilovası OSB", "İzmit OSB", "Körfez OSB", "TOSB (Tuzla-OSB yakın)"],
    ilceler: ["Gebze", "Dilovası", "Körfez", "Gölcük", "Derince", "Başiskele"],
    sanayi: "Türkiye'nin petrokimya ve ağır sanayi kalbi; Ford, Hyundai üretim tesisleri, kimya ve ilaç sektörü",
    lojistik: "TEM otoyolu üzerinde İstanbul-Ankara kavşağı; Derince ve İzmit limanları; E-5 güzergahı",
    inşaatBolgeleri: "Gebze'deki lojistik depolar ve OSB genişlemeleri, Körfez Sanayi bölgesi yenileme, Başiskele kentsel dönüşüm",
    nufus: "2.1 milyon",
  },
  gaziantep: {
    slug: "gaziantep",
    ad: "Gaziantep",
    osblar: ["Gaziantep OSB", "GOSB 2. ve 3. Bölge", "İslahiye OSB", "Nizip OSB"],
    ilceler: ["Şehitkamil", "Şahinbey", "İslahiye", "Nizip", "Nurdağı", "Oğuzeli"],
    sanayi: "Güneydoğu Anadolu'nun sanayi merkezi; tekstil, gıda, makine ve plastik üretimi; Orta Doğu ihracatı",
    lojistik: "Suriye ve Orta Doğu sınırına yakınlık, Mersin/İskenderun limanlarına bağlantı, uluslararası TIR güzergahları",
    inşaatBolgeleri: "OSB genişleme projeleri, şehir merkezi dönüşümü, Nurdağı ve Nizip sanayi alanları",
    nufus: "2.2 milyon",
  },
  adana: {
    slug: "adana",
    ad: "Adana",
    osblar: ["Adana OSB (AOSB)", "Adana Karaisalı OSB", "Yumurtalık Serbest Ticaret Bölgesi"],
    ilceler: ["Seyhan", "Yüreğir", "Çukurova", "Sarıçam", "Karaisalı", "Ceyhan"],
    sanayi: "Çukurova bölgesinin sanayi merkezi; pamuk ve tekstil, tarımsal gıda, çimento üretimi, petrokimya",
    lojistik: "İskenderun Körfezi limanlarına yakınlık, Mersin-Gaziantep arası kavşak nokta, E-90 otoyolu üzerinde",
    inşaatBolgeleri: "Sarıçam ve Yüreğir'deki yeni konut projeleri, OSB genişleme alanları, Ceyhan petrokimya bölgesi",
    nufus: "2.2 milyon",
  },
  konya: {
    slug: "konya",
    ad: "Konya",
    osblar: ["Konya OSB (KOSB)", "Konya Küçük Sanayi Sitesi", "Karatay OSB"],
    ilceler: ["Karatay", "Meram", "Selçuklu", "Ereğli", "Akşehir", "Ilgın"],
    sanayi: "Tarım makineleri ve metal sektörü lideri; Un, makarna, şekerleme üretimi; inşaat malzemeleri",
    lojistik: "İç Anadolu'nun merkezi; Ankara-Antalya güzergahı kavşağı, Ereğli ve Karapınar endüstri alanları",
    inşaatBolgeleri: "Selçuklu ilçesindeki hızlı kentleşme, Karatay sanayi dönüşümü, Konya çevreyolu sanayi bantları",
    nufus: "2.3 milyon",
  },
  antalya: {
    slug: "antalya",
    ad: "Antalya",
    osblar: ["Antalya OSB", "Kepez OSB", "DOSAB (Döşemealtı OSB)"],
    ilceler: ["Kepez", "Döşemealtı", "Serik", "Manavgat", "Alanya", "Elmalı"],
    sanayi: "Turizm inşaatı ve seracılık ağırlıklı; granit ve mermer işleme, tarımsal gıda, ambalaj",
    lojistik: "Antalya Limanı ve havalimanı lojistiği; Burdur-Isparta dağıtım merkezi; sahil projeleri",
    inşaatBolgeleri: "Turizm tesisi yatırımları, Kepez ve Döşemealtı konut gelişimi, OSB genişleme alanları, sera yapım projeleri",
    nufus: "2.6 milyon",
  },
};

// Malzeme bazında şehre özel içerik şablonları
export interface MalzemeKomboIcerik {
  aciklama: (sehir: SehirBilgi) => string;
  hizmetDetay: (sehir: SehirBilgi) => string;
  yerelBilgi: (sehir: SehirBilgi) => string;
  faq: (sehir: SehirBilgi) => Array<{ q: string; a: string }>;
}

export const MALZEME_ICERIK: Record<string, MalzemeKomboIcerik> = {
  cimento: {
    aciklama: (s) =>
      `${s.ad}'da çimento silobas taşıma için Hammaddem'i tercih edin. ${s.sanayi} alanında faaliyet gösteren firmalara, ${s.osblar.slice(0, 3).join(", ")} gibi organize sanayi bölgelerine ve büyük inşaat projelerine çimento tedariği sağlıyoruz. CEM I, CEM II ve portland çimentosu dahil tüm çimento türleri için silobas araç filomuzla ${s.ad} genelinde güvenli ve hızlı teslimat sunuyoruz.`,
    hizmetDetay: (s) =>
      `${s.ad}'da çimento silobas taşıma süreciniz Hammaddem platformuyla tamamen dijital olarak yönetilir. Talep formunu doldurduğunuzda ${s.ad} bölgesindeki araç filomuz 30 dakika içinde size özel fiyat teklifi sunar. ${s.lojistik} avantajından yararlanarak aynı gün veya ertesi gün teslimat seçenekleri sunuyoruz. Kapalı pnömatik silobas sistemiyle çimentonun nem ve kirlenme riski olmadan güvenle taşınmasını garanti ediyoruz. Ton bazında rekabetçi fiyatlar için hemen talep oluşturun.`,
    yerelBilgi: (s) =>
      `${s.ad} çimento taşıma hizmetimiz özellikle ${s.ilceler.slice(0, 4).join(", ")} ilçelerini kapsamaktadır. ${s.inşaatBolgeleri} gibi aktif yapılaşma alanlarına öncelikli teslimat yapıyoruz. ${s.osblar[0]} ve ${s.osblar[1] ?? s.osblar[0]} bölgelerindeki sanayi tesislerine düzenli çimento tedariki konusunda deneyimliyiz.`,
    faq: (s) => [
      {
        q: `${s.ad}'da çimento silobas taşıma fiyatları nasıl belirlenir?`,
        a: `${s.ad}'da çimento fiyatları; ton miktarı, teslimat noktası (${s.ilceler[0]}, ${s.ilceler[1]} gibi ilçeler arasında mesafeye göre farklılık gösterir), çimento türü (CEM I, CEM II) ve teslimat zamanlamasına göre değişir. Hammaddem üzerinden talep oluşturduğunuzda 30 dakika içinde güncel fiyat teklifi alırsınız.`,
      },
      {
        q: `${s.ad} bölgesinde minimum çimento sipariş miktarı nedir?`,
        a: `${s.ad} bölgesinde genellikle 10 ton ve üzeri çimento siparişleri kabul ediyoruz. ${s.osblar[0]} veya büyük inşaat projeleri için daha büyük hacimli siparişlerde özel fiyatlandırma uygulanmaktadır. Küçük miktarlar için bizimle doğrudan iletişime geçebilirsiniz.`,
      },
      {
        q: `${s.ad}'da aynı gün çimento teslimatı mümkün mü?`,
        a: `Evet, ${s.ad} merkezine ve ${s.ilceler.slice(0, 3).join(", ")} ilçelerine araç müsaitliğine göre aynı gün teslimat yapılmaktadır. Acil teslimat taleplerinde platformdaki "acil" seçeneğini işaretleyin, öncelikli araç tahsisi yapılır.`,
      },
    ],
  },

  kum: {
    aciklama: (s) =>
      `${s.ad}'da inşaat kumu ve dere kumu tedariki için Hammaddem'i kullanın. ${s.inşaatBolgeleri} başta olmak üzere ${s.ad}'ın tüm yapılaşma bölgelerine kum teslimatı yapıyoruz. Yıkanmış kum, kırma kum ve dere kumu çeşitleri için ton bazında rekabetçi fiyat; ${s.lojistik} imkânıyla hızlı teslimat garantisi sunuyoruz.`,
    hizmetDetay: (s) =>
      `${s.ad} inşaat sektörü için kum tedarik sürecini Hammaddem dijitalleştiriyor. ${s.osblar.slice(0, 2).join(" ve ")} bölgelerindeki sanayi tesislerinden büyük konut projelerine kadar farklı kalite ve granülometride kum sağlıyoruz. Online talep formunuzu doldurduğunuzda, ${s.ad} genelindeki nakliyecilerden en uygun fiyat teklifini 30 dakika içinde alırsınız. ${s.lojistik} sayesinde düzenli kum teslimatlarını kolayca planlayabilirsiniz.`,
    yerelBilgi: (s) =>
      `${s.ad}'da kum ihtiyacı en yoğun ${s.ilceler.slice(0, 3).join(", ")} ilçelerinde faaliyet gösteren müteahhit ve yapı firmalarına öncelikli hizmet veriyoruz. ${s.inşaatBolgeleri} bölgeleri için stok durumuna göre aynı gün kum teslimatı organize edilebilmektedir.`,
    faq: (s) => [
      {
        q: `${s.ad}'da inşaat kumu çeşitleri ve fiyatları nasıldır?`,
        a: `${s.ad}'da dere kumu, yıkanmış kum ve kırma kum çeşitlerinde hizmet veriyoruz. Fiyatlar; ${s.ilceler[0]} ve ${s.ilceler[1]} gibi bölgelere göre nakliye mesafesiyle değişir, ton başına rakibimizden %10-15 daha uygun fiyat sunmayı hedefliyoruz. Güncel fiyat için talep oluşturun.`,
      },
      {
        q: `${s.ad} bölgesine kum teslimatı kaç saatte yapılır?`,
        a: `${s.ad} merkez ilçelerine genellikle 4-8 saat içinde teslimat sağlıyoruz. ${s.osblar[0]} ve çevresi gibi sanayi bölgelerine öncelikli araç tahsisi yapıldığından daha hızlı teslimat mümkündür. Platformdan teslimat takibini anlık görebilirsiniz.`,
      },
      {
        q: `${s.ad}'da hangi kum kalitesi inşaat için uygundur?`,
        a: `${s.ad}'daki zemin ve iklim koşulları için genellikle yıkanmış veya elekli kum önerilir. Beton üretimi için CEN standartlarına uygun kırma kum, sıva ve dolgu için dere kumu tercih edilmektedir. Teknik destek için Hammaddem uzmanlarına ulaşabilirsiniz.`,
      },
    ],
  },

  cakil: {
    aciklama: (s) =>
      `${s.ad}'da çakıl ve agrega tedariki için Hammaddem'i tercih edin. ${s.sanayi} sektörlerine hizmet eden ${s.osblar.slice(0, 2).join(" ve ")} bölgeleri başta olmak üzere tüm ${s.ad} genelinde çakıl teslimatı yapıyoruz. Beton agregası, drenaj çakılı ve peyzaj çakılı çeşitleri için ton bazında uygun fiyat ve güvenilir teslimat sağlıyoruz.`,
    hizmetDetay: (s) =>
      `${s.ad} çakıl tedarik hizmetimiz; beton santralleri, prefabrik üreticileri ve altyapı projelerine özel fiyatlandırma sunar. ${s.lojistik} avantajıyla ${s.ilceler.slice(0, 3).join(", ")} ilçelerine zamanında teslimat garantisi veriyoruz. Hammaddem platformu üzerinden miktarınızı ve teslim tarihinizi belirterek 30 dakika içinde teklif alabilirsiniz. Düzenli çakıl ihtiyaçlarınız için aylık ve yıllık tedarik sözleşmesi imkânı da sunuyoruz.`,
    yerelBilgi: (s) =>
      `${s.ad}'da çakıl kullanımı en yoğun ${s.inşaatBolgeleri} bölgelerindedir. ${s.osblar[0]} sanayi bölgesi firmalarına agrega ve çakıl tedariki konusunda uzun süreli deneyime sahibiz. ${s.ilceler.slice(0, 2).join(" ve ")} ilçelerindeki altyapı projelerine öncelikli hizmet veriyoruz.`,
    faq: (s) => [
      {
        q: `${s.ad}'da çakıl fiyatları ton başına ne kadardır?`,
        a: `${s.ad}'da çakıl fiyatları agrega boyutuna (0-5mm, 5-12mm, 12-25mm), mesafeye ve miktara göre değişmektedir. ${s.ilceler[0]} merkezine ton başına nakliye dahil fiyat almak için Hammaddem üzerinden talep oluşturun; 30 dakika içinde güncel fiyat bildiriyoruz.`,
      },
      {
        q: `${s.ad}'da beton agregası için hangi çakıl boyutu uygundur?`,
        a: `${s.ad}'daki standart beton üretimi için 5-12mm ve 12-25mm kırmataş agrega kullanılır. Drenaj ve temel dolgusunda 25-50mm iri çakıl tercih edilmektedir. Üretim standardına göre doğru malzeme seçimi için teknik ekibimizle iletişime geçebilirsiniz.`,
      },
      {
        q: `${s.ad} bölgesine büyük tonajlı çakıl siparişi verebilir miyim?`,
        a: `Evet, ${s.ad}'da 100 ton ve üzeri büyük hacimli çakıl siparişleri için özel fiyat ve uzun vadeli tedarik sözleşmeleri düzenlenebilmektedir. ${s.osblar[0]} ve ${s.inşaatBolgeleri.split(",")[0]} gibi büyük proje bölgelerine toplu teslimat koordinasyonu sağlıyoruz.`,
      },
    ],
  },

  micir: {
    aciklama: (s) =>
      `${s.ad}'da mıcır ve kırmataş tedariki için Hammaddem platformunu kullanın. ${s.sanayi} kapsamındaki sanayi tesisleri, beton santralleri ve altyapı projelerine ${s.osblar.slice(0, 3).join(", ")} dahil tüm ${s.ad} bölgesine mıcır teslimatı yapıyoruz. 0-5mm, 4-8mm ve 8-16mm ebatlarında kaliteli mıcır için rekabetçi fiyat teklifi alın.`,
    hizmetDetay: (s) =>
      `${s.ad}'da mıcır tedarik sürecini Hammaddem dijitalleştiriyor. Talep formunda mıcır boyutunu ve miktarı belirttiğinizde ${s.ad}'daki tedarikçi ağımız 30 dakika içinde fiyat teklifi sunar. ${s.lojistik} altyapısı sayesinde ${s.ilceler.slice(0, 4).join(", ")} ilçelerinde aynı gün veya ertesi gün teslimat mümkündür. Düzenli mıcır ihtiyaçlarınız için haftalık veya aylık programlı teslimat seçeneği de sunuyoruz.`,
    yerelBilgi: (s) =>
      `${s.ad}'da mıcır en çok ${s.inşaatBolgeleri} bölgelerindeki altyapı ve inşaat projelerinde kullanılmaktadır. ${s.osblar[0]} sanayi bölgesindeki beton santralleri ve üretim tesisleri başlıca mıcır kullanıcılarımız arasındadır. ${s.ilceler.slice(1, 3).join(" ve ")} ilçelerindeki yol yapım projelerine de düzenli teslimat yapıyoruz.`,
    faq: (s) => [
      {
        q: `${s.ad}'da mıcır boyutları ve fiyatları nelerdir?`,
        a: `${s.ad}'da 0-5mm ince mıcır (şap için), 4-8mm (beton için), 8-16mm ve 16-32mm kaba mıcır çeşitleri mevcuttur. Fiyatlar ${s.ilceler[0]} merkezine göre değişmekte olup ton başına fiyat için Hammaddem'den talep oluşturun.`,
      },
      {
        q: `${s.ad}'da mıcır siparişi için asgari miktar nedir?`,
        a: `${s.ad} bölgesinde minimum 5 ton mıcır siparişi kabul ediyoruz. ${s.osblar[0]} gibi sanayi bölgelerindeki düzenli tedarik müşterileri için özel indirimli fiyat uygulanmaktadır.`,
      },
      {
        q: `${s.ad} mıcırı yol yapımı için uygun mudur?`,
        a: `Evet, ${s.ad}'da tedarik ettiğimiz kırma mıcır, karayolları teknik şartnamesine uygun standartlarda olmaktadır. ${s.ilceler.slice(0, 2).join(" ve ")} ilçelerindeki belediye ve özel yol projelerinde sık tercih edilmektedir.`,
      },
    ],
  },

  kalsit: {
    aciklama: (s) =>
      `${s.ad}'da kalsit ve kalsiyum karbonat tedariki için Hammaddem'i tercih edin. ${s.sanayi} sektörlerine hizmet veren ${s.osblar.slice(0, 2).join(" ve ")} başta olmak üzere tüm ${s.ad} genelinde kalsit teslimatı yapıyoruz. Boya, plastik, kauçuk, kağıt ve ilaç sektörü için farklı incelik derecelerinde (GCC, PCC) kalsit tedariki sağlıyoruz.`,
    hizmetDetay: (s) =>
      `${s.ad} kalsit tedarik hizmetimiz, silobas araçlarla kapalı sistem taşıma ve hassas tartım imkânı sunmaktadır. ${s.lojistik} altyapısıyla ${s.ilceler.slice(0, 3).join(", ")} ilçelerindeki üretim tesislerine zamanında ve standart kalitede kalsit teslimatı garanti ediyoruz. Hammaddem platformu üzerinden talep oluşturun, 30 dakika içinde ${s.ad} bölgesi için fiyat teklifi alın.`,
    yerelBilgi: (s) =>
      `${s.ad}'da kalsit kullanımı ${s.osblar[0]} ve ${s.osblar[1] ?? s.osblar[0]} sanayi bölgelerindeki boya, plastik ve yapı kimyasalları üreticilerinde yoğunlaşmaktadır. ${s.inşaatBolgeleri} bölgelerindeki boya ve kaplama firmalarına da düzenli kalsit tedariki yapıyoruz.`,
    faq: (s) => [
      {
        q: `${s.ad}'da kalsit çeşitleri ve kullanım alanları nelerdir?`,
        a: `${s.ad}'da GCC (öğütülmüş) ve PCC (çöktürülmüş) kalsit çeşitleri mevcuttur. Boya ve plastik sektöründe 3-5 mikron, kağıt sektöründe 1-2 mikron, yapı malzemeleri ve sıva sektöründe 40-100 mikron kalsit kullanılmaktadır. ${s.osblar[0]} firmalarına özel granülometri seçenekleri sunuyoruz.`,
      },
      {
        q: `${s.ad}'da kalsit silobas taşıma nasıl yapılır?`,
        a: `${s.ad}'da kalsit, nem ve kirlenmeyi engellemek için pnömatik silobas araçlarla taşınır. ${s.ilceler[0]} ve çevresindeki üretim tesislerine silobas boşaltma hattı uygunluğuna göre doğrudan silolara aktarım yapıyoruz.`,
      },
      {
        q: `${s.ad} bölgesinde kalsit minimum sipariş miktarı nedir?`,
        a: `${s.ad}'da minimum 10 ton kalsit siparişi kabul ediyoruz. ${s.osblar[0]} bölgesindeki düzenli tedarik anlaşmaları için aylık ve üç aylık sözleşme seçenekleri mevcuttur.`,
      },
    ],
  },

  kirec: {
    aciklama: (s) =>
      `${s.ad}'da kireç (söndürülmüş/sönmemiş) tedariki için Hammaddem platformunu kullanın. ${s.sanayi} sektörlerine hizmet veren ${s.osblar.slice(0, 2).join(" ve ")} başta olmak üzere ${s.ad} genelinde kireç teslimatı yapıyoruz. Atık su arıtma, demir-çelik, inşaat ve tarım sektörü için CaO ve Ca(OH)₂ türündeki kireç ürünlerini silobas araçlarla güvenle taşıyoruz.`,
    hizmetDetay: (s) =>
      `${s.ad}'da kireç tedarik sürecini Hammaddem hızlandırıyor. Talep formunda kireç türü (CaO/Ca(OH)₂), saflık derecesi ve miktarı belirttiğinizde ${s.ad} bölgesi için 30 dakika içinde fiyat teklifi alırsınız. ${s.lojistik} sayesinde ${s.ilceler.slice(0, 3).join(", ")} ilçelerindeki arıtma tesisleri ve üretim santrallerine zamanında kireç teslimatı garanti ediyoruz.`,
    yerelBilgi: (s) =>
      `${s.ad}'da kireç en fazla ${s.osblar[0]} bölgesindeki demir-çelik ve metal işleme tesisleri ile atık su arıtma tesislerinde kullanılmaktadır. ${s.inşaatBolgeleri} bölgelerindeki sıva ve bağlayıcı malzeme olarak da söndürülmüş kireç talebimiz yüksektir.`,
    faq: (s) => [
      {
        q: `${s.ad}'da sönmemiş kireç (CaO) ile söndürülmüş kireç (Ca(OH)₂) farkı nedir?`,
        a: `Sönmemiş kireç (CaO) demir-çelik, çevre arıtma ve kimya sanayisinde kullanılırken; söndürülmüş kireç Ca(OH)₂ tarım, inşaat sıvası ve su arıtmada tercih edilir. ${s.ad}'daki ${s.osblar[0]} gibi sanayi tesisleri genellikle sönmemiş kireç kullanmaktadır.`,
      },
      {
        q: `${s.ad} bölgesine kireç taşımada özel koşullar var mı?`,
        a: `Evet, kireç reaktif bir madde olduğundan pnömatik silobas araçlarla kapalı sistem taşıma zorunludur. ${s.ad} bölgesindeki araçlarımız kireç taşımasına uygun olup kaçak ve nem riskine karşı ekstra önlemler alınmaktadır.`,
      },
      {
        q: `${s.ad}'da kireç teslim süresi ne kadardır?`,
        a: `${s.ad} merkez ve ${s.ilceler.slice(0, 2).join(", ")} ilçelerine genellikle 24-48 saat içinde kireç teslimatı sağlanmaktadır. Acil durumlarda araç müsaitliğine göre aynı gün teslimat da mümkündür.`,
      },
    ],
  },

  alci: {
    aciklama: (s) =>
      `${s.ad}'da alçı ve alçı bazlı ürün tedariki için Hammaddem'i tercih edin. ${s.sanayi} alanındaki inşaat sektörüne hizmet veren ${s.osblar.slice(0, 2).join(" ve ")} başta olmak üzere ${s.ad} genelinde alçı teslimatı yapıyoruz. Beta alçısı, alfa alçısı, gips ve alçı levha hammaddesi çeşitleri için silobas taşıma ve dökme teslimat imkânı sunuyoruz.`,
    hizmetDetay: (s) =>
      `${s.ad} alçı tedarik hizmetimiz; alçı üreticileri, boya ve yapı kimyasalları firmaları ile büyük inşaat şantiyelerine özel fiyatlandırma sunar. ${s.lojistik} altyapısıyla ${s.ilceler.slice(0, 3).join(", ")} ilçelerinde zamanında teslimat garanti ediyoruz. Hammaddem platformundan 30 dakika içinde ${s.ad} bölgesi için alçı fiyat teklifi alabilirsiniz.`,
    yerelBilgi: (s) =>
      `${s.ad}'da alçı kullanımı ${s.inşaatBolgeleri} bölgelerindeki inşaat projelerinde yoğunlaşmaktadır. ${s.osblar[0]} ve çevresindeki alçı ürünleri üreticilerine düzenli hammadde tedariki yapıyoruz.`,
    faq: (s) => [
      {
        q: `${s.ad}'da beta ve alfa alçısı farkı ve kullanım alanları nelerdir?`,
        a: `Beta alçısı (hemihydrate β) inşaat sıvası, alçı levha ve prefabrik üretimde; alfa alçısı ise diş alçısı, tıp ve yüksek mukavemetli seramik kalıp üretiminde kullanılır. ${s.ad}'daki inşaat sektörü ağırlıklı olarak beta alçısı talep etmektedir.`,
      },
      {
        q: `${s.ad} bölgesinde alçı silobas taşıma nasıl çalışır?`,
        a: `${s.ad}'da alçı silobas araçlarla nem almadan taşınır, depolama silolarına pnömatik olarak aktarılır. ${s.ilceler[0]} ve ${s.ilceler[1]} bölgesindeki şantiye ve üretim tesislerine uyumlu boşaltma sistemiyle hizmet veriyoruz.`,
      },
      {
        q: `${s.ad}'da alçı fiyatları nasıl şekilleniyor?`,
        a: `${s.ad}'da alçı fiyatları; saflık derecesi, incelik (mesh), nakliye mesafesi ve sipariş miktarına göre değişmektedir. ${s.osblar[0]} bölgesine ton başına fiyat için Hammaddem'den talep oluşturun, 30 dakika içinde güncel fiyat alırsınız.`,
      },
    ],
  },

  "mermer-tozu": {
    aciklama: (s) =>
      `${s.ad}'da mermer tozu ve kalsit unu tedariki için Hammaddem'i kullanın. ${s.sanayi} kapsamındaki üretim tesisleri başta olmak üzere ${s.osblar.slice(0, 2).join(" ve ")} bölgelerine mermer tozu teslimatı yapıyoruz. Boya, plastik, dolgu malzemesi ve tarım sektörü için farklı incelik derecelerinde mermer tozu ve kalsit unu tedarik ediyoruz.`,
    hizmetDetay: (s) =>
      `${s.ad}'da mermer tozu tedarik hizmetimiz silobas araçlarla kapalı sistem taşıma imkânı sunar. ${s.lojistik} altyapısı sayesinde ${s.ilceler.slice(0, 3).join(", ")} ilçelerindeki boya, yapı kimyasalları ve plastik üretim tesislerine zamanında teslimat yapıyoruz. Hammaddem platformunda talep oluşturun, 30 dakika içinde ${s.ad} için fiyat teklifi alın.`,
    yerelBilgi: (s) =>
      `${s.ad}'da mermer tozu tüketimi ${s.osblar[0]} ve ${s.osblar[1] ?? s.osblar[0]} bölgelerindeki boya ve yapı malzemeleri üretim tesislerinde yoğunlaşmaktadır. ${s.inşaatBolgeleri} bölgelerindeki cephe kaplaması ve dekoratif beton üretiminde de artan mermer tozu talebi karşılıyoruz.`,
    faq: (s) => [
      {
        q: `${s.ad}'da mermer tozu incelik dereceleri ve kullanım alanları nelerdir?`,
        a: `${s.ad}'da 40 mesh (boya dolgu), 100 mesh (plastik dolgu), 200-325 mesh (ince boya ve kaplama) mermer tozu çeşitleri tedarik ediyoruz. ${s.osblar[0]} bölgesindeki fabrikalar için teknik şartnameye uygun granülometride teslimat yapıyoruz.`,
      },
      {
        q: `${s.ad} bölgesine mermer tozu silobas taşıma imkânı var mı?`,
        a: `Evet, ${s.ad}'daki ${s.ilceler[0]} ve ${s.ilceler[1]} bölgelerindeki üretim tesislerine mermer tozu pnömatik silobas araçlarla teslim edilmektedir. Silo kapasitesine göre farklı araç büyüklüklerinde hizmet verilmektedir.`,
      },
      {
        q: `${s.ad}'da boya sektörü için en çok hangi mermer tozu tercih edilir?`,
        a: `${s.ad}'daki boya üreticileri genellikle 40-100 mesh arası, beyazlık değeri yüksek (L>95) GCC mermer tozu tercih etmektedir. ${s.osblar[0]} bölgesindeki boya fabrikalarının ihtiyaçları doğrultusunda uygun saflık ve incelikteki mermer tozu tedariki yapıyoruz.`,
      },
    ],
  },

  "ucucu-kul": {
    aciklama: (s) =>
      `${s.ad}'da uçucu kül (fly ash) tedariki için Hammaddem'i tercih edin. ${s.sanayi} alanındaki çimento ve beton üreticilerine hizmet veren ${s.osblar.slice(0, 2).join(" ve ")} başta olmak üzere ${s.ad} genelinde uçucu kül teslimatı yapıyoruz. Beton karışım katkısı, çimento ikamesi ve zemin stabilizasyonu amacıyla F ve C sınıfı uçucu kül tedarik ediyoruz.`,
    hizmetDetay: (s) =>
      `${s.ad} uçucu kül tedarik hizmetimiz; beton santralleri, hazır beton üreticileri ve büyük altyapı projelerine özel fiyatlandırma sunar. ${s.lojistik} altyapısıyla ${s.ilceler.slice(0, 3).join(", ")} ilçelerindeki üretim tesislerine zamanında uçucu kül teslimatı yapıyoruz. Hammaddem platformundan talep oluşturun, 30 dakika içinde güncel fiyat teklifi alın.`,
    yerelBilgi: (s) =>
      `${s.ad}'da uçucu kül kullanımı ${s.osblar[0]} bölgesindeki beton santralleri ve çimento fabrikalarında yoğunlaşmaktadır. ${s.inşaatBolgeleri} bölgelerindeki büyük altyapı projelerinde uçucu kül kullanımı zemin dayanımını artırırken maliyeti düşürmektedir.`,
    faq: (s) => [
      {
        q: `${s.ad}'da uçucu kül hangi sektörlerde kullanılır?`,
        a: `${s.ad}'da uçucu kül başlıca hazır beton ve beton santrallerinde çimento ikamesi (beton dayanımını artırır), zemin iyileştirme ve stabilizasyon, tuğla ve yapı bloku üretiminde kullanılmaktadır. ${s.osblar[0]} bölgesindeki beton santralleri başlıca kullanıcılarımız arasındadır.`,
      },
      {
        q: `${s.ad}'da F sınıfı ile C sınıfı uçucu kül farkı nedir?`,
        a: `F sınıfı uçucu kül (düşük kireç, pozolan) dayanım artırıcı beton katkısı; C sınıfı uçucu kül (yüksek kireç) ise zemin stabilizasyonu ve kendiliğinden bağlayıcı karışımlar için uygundur. ${s.ad}'daki proje ihtiyacınıza göre doğru sınıfı öneriyoruz.`,
      },
      {
        q: `${s.ad} bölgesinde uçucu kül teslimatı ne kadar sürer?`,
        a: `${s.ad} merkezi ve ${s.ilceler.slice(0, 2).join(", ")} bölgelerine genellikle 24-48 saat içinde uçucu kül teslimatı yapılmaktadır. Büyük proje ihtiyaçları için önceden rezervasyon yapılması önerilir.`,
      },
    ],
  },

  stabilize: {
    aciklama: (s) =>
      `${s.ad}'da stabilize malzeme (kırma taş + kum karışımı) tedariki için Hammaddem'i kullanın. ${s.sanayi} kapsamındaki altyapı projeleri ve yol yapım çalışmalarına hizmet veren ${s.osblar.slice(0, 2).join(" ve ")} bölgeleri başta olmak üzere ${s.ad} genelinde stabilize teslimatı yapıyoruz. Zemin iyileştirme, OSB yolları ve geçici şantiye yolları için uygun stabilize malzeme tedarik ediyoruz.`,
    hizmetDetay: (s) =>
      `${s.ad} stabilize tedarik hizmetimiz; yol yapım firmaları, belediyeler ve OSB yönetimleri için uygun maliyetli seçenekler sunar. ${s.lojistik} altyapısıyla ${s.ilceler.slice(0, 4).join(", ")} ilçelerindeki şantiye ve yol projelerine zamanında teslimat yapıyoruz. Günlük veya haftalık programlı stabilize teslimatı için Hammaddem platformundan talep oluşturun.`,
    yerelBilgi: (s) =>
      `${s.ad}'da stabilize en fazla ${s.inşaatBolgeleri} bölgelerindeki OSB iç yolları, konut sitesi girişleri ve kırsal yol iyileştirme projelerinde kullanılmaktadır. ${s.osblar[0]} bölgesindeki yol yapım ve bakım çalışmalarına düzenli stabilize tedariki sağlıyoruz.`,
    faq: (s) => [
      {
        q: `${s.ad}'da stabilize malzeme çeşitleri nelerdir?`,
        a: `${s.ad}'da kırmataş stabilize (0-31mm), kırma kum stabilize ve doğal zemin malzemesi çeşitleri mevcuttur. OSB yolları için genellikle 0-31mm kırmataş stabilize, geçici şantiye yolları için ise daha kaba granülometri tercih edilir.`,
      },
      {
        q: `${s.ad}'da stabilize yol zemini kaç cm uygulanır?`,
        a: `Standart OSB ve şantiye yolları için 15-20cm sıkıştırılmış stabilize tabakası önerilmektedir. ${s.ilceler[0]} ve ${s.ilceler[1]} bölgelerindeki zemin etütlerine göre farklı kalınlıklar uygulanabilmektedir.`,
      },
      {
        q: `${s.ad} bölgesine büyük stabilize siparişleri nasıl verilir?`,
        a: `${s.ad}'da 500 ton ve üzeri stabilize siparişleri için Hammaddem'de özel talep formu doldurulabilir. ${s.osblar[0]} ve çevresindeki büyük altyapı projelerine haftalık programlı teslimat koordinasyonu sağlıyoruz.`,
      },
    ],
  },
};

// Belirli bir şehir+malzeme kombinasyonu için içerik döndürür
export function getKomboIcerik(malzemeSlug: string, sehirSlug: string) {
  const sehir = SEHIR_BILGI[sehirSlug];
  const malzeme = MALZEME_ICERIK[malzemeSlug];
  if (!sehir || !malzeme) return null;
  return {
    sehir,
    aciklama: malzeme.aciklama(sehir),
    hizmetDetay: malzeme.hizmetDetay(sehir),
    yerelBilgi: malzeme.yerelBilgi(sehir),
    faq: malzeme.faq(sehir),
  };
}
