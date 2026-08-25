import type { AuditEvent, Product, RevenueOpportunity } from "@/lib/types";

export const merchant = {
  id: "mer_nova_001",
  name: "Nova Electronics",
  currency: "INR",
  environment: "test",
  revenue: 482000,
  aiRevenue: 74200,
  conversion: 4.8,
  aiTransactions: 284,
  pendingApprovals: 3
};

export const products: Product[] = [
  {
    id: "prod_keyboard", merchantId: merchant.id, name: "Mechanical Keyboard", category: "Input", description: "Hot-swappable low-profile keyboard with tactile switches.",
    price: 1999, cost: 1320, stock: 84, conversion: 3.7, conversionDelta: -14, views: 4380, accent: "#E9E5FF", icon: "⌨", tags: ["work from home", "keyboard", "productivity"]
  },
  {
    id: "prod_mouse", merchantId: merchant.id, name: "Wireless Mouse", category: "Input", description: "Silent ergonomic mouse with 90-day battery life.",
    price: 899, cost: 510, stock: 126, conversion: 7.2, conversionDelta: 8, views: 3190, accent: "#E3F7F1", icon: "◉", tags: ["work from home", "mouse", "productivity"]
  },
  {
    id: "prod_stand", merchantId: merchant.id, name: "Laptop Stand", category: "Workspace", description: "Adjustable aluminium stand for better posture and airflow.",
    price: 1299, cost: 760, stock: 43, conversion: 5.9, conversionDelta: 3, views: 2790, accent: "#E7F0FF", icon: "△", tags: ["work from home", "laptop", "ergonomic"]
  },
  {
    id: "prod_hub", merchantId: merchant.id, name: "USB-C Hub", category: "Connectivity", description: "Seven-port hub with HDMI, USB 3 and PD pass-through.",
    price: 1499, cost: 930, stock: 61, conversion: 4.4, conversionDelta: -2, views: 2230, accent: "#FFF0DA", icon: "⌁", tags: ["work from home", "usb-c", "accessory"]
  },
  {
    id: "prod_headphones", merchantId: merchant.id, name: "Noise Cancelling Headphones", category: "Audio", description: "Hybrid ANC headphones with 40-hour play time.",
    price: 2999, cost: 1910, stock: 28, conversion: 3.1, conversionDelta: -9, views: 5420, accent: "#FFE8EC", icon: "◖", tags: ["audio", "travel", "work from home"]
  },
  {
    id: "prod_webcam", merchantId: merchant.id, name: "2K Webcam", category: "Video", description: "Auto-focus webcam with privacy shutter and dual microphones.",
    price: 2499, cost: 1580, stock: 92, conversion: 2.6, conversionDelta: -17, views: 1860, accent: "#E6F6FF", icon: "▣", tags: ["video", "work from home", "meetings"]
  },
  {
    id: "prod_lamp", merchantId: merchant.id, name: "Desk Lamp", category: "Workspace", description: "Flicker-free task light with touch dimming.",
    price: 799, cost: 420, stock: 117, conversion: 6.4, conversionDelta: 4, views: 2410, accent: "#FFF7CE", icon: "◒", tags: ["workspace", "lighting", "work from home"]
  }
];

export const opportunities: RevenueOpportunity[] = [
  {
    id: "opp_bundle_01", rank: 1, title: "Keyboard + Mouse Bundle", description: "Surface the pair at the highest-intent point on keyboard product views.",
    productIds: ["prod_keyboard", "prod_mouse"], type: "BUNDLE", monthlyUplift: 18400, confidence: 87, exposure: 199, risk: "LOW", status: "REQUIRES_APPROVAL",
    signals: ["Keyboard views increased 31%", "Keyboard conversion fell 14%", "Mouse co-purchase rate is 38%", "Bundle margin remains 18%", "Inventory is healthy for 21 days"]
  },
  {
    id: "opp_recovery_02", rank: 2, title: "Abandoned Headphone Recovery", description: "Send a 48-hour recovery offer to high-intent abandoned carts.",
    productIds: ["prod_headphones"], type: "RECOVERY", monthlyUplift: 12700, confidence: 82, exposure: 149, risk: "LOW", status: "READY",
    signals: ["46 high-intent carts abandoned", "Median hesitation time is 19 hours", "Stock is limited but sufficient", "Past recovery acceptance was 22%"]
  },
  {
    id: "opp_cross_03", rank: 3, title: "USB-C Hub Cross-sell", description: "Offer the hub when laptop-stand shoppers mention multi-screen work.",
    productIds: ["prod_stand", "prod_hub"], type: "CROSS_SELL", monthlyUplift: 9200, confidence: 79, exposure: 120, risk: "LOW", status: "READY",
    signals: ["29% of stand buyers later search USB-C", "Hub inventory is healthy", "Combined margin is 35%", "Intent cluster: multi-screen desk"]
  },
  {
    id: "opp_promo_04", rank: 4, title: "Move Slow-selling Webcams", description: "Target remote teams with a capped three-day webcam promotion.",
    productIds: ["prod_webcam"], type: "PROMOTION", monthlyUplift: 7000, confidence: 74, exposure: 249, risk: "MEDIUM", status: "REQUIRES_APPROVAL",
    signals: ["92 units on hand", "Conversion down 17%", "Search impressions stable", "Price sensitivity is above category average"]
  }
];

