import { ChartData } from '@/types/dashboard';
import { COLORS, CHART_CONFIG } from '@/lib/constants/theme';
import { CHART_PRESETS } from '@/lib/constants/chartPresets';
import { ChartContainer } from './ChartContainer';
import { CustomTooltip } from './CustomTooltip';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface LineChartSectionProps {
  title: string;
  data: ChartData[];
  isLoading?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  onTimeRangeChange?: (range: string) => void;
}

export function LineChartSection({ 
  title, 
  data,
  isLoading,
  valuePrefix,
  valueSuffix,
  emptyMessage = "No data available",
  loadingMessage = "Loading chart data...",
  onTimeRangeChange
}: LineChartSectionProps) {
  const { line: linePreset, common: commonPreset } = CHART_PRESETS;

  const legendItems = [
    {
      name: 'Value',
      value: data.length > 0 ? data[data.length - 1].value : 0,
      color: linePreset.stroke
    }
  ];

  const handleExport = () => {
    // Export chart data as CSV
    const csvContent = [
      ['Date', 'Value'],
      ...data.map(item => [item.name, item.value])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.csv`;
    link.click();
  };

  return (
    <ErrorBoundary>
      <ChartContainer 
        title={title} 
        isEmpty={data.length === 0} 
        isLoading={isLoading}
        emptyMessage={emptyMessage}
        loadingMessage={loadingMessage}
        legendItems={legendItems}
        onTimeRangeChange={onTimeRangeChange}
        onExport={handleExport}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray={commonPreset.grid.strokeDasharray} 
              stroke={commonPreset.grid.stroke}
            />
            <XAxis 
              dataKey="name" 
              stroke={commonPreset.axis.stroke}
              fontSize={commonPreset.axis.fontSize}
            />
            <YAxis 
              stroke={commonPreset.axis.stroke}
              fontSize={commonPreset.axis.fontSize}
            />
            <Tooltip content={<CustomTooltip valuePrefix={valuePrefix} valueSuffix={valueSuffix} />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={linePreset.stroke}
              strokeWidth={linePreset.strokeWidth}
              dot={linePreset.dot}
              activeDot={linePreset.activeDot}
              animationDuration={linePreset.animationDuration}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ErrorBoundary>
  );
} 