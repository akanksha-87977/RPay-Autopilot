import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
export default function DashboardLayout({children}:{children:React.ReactNode}){return <div className="flex min-h-screen bg-canvas"><Sidebar/><div className="min-w-0 flex-1"><Topbar/><main className="mx-auto max-w-[1480px] p-4 sm:p-6 lg:p-8">{children}</main></div></div>}
