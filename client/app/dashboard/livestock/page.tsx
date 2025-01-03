'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Download,
  Upload,
  Printer,
} from 'lucide-react';
import { FeedManagement } from '@/components/livestock/FeedManagement';
import { FinancialMetrics } from '@/components/livestock/FinancialMetrics';
import { Documentation } from '@/components/livestock/Documentation';
import { AdvancedAnalytics } from '@/components/livestock/AdvancedAnalytics';
import { MobileFeatures } from '@/components/livestock/MobileFeatures';
import { Automation } from '@/components/livestock/Automation';
import { LivestockForm } from '@/components/livestock/LivestockForm';
import { LivestockDetails } from '@/components/livestock/LivestockDetails';
import { LivestockFilters } from '@/components/livestock/LivestockFilters';
import { showNotification } from "@/lib/notifications";
import { PrintTemplate } from '@/components/livestock/PrintTemplate';
import { exportToCSV, parseCSV } from '@/utils/csv';
import { livestockApi, Livestock } from '@/services/livestock';
import { socketService } from '@/services/socket';

interface Livestock {
  id: string;
  tag: string;
  type: string;
  breed: string;
  status: string;
  age: string;
  weight: string;
  location: string;
  lastCheckup: string;
  nextCheckup: string;
  purchaseDate?: string;
  purchasePrice?: string;
  notes?: string;
}

