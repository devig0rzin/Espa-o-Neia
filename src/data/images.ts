/**
 * ============================================================
 *  IMAGENS DO SITE — EDITE AQUI QUANDO AS FOTOS FICAREM PRONTAS
 * ============================================================
 *  Cada chave abaixo é um "espaço de foto" do layout. Hoje elas
 *  apontam para as ilustrações provisórias. Quando as imagens
 *  geradas (ChatGPT) ficarem prontas:
 *
 *  1. Salve o arquivo em public/images/site/ com o nome sugerido
 *     no comentário de cada linha (ex.: hero-1.jpg)
 *  2. Troque o caminho da linha correspondente.
 *
 *  Os prompts para gerar cada imagem estão em docs/prompts-imagens.md.
 * ============================================================
 */

const ilustr = {
  facial: "/images/ilustrativas/cuidado-facial-gotas.png",
  corpo: "/images/ilustrativas/massagem-corporal.png",
  sobrancelha: "/images/ilustrativas/micropigmentacao-sobrancelha.png",
  maos: "/images/ilustrativas/spa-pedicure-manicure.png",
  testa: "/images/real/procedimento-testa-botox-real.png",
  labios: "/images/real/procedimento-labios-real.png",
  gluteo: "/images/real/procedimento-gluteo-real.png",
};

export const images = {
  // Banner principal (3 slides) — proporção 4:3, ex.: hero-1.jpg, hero-2.jpg, hero-3.jpg
  hero: [ilustr.facial, ilustr.corpo, ilustr.maos],

  // Cards "Tratamentos mais procurados" — 4:5, ex.: servicos/limpeza-de-pele.jpg
  servicos: {
    "limpeza-de-pele": ilustr.facial,
    micropigmentacao: ilustr.sobrancelha,
    botox: ilustr.testa,
    preenchimento: ilustr.labios,
    criolipolise: ilustr.gluteo,
    lipocavitacao: ilustr.corpo,
    ultracavitacao: ilustr.corpo,
    "drenagem-linfatica": ilustr.corpo,
    "massagem-relaxante": ilustr.corpo,
    manicure: ilustr.maos,
    pedicure: ilustr.maos,
    "alongamento-cilios": ilustr.sobrancelha,
    corte: ilustr.facial,
  } as Record<string, string>,
  servicoPadrao: ilustr.facial,

  // Depoimentos (foto ao lado do texto) — 1:1, ex.: depoimentos.jpg
  depoimentos: ilustr.facial,

  // Faixa "Agende agora" — 16:9, ex.: banner-agende.jpg
  bannerAgende: ilustr.corpo,

  // "Sobre": 3 cards com palavra sobreposta — 3:4, ex.: sobre-beleza.jpg etc.
  sobre: {
    beleza: ilustr.facial,
    autoestima: ilustr.sobrancelha,
    bemEstar: ilustr.maos,
  },

  // Avaliação gratuita (bloco final) — 4:3, ex.: avaliacao.jpg
  avaliacao: ilustr.facial,
};
