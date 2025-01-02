'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { 
  Beef as CowIcon,
  Squirrel as SheepIcon,
  Droplet as MilkIcon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Truck as TruckIcon,
  Sun as WeatherIcon,
  Package as FeedIcon,
  Calendar as CalendarIcon,
  AlertCircle as AlertIcon,
  Plus as PlusIcon,
  FileText as ReportIcon,
  Thermometer as HealthIcon,
  Clock as ClockIcon,
  DollarSign as RevenueIcon,
  Heart as BreedingIcon,
  Leaf as FeedAnalysisIcon,
  ShieldAlert as QuarantineIcon,
  TrendingDown as ExpenseIcon,
  Baby as BirthIcon,
  Scale as NutritionIcon,
  Syringe as VaccinationIcon,
  Droplet as DropletIcon,
  Wind as WindIcon,
  Bell as BellIcon,
  BellRing as BellRingIcon,
  X as XIcon,
  Coins as ProfitIcon,
  BarChart2 as MetricsIcon,
  Target as ROIIcon,
  Wallet as BudgetIcon,
  Timer as CycleIcon,
  LineChart as GrowthIcon,
  Activity as EfficiencyIcon,
  Clock as HoursIcon,
  PieChart as AllocationIcon,
  Recycle as WasteIcon
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const stats = [
  {
    name: 'Total Cattle',
    value: '245',
    change: '+12%',
    changeType: 'positive',
    icon: CowIcon,
    color: 'emerald'
  },
  {
    name: 'Total Sheep',
    value: '1,234',
    change: '+8%',
    changeType: 'positive',
    icon: SheepIcon,
    color: 'blue'
  },
  {
    name: 'Milk Production',
    value: '2,500L',
    change: '+15%',
    changeType: 'positive',
    icon: MilkIcon,
    color: 'purple'
  },
  {
    name: 'Revenue',
    value: '$52,000',
    change: '+10%',
    changeType: 'positive',
    icon: RevenueIcon,
    color: 'yellow'
  },
  {
    name: 'Active Staff',
    value: '18',
    change: '+2',
    changeType: 'positive',
    icon: UsersIcon,
    color: 'pink'
  },
  {
    name: 'Deliveries',
    value: '24',
    change: '+5',
    changeType: 'positive',
    icon: TruckIcon,
    color: 'indigo'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'health',
    description: 'Veterinary check-up completed for Cattle Group A',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'production',
    description: 'Daily milk production target exceeded by 15%',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    type: 'delivery',
    description: 'New shipment of feed supplies received',
    timestamp: '6 hours ago'
  },
  {
    id: 4,
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

const feedInventory = [
  { type: 'Hay', status: '70%', amount: '700 kg', reorderPoint: '200 kg' },
  { type: 'Grain', status: '45%', amount: '450 kg', reorderPoint: '150 kg' },
  { type: 'Supplements', status: '90%', amount: '90 kg', reorderPoint: '20 kg' }
];

const upcomingTasks = [
  { id: 1, task: 'Veterinary Visit', date: 'Today, 2:00 PM', priority: 'high' },
  { id: 2, task: 'Feed Delivery', date: 'Tomorrow, 9:00 AM', priority: 'medium' },
  { id: 3, task: 'Cattle Vaccination', date: 'Wed, 10:00 AM', priority: 'high' }
];

const healthAlerts = [
  { id: 1, type: 'Routine Checkup', count: 5, status: 'pending' },
  { id: 2, type: 'Vaccination Due', count: 12, status: 'urgent' },
  { id: 3, type: 'Health Issues', count: 2, status: 'attention' }
];

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

const breedingStatus = [
  { id: 1, animal: 'Cow #245', status: 'Pregnant', dueDate: '2024-03-15', daysLeft: 45 },
  { id: 2, animal: 'Cow #187', status: 'Heat', nextAction: 'Ready for breeding', priority: 'high' },
  { id: 3, animal: 'Cow #302', status: 'Recent Birth', date: '2024-01-05', calves: 1 }
];

const feedAnalytics = [
  { 
    type: 'Hay',
    consumption: '2.5 tons/week',
    costPerAnimal: '$3.50/day',
    nutritionalValue: 'High fiber',
    stock: '70%'
  },
  { 
    type: 'Grain Mix',
    consumption: '1.2 tons/week',
    costPerAnimal: '$2.75/day',
    nutritionalValue: 'High protein',
    stock: '45%'
  }
];

const quarantineStatus = [
  { 
    zone: 'Zone A',
    status: 'Active',
    animals: 3,
    reason: 'Routine isolation',
    endDate: '2024-02-01'
  },
  { 
    zone: 'Zone B',
    status: 'Monitoring',
    animals: 5,
    reason: 'Recent arrivals',
    endDate: '2024-02-05'
  }
];

const milkProductionData = [
  { date: 'Mon', amount: 2400 },
  { date: 'Tue', amount: 2210 },
  { date: 'Wed', amount: 2290 },
  { date: 'Thu', amount: 2000 },
  { date: 'Fri', amount: 2181 },
  { date: 'Sat', amount: 2500 },
  { date: 'Sun', amount: 2100 }
];

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 35000 },
  { month: 'Mar', revenue: 48000, expenses: 30000 },
  { month: 'Apr', revenue: 61000, expenses: 42000 },
  { month: 'May', revenue: 55000, expenses: 38000 },
  { month: 'Jun', revenue: 67000, expenses: 41000 }
];

