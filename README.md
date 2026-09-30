# Elstom — сайт стоматологической клиники

Landing site proposal for **Elstom Dental Clinic**, ул. Толе би, 46, Астана.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Base UI (shadcn-style primitives) · Framer Motion · React Hook Form + Zod · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Copy `.env.example` to `.env.local` and set the production domain (used for canonical URL, Open Graph, sitemap, robots and JSON-LD):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.kz
```

Without it the site falls back to the Vercel production URL, then to `http://localhost:3000`. No domain is invented.

## Where content lives

| What | File | Status |
| --- | --- | --- |
| Name, rating, address, phone, hours, links, branches, promotion | `data/clinic.ts` | From the 2GIS listing — single source of truth |
| Service categories and prices | `data/services.ts` | **Proposed** — every entry has `confirmed: false`, `priceFrom: null` |
| Doctors | `data/doctors.ts` | Empty — the section shows a neutral placeholder |
| FAQ | `data/faq.ts` | Answers restate verified facts only |
| "Why us", About goals, patient journey | `data/content.ts` | Editable copy, phrased as goals, not claims |
| Photos and gallery | `data/images.ts` | Stock placeholders (see below) |

Nothing about doctors, qualifications, prices, equipment, history, certifications or patient reviews is invented anywhere on the site.

## Checklist before launch

- [ ] **Services** — confirm the list in `data/services.ts`, remove what the clinic doesn't offer, set `confirmed: true`.
- [ ] **Prices** — add verified `priceFrom` values (tenge) or leave `null` («Уточняйте стоимость у администратора»).
- [ ] **Hours** — 2GIS says 24/7. Confirm, then set `clinic.hours.verified = true` (and adjust the copy in `data/content.ts` and `data/faq.ts` if needed).
- [ ] **Promotion** — confirm which services are discounted; set `promotion.expiresAt` / `promotion.terms` (they stay hidden while `null`), or `enabled: false`.
- [ ] **Doctors** — add profiles with the doctors' consent and real portraits (`data/doctors.ts` shows the shape).
- [ ] **Photos** — replace the stock images and fill the gallery (see below).
- [ ] **Branches** — 2GIS lists 7 branches. Add confirmed addresses to `clinic.branches`.
- [ ] **Privacy policy** — `app/privacy/page.tsx` is a draft describing how the site works today. Have the clinic confirm the text and remove the draft note.
- [ ] **Instagram** — the given profile is `@doctor_adilbekov`; confirm it is the clinic's official account.
- [ ] **Domain** — set `NEXT_PUBLIC_SITE_URL`.

## Images

`assets/images/` contains **Unsplash stock photos, not photos of Elstom**:

- `hero-clinic.jpg` — hero
- `about-clinic.jpg`, `about-detail.jpg` — About section

They show interiors and hands only, never identifiable people, and carry a small «Иллюстративное фото» label while `stock: true` in `data/images.ts`. To replace: overwrite the file (same name, ideally ≥ 1600 px wide) and set `stock: false`.

**Gallery** (`data/images.ts → gallery`) has five slots — interior, reception, treatment rooms, equipment, team — showing neutral placeholders. Add real photos:

```ts
import reception from "@/assets/images/gallery/reception.jpg";
{ id: "reception", category: "reception", title: "Ресепшн",
  photo: { src: reception, alt: "Стойка администратора клиники Elstom", stock: false } },
```

The lightbox supports ← / → and Escape, traps focus, and returns focus to the thumbnail on close.

`app/opengraph-image.jpg` (social preview) is built from the hero photo — regenerate it after replacing the hero.

## Appointment form

`components/forms/AppointmentForm.tsx` + `lib/appointment.ts`.

- Validates on the client with Zod (Russian messages). Phone numbers are auto-formatted to `+7 (7XX) XXX-XX-XX` and must be Kazakhstan numbers (`+7 7…`, 10 digits after +7).
- Spam protection: hidden honeypot field and a minimum fill time (2.5 s). A caught submission gets a visible, neutral error, not a fake success.
- **MVP delivery:** after validation, WhatsApp opens (`wa.me/77051800919`) with a prefilled message; the visitor presses «Отправить». The site never claims the request was received — the success state says the message still has to be sent and that it is not a confirmed appointment. If the browser blocks the pop-up, the success state shows an «Открыть WhatsApp» button instead.
- Nothing is stored or logged by the site.

**Connecting a backend later:** replace the body of `deliverAppointment()` in `lib/appointment.ts` with a `fetch` to a Route Handler (e.g. `app/api/appointment/route.ts`). On the server: re-validate with `appointmentSchema`, check the honeypot, rate-limit, and keep CRM / Telegram tokens in server-only env vars (not `NEXT_PUBLIC_*`).

Service cards and «Уточнить стоимость» links preselect the service in the form.

## SEO

- Russian metadata, title «Elstom — стоматология 24/7 в Астане», Open Graph + Twitter card, canonical from `NEXT_PUBLIC_SITE_URL`.
- `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg`, `app/opengraph-image.jpg`.
- JSON-LD `Dentist` in `app/layout.tsx`: name, address, phone, 24/7 hours, Instagram and 2GIS. It leaves out `aggregateRating` on purpose, because Google doesn't allow marking up ratings collected on another site (2GIS). It also leaves out prices, coordinates and credentials.

## Map

The Contacts section shows a static location card. The interactive 2GIS map (`widgets.2gis.com`, firm `70000001113154638`, taken from the clinic's 2GIS short link) loads only when the visitor clicks «Показать карту 2GIS». «Построить маршрут» opens 2GIS directions to the clinic.

## Kazakh version

The site is Russian-only. There is no language switcher, because it would do nothing yet. To add Kazakh:

1. Add `"kk"` to `locales` in `lib/i18n.ts` (with `htmlLang: "kk"`, `ogLocale: "kk_KZ"`).
2. Move `app/page.tsx` under `app/[locale]/` and generate both locales with `generateStaticParams`.
3. Key the content in `data/*.ts` by locale (for example `services: Record<Locale, Service[]>`), and move the section headings into the same data files.
4. Add `alternates.languages` to the metadata and add both locales to `sitemap.ts`.

## Structure

```
app/                  layout (fonts, metadata, JSON-LD), page, privacy, sitemap, robots, icon, OG image
data/                 clinic facts, services, doctors, faq, content, images
lib/                  utils, i18n, appointment schema + delivery
components/
  layout/             Navbar (client), Footer, MobileActionBar, SimpleHeader
  sections/           Hero, Services, Promotion, About, Doctors, WhyChooseUs, PatientJourney,
                      Pricing, FAQ, Reviews, Gallery (client), Appointment, Contact, MapEmbed (client)
  forms/              AppointmentForm (client), ServiceLink (client)
  ui/                 button, accordion, sheet, motion, logo, icons, photo, rating, section-heading
assets/images/        placeholder photos (replace)
```

Sections are Server Components. Only the navbar, form, gallery, map and animation wrappers run on the client. Animations are subtle, and they turn off for visitors with `prefers-reduced-motion`.
