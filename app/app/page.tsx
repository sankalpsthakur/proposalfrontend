"use client"

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FinancialModelSummary } from "@/components/FinancialModelSummary"
import { ArrowRight } from "lucide-react"
import { withAuth } from '../form/authWrapper'
import { useApi } from '../../hooks/useApi'
import { toastService } from '../../services/toastService'

interface FinancialModel {
  name: string;
}

interface OptimizationRun {
  created_at: string;
  operation_run_id: string;
  status: string;
  updated_at: string;
}

const RunOptimizationPage = () => {
  const [activeTab, setActiveTab] = useState("financial-model")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedRun, setSelectedRun] = useState<OptimizationRun | null>(null)
  const [optimizationRuns, setOptimizationRuns] = useState<OptimizationRun[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [financialModels, setFinancialModels] = useState<string[]>([])
  const [isLoadingModels, setIsLoadingModels] = useState(false)
  
  const api = useApi()

  const fetchFinancialModels = async () => {
    setIsLoadingModels(true);
    try {
      const data = await api.get('https://proposal.hygenco.in/api/getFinancialModels', {
        credentials: 'include',
        successMessage: 'Financial models loaded successfully',
        errorMessage: 'Failed to load financial models. Please try again later.',
      });
      
      setFinancialModels(data);
    } catch (error) {
      console.error('Error fetching financial models:', error);
      // Error is already handled by the useApi hook
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleOptimize = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("[handleOptimize] Form submission started.")

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)
    console.log("[handleOptimize] Collected form data:", data)

    // Convert numeric values to floats
    const numericFields = [
      "client_h2flowrate", "client_h2flowhours", "projectLifetime", "o2MarketSellLimit",
      "excessProductionH2MerchantLimit", "electrolyzerstackConversion100Percent",
      "electrolyzerstackConversionMinTurndown", "stackMinTurndownratio", "stackefficiencydegradation",
      "stackLifetime", "TotalAuxRatedPowerDuringOperating", "TotalAuxRatedPowerOutsideOperating",
      "BatteryroundtripEfficiency", "BatteryLife", "BatteryCapacityAnnualDegradation",
      "PVOutputAnnualDegradation", "PV_DC_size_LowerRange", "PV_DC_size_HigherRange",
      "inverter_ac_size_low", "inverter_ac_size_high", "wind_size_low", "wind_size_high",
      "power_evactuation_size_low", "power_evactuation_size_high", "ltoa_size_low", "ltoa_size_high",
      "battery_size_low", "battery_size_high", "electrolyser_size_low", "electrolyser_size_high",
      "low_bar_h2_storage_size_low", "low_bar_h2_storage_size_high", "high_bar_h2_storage_size_low",
      "high_bar_h2_storage_size_high", "h2_compressor_throughput_low", "h2_compressor_throughput_high",
      "o2_storage_low", "o2_storage_high", "o2_compressor_throughput_low", "o2_compressor_throughput_high"
    ]

    numericFields.forEach(field => {
      if (data[field] !== undefined) {
        const value = data[field]
        if (typeof value === 'string') {
          const parsedValue = parseFloat(value)
          if (!isNaN(parsedValue)) {
            data[field] = parsedValue.toString()
          }
        }
      }
    })

    setIsOptimizing(true)
    console.log("[handleOptimize] Set isOptimizing to true.")

    try {
      const result = await api.post('/optimize', { Ui_variables: data }, {
        loadingMessage: 'Submitting optimization request...',
        showLoadingToast: true,
        successMessage: null, // We'll handle success message based on the response
        errorMessage: "An error occurred while submitting your optimization request. Please try again.",
      });
      
      console.log("[handleOptimize] Parsed JSON response:", result)

      // Validate that result is an object and has the expected structure
      if (result && typeof result === 'object') {
        if (result.status === 'queued') {
          console.log("[handleOptimize] Optimization request queued successfully.")
          // Use the message from the API response if available
          const successMessage = result.message || "Your request has been queued. Results will be sent to your email address in approximately one hour.";
          toastService.success(successMessage);
          setActiveTab("results")
        } else if (result.status) {
          // Handle other known status values if needed
          console.log(`[handleOptimize] Request status: ${result.status}`)
          const statusMessage = result.message || `Optimization request status: ${result.status}`;
          toastService.info(statusMessage);
        } else {
          // Missing status field
          console.error("[handleOptimize] Response missing status field:", result)
          toastService.error('Unexpected response format from server. Missing status information.');
        }
      } else {
        // Not a valid object response
        console.error("[handleOptimize] Invalid response structure:", result)
        toastService.error('Unexpected response format from server. Please try again.');
      }
    } catch (error) {
      console.error("[handleOptimize] Caught error:", error)
      // Error is already handled by the useApi hook
    } finally {
      console.log("[handleOptimize] Final cleanup: Setting isOptimizing to false.")
      setIsOptimizing(false)
    }
  }

  const customInputs = {
    // Add your custom input data here if needed
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRunClick = async (run: OptimizationRun) => {
    setSelectedRun(run);
    // API call for detailed view will be added here later
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="financial-model">Financial Model</TabsTrigger>
          <TabsTrigger value="assumptions-variables">Assumptions & Variables</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <TabsContent value="financial-model">
          <Card>
            <CardHeader>
              <CardTitle>Select Financial Model</CardTitle>
              <CardDescription>Choose a financial model for your project optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select 
                  value={selectedModel} 
                  onValueChange={setSelectedModel} 
                  onOpenChange={(open) => {
                    if (open && financialModels.length === 0) {
                      fetchFinancialModels();
                    }
                  }}
                >
                  <SelectTrigger className="w-full h-10 px-3 py-2 text-base border rounded-md bg-white text-black">
                    <SelectValue placeholder={isLoadingModels ? "Loading models..." : "Select a financial model"} className="text-muted-foreground" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    {financialModels.map((modelName) => (
                      <SelectItem key={modelName} value={modelName} className="cursor-pointer hover:bg-gray-100">
                        {modelName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={() => setActiveTab("assumptions-variables")} 
                  disabled={!selectedModel || isLoadingModels}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Continue to Assumptions & Variables
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assumptions-variables">
          <Card>
            <CardHeader>
              <CardTitle>Assumptions & Variables</CardTitle>
              <CardDescription>Set your project assumptions and variables</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedModel && (
                <FinancialModelSummary 
                  model={{ name: selectedModel, description: '' }}
                  customInputs={customInputs}
                />
              )}
              <form onSubmit={handleOptimize}>
                <div className="grid gap-4">
                  <h3 className="text-lg font-semibold">Assumptions</h3>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="client_h2flowrate" className="col-span-2">Customer required H2 flow rate (NM3/hour):</Label>
                    <Input id="client_h2flowrate" name="client_h2flowrate" className="col-span-2" defaultValue="0" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="client_h2flowhours" className="col-span-2">Hours of H2 supply at flow rate:</Label>
                    <Input id="client_h2flowhours" name="client_h2flowhours" className="col-span-2" defaultValue="24" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="supplyPressureVsEL" className="col-span-2">Supply pressure vs. EL (Low/High):</Label>
                    <Input id="supplyPressureVsEL" name="supplyPressureVsEL" className="col-span-2" defaultValue="High" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectLifetime" className="col-span-2">Project contract lifetime (Years):</Label>
                    <Input id="projectLifetime" name="projectLifetime" className="col-span-2" defaultValue="20" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contractCurrency" className="col-span-2">Contract pricing currency (USD/INR):</Label>
                    <Input id="contractCurrency" name="contractCurrency" className="col-span-2" defaultValue="INR" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="o2MarketSellClientOfftake" className="col-span-2">O2 market sell/Client Offtake (Yes/No):</Label>
                    <Input id="o2MarketSellClientOfftake" name="o2MarketSellClientOfftake" className="col-span-2" defaultValue="Yes" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="o2MarketSellLimit" className="col-span-2">O2 market sell limit (Nm3/month):</Label>
                    <Input id="o2MarketSellLimit" name="o2MarketSellLimit" className="col-span-2" defaultValue="999999999" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="excessProductionH2Merchant" className="col-span-2">Excess production H2 merchant market sell (Yes/No):</Label>
                    <Input id="excessProductionH2Merchant" name="excessProductionH2Merchant" className="col-span-2" defaultValue="Yes" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="excessProductionH2MerchantLimit" className="col-span-2">Excess production H2 merchant market sell limit (Nm3/month):</Label>
                    <Input id="excessProductionH2MerchantLimit" name="excessProductionH2MerchantLimit" className="col-span-2" defaultValue="999999999" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="injectExcessPower" className="col-span-2">Inject excess power to client/grid (Yes/No):</Label>
                    <Input id="injectExcessPower" name="injectExcessPower" className="col-span-2" defaultValue="Yes" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="drawPowerFromClient" className="col-span-2">Draw power from client/grid (use as battery) (Yes/No):</Label>
                    <Input id="drawPowerFromClient" name="drawPowerFromClient" className="col-span-2" defaultValue="Yes" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="electrolyzerType" className="col-span-2">Electrolyzer Type (AEC/PEM):</Label>
                    <Input id="electrolyzerType" name="electrolyzerType" className="col-span-2" defaultValue="AEC" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="electrolyzerstackConversion100Percent" className="col-span-2">Electrolyzer stack conversion (100% flow) (KwH/NM3):</Label>
                    <Input id="electrolyzerstackConversion100Percent" name="electrolyzerstackConversion100Percent" className="col-span-2" defaultValue="4.6350" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="electrolyzerstackConversionMinTurndown" className="col-span-2">Electrolyzer stack conversion (min turndown flow) (KwH/NM3):</Label>
                    <Input id="electrolyzerstackConversionMinTurndown" name="electrolyzerstackConversionMinTurndown" className="col-span-2" defaultValue="3.744" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stackMinTurndownratio" className="col-span-2">Stack min turndown ratio %:</Label>
                    <Input id="stackMinTurndownratio" name="stackMinTurndownratio" className="col-span-2" defaultValue="0.2" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stackefficiencydegradation" className="col-span-2">Stack efficiency annual degradation (%):</Label>
                    <Input id="stackefficiencydegradation" name="stackefficiencydegradation" className="col-span-2" defaultValue="0.00916667" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stackLifetime" className="col-span-2">Lifetime of electrolyzer stack (Hours):</Label>
                    <Input id="stackLifetime" name="stackLifetime" className="col-span-2" defaultValue="82000" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="TotalAuxRatedPowerDuringOperating" className="col-span-2">Total AUX rated power (during EL operating) (KW):</Label>
                    <Input id="TotalAuxRatedPowerDuringOperating" name="TotalAuxRatedPowerDuringOperating" className="col-span-2" defaultValue="156" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="TotalAuxRatedPowerOutsideOperating" className="col-span-2">Total AUX rated power (outside EL operating) (KW):</Label>
                    <Input id="TotalAuxRatedPowerOutsideOperating" name="TotalAuxRatedPowerOutsideOperating" className="col-span-2" defaultValue="42" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="BatteryroundtripEfficiency" className="col-span-2">Battery round-trip efficiency (%):</Label>
                    <Input id="BatteryroundtripEfficiency" name="BatteryroundtripEfficiency" className="col-span-2" defaultValue="0.85" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="BatteryLife" className="col-span-2">Battery life (Years):</Label>
                    <Input id="BatteryLife" name="BatteryLife" className="col-span-2" defaultValue="11" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="BatteryCapacityAnnualDegradation" className="col-span-2">Battery capacity annual degradation (%):</Label>
                    <Input id="BatteryCapacityAnnualDegradation" name="BatteryCapacityAnnualDegradation" className="col-span-2" defaultValue="0.0235" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="PvType" className="col-span-2">PV type (Poly/Mono):</Label>
                    <Input id="PvType" name="PvType" className="col-span-2" defaultValue="Mono" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="PVOutputAnnualDegradation" className="col-span-2">PV output annual degradation (%):</Label>
                    <Input id="PVOutputAnnualDegradation" name="PVOutputAnnualDegradation" className="col-span-2" defaultValue="0.005" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="PvPlacement" className="col-span-2">Placement (Rooftop/Ground mounted) (RT/GM):</Label>
                    <Input id="PvPlacement" name="PvPlacement" className="col-span-2" defaultValue="GM" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-6">Variables</h3>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="PV_DC_size_LowerRange" className="col-span-2">PV DC Size (MWPV-DC):</Label>
                    <Input id="PV_DC_size_LowerRange" name="PV_DC_size_LowerRange" className="col-span-2" defaultValue="6.8745" />
                    <Label htmlFor="PV_DC_size_HigherRange" className="col-span-1 text-center">to</Label>
                    <Input id="PV_DC_size_HigherRange" name="PV_DC_size_HigherRange" className="col-span-1" defaultValue="6.8745" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="inverter_ac_size_low" className="col-span-2">Inverter AC Size (MWPV-AC):</Label>
                    <Input id="inverter_ac_size_low" name="inverter_ac_size_low" className="col-span-2" defaultValue="5.1967" />
                    <Label htmlFor="inverter_ac_size_high" className="col-span-1 text-center">to</Label>
                    <Input id="inverter_ac_size_high" name="inverter_ac_size_high" className="col-span-1" defaultValue="5.1967" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="wind_size_low" className="col-span-2">Wind Size (MWWTG-DC):</Label>
                    <Input id="wind_size_low" name="wind_size_low" className="col-span-2" defaultValue="4.0664" />
                    <Label htmlFor="wind_size_high" className="col-span-1 text-center">to</Label>
                    <Input id="wind_size_high" name="wind_size_high" className="col-span-1" defaultValue="4.0664" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="power_evactuation_size_low" className="col-span-2">Power Evacuation Size (MWAC):</Label>
                    <Input id="power_evactuation_size_low" name="power_evactuation_size_low" className="col-span-2" defaultValue="6" />
                    <Label htmlFor="power_evactuation_size_high" className="col-span-1 text-center">to</Label>
                    <Input id="power_evactuation_size_high" name="power_evactuation_size_high" className="col-span-1" defaultValue="6" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="ltoa_size_low" className="col-span-2">LTOA Size (MWAC):</Label>
                    <Input id="ltoa_size_low" name="ltoa_size_low" className="col-span-2" defaultValue="0" />
                    <Label htmlFor="ltoa_size_high" className="col-span-1 text-center">to</Label>
                    <Input id="ltoa_size_high" name="ltoa_size_high" className="col-span-1" defaultValue="0" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="battery_size_low" className="col-span-2">Battery Size (Kwh):</Label>
                    <Input id="battery_size_low" name="battery_size_low" className="col-span-2" defaultValue="857.71" />
                    <Label htmlFor="battery_size_high" className="col-span-1 text-center">to</Label>
                    <Input id="battery_size_high" name="battery_size_high" className="col-span-1" defaultValue="857.71" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="electrolyser_size_low" className="col-span-2">Electrolyser Size (MWEL-AC):</Label>
                    <Input id="electrolyser_size_low" name="electrolyser_size_low" className="col-span-2" defaultValue="3.2445" />
                    <Label htmlFor="electrolyser_size_high" className="col-span-1 text-center">to</Label>
                    <Input id="electrolyser_size_high" name="electrolyser_size_high" className="col-span-1" defaultValue="3.2445" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="low_bar_h2_storage_size_low" className="col-span-2">Low bar H2 Storage Size (Peak NM3):</Label>
                    <Input id="low_bar_h2_storage_size_low" name="low_bar_h2_storage_size_low" className="col-span-2" defaultValue="215" />
                    <Label htmlFor="low_bar_h2_storage_size_high" className="col-span-1 text-center">to</Label>
                    <Input id="low_bar_h2_storage_size_high" name="low_bar_h2_storage_size_high" className="col-span-1" defaultValue="215" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="high_bar_h2_storage_size_low" className="col-span-2">High bar H2 Storage Size (Peak NM3):</Label>
                    <Input id="high_bar_h2_storage_size_low" name="high_bar_h2_storage_size_low" className="col-span-2" defaultValue="12000" />
                    <Label htmlFor="high_bar_h2_storage_size_high" className="col-span-1 text-center">to</Label>
                    <Input id="high_bar_h2_storage_size_high" name="high_bar_h2_storage_size_high" className="col-span-1" defaultValue="12000" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="h2_compressor_throughput_low" className="col-span-2">H2 Compressor Throughput (NM3/hr):</Label>
                    <Input id="h2_compressor_throughput_low" name="h2_compressor_throughput_low" className="col-span-2" defaultValue="700" />
                    <Label htmlFor="h2_compressor_throughput_high" className="col-span-1 text-center">to</Label>
                    <Input id="h2_compressor_throughput_high" name="h2_compressor_throughput_high" className="col-span-1" defaultValue="700" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="o2_storage_low" className="col-span-2">O2 Storage Size (Peak NM3):</Label>
                    <Input id="o2_storage_low" name="o2_storage_low" className="col-span-2" defaultValue="106" />
                    <Label htmlFor="o2_storage_high" className="col-span-1 text-center">to</Label>
                    <Input id="o2_storage_high" name="o2_storage_high" className="col-span-1" defaultValue="106" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="o2_compressor_throughput_low" className="col-span-2">O2 Compressor Throughput (NM3/hr):</Label>
                    <Input id="o2_compressor_throughput_low" name="o2_compressor_throughput_low" className="col-span-2" defaultValue="350" />
                    <Label htmlFor="o2_compressor_throughput_high" className="col-span-1 text-center">to</Label>
                    <Input id="o2_compressor_throughput_high" name="o2_compressor_throughput_high" className="col-span-1" defaultValue="350" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="mt-6 bg-[#1A3721] text-white hover:bg-[#2A4731] hover:text-[#CCFF00] transition-colors duration-200 font-semibold px-8 py-2 rounded-lg" 
                    disabled={isOptimizing}
                  >
                    {isOptimizing ? 'Submitting...' : 'Optimize'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="results">
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {selectedRun ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl font-semibold">Run Details</CardTitle>
                      <CardDescription>
                        ID: {selectedRun.operation_run_id || 'N/A'}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedRun(null)}
                      className="ml-4"
                    >
                      Back to List
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Created</h3>
                        <p className="mt-1 text-sm">{formatDate(selectedRun.created_at)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Updated</h3>
                        <p className="mt-1 text-sm">{formatDate(selectedRun.updated_at)}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRun.status)}`}>
                        {selectedRun.status}
                      </span>
                    </div>
                    {/* Additional details will be added here when the API is provided */}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">No run selected</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default withAuth(RunOptimizationPage)
//export default RunOptimizationPage