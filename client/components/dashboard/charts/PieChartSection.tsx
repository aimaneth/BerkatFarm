import { ChartData } from '@/types/dashboard';
import { COLORS, CHART_CONFIG } from '@/lib/constants/theme';
import { ChartContainer } from './ChartContainer';
import { CustomTooltip } from './CustomTooltip';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PieChartSectionProps {
  title: string;
  data: ChartData[];
  colors?: string[];
  isLoading?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  emptyMessage?: string;
  loadingMessage?: string;
}

export function PieChartSection({ 
  title, 
  data, 
  colors = [COLORS.success, COLORS.secondary],
  isLoading,
  valuePrefix,
  valueSuffix,
  emptyMessage = "No data available",
  loadingMessage = "Loading chart data..."
}: PieChartSectionProps) {
  return (
    <ErrorBoundary>
      <ChartContainer 
        title={title} 
        isEmpty={data.length === 0} 
        isLoading={isLoading}
        emptyMessage={emptyMessage}
        loadingMessage={loadingMessage}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={CHART_CONFIG.innerRadius}
              outerRadius={CHART_CONFIG.outerRadius}
              paddingAngle={CHART_CONFIG.paddingAngle}
              animationDuration={750}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  strokeWidth={1}
                  stroke={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip valuePrefix={valuePrefix} valueSuffix={valueSuffix} />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ErrorBoundary>
  );
} 