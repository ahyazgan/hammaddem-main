import { Star } from "lucide-react";
import SectionHeading from "@/components/brand/SectionHeading";

const yorumlar = [
  {
    isim: "Mehmet K.",
    firma: "Beton Santrali, İstanbul",
    yorum: "Çimento siparişlerimizi Hammaddem üzerinden veriyoruz. 30 dakikada teklif, aynı gün teslimat. Çok memnunuz.",
    puan: 5,
  },
  {
    isim: "Ahmet Y.",
    firma: "İnşaat Firması, Ankara",
    yorum: "Kum ve çakıl tedariğinde fiyat karşılaştırması yapmak çok kolay. Tek platformdan her şeyi yönetiyoruz.",
    puan: 5,
  },
  {
    isim: "Fatma D.",
    firma: "Prefabrik Üretim, Kocaeli",
    yorum: "Silobas ile kalsit taşıma konusunda güvenilir hizmet. Dijital takip sayesinde teslimatı anlık izliyoruz.",
    puan: 5,
  },
  {
    isim: "Ali R.",
    firma: "Yol Yapım, Bursa",
    yorum: "Stabilize ve mıcır ihtiyacımızı hızlı karşılıyorlar. Düzenli teslimat anlaşması ile çalışıyoruz.",
    puan: 4,
  },
];

const MusteriYorumlari = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-10 bg-off">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading eyebrow="Müşteri deneyimleri" title="Birlikte çalıştığımız sahalardan.">
          Hammaddem ile çalışan firma ve santral yetkililerinin deneyimleri.
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {yorumlar.map((y) => (
            <div
              key={y.isim}
              className="p-6 flex flex-col rounded-2xl bg-background border border-border"
            >
              <div className="flex gap-1 mb-5" aria-label={`${y.puan} / 5 yıldız`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={`w-3.5 h-3.5 ${i < y.puan ? "text-primary fill-primary" : "text-border"}`}
                  />
                ))}
              </div>
              <blockquote className="text-sm text-txt-2 leading-relaxed mb-6">“{y.yorum}”</blockquote>
              <div className="mt-auto border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{y.isim}</p>
                <p className="text-xs text-txt-3">{y.firma}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusteriYorumlari;
