// Hafriyat fiyat, döküm ücreti ve kamyon kapasitesi verileri.
// Fiyat aralıkları sektör yayınlarından derlenmiş PİYASA aralıklarıdır; Hammaddem'in
// kendi teklifleri işe özeldir. Belediye tarifeleri kaynak ve tarihleriyle verilmiştir —
// her yıl Ocak ayında meclis kararlarına göre güncellenmelidir.

export const HAFRIYAT_FIYAT_GUNCELLEME = "Ağustos 2026";
export const HAFRIYAT_FIYAT_YIL = 2026;

/* ---------------- m³ fiyatları (zemin türüne göre) ---------------- */
export interface M3Fiyat {
  zemin: string;
  aciklama: string;
  /** Kabarma katsayısı (yerinde m³ → kamyondaki m³) */
  kabarma: number;
  min: number;
  max: number;
}

export const M3_FIYATLARI: M3Fiyat[] = [
  {
    zemin: "Yumuşak toprak",
    aciklama: "Bahçe toprağı, dolgu, kum-kil karışımı; kepçe zorlanmadan kazar.",
    kabarma: 1.25,
    min: 120,
    max: 180,
  },
  {
    zemin: "Karışık / sıkı zemin",
    aciklama: "Killi, çakıllı, kısmen sıkışmış zemin; kazı hızı düşer.",
    kabarma: 1.35,
    min: 180,
    max: 260,
  },
  {
    zemin: "Sert zemin / kayalık",
    aciklama: "Kırıcı gerektiren kaya, grovak, betonlaşmış eski dolgu.",
    kabarma: 1.5,
    min: 260,
    max: 400,
  },
];

/* ---------------- Kamyon sefer ücretleri ---------------- */
export interface SeferFiyat {
  arac: string;
  kapasite: string;
  /** Hesaplayıcıda kullanılan ortalama kasa hacmi (m³) */
  m3: number;
  min: number;
  max: number;
}

export const SEFER_FIYATLARI: SeferFiyat[] = [
  { arac: "10 teker damperli kamyon", kapasite: "12–15 m³", m3: 13, min: 2500, max: 3500 },
  { arac: "Kırkayak (4 dingilli)", kapasite: "16–20 m³", m3: 18, min: 3500, max: 4500 },
  { arac: "Damperli tır (yarı römork)", kapasite: "24–30 m³", m3: 26, min: 4500, max: 5500 },
];

/* ---------------- Fiyatı belirleyen faktörler ---------------- */
export const FIYAT_FAKTORLERI = [
  { baslik: "Kazı hacmi (m³)", aciklama: "Hacim büyüdükçe birim fiyat düşer; makine ve kamyon boşta beklemez." },
  { baslik: "Zemin türü", aciklama: "Kaya ve sıkı kil kırıcı ister; kazı hızı düşer, m³ fiyatı yükselir." },
  { baslik: "Döküm sahasına mesafe", aciklama: "İstanbul'da fiyatın en büyük kalemi. Sahaya uzaklık sefer süresini ve yakıtı belirler." },
  { baslik: "Döküm ücreti", aciklama: "Belediye veya özel saha bedeli; kamyon ya da ton başına ayrıca ödenir." },
  { baslik: "Araç erişimi ve iş saatleri", aciklama: "Dar sokak, gece çalışma izni, şehir içi trafik kısıtları sefer sayısını etkiler." },
  { baslik: "İksa ve su", aciklama: "Bitişik nizam, derin bodrum veya yeraltı suyu etaplı kazı gerektirir; süre uzar." },
];

/* ---------------- Bölgesel eğilim ---------------- */
export interface BolgeEgilim {
  bolge: string;
  egilim: "alt" | "orta" | "ust";
  neden: string;
}

export const BOLGE_EGILIMLERI: BolgeEgilim[] = [
  { bolge: "İstanbul Avrupa Yakası", egilim: "ust", neden: "Lisanslı sahalar Silivri, Çatalca, Arnavutköy hattında; sefer mesafesi uzun." },
  { bolge: "İstanbul Anadolu Yakası", egilim: "ust", neden: "Şile, Ömerli ve Tuzla sahaları; merkez ilçelerden 30–60 km." },
  { bolge: "Kocaeli", egilim: "orta", neden: "Gebze–İzmit hattında belediye sahaları yakın; OSB projelerinde hacim büyük." },
  { bolge: "Bursa", egilim: "orta", neden: "BURKENT sahaları m³ bazlı; Osmangazi sahası diğerlerinden pahalı." },
  { bolge: "Tekirdağ", egilim: "alt", neden: "Çorlu–Çerkezköy'de saha yakın, rekabet düşük, hacim yüksek." },
  { bolge: "Ankara", egilim: "ust", neden: "ABB döküm bedeli 2025'te ton başına 160 TL+KDV'ye çıktı." },
];