export default function LivestockPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Livestock | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [livestockData, setLivestockData] = useState<Livestock[]>([]);
  const [filteredData, setFilteredData] = useState<Livestock[]>([]);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch initial data
  useEffect(() => {
    fetchLivestockData();
    setupSocketListeners();

    return () => {
      socketService.disconnect();
    };
  }, []);

  const setupSocketListeners = () => {
    const socket = socketService.connect();

    socketService.subscribe('livestock:created', (data: Livestock) => {
      setLivestockData(prev => [...prev, data]);
      toast({
        title: "New Animal Added",
        description: `${data.tag} has been added to the inventory.`,
        variant: "info",
      });
    });

    socketService.subscribe('livestock:updated', (data: Livestock) => {
      setLivestockData(prev => 
        prev.map(item => item.id === data.id ? data : item)
      );
      toast({
        title: "Animal Updated",
        description: `${data.tag}'s information has been updated.`,
        variant: "info",
      });
    });

    socketService.subscribe('livestock:deleted', (id: number) => {
      setLivestockData(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Animal Removed",
        description: "The animal has been removed from the inventory.",
        variant: "info",
      });
    });

    socketService.subscribe('livestock:batch-created', (data: Livestock[]) => {
      setLivestockData(prev => [...prev, ...data]);
      toast({
        title: "Batch Import Complete",
        description: `${data.length} animals have been added to the inventory.`,
        variant: "success",
      });
    });
  };

  const fetchLivestockData = async () => {
    try {
      setIsLoading(true);
      const data = await livestockApi.getAll();
      setLivestockData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching livestock data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch livestock data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, activeFilters);
  };

  const applyFilters = (query: string, filters: any) => {
    let filtered = [...livestockData];

    // Apply search query
    if (query) {
      filtered = filtered.filter(animal => 
        animal.tag.toLowerCase().includes(query.toLowerCase()) ||
        animal.type.toLowerCase().includes(query.toLowerCase()) ||
        animal.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply filters
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(animal => animal.type === filters.type);
    }
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(animal => animal.status === filters.status);
    }
    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(animal => animal.location === filters.location);
    }
    if (filters.ageRange) {
      if (filters.ageRange.min) {
        filtered = filtered.filter(animal => 
          parseInt(animal.age) >= parseInt(filters.ageRange.min)
        );
      }
      if (filters.ageRange.max) {
        filtered = filtered.filter(animal => 
          parseInt(animal.age) <= parseInt(filters.ageRange.max)
        );
      }
    }
    if (filters.weightRange) {
      if (filters.weightRange.min) {
        filtered = filtered.filter(animal => 
          parseInt(animal.weight) >= parseInt(filters.weightRange.min)
        );
      }
      if (filters.weightRange.max) {
        filtered = filtered.filter(animal => 
          parseInt(animal.weight) <= parseInt(filters.weightRange.max)
        );
      }
    }

    setFilteredData(filtered);
  };

  const handleAdd = async (formData: Omit<Livestock, 'id'>) => {
    try {
      // Generate a unique ID for the new livestock
      const newData: Livestock = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      // Add livestock logic here
      showNotification({
        title: "Livestock Added",
        message: "New livestock has been added successfully.",
        type: "success"
      });
      return newData;
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to add livestock. Please try again.",
        type: "error"
      });
      throw error;
    }
  };

  const handleEditAnimal = async (data: Livestock) => {
    try {
      await livestockApi.update(data.id, data);
      showNotification({
        title: "Animal Updated",
        message: `Successfully updated ${data.tag}'s information.`,
        type: "success"
      });
      setIsEditModalOpen(false);
      setSelectedAnimal(null);
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to update animal information. Please try again.",
        type: "error"
      });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      const result = await new Promise<string>((resolve, reject) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      });
      
      const data = parseCSV(result);
      // Process the data
      showNotification({
        title: "Import Successful",
        message: `Successfully imported ${data.length} records.`,
        type: "success"
      });
    } catch (error) {
      showNotification({
        title: "Import Failed",
        message: "Failed to import data. Please check your file format.",
        type: "error"
      });
    }
  };

  const handleExport = async () => {
    try {
      await exportToCSV(filteredData, 'livestock-data.csv');
      showNotification({
        title: "Export Successful",
        message: "Data has been exported to CSV.",
        type: "success"
      });
    } catch (error) {
      showNotification({
        title: "Export Failed",
        message: "Failed to export data. Please try again.",
        type: "error"
      });
    }
  };

  const handleViewDetails = (animal: Livestock) => {
    setSelectedAnimal(animal);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (animal: Livestock) => {
    setSelectedAnimal(animal);
    setIsEditModalOpen(true);
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  const handlePrint = () => {
    try {
      // Print logic here
      showNotification({
        title: "Print Ready",
        message: "Your document is ready for printing.",
        type: "success"
      });
    } catch (error) {
      console.error('Print error:', error);
      showNotification({
        title: "Print Failed",
        message: "Failed to prepare document for printing. Please try again.",
        type: "error"
      });
    }
  };

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters);
    applyFilters(searchQuery, filters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Livestock Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your livestock inventory, health records, and analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsFiltersOpen(true)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {Object.keys(activeFilters).length > 0 && (
              <span className="ml-2 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center">
                {Object.keys(activeFilters).length}
              </span>
            )}
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Animal
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 sm:p-6 bg-white">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by tag, type, or location..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".csv"
              onChange={handleImport}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={triggerImport}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrint}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="border-b border-gray-200">
          <div className="scrollbar-none overflow-x-auto">
            <TabsList className="w-full flex-none inline-flex min-w-full">
              <div className="flex gap-2 p-1">
                <TabsTrigger value="overview" className="flex items-center gap-2 whitespace-nowrap hover:bg-gray-100">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="feed" className="flex items-center gap-2 whitespace-nowrap hover:bg-gray-100">
                  Feed Management
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center gap-2 whitespace-nowrap hover:bg-gray-100">
                  Health Records
                </TabsTrigger>
                <TabsTrigger value="financial" className="flex items-center gap-2 whitespace-nowrap hover:bg-gray-100">
                  Financial
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2 whitespace-nowrap hover:bg-gray-100">
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="automation" className="flex items-center gap-2 whitespace-nowrap hover:bg-gray-100">
                  Automation
                </TabsTrigger>
              </div>
            </TabsList>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.map((animal) => (
              <Card key={animal.id} className="p-6 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {animal.tag}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        animal.status === 'Healthy'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {animal.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(animal)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(animal)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Type</p>
                      <p className="text-sm font-medium text-gray-900">{animal.type}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Breed</p>
                      <p className="text-sm font-medium text-gray-900">{animal.breed}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Age</p>
                      <p className="text-sm font-medium text-gray-900">{animal.age}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Weight</p>
                      <p className="text-sm font-medium text-gray-900">{animal.weight}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{animal.location}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Last Checkup</p>
                      <p className="text-sm font-medium text-gray-900">{animal.lastCheckup}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Next Checkup</p>
                      <p className="text-sm font-medium text-gray-900">{animal.nextCheckup}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feed">
          <FeedManagement />
        </TabsContent>

        <TabsContent value="health">
          <Documentation />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialMetrics />
        </TabsContent>

        <TabsContent value="analytics">
          <AdvancedAnalytics />
        </TabsContent>

        <TabsContent value="automation">
          <Automation />
        </TabsContent>
      </Tabs>

      {/* Mobile Features */}
      <div className="lg:hidden">
        <MobileFeatures />
      </div>

      {/* Modals */}
      <LivestockForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
        mode="add"
      />

      <LivestockFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={activeFilters}
      />

      {selectedAnimal && (
        <>
          <LivestockForm
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedAnimal(null);
            }}
            onSubmit={handleEditAnimal}
            initialData={selectedAnimal}
            mode="edit"
          />

          <LivestockDetails
            isOpen={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedAnimal(null);
            }}
            data={selectedAnimal}
          />
        </>
      )}
    </div>
  );
} 