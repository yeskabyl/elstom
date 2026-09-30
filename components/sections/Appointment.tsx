import { Clock, Phone } from "lucide-react";
import { clinic, whatsappLink } from "@/data/clinic";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function Appointment() {
  return (
    <section id="appointment" aria-labelledby="appointment-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            id="appointment-title"
            eyebrow="Запись на приём"
            title="Оставьте заявку — мы свяжемся с вами"
            subtitle="Администратор перезвонит или ответит в WhatsApp, чтобы подобрать удобное время и ответить на вопросы."
          />
          <ul className="mt-10 space-y-3">
            <li>
              <a
                href={clinic.phone.href}
                className="flex items-center gap-4 rounded-lg border border-border bg-white p-4 transition-colors hover:border-ink/25"
              >
                <span className="grid size-11 place-items-center rounded-md bg-aqua-soft text-teal">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Позвонить</span>
                  <span className="font-semibold text-ink tabular-nums">{clinic.phone.display}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={whatsappLink("Здравствуйте! Хочу записаться на приём.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-border bg-white p-4 transition-colors hover:border-ink/25"
              >
                <span className="grid size-11 place-items-center rounded-md bg-aqua-soft text-teal">
                  <WhatsAppIcon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Написать</span>
                  <span className="font-semibold text-ink">WhatsApp</span>
                  <span className="sr-only">(откроется в новой вкладке)</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 p-4 text-sm text-muted-foreground">
              <Clock className="size-5 shrink-0 text-teal" aria-hidden />
              {clinic.hours.label} — {clinic.hours.note}. Перед визитом уточните время приёма.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 shadow-soft sm:p-10">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
