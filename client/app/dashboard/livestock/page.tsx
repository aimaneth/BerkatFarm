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
import { useToast } from "@/hooks/use-toast"
import { PrintTemplate } from '@/components/livestock/PrintTemplate';
import { exportToCSV, parseCSV } from '@/utils/csv';
import { livestockApi, Livestock } from '@/services/livestock';
import { socketService } from '@/services/socket';

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
  const { toast } = useToast();
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

  const handleAddAnimal = async (data: Omit<Livestock, 'id'>) => {
    try {
      const newAnimal = await livestockApi.create(data);
      toast({
        title: "Animal Added",
        description: `Successfully added ${data.tag} to the livestock inventory.`,
        variant: "success",
      });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding animal:', error);
      toast({
        title: "Error",
        description: "Failed to add animal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditAnimal = async (data: Livestock) => {
    try {
      await livestockApi.update(data.id, data);
      toast({
        title: "Animal Updated",
        description: `Successfully updated ${data.tag}'s information.`,
        variant: "success",
      });
      setIsEditModalOpen(false);
      setSelectedAnimal(null);
    } catch (error) {
      console.error('Error editing animal:', error);
      toast({
        title: "Error",
        description: "Failed to update animal information. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const data = await parseCSV(file);
      await livestockApi.batchCreate(data);

      toast({
        title: "Import Successful",
        description: `Successfully imported ${data.length} records.`,
        variant: "success",
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import Failed",
        description: "Failed to import data. Please ensure the file is in the correct format.",
        variant: "destructive",
      });
    }
  };

  const handleExport = async () => {
    try {
      const filename = `livestock-inventory-${new Date().toISOString().split('T')[0]}.csv`;
      exportToCSV(filteredData, filename);
      toast({
        title: "Export Successful",
        description: "Your data has been exported successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
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
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Failed to open print window');
      }

      // Add necessary styles
      printWindow.document.write(`
        <html>
          <head>
            <title>Livestock Inventory Report</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              @media print {
                body { margin: 0; padding: 16px; }
                @page { size: landscape; }
              }
            </style>
          </head>
          <body>
      `);

      // Render the template
      const root = printWindow.document.createElement('div');
      printWindow.document.body.appendChild(root);
      
      // Use ReactDOM to render the template
      const { createRoot } = require('react-dom/client');
      const printRoot = createRoot(root);
      printRoot.render(<PrintTemplate data={filteredData} />);

      // Add script to trigger print
      printWindow.document.write(`
          </body>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              }, 1000);
            };
          </script>
        </html>
      `);

      toast({
        title: "Print Ready",
        description: "Your document is ready for printing.",
        variant: "success",
      });
    } catch (error) {
      console.error('Print error:', error);
      toast({
        title: "Print Failed",
        description: "Failed to prepare document for printing. Please try again.",
        variant: "destructive",
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
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="feed">Feed Management</TabsTrigger>
          <TabsTrigger value="health">Health Records</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

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
        onSubmit={handleAddAnimal}
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