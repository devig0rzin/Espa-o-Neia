/** Link wa.me com a mensagem codificada uma única vez (o texto entra puro, com "\n" para quebrar linha). */
export function buildWhatsappUrl(message: string, number: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export type ContactFields = {
  nome: string;
  telefone: string;
  interesse: string;
  mensagem: string;
  consent: boolean;
};

/** Texto da mensagem enviada pelo formulário de contato. */
export function contactMessage(f: ContactFields): string {
  const lines = [
    "Olá! Vim pelo site do Espaço Néia.",
    "",
    `*Nome:* ${f.nome.trim()}`,
    `*Telefone:* ${f.telefone.trim()}`,
    `*Interesse:* ${f.interesse}`,
  ];
  if (f.mensagem.trim()) lines.push(`*Mensagem:* ${f.mensagem.trim()}`);
  return lines.join("\n");
}
