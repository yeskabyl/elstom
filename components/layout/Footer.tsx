import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { clinic, fullAddress, navItems } from "@/data/clinic";
import { Logo } from "@/components/ui/logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

const linkClass =
  "rounded-sm text-white/70 transition-colors hover:text-white focus-visible:outline-aqua";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pb-24 text-white md:pb-0">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
        <div className="max-w-xs">
          <Logo tone="light" />
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            Стоматологическая клиника в Астане. Запись на консультацию — по телефону, в WhatsApp или через
            форму на сайте.
          </p>
        </div>

        <nav aria-label="Навигация в подвале">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">Разделы</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href.replace(/^#/, "/#")} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">Мы на связи</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={clinic.links.instagram} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <InstagramIcon className="size-4" />
                Instagram
                <span className="sr-only">(откроется в новой вкладке)</span>
              </a>
            </li>
            <li>
              <a href={clinic.links.whatsapp} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <WhatsAppIcon className="size-4" />
                WhatsApp
                <span className="sr-only">(откроется в новой вкладке)</span>
              </a>
            </li>
            <li>
              <a href={clinic.links.twoGis} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <ArrowUpRight className="size-4" aria-hidden />
                Клиника в 2GIS
                <span className="sr-only">(откроется в новой вкладке)</span>
              </a>
            </li>
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">Контакты</h2>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href={clinic.phone.href} className={`${linkClass} inline-flex items-center gap-2.5 text-base font-semibold text-white tabular-nums`}>
                <Phone className="size-4 text-aqua" aria-hidden />
                {clinic.phone.display}
              </a>
            </li>
            <li className="flex gap-2.5 text-white/70">
              <MapPin className="mt-0.5 size-4 shrink-0 text-aqua" aria-hidden />
              {fullAddress}
            </li>
            <li className="flex gap-2.5 text-white/70">
              <Clock className="mt-0.5 size-4 shrink-0 text-aqua" aria-hidden />
              {clinic.hours.label} — {clinic.hours.note}
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {clinic.legalLabel}
          </p>
          <Link href="/privacy" className={linkClass}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
