import { Star } from "lucide-react";

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
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-3">
            Referanslar
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-2">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-sm text-txt-2 max-w-[450px] mx-auto">
            Hammaddem ile çalışan firma ve santral yetkililerinin deneyimleri.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {yorumlar.map((y) => (
            <div
              key={y.isim}
              className="p-5 rounded-2xl bg-background border border-border hover:border-accent-border transition-colors"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < y.puan ? "text-primary fill-primary" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-txt-2 leading-relaxed mb-4">"{y.yorum}"</p>
              <div>
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
