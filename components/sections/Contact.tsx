import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { clinic, mainBranch, twoGisRouteUrl } from "@/data/clinic";
import { buttonVariants } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { MapEmbed } from "./MapEmbed";

const rowClass = "flex gap-4 border-t border-border py-5";
const iconClass = "mt-0.5 size-5 shrink-0 text-teal";

export function Contact() {
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="bg-mist py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="contacts-title" eyebrow="Контакты" title="Ждём вас в клинике" />

          <address className="mt-10 not-italic">
            <p className="font-display text-2xl font-semibold text-ink">{clinic.legalLabel}</p>
            <ul className="mt-5">
              <li className={rowClass}>
                <MapPin className={iconClass} aria-hidden />
                <div>
                  <p className="font-semibold text-ink">
                    {mainBranch.street}, {mainBranch.city}
                  </p>
                  <p className="text-sm text-muted-foreground">{mainBranch.district}</p>
                </div>
              </li>
              <li className={rowClass}>
                <Phone className={iconClass} aria-hidden />
                <a href={clinic.phone.href} className="rounded-sm font-semibold text-ink tabular-nums hover:text-teal">
                  {clinic.phone.display}
                </a>
              </li>
              <li className={rowClass}>
                <Clock className={iconClass} aria-hidden />
                <div>
                  <p className="font-semibold text-ink">{clinic.hours.label} (24/7)</p>
                  <p className="text-sm text-muted-foreground">
                    По данным 2GIS. Режим работы уточняйте по телефону.
                  </p>
                </div>
              </li>
              <li className={cn(rowClass, "flex-wrap gap-x-8 gap-y-3 border-b")}>
                <a
                  href={clinic.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm font-medium text-ink hover:text-teal"
                >
                  <InstagramIcon className="size-5 text-teal" />
                  Instagram {clinic.links.instagramHandle}
                  <span className="sr-only">(откроется в новой вкладке)</span>
                </a>
                <a
                  href={clinic.links.twoGis}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm font-medium text-ink hover:text-teal"
                >
                  <ArrowUpRight className="size-5 text-teal" aria-hidden />
                  Клиника в 2GIS
                  <span className="sr-only">(откроется в новой вкладке)</span>
                </a>
              </li>
            </ul>
          </address>

          {clinic.branchesOn2gis > clinic.branches.length && (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              В карточке клиники на 2GIS указано {clinic.branchesOn2gis} филиалов. Адреса и режим работы других
              филиалов уточняйте у администратора.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <div className="relative min-h-80 flex-1 overflow-hidden rounded-xl border border-border bg-white lg:min-h-[28rem]">
            <MapEmbed />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={twoGisRouteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg" })}
            >
              <Navigation />
              Построить маршрут
              <span className="sr-only">в 2GIS (откроется в новой вкладке)</span>
            </a>
            <a href={clinic.phone.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-white")}>
              <Phone />
              Позвонить
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
