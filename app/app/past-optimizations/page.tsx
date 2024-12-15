'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const optimizationResult = {
  id: "OPT-001",
  date: "2024-01-20",
  status: "Completed",
  input_data: {
    client_h2flowrate: '0',
    client_h2flowhours: '24',
    supplyPressureVsEL: 'High',
    projectLifetime: '20',
    contractCurrency: 'INR',
    o2MarketSellClientOfftake: 'Yes',
    o2MarketSellLimit: '999999999',
    excessProductionH2Merchant: 'Yes',
    excessProductionH2MerchantLimit: '999999999',
    injectExcessPower: 'Yes',
    drawPowerFromClient: 'Yes',
    electrolyzerType: 'AEC',
    electrolyzerstackConversion100Percent: '4.6350',
    electrolyzerstackConversionMinTurndown: '3.744',
    stackMinTurndownratio: '0.2',
    stackefficiencydegradation: '0.00916667',
    stackLifetime: '82000',
    TotalAuxRatedPowerDuringOperating: '156',
    TotalAuxRatedPowerOutsideOperating: '42',
    BatteryroundtripEfficiency: '0.85',
    BatteryLife: '11',
    BatteryCapacityAnnualDegradation: '0.0235',
    PvType: 'Mono',
    PVOutputAnnualDegradation: '0.005',
    PvPlacement: 'GM'
  },
  optimized_parameters: [
    { name: 'PV DC Size', value: 7.5000, unit: 'MW' },
    { name: 'Inverter AC Size', value: 6.0000, unit: 'MW' },
    { name: 'Wind Size', value: 4.0664, unit: 'MW' },
    { name: 'Power Evacuation', value: 6.0000, unit: 'MW' },
    { name: 'LTOA Size', value: 0.0000, unit: 'MW' },
    { name: 'Electrolyser Size', value: 3.2445, unit: 'MW' },
    { name: 'Battery Size', value: 857.71, unit: 'kWh' },
    { name: 'Low Pressure Storage', value: 215.00, unit: 'kg' },
    { name: 'High Pressure Storage', value: 12000.00, unit: 'kg' },
    { name: 'H2 Compressor Units', value: 1.00, unit: 'units' },
    { name: 'H2 Compressor Throughput', value: 700.00, unit: 'kg/day' },
    { name: 'O2 Storage', value: 106.00, unit: 'kg' },
    { name: 'O2 Compressor Units', value: 1.00, unit: 'units' },
    { name: 'O2 Compressor Throughput', value: 350.00, unit: 'kg/day' }
  ]
};

export default function PastOptimizationsPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Optimization Details - {optimizationResult.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1A3721] text-white p-4 rounded-lg">
                <h3 className="text-[#CCFF00] font-semibold mb-2">Status</h3>
                <p>{optimizationResult.status}</p>
              </div>
              <div className="bg-[#1A3721] text-white p-4 rounded-lg">
                <h3 className="text-[#CCFF00] font-semibold mb-2">Date</h3>
                <p>{optimizationResult.date}</p>
              </div>
              <div className="bg-[#1A3721] text-white p-4 rounded-lg">
                <h3 className="text-[#CCFF00] font-semibold mb-2">Project ID</h3>
                <p>{optimizationResult.id}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="optimized">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="optimized">Optimized Parameters</TabsTrigger>
              <TabsTrigger value="input">Input Parameters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="optimized">
              <Card>
                <CardHeader>
                  <CardTitle>Optimized Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Unit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {optimizationResult.optimized_parameters.map((param, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{param.name}</TableCell>
                          <TableCell>{param.value.toFixed(2)}</TableCell>
                          <TableCell>{param.unit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="input">
              <Card>
                <CardHeader>
                  <CardTitle>Input Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(optimizationResult.input_data).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium">
                            {key.split(/(?=[A-Z])/).join(' ')}
                          </TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 