"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Clock, MapPin, Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { clinic, fullAddress, navItems } from "@/data/clinic";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { RatingStars } from "@/components/ui/rating";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sectionIds = navItems.map((item) => item.href.slice(1));

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Scrolls to an in-page section and moves keyboard focus there. */
function goToSection(hash: string) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  history.pushState(null, "", hash);
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // The sheet locks page scroll while open, so in-page links inside it are
  // followed only once it has fully closed.
  const pendingHash = useRef<string | null>(null);
  const active = useActiveSection(sectionIds);

  const closeAndGo = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    pendingHash.current = e.currentTarget.getAttribute("href");
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border bg-cream/95 shadow-[0_10px_30px_-20px_rgb(14_44_53/0.25)] backdrop-blur-md"
          : "border-transparent bg-cream"
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" aria-label="Elstom — на главную" className="shrink-0 rounded-sm">
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-sm px-3 py-2 text-[0.88rem] font-medium transition-colors",
                      isActive ? "text-ink" : "text-muted-foreground hover:text-ink"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-0.5 h-px origin-left bg-teal transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={clinic.phone.href}
            className="hidden items-center gap-2 rounded-sm text-[0.92rem] font-semibold text-ink tabular-nums transition-colors hover:text-teal xl:inline-flex"
          >
            <Phone className="size-4 text-teal" aria-hidden />
            {clinic.phone.display}
          </a>

          <a
            href="#appointment"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Записаться на приём
          </a>

          <a
            href={clinic.phone.href}
            aria-label={`Позвонить: ${clinic.phone.display}`}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "xl:hidden")}
          >
            <Phone className="size-[1.15rem]" />
          </a>

          <Sheet
            open={open}
            onOpenChange={setOpen}
            onOpenChangeComplete={(isOpen) => {
              if (isOpen || !pendingHash.current) return;
              goToSection(pendingHash.current);
              pendingHash.current = null;
            }}
          >
            <SheetTrigger
              aria-label="Открыть меню"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex h-[4.5rem] items-center border-b px-5">
                <Logo />
              </div>
              <SheetTitle className="sr-only">Меню</SheetTitle>
              <SheetDescription className="sr-only">Навигация по сайту Elstom</SheetDescription>

              <nav aria-label="Мобильная навигация" className="flex-1 overflow-y-auto px-3 py-4">
                <ul>
                  {navItems.map((item) => {
                    const isActive = active === item.href.slice(1);
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={closeAndGo}
                          aria-current={isActive ? "location" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-md px-3 py-3.5 font-display text-[1.7rem] leading-none font-medium transition-colors hover:bg-white",
                            isActive ? "text-ink" : "text-ink/70"
                          )}
                        >
                          {item.label}
                          {isActive && <span aria-hidden className="size-1.5 rounded-full bg-teal" />}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="space-y-5 border-t bg-white px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <RatingStars value={clinic.rating.value} className="text-sm" />
                    <span>
                      <b className="text-ink">{clinic.rating.display}</b> · {clinic.rating.countLabel} в 2GIS
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="size-4 text-teal" aria-hidden />
                    {clinic.hours.label} ({clinic.hours.note})
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="size-4 text-teal" aria-hidden />
                    {fullAddress}
                  </li>
                </ul>
                <a
                  href="#appointment"
                  onClick={closeAndGo}
                  className={cn(buttonVariants({ size: "md" }), "w-full")}
                >
                  Записаться на приём
                </a>
                <div className="grid grid-cols-3 gap-2">
                  <a href={clinic.phone.href} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                    <Phone />
                    <span className="sr-only">Позвонить</span>
                  </a>
                  <a
                    href={clinic.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    <WhatsAppIcon className="size-4" />
                    <span className="sr-only">WhatsApp (откроется в новой вкладке)</span>
                  </a>
                  <a
                    href={clinic.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    <InstagramIcon className="size-4" />
                    <span className="sr-only">Instagram (откроется в новой вкладке)</span>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
