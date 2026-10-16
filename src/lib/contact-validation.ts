import type { ContactFields } from "./whatsapp";

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const MAX_MESSAGE_LENGTH = 1000;

/** Valida o formulário de contato. A ordem dos erros segue a ordem dos campos na tela. */
export function validateContact(f: ContactFields): { ok: boolean; errors: ContactErrors } {
  const errors: ContactErrors = {};
  if (f.nome.trim().replace(/\s+/g, "").length < 2) errors.nome = "Informe seu nome completo.";
  const digits = f.telefone.replace(/\D/g, "").length;
  if (digits < 10 || digits > 11) errors.telefone = "Informe um telefone com DDD.";
  if (!f.interesse) errors.interesse = "Escolha um assunto.";
  if (f.mensagem.length > MAX_MESSAGE_LENGTH) errors.mensagem = `Use até ${MAX_MESSAGE_LENGTH} caracteres.`;
  if (!f.consent) errors.consent = "É preciso autorizar o contato para continuar.";
  return { ok: Object.keys(errors).length === 0, errors };
}
