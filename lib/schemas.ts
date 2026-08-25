import { z } from "zod";

export const agentIdentitySchema = z.object({
  agentId: z.string().min(3).max(80),
  sessionId: z.string().min(3).max(80),
  role: z.enum(["AI_BUYER", "MERCHANT_REVENUE_AGENT"]),
  budget: z.number().int().positive().max(100000)
});

export const searchSchema = z.object({
  query: z.string().min(2).max(200),
  budget: z.number().int().positive().max(100000).optional(),
  limit: z.number().int().min(1).max(20).default(10)
});

export const offerSchema = z.object({
  agentId: z.string().min(3),
  sessionId: z.string().min(3),
  productIds: z.array(z.string()).min(1).max(8),
  requestedPrice: z.number().int().positive().optional(),
  budget: z.number().int().positive().max(100000)
});

export const cartSchema = z.object({
  agentId: z.string().min(3),
  sessionId: z.string().min(3),
  productIds: z.array(z.string()).min(1).max(20),
  offerId: z.string().optional()
});

export const checkoutSchema = z.object({
  agentId: z.string().min(3),
  sessionId: z.string().min(3),
  cartId: z.string().min(3),
  amount: z.number().int().positive(),
  budget: z.number().int().positive(),
  idempotencyKey: z.string().min(8).max(120)
});

export const createPaymentOrderSchema = z.object({
  agentId: z.string().min(3),
  sessionId: z.string().min(3),
  amount: z.number().int().positive().max(100000),
  budget: z.number().int().positive().max(100000),
  itemIds: z.array(z.string()).min(1).max(20)
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(3),
  razorpay_payment_id: z.string().min(3),
  razorpay_signature: z.string().min(16),
  internalOrderId: z.string().min(3)
});

export const campaignSchema = z.object({
  name: z.string().min(3).max(80),
  productId: z.string(),
  audience: z.string().min(3).max(160),
  discount: z.number().min(0).max(15),
  durationHours: z.number().int().min(1).max(720),
  budget: z.number().int().positive().max(50000)
});
