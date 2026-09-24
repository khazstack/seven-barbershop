import { siteConfig } from "@/config/site";

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-display text-secondary-foreground text-5xl md:text-7xl uppercase tracking-tight">
          Наши работы
        </h2>
        <p className="font-body text-muted-foreground mt-4">
          Так выглядят клиенты {siteConfig.brand.name} после визита.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-12">
          {siteConfig.gallery.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                src={src}
                alt={`Работа ${siteConfig.brand.name} №${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
