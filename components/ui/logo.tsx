import Link from "next/link";
import { Zap } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-bold tracking-[-0.03em] text-ink">
      <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-brand text-white shadow-[0_6px_18px_rgba(91,76,255,.28)]"><Zap size={16} fill="currentColor" /></span>
      {!compact && <span className="text-[17px]">RPay <span className="text-brand">Autopilot</span></span>}
    </Link>
  );
}
