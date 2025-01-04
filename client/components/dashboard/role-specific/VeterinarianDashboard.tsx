import { DashboardBase } from '../base/DashboardBase';
import {
  HealthIcon,
  MedicalIcon,
  AlertIcon,
  CalendarIcon,
  CowIcon,
  ChecklistIcon,
  ActivityIcon
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

function VeterinarianDashboardContent() {
  const { data, isLoading, error } = useDashboardData('veterinarian');

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

  const vetMetrics = [
    {
      key: 'Animals Treated',
      value: data?.charts.livestock.reduce((acc, curr) => acc + curr.value, 0) || 0,
      change: '+12',
      changeType: 'positive' as const,
      icon: <HealthIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Vaccinations',
      value: data?.charts.tasks.completed || 0,
      change: '+8',
      changeType: 'positive' as const,
      icon: <MedicalIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Health Alerts',
      value: data?.charts.tasks.pending || 0,
      change: '-3',
      changeType: 'positive' as const,
      icon: <AlertIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Appointments',
      value: '5',
      change: '+2',
      changeType: 'neutral' as const,
      icon: <CalendarIcon className="h-5 w-5 text-primary" />
    }
  ];

  const vetActions = [
    {
      label: 'Health Records',
      href: '/dashboard/health-records',
      icon: <HealthIcon className="h-5 w-5 text-primary" />,
      description: 'View animal health records'
    },
    {
      label: 'Schedule Checkup',
      href: '/dashboard/schedule-checkup',
      icon: <CalendarIcon className="h-5 w-5 text-primary" />,
      description: 'Schedule routine checkups'
    },
    {
      label: 'Treatment Log',
      href: '/dashboard/treatment-log',
      icon: <ChecklistIcon className="h-5 w-5 text-primary" />,
      description: 'Record treatments and medications'
    }
  ];

  const healthData = [
    { name: 'Healthy', value: data?.charts.livestock.reduce((acc, curr) => acc + curr.value, 0) || 0 },
    { name: 'Under Treatment', value: data?.charts.tasks.pending || 0 }
  ];

  return (
    <DashboardBase
      role="veterinarian"
      metrics={vetMetrics}
      actions={vetActions}
    >
      <div className="grid gap-6 mt-6">
        {/* Health Status Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Health Status Overview</h3>
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
                  name="Health Status"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Health Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthData}
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

          {/* Livestock Categories */}
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

export function VeterinarianDashboard() {
  return (
    <ErrorBoundary>
      <VeterinarianDashboardContent />
    </ErrorBoundary>
  );
} 