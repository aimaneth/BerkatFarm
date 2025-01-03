'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  Package as ProductIcon,
  AlertTriangle as AlertIcon,
  BarChart2 as StatsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Archive as StockIcon,
  RefreshCw as RefreshIcon,
  Plus as PlusIcon,
  Edit as EditIcon,
  Trash as DeleteIcon,
  Filter as FilterIcon,
  Search as SearchIcon,
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: 'milk' | 'meat';
  currentStock: number;
  unit: string;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  lastRestocked: string;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'reorder-needed';
}

interface InventoryStats {
  totalProducts: number;
  lowStock: number;
  outOfStock: number;
  reorderNeeded: number;
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Fresh Whole Milk',
    category: 'milk',
    currentStock: 150,
    unit: 'liter',
    minStock: 50,
    maxStock: 200,
    reorderPoint: 75,
    lastRestocked: '2024-01-01',
    price: 5.99,
    status: 'in-stock'
  },
  {
    id: '4',
    name: 'Premium Beef Cuts',
    category: 'meat',
    currentStock: 45,
    unit: 'kg',
    minStock: 20,
    maxStock: 100,
    reorderPoint: 30,
    lastRestocked: '2024-01-02',
    price: 25.99,
    status: 'low-stock'
  },
  // Add more inventory items...
];

const inventoryStats: InventoryStats = {
  totalProducts: 245,
  lowStock: 12,
  outOfStock: 3,
  reorderNeeded: 8
};

const statusColors: Record<InventoryItem['status'], string> = {
  'in-stock': 'bg-green-100 text-green-800',
  'low-stock': 'bg-yellow-100 text-yellow-800',
  'out-of-stock': 'bg-red-100 text-red-800',
  'reorder-needed': 'bg-blue-100 text-blue-800'
};

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'milk', label: 'Milk Products' },
    { value: 'meat', label: 'Meat Products' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'reorder-needed', label: 'Reorder Needed' }
  ];

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage your product inventory
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Product
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-emerald-100 rounded-lg">
                <StatsIcon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{inventoryStats.totalProducts}</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg">
                <AlertIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-2xl font-semibold text-gray-900">{inventoryStats.lowStock}</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-red-100 rounded-lg">
                <StockIcon className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                <p className="text-2xl font-semibold text-gray-900">{inventoryStats.outOfStock}</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                <RefreshIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Reorder Needed</p>
                <p className="text-2xl font-semibold text-gray-900">{inventoryStats.reorderNeeded}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search-products" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search-products"
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md bg-white"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter Dropdown */}
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {categoryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-gray-100">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter Dropdown */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-gray-100">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Inventory List */}
      <div className="space-y-4">
        {filteredInventory.map((item) => (
          <Card key={item.id} className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-lg transition-all duration-300">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 sm:p-3 bg-emerald-100 rounded-lg">
                      <ProductIcon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span>Category: {item.category}</span>
                        <span>Unit: {item.unit}</span>
                        <span>Price: ${item.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stock Info */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Current Stock</p>
                      <p className="text-lg font-semibold text-gray-900">{item.currentStock} {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Min Stock</p>
                      <p className="text-lg font-semibold text-gray-900">{item.minStock} {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reorder Point</p>
                      <p className="text-lg font-semibold text-gray-900">{item.reorderPoint} {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Restocked</p>
                      <p className="text-lg font-semibold text-gray-900">{item.lastRestocked}</p>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col items-end space-y-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>
                    {item.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-emerald-600 hover:text-emerald-500">
                      <EditIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-500">
                      <DeleteIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock Level Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-emerald-600">
                        Stock Level
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-emerald-600">
                        {Math.round((item.currentStock / item.maxStock) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-200">
                    <div
                      style={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 