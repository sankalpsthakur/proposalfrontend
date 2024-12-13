import Link from 'next/link'
import { Home, FileText, BarChart2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-[#1A3721] text-white flex flex-col">
      <SidebarHeader className="p-4 border-b border-[#2A4731]">
        <span className="text-[#CCFF00] text-2xl font-bold">Pablo</span>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <nav className="mt-6 space-y-2 px-4">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#2A4731] hover:text-[#CCFF00]" asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#2A4731] hover:text-[#CCFF00]" asChild>
            <Link href="/dashboard/optimise">
              <FileText className="mr-2 h-5 w-5" />
              Optimise
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#2A4731] hover:text-[#CCFF00]" asChild>
            <Link href="/dashboard/analyse">
              <BarChart2 className="mr-2 h-5 w-5" />
              Analyse
            </Link>
          </Button>
        </nav>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-[#2A4731]">
        <span className="text-sm text-gray-400">v1.0.0</span>
      </SidebarFooter>
    </div>
  )
}

