/**
 * ============================================================
 *  CATEGORIAS DE TRATAMENTO — EDITE AQUI
 * ============================================================
 *  Cada objeto abaixo gera automaticamente:
 *   - um card na Home e na página /servicos
 *   - uma página interna completa em /servicos/[slug]
 *
 *  Para adicionar uma nova categoria, copie um bloco e ajuste.
 *  Procedimentos com `regulated: true` exibem um selo "Indicação
 *  profissional" — use para injetáveis e procedimentos que exigem
 *  execução por profissional habilitado (botox, preenchimentos,
 *  enzimas, ozonioterapia, escleroterapia etc.), conforme a
 *  regulamentação vigente. Nenhum resultado clínico, promessa ou
 *  certificado deve ser inventado — descreva de forma factual.
 * ============================================================
 */

export type Category = {
  slug: string;
  eyebrow: string;
  name: string;
  shortDescription: string; // usado em cards
  heroTitle: string;
  heroSubtitle: string;
  // Imagem ilustrativa (gerada por IA, ver public/images/ilustrativas/) usada no hero da categoria.
  // Quando ausente, a página exibe um placeholder elegante até a foto real da clínica ser inserida.
  heroImage?: string;
  // Dores/desejos que a categoria atende
  desires: string[];
  // Procedimentos oferecidos (factual, sem promessa de resultado)
  procedures: { name: string; description: string; regulated?: boolean }[];
  differentials: string[];
  faq: { question: string; answer: string }[];
  // Aviso regulatório opcional (categoria com procedimentos injetáveis/especializados)
  regulatoryNote?: string;
};

