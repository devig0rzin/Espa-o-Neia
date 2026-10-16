import type { Campaign } from "@/data/campaigns";
import { visible } from "./drafts";

// Brasília é UTC−3 o ano todo (sem horário de verão desde 2019).
const BRASILIA_OFFSET = "-03:00";

/** Campanha ativa e dentro da validade (o último dia vale inteiro, no horário de Brasília). */
export function isCampaignLive(c: Campaign, now: Date): boolean {
  if (!c.active) return false;
  if (!c.validUntil) return true;
  const end = new Date(`${c.validUntil}T23:59:59.999${BRASILIA_OFFSET}`);
  return now.getTime() <= end.getTime();
}

/** Campanhas que podem aparecer agora: vigentes e, em produção, só as aprovadas. */
export function liveCampaigns(
  list: readonly Campaign[],
  now: Date = new Date(),
  env: NodeJS.ProcessEnv = process.env,
): Campaign[] {
  return visible(list, env).filter((c) => isCampaignLive(c, now));
}

/** "2026-08-31" → "31/08/2026". */
export function formatDateBR(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}
