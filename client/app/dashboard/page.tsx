'use client';

import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { DashboardStats } from '@/components/dashboard/sections/DashboardStats';
import { WeatherCard } from '@/components/dashboard/sections/WeatherCard';
import { QuickActions } from '@/components/dashboard/sections/QuickActions';
import { LineChartSection } from '@/components/dashboard/charts/LineChartSection';
import { PieChartSection } from '@/components/dashboard/charts/PieChartSection';
import { BarChartSection } from '@/components/dashboard/charts/BarChartSection';
import { RecentActivities } from '@/components/dashboard/base/RecentActivities';
import { 
  Beef as CowIcon,
  Squirrel as SheepIcon,
  Droplet as MilkIcon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Truck as TruckIcon,
  Plus as PlusIcon,
  FileText as ReportIcon,
  Thermometer as HealthIcon,
  DollarSign as RevenueIcon,
  TrendingDown as ExpenseIcon,
  Activity as ActivityIcon
} from 'lucide-react';

const stats = [
  {
    name: 'Total Cattle',
    value: '245',
    change: '+12%',
    changeType: 'positive' as const,
    icon: CowIcon,
    color: 'emerald'
  },
  {
    name: 'Total Sheep',
    value: '1,234',
    change: '+8%',
    changeType: 'positive' as const,
    icon: SheepIcon,
    color: 'blue'
  },
  {
    name: 'Milk Production',
    value: '2,500L',
    change: '+15%',
    changeType: 'positive' as const,
    icon: MilkIcon,
    color: 'purple'
  },
  {
    name: 'Revenue',
    value: '$52,000',
    change: '+10%',
    changeType: 'positive' as const,
    icon: RevenueIcon,
    color: 'yellow'
  },
  {
    name: 'Active Staff',
    value: '18',
    change: '+2',
    changeType: 'positive' as const,
    icon: UsersIcon,
    color: 'pink'
  },
  {
    name: 'Deliveries',
    value: '24',
    change: '+5',
    changeType: 'positive' as const,
    icon: TruckIcon,
    color: 'indigo'
  }
];

const milkProductionData = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 2210 },
  { name: 'Wed', value: 2290 },
  { name: 'Thu', value: 2000 },
  { name: 'Fri', value: 2400 },
  { name: 'Sat', value: 2200 },
  { name: 'Sun', value: 2300 }
];

const feedConsumptionData = [
  { name: 'Hay', value: 700 },
  { name: 'Grain', value: 450 },
  { name: 'Supplements', value: 90 }
];

const recentActivities = [
  {
    id: '1',
    type: 'health',
    description: 'Veterinary check-up completed for Cattle Group A',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'production',
    description: 'Daily milk production target exceeded by 15%',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    type: 'delivery',
    description: 'New shipment of feed supplies received',
    timestamp: '6 hours ago'
  },
  {
    id: '4',
    type: 'maintenance',
    description: 'Equipment maintenance completed',
    timestamp: '8 hours ago'
  }
];

const weatherInfo = {
  current: {
    temp: '24°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    windSpeed: '12 km/h'
  },
  forecast: [
    { day: 'Tomorrow', temp: '26°C', condition: 'Sunny' },
    { day: 'Wednesday', temp: '23°C', condition: 'Rain' },
    { day: 'Thursday', temp: '25°C', condition: 'Cloudy' }
  ]
};

const quickActions = [
  { name: 'Add Animal', icon: PlusIcon, color: 'emerald', bgColor: 'bg-emerald-600', hoverColor: 'hover:bg-emerald-700', ringColor: 'focus:ring-emerald-500' },
  { name: 'Record Health', icon: HealthIcon, color: 'blue', bgColor: 'bg-blue-600', hoverColor: 'hover:bg-blue-700', ringColor: 'focus:ring-blue-500' },
  { name: 'Generate Report', icon: ReportIcon, color: 'purple', bgColor: 'bg-purple-600', hoverColor: 'hover:bg-purple-700', ringColor: 'focus:ring-purple-500' }
];

const financialMetrics = [
  { 
    title: 'Monthly Revenue',
    amount: '$157,000',
    trend: '+8.2%',
    period: 'vs last month',
    icon: RevenueIcon,
    color: 'emerald'
  },
  {
    title: 'Operating Expenses',
    amount: '$43,500',
    trend: '-2.4%',
    period: 'vs last month',
    icon: ExpenseIcon,
    color: 'red'
  },
  {
    title: 'Profit Margin',
    amount: '72.3%',
    trend: '+5.1%',
    period: 'vs last month',
    icon: TrendingUpIcon,
    color: 'blue'
  }
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleTimeRangeChange = useCallback((range: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(`Fetching data for range: ${range}`);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Section */}
      <DashboardStats stats={stats} />

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <QuickActions 
          actions={quickActions}
          onActionClick={(action) => {
            console.log('Action clicked:', action.name);
            // Handle action click
          }}
        />
      </Card>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <LineChartSection
          title="Milk Production Trends"
          data={milkProductionData}
          isLoading={isLoading}
          valuePrefix=""
          valueSuffix="L"
          onTimeRangeChange={handleTimeRangeChange}
        />
        <BarChartSection
          title="Feed Consumption"
          data={feedConsumptionData}
          isLoading={isLoading}
          valuePrefix=""
          valueSuffix="kg"
          onTimeRangeChange={handleTimeRangeChange}
        />
      </div>

      {/* Weather and Activities Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <WeatherCard weatherInfo={weatherInfo} />
        <RecentActivities
          activities={recentActivities}
          ActivityIcon={ActivityIcon}
        />
      </div>

      {/* Financial Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {financialMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="mt-1 text-2xl font-semibold">{metric.amount}</p>
              </div>
              <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
              </div>
            </div>
            <div className="mt-4">
              <p className={`text-sm ${
                metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend}
                <span className="text-gray-500 ml-2">{metric.period}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 