import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/site";
import Logo from "@/components/Logo";

const Footer = () => {
  const { socials, branches } = siteConfig;
  const links = [
    { label: "Instagram", href: socials.instagram },
    { label: "TikTok", href: socials.tiktok },
    { label: "Telegram", href: socials.telegram },
    { label: "WhatsApp", href: branches[0] ? whatsappLink(branches[0].whatsapp) : undefined },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  return (
    <footer className="bg-primary section-padding py-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-primary-foreground text-xl">
          <Logo />
        </span>
        <p className="font-body text-primary-foreground/40 text-sm text-center">
          © {new Date().getFullYear()} {siteConfig.brand.name} · {siteConfig.brand.tagline}
        </p>
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-primary-foreground/40 text-sm hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