/* ---------------- Döküm ücretleri (il il) ---------------- */
export interface DokumKalemi {
  kalem: string;
  ucret: string;
  birim: string;
  not?: string;
}

export interface DokumIl {
  slug: string;
  ad: string;
  hafriyatPath: string;
  ozet: string;
  kalemler: DokumKalemi[];
  sahalar: string[];
  kaynaklar: { ad: string; url: string; tarih: string }[];
}

export const DOKUM_UCRETLERI: DokumIl[] = [
  {
    slug: "istanbul",
    ad: "İstanbul",
    hafriyatPath: "/hafriyat/istanbul",
    ozet:
      "İBB'nin 2026 çevre ücret tarifesinde hafriyat toprağı depolama bedeli ton başına 78 TL'ye, kamyon başına taşıma izin belgesi 655 TL'ye çıkarıldı. Resmî sahalar dolduğunda devreye giren özel lisanslı sahalar kamyon başına ücret alır; bu bedel İstanbul'da sefer fiyatının en değişken kalemidir.",
    kalemler: [
      { kalem: "Hafriyat toprağı depolama (kantarlı saha)", ucret: "78", birim: "TL / ton", not: "2025'te 38 TL idi; Aralık 2025 meclis teklifi" },
      { kalem: "Hafriyat toprağı geçici depolama", ucret: "2,18", birim: "TL / m³", not: "Önceki yıl 1,72 TL" },
      { kalem: "Taşıma izin belgesi (kamyon başına)", ucret: "655", birim: "TL / kamyon", not: "Önceki yıl 522 TL" },
      { kalem: "İnert atık III. sınıf depolama (Odayeri, Kömürcüoda)", ucret: "570", birim: "TL / ton", not: "İBB Çevre 2026 EK-2 tarifesi, KDV dahil" },
      { kalem: "Özel lisanslı sahalar (kamyon başı)", ucret: "1.200 – 3.500", birim: "TL / kamyon", not: "Sektör yayınları, 2026; sahaya ve kamyon tipine göre" },
    ],
    sahalar: ["Odayeri (Eyüpsultan)", "Kömürcüoda (Şile)", "Silivri ve Çatalca özel sahaları", "Arnavutköy / Hadımköy sahaları", "Ömerli ve Tuzla (Anadolu yakası)"],
    kaynaklar: [
      { ad: "İBB Çevre Koruma 2026 Ücret Tarifesi (EK-2)", url: "https://cevre.ibb.istanbul/wp-content/uploads/2025/12/EK2-Ucret-Tarifesi.pdf", tarih: "Aralık 2025" },
      { ad: "İSTAÇ – Hafriyat Toprağı Yönetimi", url: "https://istac.istanbul/faaliyet-alanlarimiz/atik-yonetimi/hafriyat-topragi-yonetimi", tarih: "2026" },
      { ad: "Haber7 – İstanbul hafriyat depolama ücretlerine zam", url: "https://www.haber7.com/guncel/haber/3424740-istanbulda-hafriyat-depolama-ucretlerine-yuzde-449a-varan-oranda-zam-yapildi", tarih: "Aralık 2025" },
    ],
  },
  {
    slug: "ankara",
    ad: "Ankara",
    hafriyatPath: "/hafriyat/ankara",
    ozet:
      "Ankara Büyükşehir Belediyesi döküm bedelini 2023'te 6 TL, 2024'te 60 TL, 2025'te 160 TL/ton + KDV olarak belirledi. Sektör temsilcileri bir kamyon hafriyat için sahaya 5.000 TL civarı ödendiğini aktarıyor; bu nedenle Ankara'da döküm bedeli sefer fiyatının içinde en büyük paydır.",
    kalemler: [
      { kalem: "Hafriyat toprağı / yıkıntı atığı döküm bedeli", ucret: "160 (+KDV ≈ 192)", birim: "TL / ton", not: "ABB Meclis kararı, 2025" },
      { kalem: "Taşıma izin belgesi (araç başına)", ucret: "2.250 (+KDV)", birim: "TL / araç", not: "Hafriyat toprağı, inşaat ve yıkıntı atıkları" },
      { kalem: "Pikap / kamyonet (araç başına)", ucret: "800 (+KDV)", birim: "TL / araç" },
      { kalem: "Traktör (araç başına)", ucret: "320 (+KDV)", birim: "TL / araç" },
      { kalem: "Sektörün aktardığı kamyon başı toplam ödeme", ucret: "≈ 5.000", birim: "TL / kamyon", not: "Hafriyatçılar derneği açıklaması, 2026" },
    ],
    sahalar: ["Mamak", "Gölbaşı", "Etimesgut", "Sincan"],
    kaynaklar: [
      { ad: "İnşaat Deryası – Ankara'da hafriyat döküm ücreti 2,5 kat arttı", url: "https://www.insaatderyasi.com/ankarada-hafriyat-dokum-ucreti-2-5-kat-artti-30381h.htm", tarih: "2025" },
      { ad: "Sabah – Ankara'da hafriyatçılardan ABB'ye tepki", url: "https://www.sabah.com.tr/yasam/ankarada-hafriyatcilardan-abbye-tepki-yuzde-100-zam-sifir-hizmet-7532581", tarih: "2026" },
    ],
  },
  {
    slug: "bursa",
    ad: "Bursa",
    hafriyatPath: "/hafriyat/bursa",
    ozet:
      "Bursa'da döküm sahalarını Büyükşehir'in şirketi BURKENT işletir; ücret m³ başınadır ve sahaya göre değişir. Kantarsız sahalarda kamyon hacmine göre tek kullanımlık barkod bedeli alınır.",
    kalemler: [
      { kalem: "Orhangazi, Karacabey, İznik, Mudanya, Kestel, Gemlik, Mustafakemalpaşa sahaları", ucret: "235", birim: "TL / m³" },
      { kalem: "Nilüfer sahası", ucret: "300", birim: "TL / m³" },
      { kalem: "Osmangazi sahası", ucret: "500", birim: "TL / m³" },
      { kalem: "Kantarsız saha barkodu – 0–10 m³ araç", ucret: "2.800", birim: "TL / araç" },
      { kalem: "Kantarsız saha barkodu – 10–18 m³ araç", ucret: "3.500", birim: "TL / araç" },
      { kalem: "Kantarsız saha barkodu – 18 m³ ve üzeri araç", ucret: "5.100", birim: "TL / araç" },
    ],
    sahalar: ["Osmangazi", "Nilüfer", "Kestel", "Gemlik", "Mudanya", "Orhangazi", "İznik", "Karacabey", "Mustafakemalpaşa"],
    kaynaklar: [
      { ad: "BURKENT – Hafriyat döküm sahaları ve ücretleri", url: "https://www.burkent.com.tr/", tarih: "Sitedeki güncel liste; yıl teyit edilmeli" },
      { ad: "Bursa Büyükşehir – Hafriyat Yönetim Bilgi Sistemi", url: "https://www.bursa.bel.tr/hizmetler/hafriyat-yonetim-bilgi-sistemi-88", tarih: "2026" },
    ],
  },
  {
    slug: "izmir",
    ad: "İzmir",
    hafriyatPath: "/hafriyat/izmir",
    ozet:
      "İzmir Büyükşehir Belediyesi bertaraf bedelini Ağustos 2025 meclis kararıyla ton başına 125 TL'ye güncelledi; kantarsız sahalarda araç dingil sayısına göre sabit ücret uygulanır.",
    kalemler: [
      { kalem: "Hafriyat toprağı bertaraf bedeli", ucret: "125", birim: "TL / ton", not: "15.08.2025 tarihli 856 sayılı Meclis kararı" },
      { kalem: "İnşaat / yıkıntı atığı geri kazanım bedeli", ucret: "125", birim: "TL / ton" },
      { kalem: "Kamyonet (4 ton)", ucret: "500", birim: "TL / araç" },
      { kalem: "Tek dingilli kamyon (6 ton)", ucret: "750", birim: "TL / araç" },
      { kalem: "Çift dingilli kamyon (12 ton)", ucret: "1.500", birim: "TL / araç" },
      { kalem: "Üç dingilli kamyon (18 ton)", ucret: "2.250", birim: "TL / araç" },
      { kalem: "Dört dingilli kamyon (25 ton)", ucret: "3.125", birim: "TL / araç" },
      { kalem: "Hafriyat toprağı depolama izin bedeli", ucret: "40", birim: "TL / m³" },
    ],
    sahalar: ["İZBB hafriyat toprağı depolama sahaları", "İnşaat/yıkıntı atığı geri kazanım tesisleri"],
    kaynaklar: [
      { ad: "İZBB Meclis Kararı – hafriyat bertaraf tarifesi", url: "https://www.izmir.bel.tr/tr/KararDetayi/35711", tarih: "Eylül 2025" },
      { ad: "İZBB – Hafriyat ve İnşaat Atıkları", url: "https://www.izmir.bel.tr/tr/AcrdIcerik/93/1", tarih: "2026" },
    ],
  },
  {
    slug: "kocaeli",
    ad: "Kocaeli",
    hafriyatPath: "/hafriyat/kocaeli",
    ozet:
      "Kocaeli Büyükşehir Belediyesi döküm sahalarını ve ücret tarifesini 'Hafriyat Bertaraf Hizmeti' sayfasında yıllık gelir tarifesiyle yayımlar; Gebze–İzmit hattında sahalar şantiyelere yakın olduğu için sefer maliyeti İstanbul'a göre düşüktür. Güncel kamyon başı bedel için belediye tarifesine bakın; tekliflerimizde döküm dahil net fiyat veriyoruz.",
    kalemler: [
      { kalem: "Döküm bedeli", ucret: "Belediye gelir tarifesi", birim: "ton / araç", not: "KBB yıllık gelir tarifesi (PDF) ile belirlenir" },
    ],
    sahalar: ["Gebze bölgesi sahaları", "İzmit – Alikahya", "Körfez", "Dilovası (İZAYDAŞ, belirli atıklar)"],
    kaynaklar: [
      { ad: "Kocaeli Büyükşehir – Hafriyat Bertaraf Hizmeti", url: "https://www.kocaeli.bel.tr/hizmet/hafriyat-bertaraf-hizmeti-159.html", tarih: "2026" },
      { ad: "KBB Belediye Vergi ve Ücret Tarifeleri", url: "https://www.kocaeli.bel.tr/belediye-vergi-ve-ucret-tarifeleri.html", tarih: "2026" },
    ],
  },
];

