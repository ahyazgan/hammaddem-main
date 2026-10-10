import { BulkTruckIcon } from "@/components/brand/BrandIcon";

interface SilobasIconProps {
  className?: string;
}

const SilobasIcon = ({ className = "w-6 h-6" }: SilobasIconProps) => (
  <BulkTruckIcon aria-hidden="true" className={className} />
);

export default SilobasIcon;
