/**
 * ЕДИНЫЙ КОНФИГ КЛИЕНТА
 * ---------------------------------------------------------------------------
 * Все данные барбершопа живут здесь. Чтобы запустить сайт для нового клиента,
 * достаточно заменить значения в этом файле (и картинки в src/assets).
 * Компоненты не содержат данных клиента — только берут их отсюда.
 *
 * Пустые массивы barbers / testimonials / gallery и promo.enabled: false
 * скрывают соответствующие секции.
 */

// TODO: фото из шаблона — заменить на реальные фото Seven Barbershop
import heroImage from "@/assets/hero-barber.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";

// ---------------------------------------------------------------------------
// Типы
// ---------------------------------------------------------------------------

export type BookingType = "altegio" | "whatsapp" | "form";

export interface Brand {
  name: string;
  tagline: string;
  /** Заголовок первого экрана; "\n" — перенос строки */
  heroTitle: string;
  /** Логотип (картинка). Если не задан — выводится название текстом */
  logo?: string;
  /** Акцентный цвет в hex — меняет стиль всего сайта */
  accentColor: string;
  heroImage: string;
  seo: { title: string; description: string };
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  district: string;
  /** Как показывать часы работы, например "Ежедневно 10:00–21:00" */
  hours: string;
  /** Телефон в любом формате, например "+7 747 668 79 29" */
  phone: string;
  /** Номер WhatsApp — лишние символы отбрасываются */
  whatsapp: string;
  /** Координаты [широта, долгота] для карты */
  coords: [number, number];
  /** Ссылка на филиал в 2ГИС */
  twoGisUrl: string;
  /** Необязательно: своя ссылка на онлайн-запись для этого филиала */
  bookingUrl?: string;
}

export interface Service {
  name: string;
  /** Цена «от», в тенге */
  price: number;
  /** Длительность в минутах */
  duration: number;
  description: string;
  /** Показывать в прайсе на первом экране */
  featured?: boolean;
}

export interface Barber {
  name: string;
  role: string;
  /** Путь или импорт фото. Если не задано — показываются инициалы */
  photo?: string;
  /** id филиала из списка branches */
  branchId: string;
}

export interface Testimonial {
  name: string;
  text: string;
  /** Оценка 1–5 */
  rating: number;
}

export interface SiteConfig {
  brand: Brand;
  /** Первый филиал — главный: его координаты используются для карты */
  branches: Branch[];
  services: Service[];
  barbers: Barber[];
  gallery: string[];
  testimonials: Testimonial[];
  promo: { enabled: boolean; title: string; text: string };
  socials: { instagram?: string; tiktok?: string; telegram?: string };
  booking: {
    type: BookingType;
    /** Ссылка на онлайн-запись (для type: "altegio") */
    url?: string;
    /** Номер WhatsApp для заявок (для type: "whatsapp"); по умолчанию — WhatsApp филиала */
    whatsapp?: string;
    /** Сетка времени в форме записи (24 ч) */
    slots: { from: string; to: string; stepMinutes: number };
  };
}

// ---------------------------------------------------------------------------
// Данные клиента: Seven Barbershop, Алматы
// ---------------------------------------------------------------------------

export const siteConfig: SiteConfig = {
  brand: {
    name: "Seven Barbershop",
    tagline: "Барбершоп в Алматы",
    heroTitle: "Стиль\nв деталях",
    logo: undefined,
    accentColor: "#D4A62A",
    heroImage, // TODO: заменить на реальное фото
    seo: {
      title: "Seven Barbershop — барбершоп в Алматы",
      description:
        "Барбершоп на Курмангазы, 72. Мужская стрижка от 8 000 ₸. −10% на первое посещение.",
    },
  },

  branches: [
    {
      id: "kurmangazy",
      name: "Seven на Курмангазы",
      address: "ул. Курмангазы, 72",
      district: "Алмалинский район",
      hours: "Ежедневно 10:00–21:00",
      phone: "+7 747 668 79 29",
      whatsapp: "77476687929",
      coords: [43.244032, 76.93978],
      twoGisUrl: "https://2gis.kz/almaty/firm/70000001116249170",
    },
    // TODO: у Seven Barbershop 3 филиала — добавить два других (адрес, район,
    // часы, телефон, WhatsApp, координаты, ссылка 2ГИС), когда клиент пришлёт данные.
    // При 2+ филиалах вместо «Контактов» автоматически появится секция «Филиалы».
  ],

  services: [
    {
      name: "Мужская стрижка",
      price: 8000,
      duration: 60, // TODO: длительность не подтверждена клиентом
      description:
        "С учётом формы головы, типа волос и ваших пожеланий. Консультация, стрижка, мытьё головы и укладка.",
      featured: true,
    },
    {
      name: "Оформление бороды",
      price: 5000,
      duration: 30, // TODO: длительность не подтверждена клиентом
      description:
        "Моделирование формы, окантовка, бритьё и уход за кожей после процедуры.",
      featured: true,
    },
  ],

  // Реальных данных пока нет — секция скрыта
  barbers: [],

  // TODO: фото из шаблона — заменить на реальные работы
  gallery: [g1, g2, g3, g4, g5, g6, g7, g8],

  // Реальных отзывов пока нет — секция скрыта
  testimonials: [],

  promo: {
    enabled: true,
    title: "Скидка на первое посещение",
    text: "−10% на первое посещение и маска в подарок",
  },

  socials: {
    instagram: "https://instagram.com/seven_barbershop1",
  },

  booking: {
    type: "altegio",
    url: "https://n1337669.alteg.io",
    slots: { from: "10:00", to: "21:00", stepMinutes: 30 },
  },
};
