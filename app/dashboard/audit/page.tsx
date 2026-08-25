import { Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { AuditLedger } from "@/components/dashboard/audit-ledger";
export default function Audit(){return <><SectionHeading eyebrow="Provable Money Actions" title="Audit Ledger" description="A structured record of who did what, why, under which policy, for how much, and with what verified result." action={<button className="btn-secondary"><Download size={15}/> Export JSONL</button>}/><AuditLedger/></>}
