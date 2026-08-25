import { ZodError } from "zod";
import { cartSchema } from "@/lib/schemas";
import { products } from "@/lib/demo-data";
import { cartStore, offerStore } from "@/lib/agent-store";
import { ok, apiError, zodError } from "@/lib/api";
import { authorizeAgentRequest } from "@/lib/agent-auth";
export async function POST(request:Request){try{const body=cartSchema.parse(await request.json());if(!authorizeAgentRequest(request,body.agentId))return apiError("Agent authentication required",401);if(body.productIds.some(id=>!products.some(p=>p.id===id)))return apiError("Invalid cart item",422);if(body.offerId){const offer=offerStore.get(body.offerId);if(!offer||offer.agentId!==body.agentId)return apiError("Offer is missing or belongs to another agent",403)}const id=`cart_${crypto.randomUUID().slice(0,8)}`;const cart={id,agentId:body.agentId,sessionId:body.sessionId,productIds:body.productIds,offerId:body.offerId,status:"ACTIVE" as const,createdAt:new Date().toISOString()};cartStore.set(id,cart);return ok({schema:"rpay.agent.cart.v1",cart})}catch(e){if(e instanceof ZodError)return zodError(e);return apiError("Cart creation failed",500)}}
