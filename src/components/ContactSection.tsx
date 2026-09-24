import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mapEmbedUrl, phoneHref, whatsappLink } from "@/lib/site";

/** Контакты для клиента с одним филиалом; карта — по координатам главного филиала */
const ContactSection = () => {
  const branch = siteConfig.branches[0];
  if (!branch) return null;

  return (
    <section id="contact" className="py-24 section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-secondary-foreground text-5xl md:text-7xl uppercase tracking-tight">
            Контакты
          </h2>

          <div className="mt-12 space-y-8">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-accent mt-1 shrink-0" />
              <div>
                <p className="font-body text-secondary-foreground font-medium">{branch.address}</p>
                <p className="font-body text-muted-foreground text-sm">
                  {branch.district}
                </p>
                <a
                  href={branch.twoGisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 font-body text-sm font-medium text-secondary-foreground hover:text-accent transition-colors uppercase tracking-wider"
                >
                  <Navigation size={14} /> Маршрут в 2ГИС
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-accent mt-1 shrink-0" />
              <div>
                <a href={phoneHref(branch.phone)} className="font-body text-secondary-foreground font-medium hover:text-accent transition-colors">
                  {branch.phone}
                </a>
                <p className="font-body text-muted-foreground text-sm">
                  Звоните или{" "}
                  <a href={whatsappLink(branch.whatsapp)} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
                    пишите в WhatsApp
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-accent mt-1 shrink-0" />
              <p className="font-body text-secondary-foreground font-medium">{branch.hours}</p>
            </div>
          </div>
        </div>

        <div className="aspect-square md:aspect-auto">
          <iframe
            title={`${siteConfig.brand.name} на карте`}
            src={mapEmbedUrl(branch.coords)}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "400px" }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
