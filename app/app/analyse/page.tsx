"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const financialModelTemplates = [
  { id: 1, name: "Basic Green Hydrogen Plant", description: "Standard model for small to medium-sized plants" },
  { id: 2, name: "Advanced Renewable Integration", description: "Model with advanced renewable energy integration" },
  { id: 3, name: "Industrial Scale Production", description: "Large-scale industrial hydrogen production model" },
  { id: 4, name: "Transportation Hub", description: "Model for hydrogen refueling stations and transport hubs" },
]

const commercialData = [
  { year: 2023, revenue: 1000000, costs: 800000, profit: 200000 },
  { year: 2024, revenue: 1500000, costs: 1000000, profit: 500000 },
  { year: 2025, revenue: 2000000, costs: 1200000, profit: 800000 },
  { year: 2026, revenue: 2500000, costs: 1400000, profit: 1100000 },
  { year: 2027, revenue: 3000000, costs: 1600000, profit: 1400000 },
]

const technicalData = [
  { month: 'Jan', efficiency: 85, uptime: 98 },
  { month: 'Feb', efficiency: 87, uptime: 97 },
  { month: 'Mar', efficiency: 86, uptime: 99 },
  { month: 'Apr', efficiency: 88, uptime: 98 },
  { month: 'May', efficiency: 89, uptime: 99 },
  { month: 'Jun', efficiency: 90, uptime: 100 },
]

export default function AnalysePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [activeTab, setActiveTab] = useState("commercial")

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Model Templates</CardTitle>
          <CardDescription>Select a template to start your analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {financialModelTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id.toString()}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>Load Template</Button>
          </div>
          {selectedTemplate && (
            <p className="mt-2 text-sm text-muted-foreground">
              {financialModelTemplates.find(t => t.id.toString() === selectedTemplate)?.description}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Analysis Dashboard</CardTitle>
          <CardDescription>Comprehensive insights into your green hydrogen project</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="technocommercial">Techno-Commercial</TabsTrigger>
            </TabsList>
            <TabsContent value="commercial">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Financial Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={commercialData}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                    <Bar dataKey="costs" fill="#82ca9d" name="Costs" />
                    <Bar dataKey="profit" fill="#ffc658" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Costs</TableHead>
                      <TableHead>Profit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commercialData.map((row) => (
                      <TableRow key={row.year}>
                        <TableCell>{row.year}</TableCell>
                        <TableCell>${row.revenue.toLocaleString()}</TableCell>
                        <TableCell>${row.costs.toLocaleString()}</TableCell>
                        <TableCell>${row.profit.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="technical">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Technical Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={technicalData}>
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="efficiency" stroke="#8884d8" name="Efficiency (%)" />
                    <Line yAxisId="right" type="monotone" dataKey="uptime" stroke="#82ca9d" name="Uptime (%)" />
                  </LineChart>
                </ResponsiveContainer>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Efficiency (%)</TableHead>
                      <TableHead>Uptime (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {technicalData.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell>{row.efficiency}%</TableCell>
                        <TableCell>{row.uptime}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="technocommercial">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Techno-Commercial Insights</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Performance Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">Levelized Cost of Hydrogen (LCOH)</p>
                        <p className="text-2xl">$3.50/kg</p>
                      </div>
                      <div>
                        <p className="font-semibold">Capacity Factor</p>
                        <p className="text-2xl">85%</p>
                      </div>
                      <div>
                        <p className="font-semibold">Payback Period</p>
                        <p className="text-2xl">7.5 years</p>
                      </div>
                      <div>
                        <p className="font-semibold">CO2 Emissions Avoided</p>
                        <p className="text-2xl">50,000 tons/year</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sensitivity Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Placeholder for sensitivity analysis chart</p>
                    {/* Add a chart or table for sensitivity analysis here */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

