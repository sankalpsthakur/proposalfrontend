import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Assumptions() {
  const [assumptions, setAssumptions] = useState({
    electrolyzerType: '',
    electrolyzerEfficiency: '',
    renewableEnergySource: '',
    capacityFactor: '',
    projectLifetime: '',
  })

  const handleChange = (name: string, value: string) => {
    setAssumptions({ ...assumptions, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted assumptions:', assumptions)
    // Here you would typically send this data to your backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="electrolyzerType">Electrolyzer Type</Label>
          <Select onValueChange={(value) => handleChange('electrolyzerType', value)}>
            <SelectTrigger id="electrolyzerType">
              <SelectValue placeholder="Select electrolyzer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pem">PEM</SelectItem>
              <SelectItem value="alkaline">Alkaline</SelectItem>
              <SelectItem value="soec">SOEC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="electrolyzerEfficiency">Electrolyzer Efficiency (%)</Label>
          <Input id="electrolyzerEfficiency" name="electrolyzerEfficiency" type="number" value={assumptions.electrolyzerEfficiency} onChange={(e) => handleChange('electrolyzerEfficiency', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="renewableEnergySource">Renewable Energy Source</Label>
          <Select onValueChange={(value) => handleChange('renewableEnergySource', value)}>
            <SelectTrigger id="renewableEnergySource">
              <SelectValue placeholder="Select energy source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solar">Solar</SelectItem>
              <SelectItem value="wind">Wind</SelectItem>
              <SelectItem value="hydro">Hydro</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacityFactor">Capacity Factor (%)</Label>
          <Input id="capacityFactor" name="capacityFactor" type="number" value={assumptions.capacityFactor} onChange={(e) => handleChange('capacityFactor', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectLifetime">Project Lifetime (years)</Label>
          <Input id="projectLifetime" name="projectLifetime" type="number" value={assumptions.projectLifetime} onChange={(e) => handleChange('projectLifetime', e.target.value)} required />
        </div>
      </div>
      <Button type="submit">Save Assumptions</Button>
    </form>
  )
}

