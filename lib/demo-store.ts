import { initialAudit } from "@/lib/demo-data";
import type { AuditEvent, DemoOrder } from "@/lib/types";

const globalStore = globalThis as unknown as {
  rpayOrders?: Map<string, DemoOrder>;
  rpayAudit?: AuditEvent[];
};

export const orderStore = globalStore.rpayOrders ?? new Map<string, DemoOrder>();
export const auditStore = globalStore.rpayAudit ?? [...initialAudit];
if (process.env.NODE_ENV !== "production") {
  globalStore.rpayOrders = orderStore;
  globalStore.rpayAudit = auditStore;
}

export function appendAudit(event: Omit<AuditEvent, "id" | "timestamp">) {
  const now = new Date();
  const item: AuditEvent = {
    ...event,
    id: `evt_${crypto.randomUUID().slice(0, 8)}`,
    timestamp: now.toLocaleTimeString("en-IN", { hour12: false })
  };
  auditStore.unshift(item);
  return item;
}
