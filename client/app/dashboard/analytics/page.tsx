'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  ChartPieIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  BeakerIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { PieChart, LineChart, BarChart, MixedChart } from '@/components/analytics/Charts';

interface AnalyticsData {
  livestock: {
    totalCount: number;
    healthStatus: { healthy: number; sick: number; quarantined: number };
    productionTrend: number[];
  };
  inventory: {
    totalItems: number;
    lowStock: number;
    outOfStock: number;
    stockValue: number;
  };
  orders: {
    totalOrders: number;
    pendingDeliveries: number;
    completedOrders: number;
    revenue: number;
  };
  finance: {
    revenue: number;
    expenses: number;
    profit: number;
    trends: number[];
  };
}

const mockAnalyticsData: AnalyticsData = {
  livestock: {
    totalCount: 1234,
    healthStatus: { healthy: 1150, sick: 64, quarantined: 20 },
    productionTrend: [45, 52, 49, 55, 50, 53, 48]
  },
  inventory: {
    totalItems: 156,
    lowStock: 12,
    outOfStock: 3,
    stockValue: 45600
  },
  orders: {
    totalOrders: 289,
    pendingDeliveries: 24,
    completedOrders: 265,
    revenue: 156780
  },
  finance: {
    revenue: 156780,
    expenses: 89450,
    profit: 67330,
    trends: [23400, 25600, 24800, 26700, 25900, 27800, 28500]
  }
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [dataType, setDataType] = useState('all');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive insights and data visualization
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-white">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">${mockAnalyticsData.finance.revenue.toLocaleString()}</h3>
              <p className="text-sm text-emerald-600">↑ 12% from last period</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Livestock Count</p>
              <h3 className="text-2xl font-bold text-gray-900">{mockAnalyticsData.livestock.totalCount}</h3>
              <p className="text-sm text-emerald-600">↑ 5% from last period</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BeakerIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">{mockAnalyticsData.orders.pendingDeliveries}</h3>
              <p className="text-sm text-yellow-600">→ 2% change</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ShoppingCartIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <h3 className="text-2xl font-bold text-gray-900">${mockAnalyticsData.inventory.stockValue.toLocaleString()}</h3>
              <p className="text-sm text-emerald-600">↑ 8% from last period</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <ArchiveBoxIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Livestock Health Distribution */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Livestock Health Distribution</h3>
          <div className="h-64">
            <PieChart data={mockAnalyticsData.livestock.healthStatus} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Healthy</p>
              <p className="text-lg font-semibold text-emerald-600">{mockAnalyticsData.livestock.healthStatus.healthy}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Sick</p>
              <p className="text-lg font-semibold text-yellow-600">{mockAnalyticsData.livestock.healthStatus.sick}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Quarantined</p>
              <p className="text-lg font-semibold text-red-600">{mockAnalyticsData.livestock.healthStatus.quarantined}</p>
            </div>
          </div>
        </Card>

        {/* Revenue Trends */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64">
            <LineChart 
              labels={days}
              data={mockAnalyticsData.finance.trends}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-lg font-semibold text-emerald-600">${mockAnalyticsData.finance.revenue.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Expenses</p>
              <p className="text-lg font-semibold text-yellow-600">${mockAnalyticsData.finance.expenses.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Profit</p>
              <p className="text-lg font-semibold text-blue-600">${mockAnalyticsData.finance.profit.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Inventory Status */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Status</h3>
          <div className="h-64">
            <BarChart 
              labels={['Total Items', 'Low Stock', 'Out of Stock']}
              data={[
                mockAnalyticsData.inventory.totalItems,
                mockAnalyticsData.inventory.lowStock,
                mockAnalyticsData.inventory.outOfStock
              ]}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-lg font-semibold text-gray-900">{mockAnalyticsData.inventory.totalItems}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-lg font-semibold text-yellow-600">{mockAnalyticsData.inventory.lowStock}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-lg font-semibold text-red-600">{mockAnalyticsData.inventory.outOfStock}</p>
            </div>
          </div>
        </Card>

        {/* Order Analytics */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Analytics</h3>
          <div className="h-64">
            <MixedChart 
              labels={days}
              barData={[35, 40, 30, 45, 35, 40, 30]}
              lineData={[15000, 17000, 14000, 18000, 15000, 17000, 14000]}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-lg font-semibold text-gray-900">{mockAnalyticsData.orders.totalOrders}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-lg font-semibold text-yellow-600">{mockAnalyticsData.orders.pendingDeliveries}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-lg font-semibold text-emerald-600">{mockAnalyticsData.orders.completedOrders}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 