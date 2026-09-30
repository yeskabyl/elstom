"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, LoaderCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { clinic } from "@/data/clinic";
import { serviceOptions } from "@/data/services";
import {
  appointmentSchema,
  callTimes,
  contactMethods,
  deliverAppointment,
  formatKzPhone,
  looksLikeSpam,
  type AppointmentInput,
  type AppointmentRequest,
} from "@/lib/appointment";
import { SELECT_SERVICE_EVENT } from "@/lib/appointment-events";
import { Button, buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";

const fieldClass =
  "h-13 w-full rounded-md border border-input bg-cream px-4 text-base text-ink transition-[border-color,box-shadow,background-color] outline-none placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:bg-white focus-visible:ring-3 focus-visible:ring-ring/25 aria-invalid:border-destructive aria-invalid:ring-destructive/15";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm text-destructive">
      <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

type Sent = { url: string; opened: boolean; contactMethod: AppointmentRequest["contactMethod"] };

export function AppointmentForm() {
  const uid = useId();
  const ids = (name: string) => ({ field: `${uid}-${name}`, error: `${uid}-${name}-error` });
  const renderedAt = useRef(0);
  const [sent, setSent] = useState<Sent | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput, unknown, AppointmentRequest>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      contactMethod: "whatsapp",
      callTime: "any",
      consent: false,
      website: "",
    },
  });

  useEffect(() => {
    renderedAt.current = Date.now();
  }, [sent]);

  // Service cards preselect their service when they link to the form.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (serviceOptions.some((o) => o.value === slug)) {
        setValue("service", slug, { shouldValidate: true });
        setSent(null);
      }
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, [setValue]);

  const onSubmit = async (data: AppointmentRequest) => {
    setFormError(null);
    if (looksLikeSpam(data, renderedAt.current)) {
      setFormError("Не удалось отправить заявку. Проверьте данные и попробуйте ещё раз или позвоните нам.");
      return;
    }
    try {
      const result = await deliverAppointment(data);
      const win = window.open(result.url, "_blank");
      if (win) win.opener = null;
      setSent({ url: result.url, opened: Boolean(win), contactMethod: data.contactMethod });
    } catch {
      setFormError(`Не удалось подготовить заявку. Позвоните нам: ${clinic.phone.display}.`);
    }
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start py-4">
        <span className="grid size-14 place-items-center rounded-full bg-aqua-soft text-teal">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold text-ink">
          {sent.opened ? "Осталось отправить сообщение" : "Заявка готова к отправке"}
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
          {sent.opened
            ? "Мы открыли WhatsApp с текстом вашей заявки. Нажмите в нём «Отправить», чтобы заявка дошла до администратора."
            : "Нажмите кнопку ниже — откроется WhatsApp с текстом вашей заявки. Затем нажмите в нём «Отправить»."}
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Это ещё не подтверждение записи: администратор свяжется с вами{" "}
          {sent.contactMethod === "call" ? "по телефону" : "в WhatsApp"}, чтобы согласовать время.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={sent.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            <WhatsAppIcon className="size-5" />
            {sent.opened ? "Открыть WhatsApp ещё раз" : "Открыть WhatsApp"}
            <span className="sr-only">(откроется в новой вкладке)</span>
          </a>
          <button
            type="button"
            onClick={() => {
              reset();
              setSent(null);
            }}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Заполнить заново
          </button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Нет WhatsApp? Позвоните:{" "}
          <a href={clinic.phone.href} className="font-semibold whitespace-nowrap text-ink hover:text-teal">
            {clinic.phone.display}
          </a>
        </p>
      </div>
    );
  }

  const name = ids("name");
  const phone = ids("phone");
  const service = ids("service");
  const callTime = ids("callTime");
  const consent = ids("consent");

  return (
    <form onSubmit={(e) => handleSubmit(onSubmit)(e)} noValidate aria-describedby={`${uid}-note`} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={name.field} className="text-sm font-semibold text-ink">
            Имя
          </label>
          <input
            id={name.field}
            autoComplete="given-name"
            placeholder="Как к вам обращаться"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? name.error : undefined}
            className={fieldClass}
            {...register("name")}
          />
          <FieldError id={name.error} message={errors.name?.message} />
        </div>

        <div className="grid gap-2">
          <label htmlFor={phone.field} className="text-sm font-semibold text-ink">
            Номер телефона
          </label>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base text-ink tabular-nums"
            >
              +7
            </span>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <input
                  id={phone.field}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="(7__) ___-__-__"
                  aria-label="Номер телефона, после +7"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? phone.error : undefined}
                  className={cn(fieldClass, "pl-11 tabular-nums")}
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(e) => field.onChange(formatKzPhone(e.target.value))}
                />
              )}
            />
          </div>
          <FieldError id={phone.error} message={errors.phone?.message} />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor={service.field} className="text-sm font-semibold text-ink">
          Интересующая услуга
        </label>
        <div className="relative">
          <select
            id={service.field}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? service.error : undefined}
            className={cn(fieldClass, "cursor-pointer appearance-none pr-11")}
            {...register("service")}
          >
            <option value="" disabled>
              Выберите услугу
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        </div>
        <FieldError id={service.error} message={errors.service?.message} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <fieldset className="grid gap-2">
          <legend className="mb-2 text-sm font-semibold text-ink">Предпочтительный способ связи</legend>
          <div className="grid grid-cols-2 gap-2">
            {contactMethods.map((m) => (
              <label
                key={m.value}
                className="relative flex h-13 cursor-pointer items-center justify-center rounded-md border border-input bg-cream px-3 text-center text-sm font-medium text-ink/80 transition-colors hover:border-ink/40 has-checked:border-ink has-checked:bg-ink has-checked:text-white has-focus-visible:ring-3 has-focus-visible:ring-ring/35"
              >
                <input type="radio" value={m.value} className="sr-only" {...register("contactMethod")} />
                {m.value === "whatsapp" ? "WhatsApp" : "Звонок"}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid content-start gap-2">
          <label htmlFor={callTime.field} className="mb-2 text-sm font-semibold text-ink">
            Удобное время для связи
          </label>
          <div className="relative">
            <select
              id={callTime.field}
              className={cn(fieldClass, "cursor-pointer appearance-none pr-11")}
              {...register("callTime")}
            >
              {callTimes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          </div>
        </div>
      </div>

      {/* Honeypot: invisible to people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Сайт
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid gap-2">
        <label htmlFor={consent.field} className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-muted-foreground">
          <input
            id={consent.field}
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? consent.error : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-[var(--ink)]"
            {...register("consent")}
          />
          <span>
            Я согласен(на) на обработку персональных данных для связи со мной по заявке в соответствии с{" "}
            <Link href="/privacy" className="font-medium text-ink underline underline-offset-3 hover:text-teal">
              политикой конфиденциальности
            </Link>
            .
          </span>
        </label>
        <FieldError id={consent.error} message={errors.consent?.message} />
      </div>

      {formError && (
        <p role="alert" className="flex items-start gap-2 rounded-md bg-destructive/8 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {formError}
        </p>
      )}

      <div className="grid gap-3">
        <Button type="submit" size="lg" disabled={isSubmitting} className="group w-full">
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden />
              Готовим заявку…
            </>
          ) : (
            <>
              Отправить заявку
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </Button>
        <p id={`${uid}-note`} className="text-center text-xs leading-relaxed text-muted-foreground">
          Заявка откроется в WhatsApp — останется нажать «Отправить». Данные формы не сохраняются на сайте.
          Заявка не является подтверждённой записью.
        </p>
        <a
          href={clinic.phone.href}
          className="mx-auto inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-ink hover:text-teal"
        >
          <Phone className="size-4 text-teal" aria-hidden />
          Или позвоните: {clinic.phone.display}
        </a>
      </div>
    </form>
  );
}
