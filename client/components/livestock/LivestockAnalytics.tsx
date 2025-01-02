import { Card } from '@/components/ui/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const productionData = [
  { month: 'Jan', milk: 2800, beef: 1200 },
  { month: 'Feb', milk: 3100, beef: 1300 },
  { month: 'Mar', milk: 2900, beef: 1400 },
  { month: 'Apr', milk: 3300, beef: 1250 },
  { month: 'May', milk: 3500, beef: 1350 },
  { month: 'Jun', milk: 3200, beef: 1450 },
];

const livestockDistribution = [
  { name: 'Dairy Cows', value: 120, color: '#10B981' },
  { name: 'Beef Cattle', value: 80, color: '#3B82F6' },
  { name: 'Calves', value: 45, color: '#8B5CF6' },
  { name: 'Pregnant', value: 25, color: '#F59E0B' },
];

const healthMetrics = [
  { name: 'Week 1', healthy: 95, sick: 5 },
  { name: 'Week 2', healthy: 93, sick: 7 },
  { name: 'Week 3', healthy: 96, sick: 4 },
  { name: 'Week 4', healthy: 98, sick: 2 },
];

export function LivestockAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Trends */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="milk" name="Milk (L)" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="beef" name="Beef (kg)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Livestock Distribution */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Livestock Distribution</h3>
          <div className="h-[250px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={livestockDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {livestockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {livestockDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Health Trends */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="healthy"
                  name="Healthy (%)"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="sick"
                  name="Sick (%)"
                  stroke="#EF4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-600 font-medium">Total Animals</p>
              <p className="text-2xl font-semibold text-emerald-700">270</p>
              <p className="text-xs text-emerald-500 mt-1">↑ 12 from last month</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Avg. Production</p>
              <p className="text-2xl font-semibold text-blue-700">25L</p>
              <p className="text-xs text-blue-500 mt-1">↑ 2.3L from last week</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Health Rate</p>
              <p className="text-2xl font-semibold text-purple-700">98%</p>
              <p className="text-xs text-purple-500 mt-1">↑ 2% from last week</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-600 font-medium">Pregnancy Rate</p>
              <p className="text-2xl font-semibold text-yellow-700">15%</p>
              <p className="text-xs text-yellow-500 mt-1">↑ 3% from last month</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 