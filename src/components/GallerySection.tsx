import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";

const images = [g1, g2, g3, g4, g5, g6, g7, g8];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-display text-secondary-foreground text-5xl md:text-7xl uppercase tracking-tight">
          Our Work
        </h2>
        <p className="font-body text-muted-foreground mt-4">
          A glimpse into the TrimSync experience.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-12">
          {images.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
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
