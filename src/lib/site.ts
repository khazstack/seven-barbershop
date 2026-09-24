import { siteConfig } from "@/config/site";

// ---------------------------------------------------------------------------
// Форматирование
// ---------------------------------------------------------------------------

const priceFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

/** 8000 → "от 8 000 ₸" (неразрывные пробелы, чтобы цена не переносилась) */
export const formatPrice = (price: number) =>
  `от\u00A0${priceFormatter.format(price).replace(/\s/g, "\u00A0")}\u00A0₸`;

/** 45 → "45 мин", 60 → "1 ч", 90 → "1 ч 30 мин" */
export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} мин`;
  return m ? `${h} ч ${m} мин` : `${h} ч`;
};

// ---------------------------------------------------------------------------
// Контакты
// ---------------------------------------------------------------------------

/** "+7 747 668 79 29" → "77476687929" */
export const digitsOnly = (phone: string) => phone.replace(/\D/g, "");

export const phoneHref = (phone: string) => `tel:+${digitsOnly(phone)}`;

export const whatsappLink = (phone: string, text?: string) =>
  `https://wa.me/${digitsOnly(phone)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Встраиваемая Google-карта по координатам [широта, долгота] */
export const mapEmbedUrl = ([lat, lng]: [number, number]) =>
  `https://maps.google.com/maps?q=${lat},${lng}&z=16&hl=ru&output=embed`;

// ---------------------------------------------------------------------------
// Слоты записи
// ---------------------------------------------------------------------------

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const fromMinutes = (total: number) =>
  `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

/** Слоты от `from` до (`to` − шаг), формат 24 ч */
export const buildTimeSlots = (from: string, to: string, step: number) => {
  const slots: string[] = [];
  for (let t = toMinutes(from); t + step <= toMinutes(to); t += step) {
    slots.push(fromMinutes(t));
  }
  return slots;
};

// ---------------------------------------------------------------------------
// Тема
// ---------------------------------------------------------------------------

const parseHex = (hex: string) => {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

/** "#D4A62A" → "44 66% 50%" — формат HSL-переменных Tailwind/shadcn */
export const hexToHslTriplet = (hex: string) => {
  const [r, g, b] = parseHex(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let hue = 0;
  let sat = 0;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue *= 60;
  }
  return `${Math.round(hue)} ${Math.round(sat * 100)}% ${Math.round(l * 100)}%`;
};

/** Светлый ли цвет — чтобы подобрать тёмный или светлый текст поверх него */
export const isLightColor = (hex: string) => {
  const [r, g, b] = parseHex(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
};

/** Применяет акцентный цвет и мета-данные из конфига к документу */
export const applySiteTheme = () => {
  const { accentColor, seo } = siteConfig.brand;
  const root = document.documentElement;
  const accent = hexToHslTriplet(accentColor);
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--ring", accent);
  root.style.setProperty(
    "--accent-foreground",
    isLightColor(accentColor) ? "0 0% 10%" : "60 7% 97%",
  );

  root.lang = "ru";
  document.title = seo.title;
  const setMeta = (selector: string, content: string) =>
    document.querySelector(selector)?.setAttribute("content", content);
  setMeta('meta[name="description"]', seo.description);
  setMeta('meta[property="og:title"]', seo.title);
  setMeta('meta[property="og:description"]', seo.description);
  setMeta('meta[name="twitter:title"]', seo.title);
  setMeta('meta[name="twitter:description"]', seo.description);
};
