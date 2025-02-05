import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Templates() {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Small Scale Production', description: 'For projects under 1 ton per day', type: 'Production' },
    { id: 2, name: 'Grid Balancing', description: 'For renewable energy integration projects', type: 'Energy' },
    { id: 3, name: 'Transportation Hub', description: 'For hydrogen refueling stations', type: 'Infrastructure' },
  ])

  const [newTemplate, setNewTemplate] = useState({ name: '', description: '', type: '' })

  const handleNewTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTemplate({ ...newTemplate, [e.target.name]: e.target.value })
  }

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault()
    const id = templates.length + 1
    setTemplates([...templates, { ...newTemplate, id }])
    setNewTemplate({ name: '', description: '', type: '' })
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.description}</TableCell>
              <TableCell>{template.type}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Use Template</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <form onSubmit={handleAddTemplate} className="space-y-4">
        <h3 className="text-lg font-semibold">Add New Template</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input id="name" name="name" value={newTemplate.name} onChange={handleNewTemplateChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" value={newTemplate.description} onChange={handleNewTemplateChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input id="type" name="type" value={newTemplate.type} onChange={handleNewTemplateChange} required />
          </div>
        </div>
        <Button type="submit">Add Template</Button>
      </form>
    </div>
  )
}

