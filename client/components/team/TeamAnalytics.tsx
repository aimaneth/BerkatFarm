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
  Legend,
} from 'recharts';

const performanceData = [
  { month: 'Jan', efficiency: 85, animalCare: 88, taskCompletion: 82 },
  { month: 'Feb', efficiency: 88, animalCare: 90, taskCompletion: 85 },
  { month: 'Mar', efficiency: 92, animalCare: 91, taskCompletion: 88 },
  { month: 'Apr', efficiency: 90, animalCare: 89, taskCompletion: 86 },
  { month: 'May', efficiency: 95, animalCare: 94, taskCompletion: 92 },
  { month: 'Jun', efficiency: 89, animalCare: 92, taskCompletion: 90 },
];

const departmentData = [
  { name: 'Veterinary', value: 6, color: '#3B82F6' },
  { name: 'Animal Care', value: 8, color: '#10B981' },
  { name: 'Feed & Nutrition', value: 5, color: '#8B5CF6' },
  { name: 'Farm Operations', value: 7, color: '#F59E0B' },
  { name: 'Maintenance', value: 4, color: '#EF4444' },
];

const shiftData = [
  { name: 'Morning', value: 12, color: '#10B981' },
  { name: 'Afternoon', value: 10, color: '#3B82F6' },
  { name: 'Night', value: 8, color: '#8B5CF6' },
];

const workloadData = [
  { department: 'Veterinary', current: 92, capacity: 100, color: '#3B82F6' },
  { department: 'Animal Care', current: 85, capacity: 100, color: '#10B981' },
  { department: 'Feed & Nutrition', current: 78, capacity: 100, color: '#8B5CF6' },
  { department: 'Farm Operations', current: 95, capacity: 100, color: '#F59E0B' },
  { department: 'Maintenance', current: 70, capacity: 100, color: '#EF4444' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function TeamAnalytics() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Performance Metrics */}
        <Card className="p-3 sm:p-6 bg-white">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Performance Metrics</h3>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  name="Work Efficiency"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="animalCare"
                  name="Animal Care Quality"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="taskCompletion"
                  name="Task Completion"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Department Distribution */}
        <Card className="p-3 sm:p-6 bg-white">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Team Distribution</h3>
          <div className="h-[200px] sm:h-[250px] mb-2 sm:mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                <span className="text-gray-600 truncate">
                  {dept.name} ({dept.value})
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Shift Coverage */}
        <Card className="p-3 sm:p-6 bg-white">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Shift Coverage</h3>
          <div className="h-[200px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shiftData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Staff Count">
                  {shiftData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Department Workload */}
        <Card className="p-3 sm:p-6 bg-white">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Department Workload</h3>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={workloadData}
                layout="vertical"
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis 
                  dataKey="department" 
                  type="category" 
                  width={80} 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="current" name="Current Workload">
                  {workloadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 sm:mt-4 grid grid-cols-1 gap-1 sm:gap-2 text-xs sm:text-sm">
            {workloadData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-1.5 sm:p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span className="text-gray-600">{dept.department}</span>
                </div>
                <span className="font-medium" style={{ color: dept.color }}>
                  {dept.current}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 