'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  Search as SearchIcon,
  Calendar as CalendarIcon,
  User as CustomerIcon,
  DollarSign as PriceIcon,
  Truck as DeliveryIcon,
  Package as ProductIcon,
  Archive as OrderIcon,
  CheckCircle as StatusIcon,
  MapPin as LocationIcon,
  AlertTriangle as AlertIcon,
  BarChart2 as StatsIcon,
  Plus as PlusIcon,
  Truck as TruckIcon,
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  currentStock: number;
  category: 'milk' | 'meat';
}

interface OrderDelivery {
  address: string;
  status: 'scheduled' | 'in-transit' | 'completed';
  date: string;
  driver?: string;
  vehicle?: string;
  destination?: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'in-transit' | 'completed' | 'cancelled';
  items: OrderItem[];
  delivery: OrderDelivery;
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customer: 'Metro Supermarket',
    date: '2024-01-03',
    total: 750.00,
    status: 'in-transit',
    items: [
      { 
        id: '1', 
        name: 'Fresh Whole Milk', 
        quantity: 100,
        unit: 'liter',
        price: 5.99,
        currentStock: 500,
        category: 'milk'
      },
      { 
        id: '4', 
        name: 'Premium Beef Cuts', 
        quantity: 10,
        unit: 'kg',
        price: 25.99,
        currentStock: 150,
        category: 'meat'
      }
    ],
    delivery: {
      address: 'City Center Branch, 123 Main St',
      status: 'in-transit',
      date: '2024-01-05',
      driver: 'John Smith',
      vehicle: 'Truck-01',
      destination: 'City Center Branch'
    }
  },
  // Add more mock orders...
];

const orderStats = {
  activeDeliveries: 12,
  totalOrders: 145,
  destinations: 24,
  scheduled: 8,
  lowStock: 5,
  outOfStock: 2
};

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  'in-transit': 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('latest');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'in-transit', label: 'In Transit' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'milk', label: 'Milk Products' },
    { value: 'meat', label: 'Meat Products' }
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' }
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || 
      order.items.some(item => item.category === categoryFilter);

    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'price-high':
        return b.total - a.total;
      case 'price-low':
        return a.total - b.total;
      default: // latest
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage orders, track deliveries, and monitor inventory
          </p>
        </div>
        <Button 
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
          size="sm"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DeliveryIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Active Deliveries</p>
                <p className="text-lg font-semibold text-gray-900">{orderStats.activeDeliveries}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <OrderIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-lg font-semibold text-gray-900">{orderStats.totalOrders}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <LocationIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Destinations</p>
                <p className="text-lg font-semibold text-gray-900">{orderStats.destinations}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Scheduled</p>
                <p className="text-lg font-semibold text-gray-900">{orderStats.scheduled}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertIcon className="h-5 w-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-lg font-semibold text-gray-900">{orderStats.lowStock}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
          <div className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <StatsIcon className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                <p className="text-lg font-semibold text-gray-900">{orderStats.outOfStock}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search-orders" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search-orders"
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md bg-white"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
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

            {/* Category Filter */}
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

            {/* Sort By */}
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-gray-100">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md bg-white"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md bg-white"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-lg transition-all duration-300">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 sm:p-3 bg-emerald-100 rounded-lg">
                      <OrderIcon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {order.date}
                        </span>
                        <span className="flex items-center">
                          <CustomerIcon className="h-4 w-4 mr-1" />
                          {order.customer}
                        </span>
                        <span className="flex items-center">
                          <PriceIcon className="h-4 w-4 mr-1" />
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mt-4 space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-500">Stock: {item.currentStock} {item.unit}</span>
                        </div>
                        <span className="text-gray-900">
                          {item.quantity} {item.unit} × ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col items-end space-y-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                    {order.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <LocationIcon className="h-4 w-4 mr-1" />
                    {order.delivery.destination}
                  </span>
                  <span className="flex items-center">
                    <DeliveryIcon className="h-4 w-4 mr-1" />
                    {order.delivery.address}
                  </span>
                  {order.delivery.driver && (
                    <span className="flex items-center">
                      <CustomerIcon className="h-4 w-4 mr-1" />
                      Driver: {order.delivery.driver}
                    </span>
                  )}
                  {order.delivery.vehicle && (
                    <span className="flex items-center">
                      <TruckIcon className="h-4 w-4 mr-1" />
                      Vehicle: {order.delivery.vehicle}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.delivery.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                    order.delivery.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    Delivery: {order.delivery.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 