import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Five stars filled to `value` (0–5), with an accessible text label. */
export function RatingStars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("relative inline-flex", className)} role="img" aria-label={`Оценка ${value} из 5`}>
      <span className="flex gap-0.5 text-border" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-[1em] fill-current" strokeWidth={0} />
        ))}
      </span>
      <span
        className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-star"
        style={{ width: `${(value / 5) * 100}%` }}
        aria-hidden
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-[1em] shrink-0 fill-current" strokeWidth={0} />
        ))}
      </span>
    </span>
  );
}
