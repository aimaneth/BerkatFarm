import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

export interface MetricProps {
  key: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
}

export function DashboardMetrics({ metrics }: { metrics: MetricProps[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.key} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.key}</p>
              <h3 className="text-2xl font-bold">{metric.value}</h3>
              {metric.change && (
                <p
                  className={`text-sm ${
                    metric.changeType === 'positive'
                      ? 'text-green-600'
                      : metric.changeType === 'negative'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {metric.change}
                </p>
              )}
            </div>
            {metric.icon && <div>{metric.icon}</div>}
          </div>
        </Card>
      ))}
    </div>
  );
} 