import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CampaignBoard } from "@/components/dashboard/campaign-board";
export default function Campaigns(){return <><SectionHeading eyebrow="AI Campaign Orchestrator" title="Campaigns" description="AI-proposed audiences, offers and budgets—bounded by merchant policy and activated only at the correct approval level." action={<button className="btn-primary"><Plus size={15}/> New campaign</button>}/><CampaignBoard/></>}
