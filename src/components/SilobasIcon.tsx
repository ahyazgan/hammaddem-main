import silobasIcon from "@/assets/silobas-icon.svg";

interface SilobasIconProps {
  className?: string;
}

const SilobasIcon = ({ className = "w-6 h-6" }: SilobasIconProps) => (
  <img src={silobasIcon} alt="Silobas" className={className} />
);

export default SilobasIcon;
