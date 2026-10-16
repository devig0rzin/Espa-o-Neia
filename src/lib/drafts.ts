import type { ContentStatus } from "@/data/types";

/**
 * Rascunhos aparecem em desenvolvimento e nos previews da Vercel, nunca em produção.
 * Na Vercel decide `VERCEL_ENV`; fora dela (ex.: `next start` local) decide `NODE_ENV`.
 * Use só em Server Components: `VERCEL_ENV` não é exposta ao navegador.
 */
export function showDrafts(env: NodeJS.ProcessEnv = process.env): boolean {
  if (env.VERCEL_ENV) return env.VERCEL_ENV !== "production";
  return env.NODE_ENV !== "production";
}

/** Itens que podem aparecer no ambiente atual. */
export function visible<T extends { status: ContentStatus }>(
  items: readonly T[],
  env: NodeJS.ProcessEnv = process.env,
): T[] {
  return showDrafts(env) ? [...items] : items.filter((item) => item.status === "approved");
}
