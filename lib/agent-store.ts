type OfferRecord = { id: string; agentId: string; productIds: string[]; listPrice: number; offerPrice: number; status: string; approvalId?: string };
type CartRecord = { id: string; agentId: string; sessionId: string; productIds: string[]; offerId?: string; status: "ACTIVE" | "CHECKOUT" | "CONVERTED"; createdAt: string };
const globalAgentStore=globalThis as unknown as { rpayOffers?:Map<string,OfferRecord>; rpayCarts?:Map<string,CartRecord> };
export const offerStore=globalAgentStore.rpayOffers??new Map<string,OfferRecord>();
export const cartStore=globalAgentStore.rpayCarts??new Map<string,CartRecord>();
if(process.env.NODE_ENV!=="production"){globalAgentStore.rpayOffers=offerStore;globalAgentStore.rpayCarts=cartStore}
