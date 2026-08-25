import { orderStore } from "@/lib/demo-store";
import { ok, apiError } from "@/lib/api";
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const order=orderStore.get(id);if(!order)return apiError("Order not found",404);const requester=request.headers.get("x-agent-id");if(requester&&requester!==order.agentId)return apiError("Order belongs to another agent",403);return ok({schema:"rpay.agent.order.v1",order:{...order,paid:order.status==="PAID",paymentVerified:order.status==="PAID"}})}
