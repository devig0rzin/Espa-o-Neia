import type { Service } from "@/data/services";

/** Horário de funcionamento por dia da semana (0 = domingo). Espelha neia.opening_hours. */
export const OPENING: Record<number, { opens: string; closes: string } | null> = {
  0: null,
  1: { opens: "13:00", closes: "20:00" },
  2: { opens: "09:00", closes: "20:00" },
  3: { opens: "09:00", closes: "20:00" },
  4: { opens: "09:00", closes: "20:00" },
  5: { opens: "09:00", closes: "20:00" },
  6: { opens: "09:00", closes: "18:00" },
};

export const SLOT_STEP_MIN = 30;

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHhmm = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** "YYYY-MM-DD" a partir de uma data local (sem deslocar por fuso). */
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isOpenOn(iso: string): boolean {
  return OPENING[parseISODate(iso).getDay()] !== null;
}

/** Próximos `count` dias com a clínica aberta, a partir de `from`. */
export function nextOpenDays(count: number, from: Date = new Date()): string[] {
  const out: string[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (out.length < count && cursor.getTime() - from.getTime() < 60 * 86400000) {
    const iso = toISODate(cursor);
    if (isOpenOn(iso)) out.push(iso);
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

/** Horários de início possíveis num dia, respeitando a duração do serviço. */
export function slotsForDay(iso: string, durationMin: number): string[] {
  const hours = OPENING[parseISODate(iso).getDay()];
  if (!hours) return [];
  const out: string[] = [];
  for (let t = toMin(hours.opens); t + durationMin <= toMin(hours.closes); t += SLOT_STEP_MIN) {
    out.push(toHhmm(t));
  }
  return out;
}

/** Preço exibido. Todo valor pago aparece como "a partir de" (o protocolo final sai na avaliação). */
export function formatPrice(s: Pick<Service, "price" | "priceType">): string {
  if (s.priceType === "gratuito") return "Gratuita";
  const v = s.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  return `a partir de ${v}`;
}

export function formatDuration(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

export type BookingInput = {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  consent: boolean;
  /** Campo-isca anti-robô: deve chegar vazio. */
  website?: string;
};

export type BookingErrors = Partial<Record<keyof BookingInput, string>>;

export function validateBooking(input: Partial<BookingInput>): BookingErrors {
  const e: BookingErrors = {};
  if (!input.serviceId) e.serviceId = "Escolha um tratamento.";
  if (!input.date || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) e.date = "Escolha uma data.";
  if (!input.time || !/^\d{2}:\d{2}$/.test(input.time)) e.time = "Escolha um horário.";
  if (!input.name || input.name.trim().length < 2) e.name = "Informe seu nome.";
  const digits = (input.phone ?? "").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) e.phone = "Informe um WhatsApp válido com DDD.";
  if (input.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) e.email = "E-mail inválido.";
  if (input.notes && input.notes.length > 500) e.notes = "Máximo de 500 caracteres.";
  if (!input.consent) e.consent = "Precisamos da sua autorização para contato.";
  return e;
}

/** Link "Adicionar ao Google Agenda" para a cliente. startsAtISO em UTC. */
export function googleCalendarUrl(title: string, startsAtISO: string, durationMin: number, location: string) {
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const start = new Date(startsAtISO);
  const end = new Date(start.getTime() + durationMin * 60000);
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    location,
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}
