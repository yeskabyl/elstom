import type { ComponentType, SVGProps } from "react";
import {
  Baby,
  CalendarCheck,
  Clock,
  Crown,
  Droplets,
  HeartHandshake,
  MessagesSquare,
  Smile,
  Sparkles,
  type LucideProps,
} from "lucide-react";
import type { ServiceIcon } from "@/data/services";
import type { InfoCard } from "@/data/content";

type IconProps = SVGProps<SVGSVGElement>;

const TOOTH =
  "M8 3.5c-2.6 0-4.2 2.1-4.2 4.9 0 2.2.8 3.9 1.5 5.9.7 2 1 5 2.9 5 1.8 0 1.7-4 3.8-4s2 4 3.8 4c1.9 0 2.2-3 2.9-5 .7-2 1.5-3.7 1.5-5.9 0-2.8-1.6-4.9-4.2-4.9-1.9 0-2.7 1.1-4 1.1S9.9 3.5 8 3.5Z";

/** Line icons drawn to match Lucide's 24px / 1.5 stroke style. */
function LineIcon({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function ToothIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d={TOOTH} />
      <path d="M8.2 7.2c.6-.6 1.3-.8 2-.7" />
    </LineIcon>
  );
}

export function ImplantIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M6 7.2C6 4.9 7.3 3.5 9.2 3.5c1.3 0 1.9.7 2.8.7s1.5-.7 2.8-.7C16.7 3.5 18 4.9 18 7.2c0 1-.3 1.8-.6 2.6H6.6C6.3 9 6 8.2 6 7.2Z" />
      <path d="M9 12h6M9.5 14.5h5M10 17h4M10.8 19.5h2.4" />
      <path d="M9 12l1.8 8.5M15 12l-1.8 8.5" />
    </LineIcon>
  );
}

export function ExtractionIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M8.5 9.5c-2 0-3.2 1.6-3.2 3.7 0 1.6.6 2.9 1.1 4.4.5 1.5.8 3.4 2.1 3.4 1.3 0 1.3-2.9 3-2.9s1.7 2.9 3 2.9c1.3 0 1.6-1.9 2.1-3.4.5-1.5 1.1-2.8 1.1-4.4 0-2.1-1.2-3.7-3.2-3.7-1.4 0-2 .8-3 .8s-1.6-.8-3-.8Z" />
      <path d="M12 6.5V2.5M9.8 4.5 12 2.3l2.2 2.2" />
    </LineIcon>
  );
}

const lucideServiceIcons: Partial<Record<ServiceIcon, ComponentType<LucideProps>>> = {
  hygiene: Droplets,
  whitening: Sparkles,
  orthodontics: Smile,
  prosthetics: Crown,
  kids: Baby,
};

export function ServiceGlyph({ icon, className }: { icon: ServiceIcon; className?: string }) {
  if (icon === "tooth") return <ToothIcon className={className} />;
  if (icon === "implant") return <ImplantIcon className={className} />;
  if (icon === "extraction") return <ExtractionIcon className={className} />;
  const Icon = lucideServiceIcons[icon] ?? Smile;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}

const infoIcons: Record<InfoCard["icon"], ComponentType<LucideProps>> = {
  calendar: CalendarCheck,
  message: MessagesSquare,
  heart: HeartHandshake,
  clock: Clock,
};

export function InfoGlyph({ icon, className }: { icon: InfoCard["icon"]; className?: string }) {
  const Icon = infoIcons[icon];
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.28 11.28 0 0 0 12.05.72C5.8.72.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.66L.6 23.6l6.03-1.58a11.3 11.3 0 0 0 5.41 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
