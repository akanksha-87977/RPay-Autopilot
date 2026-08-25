"use client";
import { useState } from "react";
import { Braces, Check, Copy, ExternalLink, Play, Server, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const endpoints=[
 ["GET","/.well-known/agent-commerce","Discover merchant capabilities"],["GET","/api/agent/catalog","Read the agent catalog"],["GET","/api/agent/search?q=work+from+home","Search by customer intent"],["GET","/api/agent/product/:id","Read a product schema"],["POST","/api/agent/offer","Request a bounded offer"],["POST","/api/agent/cart","Create an agent cart"],["POST","/api/agent/checkout","Validate and initialize checkout"],["GET","/api/agent/order/:id","Read verified order state"]
];
export function AgentCommerceConsole(){const [selected,setSelected]=useState(0);const [tested,setTested]=useState(false);return <div className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]"><section className="card overflow-hidden"><div className="border-b border-line p-5"><div className="flex items-center justify-between"><div><p className="eyebrow">Machine-readable surface</p><h2 className="mt-2 text-lg font-bold">Agent Commerce API</h2></div><Badge tone="green"><i className="h-1.5 w-1.5 rounded-full bg-mint"/> Live</Badge></div></div><div>{endpoints.map((e,i)=><button key={e[1]} onClick={()=>{setSelected(i);setTested(false)}} className={`flex w-full items-center gap-3 border-b border-line px-5 py-3 text-left last:border-0 ${selected===i?"bg-brand-soft":"hover:bg-[#FAFBFC]"}`}><span className={`mono w-9 text-[9px] font-bold ${e[0]==="GET"?"text-[#197A57]":"text-brand"}`}>{e[0]}</span><div className="min-w-0"><p className="mono truncate text-[10px] font-semibold">{e[1]}</p><p className="mt-1 text-[9px] text-muted">{e[2]}</p></div></button>)}</div></section><section className="overflow-hidden rounded-2xl bg-[#151427] text-white shadow-card"><div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex items-center gap-2"><Server size={15} className="text-[#AFA7FF]"/><span className="mono text-[10px] text-white/60">API EXPLORER</span></div><div className="flex gap-1"><button className="rounded-lg p-2 text-white/50 hover:bg-white/10"><Copy size={14}/></button><button className="rounded-lg p-2 text-white/50 hover:bg-white/10"><ExternalLink size={14}/></button></div></div><div className="p-5"><div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.045] px-3 py-2.5"><span className="mono text-[9px] font-bold text-[#70DFB6]">{endpoints[selected][0]}</span><span className="mono text-[10px] text-white/70">{endpoints[selected][1]}</span></div><pre className="mt-4 h-[310px] overflow-auto rounded-xl bg-black/20 p-4 text-[10px] leading-6 text-[#DAD7FF]"><code>{selected===0?`{
  "schema_version": "2026-08-01",
  "merchant": {
    "id": "mer_nova_001",
    "name": "Nova Electronics"
  },
  "currency": "INR",
  "capabilities": [
    "catalog", "search", "cart", "offers",
    "checkout", "payment", "order_status"
  ],
  "agent_controls": {
    "identity_required": true,
    "budget_enforced": true,
    "negotiation": "bounded"
  },
  "payment_provider": "razorpay",
  "environment": "test",
  "protocol_note": "Protocol-adaptable; no compliance claimed"
}`:`{
  "ok": true,
  "data": {
    "request_id": "req_agent_demo_82",
    "schema": "rpay.agent.v1",
    "policy": "nova-money-v3",
    "result": "Select Run request to call the live route"
  }
}`}</code></pre><button onClick={()=>setTested(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-ink">{tested?<><Check size={15} className="text-mint"/> 200 OK · schema valid</>:<><Play size={15}/> Run request</>}</button><div className="mt-3 flex items-center gap-2 text-[9px] text-white/40"><ShieldCheck size={12}/> Rate-limited · agent-scoped · no payment secrets returned</div></div></section></div>}
