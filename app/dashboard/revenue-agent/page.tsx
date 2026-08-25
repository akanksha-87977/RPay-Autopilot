import { SectionHeading } from "@/components/ui/section-heading";
import { RevenueAgentConsole } from "@/components/dashboard/revenue-agent-console";
export default function RevenueAgent(){return <><SectionHeading eyebrow="AI Control Plane" title="Revenue Agent" description="Turns observed business signals into allow-listed structured intents. Deterministic services—not the model—control policy, approvals and execution."/><RevenueAgentConsole/></>}
