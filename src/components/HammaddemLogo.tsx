import logoIcon from "@/assets/logo-icon.png";

interface Props {
  size?: number;
  className?: string;
}

const HammaddemLogo = ({ size = 32, className = "" }: Props) => (
  <img
    src={logoIcon}
    alt="Hammaddem"
    width={size}
    height={size}
    className={`object-contain ${className}`}
  />
);

export default HammaddemLogo;