export const categories: Category[] = [
  {
    slug: "emagrecimento-e-modelagem-corporal",
    eyebrow: "Corpo em equilíbrio",
    name: "Emagrecimento e modelagem corporal",
    shortDescription:
      "Criolipólise, lipocavitação, ultracavitação e outros protocolos de contorno corporal, a partir de avaliação individual.",
    heroTitle: "Emagrecimento e modelagem corporal com acompanhamento próximo",
    heroSubtitle:
      "Cada corpo tem uma história. Desenhamos protocolos personalizados que unem tecnologia estética e técnica — com metas realistas e cuidado em cada sessão.",
    heroImage: "/images/site/servicos/criolipolise.jpg",
    desires: [
      "Reduzir medidas e trabalhar a modelagem do contorno corporal",
      "Suavizar a aparência de gordura localizada em áreas específicas",
      "Melhorar o aspecto da papada e do contorno do rosto",
      "Sentir-se mais confortável e confiante com o próprio corpo",
    ],
    procedures: [
      {
        name: "Criolipólise",
        description:
          "Tecnologia que atua sobre a gordura localizada em áreas específicas, conforme avaliação individual.",
      },
      {
        name: "Lipocavitação",
        description: "Técnica estética voltada à redução de medidas e ao contorno corporal.",
      },
      {
        name: "Ultracavitação",
        description: "Tecnologia aplicada ao contorno corporal, indicada conforme avaliação.",
      },
      {
        name: "Ultrassom estético",
        description: "Recurso tecnológico utilizado em protocolos de modelagem corporal.",
      },
      {
        name: "Enzimas",
        description: "Aplicação injetável utilizada em protocolos de contorno corporal.",
        regulated: true,
      },
      {
        name: "Lipo de papada",
        description: "Procedimento voltado à região do queixo e papada, mediante avaliação individual.",
        regulated: true,
      },
    ],
    differentials: [
      "Protocolos personalizados, nunca padronizados",
      "Metas realistas e comunicação transparente",
      "Tecnologia estética aliada à técnica humana",
    ],
    faq: [
      {
        question: "Preciso de avaliação antes de começar?",
        answer:
          "Sim. Toda jornada começa por uma avaliação individual, para que o protocolo seja desenhado de acordo com o seu objetivo e o seu momento.",
      },
      {
        question: "Em quantas sessões vejo diferença?",
        answer:
          "A frequência e a quantidade de sessões variam de pessoa para pessoa. Na avaliação explicamos, com transparência, o que esperar do seu protocolo.",
      },
    ],
    regulatoryNote:
      "Enzimas e lipo de papada envolvem aplicação injetável e possuem indicação e execução restritas a profissional habilitado, conforme avaliação individual e regulamentação vigente.",
  },
  {
    slug: "estetica-facial",
    eyebrow: "Rosto viçoso",
    name: "Estética facial",
    shortDescription:
      "Limpeza de pele, micropigmentação, botox e preenchimentos, com protocolos sob medida e avaliação individual.",
    heroTitle: "Estética facial para uma pele cuidada e natural",
    heroSubtitle:
      "Do cuidado de rotina aos procedimentos especializados, cuidamos da sua pele com técnica e delicadeza — valorizando seus traços com naturalidade.",
    heroImage: "/images/site/servicos/limpeza-de-pele.jpg",
    desires: [
      "Melhorar viço, textura e limpeza da pele",
      "Realçar o desenho das sobrancelhas com micropigmentação",
      "Suavizar linhas de expressão e sulcos faciais",
      "Cuidar da pele de forma preventiva e contínua",
    ],
    procedures: [
      {
        name: "Limpeza de pele profunda",
        description: "Higienização e cuidado da pele com protocolo adequado ao seu tipo de pele.",
      },
      {
        name: "Micropigmentação",
        description: "Técnica para desenho e preenchimento visual de sobrancelhas, conforme avaliação.",
      },
      {
        name: "Botox",
        description:
          "Aplicação injetável para suavização de linhas de expressão, mediante avaliação individual.",
        regulated: true,
      },
      {
        name: "Preenchimentos",
        description:
          "Procedimento injetável para harmonização de contornos faciais, mediante avaliação individual.",
        regulated: true,
      },
    ],
    differentials: [
      "Protocolos adaptados ao seu tipo de pele",
      "Foco em naturalidade, não em exageros",
      "Avaliação individual antes de qualquer procedimento",
    ],
    faq: [
      {
        question: "Qualquer pele pode fazer limpeza de pele?",
        answer:
          "Cada pele é avaliada individualmente. Alguns protocolos têm indicação específica — por isso a avaliação é sempre o primeiro passo.",
      },
      {
        question: "Botox e preenchimento têm indicação profissional?",
        answer:
          "Sim. São procedimentos injetáveis com indicação e execução restritas a profissional habilitado, sempre precedidos de avaliação individual.",
      },
    ],
    regulatoryNote:
      "Botox e preenchimentos são procedimentos injetáveis com indicação e execução restritas a profissional habilitado, conforme avaliação individual e regulamentação vigente.",
  },
  {
    slug: "estetica-corporal",
    eyebrow: "Pele e corpo",
    name: "Estética corporal",
    shortDescription:
      "Drenagem linfática, massagens relaxantes, ozonioterapia e cuidados que valorizam a sua rotina de bem-estar.",
    heroTitle: "Estética corporal com cuidado do começo ao fim",
    heroSubtitle:
      "Cuidados para a pele e o bem-estar do corpo, pensados para se encaixar na sua rotina com conforto e resultado percebido com naturalidade.",
    heroImage: "/images/site/servicos/massagem-relaxante.jpg",
    desires: [
      "Aliviar a sensação de inchaço e retenção",
      "Momentos de relaxamento e bem-estar",
      "Apoiar a recuperação em períodos pré e pós-cirúrgicos",
      "Cuidar da circulação e do aspecto de vasinhos",
    ],
    procedures: [
      {
        name: "Drenagem linfática",
        description: "Técnica manual voltada ao conforto e à sensação de leveza.",
      },
      { name: "Massagens relaxantes", description: "Cuidado para o bem-estar físico e mental." },
      {
        name: "Massagens pré e pós-cirúrgicas",
        description: "Protocolo de apoio conforme orientação e avaliação individual.",
      },
      {
        name: "Ozonioterapia",
        description: "Procedimento estético aplicado conforme avaliação e indicação profissional.",
        regulated: true,
      },
      {
        name: "Aplicação de vasinhos",
        description: "Procedimento voltado ao aspecto de vasinhos, mediante avaliação individual.",
        regulated: true,
      },
    ],
    differentials: [
      "Ambiente relaxante e acolhedor",
      "Protocolos que respeitam o seu tempo",
      "Atenção aos detalhes em cada sessão",
    ],
    faq: [
      {
        question: "Consigo combinar com outros tratamentos?",
        answer:
          "Sim. Muitos cuidados podem ser combinados. Na avaliação montamos o protocolo ideal para o seu objetivo.",
      },
      {
        question: "Ozonioterapia e aplicação de vasinhos têm indicação profissional?",
        answer:
          "Sim, são procedimentos com indicação e execução restritas a profissional habilitado, sempre após avaliação individual.",
      },
    ],
    regulatoryNote:
      "Ozonioterapia e aplicação de vasinhos possuem indicação e execução restritas a profissional habilitado, conforme avaliação individual e regulamentação vigente.",
  },
  {
    slug: "beleza-e-cuidados",
    eyebrow: "Beleza do dia a dia",
    name: "Beleza e cuidados tradicionais",
    shortDescription:
      "Manicure, pedicure, corte, coloração e alongamento de cílios com o mesmo padrão de excelência da clínica.",
    heroTitle: "Beleza e cuidados tradicionais com padrão de clínica",
    heroSubtitle:
      "Os cuidados de beleza do dia a dia merecem o mesmo carinho e atenção aos detalhes dos nossos protocolos avançados.",
    heroImage: "/images/site/servicos/manicure.jpg",
    desires: [
      "Manter unhas e mãos sempre bem cuidadas",
      "Renovar o visual com corte e coloração",
      "Realçar o olhar com alongamento de cílios",
      "Ser atendida com técnica e higiene impecável",
    ],
    procedures: [
      { name: "Manicure", description: "Cuidado completo para unhas e mãos, com técnica e higiene." },
      { name: "Pedicure", description: "Cuidado completo para unhas e pés, com técnica e higiene." },
      { name: "Corte", description: "Corte de cabelo personalizado ao seu estilo." },
      { name: "Coloração", description: "Coloração capilar com técnica profissional." },
      { name: "Alongamento de cílios", description: "Técnica para realçar e valorizar o olhar." },
    ],
    differentials: [
      "Padrão de higiene e cuidado profissional",
      "Atenção ao formato e à naturalidade",
      "Ambiente elegante e reservado",
    ],
    faq: [
      {
        question: "Preciso agendar com antecedência?",
        answer:
          "Recomendamos o agendamento para garantir o melhor horário para você. Fale conosco pelo WhatsApp.",
      },
    ],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

/** Todos os procedimentos, "achatados", com a categoria de origem — usado na Home e na busca visual da página de Serviços. */
export function allProcedures() {
  return categories.flatMap((c) =>
    c.procedures.map((p) => ({ ...p, categorySlug: c.slug, categoryName: c.name })),
  );
}
