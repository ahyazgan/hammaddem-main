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
    <section id="neden-biz" className="py-16 md:py-24 px-4 md:px-10 bg-navy text-primary-foreground">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[rgba(255,255,255,.1)] text-[rgba(255,255,255,.7)] border border-[rgba(255,255,255,.15)] mb-3.5">
            Avantajlarımız
          </span>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold tracking-tight leading-[1.1] text-primary-foreground mb-3.5">
            Neden Hammaddem?
          </h2>
          <p className="text-base text-[rgba(255,255,255,.6)] leading-[1.7] max-w-[520px]">
            Sektördeki farkımızı rakamlarla ortaya koyuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[rgba(255,255,255,.08)] border border-[rgba(255,255,255,.08)] rounded-2xl overflow-hidden">
          {items.map((item) => (
            <div key={item.title} className="p-5 md:p-7 bg-[rgba(255,255,255,.03)] transition-colors hover:bg-[rgba(255,255,255,.06)]">
              <div className="w-11 h-11 rounded-[11px] bg-[rgba(232,98,10,.2)] border border-[rgba(232,98,10,.3)] flex items-center justify-center text-xl mb-4">
                {item.icon}
              </div>
              <div className="font-mono text-[28px] font-bold text-primary mb-1.5">
                {item.stat}
              </div>
              <h4 className="text-[15px] font-bold mb-2 tracking-tight">{item.title}</h4>
              <p className="text-[13px] text-[rgba(255,255,255,.55)] leading-[1.7]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Neden;
