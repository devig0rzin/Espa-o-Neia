/**
 * ============================================================
 *  FAQ GERAL — EDITE AQUI
 * ============================================================
 *  Perguntas usadas na página /faq e no bloco de FAQ da Home.
 *  Também alimentam o schema FAQPage (SEO).
 *
 *  Nota: a resposta sobre "formas de pagamento" traz condições
 *  fictícias (exemplo realista) para o protótipo — confirme as
 *  formas de pagamento e parcelamento realmente aceitas antes
 *  da publicação.
 * ============================================================
 */

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Como funciona a avaliação?",
    answer:
      "A avaliação é o primeiro passo da sua jornada no Espaço Néia. Nela, entendemos seus objetivos, seu histórico e suas expectativas para então indicar os protocolos mais adequados a você. É um momento de conversa, cuidado e transparência.",
  },
  {
    question: "Como faço para agendar?",
    answer:
      "O agendamento é simples: clique em qualquer botão de WhatsApp do site ou ligue para (11) 99604-5920. Nossa equipe encontra o melhor horário para você.",
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Aceitamos Pix, cartão de crédito e débito, além de dinheiro. Pacotes de sessões podem ser parcelados em até 6x no cartão, conforme a condição vigente apresentada durante a avaliação.",
  },
  {
    question: "Com que frequência devo fazer os tratamentos?",
    answer:
      "A frequência ideal depende do seu objetivo e do protocolo indicado. Após a avaliação, montamos um plano com uma frequência realista e adequada ao seu momento.",
  },
  {
    question: "Quais serviços têm indicação profissional específica?",
    answer:
      "Alguns procedimentos, especialmente os injetáveis e especializados, possuem indicação e execução restritas a profissionais habilitados. Por isso, a avaliação individual é sempre necessária antes de qualquer procedimento desse tipo.",
  },
  {
    question: "Como são os cuidados e o atendimento?",
    answer:
      "Prezamos por um atendimento acolhedor, discreto e atencioso, em um ambiente clean e confortável. Cada cliente é tratada de forma individual, com respeito ao seu tempo e às suas necessidades.",
  },
  {
    question: "O Espaço Néia atende Cotia e Granja Viana?",
    answer:
      "Sim. Estamos localizados na Vila São Francisco de Assis, em Cotia, e atendemos clientes de Cotia, Granja Viana e região. Consulte a página de contato para instruções de chegada.",
  },
];
