import { NextResponse } from "next/server";
import { bookingBackendConfigured, rpc } from "@/lib/supabase-rpc";
import { isOpenOn, slotsForDay } from "@/lib/booking";
import { services } from "@/data/services";

export const dynamic = "force-dynamic";

/** GET /api/agendamento/slots?service=ID&date=YYYY-MM-DD → { slots: ["09:00", ...] } */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const service = searchParams.get("service") ?? "";
  const date = searchParams.get("date") ?? "";
  if (!/^[a-z0-9-]{1,60}$/.test(service) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!bookingBackendConfigured()) {
    // Sem banco configurado (desenvolvimento): oferece a grade teórica, sem checar conflitos.
    const s = services.find((x) => x.id === service);
    return NextResponse.json({ slots: s && isOpenOn(date) ? slotsForDay(date, s.durationMin) : [], demo: true });
  }
  try {
    const slots = await rpc<string[]>("neia_available_slots", { p_service: service, p_date: date });
    return NextResponse.json({ slots });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
