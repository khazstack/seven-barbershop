import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useBooking } from "@/lib/booking";
import Logo from "@/components/Logo";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();

  const navLinks = [
    { label: "Услуги", href: "#services" },
    ...(siteConfig.barbers.length ? [{ label: "Барберы", href: "#team" }] : []),
    ...(siteConfig.gallery.length ? [{ label: "Работы", href: "#gallery" }] : []),
    ...(siteConfig.testimonials.length ? [{ label: "Отзывы", href: "#testimonials" }] : []),
    siteConfig.branches.length > 1
      ? { label: "Филиалы", href: "#branches" }
      : { label: "Контакты", href: "#contact" },
  ];

  const handleClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBook = () => {
    setOpen(false);
    openBooking();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-sm">
      <div className="section-padding max-w-[1400px] mx-auto flex items-center justify-between h-16">
        <a href="#" className="text-primary-foreground text-2xl" aria-label={siteConfig.brand.name}>
          <Logo />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.href)}
              className="font-body text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleBook}
            className="bg-accent text-accent-foreground font-body font-semibold text-sm uppercase tracking-widest px-5 py-2 hover:opacity-90 transition-opacity duration-200"
          >
            Записаться
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 section-padding py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.href)}
              className="block font-body text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleBook}
            className="block w-full bg-accent text-accent-foreground font-body font-semibold text-sm uppercase tracking-widest px-5 py-3 hover:opacity-90 transition-opacity duration-200 text-center"
          >
            Записаться
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
