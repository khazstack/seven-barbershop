import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PromoSection from "@/components/PromoSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import TeamSection from "@/components/TeamSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BranchesSection from "@/components/BranchesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import { siteConfig } from "@/config/site";
import { BookingProvider } from "@/lib/booking";

const Index = () => {
  const multiBranch = siteConfig.branches.length > 1;

  return (
    <BookingProvider>
      <div className="min-h-screen pb-20 md:pb-0">
        <Navbar />
        <HeroSection />
        {siteConfig.promo.enabled && <PromoSection />}
        <ServicesSection />
        {siteConfig.booking.type !== "altegio" && <BookingSection />}
        {siteConfig.barbers.length > 0 && <TeamSection />}
        {siteConfig.gallery.length > 0 && <GallerySection />}
        {siteConfig.testimonials.length > 0 && <TestimonialsSection />}
        {multiBranch ? <BranchesSection /> : <ContactSection />}
        <Footer />
        <MobileStickyBar />
      </div>
    </BookingProvider>
  );
};

export default Index;
