import { CalendarCheck, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { clinic } from "@/data/clinic";
import { buttonVariants } from "@/components/ui/button";

/** Fixed call / booking bar on small screens. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-cream/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        <a href={clinic.phone.href} className={cn(buttonVariants({ variant: "outline", size: "md" }), "bg-white")}>
          <Phone />
          Позвонить
        </a>
        <a href="#appointment" className={buttonVariants({ size: "md" })}>
          <CalendarCheck />
          Записаться
        </a>
      </div>
    </div>
  );
}