const animalHealthData = [
  { name: 'Healthy', value: 85, color: '#10b981' },
  { name: 'Under Treatment', value: 10, color: '#f59e0b' },
  { name: 'Critical', value: 5, color: '#ef4444' }
];

const feedConsumptionData = [
  { name: 'Hay', current: 75, target: 100 },
  { name: 'Grain', current: 45, target: 80 },
  { name: 'Supplements', current: 90, target: 85 }
];

const notifications = [
  {
    id: 1,
    title: 'Health Alert',
    message: 'Cattle #245 requires immediate veterinary attention',
    type: 'urgent',
    time: '5 minutes ago',
    read: false
  },
  {
    id: 2,
    title: 'Feed Stock Low',
    message: 'Grain inventory is below 20%. Reorder recommended.',
    type: 'warning',
    time: '30 minutes ago',
    read: false
  },
  {
    id: 3,
    title: 'Milk Production Update',
    message: 'Daily production target exceeded by 15%',
    type: 'success',
    time: '2 hours ago',
    read: true
  },
  {
    id: 4,
    title: 'Maintenance Required',
    message: 'Scheduled maintenance for milking equipment due tomorrow',
    type: 'info',
    time: '4 hours ago',
    read: true
  }
];

const financialInsights = [
  {
    title: 'Cost per Animal',
    value: '$5.20',
    trend: '-3.2%',
    period: 'vs last month',
    icon: MetricsIcon,
    color: 'blue'
  },
  {
    title: 'ROI',
    value: '24.5%',
    trend: '+2.1%',
    period: 'vs last month',
    icon: ROIIcon,
    color: 'emerald'
  },
  {
    title: 'Budget Variance',
    value: '+$1,200',
    trend: '+1.5%',
    period: 'vs planned',
    icon: BudgetIcon,
    color: 'purple'
  }
];

const animalLifecycle = [
  {
    category: 'Breeding',
    total: 45,
    active: 12,
    upcoming: 8,
    completed: 25,
    trend: '+5%'
  },
  {
    category: 'Growth Tracking',
    total: 156,
    onTrack: 142,
    attention: 14,
    trend: '+2%'
  },
  {
    category: 'Vaccinations',
    total: 245,
    upToDate: 230,
    due: 15,
    trend: '+8%'
  }
];

