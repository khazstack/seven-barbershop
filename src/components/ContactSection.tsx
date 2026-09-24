import { MapPin, Phone, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-secondary-foreground text-5xl md:text-7xl uppercase tracking-tight">
            Find Us
          </h2>

          <div className="mt-12 space-y-8">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-accent mt-1 shrink-0" />
              <div>
                <p className="font-body text-secondary-foreground font-medium">123 Main Street</p>
                <p className="font-body text-muted-foreground text-sm">Brooklyn, NY 11201</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-accent mt-1 shrink-0" />
              <div>
                <p className="font-body text-secondary-foreground font-medium">(718) 555-0199</p>
                <p className="font-body text-muted-foreground text-sm">Call or text to book</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-accent mt-1 shrink-0" />
              <div>
                <p className="font-body text-secondary-foreground font-medium">Mon–Fri: 9AM – 7PM</p>
                <p className="font-body text-muted-foreground text-sm">Sat: 9AM – 5PM · Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="aspect-square md:aspect-auto">
          <iframe
            title="TrimSync Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.344!2d-73.9857!3d40.6892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzIxLjEiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "400px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
