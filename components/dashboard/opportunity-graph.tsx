"use client";
import { useState } from "react";
import { ArrowRight, Bot, Check, CircleDollarSign, CreditCard, MousePointer2, Package, Percent, ShoppingCart, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";

const nodes=[
 {id:"customer",label:"Customer",sub:"High intent",icon:UserRound,value:"3 views"},
 {id:"intent",label:"Intent",sub:"WFH setup",icon:MousePointer2,value:"87%"},
 {id:"product",label:"Keyboard",sub:"Anchor",icon:Package,value:"₹1,999"},
 {id:"complement",label:"Mouse",sub:"Complement",icon:Package,value:"₹899"},
 {id:"offer",label:"Bundle",sub:"AI offer",icon:Percent,value:"₹2,699"},
 {id:"cart",label:"Cart",sub:"Accepted",icon:ShoppingCart,value:"2 items"},
 {id:"payment",label:"Payment",sub:"Verified",icon:CreditCard,value:"Test"},
 {id:"revenue",label:"Revenue",sub:"Captured",icon:CircleDollarSign,value:"₹2,699"}
];
export function OpportunityGraph(){const [active,setActive]=useState("offer");const selected=nodes.find(n=>n.id===active)!;return <div className="card overflow-hidden"><div className="flex flex-col justify-between gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:p-6"><div><p className="eyebrow">Interactive opportunity graph</p><h2 className="mt-2 text-lg font-bold">Signal → offer → revenue</h2></div><div className="flex items-center gap-2 text-[10px] text-muted"><Bot size={14} className="text-brand"/> Click a node to inspect its evidence</div></div><div className="overflow-x-auto p-5 sm:p-6"><div className="flex min-w-[920px] items-center justify-between gap-2">{nodes.map((node,i)=>{const Icon=node.icon;const is=active===node.id;return <div key={node.id} className="flex flex-1 items-center"><button onClick={()=>setActive(node.id)} className={cn("relative w-full rounded-xl border p-3 text-left transition",is?"border-brand bg-brand text-white shadow-[0_10px_24px_rgba(91,76,255,.22)]":"border-line bg-white hover:border-[#CFCBFF] hover:bg-brand-soft")}><div className="flex items-center gap-2"><span className={cn("flex h-7 w-7 items-center justify-center rounded-lg",is?"bg-white/15":"bg-[#F2F3F7] text-muted")}><Icon size={14}/></span><div><p className="text-[11px] font-bold">{node.label}</p><p className={cn("mt-.5 text-[9px]",is?"text-white/60":"text-muted")}>{node.sub}</p></div></div><p className={cn("mt-3 text-[12px] font-bold",is?"text-white":"text-ink")}>{node.value}</p></button>{i<nodes.length-1&&<ArrowRight size={15} className="mx-1 shrink-0 text-[#C2C7D0]"/>}</div>})}</div></div><div className="m-5 mt-0 grid gap-4 rounded-xl border border-[#DAD6FF] bg-[#F8F7FF] p-4 sm:m-6 sm:mt-0 sm:grid-cols-[1fr_auto]"><div><p className="text-xs font-bold text-brand-dark">{selected.label} evidence</p><p className="mt-1 text-xs leading-5 text-muted">{selected.id==="offer"?"Generated from a 38% co-purchase rate, healthy inventory and an 18% post-discount margin.":`${selected.sub} was recorded as a structured signal and linked to this opportunity.`}</p></div><div className="flex items-center gap-2 text-xs font-bold text-[#087552]"><Check size={14}/> Provenance recorded</div></div></div>}
