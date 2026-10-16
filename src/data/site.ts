/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL DO SITE — EDITE AQUI
 * ============================================================
 *  Este é o arquivo mais importante para atualizações rápidas.
 *  Telefone, WhatsApp, endereço, horários e redes sociais
 *  são lidos por TODAS as páginas a partir daqui.
 *
 *  Para trocar o telefone do site inteiro, altere `phoneDisplay`
 *  e `whatsappNumber` abaixo. Pronto.
 * ============================================================
 */

import type { ContentStatus } from "./types";
import { showDrafts } from "@/lib/drafts";

export const site = {
  name: "Espaço Néia",
  legalName: "Espaço Néia Beleza e Estética",
  tagline: "Beleza, estética avançada e bem-estar",
  // Chamada principal de posicionamento — usada no Hero e em blocos institucionais.
  manifesto:
    "O Espaço Néia reúne várias soluções estéticas em um só lugar, com todo o conforto e as soluções cosméticas e tecnológicas que você merece.",
  // Chamada comercial principal — usada nos CTAs de maior destaque.
  ctaPrimary: "Agende sua avaliação gratuita",

  // URL final de produção (ajuste ao publicar na Vercel)
  url: "https://www.espaconeia.com.br",

  // ----- CONTATO -----
  phoneDisplay: "(11) 99604-5920", // exibido na tela
  whatsappNumber: "5511996045920", // formato internacional, só dígitos (para links wa.me)
  // E-mail: "draft" enquanto não for confirmado pela cliente (só aparece nos previews).
  email: { value: "contato@espaconeia.com.br", status: "draft" as ContentStatus },

  // ----- ENDEREÇO -----
  address: {
    street: "Av. Catarina Etelvina Pedroso, 12",
    district: "Vila São Francisco de Assis",
    city: "Cotia",
    state: "SP",
    zip: "06717-125",
    // Cidades / bairros para SEO local (usados nos textos e no schema)
    serviceAreas: [
      "Cotia",
      "Granja Viana",
      "Vila São Francisco de Assis",
      "Caucaia do Alto",
      "Vargem Grande Paulista",
    ],
  },

  // ----- HORÁRIOS (exibidos e usados no JSON-LD) -----
  hours: [
    { label: "Segunda-feira", value: "13h às 20h", days: ["Monday"], opens: "13:00", closes: "20:00" },
    {
      label: "Terça a sexta",
      value: "9h às 20h",
      days: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    { label: "Sábado", value: "9h às 18h", days: ["Saturday"], opens: "09:00", closes: "18:00" },
    { label: "Domingo", value: "Fechado", days: ["Sunday"], opens: null, closes: null },
  ],

  // ----- REDES SOCIAIS -----
  // Troque `status` para "approved" quando o perfil oficial for confirmado pela cliente.
  social: {
    instagram: {
      url: "https://instagram.com/espaconeia",
      handle: "@espaconeia",
      status: "draft" as ContentStatus,
    },
  },

  // ----- MAPA (Google Maps embed) -----
  // Substitua pela URL de "Incorporar um mapa" do Google Maps do endereço real, se desejar precisão.
  mapEmbedQuery: "Av. Catarina Etelvina Pedroso, 12 - Vila São Francisco de Assis, Cotia - SP, 06717-125",
} as const;

/** Mensagem padrão do WhatsApp. Personalize o texto de abertura aqui. */
export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ?? "Olá! Vim pelo site do Espaço Néia e gostaria de agendar minha avaliação gratuita. 💛",
  );
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

/** E-mail de contato, se puder aparecer no ambiente atual (null enquanto for rascunho em produção). */
export function publicEmail(): string | null {
  return site.email.status === "approved" || showDrafts() ? site.email.value : null;
}

/** Perfil do Instagram, se puder aparecer no ambiente atual. */
export function publicInstagram() {
  const ig = site.social.instagram;
  return ig.status === "approved" || showDrafts() ? ig : null;
}
