'use client';

import { ReactNode } from 'react';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Sample data for preview
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const livestockDistribution = [
  { name: 'Cattle', value: 400 },
  { name: 'Chicken', value: 300 },
  { name: 'Goats', value: 200 },
  { name: 'Sheep', value: 150 },
];

const COLORS = ['#059669', '#0891b2', '#6366f1', '#8b5cf6'];

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  color?: string;
}

function StatsCard({ title, value, icon: Icon, trend, color = 'emerald' }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <ArrowTrendingUpIcon className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-600">{trend}</span>
            </div>
          )}
        </div>
        <div className={`bg-${color}-100 rounded-full p-3`}>
          <Icon className={`h-5 w-5 text-${color}-600`} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <div className="relative bg-gray-100 rounded-2xl p-4 sm:p-6 shadow-xl overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Farm Management Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Comprehensive farm monitoring and management
          </p>
        </div>
        <select className="w-full sm:w-auto rounded-lg border-gray-300 text-sm focus:ring-emerald-500 focus:border-emerald-500">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Livestock"
          value="1,234"
          icon={ShoppingCartIcon}
          trend="+12%"
        />
        <StatsCard
          title="Revenue"
          value="$52,000"
          icon={CurrencyDollarIcon}
          trend="+8%"
          color="blue"
        />
        <StatsCard
          title="Active Tasks"
          value="24"
          icon={CalendarDaysIcon}
          trend="+5%"
          color="purple"
        />
        <StatsCard
          title="Team Members"
          value="18"
          icon={UserGroupIcon}
          trend="+2%"
          color="pink"
        />
      </div>

      {/* Charts */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-48 sm:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#059669" 
                  fill="#059669" 
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Livestock Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Livestock Distribution</h3>
          <div className="h-48 sm:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={livestockDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={{ fontSize: 11 }}
                >
                  {livestockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Environmental Monitoring Preview */}
      <div className="relative bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Environmental Monitoring</h3>
          <span className="text-xs text-gray-500">Live Data</span>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <div className="text-xs font-medium text-gray-600">Temperature</div>
            <div className="mt-1 text-lg sm:text-xl font-semibold text-blue-600">24°C</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <div className="text-xs font-medium text-gray-600">Humidity</div>
            <div className="mt-1 text-lg sm:text-xl font-semibold text-green-600">65%</div>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200">
            <div className="text-xs font-medium text-gray-600">Soil Moisture</div>
            <div className="mt-1 text-lg sm:text-xl font-semibold text-amber-600">42%</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <div className="text-xs font-medium text-gray-600">Air Quality</div>
            <div className="mt-1 text-lg sm:text-xl font-semibold text-purple-600">Good</div>
          </div>
        </div>
      </div>
    </div>
  );
} 