/* ---------------- Kamyon kapasiteleri ---------------- */
export interface KamyonKapasite {
  arac: string;
  m3: string;
  ton: string;
  kullanim: string;
}

export const KAMYON_KAPASITELERI: KamyonKapasite[] = [
  { arac: "Kamyonet / pikap (açık kasa)", m3: "2 – 4 m³", ton: "3 – 4 ton", kullanim: "Tadilat molozu, küçük bahçe işleri" },
  { arac: "6 teker damperli kamyon", m3: "6 – 10 m³", ton: "8 – 12 ton", kullanim: "Dar sokak, site içi, küçük temel" },
  { arac: "10 teker damperli kamyon", m3: "12 – 15 m³", ton: "≈ 15 ton (yasal net)", kullanim: "'Bir kamyon hafriyat' denince kastedilen araç" },
  { arac: "Kırkayak (4 dingilli damperli)", m3: "16 – 20 m³", ton: "16 – 20 ton", kullanim: "Büyük şantiye, uzun mesafe döküm" },
  { arac: "Damperli tır (yarı römork)", m3: "24 – 30 m³", ton: "24 – 28 ton", kullanim: "Saha kazısı, ocak–şantiye taşıması" },
];

export interface MalzemeYogunluk {
  malzeme: string;
  yogunluk: string;
  kabarma: string;
}

