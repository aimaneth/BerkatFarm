import { DashboardBase } from '../base/DashboardBase';
import {
  TaskIcon,
  CompletedIcon,
  PendingIcon,
  ActivityIcon,
  CalendarIcon,
  ChecklistIcon,
  CowIcon
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

function StaffDashboardContent() {
  const { data, isLoading, error } = useDashboardData('staff');

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

  const staffMetrics = [
    {
      key: 'Tasks Assigned',
      value: data?.charts.tasks.total || 0,
      change: '+5',
      changeType: 'neutral' as const,
      icon: <TaskIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Tasks Completed',
      value: data?.charts.tasks.completed || 0,
      change: '+8',
      changeType: 'positive' as const,
      icon: <CompletedIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Pending Tasks',
      value: data?.charts.tasks.pending || 0,
      change: '-2',
      changeType: 'positive' as const,
      icon: <PendingIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Livestock Assigned',
      value: data?.charts.livestock.reduce((acc, curr) => acc + curr.value, 0) || 0,
      change: '+0',
      changeType: 'neutral' as const,
      icon: <CowIcon className="h-5 w-5 text-primary" />
    }
  ];

  const staffActions = [
    {
      label: 'View Schedule',
      href: '/dashboard/schedule',
      icon: <CalendarIcon className="h-5 w-5 text-primary" />,
      description: 'Check daily tasks and schedules'
    },
    {
      label: 'Task List',
      href: '/dashboard/tasks',
      icon: <ChecklistIcon className="h-5 w-5 text-primary" />,
      description: 'View and update assigned tasks'
    },
    {
      label: 'Activity Log',
      href: '/dashboard/activities',
      icon: <ActivityIcon className="h-5 w-5 text-primary" />,
      description: 'Track your daily activities'
    }
  ];

  const taskData = [
    { name: 'Completed', value: data?.charts.tasks.completed || 0 },
    { name: 'Pending', value: data?.charts.tasks.pending || 0 }
  ];

  return (
    <DashboardBase
      role="staff"
      metrics={staffMetrics}
      actions={staffActions}
    >
      <div className="grid gap-6 mt-6">
        {/* Daily Task Progress */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Task Progress</h3>
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
          {/* Task Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Task Status</h3>
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

          {/* Assigned Livestock */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Assigned Livestock</h3>
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
                <ActivityIcon className="h-5 w-5 text-primary mt-0.5" />
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

export function StaffDashboard() {
  return (
    <ErrorBoundary>
      <StaffDashboardContent />
    </ErrorBoundary>
  );
} 