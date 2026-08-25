"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Boxes, CheckSquare, ChevronLeft, CircleDollarSign, ClipboardList, Gauge, Megaphone, Network, PanelLeftClose, ScrollText, Settings, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";
import { useState } from "react";

type NavItem = { href: string; label: string; icon: LucideIcon; count?: number };
const primary: NavItem[] = [
  { href: "/dashboard/overview", label: "Overview", icon: Gauge },
  { href: "/dashboard/revenue-agent", label: "Revenue Agent", icon: Sparkles },
  { href: "/dashboard/opportunities", label: "Opportunities", icon: CircleDollarSign },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/dashboard/products", label: "Products", icon: Boxes },
  { href: "/dashboard/orders", label: "Orders", icon: ClipboardList }
];
const controls: NavItem[] = [
  { href: "/dashboard/agent-commerce", label: "Agent Commerce", icon: Network },
  { href: "/dashboard/policies", label: "Policies", icon: ShieldCheck },
  { href: "/dashboard/approvals", label: "Approvals", icon: CheckSquare, count: 3 },
  { href: "/dashboard/audit", label: "Audit Ledger", icon: ScrollText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  return <aside className={cn("sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white px-3 py-5 transition-all duration-300 lg:flex", compact ? "w-[76px]" : "w-[244px]")}> 
    <div className={cn("flex h-10 items-center", compact ? "justify-center" : "px-2")}><Logo compact={compact}/></div>
    <div className="mt-7 flex-1 overflow-y-auto no-scrollbar"><NavGroup items={primary} compact={compact} pathname={pathname}/><p className={cn("mb-2 mt-6 px-3 text-[9px] font-bold uppercase tracking-[.16em] text-[#A0A7B5]", compact && "text-center px-0")}>{compact ? "•••" : "Control plane"}</p><NavGroup items={controls} compact={compact} pathname={pathname}/></div>
    {!compact && <div className="mb-3 rounded-xl border border-[#DCD8FF] bg-brand-soft p-3"><div className="flex items-center gap-2 text-xs font-bold text-brand-dark"><Bot size={15}/> Merchant agent online</div><p className="mt-2 text-[10px] leading-4 text-muted">4 opportunities monitored · policy v3 active</p></div>}
    <button onClick={()=>setCompact(!compact)} className="btn-ghost w-full border border-line !text-xs">{compact ? <PanelLeftClose size={16} className="rotate-180"/> : <><ChevronLeft size={15}/> Collapse</>}</button>
  </aside>;
}
function NavGroup({items,compact,pathname}:{items: NavItem[]; compact:boolean; pathname:string}){return <nav className="space-y-1">{items.map(({href,label,icon:Icon,count})=>{const active=pathname===href; return <Link key={href} title={compact?label:undefined} href={href} className={cn("relative flex h-10 items-center rounded-[10px] text-[13px] font-medium transition", compact?"justify-center":"gap-3 px-3", active?"bg-brand-soft text-brand-dark font-semibold":"text-[#5D6575] hover:bg-[#F4F5F8] hover:text-ink")}><Icon size={17} strokeWidth={active?2.3:1.8}/>{!compact&&<span>{label}</span>}{!compact&&count&&<span className="ml-auto rounded-full bg-[#FFEBEC] px-2 py-0.5 text-[10px] font-bold text-[#C9363B]">{count}</span>}{active&&<span className="absolute -left-3 h-5 w-[3px] rounded-r-full bg-brand"/>}</Link>})}</nav>}
