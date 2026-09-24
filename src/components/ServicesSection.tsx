import { Clock, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useBooking } from "@/lib/booking";
import { formatDuration, formatPrice } from "@/lib/site";

const ServicesSection = () => {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="py-24 section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-display text-foreground text-5xl md:text-7xl uppercase tracking-tight">
          Услуги и цены
        </h2>
        <p className="font-body text-muted-foreground mt-4 max-w-lg">
          Каждую услугу мастера {siteConfig.brand.name} выполняют точно и внимательно к деталям.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px mt-16 bg-muted-foreground/20">
          {siteConfig.services.map((service) => (
            <div
              key={service.name}
              className="min-w-0 bg-secondary p-8 group hover:bg-muted transition-colors duration-200 flex flex-col"
            >
              <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-1 mb-4">
                <h3 className="font-display text-foreground text-2xl uppercase tracking-wide min-w-0">
                  {service.name}
                </h3>
                <span className="font-display text-accent text-2xl whitespace-nowrap">
                  {formatPrice(service.price)}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-muted-foreground" />
                <span className="font-body text-muted-foreground text-sm">
                  {formatDuration(service.duration)}
                </span>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <button
                onClick={() => openBooking({ service: service.name })}
                className="mt-auto flex items-center gap-2 font-body text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
              >
                Записаться <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
