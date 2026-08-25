import type { PolicyDecision, PolicyIntent } from "@/lib/types";

const POLICY_VERSION = "nova-money-v3";
const MAX_DISCOUNT_PERCENT = 15;
const AUTO_DISCOUNT_PERCENT = 10;
const MAX_NEGOTIATION_DISCOUNT = 500;
const MINIMUM_MARGIN_PERCENT = 12;

export function evaluatePolicy(intent: PolicyIntent): PolicyDecision {
  const checks: PolicyDecision["checks"] = [];
  let blockedReason = "";
  let approvalReason = "";
  let exposure = 0;

  if (intent.action === "CREATE_OFFER") {
    const list = intent.listPrice ?? 0;
    const offer = intent.offerPrice ?? list;
    const discount = Math.max(0, list - offer);
    const negotiationDiscount = Math.max(0, (intent.negotiationBasePrice ?? list) - offer);
    const discountPercent = list > 0 ? (discount / list) * 100 : 0;
    const marginPercent = offer > 0 && intent.cost != null ? ((offer - intent.cost) / offer) * 100 : 100;
    exposure = discount;

    checks.push({ rule: "discount.max", passed: discountPercent <= MAX_DISCOUNT_PERCENT, detail: `${discountPercent.toFixed(1)}% ≤ ${MAX_DISCOUNT_PERCENT}%` });
    checks.push({ rule: "negotiation.exposure", passed: negotiationDiscount <= MAX_NEGOTIATION_DISCOUNT, detail: `₹${negotiationDiscount.toLocaleString("en-IN")} ≤ ₹${MAX_NEGOTIATION_DISCOUNT}` });
    checks.push({ rule: "margin.minimum", passed: marginPercent >= (intent.minimumMarginPercent ?? MINIMUM_MARGIN_PERCENT), detail: `${marginPercent.toFixed(1)}% margin ≥ ${intent.minimumMarginPercent ?? MINIMUM_MARGIN_PERCENT}%` });

    if (discountPercent > MAX_DISCOUNT_PERCENT) blockedReason = `Discount ${discountPercent.toFixed(1)}% exceeds the hard 15% limit.`;
    else if (negotiationDiscount > MAX_NEGOTIATION_DISCOUNT) blockedReason = `₹${negotiationDiscount} negotiated reduction exceeds the ₹500 negotiation limit.`;
    else if (marginPercent < (intent.minimumMarginPercent ?? MINIMUM_MARGIN_PERCENT)) blockedReason = `Offer would reduce margin below ${intent.minimumMarginPercent ?? MINIMUM_MARGIN_PERCENT}%.`;
    else if (discountPercent > AUTO_DISCOUNT_PERCENT) approvalReason = `Discount ${discountPercent.toFixed(1)}% is within policy but above the 10% auto-approval threshold.`;
  }

  if (intent.action === "CREATE_ORDER") {
    const amount = intent.orderAmount ?? 0;
    exposure = amount;
    const withinBudget = intent.agentBudget == null || amount <= intent.agentBudget;
    checks.push({ rule: "agent.spend_limit", passed: withinBudget, detail: `₹${amount.toLocaleString("en-IN")} ${withinBudget ? "≤" : ">"} ₹${(intent.agentBudget ?? amount).toLocaleString("en-IN")}` });
    checks.push({ rule: "order.human_threshold", passed: true, detail: amount < 10000 ? "Below ₹10,000" : "₹10,000+ requires approval" });
    if (!withinBudget) blockedReason = "Transaction exceeds the AI buyer's authorized spending limit. No payment was initiated.";
    else if (amount >= 10000) approvalReason = "Orders of ₹10,000 or more require merchant approval.";
  }

  if (intent.action === "CREATE_CAMPAIGN") {
    const budget = intent.campaignBudget ?? 0;
    exposure = budget;
    checks.push({ rule: "campaign.budget", passed: true, detail: budget <= 5000 ? "Within ₹5,000 autonomous budget" : "Above ₹5,000; approval required" });
    if (budget > 5000) approvalReason = "Campaign budget exceeds ₹5,000 and requires merchant approval.";
  }

  if (intent.action === "REFUND") {
    exposure = intent.orderAmount ?? 0;
    checks.push({ rule: "refund.approval", passed: true, detail: "Refunds always require human approval" });
    approvalReason = "Refunds are never autonomous.";
  }

  if (blockedReason) {
    return { allowed: false, status: "BLOCKED", reason: blockedReason, requiresApproval: false, financialExposure: exposure, checks, policyVersion: POLICY_VERSION };
  }
  if (approvalReason) {
    return { allowed: true, status: "REQUIRES_APPROVAL", reason: approvalReason, requiresApproval: true, financialExposure: exposure, checks, policyVersion: POLICY_VERSION };
  }
  return { allowed: true, status: "AUTO_APPROVED", reason: "All financial controls passed within autonomous limits.", requiresApproval: false, financialExposure: exposure, checks, policyVersion: POLICY_VERSION };
}
