import type { ImgHTMLAttributes } from "react";
import photography from "@/data/photography.json";

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; priority?: boolean };
type Photo = { alt: string; width: number; height: number; srcSet: string };

/** Shared source dimensions and responsive exports for the photography collection. */
const SitePhoto = ({ src, alt, width, height, sizes, loading, priority = false, ...props }: Props) => {
  const photo = (photography as Record<string, Photo>)[src];
  return (
    <img
      {...props}
      src={src}
      alt={photo?.alt ?? alt ?? ""}
      width={photo?.width ?? width}
      height={photo?.height ?? height}
      srcSet={photo?.srcSet}
      sizes={sizes ?? "(min-width: 1024px) 550px, calc(100vw - 32px)"}
      loading={priority ? "eager" : loading ?? "lazy"}
      {...(priority ? { fetchpriority: "high" } : {})}
      decoding="async"
    />
  );
};

export default SitePhoto;
