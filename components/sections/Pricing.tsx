import { ArrowUpRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { clinic, whatsappLink } from "@/data/clinic";
import { formatPrice, services } from "@/data/services";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion";

export function Pricing() {
  const hasVerifiedPrices = services.some((s) => s.priceFrom !== null);

  return (
    <section id="prices" aria-labelledby="prices-title" className="bg-mist py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="prices-title"
            eyebrow="Цены"
            title="Стоимость лечения"
            subtitle="Точная стоимость зависит от объёма лечения. Мы публикуем цены только после их подтверждения клиникой — до этого уточняйте их у администратора."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={clinic.phone.href} className={buttonVariants({ size: "md" })}>
              <Phone />
              Позвонить
            </a>
            <a
              href={whatsappLink("Здравствуйте! Подскажите, пожалуйста, стоимость консультации.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "md" })}
            >
              Спросить в WhatsApp
              <span className="sr-only">(откроется в новой вкладке)</span>
            </a>
          </div>
        </div>

        <Reveal>
          <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
            {services.map((service) => {
              const price = formatPrice(service.priceFrom);
              return (
                <li
                  key={service.slug}
                  className="flex flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7"
                >
                  <span className="font-semibold text-ink">{service.title}</span>
                  <span className="flex items-center justify-between gap-4 sm:justify-end">
                    {price ? (
                      <span className="font-semibold text-ink tabular-nums">{price}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Уточняйте стоимость у администратора</span>
                    )}
                    <a
                      href={whatsappLink(`Здравствуйте! Подскажите, пожалуйста, стоимость услуги «${service.title}».`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "h-9 shrink-0 px-3 text-teal hover:text-ink"
                      )}
                    >
                      Уточнить
                      <ArrowUpRight className="size-3.5" />
                      <span className="sr-only">стоимость услуги «{service.title}» в WhatsApp</span>
                    </a>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {hasVerifiedPrices
              ? "Цены указаны в тенге и носят информационный характер. Итоговая стоимость определяется после консультации."
              : "Информация на сайте не является публичной офертой."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
