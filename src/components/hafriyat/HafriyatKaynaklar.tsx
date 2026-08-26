import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Coins, Truck, BookOpen, Shovel, Trash2, MapPin } from "lucide-react";

/**
 * Hafriyat kümesindeki sayfaları birbirine bağlayan iç link şeridi.
 * Hub → il → ilçe → fiyat/rehber/araç arasında otorite akışını kurar.
 */
const HAFRIYAT_KAYNAKLAR = [
  {
    path: "/hafriyat/fiyatlar",
    icon: Coins,
    baslik: "Hafriyat Fiyatları 2026",
    desc: "m³ fiyatı, kamyon sefer ücreti ve il farkları — güncel tablo.",
  },
  {
    path: "/hafriyat/hesaplama",
    icon: Calculator,
    baslik: "Hafriyat Hesaplama",
    desc: "Alan × derinlik → m³, kamyon sayısı ve tahmini maliyet.",
  },
  {
    path: "/rehber/hafriyat-dokum-ucretleri",
    icon: BookOpen,
    baslik: "Döküm Ücretleri 2026",
    desc: "İstanbul, Ankara, Bursa, İzmir, Kocaeli döküm sahası bedelleri.",
  },
  {
    path: "/rehber/hafriyat-kamyonu-kac-m3",
    icon: Truck,
    baslik: "Kamyon Kaç m³ Alır?",
    desc: "10 teker, kırkayak ve tır kapasiteleri; ton ve kabarma tablosu.",
  },
  {
    path: "/hafriyat/temel-kazisi",
    icon: Shovel,
    baslik: "Temel Kazısı",
    desc: "m³ birim fiyat, süre tablosu, aşamalar ve zorlu kazılar.",
  },
  {
    path: "/hafriyat/moloz-tasima",
    icon: Trash2,
    baslik: "Moloz Taşıma",
    desc: "Kamyon, çuval ve konteyner fiyatları; aynı gün kaldırma.",
  },
  {
    path: "/hizmetler/hafriyat-nakliyesi",
    icon: Truck,
    baslik: "Kamyon Kiralama",
    desc: "Sefer, saatlik ve günlük damperli kamyon fiyatlandırması.",
  },
  {
    path: "/hafriyat",
    icon: MapPin,
    baslik: "Hafriyat Firması",
    desc: "Tüm hafriyat hizmetleri ve il il hizmet bölgeleri.",
  },
] as const;

interface Props {
  /** Bulunulan sayfanın path'i; listeden çıkarılır */
  haric?: string;
  baslik?: string;
  aciklama?: string;
  koyu?: boolean;
}

const HafriyatKaynaklar = ({
  haric,
  baslik = "Fiyat, Hesaplama ve Rehberler",
  aciklama = "Teklif istemeden önce bütçenizi kendiniz çıkarın; döküm ücretleri ve kamyon kapasiteleri kaynaklarıyla.",
  koyu = false,
}: Props) => {
  const liste = HAFRIYAT_KAYNAKLAR.filter((k) => k.path !== haric);
  return (
    <section className={`py-14 px-4 md:px-10 ${koyu ? "bg-off" : ""}`}>
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">{baslik}</h2>
        <p className="text-sm text-txt-2 mb-8 max-w-[560px]">{aciklama}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {liste.map((k) => (
            <Link
              key={k.path}
              to={k.path}
              className="group flex flex-col gap-3 border border-border rounded-2xl p-5 bg-background hover:border-navy-border hover:-translate-y-0.5 transition-all no-underline"
            >
              <div className="w-10 h-10 rounded-xl bg-navy-light flex items-center justify-center">
                <k.icon className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground mb-1">{k.baslik}</h3>
                <p className="text-xs text-txt-2 leading-relaxed">{k.desc}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-navy">
                İncele <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HafriyatKaynaklar;
