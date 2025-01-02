'use client';

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

const livestockData = [
  {
    id: 1,
    tag: 'COW-123',
    type: 'Dairy Cow',
    breed: 'Holstein',
    status: 'Healthy',
    age: '3 years',
    weight: '550 kg',
    location: 'Pen A',
    lastCheckup: '2024-01-15',
    nextCheckup: '2024-02-15',
  },
  {
    id: 2,
    tag: 'COW-124',
    type: 'Beef Cattle',
    breed: 'Angus',
    status: 'Under Treatment',
    age: '2 years',
    weight: '480 kg',
    location: 'Pen B',
    lastCheckup: '2024-01-18',
    nextCheckup: '2024-01-25',
  },
];

export default function LivestockPage() {
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
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
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
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
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
            {livestockData.map((animal) => (
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
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Edit</Button>
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
    </div>
  );
} 