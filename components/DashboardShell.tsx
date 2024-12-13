"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { LayoutDashboard, Settings, BarChart2, FolderOpen } from 'lucide-react'

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between px-4 py-2">
          <span className="text-lg font-bold">HydrogenSolutions</span>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="space-y-1 p-2">
              <Input className="mb-4" placeholder="Search..." />
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/projects">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Projects
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/analytics">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm">v1.0.0</span>
          </div>
        </SidebarFooter>
      </Sidebar>
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

