import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useBooking } from "@/lib/booking";
import { mapEmbedUrl, phoneHref } from "@/lib/site";

const BranchesSection = () => {
  const { openBooking } = useBooking();
  const { branches } = siteConfig;

  return (
    <section id="branches" className="py-24 section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-display text-secondary-foreground text-5xl md:text-7xl uppercase tracking-tight">
          Филиалы
        </h2>
        <p className="font-body text-muted-foreground mt-4">
          Выберите ближайший к вам барбершоп {siteConfig.brand.name}.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {branches.map((branch, i) => (
            <div key={branch.id} className="bg-background border border-muted-foreground/20 p-8 flex flex-col">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-accent text-2xl">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-secondary-foreground text-2xl uppercase tracking-wide">
                  {branch.name}
                </h3>
              </div>

              <div className="mt-6 space-y-4 font-body text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-secondary-foreground font-medium">{branch.address}</p>
                    <p className="text-muted-foreground">{branch.district}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-accent mt-0.5 shrink-0" />
                  <p className="text-secondary-foreground">{branch.hours}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-accent mt-0.5 shrink-0" />
                  <a href={phoneHref(branch.phone)} className="text-secondary-foreground hover:text-accent transition-colors">
                    {branch.phone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-8 mt-auto">
                <a
                  href={branch.twoGisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-secondary-foreground/30 text-secondary-foreground font-body font-semibold text-xs uppercase tracking-widest py-3 hover:border-accent hover:text-accent transition-colors duration-200"
                >
                  <Navigation size={14} /> Маршрут в 2ГИС
                </a>
                <button
                  onClick={() => openBooking({ branchId: branch.id })}
                  className="bg-accent text-accent-foreground font-body font-semibold text-xs uppercase tracking-widest py-3 hover:opacity-90 transition-opacity duration-200"
                >
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <iframe
            title={`${siteConfig.brand.name} на карте`}
            src={mapEmbedUrl(branches[0].coords)}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
