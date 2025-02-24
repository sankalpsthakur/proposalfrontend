'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from 'next/image';

interface OptimizationVisualizationsProps {
  operationRunId: string;
}

interface VisualizationUrls {
  scatter_plot_3d?: string;
  surface_plot_3d?: string;
  contour_plot_2d?: string;
  parallel_coordinates?: string;
  top_parameters_heatmap?: string;
  [key: string]: string | undefined;
}

export function OptimizationVisualizations({ operationRunId }: OptimizationVisualizationsProps) {
  const [visualizations, setVisualizations] = useState<VisualizationUrls>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("surface-plot");
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [optimizationHistory, setOptimizationHistory] = useState<any>(null);

  const fetchVisualizations = async () => {
    if (!operationRunId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/optimizationVisualizations/${operationRunId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setVisualizations(data);
      
      // Fetch history data as well
      const historyResponse = await fetch(`/api/optimizationHistory/${operationRunId}`);
      
      if (historyResponse.ok) {
        const historyData = await historyResponse.json();
        setOptimizationHistory(historyData);
      }
      
    } catch (error) {
      console.error('Error fetching visualizations:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVisualizations();
  }, [operationRunId]);

  const visualizationTitles: Record<string, string> = {
    'scatter_plot_3d': '3D Scatter Plot',
    'surface_plot_3d': '3D Surface Plot',
    'contour_plot_2d': '2D Contour Plot',
    'parallel_coordinates': 'Parallel Coordinates',
    'top_parameters_heatmap': 'Top Parameters Heatmap'
  };
  
  const visualizationDescriptions: Record<string, string> = {
    'scatter_plot_3d': 'Shows the relationship between three parameters and their impact on IRR.',
    'surface_plot_3d': 'A smooth interpolated surface showing the IRR landscape across parameter space.',
    'contour_plot_2d': 'A 2D representation of the parameter space with IRR contours.',
    'parallel_coordinates': 'Visualizes all dimensions simultaneously to identify patterns.',
    'top_parameters_heatmap': 'Displays the top 20 parameter combinations by IRR value.'
  };

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Optimization Visualizations</CardTitle>
          <CardDescription>
            Visual representations of the optimization parameter space
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-[400px] w-full rounded-md" />
              <div className="flex space-x-2">
                <Skeleton className="h-10 w-20 rounded-md" />
                <Skeleton className="h-10 w-20 rounded-md" />
                <Skeleton className="h-10 w-20 rounded-md" />
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
              <p className="font-semibold">Error loading visualizations</p>
              <p>{error}</p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={fetchVisualizations}
              >
                Retry
              </Button>
            </div>
          ) : Object.keys(visualizations).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No visualizations available for this optimization.</p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={fetchVisualizations}
              >
                Refresh
              </Button>
            </div>
          ) : (
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="surface-plot">3D Surface</TabsTrigger>
                <TabsTrigger value="scatter-plot">3D Scatter</TabsTrigger>
                <TabsTrigger value="contour-plot">Contour Plot</TabsTrigger>
                <TabsTrigger value="parallel-coords">Parallel Coords</TabsTrigger>
                <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              </TabsList>
              
              <TabsContent value="surface-plot" className="mt-0">
                <VisualizationCard 
                  title={visualizationTitles['surface_plot_3d']}
                  description={visualizationDescriptions['surface_plot_3d']}
                  visualizationUrl={`/api/optimizationVisualization/${operationRunId}/${visualizations.surface_plot_3d}`}
                />
              </TabsContent>
              
              <TabsContent value="scatter-plot" className="mt-0">
                <VisualizationCard 
                  title={visualizationTitles['scatter_plot_3d']}
                  description={visualizationDescriptions['scatter_plot_3d']}
                  visualizationUrl={`/api/optimizationVisualization/${operationRunId}/${visualizations.scatter_plot_3d}`}
                />
              </TabsContent>
              
              <TabsContent value="contour-plot" className="mt-0">
                <VisualizationCard 
                  title={visualizationTitles['contour_plot_2d']}
                  description={visualizationDescriptions['contour_plot_2d']}
                  visualizationUrl={`/api/optimizationVisualization/${operationRunId}/${visualizations.contour_plot_2d}`}
                />
              </TabsContent>
              
              <TabsContent value="parallel-coords" className="mt-0">
                <VisualizationCard 
                  title={visualizationTitles['parallel_coordinates']}
                  description={visualizationDescriptions['parallel_coordinates']}
                  visualizationUrl={`/api/optimizationVisualization/${operationRunId}/${visualizations.parallel_coordinates}`}
                />
              </TabsContent>
              
              <TabsContent value="heatmap" className="mt-0">
                <VisualizationCard 
                  title={visualizationTitles['top_parameters_heatmap']}
                  description={visualizationDescriptions['top_parameters_heatmap']}
                  visualizationUrl={`/api/optimizationVisualization/${operationRunId}/${visualizations.top_parameters_heatmap}`}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {optimizationHistory && (
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Optimization History</CardTitle>
              <CardDescription>
                History of parameter iterations and IRR values
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setHistoryExpanded(!historyExpanded)}
            >
              {historyExpanded ? "Collapse" : "Expand"}
            </Button>
          </CardHeader>
          <CardContent>
            {historyExpanded ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Iteration
                      </th>
                      {optimizationHistory.columns.map((column: string) => (
                        <th 
                          key={column}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {optimizationHistory.data.map((row: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        {optimizationHistory.columns.map((column: string) => (
                          <td 
                            key={`${index}-${column}`}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {typeof row[column] === 'number' 
                              ? row[column].toFixed(4) 
                              : row[column]?.toString() || 'N/A'
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-2">
                <p>Optimization completed with {optimizationHistory.data.length} iterations.</p>
                <p>Best IRR: <span className="font-medium">{optimizationHistory.best_irr?.toFixed(4) || 'N/A'}</span></p>
                <Button 
                  variant="outline" 
                  onClick={() => setHistoryExpanded(true)}
                >
                  View Full History
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function VisualizationCard({ 
  title, 
  description, 
  visualizationUrl 
}: { 
  title: string, 
  description: string, 
  visualizationUrl: string 
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="relative h-[500px] w-full">
          <img 
            src={visualizationUrl} 
            alt={title}
            className="object-contain w-full h-full"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      </CardContent>
    </Card>
  );
} 