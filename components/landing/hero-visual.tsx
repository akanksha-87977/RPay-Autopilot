"use client";
import { motion } from "framer-motion";
import { Bot, Check, CreditCard, ShieldCheck, Sparkles } from "lucide-react";

export function HeroVisual() {
  return <div className="relative mx-auto h-[490px] w-full max-w-[560px]">
    <div className="absolute inset-0 rounded-[32px] bg-brand/[.045]"/>
    <div className="grid-fade absolute inset-0 rounded-[32px]"/>
    <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="absolute left-5 right-8 top-10 rounded-2xl border border-white bg-white p-5 shadow-lift sm:left-10">
      <div className="flex items-start justify-between gap-3"><div className="flex gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white"><Sparkles size={18}/></span><div><p className="text-[11px] font-bold uppercase tracking-[.14em] text-brand">Revenue signal found</p><h3 className="mt-1 font-bold">Keyboard + Mouse Bundle</h3></div></div><span className="rounded-full bg-mint-soft px-2.5 py-1 text-[10px] font-bold text-[#087552]">87% CONFIDENCE</span></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Mini label="Potential" value="₹18.4k"/><Mini label="Exposure" value="₹199"/><Mini label="Risk" value="Low"/></div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F7F7FC] p-3 text-xs"><span className="text-muted">Views ↑ 31% · Conversion ↓ 14%</span><span className="font-bold text-brand">Review action →</span></div>
    </motion.div>

    <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:.25,duration:.55}} className="absolute right-2 top-[232px] w-[66%] rounded-2xl border border-[#DAD6FF] bg-[#17152D] p-4 text-white shadow-lift sm:right-0">
      <div className="flex items-center gap-2"><Bot size={16} className="text-[#AFA7FF]"/><span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#AFA7FF]">AI Deal Room</span><span className="ml-auto h-2 w-2 rounded-full bg-[#55D6A7]"/></div>
      <p className="mt-3 text-sm leading-6 text-white/90">“I can offer the complete WFH bundle for <strong className="text-white">₹4,299</strong> under current policy.”</p>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-white/60"><ShieldCheck size={13} className="text-[#55D6A7]"/> 4 controls passed · merchant approved</div>
    </motion.div>

    <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.48,duration:.5}} className="absolute bottom-7 left-3 w-[62%] rounded-2xl border border-[#CDEBDC] bg-white p-4 shadow-card sm:left-8">
      <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-soft text-mint"><Check size={18}/></span><div><p className="text-xs font-bold">Payment verified</p><p className="mt-0.5 text-[11px] text-muted">Razorpay Test Order · ₹4,299</p></div><CreditCard size={16} className="ml-auto text-muted"/></div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EAF1ED]"><motion.div className="h-full rounded-full bg-mint" initial={{width:0}} animate={{width:"100%"}} transition={{delay:.7,duration:1}}/></div>
    </motion.div>
  </div>;
}
function Mini({label,value}:{label:string;value:string}){return <div className="rounded-lg border border-line bg-white p-2.5"><p className="text-[10px] text-muted">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>}
