import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { clinic, mainBranch } from "@/data/clinic";
import { defaultLocale, localeMeta } from "@/lib/i18n";
import { MotionProvider } from "@/components/ui/motion";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const title = "Elstom — стоматология 24/7 в Астане";
const description = `Стоматологическая клиника Elstom в Астане: ${mainBranch.street}, ${mainBranch.district}. По данным 2GIS работает круглосуточно, рейтинг ${clinic.rating.display} (${clinic.rating.countLabel}). Запись на приём: ${clinic.phone.display}.`;
const locale = localeMeta[defaultLocale];

export const metadata: Metadata = {
  metadataBase: new URL(clinic.url),
  title: { default: title, template: `%s · ${clinic.name}` },
  description,
  applicationName: clinic.name,
  keywords: [
    "стоматология Астана",
    "стоматология 24/7 Астана",
    "круглосуточная стоматология Астана",
    "стоматолог Толе би",
    "Elstom",
    "Элстом",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: locale.ogLocale,
    url: "/",
    siteName: clinic.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
};

/**
 * Structured data mirrors the visible page and uses verified facts only.
 * No aggregateRating: the rating comes from 2GIS, and Google's guidelines
 * don't allow marking up ratings collected on another site.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${clinic.url}/#clinic`,
  name: clinic.name,
  url: clinic.url,
  telephone: clinic.phone.e164,
  address: {
    "@type": "PostalAddress",
    streetAddress: mainBranch.street,
    addressLocality: mainBranch.city,
    addressCountry: "KZ",
  },
  ...(clinic.hours.is24x7 && {
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  }),
  sameAs: [clinic.links.instagram, clinic.links.twoGis],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={locale.htmlLang} className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:text-white"
        >
          Перейти к содержимому
        </a>
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
