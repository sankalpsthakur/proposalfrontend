import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FinancialModelSummaryProps {
  model: {
    name: string;
    description: string;
    components?: string[];
  };
  customInputs?: Record<string, string>;
}

export function FinancialModelSummary({ model, customInputs }: FinancialModelSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected Financial Model: {model.name}</CardTitle>
        <CardDescription>{model.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {model.components && model.components.length > 0 && (
            <div>
              <h4 className="font-medium">Key Components:</h4>
              <ul className="list-disc list-inside text-sm">
                {model.components.map((component, index) => (
                  <li key={index}>{component}</li>
                ))}
              </ul>
            </div>
          )}
          {customInputs && Object.keys(customInputs).length > 0 && (
            <div>
              <h4 className="font-medium">Custom Parameters:</h4>
              <ul className="list-disc list-inside text-sm">
                {Object.entries(customInputs).map(([key, value]) => (
                  <li key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

