/** Limite simples por IP em memória (por instância). Defesa leve contra spam; o banco também valida. */
const hits = new Map<string, number[]>();

export function allow(key: string, max = 6, windowMs = 10 * 60 * 1000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
