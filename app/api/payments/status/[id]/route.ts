import { orderStore } from "@/lib/demo-store";
import { ok, apiError } from "@/lib/api";
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const order=orderStore.get(id);if(!order)return apiError("Order not found",404);return ok({orderId:order.id,status:order.status,paid:order.status==="PAID",paymentVerified:order.status==="PAID",amount:order.amount,currency:"INR"})}
