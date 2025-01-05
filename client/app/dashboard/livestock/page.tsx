'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Download, HeartPulse, Scale, Move, Pencil, Trash2, AlertCircle, Tags, Baby, LineChart, Leaf, DollarSign, ShieldAlert, History } from 'lucide-react';
import { FilterBar } from './components/FilterBar';
import { AnimalList } from './components/AnimalList';
import { HealthModal } from './components/HealthModal';
import { BreedingModal } from './components/BreedingModal';
import { ProductionModal } from './components/ProductionModal';
import { FeedModal } from './components/FeedModal';
import { WeightTrackingModal } from './components/WeightTrackingModal';
import { MovementModal } from './components/MovementModal';
import { QuarantineModal } from './components/QuarantineModal';
import { BatchActionsModal } from './components/BatchActionsModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ExportModal } from './components/ExportModal';
import { HistoryModal } from './components/HistoryModal';
import { EditModal } from './components/EditModal';
import { AddAnimalModal } from './components/AddAnimalModal';
import { CategoryFilter } from './components/CategoryFilter';
import { DataImportModal } from './components/DataImportModal';
import { CalendarView } from './components/CalendarView';
import { ReportingView } from './components/ReportingView';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Animal, LivestockData, LivestockStats, CategoryStats } from './types';
import { mockLivestock } from './data';
import { cn } from '@/lib/utils';
import { LivestockService } from './data';
import { useToast } from '@/components/ui/use-toast';
import { useWebSocket } from './hooks/useWebSocket';
import { AdvancedFilters as AdvancedFiltersType } from './components/AdvancedFilters';

