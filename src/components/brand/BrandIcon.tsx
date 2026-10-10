import type { ComponentType, SVGProps } from "react";
import { Truck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconComponent = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

/** Cab-over tractor and dry-bulk trailer with discharge cones. */
export function BulkTruckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 34V22l4-8h12v20M7 24h9v-7H9M4 29h5M20 30h6M2 35h58" />
      <path d="M25 12h34v10l-5 7h-5l-5-7-5 7h-5l-9-7V12Z" />
      <path d="M29 8h26M32 8v4m20-4v4M35 29v4m16-4v4" className="text-primary" />
      <circle cx="11" cy="36" r="4" /><circle cx="30" cy="36" r="4" />
      <circle cx="48" cy="36" r="4" /><circle cx="58" cy="36" r="4" />
    </svg>
  );
}

export function TipperTruckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 34V22l4-8h12v20M7 24h9v-7H9M4 29h5M2 35h58" />
      <path d="M24 16h37l-5 14H29l-5-14Zm7 0 3 14m8-14v14m10-14-3 14" />
      <path d="m28 12 7-6 8 5 7-4 8 5" className="text-primary" />
      <circle cx="11" cy="36" r="4" /><circle cx="34" cy="36" r="4" />
      <circle cx="47" cy="36" r="4" /><circle cx="57" cy="36" r="4" />
    </svg>
  );
}

export default function BrandIcon({ icon: Icon, size = "md", className }: {
  icon: IconComponent;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const Glyph = Icon === Truck ? BulkTruckIcon : Icon;
  const vehicle = Glyph === BulkTruckIcon || Glyph === TipperTruckIcon;
  const sizes = { sm: "brand-icon--sm", md: "brand-icon--md", lg: "brand-icon--lg" };
  return (
    <span aria-hidden="true" className={cn("brand-icon", sizes[size], className)}>
      <Glyph strokeWidth={vehicle ? 2.8 : 1.65} className={cn("brand-icon__glyph", vehicle && "brand-icon__glyph--vehicle")} />
    </span>
  );
}
