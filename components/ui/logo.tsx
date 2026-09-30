import { cn } from "@/lib/utils";

/** Minimal tooth mark on a deep-teal tile (translucent on dark backgrounds). */
export function LogoMark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-9 shrink-0", className)}>
      <rect width="32" height="32" rx="8" fill={tone === "dark" ? "var(--ink)" : "rgb(255 255 255 / 0.08)"} />
      <path
        d="M11.6 7.5c-3 0-4.8 2.4-4.8 5.6 0 2.5.9 4.4 1.7 6.7.8 2.3 1.2 5.7 3.3 5.7 2 0 1.9-4.6 4.2-4.6s2.2 4.6 4.2 4.6c2.1 0 2.5-3.4 3.3-5.7.8-2.3 1.7-4.2 1.7-6.7 0-3.2-1.8-5.6-4.8-5.6-2.2 0-3.1 1.2-4.4 1.2s-2.2-1.2-4.4-1.2Z"
        fill="none"
        stroke="var(--aqua)"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark tone={tone} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.7rem] font-semibold tracking-[-0.01em]",
            tone === "dark" ? "text-ink" : "text-white"
          )}
        >
          Elstom
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-0.5 text-[0.56rem] font-semibold tracking-[0.24em] uppercase",
              tone === "dark" ? "text-muted-foreground" : "text-white/60"
            )}
          >
            Dental clinic
          </span>
        )}
      </span>
    </span>
  );
}
