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
} from 'recharts';

const performanceData = [
  { month: 'Jan', performance: 85 },
  { month: 'Feb', performance: 88 },
  { month: 'Mar', performance: 92 },
  { month: 'Apr', performance: 90 },
  { month: 'May', performance: 95 },
  { month: 'Jun', performance: 89 },
];

const departmentData = [
  { name: 'Management', value: 4, color: '#10B981' },
  { name: 'Veterinary', value: 6, color: '#3B82F6' },
  { name: 'Feed & Nutrition', value: 5, color: '#8B5CF6' },
  { name: 'Operations', value: 8, color: '#F59E0B' },
  { name: 'Maintenance', value: 4, color: '#EF4444' },
];

const shiftData = [
  { name: 'Morning', value: 10, color: '#10B981' },
  { name: 'Afternoon', value: 8, color: '#3B82F6' },
  { name: 'Night', value: 6, color: '#8B5CF6' },
  { name: 'Rotating', value: 3, color: '#F59E0B' },
];

export function TeamAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="performance" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Department Distribution */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <div className="h-[250px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                <span className="text-sm text-gray-600 truncate">{dept.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Shift Distribution */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shift Distribution</h3>
          <div className="h-[250px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={shiftData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {shiftData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {shiftData.map((shift, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: shift.color }} />
                <span className="text-sm text-gray-600">{shift.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Team Workload */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Workload</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Management', current: 85, capacity: 100 },
                  { name: 'Veterinary', current: 92, capacity: 100 },
                  { name: 'Feed & Nutrition', current: 78, capacity: 100 },
                  { name: 'Operations', current: 95, capacity: 100 },
                  { name: 'Maintenance', current: 70, capacity: 100 },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="current" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
} 