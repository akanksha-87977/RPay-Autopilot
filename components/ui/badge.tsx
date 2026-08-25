import { cn } from "@/lib/cn";

const tones = {
  green: "bg-mint-soft text-[#087552] border-[#C8EDDF]",
  amber: "bg-amber-soft text-[#A15C00] border-[#F5D9A6]",
  red: "bg-rose-soft text-[#C73136] border-[#FFD0D2]",
  purple: "bg-brand-soft text-brand-dark border-[#DAD6FF]",
  gray: "bg-[#F2F4F7] text-[#596273] border-line",
  blue: "bg-[#EAF3FF] text-[#2363B5] border-[#D3E6FF]"
};
export function Badge({ children, tone = "gray", className }: { children: React.ReactNode; tone?: keyof typeof tones; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em]", tones[tone], className)}>{children}</span>;
}
