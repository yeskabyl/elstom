import { z } from "zod";
import { clinic, whatsappLink } from "@/data/clinic";
import { serviceLabel, serviceOptions } from "@/data/services";

export const contactMethods = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Телефонный звонок" },
] as const;

export const callTimes = [
  { value: "any", label: "В любое время" },
  { value: "morning", label: "Утром, 8:00–12:00" },
  { value: "day", label: "Днём, 12:00–17:00" },
  { value: "evening", label: "Вечером, 17:00–21:00" },
] as const;

type Values<T extends readonly { value: string }[]> = T[number]["value"];
const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as [Values<T>, ...Values<T>[]];

/**
 * Formats the local part of a Kazakhstan number as `(7XX) XXX-XX-XX` while
 * typing. The `+7` prefix is shown outside the input, so a typed «705…» stays
 * «705…»; pasted or autofilled `+7…` / `8…` numbers are normalised too.
 */
export function formatKzPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length > 10 && (d[0] === "7" || d[0] === "8")) d = d.slice(1);
  d = d.slice(0, 10);
  if (!d) return "";

  let out = `(${d.slice(0, 3)}`;
  if (d.length >= 3) out += ")";
  if (d.length > 3) out += ` ${d.slice(3, 6)}`;
  if (d.length > 6) out += `-${d.slice(6, 8)}`;
  if (d.length > 8) out += `-${d.slice(8, 10)}`;
  return out;
}

const phoneDigits = (v: string) => v.replace(/\D/g, "");

export const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Укажите, как к вам обращаться" })
    .min(2, { error: "Имя слишком короткое" })
    .max(60, { error: "Имя должно быть не длиннее 60 символов" })
    .regex(/^[\p{L}][\p{L}\s'’.-]*$/u, { error: "Имя может содержать только буквы, пробел и дефис" }),
  /** Local part only — the form shows the fixed +7 prefix. */
  phone: z
    .string()
    .refine((v) => phoneDigits(v).length > 0, { error: "Укажите номер телефона" })
    .refine((v) => phoneDigits(v).length === 0 || phoneDigits(v).length === 10, {
      error: "Номер неполный — нужно 10 цифр после +7",
    })
    .refine((v) => phoneDigits(v).length !== 10 || phoneDigits(v)[0] === "7", {
      error: "Укажите казахстанский номер: +7 (7XX) XXX-XX-XX",
    })
    .transform((v) => `+7 ${v}`),
  service: z
    .string()
    .refine((v) => serviceOptions.some((o) => o.value === v), {
      error: "Выберите услугу или вариант «Консультация»",
    }),
  contactMethod: z.enum(values(contactMethods), { error: "Выберите способ связи" }),
  callTime: z.enum(values(callTimes), { error: "Выберите удобное время" }),
  consent: z.boolean().refine((v) => v, {
    error: "Без согласия на обработку данных мы не сможем связаться с вами",
  }),
  /** Honeypot — hidden from people, often filled in by bots. Checked in the form. */
  website: z.string(),
});

/** Submissions faster than this after the form appears are treated as bots. */
export const MIN_FILL_TIME_MS = 2500;

export function looksLikeSpam(data: AppointmentRequest, renderedAt: number) {
  return data.website.trim() !== "" || Date.now() - renderedAt < MIN_FILL_TIME_MS;
}

export type AppointmentInput = z.input<typeof appointmentSchema>;
export type AppointmentRequest = z.output<typeof appointmentSchema>;

const labelOf = <T extends readonly { value: string; label: string }[]>(list: T, value: string) =>
  list.find((o) => o.value === value)?.label ?? value;

export function buildAppointmentMessage(data: AppointmentRequest) {
  return [
    `Здравствуйте! Хочу записаться на приём в ${clinic.name}.`,
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Услуга: ${serviceLabel(data.service)}`,
    `Как связаться: ${labelOf(contactMethods, data.contactMethod)}`,
    `Удобное время: ${labelOf(callTimes, data.callTime)}`,
  ].join("\n");
}

export type DeliveryResult = { channel: "whatsapp"; url: string };

/**
 * Hands a validated request over to the clinic.
 *
 * MVP: builds a prefilled WhatsApp message — nothing is sent or stored by the
 * site; the visitor sends it from WhatsApp. To deliver requests to a CRM or
 * database later, POST `data` from here to a Route Handler
 * (e.g. `app/api/appointment/route.ts`) that re-validates it with
 * `appointmentSchema`, rate-limits, and keeps secrets server-side, then
 * return a new `{ channel: "api" }` result and handle it in the form.
 */
export async function deliverAppointment(data: AppointmentRequest): Promise<DeliveryResult> {
  return { channel: "whatsapp", url: whatsappLink(buildAppointmentMessage(data)) };
}
