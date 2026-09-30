import { clinic, fullAddress } from "./clinic";

/**
 * FAQ. Answers restate verified facts from `clinic.ts` and never give
 * individual medical advice. Edit freely — the accordion renders this list.
 */

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Как записаться на приём?",
    answer: `Оставьте заявку на сайте, позвоните по номеру ${clinic.phone.display} или напишите в WhatsApp. Администратор свяжется с вами, чтобы согласовать время. Заявка с сайта — это запрос, а не подтверждённая запись.`,
  },
  {
    question: "Где находится клиника?",
    answer: `${fullAddress} (${clinic.branches[0].district}). Маршрут можно построить в 2GIS. В карточке клиники на 2GIS указаны и другие филиалы — администратор подскажет, какой адрес вам удобнее.`,
  },
  {
    question: "Как уточнить стоимость лечения?",
    answer:
      "Стоимость зависит от объёма лечения, поэтому уточняйте её у администратора по телефону или в WhatsApp. Цены публикуются на сайте только после подтверждения клиникой.",
  },
  {
    question: "Действует ли клиника круглосуточно?",
    answer:
      "Согласно карточке клиники в 2GIS, клиника работает круглосуточно. Перед визитом — особенно в ночное время — рекомендуем позвонить и уточнить, когда вас смогут принять.",
  },
  {
    question: "На какие услуги распространяется скидка?",
    answer: `В 2GIS указаны скидки до ${clinic.promotion.maxDiscountPercent}% на отдельные услуги — не на все виды лечения. Какие услуги участвуют в акции и какие условия действуют, уточняйте у администратора.`,
  },
];
