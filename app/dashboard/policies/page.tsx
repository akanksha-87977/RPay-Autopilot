import { Check, CircleAlert, LockKeyhole, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
const rules=[
 {name:"Automatic discount",condition:"Discount ≤ 10%",decision:"AUTO-APPROVE",tone:"green" as const},
 {name:"Negotiated discount",condition:"Discount > 10% and ≤ 15%",decision:"MERCHANT APPROVAL",tone:"amber" as const},
 {name:"Hard discount ceiling",condition:"Discount > 15%",decision:"BLOCK",tone:"red" as const},
 {name:"Negotiation exposure",condition:"Discount amount > ₹500",decision:"BLOCK",tone:"red" as const},
 {name:"Minimum margin",condition:"Post-offer margin < 12%",decision:"BLOCK",tone:"red" as const},
 {name:"High-value order",condition:"Order ≥ ₹10,000",decision:"MERCHANT APPROVAL",tone:"amber" as const},
 {name:"Agent budget",condition:"Order > authorized budget",decision:"BLOCK",tone:"red" as const},
 {name:"Campaign budget",condition:"Budget > ₹5,000",decision:"MERCHANT APPROVAL",tone:"amber" as const},
 {name:"Refund",condition:"Any refund request",decision:"MERCHANT APPROVAL",tone:"amber" as const}
];
export default function Policies(){return <><SectionHeading eyebrow="Deterministic Money Controls" title="Policy Engine" description="Versioned rules evaluate structured intents before execution. The AI can neither edit these controls nor bypass an approval." action={<Badge tone="purple"><LockKeyhole size={12}/> nova-money-v3 · locked</Badge>}/><div className="grid gap-5 xl:grid-cols-[1fr_320px]"><div className="card overflow-hidden"><div className="grid grid-cols-[1.1fr_1.2fr_.8fr] border-b border-line bg-[#FAFBFC] px-5 py-3 text-[9px] font-bold uppercase tracking-wider text-muted"><span>Rule</span><span>Condition</span><span>Decision</span></div>{rules.map(r=><div className="grid grid-cols-[1.1fr_1.2fr_.8fr] items-center border-b border-line px-5 py-4 text-xs last:border-0" key={r.name}><strong>{r.name}</strong><span className="mono text-[10px] text-muted">{r.condition}</span><Badge tone={r.tone} className="w-fit">{r.decision}</Badge></div>)}</div><div className="space-y-5"><div className="card p-5"><div className="flex items-center gap-2"><ShieldCheck size={18} className="text-brand"/><h3 className="text-sm font-bold">Policy guarantees</h3></div><ul className="mt-4 space-y-3 text-xs text-muted">{["Deterministic evaluation","Immutable per action","Decision stored with event","Merchant-scoped version","Fail-closed on errors"].map(x=><li className="flex gap-2" key={x}><Check size={13} className="mt-0.5 text-mint"/>{x}</li>)}</ul></div><div className="rounded-2xl border border-[#F1D6A4] bg-amber-soft p-5"><div className="flex items-center gap-2 text-sm font-bold text-[#915400]"><CircleAlert size={17}/> AI cannot modify policy</div><p className="mt-2 text-xs leading-5 text-[#87683D]">Policy changes require an authenticated merchant admin and create a new version plus audit event.</p></div></div></div></>}
