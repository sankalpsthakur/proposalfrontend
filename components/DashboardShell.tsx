"use client"

import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { LayoutDashboard, Settings, BarChart2, FolderOpen } from 'lucide-react'

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <Button variant="outline">Profile</Button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

