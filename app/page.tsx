import Link from "next/link";
import { ArrowRight, Bot, Braces, Check, ChevronRight, Fingerprint, LockKeyhole, MoveRight, Network, Radar, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { TestMode } from "@/components/ui/test-mode";
import { HeroVisual } from "@/components/landing/hero-visual";

const pillars = [
  { icon: Radar, index: "01", title: "Discover", text: "Revenue AI identifies intent, cart and inventory signals before an opportunity goes cold." },
  { icon: Network, index: "02", title: "Negotiate", text: "Buyer and merchant agents reach a bounded offer inside explicit pricing policy." },
  { icon: Zap, index: "03", title: "Transact", text: "A validated execution layer creates and verifies Razorpay Test Mode payments." },
  { icon: Fingerprint, index: "04", title: "Prove", text: "Every decision, approval, rupee and outcome lands in a tamper-evident audit trail." }
];

export default function LandingPage() {
  return <main className="min-h-screen overflow-hidden bg-white">
    <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
      <Logo/>
      <div className="hidden items-center gap-7 text-sm font-medium text-muted md:flex"><a href="#how">How it works</a><a href="#safety">Money safety</a><a href="#gateway">Agent commerce</a></div>
      <div className="flex items-center gap-2"><Link href="/buyer" className="btn-ghost hidden sm:inline-flex">AI Buyer</Link><Link href="/api/auth/demo?next=/dashboard/overview" className="btn-primary !py-2">Open app <ArrowRight size={15}/></Link></div>
    </nav>

    <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-14 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:pb-28 lg:pt-20">
      <div className="absolute -left-48 top-0 h-[430px] w-[430px] rounded-full bg-brand/[.07] blur-3xl"/>
      <div className="relative z-10">
        <TestMode/>
        <p className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-brand"><Sparkles size={14}/> AI Revenue Agent + Commerce Gateway</p>
        <h1 className="mt-5 max-w-3xl text-[52px] font-bold leading-[.98] tracking-[-.065em] text-ink sm:text-[68px] lg:text-[78px]">AI revenue,<br/><span className="text-brand">on autopilot.</span></h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-muted">Turn your store into an AI-native business. Discover revenue, negotiate bounded offers, transact safely, and prove every money action.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/api/auth/demo?next=/dashboard/overview" className="btn-primary !px-5 !py-3.5">Open Revenue Command Center <ArrowRight size={17}/></Link><Link href="/buyer" className="btn-secondary !px-5 !py-3.5"><Bot size={17}/> Try AI Buyer</Link></div>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-muted"><span className="flex items-center gap-1.5"><Check size={14} className="text-mint"/> Bounded autonomy</span><span className="flex items-center gap-1.5"><Check size={14} className="text-mint"/> Server-verified payments</span><span className="flex items-center gap-1.5"><Check size={14} className="text-mint"/> Complete auditability</span></div>
      </div>
      <HeroVisual/>
    </section>

    <section id="how" className="border-y border-line bg-[#F8F9FC] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow text-brand">The new commerce loop</p><h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-.05em]">From signal to verified revenue.</h2></div><p className="max-w-md text-sm leading-6 text-muted">Not another shopping chatbot. RPay Autopilot makes a merchant discoverable, negotiable and transactable by external AI.</p></div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">{pillars.map(({icon:Icon,...p})=><div key={p.title} className="group bg-white p-7 transition hover:bg-[#FDFCFF]"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white"><Icon size={20}/></span><span className="mono text-xs text-[#B4B9C5]">{p.index}</span></div><h3 className="mt-8 text-lg font-bold">{p.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{p.text}</p></div>)}</div></div>
    </section>

    <section id="gateway" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8">
      <div className="flex flex-col justify-center"><p className="eyebrow text-brand">Agent Commerce Gateway</p><h2 className="mt-3 text-4xl font-bold tracking-[-.05em]">Your store becomes an<br/>AI-addressable business.</h2><p className="mt-5 max-w-lg text-base leading-7 text-muted">External buyer agents discover capabilities, search a machine-readable catalog, request offers, build carts, and checkout—without scraping your storefront.</p><div className="mt-7 space-y-3">{["Discoverable through /.well-known/agent-commerce","Agent identity, permissions and spend budgets","Protocol-adaptable; no false compliance claims"].map(x=><div key={x} className="flex items-center gap-3 text-sm font-medium"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint-soft text-mint"><Check size={13}/></span>{x}</div>)}</div></div>
      <div className="overflow-hidden rounded-2xl bg-[#151427] p-2 shadow-lift"><div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><i className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]"/><i className="h-2.5 w-2.5 rounded-full bg-[#FFD166]"/><i className="h-2.5 w-2.5 rounded-full bg-[#5DD39E]"/><span className="mono ml-3 text-[10px] text-white/45">GET /.well-known/agent-commerce</span></div><pre className="overflow-x-auto p-6 text-[12px] leading-7 text-[#D8D5FF]"><code>{`{
  "merchant": "Nova Electronics",
  "currency": "INR",
  "capabilities": [
    "catalog", "search", "offers",
    "cart", "checkout", "payment"
  ],
  "agent_controls": {
    "identity": true,
    "budget": true,
    "policy": "nova-money-v3"
  },
  "payment_provider": "razorpay",
  "environment": "test"
}`}</code></pre></div>
    </section>

    <section id="safety" className="bg-[#151427] py-24 text-white"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#AFA7FF]"><LockKeyhole size={22}/></span><p className="eyebrow mt-7 !text-[#AFA7FF]">Money Action Safety</p><h2 className="mt-3 text-4xl font-bold tracking-[-.05em]">The model never touches money.</h2><p className="mt-5 text-sm leading-7 text-white/60">Language models may propose structured intent. Only deterministic code can validate, approve, execute and verify a transaction.</p></div><div className="grid content-center gap-3 sm:grid-cols-3">{["Structured intent","Schema + policy","Risk engine","Approval gate","Razorpay Test","Audit ledger"].map((x,i)=><div key={x} className="relative rounded-xl border border-white/10 bg-white/[.045] p-4"><span className="mono text-[10px] text-[#7E74F1]">0{i+1}</span><p className="mt-4 text-sm font-semibold">{x}</p>{i<5&&<ChevronRight className="absolute -right-4 top-1/2 z-10 hidden text-white/20 sm:block" size={16}/>}</div>)}</div></div></div></section>

    <footer className="bg-white"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-10 sm:flex-row sm:items-center lg:px-8"><Logo/><p className="text-xs text-muted">Built for safe, auditable agent-to-agent commerce · Test Mode only.</p><Link href="/api/auth/demo?next=/dashboard/overview" className="flex items-center gap-2 text-sm font-bold text-brand">Launch demo <MoveRight size={16}/></Link></div></footer>
  </main>;
}
