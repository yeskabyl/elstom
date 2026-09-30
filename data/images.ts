import type { StaticImageData } from "next/image";
import heroClinic from "@/assets/images/hero-clinic.jpg";
import aboutClinic from "@/assets/images/about-clinic.jpg";
import aboutDetail from "@/assets/images/about-detail.jpg";

/**
 * Every photo on the page goes through this file.
 *
 * The three current photos are Unsplash stock images, NOT photos of Elstom.
 * `stock: true` renders a small «Иллюстративное фото» caption so visitors
 * are never misled. Replace them with real clinic photos (same file names)
 * and set `stock: false`.
 */

export type SiteImage = {
  src: StaticImageData;
  alt: string;
  stock: boolean;
};

export const images = {
  hero: {
    src: heroClinic,
    alt: "Светлый стоматологический кабинет с двумя креслами",
    stock: true,
  },
  about: {
    src: aboutClinic,
    alt: "Просторный стоматологический кабинет с бирюзовым креслом",
    stock: true,
  },
  aboutDetail: {
    src: aboutDetail,
    alt: "Врач показывает снимок зубов на планшете",
    stock: true,
  },
} satisfies Record<string, SiteImage>;

export type GalleryCategory =
  | "interior"
  | "reception"
  | "rooms"
  | "equipment"
  | "team";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  title: string;
  /** Real clinic photo. While `undefined`, a neutral placeholder is shown. */
  photo?: SiteImage;
};

/**
 * Gallery slots. Only real Elstom photos belong here — add them as
 * `photo: { src: importedImage, alt: "…", stock: false }`.
 */
export const gallery: GalleryItem[] = [
  { id: "interior", category: "interior", title: "Интерьер клиники" },
  { id: "reception", category: "reception", title: "Ресепшн" },
  { id: "rooms", category: "rooms", title: "Лечебные кабинеты" },
  { id: "equipment", category: "equipment", title: "Оборудование" },
  { id: "team", category: "team", title: "Команда" },
];
