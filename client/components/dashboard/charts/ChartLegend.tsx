interface LegendItem {
  name: string;
  value: number | string;
  color: string;
}

interface ChartLegendProps {
  items: LegendItem[];
  className?: string;
}

export function ChartLegend({ items, className = "" }: ChartLegendProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-gray-600">
            {item.name}
            {item.value && (
              <span className="ml-1 font-medium text-gray-900">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
} 