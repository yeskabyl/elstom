import { ArrowRight } from "lucide-react";
import { formatPrice, services, type Service } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceGlyph } from "@/components/ui/icons";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { ServiceLink } from "@/components/forms/ServiceLink";

function ServiceCard({ service }: { service: Service }) {
  const price = formatPrice(service.priceFrom);

  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-ink/15 hover:shadow-soft sm:p-7">
      <span className="grid size-12 place-items-center rounded-md bg-aqua-soft text-teal transition-colors duration-300 group-hover:bg-ink group-hover:text-aqua">
        <ServiceGlyph icon={service.icon} className="size-6" />
      </span>
      <h3 className="mt-6 text-lg font-semibold text-ink">{service.title}</h3>
      <p className="mt-2.5 flex-1 text-[0.93rem] leading-relaxed text-muted-foreground">{service.description}</p>

      <div className="mt-6 flex flex-col items-start gap-2.5 border-t border-border pt-5">
        <p className="text-[0.82rem] text-muted-foreground">
          {price ? <span className="font-semibold text-ink">{price}</span> : "Стоимость — у администратора"}
        </p>
        <ServiceLink
          service={service.slug}
          className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-teal hover:text-ink"
        >
          {price ? "Узнать подробнее" : "Уточнить стоимость"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          <span className="sr-only">: {service.title}</span>
        </ServiceLink>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-mist py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="services-title"
            eyebrow="Услуги"
            title="Забота о вашей улыбке"
            subtitle="Подберите услугу и уточните детали лечения у специалиста."
          />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground lg:text-right">
            Перечень услуг и стоимость лечения уточняйте у администратора клиники.
          </p>
        </div>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
