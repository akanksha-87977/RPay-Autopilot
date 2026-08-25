"use client";
import { useState } from "react";
import { Check, Clock3, Megaphone, Percent, RotateCcw, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const items=[
 {id:"apr_204",type:"OFFER",title:"WFH Bundle · negotiated offer",amount:"₹697 exposure",why:"Total discount is 13.95%, above the 10% autonomous threshold.",icon:Percent},
 {id:"apr_205",type:"CAMPAIGN",title:"Webcam Remote Teams",amount:"₹5,800 budget",why:"Campaign budget exceeds the ₹5,000 autonomous limit.",icon:Megaphone},
 {id:"apr_206",type:"REFUND",title:"Refund · order ord_1921",amount:"₹1,499 refund",why:"All refunds require authenticated merchant approval.",icon:RotateCcw}
];
export function ApprovalQueue(){const [resolved,setResolved]=useState<Record<string,string>>({});return <div className="space-y-3">{items.map(({id,type,title,amount,why,icon:Icon})=><div className="card p-5" key={id}><div className="flex flex-col gap-4 md:flex-row md:items-center"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-soft text-amber"><Icon size={18}/></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-bold">{title}</h3><Badge tone="amber">{type}</Badge></div><p className="mt-1.5 text-xs text-muted">{why}</p><div className="mt-2 flex items-center gap-3 text-[10px] text-muted"><span className="font-semibold text-ink">{amount}</span><span>•</span><span className="flex items-center gap-1"><Clock3 size={11}/> 4 minutes ago</span><span>•</span><span className="mono">{id}</span></div></div>{resolved[id]?<Badge tone={resolved[id]==="Approved"?"green":"red"}>{resolved[id]}</Badge>:<div className="flex gap-2"><button onClick={()=>setResolved({...resolved,[id]:"Rejected"})} className="btn-secondary !py-2"><X size={14}/> Reject</button><button onClick={()=>setResolved({...resolved,[id]:"Approved"})} className="btn-primary !py-2"><Check size={14}/> Approve</button></div>}</div></div>)}</div>}
