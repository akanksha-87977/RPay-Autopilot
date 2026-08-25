import { beforeEach, describe, expect, it } from "vitest";
import { POST as createOffer } from "@/app/api/agent/offer/route";
import { POST as createCart } from "@/app/api/agent/cart/route";
import { POST as checkout } from "@/app/api/agent/checkout/route";
import { resetIdempotencyForTests } from "@/lib/idempotency";

describe("Agent commerce flow",()=>{
 beforeEach(()=>resetIdempotencyForTests());
 it("creates the bounded ₹4,299 WFH counter-offer",async()=>{const response=await createOffer(jsonRequest("/api/agent/offer",{agentId:"buyer-agent-7821",sessionId:"sess_83921",productIds:["prod_keyboard","prod_mouse","prod_stand","prod_lamp"],requestedPrice:4200,budget:5000}));const body=await response.json();expect(body.data.offerPrice).toBe(4299);expect(body.data.decision.allowed).toBe(true);expect(body.data.approvalId).toBe("apr_204")});
 it("creates a cart and validates checkout",async()=>{const cartResponse=await createCart(jsonRequest("/api/agent/cart",{agentId:"buyer-agent-7821",sessionId:"sess_83921",productIds:["prod_keyboard"]}));const cartBody=await cartResponse.json();const checkoutResponse=await checkout(jsonRequest("/api/agent/checkout",{agentId:"buyer-agent-7821",sessionId:"sess_83921",cartId:cartBody.data.cart.id,amount:1999,budget:5000,idempotencyKey:"idem-agent-test-1"}));const checkoutBody=await checkoutResponse.json();expect(checkoutBody.data.status).toBe("READY_FOR_PAYMENT");expect(checkoutBody.data.amountLocked).toBe(true)});
 it("blocks checkout over the agent budget before payment",async()=>{const cartResponse=await createCart(jsonRequest("/api/agent/cart",{agentId:"buyer-agent-7821",sessionId:"sess_83921",productIds:["prod_headphones"]}));const cartBody=await cartResponse.json();const response=await checkout(jsonRequest("/api/agent/checkout",{agentId:"buyer-agent-7821",sessionId:"sess_83921",cartId:cartBody.data.cart.id,amount:6000,budget:5000,idempotencyKey:"idem-agent-test-2"}));const body=await response.json();expect(body.data.status).toBe("BLOCKED");expect(body.data.paymentInitiated).toBe(false)});
});
function jsonRequest(path:string,body:unknown){return new Request(`http://test${path}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)})}
