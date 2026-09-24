import { Clock, ArrowRight } from "lucide-react";

const services = [
  {
    name: "Classic Haircut",
    price: "$40",
    duration: "45 min",
    description: "Precision cut with consultation, shampoo, and styling. Tailored to your look.",
  },
  {
    name: "Beard Trim & Shape",
    price: "$35",
    duration: "30 min",
    description: "Expert trimming, hot towel treatment, and beard oil finish for a clean shape.",
  },
  {
    name: "The Full Package",
    price: "$75",
    duration: "75 min",
    description: "Haircut, beard trim, hot towel shave, and facial treatment. The complete experience.",
  },
  {
    name: "Hair Styling",
    price: "$50",
    duration: "40 min",
    description: "Blow-dry and style with premium products. Perfect for events or a fresh new look.",
  },
  {
    name: "Hot Towel Shave",
    price: "$30",
    duration: "30 min",
    description: "Traditional straight razor shave with hot towel prep and aftershave balm.",
  },
  {
    name: "Facial Treatment",
    price: "$45",
    duration: "35 min",
    description: "Deep cleansing facial with exfoliation, mask, and moisturizer. Rejuvenate your skin.",
  },
];

const ServicesSection = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-display text-foreground text-5xl md:text-7xl uppercase tracking-tight">
          Our Services
        </h2>
        <p className="font-body text-muted-foreground mt-4 max-w-lg">
          Every service is delivered with precision and care by our expert team.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px mt-16 bg-muted-foreground/20">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-secondary p-8 group hover:bg-muted transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-foreground text-2xl uppercase tracking-wide">
                  {service.name}
                </h3>
                <span className="font-display text-accent text-2xl">{service.price}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-muted-foreground" />
                <span className="font-body text-muted-foreground text-sm">{service.duration}</span>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <button
                onClick={scrollToBooking}
                className="flex items-center gap-2 font-body text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
              >
                Book <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
