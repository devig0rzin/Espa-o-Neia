import "server-only";
import { services as fallback, servicesStatus, type Service } from "@/data/services";
import { bookingBackendConfigured, rpc } from "@/lib/supabase-rpc";
import { showDrafts } from "@/lib/drafts";

type DbService = Omit<Service, "bookable"> & { bookable: string };

/** Serviços do banco (fonte da verdade); se indisponível, usa o fallback local. */
export async function getServices(): Promise<Service[]> {
  if (!bookingBackendConfigured()) return fallback;
  try {
    const rows = await rpc<DbService[]>("neia_services", {}, 60);
    return rows.map((r) => ({ ...r, bookable: r.bookable === "avaliacao" ? "avaliacao" : "sim" }));
  } catch {
    return fallback;
  }
}

/** Preços só aparecem quando aprovados — ou em preview/desenvolvimento. */
export function canShowPrices(env: NodeJS.ProcessEnv = process.env): boolean {
  return servicesStatus === "approved" || showDrafts(env);
}
