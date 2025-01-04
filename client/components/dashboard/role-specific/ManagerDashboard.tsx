import { DashboardBase } from '../base/DashboardBase';
import {
  CowIcon,
  UsersIcon,
  RevenueIcon,
  TaskIcon,
  AnalyticsIcon,
  ReportIcon,
  PerformanceIcon
} from '@/components/icons';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Card } from '@/components/ui/Card';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = {
  primary: '#10B981',
  secondary: '#F59E0B',
  error: '#EF4444',
  success: '#10B981'
};

function ManagerDashboardContent() {
  const { data, isLoading, error } = useDashboardData('manager');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading dashboard data
      </div>
    );
  }

  const managerMetrics = [
    {
      key: 'Total Livestock',
      value: data?.charts.livestock.reduce((acc, curr) => acc + curr.value, 0) || 0,
      change: '+12',
      changeType: 'positive' as const,
      icon: <CowIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Active Staff',
      value: '24',
      change: '+2',
      changeType: 'positive' as const,
      icon: <UsersIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Monthly Revenue',
      value: data?.charts.revenue[data.charts.revenue.length - 1]?.value || 0,
      change: '+15%',
      changeType: 'positive' as const,
      icon: <RevenueIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Active Tasks',
      value: data?.charts.tasks.total || 0,
      change: '-3',
      changeType: 'positive' as const,
      icon: <TaskIcon className="h-5 w-5 text-primary" />
    }
  ];

  const managerActions = [
    {
      label: 'Farm Analytics',
      href: '/dashboard/analytics',
      icon: <AnalyticsIcon className="h-5 w-5 text-primary" />,
      description: 'View comprehensive farm analytics'
    },
    {
      label: 'Performance Reports',
      href: '/dashboard/reports',
      icon: <ReportIcon className="h-5 w-5 text-primary" />,
      description: 'Access all farm reports'
    },
    {
      label: 'Staff Overview',
      href: '/dashboard/staff',
      icon: <UsersIcon className="h-5 w-5 text-primary" />,
      description: 'Monitor staff performance'
    }
  ];

  const performanceData = [
    { name: 'Livestock', value: data?.charts.livestock.reduce((acc, curr) => acc + curr.value, 0) || 0 },
    { name: 'Tasks', value: data?.charts.tasks.total || 0 },
    { name: 'Revenue', value: data?.charts.revenue[data.charts.revenue.length - 1]?.value || 0 }
  ];

  return (
    <DashboardBase
      role="manager"
      metrics={managerMetrics}
      actions={managerActions}
    >
      <div className="grid gap-6 mt-6">
        {/* Farm Performance Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Farm Performance Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.charts.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Revenue"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    <Cell fill={COLORS.primary} />
                    <Cell fill={COLORS.secondary} />
                    <Cell fill={COLORS.success} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Livestock Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Livestock Categories</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.charts.livestock}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={COLORS.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {data?.recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <PerformanceIcon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardBase>
  );
}

export function ManagerDashboard() {
  return (
    <ErrorBoundary>
      <ManagerDashboardContent />
    </ErrorBoundary>
  );
} 