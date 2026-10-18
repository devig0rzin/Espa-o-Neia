import { describe, expect, it } from "vitest";
import {
  formatDuration, formatPrice, googleCalendarUrl, isOpenOn, nextOpenDays, slotsForDay, toISODate, validateBooking,
} from "./booking";

describe("agenda", () => {
  it("domingo é fechado", () => {
    expect(isOpenOn("2026-10-18")).toBe(false);
    expect(slotsForDay("2026-10-18", 60)).toEqual([]);
  });
  it("terça abre 9h e o último início respeita a duração", () => {
    const s = slotsForDay("2026-10-20", 90);
    expect(s[0]).toBe("09:00");
    expect(s[s.length - 1]).toBe("18:30"); // 18:30 + 90min = 20:00
  });
  it("segunda só abre às 13h", () => {
    expect(slotsForDay("2026-10-19", 30)[0]).toBe("13:00");
  });
  it("sábado fecha às 18h", () => {
    const s = slotsForDay("2026-10-24", 60);
    expect(s[s.length - 1]).toBe("17:00");
  });
  it("nextOpenDays pula domingos", () => {
    const days = nextOpenDays(7, new Date(2026, 9, 17));
    expect(days).toHaveLength(7);
    expect(days.some((d) => d === "2026-10-18")).toBe(false);
    expect(days[0]).toBe("2026-10-17");
  });
  it("toISODate não desloca o dia", () => {
    expect(toISODate(new Date(2026, 9, 17, 23, 30))).toBe("2026-10-17");
  });
});

describe("formatação", () => {
  it("preços", () => {
    expect(formatPrice({ price: 0, priceType: "gratuito" })).toBe("Gratuita");
    expect(formatPrice({ price: 180, priceType: "fixo" })).toMatch(/180/);
    expect(formatPrice({ price: 650, priceType: "a partir de" })).toMatch(/^a partir de/);
  });
  it("duração", () => {
    expect(formatDuration(45)).toBe("45 min");
    expect(formatDuration(90)).toBe("1h30");
    expect(formatDuration(120)).toBe("2h");
  });
});

describe("validateBooking", () => {
  const ok = {
    serviceId: "manicure", date: "2026-10-20", time: "10:00", name: "Maria Silva",
    phone: "(11) 99604-5920", consent: true,
  };
  it("aceita entrada válida", () => expect(validateBooking(ok)).toEqual({}));
  it("exige consentimento, nome e telefone", () => {
    const e = validateBooking({ ...ok, consent: false, name: "A", phone: "123" });
    expect(Object.keys(e).sort()).toEqual(["consent", "name", "phone"]);
  });
  it("valida e-mail opcional", () => {
    expect(validateBooking({ ...ok, email: "x" }).email).toBeDefined();
    expect(validateBooking({ ...ok, email: "a@b.com" }).email).toBeUndefined();
  });
});

describe("googleCalendarUrl", () => {
  it("monta o link com início e fim", () => {
    const u = googleCalendarUrl("Manicure", "2026-10-20T13:00:00+00:00", 60, "Cotia");
    expect(u).toContain("20261020T130000Z%2F20261020T140000Z");
  });
});
