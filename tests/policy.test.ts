import { describe, expect, it } from "vitest";
import { evaluatePolicy } from "@/lib/policy-engine";

describe("Policy Engine",()=>{
 it("auto-approves a 10% discount",()=>{const d=evaluatePolicy({action:"CREATE_OFFER",listPrice:1000,offerPrice:900,cost:600});expect(d.allowed).toBe(true);expect(d.status).toBe("AUTO_APPROVED")});
 it("requires approval for a 15% discount",()=>{const d=evaluatePolicy({action:"CREATE_OFFER",listPrice:1000,offerPrice:850,negotiationBasePrice:1000,cost:600});expect(d.allowed).toBe(true);expect(d.status).toBe("REQUIRES_APPROVAL")});
 it("blocks a 20% discount",()=>{const d=evaluatePolicy({action:"CREATE_OFFER",listPrice:1000,offerPrice:800,cost:600});expect(d.allowed).toBe(false);expect(d.status).toBe("BLOCKED")});
 it("blocks an offer below minimum margin",()=>{const d=evaluatePolicy({action:"CREATE_OFFER",listPrice:1000,offerPrice:900,cost:850});expect(d.allowed).toBe(false);expect(d.reason).toMatch(/margin/i)});
});

describe("Agent budget",()=>{
 it("allows ₹4,000 inside ₹5,000",()=>expect(evaluatePolicy({action:"CREATE_ORDER",orderAmount:4000,agentBudget:5000}).allowed).toBe(true));
 it("blocks ₹6,000 against ₹5,000",()=>{const d=evaluatePolicy({action:"CREATE_ORDER",orderAmount:6000,agentBudget:5000});expect(d.allowed).toBe(false);expect(d.reason).toMatch(/spending limit/i)});
});
