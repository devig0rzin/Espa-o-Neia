import "server-only";

/**
 * Chama funções públicas (RPC) do Supabase pelo servidor do Next.
 * As tabelas do agendamento ficam num schema não exposto (neia); só as
 * funções neia_* são acessíveis, e cada uma valida tudo no banco.
 */
export function bookingBackendConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
}

export async function rpc<T>(fn: string, args: Record<string, unknown>, revalidate?: number): Promise<T> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("backend_not_configured");
  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    ...(revalidate ? { next: { revalidate } } : { cache: "no-store" as const }),
  });
  if (!res.ok) throw new Error(`rpc_${fn}_${res.status}`);
  return (await res.json()) as T;
}
