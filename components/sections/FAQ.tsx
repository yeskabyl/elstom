import { faq } from "@/data/faq";
import { clinic } from "@/data/clinic";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading id="faq-title" eyebrow="Вопросы и ответы" title="Частые вопросы" />
          <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
            Не нашли ответ? Позвоните{" "}
            <a href={clinic.phone.href} className="rounded-sm font-semibold whitespace-nowrap text-ink underline-offset-4 hover:underline">
              {clinic.phone.display}
            </a>{" "}
            — администратор подскажет.
          </p>
        </div>

        <Accordion className="border-t border-border">
          {faq.map((item) => (
            <AccordionItem key={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
