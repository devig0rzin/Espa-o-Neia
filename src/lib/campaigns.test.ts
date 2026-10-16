import { describe, expect, it } from "vitest";
import type { Campaign } from "@/data/campaigns";
import { formatDateBR, isCampaignLive, liveCampaigns } from "./campaigns";

const base: Campaign = {
  id: "x",
  active: true,
  status: "approved",
  badge: "b",
  title: "t",
  description: "d",
};
const env = (vars: Record<string, string>) => vars as unknown as NodeJS.ProcessEnv;

describe("isCampaignLive", () => {
  const c = { ...base, validUntil: "2026-08-31" };
  it("vale até o fim do último dia no horário de Brasília", () => {
    expect(isCampaignLive(c, new Date("2026-08-31T23:59:00-03:00"))).toBe(true);
  });
  it("expira à meia-noite do dia seguinte em Brasília", () => {
    expect(isCampaignLive(c, new Date("2026-09-01T00:00:00-03:00"))).toBe(false);
  });
  it("sem validade, fica no ar enquanto ativa", () => {
    expect(isCampaignLive(base, new Date("2030-01-01T12:00:00Z"))).toBe(true);
  });
  it("campanha inativa nunca está no ar", () => {
    expect(isCampaignLive({ ...base, active: false }, new Date("2026-01-01T12:00:00Z"))).toBe(false);
  });
});

describe("liveCampaigns", () => {
  const now = new Date("2026-08-01T12:00:00-03:00");
  const list = [
    { ...base, id: "a" },
    { ...base, id: "b", status: "draft" as const },
    { ...base, id: "c", validUntil: "2026-07-31" },
  ];
  it("em produção filtra rascunhos e vencidas", () => {
    expect(liveCampaigns(list, now, env({ VERCEL_ENV: "production" })).map((c) => c.id)).toEqual(["a"]);
  });
  it("no preview mostra rascunhos vigentes, mas nunca vencidas", () => {
    expect(liveCampaigns(list, now, env({ VERCEL_ENV: "preview" })).map((c) => c.id)).toEqual(["a", "b"]);
  });
});

describe("formatDateBR", () => {
  it("formata data ISO no padrão brasileiro", () => {
    expect(formatDateBR("2026-01-05")).toBe("05/01/2026");
  });
});
