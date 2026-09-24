import { describe, it, expect } from "vitest";
import {
  buildTimeSlots,
  formatDuration,
  formatPrice,
  hexToHslTriplet,
  isLightColor,
  mapEmbedUrl,
  whatsappLink,
} from "@/lib/site";
import { siteConfig } from "@/config/site";

const plain = (s: string) => s.replace(/\u00A0|\u202F/g, " ");

describe("format", () => {
  it("formats prices in tenge", () => {
    expect(plain(formatPrice(8000))).toBe("от 8 000 ₸");
    expect(plain(formatPrice(14000))).toBe("от 14 000 ₸");
    expect(plain(formatPrice(500))).toBe("от 500 ₸");
  });

  it("formats durations", () => {
    expect(formatDuration(30)).toBe("30 мин");
    expect(formatDuration(60)).toBe("1 ч");
    expect(formatDuration(90)).toBe("1 ч 30 мин");
  });

  it("builds wa.me links with prefilled text", () => {
    expect(whatsappLink("+7 747 668 79 29", "Услуга: стрижка")).toBe(
      "https://wa.me/77476687929?text=%D0%A3%D1%81%D0%BB%D1%83%D0%B3%D0%B0%3A%20%D1%81%D1%82%D1%80%D0%B8%D0%B6%D0%BA%D0%B0",
    );
  });

  it("builds 24h time slots", () => {
    const slots = buildTimeSlots("10:00", "21:00", 30);
    expect(slots[0]).toBe("10:00");
    expect(slots[slots.length - 1]).toBe("20:30");
  });

  it("builds a Google Maps embed url", () => {
    expect(mapEmbedUrl([43.244032, 76.93978])).toBe(
      "https://maps.google.com/maps?q=43.244032,76.93978&z=16&hl=ru&output=embed",
    );
  });

  it("converts hex to HSL and picks contrast", () => {
    expect(hexToHslTriplet("#ffffff")).toBe("0 0% 100%");
    expect(hexToHslTriplet("#ff0000")).toBe("0 100% 50%");
    expect(isLightColor("#D4A62A")).toBe(true);
    expect(isLightColor("#1a1a1a")).toBe(false);
  });
});

describe("site config", () => {
  it("links every barber to an existing branch", () => {
    const ids = new Set(siteConfig.branches.map((b) => b.id));
    siteConfig.barbers.forEach((b) => expect(ids.has(b.branchId)).toBe(true));
  });

  it("has a booking url when booking type is altegio", () => {
    if (siteConfig.booking.type === "altegio") expect(siteConfig.booking.url).toBeTruthy();
  });

  it("has at least one branch", () => {
    expect(siteConfig.branches.length).toBeGreaterThan(0);
  });
});
