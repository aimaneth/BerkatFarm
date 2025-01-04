import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { ChartControls } from './ChartControls';
import { ChartLegend } from './ChartLegend';
import { CHART_PRESETS } from '@/lib/constants/chartPresets';

interface LegendItem {
  name: string;
  value: number | string;
  color: string;
}

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  isEmpty?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  className?: string;
  legendItems?: LegendItem[];
  onTimeRangeChange?: (range: string) => void;
  onExport?: () => void;
  showControls?: boolean;
  showLegend?: boolean;
}

export function ChartContainer({
  title,
  children,
  isEmpty = false,
  isLoading = false,
  emptyMessage = "No data available",
  loadingMessage = "Loading chart data...",
  className = "h-[300px]",
  legendItems,
  onTimeRangeChange,
  onExport,
  showControls = true,
  showLegend = true
}: ChartContainerProps) {
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export functionality
      console.log('Exporting chart data...');
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {showControls && (
          <ChartControls
            onTimeRangeChange={onTimeRangeChange}
            onExport={handleExport}
          />
        )}
      </div>

      <div className={className}>
        {isLoading ? (
          <LoadingState message={loadingMessage} className={className} />
        ) : isEmpty ? (
          <EmptyState message={emptyMessage} className={className} />
        ) : (
          children
        )}
      </div>

      {showLegend && legendItems && legendItems.length > 0 && (
        <ChartLegend items={legendItems} className="mt-4 pt-4 border-t" />
      )}
    </Card>
  );
} 