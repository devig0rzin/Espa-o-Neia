import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";

/** Renderiza a Home como Server Component num ambiente simulado. */
async function renderHome(vercelEnv: string) {
  vi.resetModules();
  vi.stubEnv("VERCEL_ENV", vercelEnv);
  const { default: HomePage } = await import("./page");
  return renderToString(HomePage());
}

afterEach(() => vi.unstubAllEnvs());

describe("Home e o sistema de rascunho", () => {
  it("em produção não expõe nenhum conteúdo de protótipo", async () => {
    const html = await renderHome("production");
    for (const proibido of [
      "Histórias de quem confia",
      "Registros reais",
      "fictíci",
      "placeholder",
      "src/data",
      "A validar",
      "Valor fictício",
      "formas de pagamento",
    ]) {
      expect(html, proibido).not.toContain(proibido);
    }
  });

  it("no preview mostra os rascunhos marcados para revisão", async () => {
    const html = await renderHome("preview");
    expect(html).toContain("Histórias de quem confia");
    expect(html).toContain("src/data/testimonials.ts");
  });
});
