export type Risk = "LOW" | "MEDIUM" | "HIGH";
export type DecisionStatus = "AUTO_APPROVED" | "REQUIRES_APPROVAL" | "BLOCKED";

export type Product = {
  id: string;
  merchantId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  conversion: number;
  conversionDelta: number;
  views: number;
  accent: string;
  icon: string;
  tags: string[];
};

export type RevenueOpportunity = {
  id: string;
  rank: number;
  title: string;
  description: string;
  productIds: string[];
  type: "BUNDLE" | "RECOVERY" | "CROSS_SELL" | "PROMOTION";
  monthlyUplift: number;
  confidence: number;
  exposure: number;
  risk: Risk;
  status: "READY" | "REQUIRES_APPROVAL" | "ACTIVE";
  signals: string[];
};

export type PolicyIntent = {
  action: "CREATE_OFFER" | "CREATE_ORDER" | "CREATE_CAMPAIGN" | "REFUND";
  listPrice?: number;
  offerPrice?: number;
  negotiationBasePrice?: number;
  orderAmount?: number;
  campaignBudget?: number;
  agentBudget?: number;
  minimumMarginPercent?: number;
  cost?: number;
};

export type PolicyDecision = {
  allowed: boolean;
  status: DecisionStatus;
  reason: string;
  requiresApproval: boolean;
  financialExposure: number;
  checks: Array<{ rule: string; passed: boolean; detail: string }>;
  policyVersion: string;
};

export type AuditEvent = {
  id: string;
  timestamp: string;
  actor: string;
  actorType: "AI_BUYER" | "REVENUE_AGENT" | "POLICY_ENGINE" | "MERCHANT" | "PAYMENT_SERVICE" | "RAZORPAY" | "ORDER_SERVICE" | "SYSTEM";
  action: string;
  summary: string;
  status: "INFO" | "SUCCESS" | "WARNING" | "FAILED";
  amount?: number;
  metadata: Record<string, string | number | boolean>;
};

export type DemoOrder = {
  id: string;
  razorpayOrderId?: string;
  amount: number;
  status: "CREATED" | "PAYMENT_PENDING" | "PAID" | "FAILED";
  itemIds: string[];
  agentId: string;
  paymentId?: string;
  createdAt: string;
};