export const MALZEME_YOGUNLUKLARI: MalzemeYogunluk[] = [
  { malzeme: "Gevşek toprak", yogunluk: "1,2 – 1,5 t/m³", kabarma: "%20 – 25" },
  { malzeme: "Kil (sıkı)", yogunluk: "1,6 – 1,9 t/m³", kabarma: "%30 – 40" },
  { malzeme: "Kum", yogunluk: "1,4 – 1,6 t/m³", kabarma: "%10 – 15" },
  { malzeme: "Çakıl / stabilize", yogunluk: "1,5 – 1,8 t/m³", kabarma: "%10 – 15" },
  { malzeme: "Moloz (karışık inşaat atığı)", yogunluk: "1,2 – 1,6 t/m³", kabarma: "%30 – 50" },
  { malzeme: "Kırılmış kaya", yogunluk: "1,6 – 2,0 t/m³", kabarma: "%40 – 60" },
];

export const KAMYON_KAYNAKLARI = [
  { ad: "DMO Damperli Kamyon Teknik Şartnamesi (damper tipleri 6–18 m³)", url: "https://www.dmo.gov.tr/Files/IcerikYonetimi/ANKARA/Belgeler/Mevzuat/Damperli%20Kamyon%20Teknik%20Sartnamesi.pdf" },
  { ad: "Kamyoon – 10 teker kamyon kaç ton yük taşır", url: "https://www.kamyoon.com/blog/10-teker-kamyon-nedir-kac-ton-yuk-tasir" },
  { ad: "Netkurdu – Kırkayak kamyon tonaj sınırı", url: "https://netkurdu.net/kirkayak-kamyon.html/" },
];

