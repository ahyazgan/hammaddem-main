import hafriyatIcon from "@/assets/hafriyat-icon.svg";

interface HafriyatIconProps {
  className?: string;
}

const HafriyatIcon = ({ className = "w-6 h-6" }: HafriyatIconProps) => (
  <img src={hafriyatIcon} alt="Hafriyat" className={className} />
);

export default HafriyatIcon;
