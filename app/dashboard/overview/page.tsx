import Link from "next/link";
import { ArrowRight, ArrowUp, Bot, CircleDollarSign, Clock3, CreditCard, MousePointerClick, Sparkles, TrendingUp } from "lucide-react";
import { merchant, opportunities } from "@/lib/demo-data";
import { formatINR } from "@/lib/money";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { OpportunityCard } from "@/components/dashboard/opportunity-card";
import { RevenueSimulator } from "@/components/dashboard/simulator";
import { Badge } from "@/components/ui/badge";

const metrics=[
 {label:"Revenue",value:formatINR(merchant.revenue),delta:"+12.4%",icon:CircleDollarSign,tone:"bg-brand-soft text-brand"},
 {label:"AI-attributed revenue",value:formatINR(merchant.aiRevenue),delta:"+28.7%",icon:Sparkles,tone:"bg-[#E7F8F1] text-mint"},
 {label:"Conversion",value:`${merchant.conversion}%`,delta:"+0.6 pts",icon:MousePointerClick,tone:"bg-[#EAF3FF] text-[#3974BC]"},
 {label:"AI transactions",value:String(merchant.aiTransactions),delta:"+42 this week",icon:Bot,tone:"bg-[#FFF3E3] text-[#C36A00]"}
];

export default function Overview(){return <>
 <SectionHeading eyebrow="Tuesday, 25 August" title="AI Revenue Command Center" description="Your agent found ₹47,300 in potential monthly revenue. Highest-impact actions are ready for review." action={<Link href="/dashboard/opportunities" className="btn-primary">Show opportunities <ArrowRight size={15}/></Link>}/>
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({label,value,delta,icon:Icon,tone})=><div className="card p-5" key={label}><div className="flex items-start justify-between"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}><Icon size={17}/></span><Badge tone="green"><ArrowUp size={10}/>{delta}</Badge></div><p className="mt-5 text-[11px] font-medium text-muted">{label}</p><p className="mt-1 text-[27px] font-bold tracking-[-.04em]">{value}</p></div>)}</div>
 <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(290px,.65fr)]"><section className="card p-5 sm:p-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="eyebrow">Revenue performance</p><h2 className="mt-2 text-lg font-bold">Growth trajectory</h2></div><div className="flex items-center gap-4 text-[10px] font-medium text-muted"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-brand"/> Total revenue</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-mint"/> AI-attributed</span></div></div><div className="mt-4"><RevenueChart/></div></section><RevenueSimulator/></div>
 <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]"><section className="card p-5 sm:p-6"><div className="mb-4 flex items-center justify-between"><div><p className="eyebrow">Prioritized by impact</p><h2 className="mt-2 text-lg font-bold">Top revenue opportunities</h2></div><Link href="/dashboard/opportunities" className="text-xs font-bold text-brand">View all →</Link></div><div className="grid gap-3 md:grid-cols-2">{opportunities.slice(0,4).map(item=><OpportunityCard key={item.id} item={item} compact/>)}</div></section>
 <section className="card p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="eyebrow">Autonomy monitor</p><h2 className="mt-2 text-lg font-bold">Agent activity</h2></div><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-mint"/></div><div className="mt-5 space-y-1">{[{icon:Bot,title:"Offer generated",sub:"WFH bundle · ₹4,299",time:"Now",tone:"purple"},{icon:CreditCard,title:"Payment verified",sub:"Order ord_demo_842",time:"2m",tone:"green"},{icon:Clock3,title:"Approval requested",sub:"Webcam campaign · ₹5,800",time:"12m",tone:"amber"}].map(({icon:Icon,title,sub,time,tone})=><div className="flex items-center gap-3 border-b border-line py-3 last:border-0" key={title}><span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone==="green"?"bg-mint-soft text-mint":tone==="amber"?"bg-amber-soft text-amber":"bg-brand-soft text-brand"}`}><Icon size={15}/></span><div className="min-w-0 flex-1"><p className="text-xs font-semibold">{title}</p><p className="mt-0.5 truncate text-[10px] text-muted">{sub}</p></div><span className="text-[9px] text-muted">{time}</span></div>)}</div></section></div>
 </>}
