/**
 * ============================================================
 *  IMAGENS DO SITE — EDITE AQUI QUANDO AS FOTOS FICAREM PRONTAS
 * ============================================================
 *  Cada chave abaixo é um "espaço de foto" do layout. Hoje elas
 *  apontam para as fotos em public/images/site/. Para trocar uma foto:
 *
 *  1. Salve o novo arquivo em public/images/site/ com o MESMO nome
 *     (ex.: hero-1.jpg) — pronto, nada mais a mudar; ou
 *  2. Use outro nome e ajuste a linha correspondente abaixo.
 *
 *  Os prompts para gerar cada imagem estão em docs/prompts-imagens.md.
 * ============================================================
 */

const site = (nome: string) => `/images/site/${nome}.jpg`;

export const images = {
  // Banner principal (3 slides) — proporção 4:3
  hero: [site("hero-1"), site("hero-2"), site("hero-3")],

  // Cards "Tratamentos mais procurados" — 4:5
  servicos: {
    "limpeza-de-pele": site("servicos/limpeza-de-pele"),
    micropigmentacao: site("servicos/micropigmentacao"),
    botox: site("servicos/botox"),
    preenchimento: site("servicos/preenchimento"),
    criolipolise: site("servicos/criolipolise"),
    lipocavitacao: site("servicos/lipocavitacao"),
    ultracavitacao: site("servicos/lipocavitacao"),
    "drenagem-linfatica": site("servicos/drenagem-linfatica"),
    "massagem-relaxante": site("servicos/massagem-relaxante"),
    manicure: site("servicos/manicure"),
    pedicure: site("servicos/pedicure"),
    "alongamento-cilios": site("servicos/alongamento-cilios"),
    corte: site("servicos/corte"),
  } as Record<string, string>,
  servicoPadrao: site("servicos/limpeza-de-pele"),

  // Depoimentos (foto ao lado do texto) — 1:1
  depoimentos: site("depoimentos"),

  // Faixa "Agende agora" — 16:9
  bannerAgende: site("banner-agende"),

  // "Sobre": 3 cards com palavra sobreposta — 3:4
  sobre: {
    beleza: site("sobre-beleza"),
    autoestima: site("sobre-autoestima"),
    bemEstar: site("sobre-bem-estar"),
  },

  // Avaliação gratuita (bloco final) — 4:3
  avaliacao: site("avaliacao"),
};
