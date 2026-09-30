import { Info } from "lucide-react";
import { journeySteps } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion";

export function PatientJourney() {
  return (
    <section aria-labelledby="journey-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="journey-title"
          eyebrow="Как проходит запись"
          title="Четыре простых шага до визита"
        />

        <Reveal>
          {/* Vertical timeline on mobile, horizontal row on desktop */}
          <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-border lg:hidden" />
            <span aria-hidden className="absolute top-[1.375rem] right-0 left-0 hidden h-px bg-border lg:block" />
            {journeySteps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-0">
                <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-ink/20 bg-cream font-display text-xl font-semibold text-ink">
                  {i + 1}
                </span>
                <div className="lg:mt-7 lg:pr-4">
                  <h3 className="text-lg leading-snug font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <p className="mt-12 flex max-w-2xl items-start gap-3 rounded-lg bg-aqua-soft px-5 py-4 text-sm leading-relaxed text-ink">
          <Info className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
          Отправка формы на сайте — это заявка, а не подтверждённая запись. Время приёма согласовывается с
          администратором.
        </p>
      </div>
    </section>
  );
}
