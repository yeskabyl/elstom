import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", tone === "light" && "text-aqua")}>
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "heading-display mt-4 text-[2.35rem] sm:text-5xl lg:text-[3.4rem]",
          tone === "light" && "text-white"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-[1.05rem] leading-relaxed sm:text-lg",
            tone === "dark" ? "text-muted-foreground" : "text-white/70"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
