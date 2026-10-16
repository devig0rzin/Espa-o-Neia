import { describe, expect, it } from "vitest";
import { buildWhatsappUrl, contactMessage } from "./whatsapp";

const textOf = (url: string) => new URL(url).searchParams.get("text");

describe("buildWhatsappUrl", () => {
  it("preserva caracteres especiais, emoji e quebras de linha", () => {
    const msg = "a & b #1 100% ✨ ?x=1+2\nok";
    expect(textOf(buildWhatsappUrl(msg, "5511999999999"))).toBe(msg);
  });
  it("codifica uma única vez", () => {
    expect(buildWhatsappUrl("linha 1\nlinha 2", "5511999999999")).not.toContain("%25");
  });
  it("usa o número informado no link wa.me", () => {
    expect(buildWhatsappUrl("oi", "5511999999999")).toMatch(/^https:\/\/wa\.me\/5511999999999\?text=/);
  });
});

describe("contactMessage", () => {
  const fields = {
    nome: "Ana",
    telefone: "(11) 99999-0000",
    interesse: "Estética facial",
    mensagem: "",
    consent: true,
  };
  it("monta texto puro com uma linha por campo", () => {
    const msg = contactMessage(fields);
    expect(msg).toContain("*Nome:* Ana\n");
    expect(msg).toContain("*Telefone:* (11) 99999-0000\n");
    expect(msg).not.toContain("%0A");
  });
  it("omite a linha de mensagem quando vazia", () => {
    expect(contactMessage(fields)).not.toContain("*Mensagem:*");
  });
  it("inclui a mensagem quando preenchida, sem cortar em & ou #", () => {
    const msg = contactMessage({ ...fields, mensagem: "Teste & #1" });
    expect(textOf(buildWhatsappUrl(msg, "5511999999999"))).toContain("*Mensagem:* Teste & #1");
  });
});
