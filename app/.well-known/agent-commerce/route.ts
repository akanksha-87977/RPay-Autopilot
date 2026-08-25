import { NextResponse } from "next/server";
import { merchant } from "@/lib/demo-data";
export const dynamic="force-dynamic";
export async function GET(){return NextResponse.json({
 schema_version:"2026-08-01",
 merchant:{id:merchant.id,name:merchant.name},
 currency:"INR",
 capabilities:["catalog","search","product","offers","cart","checkout","payment","order_status"],
 endpoints:{catalog:"/api/agent/catalog",search:"/api/agent/search",product:"/api/agent/product/{id}",offer:"/api/agent/offer",cart:"/api/agent/cart",checkout:"/api/agent/checkout",order:"/api/agent/order/{id}"},
 agent_controls:{identity_required:true,budget_enforced:true,negotiation:"bounded",approval_gate:true},
 payment_provider:"razorpay",environment:"test",
 protocol_adapters:{status:"conceptual",note:"Designed for future ACP, AP2, x402 and UAP-style adapters; no protocol compliance is claimed."}
},{headers:{"Cache-Control":"public, max-age=60","Access-Control-Allow-Origin":"*"}})}
