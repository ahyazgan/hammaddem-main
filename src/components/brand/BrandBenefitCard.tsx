import { MapPinned, Truck, type LucideIcon } from "lucide-react";
import BrandIcon from "./BrandIcon";

export default function BrandBenefitCard({ icon, title, desc, stacked = false }: { icon: LucideIcon; title: string; desc: string; stacked?: boolean }) {
  return (
    <article className={`brand-benefit ${stacked ? "flex-col" : ""}`}>
      <BrandIcon icon={icon === Truck ? MapPinned : icon} />
      <div className="min-w-0">
        <h3 className="text-base font-bold tracking-tight text-navy mb-2">{title}</h3>
        <p className="text-sm text-txt-2 leading-relaxed">{desc}</p>
      </div>
    </article>
  );
}
