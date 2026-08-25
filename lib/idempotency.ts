type Entry<T> = { value: T; expiresAt: number };
const entries = new Map<string, Entry<unknown>>();
const webhookIds = new Set<string>();

export function getIdempotent<T>(key: string): T | undefined {
  const found = entries.get(key);
  if (!found) return undefined;
  if (found.expiresAt < Date.now()) { entries.delete(key); return undefined; }
  return found.value as T;
}

export function setIdempotent<T>(key: string, value: T, ttlMs = 24 * 60 * 60 * 1000) {
  entries.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function consumeWebhook(eventId: string) {
  if (webhookIds.has(eventId)) return false;
  webhookIds.add(eventId);
  return true;
}

export function resetIdempotencyForTests() {
  entries.clear();
  webhookIds.clear();
}
