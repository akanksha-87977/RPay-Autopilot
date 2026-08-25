import crypto from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { signDemoPayment, verifyRazorpayPaymentSignature, verifyWebhookSignature } from "@/lib/crypto";
import { consumeWebhook, resetIdempotencyForTests } from "@/lib/idempotency";
import { orderStore } from "@/lib/demo-store";
import { POST as failPayment } from "@/app/api/payments/fail/route";

describe("Payment safety",()=>{
 beforeEach(()=>{resetIdempotencyForTests();orderStore.clear()});
 it("accepts a valid signature",()=>{const sig=signDemoPayment("order_test_1","pay_test_1","secret");expect(verifyRazorpayPaymentSignature("order_test_1","pay_test_1",sig,"secret")).toBe(true)});
 it("rejects an invalid signature",()=>expect(verifyRazorpayPaymentSignature("order_test_1","pay_test_1","0".repeat(64),"secret")).toBe(false));
 it("verifies raw webhook bodies",()=>{const raw=JSON.stringify({id:"evt_1"});const sig=crypto.createHmac("sha256","webhook-secret").update(raw).digest("hex");expect(verifyWebhookSignature(raw,sig,"webhook-secret")).toBe(true)});
 it("ignores a duplicate webhook event",()=>{expect(consumeWebhook("evt_duplicate")).toBe(true);expect(consumeWebhook("evt_duplicate")).toBe(false)});
 it("keeps a failed order unpaid",async()=>{orderStore.set("ord_fail",{id:"ord_fail",amount:4299,status:"PAYMENT_PENDING",itemIds:[],agentId:"buyer-agent-7821",createdAt:new Date().toISOString()});const response=await failPayment(new Request("http://test/api/payments/fail",{method:"POST",body:JSON.stringify({internalOrderId:"ord_fail"})}));expect(response.status).toBe(200);expect(orderStore.get("ord_fail")?.status).toBe("FAILED");expect(orderStore.get("ord_fail")?.status).not.toBe("PAID")});
});
