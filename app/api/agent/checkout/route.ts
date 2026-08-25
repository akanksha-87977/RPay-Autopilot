import { ZodError } from "zod";
import { checkoutSchema } from "@/lib/schemas";
import { cartStore } from "@/lib/agent-store";
import { evaluatePolicy } from "@/lib/policy-engine";
import { getIdempotent, setIdempotent } from "@/lib/idempotency";
import { ok, apiError, zodError } from "@/lib/api";
import { authorizeAgentRequest } from "@/lib/agent-auth";
export async function POST(request:Request){try{const body=checkoutSchema.parse(await request.json());if(!authorizeAgentRequest(request,body.agentId))return apiError("Agent authentication required",401);const cached=getIdempotent<unknown>(`agent-checkout:${body.idempotencyKey}`);if(cached)return ok({...cached as object,idempotentReplay:true});const cart=cartStore.get(body.cartId);if(!cart||cart.agentId!==body.agentId)return apiError("Cart not found for this agent",404);const decision=evaluatePolicy({action:"CREATE_ORDER",orderAmount:body.amount,agentBudget:body.budget});if(!decision.allowed)return ok({schema:"rpay.agent.checkout.v1",status:"BLOCKED",paymentInitiated:false,decision});cart.status="CHECKOUT";const result={schema:"rpay.agent.checkout.v1",status:decision.requiresApproval?"PENDING_APPROVAL":"READY_FOR_PAYMENT",amount:body.amount,currency:"INR",amountLocked:true,paymentInitiated:false,decision};setIdempotent(`agent-checkout:${body.idempotencyKey}`,result);return ok(result)}catch(e){if(e instanceof ZodError)return zodError(e);return apiError("Checkout failed safely",500)}}