export const chartData = [
  { month: "Mar", revenue: 398, ai: 31 }, { month: "Apr", revenue: 421, ai: 39 }, { month: "May", revenue: 416, ai: 44 },
  { month: "Jun", revenue: 448, ai: 51 }, { month: "Jul", revenue: 459, ai: 63 }, { month: "Aug", revenue: 482, ai: 74 }
];

export const campaigns = [
  { id: "cmp_01", name: "Headphone Comeback", audience: "High-intent cart abandoners", offer: "₹149 off", budget: 2400, revenue: 11900, status: "ACTIVE", risk: "LOW" },
  { id: "cmp_02", name: "Keyboard Bundle Week", audience: "Keyboard viewers", offer: "₹199 bundle saving", budget: 3000, revenue: 17000, status: "PROPOSED", risk: "LOW" },
  { id: "cmp_03", name: "Webcam Remote Teams", audience: "Returning workspace buyers", offer: "10% off", budget: 5800, revenue: 22100, status: "APPROVAL", risk: "MEDIUM" }
];

export const initialAudit: AuditEvent[] = [
  { id: "evt_001", timestamp: "14:32:01", actor: "buyer-agent-7821", actorType: "AI_BUYER", action: "catalog.discover", summary: "Discovered Nova through Agent Commerce manifest", status: "INFO", metadata: { session: "sess_83921", protocol: "RPay Agent Commerce API" } },
  { id: "evt_002", timestamp: "14:32:04", actor: "merchant-revenue-agent", actorType: "REVENUE_AGENT", action: "offer.generate", summary: "Generated Work From Home bundle", status: "SUCCESS", amount: 4499, metadata: { listPrice: 4996, confidence: 87, items: 4 } },
  { id: "evt_003", timestamp: "14:32:05", actor: "policy-engine", actorType: "POLICY_ENGINE", action: "offer.evaluate", summary: "Initial 9.9% offer auto-approved", status: "SUCCESS", amount: 497, metadata: { policy: "nova-money-v3", maximumDiscount: "15%", decision: "AUTO_APPROVED" } },
  { id: "evt_004", timestamp: "14:32:07", actor: "merchant-admin", actorType: "MERCHANT", action: "offer.approve", summary: "Approved negotiated ₹4,299 offer", status: "SUCCESS", amount: 4299, metadata: { approvalId: "apr_204", totalDiscount: "13.95%" } },
  { id: "evt_005", timestamp: "14:32:08", actor: "payment-service", actorType: "PAYMENT_SERVICE", action: "razorpay.order.create", summary: "Created Razorpay Test Order", status: "SUCCESS", amount: 4299, metadata: { environment: "test", idempotencyKey: "idem_sess_83921_checkout" } },
  { id: "evt_006", timestamp: "14:32:19", actor: "razorpay", actorType: "RAZORPAY", action: "payment.captured", summary: "Test payment received", status: "SUCCESS", amount: 4299, metadata: { provider: "razorpay", mode: "test" } },
  { id: "evt_007", timestamp: "14:32:20", actor: "payment-service", actorType: "PAYMENT_SERVICE", action: "signature.verify", summary: "Payment signature verified server-side", status: "SUCCESS", metadata: { algorithm: "HMAC-SHA256", verified: true } },
  { id: "evt_008", timestamp: "14:32:21", actor: "order-service", actorType: "ORDER_SERVICE", action: "order.confirm", summary: "Order confirmed after verified payment", status: "SUCCESS", amount: 4299, metadata: { orderId: "ord_demo_842", status: "PAID" } }
];

export const orders = [
  { id: "ord_demo_842", customer: "buyer-agent-7821", items: "WFH Bundle · 4 items", amount: 4299, status: "PAID", date: "25 Aug, 14:32", source: "AI Buyer" },
  { id: "ord_1941", customer: "Priya S.", items: "Headphones", amount: 2850, status: "PAID", date: "25 Aug, 13:18", source: "Recovery Agent" },
  { id: "ord_1938", customer: "Arun V.", items: "Keyboard + Mouse", amount: 2699, status: "PAID", date: "25 Aug, 11:42", source: "Bundle Agent" },
  { id: "ord_1931", customer: "buyer-agent-2210", items: "USB-C Hub", amount: 1499, status: "FAILED", date: "24 Aug, 19:06", source: "AI Buyer" }
];