/* ---------------- SSS ---------------- */
export const FIYAT_FAQ = [
  {
    q: "Hafriyat m³ fiyatı 2026'da ne kadar?",
    a: "Piyasada yumuşak toprak için 120–180 TL/m³, karışık zemin için 180–260 TL/m³, kayalık zemin için 260–400 TL/m³ aralığı görülüyor. Döküm ücreti ve KDV bu aralıklara dahil değildir; İstanbul'da döküm mesafesi fiyatı belirgin biçimde değiştirir.",
  },
  {
    q: "1 kamyon hafriyat kaç para?",
    a: "Sefer ücreti kamyon tipine ve mesafeye göre değişir: 12–15 m³ kamyon 2.500–3.500 TL, 16–20 m³ kırkayak 3.500–4.500 TL, 24–30 m³ tır 4.500–5.500 TL. Döküm sahası bedeli ayrıca eklenir.",
  },
  {
    q: "Hafriyat fiyatı nasıl hesaplanır?",
    a: "Yerinde kazı hacmi (en × boy × derinlik) kabarma katsayısıyla çarpılıp kamyon kapasitesine bölünerek sefer sayısı bulunur. Toplam = kazı (m³ × birim fiyat) + sefer sayısı × sefer ücreti + sefer sayısı × döküm bedeli. Hesaplama aracımız bu adımları otomatik yapar.",
  },
  {
    q: "Fiyata döküm ücreti dahil mi?",
    a: "Tablodaki aralıklara dahil değildir. Hammaddem tekliflerinde döküm bedeli ve döküm belgesi dahil, net ve kalem kalem fiyat verilir.",
  },
  {
    q: "Fiyatlar neden ile göre değişiyor?",
    a: "Belediyelerin döküm tarifeleri (İstanbul 78 TL/ton, Ankara 160 TL/ton+KDV, İzmir 125 TL/ton, Bursa 235–500 TL/m³) ve sahaya mesafe farklıdır. Tekirdağ ve Kocaeli'de sahalar yakın olduğu için sefer maliyeti daha düşüktür.",
  },
];

export const DOKUM_FAQ = [
  {
    q: "Hafriyat döküm ücreti kim tarafından belirlenir?",
    a: "Büyükşehir belediyeleri (İstanbul'da İBB/İSTAÇ, Ankara'da ABB, Bursa'da BURKENT, İzmir'de İZBB) her yıl meclis kararıyla ton, m³ veya araç başına döküm bedelini belirler. Özel lisanslı sahalar kendi tarifelerini uygular.",
  },
  {
    q: "Döküm parası kamyon başına mı, ton başına mı ödenir?",
    a: "Kantarlı sahalarda ton başına, kantarsız sahalarda araç tipine veya m³'e göre sabit ücret alınır. İstanbul'da ton, Ankara'da ton, İzmir'de dingil sayısı, Bursa'da m³ esas alınır.",
  },
  {
    q: "Hafriyat döküm belgesi nereden alınır?",
    a: "Döküm fişi/belgesi, aracın sahaya girişinde saha işletmecisi (İSTAÇ, BURKENT vb.) tarafından düzenlenir. Taşıma izin belgesi ise büyükşehir belediyesinden kamyon başına alınır. Hammaddem işlerinde belgeler iş sahibine iletilir.",
  },
  {
    q: "Döküm ücreti hafriyat fiyatına dahil mi?",
    a: "Sektörde çoğu m³ veya sefer fiyatı döküm hariç verilir. Karşılaştırma yaparken teklifin döküm dahil olup olmadığını mutlaka sorun; Hammaddem teklifleri döküm dahildir.",
  },
];

