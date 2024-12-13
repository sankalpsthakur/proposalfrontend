import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ClientParameters() {
  const [parameters, setParameters] = useState({
    companyName: '',
    industry: '',
    annualHydrogenDemand: '',
    location: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted parameters:', parameters)
    // Here you would typically send this data to your backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" value={parameters.companyName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" name="industry" value={parameters.industry} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="annualHydrogenDemand">Annual Hydrogen Demand (kg)</Label>
          <Input id="annualHydrogenDemand" name="annualHydrogenDemand" type="number" value={parameters.annualHydrogenDemand} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={parameters.location} onChange={handleChange} required />
        </div>
      </div>
      <Button type="submit">Save Parameters</Button>
    </form>
  )
}

