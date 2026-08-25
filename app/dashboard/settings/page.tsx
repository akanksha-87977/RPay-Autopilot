import { SectionHeading } from "@/components/ui/section-heading";
import { SettingsForm } from "@/components/dashboard/settings-form";
export default function Settings(){return <><SectionHeading eyebrow="Merchant Administration" title="Settings" description="Configure merchant identity and server-side test integrations. Policy changes create a separately audited version."/><SettingsForm/></>}
