import { DashboardBase } from '../base/DashboardBase';
import {
  TaskIcon,
  CompletedIcon,
  PendingIcon,
  UsersIcon,
  PerformanceIcon,
  GoalIcon,
  ChecklistIcon
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

function SupervisorDashboardContent() {
  const { data, isLoading, error } = useDashboardData('supervisor');

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

  const supervisorMetrics = [
    {
      key: 'Total Tasks',
      value: data?.charts.tasks.total || 0,
      change: '+8',
      changeType: 'positive' as const,
      icon: <TaskIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Completed Tasks',
      value: data?.charts.tasks.completed || 0,
      change: '+12',
      changeType: 'positive' as const,
      icon: <CompletedIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Pending Tasks',
      value: data?.charts.tasks.pending || 0,
      change: '-3',
      changeType: 'positive' as const,
      icon: <PendingIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Active Team Members',
      value: '8',
      change: '+1',
      changeType: 'positive' as const,
      icon: <UsersIcon className="h-5 w-5 text-primary" />
    }
  ];

  const supervisorActions = [
    {
      label: 'Team Performance',
      href: '/dashboard/team/performance',
      icon: <PerformanceIcon className="h-5 w-5 text-primary" />,
      description: 'View team metrics and KPIs'
    },
    {
      label: 'Task Management',
      href: '/dashboard/tasks',
      icon: <TaskIcon className="h-5 w-5 text-primary" />,
      description: 'Manage and assign tasks'
    },
    {
      label: 'Goals & Objectives',
      href: '/dashboard/goals',
      icon: <GoalIcon className="h-5 w-5 text-primary" />,
      description: 'Track team goals'
    }
  ];

  const taskData = [
    { name: 'Completed', value: data?.charts.tasks.completed || 0 },
    { name: 'Pending', value: data?.charts.tasks.pending || 0 }
  ];

  return (
    <DashboardBase
      role="supervisor"
      metrics={supervisorMetrics}
      actions={supervisorActions}
    >
      <div className="grid gap-6 mt-6">
        {/* Task Progress Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Task Progress Overview</h3>
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
                  name="Tasks"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    <Cell fill={COLORS.success} />
                    <Cell fill={COLORS.secondary} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Team Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
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
                <ChecklistIcon className="h-5 w-5 text-primary mt-0.5" />
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

export function SupervisorDashboard() {
  return (
    <ErrorBoundary>
      <SupervisorDashboardContent />
    </ErrorBoundary>
  );
} 