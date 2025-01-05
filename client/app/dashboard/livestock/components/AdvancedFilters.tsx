import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/Card';
import { Filter, X, Check } from 'lucide-react';
import { Animal } from '../types';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: AdvancedFilters) => void;
}

export interface AdvancedFilters {
  dateRange: {
    start: string;
    end: string;
  };
  ageRange: {
    min: string;
    max: string;
  };
  weightRange: {
    min: string;
    max: string;
  };
  healthStatus: string[];
  breedingStatus: string[];
  productionLevel: string;
  location: string;
  tags: string[];
}

export function AdvancedFilters({ isOpen, onClose, onApplyFilters }: AdvancedFiltersProps) {
  const [filters, setFilters] = React.useState<AdvancedFilters>({
    dateRange: { start: '', end: '' },
    ageRange: { min: '', max: '' },
    weightRange: { min: '', max: '' },
    healthStatus: [],
    breedingStatus: [],
    productionLevel: '',
    location: '',
    tags: [],
  });

  const [tag, setTag] = React.useState('');

  const handleAddTag = () => {
    if (tag && !filters.tags.includes(tag)) {
      setFilters(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove),
    }));
  };

  const handleHealthStatusChange = (status: string) => {
    setFilters(prev => ({
      ...prev,
      healthStatus: prev.healthStatus.includes(status)
        ? prev.healthStatus.filter(s => s !== status)
        : [...prev.healthStatus, status],
    }));
  };

  const handleBreedingStatusChange = (status: string) => {
    setFilters(prev => ({
      ...prev,
      breedingStatus: prev.breedingStatus.includes(status)
        ? prev.breedingStatus.filter(s => s !== status)
        : [...prev.breedingStatus, status],
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30 fixed inset-0" />
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border shadow-xl backdrop-blur-sm rounded-lg p-6 z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date Range */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Date Range</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm">Start Date</label>
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value },
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">End Date</label>
                <Input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value },
                  }))}
                />
              </div>
            </div>
          </Card>

          {/* Age and Weight Range */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Age and Weight</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Age Range (months)</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.ageRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      ageRange: { ...prev.ageRange, min: e.target.value },
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.ageRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      ageRange: { ...prev.ageRange, max: e.target.value },
                    }))}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Weight Range (kg)</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.weightRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      weightRange: { ...prev.weightRange, min: e.target.value },
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.weightRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      weightRange: { ...prev.weightRange, max: e.target.value },
                    }))}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Health and Breeding Status */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Health and Breeding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Health Status</h4>
                <div className="flex flex-wrap gap-2">
                  {['Healthy', 'Sick', 'Quarantined', 'Under Treatment'].map(status => (
                    <Button
                      key={status}
                      variant={filters.healthStatus.includes(status) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleHealthStatusChange(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Breeding Status</h4>
                <div className="flex flex-wrap gap-2">
                  {['Available', 'Pregnant', 'Nursing', 'Resting'].map(status => (
                    <Button
                      key={status}
                      variant={filters.breedingStatus.includes(status) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleBreedingStatusChange(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Production and Location */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Production and Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm">Production Level</label>
                <Select
                  value={filters.productionLevel}
                  onValueChange={(value) => setFilters(prev => ({
                    ...prev,
                    productionLevel: value,
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm">Location</label>
                <Select
                  value={filters.location}
                  onValueChange={(value) => setFilters(prev => ({
                    ...prev,
                    location: value,
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barn1">Barn 1</SelectItem>
                    <SelectItem value="barn2">Barn 2</SelectItem>
                    <SelectItem value="pasture">Pasture</SelectItem>
                    <SelectItem value="quarantine">Quarantine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Tags</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.tags.map(tag => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>
            <Check className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 