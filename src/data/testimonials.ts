/**
 * ============================================================
 *  DEPOIMENTOS — DADOS FICTÍCIOS PARA APRESENTAÇÃO DO PROTÓTIPO
 * ============================================================
 *  ATENÇÃO: os depoimentos abaixo são FICTÍCIOS, criados apenas
 *  para a cliente visualizar o site com aparência preenchida
 *  durante a apresentação do protótipo. NÃO são depoimentos reais.
 *
 *  Antes da publicação definitiva do site, substitua cada um por
 *  um depoimento real, coletado com autorização/consentimento da
 *  cliente (nome, cidade e texto), e marque `status: "approved"`.
 *  Enquanto houver só rascunhos, a seção não aparece em produção.
 * ============================================================
 */

import type { ContentStatus } from "./types";

export type Testimonial = {
  name: string;
  city: string;
  text: string;
  status: ContentStatus; // "draft" = fictício/demonstrativo, ainda não é real
};

export const testimonials: Testimonial[] = [
  {
    name: "Fernanda Rocha",
    city: "Cotia, SP",
    text: "Me senti acolhida desde a avaliação. A equipe explicou cada etapa do protocolo facial com calma e o ambiente é lindo, super clean. Recomendo demais.",
    status: "draft",
  },
  {
    name: "Juliana Prado",
    city: "Granja Viana, SP",
    text: "Fazia tempo que eu procurava um espaço que unisse tecnologia e um atendimento mais humano. No Espaço Néia encontrei as duas coisas — e ainda saio relaxada de cada sessão.",
    status: "draft",
  },
  {
    name: "Camila Andrade",
    city: "Cotia, SP",
    text: "O que mais me marcou foi a transparência: me explicaram exatamente o que esperar do protocolo antes de começar. Atendimento impecável do início ao fim.",
    status: "draft",
  },
];
