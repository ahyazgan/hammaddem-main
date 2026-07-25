import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Info } from "lucide-react";
import type { MalzemeFiyat } from "@/data/fiyatData";

interface FiyatBannerProps {
  fiyat: MalzemeFiyat;
}

const FiyatBanner = ({ fiyat }: FiyatBannerProps) => {
  return (
    <section className="py-12 px-4 md:px-10 bg-primary/5 border-y border-primary/10">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
                {fiyat.label} Güncel Fiyat Aralığı
              </h2>
            </div>
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-3xl md:text-4xl font-mono font-bold text-primary">
                {fiyat.minFiyat.toLocaleString("tr-TR")} – {fiyat.maxFiyat.toLocaleString("tr-TR")}
              </span>
              <span className="text-base text-txt-2 font-medium">TL / {fiyat.birim}</span>
            </div>
            <div className="flex items-start gap-1.5 text-xs text-txt-3">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{fiyat.not}. Son güncelleme: {fiyat.guncelleme}. Kesin fiyat için teklif alın.</span>
            </div>
          </div>
          <Link
            to="/teklif-al"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all whitespace-nowrap"
          >
            Güncel Fiyat Teklifi Al <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FiyatBanner;
