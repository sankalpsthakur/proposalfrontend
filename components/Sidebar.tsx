"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { History, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen shrink-0 bg-[#1A3721] text-white border-r border-[#2A4731]">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#2A4731]">
          <span className="text-[#CCFF00] text-2xl font-bold">Pablo</span>
        </div>
        <div className="flex-grow">
          <nav className="mt-6 space-y-2 px-4">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start text-white hover:bg-[#2A4731] hover:text-[#CCFF00]",
                pathname === '/app/run-optimization' && "bg-[#2A4731] text-[#CCFF00]"
              )} 
              asChild
            >
              <Link href="/app/run-optimization">
                <Settings className="mr-2 h-5 w-5" />
                Run Optimisation
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start text-white hover:bg-[#2A4731] hover:text-[#CCFF00]",
                pathname === '/app/past-optimizations' && "bg-[#2A4731] text-[#CCFF00]"
              )} 
              asChild
            >
              <Link href="/app/past-optimizations">
                <History className="mr-2 h-5 w-5" />
                Past Optimizations
              </Link>
            </Button>
          </nav>
        </div>
        <div className="p-4 border-t border-[#2A4731]">
          <span className="text-sm text-gray-400">v1.0.0</span>
        </div>
      </div>
    </aside>
  )
}

