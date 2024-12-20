"use client"

import Link from 'next/link'
import { Home, FileText, BarChart2, History } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"

export default function Sidebar() {
  return (
    <div className="w-32 h-full bg-[#1A3721] flex flex-col">
      <SidebarHeader className="p-4 border-b border-[#2A4731]">
        <span className="text-[#CCFF00] text-2xl font-bold">Pablo</span>
      </SidebarHeader>
      <SidebarContent className="flex-grow hover:text-black">
      <nav className="mt-6 flex flex-col gap-4">
    {/* Buttons */}
  
      <Button variant="borderedGhost">
  <Link
    href="/app"
    className="
      w-full 
      flex 
      items-center 
      justify-start 
      gap-4
      p-2
    "
  >
    <Home className="mr-6 h-5 w-5" />
  Dashboard
  </Link>
</Button>

  <Button
    variant="borderedGhost">
    <Link href="/app/optimise"
    className="w-full 
      flex 
      items-center 
      justify-start 
      gap-4
      border 
      border-white 
      bg-transparent 
      text-black 
      hover:bg-[#2A4731] 
      hover:text-red-500
      p-2">
      <FileText className="mr-2 h-5 w-5" />
      Create a Project
    </Link>
  </Button>
  <Button
    variant="borderedGhost">
    <Link href="/app/past-optimizations"
    className='w-full 
      flex 
      items-center 
      justify-start 
      gap-4
      border 
      border-white 
      bg-transparent 
      text-black 
      hover:bg-[#2A4731] 
      hover:text-red-500
      p-2'>
      <History className="mr-2 h-5 w-5" />
      Past Optimizations
    </Link>
  </Button>
  <Button
    variant="borderedGhost">
    <Link href="/app/analyse"
    className='w-full 
    flex 
    items-center 
    justify-start 
    gap-4
    border 
    border-white 
    bg-transparent 
    text-black 
    hover:bg-[#2A4731] 
    hover:text-red-500
    p-2'>
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

