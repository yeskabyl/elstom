import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { clinic, whatsappLink } from "@/data/clinic";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";

const dateFormat = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export function Promotion() {
  const promo = clinic.promotion;
  if (!promo.enabled) return null;

  const message = `Здравствуйте! Подскажите, пожалуйста, на какие услуги действует скидка до ${promo.maxDiscountPercent}% и какие условия акции?`;
  const expires = promo.expiresAt ? dateFormat.format(new Date(`${promo.expiresAt}T00:00:00`)) : null;

  return (
    <section aria-labelledby="promo-title" className="py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-xl bg-ink px-6 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
          {/* Fine concentric rings — quiet decoration, not a gradient wash */}
          <svg
            aria-hidden
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -top-24 -right-24 size-[26rem] text-aqua/15"
            fill="none"
            stroke="currentColor"
          >
            {[60, 100, 140, 180].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} />
            ))}
          </svg>

          <div className="relative grid gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-14">
            <p className="font-display text-[5.5rem] leading-none font-medium text-aqua sm:text-[7rem]" aria-hidden>
              −{promo.maxDiscountPercent}%
            </p>

            <div className="max-w-xl">
              <h2 id="promo-title" className="font-display text-[2.1rem] leading-tight font-medium sm:text-[2.6rem]">
                Скидки до {promo.maxDiscountPercent}% на отдельные услуги
              </h2>
              <p className="mt-4 leading-relaxed text-white/75">
                Уточните у администратора, какие услуги участвуют в акции и какие условия действуют.
              </p>
              {(expires || promo.terms) && (
                <p className="mt-4 text-sm text-white/60">
                  {expires && <>Акция действует до {expires}. </>}
                  {promo.terms}
                </p>
              )}
              <p className="mt-4 text-xs text-white/50">
                Скидка распространяется не на все услуги. Информация об акции указана в карточке клиники в 2GIS;
                перечень услуг и условия подтверждает клиника.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "light", size: "lg" })}
              >
                <WhatsAppIcon className="size-5 text-[#1f9d55]" />
                Уточнить условия
                <span className="sr-only">в WhatsApp (откроется в новой вкладке)</span>
              </a>
              <a href={clinic.phone.href} className={cn(buttonVariants({ variant: "outline-light", size: "lg" }))}>
                <Phone />
                Позвонить
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
