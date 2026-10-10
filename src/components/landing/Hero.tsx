import { Link } from "react-router-dom";
import { Clock3, ClipboardCheck, MapPinned, UserCheck } from "lucide-react";
import { BulkTruckIcon } from "@/components/brand/BrandIcon";
import HeroBgPattern from "./HeroBgPattern";
import OrderCard from "./OrderCard";
import SitePhoto from "@/components/SitePhoto";

const stats = [
  { val: "Yüke Özel", label: "Araç Planlaması", color: "text-primary" },
  { val: "Ücretsiz", label: "Teklif Talebi", color: "text-navy" },
  { val: "11 İl", label: "Aktif Teslimat Bölgesi", color: "text-foreground" },
  { val: "Dijital", label: "Talep Takibi", color: "text-primary" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-[60px] flex flex-col items-center justify-center overflow-hidden">
      <HeroBgPattern />

      <div className="relative z-[3] w-full max-w-[1180px] px-3 sm:px-4 md:px-6 pt-6 md:pt-9 pb-8 md:pb-14 flex flex-col items-center text-center">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-center w-full mb-6 md:mb-8">
          <div className="flex flex-col items-center lg:items-start lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-[5px] rounded-full bg-accent-light border border-accent-border text-[10px] sm:text-[11px] md:text-[11px] font-semibold text-primary tracking-wider uppercase mb-3 sm:mb-4 md:mb-5 animate-fade-down">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: 'pls 2s infinite' }} />
              <span className="hidden xs:inline">Türkiye geneli · </span>Silobas & Hafriyat Platformu
            </div>

            {/* Title */}
            <h1 className="text-[26px] sm:text-[32px] md:text-[clamp(36px,5.2vw,62px)] lg:text-[44px] font-extrabold leading-[1.12] sm:leading-[1.1] tracking-[-0.5px] sm:tracking-[-1px] md:tracking-[-1.5px] text-foreground mb-2.5 sm:mb-3 animate-fade-down" style={{ animationDelay: '.06s' }}>
              Hafriyat <span className="italic font-light text-txt-2">ve</span> hammadde işleriniz
              <br />
              <span className="text-primary">tek platformda.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[13px] sm:text-sm md:text-base font-normal text-txt-2 leading-[1.65] max-w-[520px] mb-3 px-1 animate-fade-down" style={{ animationDelay: '.1s' }}>
              Temel kazısı, hafriyat taşıma, moloz ya da silobas yükü — ihtiyacınızı
              iletin, detayları birlikte değerlendirip teklifinizi hazırlayalım.{" "}
              <Link to="/hafriyat" className="font-semibold text-navy hover:underline">
                Hafriyat işleri sayfası →
              </Link>
            </p>

          </div>
          <figure className="overflow-hidden rounded-2xl border border-border bg-background shadow-card text-left">
            <picture>
              <source media="(max-width: 767px)" srcSet="/images/responsive/hero-filo-mobil-800.webp 800w, /images/hero-filo-mobil.webp 941w" sizes="calc(100vw - 32px)" />
              <SitePhoto
                src="/images/hero-filo.webp"
                alt="Silobas ve hafriyat taşımacılığı"
                priority
                sizes="(min-width: 1024px) 570px, calc(100vw - 32px)"
                className="block w-full h-[280px] object-cover object-[center_60%] md:h-auto"
              />
            </picture>
            <figcaption className="flex items-center justify-between gap-4 px-4 py-3 text-[11px] text-txt-2">
              <span>Silobas ve hafriyat lojistiği</span>
              <span className="text-txt-3">Temsili görsel</span>
            </figcaption>
          </figure>
        </div>

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
                <span className={`tabular-nums tracking-tight text-[15px] sm:text-base md:text-lg font-bold leading-none ${stat.color}`}>{stat.val}</span>
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
            { icon: BulkTruckIcon, label: "Silobas & Hafriyat" },
            { icon: Clock3, label: "Özel Teklif" },
            { icon: ClipboardCheck, label: "Dijital İrsaliye" },
            { icon: MapPinned, label: "11 İl Teslimat" },
            { icon: UserCheck, label: "Kayıt Gerekmez" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-1 sm:gap-1.5 justify-center">
              {i > 0 && <div className="hidden sm:block w-px h-3.5 bg-border2 mr-1 md:mr-3" />}
              <div className="w-[18px] sm:w-5 md:w-[22px] h-[18px] sm:h-5 md:h-[22px] rounded flex items-center justify-center text-[10px] sm:text-[11px] md:text-[11px] bg-off2 border border-border" aria-hidden="true">
                <item.icon className="h-3.5 w-3.5 text-navy" strokeWidth={1.7} />
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
