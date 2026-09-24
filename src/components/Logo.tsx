import { siteConfig } from "@/config/site";

const Logo = ({ className = "" }: { className?: string }) =>
  siteConfig.brand.logo ? (
    <img src={siteConfig.brand.logo} alt={siteConfig.brand.name} className={`h-8 w-auto ${className}`} />
  ) : (
    <span className={`font-display tracking-wider uppercase ${className}`}>{siteConfig.brand.name}</span>
  );

export default Logo;
