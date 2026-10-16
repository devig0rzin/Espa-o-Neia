"use client";

import { useRef, useState } from "react";
import { cn, maskPhone } from "@/lib/utils";
import { site } from "@/data/site";
import { categories } from "@/data/categories";
import { buildWhatsappUrl, contactMessage, type ContactFields } from "@/lib/whatsapp";
import { MAX_MESSAGE_LENGTH, validateContact, type ContactErrors } from "@/lib/contact-validation";

/**
 * Formulário de solicitação de atendimento.
 * Validação própria e acessível (aria-invalid + aria-describedby) e consentimento LGPD obrigatório.
 *
 * COMPORTAMENTO ATUAL (sem back-end): ao enviar, monta uma mensagem
 * organizada e abre o WhatsApp com os dados preenchidos — funciona 100%
 * sem servidor, ideal para publicação imediata na Vercel.
 *
 * PARA INTEGRAR E-MAIL/CRM depois: crie uma rota /api/contato e troque
 * o corpo de handleSubmit por um fetch para essa rota.
 */
const FIELD_ORDER: (keyof ContactFields)[] = ["nome", "telefone", "interesse", "mensagem", "consent"];
const FIELD_LABELS: Record<keyof ContactFields, string> = {
  nome: "nome",
  telefone: "telefone",
  interesse: "assunto",
  mensagem: "mensagem",
  consent: "autorização de contato",
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fields: ContactFields = {
      nome: String(data.get("nome") ?? ""),
      telefone: phone,
      interesse: String(data.get("interesse") ?? ""),
      mensagem: String(data.get("mensagem") ?? ""),
      consent: data.get("consent") === "on",
    };

    const result = validateContact(fields);
    setErrors(result.errors);
    if (!result.ok) {
      setSentUrl(null);
      const first = FIELD_ORDER.find((k) => result.errors[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const url = buildWhatsappUrl(contactMessage(fields), site.whatsappNumber);
    setSentUrl(url);
    window.open(url, "_blank", "noopener");
  }

  /** Liga o campo à mensagem de erro (leitores de tela anunciam o erro ao focar o campo). */
  const a11y = (name: keyof ContactFields) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${name}-erro` } : {};

  const fieldClass = (name: keyof ContactFields) =>
    cn(
      "w-full rounded-xl border bg-marfim px-4 py-3 text-sm text-grafite placeholder:text-grafite-suave/60 focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/30",
      errors[name] ? "border-red-700" : "border-nude-escuro/60",
    );

  const errorText = (name: keyof ContactFields) =>
    errors[name] ? (
      <p id={`${name}-erro`} className="mt-1.5 text-xs text-red-700">
        {errors[name]}
      </p>
    ) : null;

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div
        role="alert"
        className={errorCount ? "rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" : "sr-only"}
      >
        {errorCount > 0 &&
          `Revise para continuar: ${FIELD_ORDER.filter((k) => errors[k])
            .map((k) => FIELD_LABELS[k])
            .join(", ")}.`}
      </div>

      <div>
        <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-grafite">
          Nome completo
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          className={fieldClass("nome")}
          {...a11y("nome")}
        />
        {errorText("nome")}
      </div>

      <div>
        <label htmlFor="telefone" className="mb-1.5 block text-sm font-medium text-grafite">
          Telefone / WhatsApp
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          className={fieldClass("telefone")}
          {...a11y("telefone")}
        />
        {errorText("telefone")}
      </div>

      <div>
        <label htmlFor="interesse" className="mb-1.5 block text-sm font-medium text-grafite">
          Sobre o que deseja falar?
        </label>
        <select
          id="interesse"
          name="interesse"
          defaultValue=""
          className={fieldClass("interesse")}
          {...a11y("interesse")}
        >
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
        {errorText("interesse")}
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-grafite">
          Mensagem <span className="text-grafite-suave">(opcional)</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Conte um pouco sobre o que você procura."
          className={fieldClass("mensagem")}
          {...a11y("mensagem")}
        />
        {errorText("mensagem")}
      </div>

      {/* Consentimento LGPD */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 flex-shrink-0 accent-rose"
            {...a11y("consent")}
          />
          <label htmlFor="consent" className="text-xs leading-relaxed text-grafite-suave">
            Autorizo o contato do Espaço Néia pelos dados informados e li a{" "}
            <a href="/politica-de-privacidade" className="text-rose underline">
              Política de Privacidade
            </a>
            . Meus dados serão usados apenas para responder a esta solicitação.
          </label>
        </div>
        {errorText("consent")}
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-medium tracking-wide text-marfim shadow-suave transition-all duration-300 hover:bg-rose-escuro focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
      >
        Solicitar atendimento
      </button>

      {sentUrl && (
        <p className="text-center text-sm text-rose" role="status">
          Abrindo o WhatsApp com os seus dados… Se não abrir,{" "}
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="underline">
            toque aqui para enviar a mensagem
          </a>
          .
        </p>
      )}
    </form>
  );
}
