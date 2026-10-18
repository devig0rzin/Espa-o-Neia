"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn, maskPhone } from "@/lib/utils";
import type { Service } from "@/data/services";
import { site, whatsappLink } from "@/data/site";
import {
  formatDuration, formatPrice, googleCalendarUrl, nextOpenDays, parseISODate, slotsForDay, validateBooking,
  type BookingErrors,
} from "@/lib/booking";

type Props = {
  services: Service[];
  initialServiceId?: string;
  showPrices: boolean;
  /** Preview estático: sem servidor, simula horários e confirmação. */
  demo?: boolean;
};

type Confirmation = { code: string; service: string; startsAt: string; durationMin: number };

const STEPS = ["Tratamento", "Data e hora", "Seus dados"] as const;
const EVAL_ID = "avaliacao-gratuita";

const fmtWeekday = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const fmtMonth = new Intl.DateTimeFormat("pt-BR", { month: "short" });
const fmtLong = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long", day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" });

/** Assistente de agendamento: tratamento → data/hora → dados → confirmação. */
export function BookingWizard({ services, initialServiceId, showPrices, demo = false }: Props) {
  const fromUrl = useSearchParams().get("servico") ?? undefined;
  const wanted = initialServiceId ?? fromUrl;
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | undefined>(
    services.some((s) => s.id === wanted) ? wanted : undefined,
  );
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [slots, setSlots] = useState<string[] | null>(null);
  const [slotsError, setSlotsError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "", consent: false, website: "" });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [done, setDone] = useState<Confirmation>();
  const heading = useRef<HTMLHeadingElement>(null);

  const selected = services.find((s) => s.id === serviceId);
  // Injetáveis: marca-se a avaliação gratuita, que é o que de fato reserva o horário.
  const bookingService = selected?.bookable === "avaliacao" ? services.find((s) => s.id === EVAL_ID) : selected;
  const days = useMemo(() => nextOpenDays(14), []);
  const grouped = useMemo(() => {
    const map = new Map<string, Service[]>();
    services.forEach((s) => map.set(s.category, [...(map.get(s.category) ?? []), s]));
    return [...map.entries()];
  }, [services]);

  // Foco no título ao trocar de passo (acessibilidade).
  useEffect(() => {
    heading.current?.focus();
  }, [step, done]);

  // Busca horários livres quando serviço e data estão escolhidos.
  useEffect(() => {
    if (!bookingService || !date) return;
    let cancelled = false;
    if (demo) {
      // Preview: grade teórica com alguns horários "ocupados" determinísticos.
      const t = setTimeout(() => {
        if (cancelled) return;
        const seed = date.split("-").reduce((a, n) => a + Number(n), 0);
        setSlots(slotsForDay(date, bookingService.durationMin).filter((_, i) => (i * 7 + seed) % 5 !== 0));
      }, 350);
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }
    fetch(`/api/agendamento/slots?service=${bookingService.id}&date=${date}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { slots: string[] }) => !cancelled && setSlots(d.slots))
      .catch(() => !cancelled && setSlotsError(true));
    return () => {
      cancelled = true;
    };
  }, [bookingService, date, demo, reloadKey]);

  function pickService(id: string) {
    setServiceId(id);
    setDate(undefined);
    setTime(undefined);
    setSlots(null);
    setSlotsError(false);
  }
  function pickDate(iso: string) {
    setDate(iso);
    setTime(undefined);
    setSlots(null);
    setSlotsError(false);
  }

  const canNext = step === 0 ? Boolean(selected) : step === 1 ? Boolean(date && time) : false;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!bookingService || !date || !time) return;
    const notes = [selected && selected.id !== bookingService.id ? `Interesse em: ${selected.name}.` : "", form.notes].filter(Boolean).join(" ");
    const payload = { serviceId: bookingService.id, date, time, name: form.name, phone: form.phone, email: form.email || undefined, notes: notes || undefined, consent: form.consent, website: form.website };
    const errs = validateBooking(payload);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    setSubmitError(undefined);
    try {
      if (demo) {
        await new Promise((r) => setTimeout(r, 700));
        setDone({ code: "DEMO42", service: bookingService.name, startsAt: new Date(`${date}T${time}:00-03:00`).toISOString(), durationMin: bookingService.durationMin });
        return;
      }
      const res = await fetch("/api/agendamento", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json()) as { ok: boolean; error?: string } & Partial<Confirmation>;
      if (!data.ok) {
        setSubmitError(data.error ?? "Não foi possível agendar.");
        if (res.status === 409) {
          setStep(1);
          setTime(undefined);
          setSlots(null);
          setReloadKey((k) => k + 1); // recarrega a lista de horários
        }
        return;
      }
      setDone({ code: data.code!, service: data.service!, startsAt: data.startsAt!, durationMin: data.durationMin! });
    } catch {
      setSubmitError("Sem conexão. Tente novamente ou fale conosco no WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------- confirmação ---------- */
  if (done) {
    const when = fmtLong.format(new Date(done.startsAt));
    const wa = whatsappLink(`Olá! Acabei de agendar pelo site: ${done.service}, ${when}. Código ${done.code}. 💛`);
    return (
      <div className="rounded-3xl border border-aqua/40 bg-marfim p-8 text-center shadow-card md:p-12" role="status">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-aqua/20 text-3xl text-aqua-escuro" aria-hidden>✓</div>
        <h2 ref={heading} tabIndex={-1} className="mt-5 font-display text-3xl text-grafite outline-none focus-visible:!ring-0 md:text-4xl">Agendamento confirmado!</h2>
        <p className="mt-3 text-grafite-suave">{done.service}</p>
        <p className="mt-1 font-display text-2xl text-petrol first-letter:uppercase">{when}</p>
        <p className="mt-4 text-sm text-grafite-suave">Código <strong className="tracking-widest text-grafite">{done.code}</strong> · {site.address.street}, {site.address.city}</p>
        {demo && <p className="mt-3 text-xs text-rose-escuro">Prévia: nenhum agendamento real foi criado.</p>}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={googleCalendarUrl(`${done.service} — Espaço Néia`, done.startsAt, done.durationMin, `${site.address.street}, ${site.address.city}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-framboesa px-6 py-3 text-sm font-medium text-marfim shadow-suave transition hover:bg-framboesa-escuro">
            Adicionar ao Google Agenda
          </a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-grafite/20 px-6 py-3 text-sm font-medium text-grafite transition hover:border-framboesa hover:text-framboesa">
            Avisar no WhatsApp
          </a>
        </div>
      </div>
    );
  }

  /* ---------- passos ---------- */
  return (
    <div className="rounded-3xl border border-nude-escuro/40 bg-marfim p-5 shadow-card md:p-10">
      <ol className="mb-8 flex items-center gap-2 text-xs sm:text-sm" aria-label="Etapas do agendamento">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2" aria-current={i === step ? "step" : undefined}>
            <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors", i <= step ? "border-framboesa bg-framboesa text-marfim" : "border-nude-escuro text-grafite-suave")}>{i + 1}</span>
            <span className={cn("hidden sm:inline", i === step ? "font-medium text-grafite" : "text-grafite-suave")}>{label}</span>
            {i < STEPS.length - 1 && <span className={cn("h-px flex-1 transition-colors", i < step ? "bg-framboesa" : "bg-nude-escuro/60")} aria-hidden />}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div>
          <h2 ref={heading} tabIndex={-1} className="font-display text-2xl text-grafite outline-none focus-visible:!ring-0 md:text-3xl">O que você quer fazer?</h2>
          <p className="mt-1 text-sm text-grafite-suave">Primeira vez? Comece pela avaliação gratuita.</p>
          <div className="mt-6 space-y-6">
            {grouped.map(([cat, list]) => (
              <fieldset key={cat}>
                <legend className="mb-2 text-sm font-medium text-framboesa-escuro">{cat}</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {list.map((s) => (
                    <button key={s.id} type="button" aria-pressed={s.id === serviceId} onClick={() => pickService(s.id)}
                      className={cn("flex flex-col rounded-2xl border p-4 text-left transition", s.id === serviceId ? "border-framboesa bg-rose/10 shadow-card" : "border-nude-escuro/60 hover:border-rose/60")}>
                      <span className="font-medium text-grafite">{s.name}</span>
                      <span className="mt-1 text-xs text-grafite-suave">
                        {formatDuration(s.durationMin)}
                        {showPrices || s.priceType === "gratuito" ? ` · ${formatPrice(s)}` : ""}
                        {s.bookable === "avaliacao" ? " · via avaliação gratuita" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
      )}

      {step === 1 && bookingService && (
        <div>
          <h2 ref={heading} tabIndex={-1} className="font-display text-2xl text-grafite outline-none focus-visible:!ring-0 md:text-3xl">Escolha dia e horário</h2>
          <p className="mt-1 text-sm text-grafite-suave">{bookingService.name} · {formatDuration(bookingService.durationMin)}</p>
          <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2" role="radiogroup" aria-label="Dia">
            {days.map((iso) => {
              const d = parseISODate(iso);
              const on = iso === date;
              return (
                <button key={iso} type="button" role="radio" aria-checked={on} onClick={() => pickDate(iso)}
                  className={cn("flex w-16 shrink-0 flex-col items-center rounded-2xl border py-3 transition", on ? "border-framboesa bg-framboesa text-marfim shadow-card" : "border-nude-escuro/60 hover:border-rose/60")}>
                  <span className="text-[11px] uppercase tracking-wide opacity-80">{fmtWeekday.format(d).replace(".", "")}</span>
                  <span className="font-display text-2xl leading-none">{d.getDate()}</span>
                  <span className="text-[11px] uppercase opacity-80">{fmtMonth.format(d).replace(".", "")}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 min-h-[8rem]" aria-live="polite">
            {!date && <p className="text-sm text-grafite-suave">Selecione um dia para ver os horários livres.</p>}
            {date && slots === null && !slotsError && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5" aria-label="Carregando horários">
                {Array.from({ length: 10 }).map((_, i) => <div key={i} className="h-11 animate-pulse rounded-xl bg-nude/60" />)}
              </div>
            )}
            {slotsError && <p className="text-sm text-rose-escuro">Não foi possível carregar os horários. Tente outro dia ou fale conosco no WhatsApp.</p>}
            {slots && slots.length === 0 && <p className="text-sm text-grafite-suave">Sem horários livres neste dia. Escolha outro dia.</p>}
            {slots && slots.length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5" role="radiogroup" aria-label="Horário">
                {slots.map((t) => (
                  <button key={t} type="button" role="radio" aria-checked={t === time} onClick={() => setTime(t)}
                    className={cn("rounded-xl border py-2.5 text-sm font-medium transition", t === time ? "border-aqua-escuro bg-aqua-escuro text-marfim" : "border-nude-escuro/60 text-grafite hover:border-aqua-escuro")}>{t}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && bookingService && date && time && (
        <form onSubmit={submit} noValidate>
          <h2 ref={heading} tabIndex={-1} className="font-display text-2xl text-grafite outline-none focus-visible:!ring-0 md:text-3xl">Quase lá — seus dados</h2>
          <p className="mt-1 rounded-xl bg-creme px-4 py-3 text-sm text-grafite">
            <strong>{bookingService.name}</strong> · <span className="inline-block first-letter:uppercase">{fmtLong.format(new Date(`${date}T${time}:00-03:00`))}</span>
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Nome completo" error={errors.name}>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" className={inputCls(errors.name)} aria-invalid={!!errors.name} />
            </Field>
            <Field label="WhatsApp" error={errors.phone}>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })} inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999" className={inputCls(errors.phone)} aria-invalid={!!errors.phone} />
            </Field>
            <Field label="E-mail (opcional)" error={errors.email} className="sm:col-span-2">
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" className={inputCls(errors.email)} aria-invalid={!!errors.email} />
            </Field>
            <Field label="Observações (opcional)" error={errors.notes} className="sm:col-span-2">
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} maxLength={500} className={inputCls(errors.notes)} />
            </Field>
            {/* campo-isca anti-robô: invisível para pessoas */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <label>Site<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></label>
            </div>
          </div>
          <label className="mt-5 flex items-start gap-3 text-sm text-grafite-suave">
            <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 h-4 w-4 accent-rose" aria-invalid={!!errors.consent} />
            <span>Autorizo o Espaço Néia a entrar em contato por WhatsApp/e-mail sobre este agendamento, conforme a <a href="/politica-de-privacidade" className="text-framboesa underline">Política de Privacidade</a> (LGPD).</span>
          </label>
          {errors.consent && <p className="mt-1 text-xs text-rose-escuro" role="alert">{errors.consent}</p>}
          {submitError && <p className="mt-4 rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose-escuro" role="alert">{submitError}</p>}
          <button type="submit" disabled={submitting} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-framboesa px-8 py-4 text-base font-medium text-marfim shadow-suave transition hover:bg-framboesa-escuro disabled:opacity-60 sm:w-auto">
            {submitting ? "Confirmando…" : "Confirmar agendamento"}
          </button>
        </form>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-nude-escuro/40 pt-5">
        <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="text-sm text-grafite-suave transition hover:text-framboesa disabled:invisible">← Voltar</button>
        {step < 2 && (
          <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="rounded-full bg-grafite px-7 py-3 text-sm font-medium text-marfim transition hover:bg-petrol disabled:cursor-not-allowed disabled:opacity-40">Continuar</button>
        )}
      </div>
    </div>
  );
}

const inputCls = (err?: string) =>
  cn("w-full rounded-xl border bg-marfim px-4 py-3 text-sm text-grafite outline-none transition focus:border-framboesa", err ? "border-rose-escuro" : "border-nude-escuro/70");

function Field({ label, error, className, children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-sm font-medium text-grafite">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-escuro" role="alert">{error}</span>}
    </label>
  );
}
