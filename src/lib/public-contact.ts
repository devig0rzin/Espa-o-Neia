import "server-only";
import { site } from "@/data/site";
import { showDrafts } from "./drafts";

/** E-mail de contato, se puder aparecer no ambiente atual (null enquanto for rascunho em produção). */
export function publicEmail(): string | null {
  return site.email.status === "approved" || showDrafts() ? site.email.value : null;
}

/** Perfil do Instagram, se puder aparecer no ambiente atual. */
export function publicInstagram() {
  const ig = site.social.instagram;
  return ig.status === "approved" || showDrafts() ? ig : null;
}
