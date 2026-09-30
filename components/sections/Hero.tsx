import { ArrowRight, ArrowUpRight, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import { buttonVariants } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { RatingStars } from "@/components/ui/rating";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-12 pt-10 pb-20 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-16 lg:pb-28">
        <div className="animate-in duration-700 fade-in slide-in-from-bottom-3">
          <p className="eyebrow">
            <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            Стоматология в Астане · {clinic.hours.short}
          </p>
          <h1
            id="hero-title"
            className="heading-display mt-6 text-[3.1rem] leading-[0.98] sm:text-[4.2rem] lg:text-[4.6rem] xl:text-[5.2rem]"
          >
            Здоровая улыбка начинается <em className="text-teal italic">с&nbsp;доверия</em>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Современный подход к стоматологии, внимательное отношение и забота о вашей улыбке.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#appointment" className={cn(buttonVariants({ size: "lg" }), "group")}>
              Записаться на приём
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#services" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Наши услуги
            </a>
          </div>

          <dl className="mt-11 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
            <div className="bg-cream p-4 sm:p-5">
              <dt className="sr-only">Рейтинг в 2GIS</dt>
              <dd className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold text-ink">{clinic.rating.display}</span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </dd>
              <dd className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] text-muted-foreground">
                <RatingStars value={clinic.rating.value} className="text-[0.8rem]" />
                {clinic.rating.countLabel} в 2GIS
              </dd>
            </div>
            <div className="bg-cream p-4 sm:p-5">
              <dt className="sr-only">Режим работы</dt>
              <dd className="flex items-center gap-2 font-display text-4xl font-semibold text-ink">
                {clinic.hours.short}
                <Clock className="size-5 text-teal" aria-hidden />
              </dd>
              <dd className="mt-1.5 text-[0.82rem] leading-snug text-muted-foreground">
                {clinic.hours.label}, {clinic.hours.note}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative animate-in delay-150 duration-1000 fade-in">
          <div
            aria-hidden
            className="absolute -top-6 -right-6 hidden h-2/3 w-2/3 rounded-xl bg-aqua-soft sm:block"
          />
          <Photo
            image={images.hero}
            fill
            preload
            sizes="(min-width: 1024px) 45vw, 100vw"
            frameClassName="relative aspect-[4/5] rounded-xl shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]"
          />

          <a
            href={clinic.links.twoGis}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute -bottom-6 left-4 flex items-center gap-4 rounded-lg border border-border bg-white p-4 pr-5 shadow-soft transition-shadow hover:shadow-lift sm:left-6 lg:-left-8"
          >
            <span className="grid size-12 place-items-center rounded-md bg-aqua-soft text-teal">
              <Star className="size-5 fill-current" strokeWidth={0} aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-[0.95rem] font-semibold text-ink">
                {clinic.rating.display} из 5 в 2GIS
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1 text-[0.8rem] text-muted-foreground group-hover:text-teal">
                {clinic.rating.countLabel} · смотреть
                <ArrowUpRight className="size-3.5" aria-hidden />
              </span>
            </span>
            <span className="sr-only">(откроется в новой вкладке)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
