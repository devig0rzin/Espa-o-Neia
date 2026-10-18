import { NextResponse } from "next/server";
import { bookingBackendConfigured, rpc } from "@/lib/supabase-rpc";
import { validateBooking, type BookingInput } from "@/lib/booking";
import { allow } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

type RpcResult =
  | { ok: true; code: string; service: string; startsAt: string; durationMin: number }
  | { ok: false; error: string };

const MESSAGES: Record<string, string> = {
  slot_taken: "Esse horário acabou de ser reservado. Escolha outro, por favor.",
  too_many: "Você já tem agendamentos em aberto. Fale conosco no WhatsApp para remarcar.",
  service_not_found: "Tratamento indisponível para agendamento online.",
  consent_required: "Precisamos da sua autorização para contato.",
  invalid_name: "Informe seu nome.",
  invalid_phone: "Informe um WhatsApp válido com DDD.",
  invalid_email: "E-mail inválido.",
};

/** POST /api/agendamento → cria o agendamento (validação final e anti-conflito no banco). */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!allow(ip)) return NextResponse.json({ ok: false, error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });

  let body: Partial<BookingInput>;
  try {
    body = (await req.json()) as Partial<BookingInput>;
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }
  // Campo-isca preenchido = robô. Responde "ok" sem gravar nada.
  if (body.website) return NextResponse.json({ ok: true, code: "ROBOT0", service: "", startsAt: new Date().toISOString(), durationMin: 0 });

  const errors = validateBooking(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: Object.values(errors)[0], fields: errors }, { status: 422 });
  if (!bookingBackendConfigured()) return NextResponse.json({ ok: false, error: "Agendamento online indisponível no momento." }, { status: 503 });

  try {
    const r = await rpc<RpcResult>("neia_book", {
      p_service: body.serviceId,
      p_date: body.date,
      p_time: body.time,
      p_name: body.name,
      p_phone: body.phone,
      p_email: body.email ?? null,
      p_notes: body.notes ?? null,
      p_consent: body.consent === true,
    });
    if (!r.ok) {
      const status = r.error === "slot_taken" ? 409 : 422;
      return NextResponse.json({ ok: false, error: MESSAGES[r.error] ?? "Não foi possível agendar." }, { status });
    }
    return NextResponse.json(r);
  } catch {
    return NextResponse.json({ ok: false, error: "Agendamento online indisponível no momento." }, { status: 503 });
  }
}
