import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";

/** Renderiza um Server Component (sem props) num ambiente simulado da Vercel. */
async function render(vercelEnv: string, load: () => Promise<() => React.ReactElement>) {
  vi.resetModules();
  vi.stubEnv("VERCEL_ENV", vercelEnv);
  const Component = await load();
  return renderToString(Component());
}

const home = async () => (await import("./page")).default;
const termos = async () => (await import("./termos-de-uso/page")).default;
const footer = async () => (await import("@/components/layout/Footer")).Footer;
const jsonLd = async () => (await import("@/components/seo/JsonLd")).LocalBusinessJsonLd;

afterEach(() => {
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe("sistema de rascunho em produção", () => {
  // Data anterior à validade das campanhas: elas só podem sumir pelo status draft, não pela data.
  const antesDaValidade = new Date("2026-08-01T12:00:00-03:00");

  it("a Home não expõe conteúdo de protótipo", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(antesDaValidade);
    const html = await render("production", home);
    for (const proibido of [
      "Depoimentos",
      "Histórias de quem confia",
      "Registros reais",
      "Condições especiais em destaque",
      "Ver protocolos em destaque",
      "fictíci",
      "src/data",
      "A validar",
      "R$",
      "formas de pagamento",
    ]) {
      expect(html, proibido).not.toContain(proibido);
    }
  });

  it("rodapé, termos e JSON-LD não mostram e-mail nem Instagram em rascunho", async () => {
    const html = [
      await render("production", footer),
      await render("production", termos),
      await render("production", jsonLd),
    ].join("\n");
    expect(html).not.toContain("contato@espaconeia");
    expect(html).not.toContain("instagram.com");
    expect(html).not.toContain("@espaconeia");
  });
});

describe("sistema de rascunho no preview", () => {
  it("mostra os rascunhos marcados para revisão, inclusive campanhas vigentes", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-08-01T12:00:00-03:00"));
    const html = await render("preview", home);
    expect(html).toContain("Histórias de quem confia");
    expect(html).toContain("Condições especiais em destaque");
    expect(html).toContain("Valor fictício");
  });
});
