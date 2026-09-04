interface Props {
  src: string;
  alt: string;
  caption?: string;
}

/** Hafriyat sayfalarının hero sol sütununda kullanılan 3:2 fotoğraf bloğu. */
const HafriyatHeroGorsel = ({ src, alt, caption }: Props) => (
  <figure className="mt-8 rounded-2xl overflow-hidden border border-border shadow-card bg-off">
    <img
      src={src}
      alt={alt}
      width={1200}
      height={800}
      loading="lazy"
      decoding="async"
      className="w-full aspect-[3/2] object-cover"
    />
    {caption && (
      <figcaption className="px-4 py-2.5 text-xs text-txt-3 border-t border-border">{caption}</figcaption>
    )}
  </figure>
);

export default HafriyatHeroGorsel;
