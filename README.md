# Seven Barbershop — сайт и шаблон барбершопа

Сайт Seven Barbershop (Алматы) на шаблоне TrimSync: React + TypeScript + Tailwind + shadcn/ui.
Все данные клиента лежат в одном файле, **`src/config/site.ts`**; компоненты берут их только оттуда.

## Как адаптировать шаблон под нового клиента

1. **`src/config/site.ts`** — заменить значения:
   - `brand` — название, слоган, заголовок первого экрана (`heroTitle`, `\n` — перенос строки),
     `logo` (необязательно), `accentColor` (hex), `heroImage`, `seo`;
   - `branches` — филиалы. Первый считается главным (его координаты на карте). При одном филиале
     выводится блок «Контакты», при 2+ — секция «Филиалы» с кнопками «Маршрут в 2ГИС» и «Записаться»;
   - `services` — услуги (`featured: true` — показать в прайсе на первом экране);
   - `barbers`, `gallery`, `testimonials` — пустой массив скрывает секцию;
   - `promo` — акция под первым экраном (`enabled: false` скрывает);
   - `socials` — Instagram / TikTok / Telegram (необязательные);
   - `booking.type`:
     - `"altegio"` — все кнопки «Записаться» открывают `booking.url` в новой вкладке
       (у филиала можно задать свой `bookingUrl`);
     - `"whatsapp"` — пошаговая форма на сайте, в конце открывается `wa.me` с готовой заявкой
       (номер — `booking.whatsapp` или WhatsApp филиала);
     - `"form"` — пошаговая форма на сайте;
     - `booking.slots` — сетка времени формы (`from`, `to`, `stepMinutes`, 24 ч).
2. **Картинки** положить в `src/assets` и импортировать в конфиге.
3. **`index.html`** — обновить `<title>`, `description`, `og:*`, `twitter:*` под `brand.seo`
   (при старте они всё равно перезаписываются из конфига, но статичные теги нужны для превью ссылок).
4. Проверить: `npm run build`, `npx tsc -p tsconfig.app.json --noEmit`, `npm test`.

Акцентный цвет применяется через CSS-переменные `--accent` и `--ring` (`src/lib/site.ts`),
цвет текста на акцентных кнопках подбирается автоматически по яркости.

```sh
npm install --legacy-peer-deps
npm run dev
```

---

# seven-barbershop

*use the image as inspiration for layout, typography, imagery and spacing
"TrimSync" (Simple–Medium)

A modern appointment booking page for a barbershop/salon.

Inspired by: Squarespace Scheduling (Acuity) + Wix Bookings examples Squarespace is praised as best for design-forward service businesses. "A great booking website doesn't just look good—it works hard behind the scenes. It should feel effortless for your clients and powerful for your business."

Tailored Concept:

Bold, lifestyle hero section with a short headline + "Book Now" button

Service menu cards: Haircut, Beard Trim, Full Package — each with price, duration, and individual booking link

Embedded calendar widget with time slot selection + staff member choice

Gallery section showcasing recent work (Instagram-style grid)

Testimonials carousel + Google Maps embed for location

Mobile-first design with sticky bottom CTA bar

Complexity: Simple–Medium — multi-service selector, calendar integration, staff profiles

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://seven-barbershop.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c2d450e2-a23a-4e5f-8d07-3ca1461765c3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
