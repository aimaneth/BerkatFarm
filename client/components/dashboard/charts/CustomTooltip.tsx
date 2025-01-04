import { TooltipProps } from 'recharts';
import { Card } from '@/components/ui/Card';

interface CustomTooltipProps extends TooltipProps<number, string> {
  valuePrefix?: string;
  valueSuffix?: string;
}

export function CustomTooltip({ 
  active, 
  payload, 
  valuePrefix = "", 
  valueSuffix = "" 
}: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0];
  return (
    <Card className="bg-white/95 backdrop-blur p-2 shadow-lg border-0">
      <p className="text-sm font-medium text-gray-900">
        {data.name}
      </p>
      <p className="text-sm text-gray-500">
        {valuePrefix}
        {typeof data.value === 'number' 
          ? data.value.toLocaleString()
          : data.value}
        {valueSuffix}
      </p>
    </Card>
  );
} 