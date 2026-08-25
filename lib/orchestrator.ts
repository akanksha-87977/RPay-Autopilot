import { products } from "@/lib/demo-data";
import { evaluatePolicy } from "@/lib/policy-engine";

export type StructuredIntent = {
  tool: "catalog.search" | "offer.create";
  arguments: Record<string, unknown>;
  requestedBy: string;
};

const toolRegistry = {
  "catalog.search": (args: Record<string, unknown>) => {
    const query = String(args.query ?? "").toLowerCase();
    return products.filter((product) => `${product.name} ${product.tags.join(" ")}`.toLowerCase().includes(query));
  },
  "offer.create": (args: Record<string, unknown>) => {
    const listPrice = Number(args.listPrice);
    const offerPrice = Number(args.offerPrice);
    const decision = evaluatePolicy({ action: "CREATE_OFFER", listPrice, offerPrice, cost: Number(args.cost ?? 0) });
    return { listPrice, offerPrice, decision };
  }
};

export async function executeStructuredIntent(intent: StructuredIntent) {
  const tool = toolRegistry[intent.tool];
  if (!tool) throw new Error("Tool is not allow-listed");
  return tool(intent.arguments);
}

// A provider adapter may produce StructuredIntent, but it never receives database,
// secret, policy mutation, or payment execution tools.
export const AgentOrchestrator = { execute: executeStructuredIntent, tools: Object.keys(toolRegistry) };
