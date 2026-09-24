import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

const initials = (name: string) =>
  name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

const TeamSection = () => {
  const multiBranch = siteConfig.branches.length > 1;

  return (
    <section id="team" className="py-24 section-padding bg-background">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-display text-foreground text-5xl md:text-7xl uppercase tracking-tight">
          Наши барберы
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {siteConfig.barbers.map((barber) => {
            const branch = siteConfig.branches.find((b) => b.id === barber.branchId);
            return (
              <div key={`${barber.name}-${barber.branchId}`}>
                <div className="aspect-[3/4] overflow-hidden bg-primary flex items-center justify-center">
                  {barber.photo ? (
                    <img src={barber.photo} alt={barber.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <span className="font-display text-accent text-6xl">{initials(barber.name)}</span>
                  )}
                </div>
                <h3 className="font-display text-foreground text-2xl uppercase tracking-wide mt-4">{barber.name}</h3>
                <p className="font-body text-muted-foreground text-sm">{barber.role}</p>
                {multiBranch && branch && (
                  <p className="font-body text-muted-foreground text-xs mt-2 flex items-center gap-1">
                    <MapPin size={12} className="text-accent shrink-0" />
                    {branch.address}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
