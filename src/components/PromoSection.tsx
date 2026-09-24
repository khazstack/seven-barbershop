import { Gift } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useBooking } from "@/lib/booking";

const PromoSection = () => {
  const { openBooking } = useBooking();
  const { promo } = siteConfig;

  return (
    <section className="bg-accent text-accent-foreground section-padding py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <Gift size={32} className="shrink-0 mt-1" />
          <div>
            <p className="font-body text-xs uppercase tracking-widest opacity-70">{promo.title}</p>
            <p className="font-display text-3xl md:text-4xl uppercase tracking-tight mt-1">{promo.text}</p>
          </div>
        </div>
        <button
          onClick={() => openBooking()}
          className="shrink-0 bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-widest px-8 py-4 hover:opacity-90 transition-opacity duration-200"
        >
          Записаться →
        </button>
      </div>
    </section>
  );
};

export default PromoSection;
