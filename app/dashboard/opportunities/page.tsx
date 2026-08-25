import { CircleDollarSign } from "lucide-react";
import { opportunities } from "@/lib/demo-data";
import { formatINR } from "@/lib/money";
import { SectionHeading } from "@/components/ui/section-heading";
import { OpportunityCard } from "@/components/dashboard/opportunity-card";
import { OpportunityGraph } from "@/components/dashboard/opportunity-graph";
import { OpportunityAction } from "@/components/dashboard/opportunity-action";

export default function Opportunities(){const total=opportunities.reduce((a,b)=>a+b.monthlyUplift,0);return <><SectionHeading eyebrow="Revenue Agent / Opportunities" title="₹47,300 found. Four actions, ranked." description="The agent combines behavioral, catalog, inventory and margin signals. Projections are estimates—not guaranteed revenue." action={<div className="card flex items-center gap-3 px-4 py-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint-soft text-mint"><CircleDollarSign size={16}/></span><div><p className="text-[9px] text-muted">Total projected uplift</p><p className="text-sm font-bold">{formatINR(total)} / month</p></div></div>}/><div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]"><div className="grid gap-3 sm:grid-cols-2">{opportunities.map(item=><OpportunityCard key={item.id} item={item}/>)}</div><OpportunityAction/></div><div className="mt-5"><OpportunityGraph/></div></>}
