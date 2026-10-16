/**
 * Status de publicação de qualquer conteúdo em src/data.
 *  - "draft": rascunho/fictício/pendente de validação — aparece só em
 *    desenvolvimento e nos links de preview da Vercel, NUNCA em produção.
 *  - "approved": dado real e confirmado — aparece em todos os ambientes.
 * Para publicar um item, troque `status: "draft"` por `status: "approved"`.
 */
export type ContentStatus = "draft" | "approved";
