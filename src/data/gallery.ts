/**
 * ============================================================
 *  GALERIA — FOTOS REAIS DE PROCEDIMENTOS
 * ============================================================
 *  Estas são as 3 fotos reais fornecidas para o projeto
 *  (public/images/real/). São registros do tipo "antes e depois".
 *
 *  ⚠️ ATENÇÃO — VALIDAÇÃO REGULATÓRIA NECESSÁRIA:
 *  Publicidade de resultados "antes e depois" de procedimentos
 *  injetáveis (botox, preenchimento) e de saúde estética é
 *  restrita pelo Conselho Federal de Medicina e pela ANVISA no
 *  Brasil, especialmente quando o procedimento é de indicação
 *  médica. Antes de publicar estas imagens, confirme com a
 *  responsável técnica se:
 *   (a) há consentimento de uso de imagem da cliente por escrito;
 *   (b) o formato "antes e depois" pode ser usado publicamente
 *       para os procedimentos em questão, ou se é preciso
 *       adaptar para um formato apenas ilustrativo/institucional.
 *  Até essa validação, as imagens aqui foram enquadradas de forma
 *  discreta (recorte fechado, sem exibir o comparativo completo).
 * ============================================================
 */

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  categorySlug: string;
};

export const galleryReal: GalleryItem[] = [
  {
    src: "/images/real/procedimento-labios-real.png",
    alt: "Registro real de procedimento de harmonização labial realizado no Espaço Néia",
    caption: "Harmonização labial",
    categorySlug: "estetica-facial",
  },
  {
    src: "/images/real/procedimento-testa-botox-real.png",
    alt: "Registro real de procedimento com toxina botulínica (botox) realizado no Espaço Néia",
    caption: "Suavização de linhas de expressão",
    categorySlug: "estetica-facial",
  },
  {
    src: "/images/real/procedimento-gluteo-real.png",
    alt: "Registro real de protocolo de modelagem corporal realizado no Espaço Néia",
    caption: "Modelagem corporal",
    categorySlug: "emagrecimento-e-modelagem-corporal",
  },
];
