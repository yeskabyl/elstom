import { advantages } from "@/data/content";
import { InfoGlyph } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="border-y border-border bg-white py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          id="why-title"
          eyebrow="Почему Elstom"
          title="Спокойный визит начинается с понятного общения"
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <Stagger className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {advantages.map((item) => (
            <StaggerItem key={item.title} className="bg-white p-7 sm:p-8">
              <InfoGlyph icon={item.icon} className="size-7 text-teal" />
              <h3 className="mt-6 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2.5 text-[0.93rem] leading-relaxed text-muted-foreground">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
