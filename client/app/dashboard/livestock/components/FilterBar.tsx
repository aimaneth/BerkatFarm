import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/Button';
import { Filter } from 'lucide-react';
import { CategoryStats } from '../types';
import { AdvancedFilters, AdvancedFilters as AdvancedFiltersType } from './AdvancedFilters';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  categories: CategoryStats[];
  onAdvancedFilters: (filters: AdvancedFiltersType) => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  categories,
  onAdvancedFilters,
}: FilterBarProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleAdvancedFilters = (filters: AdvancedFiltersType) => {
    onAdvancedFilters(filters);
    setShowAdvancedFilters(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search animals..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-[200px]">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border shadow-md">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[200px]">
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border shadow-md">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="sick">Sick</SelectItem>
              <SelectItem value="quarantined">Quarantined</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(true)}
          className="w-[200px]"
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={handleAdvancedFilters}
      />
    </>
  );
} 