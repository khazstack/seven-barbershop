import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { siteConfig, type Branch } from "@/config/site";

export interface BookingPreset {
  service?: string;
  branchId?: string;
}

interface BookingContextValue {
  /** Что выбрано кнопкой «Записаться» (услуга/филиал) — подхватывает форма записи */
  preset: BookingPreset;
  /** Обработчик всех кнопок «Записаться» на сайте */
  openBooking: (preset?: BookingPreset) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

/** Ссылка Altegio: своя у филиала, иначе общая из конфига */
export const altegioUrl = (branch?: Branch) => branch?.bookingUrl ?? siteConfig.booking.url ?? "";

export const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [preset, setPreset] = useState<BookingPreset>({});

  const openBooking = useCallback((next: BookingPreset = {}) => {
    if (siteConfig.booking.type === "altegio") {
      const branch = siteConfig.branches.find((b) => b.id === next.branchId);
      window.open(altegioUrl(branch), "_blank", "noopener,noreferrer");
      return;
    }
    // "whatsapp" и "form" — ведём в пошаговую форму на странице
    setPreset({ ...next });
    scrollToId("booking");
  }, []);

  const value = useMemo(() => ({ preset, openBooking }), [preset, openBooking]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
};