export const KAMYON_FAQ = [
  {
    q: "Bir kamyon kaç m³ toprak alır?",
    a: "Standart 10 teker damperli kamyon kasasına 12–15 m³ kabarmış toprak alır; bu, yerinde ölçüyle yaklaşık 10–12 m³ kazıya karşılık gelir. Kırkayak 16–20 m³, damperli tır 24–30 m³ taşır.",
  },
  {
    q: "Hafriyat kamyonu kaç ton alır?",
    a: "10 teker kamyonun yasal net yük sınırı yaklaşık 15 tondur; kırkayak 16–20 ton, damperli tır 24–28 ton taşır. Toprak 1,2–1,9 t/m³ olduğu için ağır kil ve kayada kamyon tonajdan dolar, hacim dolmadan sefer yapılır.",
  },
  {
    q: "Kabarma katsayısı nedir?",
    a: "Kazılan zemin gevşediği için kamyondaki hacim yerinde hacimden büyüktür. Toprakta %20–25, kilde %30–40, kayada %40–60 kabarma olur. 100 m³ yerinde kazı, kamyona 125–150 m³ olarak yüklenir.",
  },
  {
    q: "1 kamyon hafriyat kaç para?",
    a: "12–15 m³ kamyon seferi 2.500–3.500 TL, kırkayak 3.500–4.500 TL, tır 4.500–5.500 TL aralığındadır; döküm bedeli ayrıca eklenir. Güncel tablo için hafriyat fiyatları sayfasına bakın.",
  },
];

/* ---------------- Moloz taşıma ---------------- */
export interface MolozFiyat {
  hizmet: string;
  aciklama: string;
  min: number;
  max: number;
  birim: string;
}

export const MOLOZ_FIYATLARI: MolozFiyat[] = [
  { hizmet: "Kamyonla moloz taşıma", aciklama: "Yükleme dahil, tek sefer; döküm bedeli ayrıca.", min: 3000, max: 7500, birim: "TL / kamyon" },
  { hizmet: "Çuval bazlı moloz taşıma", aciklama: "Dar sokak ve daire içi tadilatlarda, çuval başına.", min: 90, max: 180, birim: "TL / çuval" },
  { hizmet: "Moloz konteyneri kiralama", aciklama: "Sahaya bırakma, dolunca alma ve döküm dahil paket.", min: 5000, max: 11000, birim: "TL / konteyner" },
  { hizmet: "Döküm sahası bedeli", aciklama: "Belediye veya lisanslı özel saha ücreti, sefer başına.", min: 1200, max: 3500, birim: "TL / sefer" },
];

export const MOLOZ_TIPLERI = [
  { tip: "Tadilat molozu", aciklama: "Daire ve dükkân tadilatlarında çıkan sıva, seramik, alçıpan ve söküm atığı. Çuval ya da küçük tonajlı araçla aynı gün kaldırılır." },
  { tip: "İnşaat atığı", aciklama: "Şantiyede biriken beton parçası, tuğla, kalıp artığı ve ambalaj. Ayrıştırılıp uygun bertaraf tesisine götürülür." },
  { tip: "Yıkım molozu", aciklama: "Bina yıkımı sonrası oluşan yüksek hacimli karışık atık. Ekskavatörle yüklenir, çok araçlı konvoyla taşınır." },
  { tip: "Hafriyat toprağı", aciklama: "Kazıdan çıkan toprak ve kaya. Ruhsatlı hafriyat sahasına dökülür, döküm belgesi düzenlenir." },
];

