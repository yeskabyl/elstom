/**
 * Business facts for Elstom — the single source of truth for everything the
 * page, metadata and structured data say about the clinic.
 *
 * Only facts taken from the clinic's 2GIS listing live here. Anything that
 * still needs the clinic's confirmation is marked `verified: false` and is
 * worded on the page so it never reads as a guarantee.
 */

export type Branch = {
  id: string;
  name: string;
  street: string;
  district?: string;
  city: string;
  /** 2GIS firm card for this branch. */
  twoGisUrl: string;
  /** 2GIS firm id — enables the embedded map widget. */
  twoGisFirmId?: string;
  /** Map centre as published on the branch's 2GIS card. */
  mapCenter?: { lat: number; lon: number };
};

/** The clinic's main branch. The 2GIS listing references 7 branches in total;
 *  add the others here once their addresses are confirmed by the clinic. */
const branches: Branch[] = [
  {
    id: "tole-bi-46",
    name: "Elstom на Толе би",
    street: "ул. Толе би, 46",
    district: "район Нура",
    city: "Астана",
    twoGisUrl: "https://go.2gis.com/nQTvJ",
    // Resolved from the short link above (firm card + map position).
    twoGisFirmId: "70000001113154638",
    mapCenter: { lat: 51.12363, lon: 71.394724 },
  },
];

export const clinic = {
  name: "Elstom",
  legalLabel: "Стоматологическая клиника Elstom",
  category: "Стоматологическая клиника",
  // `||` (not `??`) so an empty env var on the host still falls back.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  rating: {
    value: 4.9,
    display: "4,9",
    count: 152,
    countLabel: "152 оценки",
    source: "2GIS",
  },

  hours: {
    /** As published on 2GIS — confirm the live schedule before launch. */
    is24x7: true,
    short: "24/7",
    label: "Круглосуточно",
    note: "по данным карточки клиники в 2GIS",
    verified: false,
  },

  phone: {
    display: "+7 705 180-09-19",
    e164: "+77051800919",
    href: "tel:+77051800919",
  },

  links: {
    whatsapp: "https://wa.me/77051800919",
    instagram: "https://instagram.com/doctor_adilbekov",
    instagramHandle: "@doctor_adilbekov",
    twoGis: "https://go.2gis.com/nQTvJ",
  },

  branches,
  /** Number of branches shown on the 2GIS listing. */
  branchesOn2gis: 7,

  promotion: {
    enabled: true,
    maxDiscountPercent: 20,
    /** ISO date (YYYY-MM-DD). Leave `null` until the clinic confirms it — the
     *  page hides the expiry line while it is unset. */
    expiresAt: null as string | null,
    /** Short terms confirmed by the clinic; hidden while `null`. */
    terms: null as string | null,
  },
} as const;

export const mainBranch = clinic.branches[0];

export const fullAddress = `${mainBranch.street}, ${mainBranch.city}`;

export const navItems = [
  { label: "Главная", href: "#top" },
  { label: "Услуги", href: "#services" },
  { label: "Врачи", href: "#doctors" },
  { label: "О клинике", href: "#about" },
  { label: "Цены", href: "#prices" },
  { label: "Контакты", href: "#contacts" },
] as const;

export function whatsappLink(message?: string) {
  if (!message) return clinic.links.whatsapp;
  return `${clinic.links.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Opens 2GIS directions with the branch as the destination (the user's
 *  location is picked as the start). Falls back to the firm card. */
export function twoGisRouteUrl(branch: Branch = mainBranch) {
  if (!branch.twoGisFirmId || !branch.mapCenter) return branch.twoGisUrl;
  const { lon, lat } = branch.mapCenter;
  return `https://2gis.kz/astana/directions/points/%7C${lon}%2C${lat}%3B${branch.twoGisFirmId}`;
}

/** 2GIS "firm on map" widget, embeddable in an iframe without an API key. */
export function twoGisWidgetUrl(branch: Branch = mainBranch) {
  if (!branch.twoGisFirmId || !branch.mapCenter) return null;
  const options = {
    pos: { lat: branch.mapCenter.lat, lon: branch.mapCenter.lon, zoom: 16 },
    opt: { city: "astana" },
    org: branch.twoGisFirmId,
  };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}
