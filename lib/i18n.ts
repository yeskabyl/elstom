/**
 * Locale settings. The site ships in Russian only; this keeps the locale in
 * one place so a Kazakh version can be added later without hunting for
 * hard-coded values (see README → «Казахская версия»).
 */
export const locales = ["ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string }> = {
  ru: { htmlLang: "ru", ogLocale: "ru_KZ" },
};