const resourceMetrics = [
  {
    name: 'Equipment Efficiency',
    value: '94%',
    trend: '+2%',
    status: 'optimal',
    icon: EfficiencyIcon
  },
  {
    name: 'Labor Hours',
    value: '180hrs',
    trend: '-5%',
    status: 'good',
    icon: HoursIcon
  },
  {
    name: 'Resource Allocation',
    value: '87%',
    trend: '+3%',
    status: 'good',
    icon: AllocationIcon
  },
  {
    name: 'Waste Management',
    value: '2.5%',
    trend: '-1%',
    status: 'optimal',
    icon: WasteIcon
  }
];

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-4 sm:space-y-6 px-0 sm:px-0">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {session?.user?.name || session?.user?.email}!
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action.name}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${action.bgColor} ${action.hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${action.ringColor}`}
            >
              <action.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5" />
              <span className="text-xs sm:text-sm">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Weather Widget */}
      <Card className="overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 p-4 sm:p-6">
          {/* Current Weather */}
          <div className="w-full sm:w-auto">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Local Weather</h2>
            <div className="flex items-center justify-between sm:justify-start">
              <div className="flex items-center">
                <div className="relative">
                  <WeatherIcon className="h-12 w-12 sm:h-14 sm:w-14 text-yellow-500" />
                  <div className="absolute -top-1 -right-1 bg-emerald-100 rounded-full px-2 py-0.5">
                    <span className="text-xs font-medium text-emerald-700">Now</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-baseline">
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900">{weatherInfo.current.temp}</p>
                    <p className="ml-2 text-sm text-gray-500">Feels like {weatherInfo.current.temp}</p>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">{weatherInfo.current.condition}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2 sm:ml-8 text-right sm:text-left">
                <div className="flex items-center justify-end sm:justify-start text-gray-600">
                  <DropletIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  <span className="ml-2 text-sm">{weatherInfo.current.humidity} Humidity</span>
                </div>
                <div className="flex items-center justify-end sm:justify-start text-gray-600">
                  <WindIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
                  <span className="ml-2 text-sm">{weatherInfo.current.windSpeed} Wind</span>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-6 mt-4 sm:mt-0">
            <p className="text-sm font-medium text-gray-500 mb-3">3-Day Forecast</p>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {weatherInfo.forecast.map((day, index) => (
                <div 
                  key={day.day}
                  className={`
                    flex flex-col items-center p-2 sm:p-3 rounded-lg
                    ${index === 0 ? 'bg-emerald-50' : 'bg-gray-50'}
                  `}
                >
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{day.day}</p>
                  <WeatherIcon className={`
                    h-6 w-6 sm:h-8 sm:w-8 my-1 sm:my-2
                    ${index === 0 ? 'text-emerald-500' : 'text-gray-400'}
                  `} />
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{day.temp}</p>
                  <p className="text-xs text-gray-500 mt-1">{day.condition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {stats.map((stat) => (
          <Card 
            key={stat.name} 
            className={`
              p-4 sm:p-6 overflow-hidden relative
              bg-gradient-to-br from-white to-${stat.color}-50/30
              hover:shadow-lg transition-all duration-300
            `}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className={`p-2 sm:p-3 bg-${stat.color}-100 rounded-lg shrink-0`}>
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-600`} />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className={`text-${stat.color}-600 font-medium flex items-center gap-1`}>
                      <TrendingUpIcon className="w-3 h-3" />
                      {stat.change}
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className={`absolute right-0 top-0 w-32 h-32 bg-${stat.color}-100/50 rounded-full -mr-16 -mt-16 blur-2xl`} />
            <div className={`absolute right-0 bottom-0 w-16 h-16 bg-${stat.color}-100/50 rounded-full -mr-8 -mb-8 blur-xl`} />
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Milk Production Chart */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Milk Production Trend</h2>
          </div>
          <div className="p-2 sm:p-4">
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={milkProductionData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Revenue vs Expenses */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Revenue vs Expenses</h2>
          </div>
          <div className="p-2 sm:p-4">
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Health and Feed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Animal Health Distribution */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Animal Health Distribution</h2>
          </div>
          <div className="p-2 sm:p-4">
            <div className="h-[200px] sm:h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={animalHealthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={window.innerWidth < 640 ? 40 : 60}
                    outerRadius={window.innerWidth < 640 ? 60 : 80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {animalHealthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2 sm:mt-4">
              {animalHealthData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-1.5 sm:mr-2" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs sm:text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Feed Consumption Analytics */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Feed Consumption vs Target</h2>
          </div>
          <div className="p-2 sm:p-4">
            <div className="h-[200px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={feedConsumptionData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="current" fill="#10b981" name="Current" />
                  <Bar dataKey="target" fill="#6366f1" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Feed Inventory and Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Feed Inventory */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Feed Inventory Status</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {feedInventory.map((item) => (
              <div key={item.type} className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{item.type}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Available: {item.amount}</p>
                  </div>
                  <div className="ml-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                            parseInt(item.status) > 50 ? 'text-emerald-600 bg-emerald-200' : 'text-yellow-600 bg-yellow-200'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Upcoming Tasks</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-3 sm:p-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <div className="ml-3 sm:ml-4 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{task.date}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Health Status Overview */}
      <Card className="overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">Health Status Overview</h2>
        </div>
        <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {healthAlerts.map((alert) => (
            <div key={alert.id} className={`p-3 sm:p-4 rounded-lg ${
              alert.status === 'urgent' 
                ? 'bg-red-50'
                : alert.status === 'attention'
                ? 'bg-yellow-50'
                : 'bg-blue-50'
            }`}>
              <div className="flex items-center">
                <div className={`p-1.5 sm:p-2 rounded-full ${
                  alert.status === 'urgent'
                    ? 'bg-red-100'
                    : alert.status === 'attention'
                    ? 'bg-yellow-100'
                    : 'bg-blue-100'
                }`}>
                  <AlertIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    alert.status === 'urgent'
                      ? 'text-red-600'
                      : alert.status === 'attention'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`} />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{alert.type}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{alert.count} animals</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Financial Insights */}
      <Card className="overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">Financial Insights</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {financialInsights.map((insight) => (
            <div key={insight.title} className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${insight.color}-100 rounded-lg`}>
                  <insight.icon className={`w-5 h-5 text-${insight.color}-600`} />
                </div>
                <p className="text-sm font-medium text-gray-600">{insight.title}</p>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
                <div className="flex items-center text-sm mt-1">
                  <span className={`text-${insight.color}-600 font-medium`}>{insight.trend}</span>
                  <span className="text-gray-500 ml-2">{insight.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Animal Lifecycle Management */}
      <Card className="overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">Animal Lifecycle Management</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
          {animalLifecycle.map((category) => (
            <div
              key={category.category}
              className="p-4 rounded-lg bg-gradient-to-br from-white to-gray-50 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">{category.category}</h3>
                <span className="text-xs font-medium text-emerald-600">{category.trend}</span>
              </div>
              <div className="space-y-2">
                {'active' in category ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active</span>
                      <span className="font-medium text-gray-900">{category.active}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Upcoming</span>
                      <span className="font-medium text-gray-900">{category.upcoming}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-medium text-gray-900">{category.completed}</span>
                    </div>
                  </>
                ) : 'onTrack' in category ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">On Track</span>
                      <span className="font-medium text-emerald-600">{category.onTrack}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Needs Attention</span>
                      <span className="font-medium text-yellow-600">{category.attention}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Up to Date</span>
                      <span className="font-medium text-emerald-600">{category.upToDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Due Soon</span>
                      <span className="font-medium text-yellow-600">{category.due}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Total</span>
                  <span className="font-medium text-gray-900">{category.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Resource Utilization */}
      <Card className="overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">Resource Utilization</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-200">
          {resourceMetrics.map((metric) => (
            <div key={metric.name} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className={`w-5 h-5 text-${
                  metric.status === 'optimal' ? 'emerald' : 'blue'
                }-600`} />
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <div className="flex items-center text-sm mt-1">
                <span className={`${
                  metric.trend.startsWith('+') ? 'text-emerald-600' : 'text-blue-600'
                } font-medium`}>
                  {metric.trend}
                </span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  metric.status === 'optimal' 
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">Recent Activities</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-3 sm:p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 