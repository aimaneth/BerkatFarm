import { DashboardBase } from '../base/DashboardBase';
import {
  RevenueIcon,
  ExpenseIcon,
  ChartIcon,
  BudgetIcon,
  ReportIcon,
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

function AccountantDashboardContent() {
  const { data, isLoading, error } = useDashboardData('accountant');

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

  const accountantMetrics = [
    {
      key: 'Monthly Revenue',
      value: data?.charts.revenue[data.charts.revenue.length - 1]?.value || 0,
      change: '+15%',
      changeType: 'positive' as const,
      icon: <RevenueIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Monthly Expenses',
      value: data?.charts.tasks.total || 0,
      change: '-8%',
      changeType: 'positive' as const,
      icon: <ExpenseIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Net Profit',
      value: data?.charts.tasks.completed || 0,
      change: '+12%',
      changeType: 'positive' as const,
      icon: <ChartIcon className="h-5 w-5 text-primary" />
    },
    {
      key: 'Pending Invoices',
      value: data?.charts.tasks.pending || 0,
      change: '-3',
      changeType: 'positive' as const,
      icon: <BudgetIcon className="h-5 w-5 text-primary" />
    }
  ];

  const accountantActions = [
    {
      label: 'Financial Reports',
      href: '/dashboard/reports/financial',
      icon: <ReportIcon className="h-5 w-5 text-primary" />,
      description: 'View financial statements and reports'
    },
    {
      label: 'Budget Analysis',
      href: '/dashboard/budget',
      icon: <BudgetIcon className="h-5 w-5 text-primary" />,
      description: 'Analyze budget allocation and expenses'
    },
    {
      label: 'ROI Analysis',
      href: '/dashboard/roi',
      icon: <ChartIcon className="h-5 w-5 text-primary" />,
      description: 'Calculate return on investments'
    }
  ];

  const expenseData = [
    { name: 'Feed', value: 4000 },
    { name: 'Labor', value: 3000 },
    { name: 'Equipment', value: 2000 },
    { name: 'Healthcare', value: 1500 }
  ];

  return (
    <DashboardBase
      role="accountant"
      metrics={accountantMetrics}
      actions={accountantActions}
    >
      <div className="grid gap-6 mt-6">
        {/* Revenue Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
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
          {/* Expense Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Expense Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {expenseData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? COLORS.primary
                            : index === 1
                            ? COLORS.secondary
                            : index === 2
                            ? COLORS.error
                            : COLORS.success
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Monthly Comparison */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue vs Expenses</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.charts.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Revenue" fill={COLORS.primary} />
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

export function AccountantDashboard() {
  return (
    <ErrorBoundary>
      <AccountantDashboardContent />
    </ErrorBoundary>
  );
} 