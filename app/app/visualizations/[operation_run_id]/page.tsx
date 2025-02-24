'use client';

import { useParams } from 'next/navigation';
import { OptimizationVisualizations } from '@/components/OptimizationVisualizations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { withAuth } from '../../../form/authWrapper';

const VisualizationsPage = () => {
  const params = useParams();
  const operationRunId = params.operation_run_id as string;

  return (
    <div className="container mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Optimization Visualizations</h1>
        <Button variant="outline" asChild>
          <Link href="/app/past-optimizations">
            Back to Optimizations
          </Link>
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow">
        <OptimizationVisualizations operationRunId={operationRunId} />
      </div>
    </div>
  );
};

export default withAuth(VisualizationsPage); 