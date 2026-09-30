import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { aboutGoals } from "@/data/content";
import { images } from "@/data/images";
import { buttonVariants } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/motion";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-mist py-20 sm:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative pb-16 sm:pb-20 lg:pb-0">
          <Photo
            image={images.about}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            frameClassName="aspect-[4/5] w-[85%] rounded-xl sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <Photo
            image={images.aboutDetail}
            fill
            sizes="(min-width: 1024px) 22vw, 50vw"
            frameClassName="absolute right-0 bottom-0 aspect-square w-[46%] rounded-lg border-[6px] border-mist shadow-lift lg:-bottom-10"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />О клинике
            </p>
            <h2 id="about-title" className="heading-display mt-4 text-[2.35rem] sm:text-5xl lg:text-[3.4rem]">
              Внимание к деталям. <span className="text-teal italic">Забота о каждом пациенте.</span>
            </h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground sm:text-lg">
              Мы хотим, чтобы визит к стоматологу был понятным и спокойным — от первого звонка до завершения
              лечения. Вот принципы, на которых строится общение с пациентами:
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {aboutGoals.map((goal, i) => (
              <li key={goal.title} className="border-t border-ink/15 pt-5">
                <span className="font-display text-lg text-teal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 font-semibold text-ink">{goal.title}</h3>
                <p className="mt-1.5 text-[0.93rem] leading-relaxed text-muted-foreground">{goal.text}</p>
              </li>
            ))}
          </ol>

          <a href="#contacts" className={cn(buttonVariants({ size: "lg" }), "group mt-11")}>
            Связаться с клиникой
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
