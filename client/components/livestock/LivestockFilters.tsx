import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

interface FilterCriteria {
  type?: string;
  status?: string;
  location?: string;
  ageRange?: {
    min?: string;
    max?: string;
  };
  weightRange?: {
    min?: string;
    max?: string;
  };
}

interface LivestockFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterCriteria) => void;
  currentFilters: FilterCriteria;
}

export function LivestockFilters({ isOpen, onClose, onApplyFilters, currentFilters = {} }: LivestockFiltersProps) {
  const [filters, setFilters] = useState<FilterCriteria>(currentFilters);

  const handleApply = () => {
    const processedFilters = {
      ...filters,
      type: filters.type === 'all' ? undefined : filters.type,
      status: filters.status === 'all' ? undefined : filters.status,
      location: filters.location === 'all' ? undefined : filters.location,
    };
    onApplyFilters(processedFilters);
    onClose();
  };

  const handleReset = () => {
    const emptyFilters: FilterCriteria = {};
    setFilters(emptyFilters);
    onApplyFilters(emptyFilters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-w-[95%] w-full bg-white p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Filter Livestock</DialogTitle>
          <DialogDescription>
            Apply filters to narrow down your livestock list
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <Select
              value={filters.type || 'all'}
              onValueChange={(value) => setFilters({ ...filters, type: value })}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all" className="hover:bg-gray-100">All Types</SelectItem>
                <SelectItem value="Dairy Cow" className="hover:bg-gray-100">Dairy Cow</SelectItem>
                <SelectItem value="Beef Cattle" className="hover:bg-gray-100">Beef Cattle</SelectItem>
                <SelectItem value="Sheep" className="hover:bg-gray-100">Sheep</SelectItem>
                <SelectItem value="Goat" className="hover:bg-gray-100">Goat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all" className="hover:bg-gray-100">All Statuses</SelectItem>
                <SelectItem value="Healthy" className="hover:bg-gray-100">Healthy</SelectItem>
                <SelectItem value="Under Treatment" className="hover:bg-gray-100">Under Treatment</SelectItem>
                <SelectItem value="Quarantine" className="hover:bg-gray-100">Quarantine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Location</label>
            <Select
              value={filters.location || 'all'}
              onValueChange={(value) => setFilters({ ...filters, location: value })}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all" className="hover:bg-gray-100">All Locations</SelectItem>
                <SelectItem value="Pen A" className="hover:bg-gray-100">Pen A</SelectItem>
                <SelectItem value="Pen B" className="hover:bg-gray-100">Pen B</SelectItem>
                <SelectItem value="Pen C" className="hover:bg-gray-100">Pen C</SelectItem>
                <SelectItem value="Pasture" className="hover:bg-gray-100">Pasture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Age Range (years)</label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Min age"
                value={filters.ageRange?.min || ''}
                onChange={(e) => setFilters({
                  ...filters,
                  ageRange: { ...filters.ageRange, min: e.target.value }
                })}
                className="bg-white"
              />
              <Input
                type="number"
                placeholder="Max age"
                value={filters.ageRange?.max || ''}
                onChange={(e) => setFilters({
                  ...filters,
                  ageRange: { ...filters.ageRange, max: e.target.value }
                })}
                className="bg-white"
              />
            </div>
          </div>

          {/* Weight Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Weight Range (kg)</label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Min weight"
                value={filters.weightRange?.min || ''}
                onChange={(e) => setFilters({
                  ...filters,
                  weightRange: { ...filters.weightRange, min: e.target.value }
                })}
                className="bg-white"
              />
              <Input
                type="number"
                placeholder="Max weight"
                value={filters.weightRange?.max || ''}
                onChange={(e) => setFilters({
                  ...filters,
                  weightRange: { ...filters.weightRange, max: e.target.value }
                })}
                className="bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={handleApply}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 