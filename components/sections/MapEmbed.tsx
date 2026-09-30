"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { fullAddress, mainBranch, twoGisWidgetUrl, type Branch } from "@/data/clinic";
import { buttonVariants } from "@/components/ui/button";

/**
 * Location preview that loads the interactive 2GIS map only on request —
 * keeps third-party scripts and cookies off the page until they're wanted.
 */
export function MapEmbed({ branch = mainBranch }: { branch?: Branch }) {
  const [loaded, setLoaded] = useState(false);
  const src = twoGisWidgetUrl(branch);

  if (loaded && src) {
    return (
      <iframe
        src={src}
        title={`Карта 2GIS: ${fullAddress}`}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-mist p-6 text-center">
      {/* Abstract street grid — decorative, not a real map */}
      <svg aria-hidden className="absolute inset-0 size-full text-ink/[0.07]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
        <g stroke="currentColor" fill="none">
          <path d="M-10 70 L410 40" strokeWidth="14" />
          <path d="M-10 200 L410 230" strokeWidth="10" />
          <path d="M120 -10 L150 310" strokeWidth="12" />
          <path d="M290 -10 L270 310" strokeWidth="8" />
          <path d="M-10 130 L410 140" strokeWidth="4" />
          <path d="M210 -10 L215 310" strokeWidth="4" />
        </g>
      </svg>
      <div className="relative flex flex-col items-center">
        <span className="grid size-14 place-items-center rounded-full bg-ink text-aqua shadow-lift">
          <MapPin className="size-6" aria-hidden />
        </span>
        <p className="mt-4 font-display text-2xl font-semibold text-ink">{branch.street}</p>
        <p className="text-sm text-muted-foreground">
          {branch.city}
          {branch.district ? `, ${branch.district}` : ""}
        </p>
        {src && (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className={`${buttonVariants({ variant: "outline", size: "sm" })} mt-5 bg-white`}
          >
            Показать карту 2GIS
          </button>
        )}
      </div>
    </div>
  );
}
