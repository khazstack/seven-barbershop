import { Fragment } from "react";
import { siteConfig } from "@/config/site";
import { useBooking } from "@/lib/booking";
import { formatPrice } from "@/lib/site";

const HeroSection = () => {
  const { openBooking } = useBooking();
  const titleLines = siteConfig.brand.heroTitle.split("\n");

  return (
    <section className="relative min-h-screen flex flex-col bg-primary overflow-hidden">
      {/* Background Image — subject anchored bottom-left */}
      <div className="absolute inset-0">
        <img
          src={siteConfig.brand.heroImage}
          alt={`${siteConfig.brand.name} — ${siteConfig.brand.tagline}`}
          className="w-full h-full object-cover opacity-60"
          style={{ objectPosition: "left bottom" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/30" />
      </div>

      {/* Title — spanning full width, right-aligned */}
      <div className="relative z-10 section-padding pt-32 md:pt-40">
        <div className="max-w-[1400px] mx-auto text-right">
          <p className="font-body text-primary-foreground/70 text-sm uppercase tracking-widest mb-4">
            {siteConfig.brand.tagline}
          </p>
          <h1 className="font-display text-primary-foreground text-[2.6rem] sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight uppercase">
            {titleLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
        </div>
      </div>

      {/* Price list — right-aligned in lower portion */}
      <div className="relative z-10 mt-auto section-padding pt-12 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto flex justify-end">
          <div className="w-full max-w-md">
            {siteConfig.services.filter((s) => s.featured).map((service) => (
              <div
                key={service.name}
                className="flex justify-between items-center gap-4 py-3 border-b border-primary-foreground/20"
              >
                <span className="font-display text-primary-foreground text-xl md:text-2xl uppercase tracking-wide">
                  {service.name}
                </span>
                <span className="font-display text-primary-foreground text-xl md:text-2xl whitespace-nowrap">
                  {formatPrice(service.price)}
                </span>
              </div>
            ))}

            <button
              onClick={() => openBooking()}
              className="mt-8 w-full bg-accent text-accent-foreground font-body font-semibold text-sm uppercase tracking-widest py-4 hover:opacity-90 transition-opacity duration-200"
            >
              Записаться →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
