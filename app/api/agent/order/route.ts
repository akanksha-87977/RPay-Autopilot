import { orderStore } from "@/lib/demo-store";
import { ok } from "@/lib/api";
export async function GET(request:Request){const agentId=new URL(request.url).searchParams.get("agent_id");const orders=[...orderStore.values()].filter(o=>!agentId||o.agentId===agentId);return ok({schema:"rpay.agent.orders.v1",orders})}
