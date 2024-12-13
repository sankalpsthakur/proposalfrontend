import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/Overview"
import { RecentProjects } from "@/components/RecentProjects"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, Battery, Wind } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <Button className="bg-[#1A3721] hover:bg-[#2A4731] text-white">Create New Project</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-[#CCFF00] border hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#1A3721]">Total Projects</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-[#1A3721]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A3721]">18</div>
            <p className="text-xs text-gray-500">+3 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#CCFF00] border hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#1A3721]">Active Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#1A3721]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A3721]">10</div>
            <p className="text-xs text-gray-500">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#CCFF00] border hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#1A3721]">Hydrogen Production</CardTitle>
            <Battery className="h-4 w-4 text-[#1A3721]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A3721]">1,865 kg</div>
            <p className="text-xs text-gray-500">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-[#CCFF00] border hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#1A3721]">CO2 Avoided</CardTitle>
            <Wind className="h-4 w-4 text-[#1A3721]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A3721]">18,450 kg</div>
            <p className="text-xs text-gray-500">+22% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-800">Production Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentProjects />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-800">Efficiency Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Electrolyzer Efficiency</span>
                <span className="font-bold text-gray-800">76%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Renewable Energy Utilization</span>
                <span className="font-bold text-gray-800">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Storage Capacity Utilization</span>
                <span className="font-bold text-gray-800">72%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-800">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Investment</span>
                <span className="font-bold text-gray-800">$24.5M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projected Annual Revenue</span>
                <span className="font-bold text-gray-800">$8.2M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average ROI</span>
                <span className="font-bold text-gray-800">18.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

