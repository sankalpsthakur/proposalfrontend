import { SidebarProvider } from "@/components/ui/sidebar"
import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <main className="container mx-auto py-6 px-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