export default function LivestockPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showHealthModal, setShowHealthModal] = React.useState(false);
  const [showBreedingModal, setShowBreedingModal] = React.useState(false);
  const [showProductionModal, setShowProductionModal] = React.useState(false);
  const [showFeedModal, setShowFeedModal] = React.useState(false);
  const [showWeightModal, setShowWeightModal] = React.useState(false);
  const [showMovementModal, setShowMovementModal] = React.useState(false);
  const [showQuarantineModal, setShowQuarantineModal] = React.useState(false);
  const [showBatchModal, setShowBatchModal] = React.useState(false);
  const [selectedAnimal, setSelectedAnimal] = React.useState<Animal | null>(null);
  const [selectedAnimals, setSelectedAnimals] = React.useState<Animal[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [showExportModal, setShowExportModal] = React.useState(false);
  const [showHistoryModal, setShowHistoryModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = React.useState(false);
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [showCalendarView, setShowCalendarView] = React.useState(false);
  const [showReportingView, setShowReportingView] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState<string>('tag');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [selectAll, setSelectAll] = React.useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);
  const [animals, setAnimals] = React.useState<Animal[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [livestockData, setLivestockData] = React.useState<LivestockData>({
    stats: {
      total: 0,
      healthy: 0,
      sick: 0,
      quarantined: 0,
      pregnant: 0,
      recentBirths: 0,
      upcomingVaccinations: 0,
      totalValue: 0,
      monthlyProduction: { milk: 0, wool: 0, meat: 0 },
      feedStock: { hay: 0, grain: 0, supplements: 0 },
    },
    categories: [],
    animals: [],
  });
  const [advancedFilters, setAdvancedFilters] = React.useState<AdvancedFiltersType | null>(null);

  // Fetch livestock data with current filters
  const fetchLivestockData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const response = await LivestockService.getAnimals({
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      status: selectedStatus !== 'all' ? selectedStatus : undefined,
      search: searchQuery || undefined,
    });

    if (response.error) {
      setError(response.error.message);
      toast({
        title: 'Error',
        description: response.error.message,
        variant: 'destructive',
      });
    } else if (response.data) {
      // Calculate stats and categories from animals data
      const stats: LivestockStats = {
        total: response.data.length,
        healthy: response.data.filter(a => a.status === 'healthy').length,
        sick: response.data.filter(a => a.status === 'sick').length,
        quarantined: response.data.filter(a => a.status === 'quarantined').length,
        pregnant: response.data.filter(a => a.reproductiveStatus === 'Pregnant').length,
        recentBirths: 0, // This would come from a separate API call
        upcomingVaccinations: 0, // This would come from a separate API call
        totalValue: response.data.reduce((sum, animal) => 
          sum + parseInt(animal.financial.currentValue.replace(/[^0-9.-]+/g, '')), 0),
        monthlyProduction: {
          milk: response.data.reduce((sum, animal) => 
            sum + (animal.production.type === 'Milk' ? 
              parseInt(animal.production.average.replace(/[^0-9.-]+/g, '')) : 0), 0),
          wool: 0, // This would come from a separate API call
          meat: 0, // This would come from a separate API call
        },
        feedStock: {
          hay: 0, // This would come from a separate API call
          grain: 0,
          supplements: 0,
        },
      };

      // Group animals by category
      const categoryGroups = response.data.reduce((groups, animal) => {
        const category = groups.find(g => g.name === animal.category);
        if (category) {
          category.count++;
        } else {
          groups.push({
            id: animal.category.toLowerCase(),
            name: animal.category,
            count: 1,
            trend: '+0%', // This would come from a separate API call
            production: {},
            feed: {
              daily: '0kg',
              cost: '$0/day',
            },
            revenue: '$0/month',
          });
        }
        return groups;
      }, [] as CategoryStats[]);

      setLivestockData({
        stats,
        categories: categoryGroups,
        animals: response.data,
      });
    }

    setIsLoading(false);
  }, [selectedCategory, selectedStatus, searchQuery, toast]);

  // Initial load
  React.useEffect(() => {
    fetchLivestockData();
  }, [fetchLivestockData]);

  // Handle add animal
  const handleAddAnimal = async (animalData: Omit<Animal, 'id'>) => {
    const response = await LivestockService.addAnimal(animalData);
    
    if (response.error) {
      toast({
        title: 'Error',
        description: response.error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Animal added successfully',
      });
      fetchLivestockData();
      setShowAddModal(false);
    }
  };

  // Handle delete animal
  const handleDeleteAnimal = async (id: string) => {
    const response = await LivestockService.deleteAnimal(id);
    
    if (response.error) {
      toast({
        title: 'Error',
        description: response.error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Animal deleted successfully',
      });
      fetchLivestockData();
      setShowDeleteConfirm(false);
    }
  };

  // Handle batch update
  const handleBatchUpdate = async (ids: string[], updates: Partial<Animal>) => {
    const response = await LivestockService.batchUpdateAnimals(ids, updates);
    
    if (response.error) {
      toast({
        title: 'Error',
        description: response.error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Animals updated successfully',
      });
      fetchLivestockData();
      setShowBatchModal(false);
    }
  };

  // Handle export
  const handleExport = async (format: 'csv' | 'excel') => {
    const response = await LivestockService.exportAnimals(format);
    
    if (response.error) {
      toast({
        title: 'Error',
        description: response.error.message,
        variant: 'destructive',
      });
    } else if (response.data) {
      const url = URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `livestock-export.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Handle import
  const handleImport = async (file: File) => {
    const response = await LivestockService.importAnimals(file);
    
    if (response.error) {
      toast({
        title: 'Error',
        description: response.error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Successfully imported ${response.data?.count} animals`,
      });
      fetchLivestockData();
    }
  };

  React.useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  // WebSocket integration
  useWebSocket({
    onAnimalAdded: (animal) => {
      toast({
        title: 'Animal Added',
        description: `New animal ${animal.tag} has been added.`,
      });
      fetchLivestockData();
    },
    onAnimalUpdated: (animal) => {
      toast({
        title: 'Animal Updated',
        description: `Animal ${animal.tag} has been updated.`,
      });
      fetchLivestockData();
    },
    onAnimalDeleted: (animalId) => {
      toast({
        title: 'Animal Deleted',
        description: 'An animal has been removed from the system.',
      });
      fetchLivestockData();
    },
    onBatchUpdated: (animalIds, updates) => {
      toast({
        title: 'Batch Update',
        description: `${animalIds.length} animals have been updated.`,
      });
      fetchLivestockData();
    },
    onDataUpdated: (data) => {
      setLivestockData(data);
      toast({
        title: 'Data Updated',
        description: 'Livestock data has been updated.',
      });
    },
  });

  if (status === 'loading' || isLoading) {
    return <LoadingScreen />;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSelectAnimal = (animal: Animal, checked: boolean) => {
    if (checked) {
      setSelectedAnimals([...selectedAnimals, animal]);
    } else {
      setSelectedAnimals(selectedAnimals.filter(a => a.id !== animal.id));
    }
  };

  const onHealthClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowHealthModal(true);
  };

  const onWeightClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowWeightModal(true);
  };

  const onMovementClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowMovementModal(true);
  };

  const onEditClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowEditModal(true);
  };

  const onDeleteClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowDeleteConfirm(true);
  };

  // Filter livestock based on search and advanced filters
  const filteredLivestock = React.useMemo(() => {
    return livestockData.animals.filter((animal: Animal) => {
      // Basic filters
      const matchesSearch = 
        searchQuery === '' ||
        animal.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.notes.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' ||
        animal.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesStatus = 
        selectedStatus === 'all' ||
        animal.status.toLowerCase() === selectedStatus.toLowerCase();

      // Advanced filters
      if (!advancedFilters) {
        return matchesSearch && matchesCategory && matchesStatus;
      }

      // Date range
      const animalDate = new Date(animal.lastCheckup);
      const startDate = advancedFilters.dateRange.start ? new Date(advancedFilters.dateRange.start) : null;
      const endDate = advancedFilters.dateRange.end ? new Date(advancedFilters.dateRange.end) : null;
      const matchesDateRange = 
        (!startDate || animalDate >= startDate) &&
        (!endDate || animalDate <= endDate);

      // Age range
      const age = parseInt(animal.age);
      const matchesAgeRange =
        (!advancedFilters.ageRange.min || age >= parseInt(advancedFilters.ageRange.min)) &&
        (!advancedFilters.ageRange.max || age <= parseInt(advancedFilters.ageRange.max));

      // Weight range
      const weight = parseInt(animal.weight);
      const matchesWeightRange =
        (!advancedFilters.weightRange.min || weight >= parseInt(advancedFilters.weightRange.min)) &&
        (!advancedFilters.weightRange.max || weight <= parseInt(advancedFilters.weightRange.max));

      // Health status
      const matchesHealthStatus =
        advancedFilters.healthStatus.length === 0 ||
        advancedFilters.healthStatus.includes(animal.status);

      // Breeding status
      const matchesBreedingStatus =
        advancedFilters.breedingStatus.length === 0 ||
        advancedFilters.breedingStatus.includes(animal.reproductiveStatus);

      // Production level
      const matchesProductionLevel =
        !advancedFilters.productionLevel ||
        animal.production.type.toLowerCase() === advancedFilters.productionLevel.toLowerCase();

      // Location
      const matchesLocation =
        !advancedFilters.location ||
        animal.location.toLowerCase() === advancedFilters.location.toLowerCase();

      // Tags
      const matchesTags =
        advancedFilters.tags.length === 0 ||
        advancedFilters.tags.some(tag => 
          animal.tag.toLowerCase().includes(tag.toLowerCase())
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesDateRange &&
        matchesAgeRange &&
        matchesWeightRange &&
        matchesHealthStatus &&
        matchesBreedingStatus &&
        matchesProductionLevel &&
        matchesLocation &&
        matchesTags
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedStatus,
    advancedFilters,
    livestockData.animals
  ]);

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedAnimals(filteredLivestock);
    } else {
      setSelectedAnimals([]);
    }
  };

  // Filter and sort livestock
  const sortedLivestock = React.useMemo(() => {
    return [...filteredLivestock].sort((a, b) => {
      const aValue = a[sortField as keyof Animal];
      const bValue = b[sortField as keyof Animal];
      if (sortDirection === 'asc') {
        return (aValue ?? '') > (bValue ?? '') ? 1 : -1;
      }
      return (aValue ?? '') < (bValue ?? '') ? 1 : -1;
    });
  }, [filteredLivestock, sortField, sortDirection]);

  // Paginate livestock
  const paginatedLivestock = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedLivestock.slice(start, start + pageSize);
  }, [sortedLivestock, page, pageSize]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedLivestock.length / pageSize);

  return (
    <div className="space-y-4 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Livestock Management</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Animal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Animals</span>
            <LineChart className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">{livestockData.stats.total}</p>
        </Card>
        {/* ... other stat cards ... */}
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        categories={livestockData.categories}
        onAdvancedFilters={setAdvancedFilters}
      />

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <AnimalList
        data={livestockData.animals}
        onSelect={setSelectedAnimal}
        onSelectMultiple={setSelectedAnimals}
        selected={selectedAnimals}
      />

      {/* ... modals ... */}
    </div>
  );
} 