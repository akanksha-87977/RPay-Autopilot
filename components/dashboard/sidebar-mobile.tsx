"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gauge, Sparkles, CircleDollarSign, Megaphone, Boxes, ClipboardList, Network, ShieldCheck, CheckSquare, ScrollText, Settings } from "lucide-react";
import { Logo } from "@/components/ui/logo";
const links=[
  ["/dashboard/overview","Overview",Gauge],["/dashboard/revenue-agent","Revenue Agent",Sparkles],["/dashboard/opportunities","Opportunities",CircleDollarSign],["/dashboard/campaigns","Campaigns",Megaphone],["/dashboard/products","Products",Boxes],["/dashboard/orders","Orders",ClipboardList],["/dashboard/agent-commerce","Agent Commerce",Network],["/dashboard/policies","Policies",ShieldCheck],["/dashboard/approvals","Approvals",CheckSquare],["/dashboard/audit","Audit Ledger",ScrollText],["/dashboard/settings","Settings",Settings]
] as const;
export function SidebarMobile({open,onClose}:{open:boolean;onClose:()=>void}){return <AnimatePresence>{open&&<><motion.button aria-label="Close menu" onClick={onClose} className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/><motion.aside className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white p-5 shadow-lift lg:hidden" initial={{x:-300}} animate={{x:0}} exit={{x:-300}}><div className="flex items-center justify-between"><Logo/><button onClick={onClose} className="rounded-lg border border-line p-2"><X size={16}/></button></div><nav className="mt-7 space-y-1">{links.map(([href,label,Icon])=><Link onClick={onClose} href={href} key={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-brand-soft hover:text-brand"><Icon size={17}/>{label}</Link>)}</nav></motion.aside></>}</AnimatePresence>}
