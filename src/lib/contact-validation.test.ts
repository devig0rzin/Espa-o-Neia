import { describe, expect, it } from "vitest";
import { validateContact } from "./contact-validation";

const ok = {
  nome: "Ana Souza",
  telefone: "(11) 99999-0000",
  interesse: "Avaliação inicial",
  mensagem: "",
  consent: true,
};

describe("validateContact", () => {
  it("aceita um formulário válido", () => {
    expect(validateContact(ok)).toEqual({ ok: true, errors: {} });
  });
  it("aceita telefone fixo com DDD (10 dígitos)", () => {
    expect(validateContact({ ...ok, telefone: "(11) 4612-3456" }).ok).toBe(true);
  });
  it("exige nome com pelo menos 2 letras", () => {
    expect(validateContact({ ...ok, nome: " a " }).errors.nome).toBe("Informe seu nome completo.");
  });
  it("rejeita telefone incompleto", () => {
    expect(validateContact({ ...ok, telefone: "(11) 9999" }).errors.telefone).toBe(
      "Informe um telefone com DDD.",
    );
  });
  it("exige um assunto", () => {
    expect(validateContact({ ...ok, interesse: "" }).errors.interesse).toBe("Escolha um assunto.");
  });
  it("exige consentimento", () => {
    expect(validateContact({ ...ok, consent: false }).errors.consent).toBe(
      "É preciso autorizar o contato para continuar.",
    );
  });
  it("limita a mensagem a 1000 caracteres", () => {
    expect(validateContact({ ...ok, mensagem: "x".repeat(1001) }).errors.mensagem).toBe(
      "Use até 1000 caracteres.",
    );
  });
  it("formulário vazio aponta 4 erros", () => {
    const r = validateContact({ nome: "", telefone: "", interesse: "", mensagem: "", consent: false });
    expect(r.ok).toBe(false);
    expect(Object.keys(r.errors)).toEqual(["nome", "telefone", "interesse", "consent"]);
  });
});