export const MOLOZ_FAQ = [
  {
    q: "Moloz taşıma ücreti ne kadar?",
    a: "2026'da kamyonla moloz taşıma 3.000–7.500 TL, çuval bazlı taşıma 90–180 TL/çuval, moloz konteyneri 5.000–11.000 TL aralığındadır. Döküm sahası bedeli sefer başına 1.200–3.500 TL olarak ayrıca hesaplanır.",
  },
  {
    q: "Moloz nereye dökülür?",
    a: "Moloz ve inşaat atığı yalnızca belediyelerin ruhsat verdiği döküm sahalarına ya da lisanslı geri kazanım tesislerine dökülebilir. Boş arazi, dere yatağı veya yol kenarına döküm idari para cezasına tabidir; ceza hem araç sahibine hem iş sahibine kesilir.",
  },
  {
    q: "Belediye moloz alıyor mu, firmadan farkı ne?",
    a: "Belediyeler genellikle sınırlı miktarda evsel tadilat molozunu randevu ve ücret karşılığı alır; sıra günler sürebilir ve şantiye molozu kapsam dışıdır. Firma ile çalışmanın farkı aynı gün servis, yükleme dahil hizmet ve döküm belgesidir.",
  },
  {
    q: "Moloz taşımada yükleme dahil mi?",
    a: "Evet. Fiyatlarımız yükleme, nakliye ve dökümü kapsar. Dar alan ve site içi işlerde mini ekskavatör veya el gücüyle yükleme yapılır; talebinizde alan kısıtını belirtmeniz yeterlidir.",
  },
  {
    q: "Aynı gün moloz kaldırılıyor mu?",
    a: "İstanbul ve Marmara'da uygun araç varsa aynı gün, yoğun dönemlerde ertesi gün sabah kaldırıyoruz. Acil işlerde telefonla arayın; en yakın aracı yönlendirelim.",
  },
];

/* ---------------- Temel kazısı ---------------- */
export interface KaziSure {
  olcek: string;
  hacim: string;
  sure: string;
  ekip: string;
}

/** Varsayım: 1 ekskavatör + 4–6 damperli kamyonluk tek ekip, günde ~400–600 m³. */
export const TEMEL_KAZI_SURELERI: KaziSure[] = [
  { olcek: "Müstakil ev / villa", hacim: "300 – 600 m³", sure: "1 – 2 gün", ekip: "1 ekskavatör + 2–3 kamyon" },
  { olcek: "Küçük apartman (tek bodrum)", hacim: "1.000 – 2.000 m³", sure: "3 – 5 gün", ekip: "1 ekskavatör + 4–6 kamyon" },
  { olcek: "Site bloğu (2–3 bodrum)", hacim: "4.000 – 8.000 m³", sure: "8 – 15 gün", ekip: "2 ekskavatör + 8–12 kamyon" },
  { olcek: "Büyük saha / tesis", hacim: "15.000 m³ ve üzeri", sure: "25 – 40 gün", ekip: "3+ ekskavatör, çok araçlı konvoy" },
];

export const TEMEL_KAZI_ASAMALARI = [
  { baslik: "Aplikasyon ve kot alma", aciklama: "Ruhsat projesindeki temel sınırları araziye işaretlenir, mevcut zemin kotu ve kazı taban kotu belirlenir. Kot hatası sonradan dolgu veya fazla kazı maliyeti doğurur." },
  { baslik: "Üst toprak sıyırma", aciklama: "Bitkisel toprak ayrı sıyrılır; peyzajda kullanılacaksa sahada stoklanır, kullanılmayacaksa hafriyat sahasına gönderilir." },
  { baslik: "Kazı ve şev / iksa", aciklama: "Zemin sınıfına göre şevli kazı ya da iksa (ankraj, fore kazık, berlin duvarı) ile etaplı ilerlenir. Bitişik nizamda iksa projesi olmadan kazıya başlanmaz." },
  { baslik: "Nakliye ve döküm", aciklama: "Kazılan malzeme lisanslı araçlarla ruhsatlı sahaya taşınır; taşıma izin belgesi ve döküm fişi düzenlenir." },
  { baslik: "Taban düzeltme ve sıkıştırma", aciklama: "Kazı tabanı kot kontrolüyle düzeltilir, gerekiyorsa stabilize serilip sıkıştırılır ve grobeton için hazır teslim edilir." },
];

