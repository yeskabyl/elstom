import { ArrowUpRight } from "lucide-react";
import { clinic } from "@/data/clinic";
import { plural } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { RatingStars } from "@/components/ui/rating";
import { Reveal } from "@/components/ui/motion";

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-ink py-20 text-white sm:py-28">
      <div className="container-page">
        <Reveal className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-aqua">
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              Отзывы пациентов
            </p>
            <h2 id="reviews-title" className="heading-display mt-4 text-[2.35rem] text-white sm:text-5xl lg:text-[3.4rem]">
              Оценки пациентов в 2GIS
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Рейтинг клиники в 2GIS — {clinic.rating.display} из 5 на основе{" "}
              {clinic.rating.count} {plural(clinic.rating.count, ["оценки", "оценок", "оценок"])}. Отзывы
              опубликованы на 2GIS — читайте их в первоисточнике.
            </p>
            <a
              href={clinic.links.twoGis}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonVariants({ variant: "light", size: "lg" })} mt-9`}
            >
              Все отзывы на 2GIS
              <ArrowUpRight />
              <span className="sr-only">(откроется в новой вкладке)</span>
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center sm:p-10 lg:min-w-80">
            <p className="font-display text-[6.5rem] leading-none font-medium text-white">{clinic.rating.display}</p>
            <RatingStars value={clinic.rating.value} className="mt-4 text-2xl [&>span:first-child]:text-white/15" />
            <p className="mt-4 text-white/70">
              {clinic.rating.countLabel}
              <br />
              <span className="text-sm text-white/50">по данным {clinic.rating.source}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
