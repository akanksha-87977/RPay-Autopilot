import { SectionHeading } from "@/components/ui/section-heading";
import { ApprovalQueue } from "@/components/dashboard/approval-queue";
export default function Approvals(){return <><SectionHeading eyebrow="Human-in-the-loop" title="Approval Queue" description="The agent pauses here when an allowed action exceeds its autonomous financial authority. Rejection never creates a payment."/><ApprovalQueue/></>}
