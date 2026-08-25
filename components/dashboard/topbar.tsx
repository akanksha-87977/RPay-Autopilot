"use client";
import Link from "next/link";
import { Bell, Bot, ChevronDown, Menu, Search } from "lucide-react";
import { TestMode } from "@/components/ui/test-mode";
import { Logo } from "@/components/ui/logo";
import { useState } from "react";
import { SidebarMobile } from "@/components/dashboard/sidebar-mobile";

export function Topbar(){
  const [mobileOpen,setMobileOpen]=useState(false);
  return <><header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur-xl sm:px-6">
    <div className="flex items-center gap-3 lg:hidden"><button onClick={()=>setMobileOpen(true)} className="rounded-lg border border-line p-2"><Menu size={18}/></button><Logo/></div>
    <div className="hidden w-full max-w-[340px] items-center gap-2 rounded-xl border border-line bg-[#F9FAFB] px-3 py-2.5 lg:flex"><Search size={16} className="text-muted"/><input aria-label="Search dashboard" placeholder="Search actions, orders, products…" className="w-full bg-transparent text-xs outline-none placeholder:text-[#9CA3AF]"/><kbd className="rounded border border-line bg-white px-1.5 py-0.5 text-[9px] text-muted">⌘K</kbd></div>
    <div className="flex items-center gap-2 sm:gap-3"><TestMode compact/><Link href="/buyer" className="btn-secondary hidden !py-2 xl:inline-flex"><Bot size={15}/> Open AI Buyer</Link><button className="relative rounded-xl border border-line p-2.5 text-muted hover:bg-canvas"><Bell size={17}/><i className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose"/></button><button className="flex items-center gap-2 rounded-xl border border-line py-1.5 pl-1.5 pr-2 hover:bg-canvas"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#17152D] text-[10px] font-bold text-white">NK</span><span className="hidden text-left sm:block"><span className="block text-[11px] font-semibold">Nila Kumar</span><span className="block text-[9px] text-muted">Owner</span></span><ChevronDown size={13} className="text-muted"/></button></div>
  </header><SidebarMobile open={mobileOpen} onClose={()=>setMobileOpen(false)}/></>;
}
