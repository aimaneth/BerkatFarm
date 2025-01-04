import { Download, Filter } from 'lucide-react';
import { useState } from 'react';

interface ChartControlsProps {
  onTimeRangeChange?: (range: string) => void;
  onExport?: () => void;
  timeRanges?: string[];
  showExport?: boolean;
  showFilter?: boolean;
}

export function ChartControls({ 
  onTimeRangeChange,
  onExport,
  timeRanges = ['7d', '30d', '90d', '1y'],
  showExport = true,
  showFilter = true
}: ChartControlsProps) {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0]);

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    onTimeRangeChange?.(range);
  };

  return (
    <div className="flex items-center justify-end space-x-2 mb-4">
      {showFilter && (
        <div className="flex items-center space-x-1">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedRange}
            onChange={(e) => handleRangeChange(e.target.value)}
            className="text-sm border-0 bg-transparent focus:ring-0 text-gray-500 font-medium"
          >
            {timeRanges.map((range) => (
              <option key={range} value={range}>
                Last {range}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {showExport && (
        <button
          onClick={onExport}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          title="Export data"
        >
          <Download className="h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
  );
} 