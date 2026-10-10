import SitePhoto from "@/components/SitePhoto";

interface Props {
  src: string;
  alt: string;
  caption?: string;
  /** Piksel cinsinden gerçek görsel boyutu; oran bundan hesaplanır (CLS önlemi). */
  width?: number;
  height?: number;
  className?: string;
  /** İlk ekranda görünen görseller için: lazy yerine eager + yüksek fetch önceliği (LCP). */
  priority?: boolean;
}

/** Sayfa hero alanlarında kullanılan fotoğraf bloğu. */
const HeroGorsel = ({ src, alt, caption, width, height, className = "", priority = false }: Props) => (
  <figure className={`rounded-2xl overflow-hidden border border-border shadow-card bg-off ${className}`}>
    <SitePhoto
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={width ? "(min-width: 1200px) 1100px, calc(100vw - 32px)" : undefined}
      className="w-full h-auto object-cover"
    />
    {caption && (
      <figcaption className="px-4 py-2.5 text-xs text-txt-3 border-t border-border">{caption}</figcaption>
    )}
  </figure>
);

export default HeroGorsel;
