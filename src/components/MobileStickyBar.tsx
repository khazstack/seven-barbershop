import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useBooking } from "@/lib/booking";
import { whatsappLink } from "@/lib/site";

const MobileStickyBar = () => {
  const { openBooking } = useBooking();
  const whatsapp = siteConfig.branches[0]?.whatsapp;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary border-t border-primary-foreground/10 p-4 flex gap-2">
      <button
        onClick={() => openBooking()}
        className="flex-1 bg-accent text-accent-foreground font-body font-semibold text-sm uppercase tracking-widest py-3 hover:opacity-90 transition-opacity duration-200"
      >
        Записаться →
      </button>
      {whatsapp && (
        <a
          href={whatsappLink(whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          className="flex items-center justify-center px-4 border border-primary-foreground/20 text-primary-foreground hover:border-accent transition-colors"
        >
          <MessageCircle size={20} />
        </a>
      )}
    </div>
  );
};

export default MobileStickyBar;
