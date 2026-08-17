export interface MalzemeFiyat {
  slug: string;
  label: string;
  birim: string;
  minFiyat: number;
  maxFiyat: number;
  guncelleme: string;
  not: string;
}

export const FIYAT_DATA: MalzemeFiyat[] = [
  { slug: "cimento", label: "Çimento (Dökme / Silobas)", birim: "ton", minFiyat: 2500, maxFiyat: 4500, guncelleme: "Ağustos 2026", not: "CEM I / CEM II, bölge ve miktara göre değişir" },
  { slug: "kum", label: "İnşaat Kumu", birim: "ton", minFiyat: 250, maxFiyat: 600, guncelleme: "Ağustos 2026", not: "Dere kumu, kırma kum, yıkanmış kum türüne göre değişir" },
  { slug: "cakil", label: "Çakıl", birim: "ton", minFiyat: 200, maxFiyat: 500, guncelleme: "Ağustos 2026", not: "Dere çakılı, kırmataş çakıl granülometrisine göre değişir" },
  { slug: "micir", label: "Mıcır", birim: "ton", minFiyat: 200, maxFiyat: 450, guncelleme: "Ağustos 2026", not: "Boyut ve ocak lokasyonuna göre değişir" },
  { slug: "kalsit", label: "Kalsit Tozu", birim: "ton", minFiyat: 1500, maxFiyat: 4000, guncelleme: "Ağustos 2026", not: "Mikron değeri ve saflık oranına göre değişir" },
  { slug: "kirec", label: "Kireç", birim: "ton", minFiyat: 2000, maxFiyat: 5000, guncelleme: "Ağustos 2026", not: "Sönmüş / sönmemiş kireç türüne göre değişir" },
  { slug: "alci", label: "Alçı", birim: "ton", minFiyat: 3000, maxFiyat: 6000, guncelleme: "Ağustos 2026", not: "Yapı alçısı, sıva alçısı türüne göre değişir" },
  { slug: "mermer-tozu", label: "Mermer Tozu", birim: "ton", minFiyat: 1200, maxFiyat: 3500, guncelleme: "Ağustos 2026", not: "Beyazlık ve mikron değerine göre değişir" },
  { slug: "ucucu-kul", label: "Uçucu Kül", birim: "ton", minFiyat: 800, maxFiyat: 2000, guncelleme: "Ağustos 2026", not: "F sınıfı / C sınıfı ve kaynak tesise göre değişir" },
  { slug: "stabilize", label: "Stabilize Malzeme", birim: "ton", minFiyat: 150, maxFiyat: 350, guncelleme: "Ağustos 2026", not: "Kırma taş stabilize, mesafe ve miktara göre değişir" },
];

export function getFiyatBySlug(slug: string): MalzemeFiyat | undefined {
  return FIYAT_DATA.find((f) => f.slug === slug);
}
