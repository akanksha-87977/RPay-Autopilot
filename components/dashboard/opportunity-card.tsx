"use client";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import type { RevenueOpportunity } from "@/lib/types";
import { formatINR } from "@/lib/money";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

export function OpportunityCard({item,compact=false}:{item:RevenueOpportunity;compact?:boolean}){
 const [why,setWhy]=useState(false);
 return <><div className="group rounded-xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#D4D0FF] hover:shadow-card"><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-[11px] font-bold text-brand">0{item.rank}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-bold">{item.title}</h3><Badge tone={item.risk==="LOW"?"green":"amber"}>{item.risk} risk</Badge></div>{!compact&&<p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted">{item.description}</p>}<div className="mt-3 flex items-end justify-between"><div><p className="text-[10px] font-medium text-muted">Estimated monthly uplift</p><p className="mt-0.5 text-lg font-bold tracking-[-.03em]">{formatINR(item.monthlyUplift)}</p></div><button onClick={()=>setWhy(true)} className="flex items-center gap-1 text-[11px] font-bold text-brand">Show me why <ChevronDown size={13}/></button></div></div></div></div>
 <Modal open={why} onClose={()=>setWhy(false)} title={`Why ${item.title}?`}><div className="rounded-xl border border-[#DAD6FF] bg-brand-soft p-4"><div className="flex items-center gap-2 text-xs font-bold text-brand"><Sparkles size={15}/> Decision factors — not hidden reasoning</div><p className="mt-2 text-xs leading-5 text-muted">Concise business signals and deterministic rules used by the recommendation.</p></div><div className="mt-5 space-y-3">{item.signals.map(signal=><div key={signal} className="flex items-start gap-3 text-sm"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-mint"/><span>{signal}</span></div>)}</div><div className="mt-6 grid grid-cols-3 gap-3"><Stat label="Confidence" value={`${item.confidence}%`}/><Stat label="Expected uplift" value={formatINR(item.monthlyUplift)}/><Stat label="Max exposure" value={formatINR(item.exposure)}/></div><button onClick={()=>setWhy(false)} className="btn-primary mt-6 w-full">Review recommended action <ArrowUpRight size={15}/></button></Modal></>;
}
function Stat({label,value}:{label:string;value:string}){return <div className="rounded-xl border border-line p-3"><p className="text-[10px] text-muted">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>}
