/**
 * Service categories shown on the site.
 *
 * ⚠ TO CONFIRM BEFORE PUBLICATION: this is a proposed list of website
 * categories, not a verified list of Elstom's services. Remove or rename
 * entries to match what the clinic actually offers.
 *
 * `priceFrom` must stay `null` until the clinic provides a verified price —
 * the page then shows «Уточняйте стоимость у администратора».
 */

export type ServiceIcon =
  | "tooth"
  | "hygiene"
  | "whitening"
  | "orthodontics"
  | "implant"
  | "prosthetics"
  | "extraction"
  | "kids";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  /** Verified starting price in tenge, or `null` if not confirmed. */
  priceFrom: number | null;
  /** Set to `true` once the clinic confirms it provides this service. */
  confirmed: boolean;
};

export const services: Service[] = [
  {
    slug: "treatment",
    title: "Лечение зубов",
    description:
      "Диагностика и лечение кариеса и других заболеваний зубов. План лечения обсуждается на консультации.",
    icon: "tooth",
    priceFrom: null,
    confirmed: false,
  },
  {
    slug: "hygiene",
    title: "Профессиональная гигиена",
    description:
      "Профессиональная чистка зубов и рекомендации по домашнему уходу.",
    icon: "hygiene",
    priceFrom: null,
    confirmed: false,
  },
  {
    slug: "whitening",
    title: "Отбеливание",
    description:
      "Осветление эмали. Врач оценит, подходит ли процедура именно вам.",
    icon: "whitening",
    priceFrom: null,
    confirmed: false,
  },
  {
    slug: "orthodontics",
    title: "Ортодонтия",
    description:
      "Исправление прикуса и положения зубов. Вариант лечения подбирается индивидуально.",
    icon: "orthodontics",
    priceFrom: null,
    confirmed: false,
  },
  {
    slug: "implants",
    title: "Имплантация",
    description:
      "Восстановление утраченных зубов с помощью имплантов после обследования и консультации.",
    icon: "implant",
    priceFrom: null,
    confirmed: false,
  },
  {
    slug: "prosthetics",
    title: "Протезирование",
    description:
      "Коронки, мосты и другие конструкции для восстановления формы и функции зубов.",
    icon: "prosthetics",
    priceFrom: null,
    confirmed: false,
  },
  {
    slug: "extraction",
    title: "Удаление зубов",
    description:
      "Удаление зубов по показаниям. Врач объяснит ход процедуры и дальнейшие шаги.",
    icon: "extraction",
    priceFrom: null,
    confirmed: false,
  },
  {
    slug: "kids",
    title: "Детская стоматология",
    description:
      "Приём детей: осмотр, профилактика и лечение молочных и постоянных зубов.",
    icon: "kids",
    priceFrom: null,
    confirmed: false,
  },
];

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "consultation", label: "Консультация — пока не знаю" },
];

export const serviceLabel = (slug: string) =>
  serviceOptions.find((o) => o.value === slug)?.label ?? slug;

const tenge = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function formatPrice(price: number | null) {
  return price === null ? null : `от ${tenge.format(price)} ₸`;
}
