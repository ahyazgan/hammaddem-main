import HeroBgPattern from "./HeroBgPattern";
import OrderCard from "./OrderCard";

const stats = [
  { val: "250+", label: "Tamamlanan Teslimat", color: "text-primary" },
  { val: "30dk", label: "Ort. Teklif Süresi", color: "text-navy" },
  { val: "11 İl", label: "Aktif Teslimat Bölgesi", color: "text-foreground" },
  { val: "%98", label: "Zamanında Teslimat", color: "text-primary" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-[60px] flex flex-col items-center justify-center overflow-hidden">
      <HeroBgPattern />

      <div className="relative z-[3] w-full max-w-[880px] px-3 sm:px-4 md:px-6 pt-6 md:pt-9 pb-8 md:pb-14 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-[5px] rounded-full bg-accent-light border border-accent-border text-[10px] sm:text-[11px] md:text-[11px] font-semibold text-primary tracking-wider uppercase mb-3 sm:mb-4 md:mb-5 animate-fade-down">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: 'pls 2s infinite' }} />
          <span className="hidden xs:inline">Türkiye geneli · </span>Silobas & Hafriyat Platformu
        </div>

        {/* Title */}
        <h1 className="text-[26px] sm:text-[32px] md:text-[clamp(36px,5.2vw,62px)] font-extrabold leading-[1.12] sm:leading-[1.1] tracking-[-0.5px] sm:tracking-[-1px] md:tracking-[-1.5px] text-foreground mb-2.5 sm:mb-3 animate-fade-down" style={{ animationDelay: '.06s' }}>
          Hammaddenize <span className="italic font-light text-txt-2">platform</span>
          <br />
          <span className="text-primary">gücüyle</span> ulaşın.
        </h1>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-sm md:text-base font-normal text-txt-2 leading-[1.65] max-w-[500px] mb-3 px-1 animate-fade-down" style={{ animationDelay: '.1s' }}>
          Silobas yükü mü, hafriyat mı? Fark etmez — 2 dakikada talep oluşturun,
          30 dakikada teklifiniz hazır, tırınız yolda.
        </p>

        {/* Stats row */}
        <div className="w-full flex justify-center mb-5 sm:mb-6 md:mb-8 animate-fade-down" style={{ animationDelay: '.14s' }}>
          <div className="grid grid-cols-2 sm:inline-flex sm:flex-row border border-border rounded-xl overflow-hidden shadow-card bg-background">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-2.5 sm:py-3 px-3 sm:px-4 md:px-[22px] flex flex-col items-center gap-0.5
                  ${i % 2 === 0 ? "border-r border-border" : ""}
                  ${i < 2 ? "border-b sm:border-b-0 border-border" : ""}
                  ${i < 3 ? "sm:border-r sm:border-border" : "sm:border-r-0"}
                `}
              >
                <span className={`font-mono text-[15px] sm:text-base md:text-lg font-bold leading-none ${stat.color}`}>{stat.val}</span>
                <span className="text-[10px] sm:text-[10px] md:text-[11px] text-txt-3 font-medium whitespace-nowrap">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Card */}
        <OrderCard />

        {/* Trust strip */}
        <div className="mt-4 sm:mt-5 md:mt-6 grid grid-cols-3 sm:flex sm:flex-row items-center gap-2 sm:gap-3 md:gap-5 justify-center animate-fade-up" style={{ animationDelay: '.3s' }}>
          {[
            { icon: "🚛", label: "Silobas & Hafriyat" },
            { icon: "⚡", label: "30dk Teklif" },
            { icon: "📋", label: "Dijital İrsaliye" },
            { icon: "🇹🇷", label: "11 İl Teslimat" },
            { icon: "✓", label: "Kayıt Gerekmez" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-1 sm:gap-1.5 justify-center">
              {i > 0 && <div className="hidden sm:block w-px h-3.5 bg-border2 mr-1 md:mr-3" />}
              <div className="w-[18px] sm:w-5 md:w-[22px] h-[18px] sm:h-5 md:h-[22px] rounded flex items-center justify-center text-[10px] sm:text-[11px] md:text-[11px] bg-off2 border border-border" aria-hidden="true">
                {item.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] md:text-xs text-txt-2 font-medium whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
