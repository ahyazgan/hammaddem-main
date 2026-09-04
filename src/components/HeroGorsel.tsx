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
const HeroGorsel = ({ src, alt, caption, width = 1200, height = 800, className = "", priority = false }: Props) => (
  <figure className={`rounded-2xl overflow-hidden border border-border shadow-card bg-off ${className}`}>
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      {...(priority ? { fetchpriority: "high" } : {})}
      decoding="async"
      style={{ aspectRatio: `${width} / ${height}` }}
      className="w-full object-cover"
    />
    {caption && (
      <figcaption className="px-4 py-2.5 text-xs text-txt-3 border-t border-border">{caption}</figcaption>
    )}
  </figure>
);

export default HeroGorsel;
