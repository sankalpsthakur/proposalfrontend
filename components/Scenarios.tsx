import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Scenarios() {
  const [scenarios, setScenarios] = useState([
    { id: 1, name: 'Base Case', description: 'Standard operating conditions', status: 'Active' },
    { id: 2, name: 'High Demand', description: '20% increase in hydrogen demand', status: 'Draft' },
    { id: 3, name: 'Low Renewable', description: 'Reduced renewable energy availability', status: 'Archived' },
  ])

  const [newScenario, setNewScenario] = useState({ name: '', description: '' })

  const handleNewScenarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewScenario({ ...newScenario, [e.target.name]: e.target.value })
  }

  const handleAddScenario = (e: React.FormEvent) => {
    e.preventDefault()
    const id = scenarios.length + 1
    setScenarios([...scenarios, { ...newScenario, id, status: 'Draft' }])
    setNewScenario({ name: '', description: '' })
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scenarios.map((scenario) => (
            <TableRow key={scenario.id}>
              <TableCell>{scenario.name}</TableCell>
              <TableCell>{scenario.description}</TableCell>
              <TableCell>{scenario.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <form onSubmit={handleAddScenario} className="space-y-4">
        <h3 className="text-lg font-semibold">Add New Scenario</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Scenario Name</Label>
            <Input id="name" name="name" value={newScenario.name} onChange={handleNewScenarioChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" value={newScenario.description} onChange={handleNewScenarioChange} required />
          </div>
        </div>
        <Button type="submit">Add Scenario</Button>
      </form>
    </div>
  )
}

