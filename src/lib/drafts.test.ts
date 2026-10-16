import { describe, expect, it } from "vitest";
import { showDrafts, visible } from "./drafts";

const env = (vars: Record<string, string>) => vars as unknown as NodeJS.ProcessEnv;

describe("showDrafts", () => {
  it("esconde rascunhos em produção na Vercel", () => {
    expect(showDrafts(env({ VERCEL_ENV: "production", NODE_ENV: "production" }))).toBe(false);
  });
  it("mostra rascunhos nos previews da Vercel", () => {
    expect(showDrafts(env({ VERCEL_ENV: "preview", NODE_ENV: "production" }))).toBe(true);
  });
  it("mostra rascunhos em desenvolvimento", () => {
    expect(showDrafts(env({ NODE_ENV: "development" }))).toBe(true);
  });
  it("esconde rascunhos no build de produção local (next start)", () => {
    expect(showDrafts(env({ NODE_ENV: "production" }))).toBe(false);
  });
});

describe("visible", () => {
  const items = [
    { id: 1, status: "draft" as const },
    { id: 2, status: "approved" as const },
  ];
  it("filtra rascunhos em produção", () => {
    expect(visible(items, env({ VERCEL_ENV: "production" }))).toEqual([{ id: 2, status: "approved" }]);
  });
  it("mantém tudo no preview", () => {
    expect(visible(items, env({ VERCEL_ENV: "preview" }))).toHaveLength(2);
  });
});
