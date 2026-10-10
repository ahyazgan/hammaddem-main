import { TipperTruckIcon } from "@/components/brand/BrandIcon";

interface HafriyatIconProps {
  className?: string;
}

const HafriyatIcon = ({ className = "w-6 h-6" }: HafriyatIconProps) => (
  <TipperTruckIcon aria-hidden="true" className={className} />
);

export default HafriyatIcon;
