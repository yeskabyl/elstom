import Image from "next/image";
import { ArrowRight, Phone, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { clinic } from "@/data/clinic";
import { doctors, type Doctor } from "@/data/doctors";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white">
      <div className="relative aspect-[4/5] bg-mist">
        {doctor.photo ? (
          <Image
            src={doctor.photo}
            alt={`${doctor.name}, ${doctor.specialty.toLowerCase()}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <UserRound className="absolute inset-0 m-auto size-16 text-ink/15" strokeWidth={1} aria-hidden />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-teal uppercase">{doctor.specialty}</p>
        <h3 className="mt-2 font-display text-2xl leading-tight font-semibold text-ink">{doctor.name}</h3>
        {doctor.experience && <p className="mt-3 text-sm text-ink">{doctor.experience}</p>}
        {doctor.education && doctor.education.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm leading-relaxed text-muted-foreground">
            {doctor.education.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
        {doctor.bookable && (
          <a
            href="#appointment"
            className="mt-auto inline-flex items-center gap-1.5 self-start rounded-sm pt-5 text-sm font-semibold text-teal hover:text-ink"
          >
            Записаться на приём
            <ArrowRight className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}

function DoctorsEmptyState() {
  return (
    <div className="mt-14 grid overflow-hidden rounded-xl border border-border bg-white lg:grid-cols-[1fr_1.2fr]">
      {/* Neutral silhouettes — deliberately not portraits */}
      <div aria-hidden className="grid grid-cols-3 gap-px bg-border">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex aspect-[3/4] items-end justify-center bg-mist lg:aspect-auto lg:min-h-72">
            <UserRound className="mb-8 size-14 text-ink/10" strokeWidth={1} />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
        <h3 className="font-display text-3xl leading-tight font-medium text-ink">
          Информация о специалистах скоро появится
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Мы готовим страницы врачей с подтверждёнными данными о специализации и опыте. А пока администратор
          подскажет, какой специалист ведёт приём по вашему вопросу.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#appointment" className={buttonVariants({ size: "md" })}>
            Оставить заявку
          </a>
          <a href={clinic.phone.href} className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
            <Phone />
            {clinic.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="doctors-title"
          eyebrow="Врачи"
          title="Наши специалисты"
          subtitle="Врачи, которые ведут приём в клинике Elstom."
        />
        {doctors.length === 0 ? (
          <DoctorsEmptyState />
        ) : (
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <StaggerItem key={doctor.id} className="h-full">
                <DoctorCard doctor={doctor} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
