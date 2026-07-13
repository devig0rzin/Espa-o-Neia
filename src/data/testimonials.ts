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
 *  cliente (nome, cidade e texto), e marque `pending: false`.
 * ============================================================
 */

export type Testimonial = {
  name: string;
  city: string;
  text: string;
  pending: boolean; // true = depoimento fictício/demonstrativo, ainda não é real
};

export const testimonials: Testimonial[] = [
  {
    name: "Fernanda Rocha",
    city: "Cotia, SP",
    text: "Me senti acolhida desde a avaliação. A equipe explicou cada etapa do protocolo facial com calma e o ambiente é lindo, super clean. Recomendo demais.",
    pending: true,
  },
  {
    name: "Juliana Prado",
    city: "Granja Viana, SP",
    text: "Fazia tempo que eu procurava um espaço que unisse tecnologia e um atendimento mais humano. No Espaço Néia encontrei as duas coisas — e ainda saio relaxada de cada sessão.",
    pending: true,
  },
  {
    name: "Camila Andrade",
    city: "Cotia, SP",
    text: "O que mais me marcou foi a transparência: me explicaram exatamente o que esperar do protocolo antes de começar. Atendimento impecável do início ao fim.",
    pending: true,
  },
];