export const TEMEL_KAZI_OZEL_DURUMLAR = [
  { baslik: "Zeminden su çıkarsa", aciklama: "Yeraltı su seviyesi kazı tabanının üzerindeyse drenaj hendekleri ve dalgıç pompayla susuzlaştırma yapılır; gerekirse kuyu tipi drenaj kurulur. Su yönetimi planlanmazsa şev göçmesi ve taban bozulması riski doğar." },
  { baslik: "Bitişik nizam kazı", aciklama: "Komşu binaya bitişik kazılarda şev verilemez; iksa zorunludur. Kazı etaplı yapılır, komşu yapıda deformasyon ölçümü (röper) alınır. Bu tip işlerde süre ve maliyet artar." },
  { baslik: "Kaya çıkması", aciklama: "Kırıcılı ekskavatör devreye girer, ilerleme hızı düşer ve m³ fiyatı üst banda çıkar. Kazıdan çıkan kırılmış kaya, uygunsa sahada dolgu malzemesi olarak değerlendirilir." },
  { baslik: "Dar alan ve erişim", aciklama: "Site içi ve dar sokaklı parsellerde küçük tonajlı araç ve mini ekskavatör kombinasyonu kurulur; sevkiyat saatleri trafiğe göre planlanır." },
];

export const TEMEL_KAZI_FAQ = [
  {
    q: "Temel kazısı m³ birim fiyatı ne kadar?",
    a: "2026'da yumuşak toprakta 120–180 TL/m³, karışık zeminde 180–260 TL/m³, kayalık zeminde 260–400 TL/m³ aralığı görülüyor. Döküm sahası bedeli ve KDV ayrıdır; iksa gereken işlerde fiyat ayrıca hesaplanır.",
  },
  {
    q: "Temel kazısı kaç gün sürer?",
    a: "Müstakil ev temeli (300–600 m³) 1–2 gün, tek bodrumlu apartman (1.000–2.000 m³) 3–5 gün, site bloğu (4.000–8.000 m³) 8–15 gün sürer. Süre; ekip büyüklüğü, döküm sahası mesafesi ve iksa ihtiyacına göre değişir.",
  },
  {
    q: "Temel kazısı nasıl yapılır?",
    a: "Aplikasyon ve kot alma, bitkisel toprak sıyırma, zemin sınıfına göre şevli ya da iksalı kazı, nakliye ve ruhsatlı sahaya döküm, son olarak taban düzeltme ve sıkıştırma adımlarıyla yürütülür.",
  },
  {
    q: "Temel kazısında çalışma payı ne kadar bırakılır?",
    a: "Kalıp ve yalıtım imalatı için plan ölçülerine her kenardan genellikle 0,5–1 m çalışma payı eklenir. Şevli kazıda üst genişlik ayrıca artar; hacim hesabında bu paylar dikkate alınmalıdır.",
  },
  {
    q: "Kazı ruhsatı ve izin gerekiyor mu?",
    a: "Yapı ruhsatı olmadan temel kazısına başlanamaz. Ayrıca hafriyat toprağının taşınması için belediyeden taşıma izin belgesi alınır ve döküm ruhsatlı sahaya yapılır; bu süreci biz yönetiyoruz.",
  },
];

export const HESAPLAMA_FAQ = [
  {
    q: "Hafriyat hesabı nasıl yapılır?",
    a: "Yerinde hacim = alan (m²) × derinlik (m). Kamyona yüklenecek hacim = yerinde hacim × kabarma katsayısı. Sefer sayısı = kabarmış hacim ÷ kamyon kapasitesi (yukarı yuvarlanır). Maliyet = yerinde hacim × m³ fiyatı + sefer × sefer ücreti + sefer × döküm bedeli.",
  },
  {
    q: "Hesaplama sonucu kesin fiyat mı?",
    a: "Hayır; sonuç piyasa aralıklarıyla hesaplanan bir ön bütçedir. Zemin etüdü, döküm sahası mesafesi ve iş programı net fiyatı belirler. Sonucu formla gönderin, 30 dakika içinde işinize özel net teklif alın.",
  },
  {
    q: "Temel kazısı hesaplama farklı mı?",
    a: "Aynı formül geçerlidir; temel kazısında çalışma payı için plan ölçülerine her kenardan 0,5–1 m eklenir ve şevli kazıda üst genişlik artar. Aracımızda alan girişine bu payı ekleyerek hesaplayabilirsiniz.",
  },
];
