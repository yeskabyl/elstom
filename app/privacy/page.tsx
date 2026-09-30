import type { Metadata } from "next";
import { clinic, fullAddress } from "@/data/clinic";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: `Как сайт клиники ${clinic.name} обрабатывает данные из формы заявки.`,
  alternates: { canonical: "/privacy" },
};

/**
 * ⚠ DRAFT — describes how the site works today (the form hands data to
 * WhatsApp; nothing is stored by the site). The clinic must review and
 * confirm the final text, operator details and retention terms before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <SimpleHeader />
      <main id="main" className="container-page py-16 sm:py-24">
        <article className="mx-auto max-w-2xl">
          <h1 className="heading-display text-5xl sm:text-6xl">Политика конфиденциальности</h1>
          <p className="mt-6 rounded-md bg-aqua-soft px-4 py-3 text-sm text-ink">
            Редакция документа подлежит согласованию с клиникой перед публикацией сайта.
          </p>

          <div className="mt-10 space-y-8 leading-relaxed text-foreground/85 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
            <section>
              <h2>Какие данные мы получаем</h2>
              <p>
                Форма заявки на сайте запрашивает имя, номер телефона, интересующую услугу, предпочтительный способ
                связи и удобное время для звонка.
              </p>
            </section>
            <section>
              <h2>Как передаются данные</h2>
              <p>
                Сайт не сохраняет данные из формы. После проверки формы открывается WhatsApp с подготовленным текстом
                заявки — сообщение отправляете вы сами. Далее переписка обрабатывается по правилам WhatsApp.
              </p>
            </section>
            <section>
              <h2>Зачем нужны данные</h2>
              <p>
                Только для того, чтобы администратор клиники связался с вами, ответил на вопросы и согласовал время
                приёма.
              </p>
            </section>
            <section>
              <h2>Согласие</h2>
              <p>
                Отправляя заявку, вы подтверждаете согласие на обработку персональных данных для связи с вами в
                соответствии с законодательством Республики Казахстан о персональных данных и их защите. Вы можете
                отозвать согласие, обратившись в клинику.
              </p>
            </section>
            <section>
              <h2>Контакты</h2>
              <p>
                {clinic.legalLabel}, {fullAddress}. Телефон:{" "}
                <a href={clinic.phone.href} className="font-semibold text-ink underline underline-offset-3">
                  {clinic.phone.display}
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
