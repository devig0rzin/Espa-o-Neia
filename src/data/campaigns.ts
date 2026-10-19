/**
 * ============================================================
 *  CAMPANHAS / PROMOÇÕES — EDITE AQUI (o mais fácil de tudo)
 * ============================================================
 *  Para lançar uma promoção nova: copie um bloco, ajuste os
 *  textos e o preço, e defina `active: true`.
 *  Para tirar do ar: mude para `active: false` (ou apague).
 *  `validUntil` é a data final no formato ANO-MÊS-DIA ("2026-08-31"):
 *  depois desse dia a campanha sai do ar sozinha, sem novo deploy.
 *  Só aparece em produção com `status: "approved"`.
 *
 *  ⚠️ ATENÇÃO: os valores, sessões e datas abaixo são FICTÍCIOS —
 *  preenchidos apenas para a cliente visualizar o protótipo com
 *  aparência comercial completa. NÃO são preços reais. Antes de
 *  publicar, confirme cada valor e condição com a cliente/responsável
 *  técnica e substitua os dados marcados como fictícios.
 * ============================================================
 */

import type { ContentStatus } from "./types";

export type Campaign = {
  id: string;
  active: boolean;
  status: ContentStatus; // "approved" só com preço e condições confirmados
  badge: string; // selo ("Oferta de julho", "Vagas limitadas")
  title: string;
  description: string;
  sessions?: string; // ex.: "Pacote de 10 sessões"
  referencePrice?: string; // preço "de" (riscado)
  currentPrice?: string; // preço "por"
  installment?: string; // ex.: "ou 3x sem juros"
  validUntil?: `${number}-${number}-${number}`; // data final, ISO "AAAA-MM-DD" (o dia inteiro vale)
  availabilityNote?: string; // ex.: "Agenda sujeita à disponibilidade"
  legalNote?: string; // observação legal (texto real, aparece em produção)
  draftNote?: string; // aviso interno de rascunho — aparece só no preview
  highlight?: boolean; // destaque visual
};

export const campaigns: Campaign[] = [
  {
    id: "protocolo-corporal-verao",
    active: true,
    status: "draft",
    badge: "Protocolo em destaque",
    title: "Protocolo Corporal — Criolipólise + Drenagem",
    description:
      "Pacote combinado para contorno corporal e sensação de leveza, com avaliação individual e acompanhamento em todas as sessões.",
    sessions: "Pacote com 6 sessões",
    referencePrice: "R$ 1.800",
    currentPrice: "R$ 1.290",
    installment: "ou 6x de R$ 215 sem juros",
    validUntil: "2026-12-31",
    draftNote: "Valor fictício — confirmar preço final e condições com a responsável técnica.",
    legalNote: "Resultados dependem de avaliação individual.",
    highlight: true,
  },
  {
    id: "facial-vico",
    active: true,
    status: "draft",
    badge: "Cuidado facial",
    title: "Protocolo Facial de Viço",
    description:
      "Sequência de limpeza de pele profunda e hidratação para saúde e aspecto saudável da pele, com orientação de rotina para casa.",
    sessions: "Pacote com 4 sessões",
    referencePrice: "R$ 560",
    currentPrice: "R$ 390",
    installment: "ou 3x de R$ 130 sem juros",
    validUntil: "2026-12-31",
    draftNote: "Valor fictício — confirmar preço final e condições antes da publicação.",
  },
  {
    id: "maos-e-pes",
    active: true,
    status: "draft",
    badge: "Beleza em dia",
    title: "Combo Mãos e Pés",
    description: "Manicure e pedicure no mesmo horário, com banho de pés relaxante e acabamento caprichado.",
    sessions: "Mãos + pés no mesmo atendimento",
    referencePrice: "R$ 95",
    currentPrice: "R$ 80",
    validUntil: "2026-12-31",
    draftNote: "Valor fictício — confirmar preço final antes da publicação.",
  },
  {
    id: "drenagem-pacote",
    active: true,
    status: "draft",
    badge: "Leveza",
    title: "Pacote Drenagem Linfática",
    description:
      "Sessões de drenagem para ajudar na sensação de leveza e no bem-estar, com frequência definida na avaliação.",
    sessions: "Pacote com 10 sessões",
    referencePrice: "R$ 1.200",
    currentPrice: "R$ 950",
    installment: "ou 5x de R$ 190 sem juros",
    validUntil: "2026-12-31",
    draftNote: "Valor fictício — confirmar preço final e condições antes da publicação.",
  },
  {
    id: "dia-de-cuidado",
    active: true,
    status: "draft",
    badge: "Autocuidado",
    title: "Dia de Cuidado Néia",
    description: "Limpeza de pele profunda seguida de massagem relaxante: um momento completo só para você.",
    sessions: "Limpeza de pele + massagem relaxante",
    referencePrice: "R$ 290",
    currentPrice: "R$ 240",
    validUntil: "2026-12-31",
    draftNote: "Valor fictício — confirmar preço final antes da publicação.",
  },
  {
    id: "primeira-avaliacao",
    active: true,
    status: "draft",
    badge: "Para novas clientes",
    title: "Sua primeira avaliação gratuita",
    description:
      "Agende sua avaliação inicial sem custo e conheça o Espaço Néia. Um momento para entender seus objetivos e apresentar as melhores opções para você.",
    sessions: "Avaliação individual",
    currentPrice: "Gratuita",
    availabilityNote: "Agenda sujeita à disponibilidade",
    legalNote: "Avaliação gratuita para novas clientes, mediante agendamento prévio.",
  },
];
