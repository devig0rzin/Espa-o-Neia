/**
 * ============================================================
 *  SERVIÇOS E PREÇOS — EDITE AQUI (ou na tabela neia.services do Supabase)
 * ============================================================
 *  Fonte da verdade em produção: banco (Supabase). Este arquivo é o
 *  FALLBACK usado quando o banco não está configurado e no preview.
 *  Mantenha os `id` iguais aos do banco.
 *
 *  ⚠️ PREÇOS ESTIMADOS: referência de mercado para Cotia/Granja Viana,
 *  ainda NÃO confirmados pela Néia. `servicesStatus = "draft"` faz a
 *  página de preços aparecer só em preview. Para publicar, confirme os
 *  valores e troque para "approved".
 * ============================================================
 */
import type { ContentStatus } from "./types";

export type PriceType = "fixo" | "a partir de" | "gratuito";

export type Service = {
  id: string;
  category: string;
  name: string;
  durationMin: number;
  price: number;
  priceType: PriceType;
  /** "avaliacao" = procedimento injetável: marca-se uma avaliação gratuita antes. */
  bookable: "sim" | "avaliacao";
};

export const servicesStatus: ContentStatus = "draft";

export const services: Service[] = [
  { id: "avaliacao-gratuita", category: "Avaliação", name: "Avaliação gratuita", durationMin: 30, price: 0, priceType: "gratuito", bookable: "sim" },
  { id: "limpeza-de-pele", category: "Estética facial", name: "Limpeza de pele profunda", durationMin: 90, price: 180, priceType: "a partir de", bookable: "sim" },
  { id: "micropigmentacao", category: "Estética facial", name: "Micropigmentação de sobrancelhas", durationMin: 150, price: 650, priceType: "a partir de", bookable: "sim" },
  { id: "botox", category: "Estética facial", name: "Botox (por região)", durationMin: 45, price: 900, priceType: "a partir de", bookable: "avaliacao" },
  { id: "preenchimento", category: "Estética facial", name: "Preenchimentos", durationMin: 45, price: 900, priceType: "a partir de", bookable: "avaliacao" },
  { id: "criolipolise", category: "Emagrecimento e modelagem", name: "Criolipólise (por área)", durationMin: 60, price: 650, priceType: "a partir de", bookable: "sim" },
  { id: "lipocavitacao", category: "Emagrecimento e modelagem", name: "Lipocavitação (sessão)", durationMin: 45, price: 140, priceType: "a partir de", bookable: "sim" },
  { id: "ultracavitacao", category: "Emagrecimento e modelagem", name: "Ultracavitação (sessão)", durationMin: 45, price: 130, priceType: "a partir de", bookable: "sim" },
  { id: "drenagem-linfatica", category: "Estética corporal", name: "Drenagem linfática (sessão)", durationMin: 60, price: 120, priceType: "a partir de", bookable: "sim" },
  { id: "massagem-relaxante", category: "Estética corporal", name: "Massagem relaxante", durationMin: 60, price: 110, priceType: "a partir de", bookable: "sim" },
  { id: "manicure", category: "Beleza e cuidados", name: "Manicure", durationMin: 60, price: 45, priceType: "a partir de", bookable: "sim" },
  { id: "pedicure", category: "Beleza e cuidados", name: "Pedicure", durationMin: 60, price: 50, priceType: "a partir de", bookable: "sim" },
  { id: "alongamento-cilios", category: "Beleza e cuidados", name: "Alongamento de cílios", durationMin: 120, price: 160, priceType: "a partir de", bookable: "sim" },
  { id: "corte", category: "Beleza e cuidados", name: "Corte de cabelo", durationMin: 60, price: 90, priceType: "a partir de", bookable: "sim" },
];
