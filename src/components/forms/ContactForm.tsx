"use client";

import { useState } from "react";
import { maskPhone } from "@/lib/utils";
import { whatsappLink } from "@/data/site";
import { categories } from "@/data/categories";

/**
 * Formulário de solicitação de atendimento.
 * Validação nativa + consentimento LGPD obrigatório.
 *
 * COMPORTAMENTO ATUAL (sem back-end): ao enviar, monta uma mensagem
 * organizada e abre o WhatsApp com os dados preenchidos — funciona 100%
 * sem servidor, ideal para publicação imediata na Vercel.
 *
 * PARA INTEGRAR E-MAIL/CRM depois: crie uma rota /api/contato e troque
 * o corpo de handleSubmit por um fetch para essa rota.
 */
export function ContactForm() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") ?? "");
    const interesse = String(data.get("interesse") ?? "");
    const mensagem = String(data.get("mensagem") ?? "");

    const texto =
      `Olá! Vim pelo site do Espaço Néia.%0A%0A` +
      `*Nome:* ${nome}%0A` +
      `*Telefone:* ${phone}%0A` +
      `*Interesse:* ${interesse}%0A` +
      `*Mensagem:* ${mensagem}`;

    setSent(true);
    window.open(whatsappLink().split("?")[0] + `?text=${texto}`, "_blank", "noopener");
  }

  const fieldClass =
    "w-full rounded-xl border border-nude-escuro/60 bg-marfim px-4 py-3 text-sm text-grafite placeholder:text-grafite-suave/60 focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-grafite">
          Nome completo
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          placeholder="Seu nome"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="telefone" className="mb-1.5 block text-sm font-medium text-grafite">
          Telefone / WhatsApp
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="interesse" className="mb-1.5 block text-sm font-medium text-grafite">
          Sobre o que deseja falar?
        </label>
        <select id="interesse" name="interesse" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Selecione uma opção
          </option>
          <option value="Avaliação inicial">Avaliação inicial</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Campanhas / promoções">Campanhas / promoções</option>
          <option value="Outro assunto">Outro assunto</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-grafite">
          Mensagem <span className="text-grafite-suave/60">(opcional)</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          placeholder="Conte um pouco sobre o que você procura."
          className={fieldClass}
        />
      </div>

      {/* Consentimento LGPD */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 flex-shrink-0 accent-rose"
        />
        <label htmlFor="consent" className="text-xs leading-relaxed text-grafite-suave">
          Autorizo o contato do Espaço Néia pelos dados informados e li a{" "}
          <a href="/politica-de-privacidade" className="text-rose underline">
            Política de Privacidade
          </a>
          . Meus dados serão usados apenas para responder a esta solicitação.
        </label>
      </div>

      <button
        type="submit"
        disabled={!consent}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-medium tracking-wide text-marfim shadow-suave transition-all duration-300 hover:bg-rose-escuro disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
      >
        Solicitar atendimento
      </button>

      {sent && (
        <p className="text-center text-sm text-rose" role="status">
          Abrindo o WhatsApp com os seus dados… Se não abrir, chame-nos diretamente.
        </p>
      )}
    </form>
  );
}
