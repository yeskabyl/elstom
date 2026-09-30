import type { StaticImageData } from "next/image";

/**
 * Doctor profiles. Intentionally empty: no verified doctor data has been
 * provided yet, and the section shows a neutral placeholder until it is.
 *
 * Add a profile only with the doctor's consent and verified details, e.g.:
 *
 *   {
 *     id: "ivanov",
 *     name: "Фамилия Имя Отчество",
 *     specialty: "Стоматолог-терапевт",
 *     experience: "Стаж 10 лет",
 *     education: ["Медицинский университет Астана, 2014"],
 *     photo: ivanovPhoto, // import ivanovPhoto from "@/assets/images/doctors/ivanov.jpg"
 *     bookable: true,
 *   }
 */

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  /** Verified experience, written as it should appear, e.g. «Стаж 10 лет». */
  experience?: string;
  /** Verified education and qualifications. */
  education?: string[];
  /** Real portrait only — never stock photography. */
  photo?: StaticImageData | string;
  /** Show «Записаться к врачу», which preselects the doctor in the request. */
  bookable?: boolean;
};

export const doctors: Doctor[] = [];
