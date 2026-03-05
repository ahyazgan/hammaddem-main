const items = [
  { icon: "⚡", title: "Hızlı Teklif", desc: "48 saat içinde net fiyat teklifiniz hazır.", stat: "48s", statLabel: "Ort. Süre" },
  { icon: "🛡️", title: "Güvenilir Hizmet", desc: "Yılların tecrübesiyle kaliteli ve güvenilir hammadde tedariki.", stat: "%96", statLabel: "Memnuniyet" },
  { icon: "🚛", title: "Geniş Filomuz", desc: "Silobas ve damperli araçlardan oluşan güçlü filo.", stat: "200+", statLabel: "Araç" },
  { icon: "📍", title: "Türkiye Geneli", desc: "11 ilde aktif teslimat ağımızla her noktaya ulaşım.", stat: "11 İl", statLabel: "Kapsama" },
  { icon: "📱", title: "Dijital Takip", desc: "Siparişinizi her aşamada anlık olarak izleyin.", stat: "7/24", statLabel: "Online" },
  { icon: "💰", title: "Rekabetçi Fiyat", desc: "Geniş tedarik ağımız sayesinde en uygun fiyatları sunuyoruz.", stat: "1.240+", statLabel: "Teslimat" },
];

const Neden = () => {
  return (
    <section id="neden-biz" className="relative py-16 md:py-24 px-4 md:px-10 bg-dot-pattern">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-3.5">
            Avantajlarımız
          </span>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold tracking-tight leading-[1.1] text-foreground mb-3.5">
            Neden Hammaddem?
          </h2>
          <p className="text-base text-txt-2 leading-[1.7] max-w-[520px]">
            Sektördeki farkımızı rakamlarla ortaya koyuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col gap-3 p-5 md:p-6 bg-background border border-border rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated hover:border-accent-border"
            >
              <div className="w-11 h-11 rounded-[11px] bg-accent-light border border-accent-border flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <div>
                <div className="font-mono text-[26px] font-bold text-primary leading-none mb-1">
                  {item.stat}
                </div>
                <div className="text-[10px] font-semibold tracking-wider uppercase text-txt-3 mb-2">
                  {item.statLabel}
                </div>
              </div>
              <div>
                <h4 className="text-[14px] font-bold mb-1 tracking-tight text-foreground">{item.title}</h4>
                <p className="text-[13px] text-txt-2 leading-[1.7]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Neden;
