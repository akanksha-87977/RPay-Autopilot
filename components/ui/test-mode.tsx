import { ShieldCheck } from "lucide-react";
export function TestMode({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#BDE7D4] bg-[#EDFBF5] px-3 py-1.5 text-[10px] font-bold tracking-[.08em] text-[#0B7A56]">
      <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-mint opacity-30"/><span className="relative h-2 w-2 rounded-full bg-mint"/></span>
      {compact ? "TEST MODE" : <><ShieldCheck size={13}/> RAZORPAY TEST MODE · NO REAL MONEY</>}
    </div>
  );
}
