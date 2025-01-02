import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  FileText,
} from 'lucide-react';

const costMetrics = [
  {
    id: 1,
    category: 'Feed',
    monthlyCost: '$12,500',
    yearToDate: '$150,000',
    trend: 'up',
    percentage: '5%',
  },
  {
    id: 2,
    category: 'Healthcare',
    monthlyCost: '$3,200',
    yearToDate: '$38,400',
    trend: 'down',
    percentage: '2%',
  },
  {
    id: 3,
    category: 'Labor',
    monthlyCost: '$8,500',
    yearToDate: '$102,000',
    trend: 'stable',
    percentage: '0%',
  },
];

const revenueData = [
  {
    id: 1,
    source: 'Milk Production',
    monthlyRevenue: '$45,000',
    yearToDate: '$540,000',
    growth: '+8%',
    status: 'increasing',
  },
  {
    id: 2,
    source: 'Livestock Sales',
    monthlyRevenue: '$15,000',
    yearToDate: '$180,000',
    growth: '+3%',
    status: 'stable',
  },
];

const profitabilityMetrics = [
  {
    id: 1,
    metric: 'Gross Margin',
    value: '45%',
    previousPeriod: '42%',
    trend: 'up',
  },
  {
    id: 2,
    metric: 'ROI',
    value: '22%',
    previousPeriod: '20%',
    trend: 'up',
  },
  {
    id: 3,
    metric: 'Cost per Animal',
    value: '$850/month',
    previousPeriod: '$875/month',
    trend: 'down',
  },
  {
    id: 4,
    metric: 'Revenue per Animal',
    value: '$1,250/month',
    previousPeriod: '$1,200/month',
    trend: 'up',
  },
];

export function FinancialMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Analysis */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Cost Analysis</h3>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
          <div className="space-y-4">
            {costMetrics.map((cost) => (
              <div
                key={cost.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-red-500" />
                    <p className="font-medium text-gray-900">{cost.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {cost.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-red-500" />
                    ) : cost.trend === 'down' ? (
                      <ArrowDownRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                    )}
                    <span className="text-sm text-gray-500">{cost.percentage}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Monthly</p>
                    <p className="text-sm font-medium text-gray-900">{cost.monthlyCost}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Year to Date</p>
                    <p className="text-sm font-medium text-gray-900">{cost.yearToDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue Tracking */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Tracking</h3>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Trends
            </Button>
          </div>
          <div className="space-y-4">
            {revenueData.map((revenue) => (
              <div
                key={revenue.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <p className="font-medium text-gray-900">{revenue.source}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    revenue.status === 'increasing'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {revenue.growth}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Monthly</p>
                    <p className="text-sm font-medium text-gray-900">{revenue.monthlyRevenue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Year to Date</p>
                    <p className="text-sm font-medium text-gray-900">{revenue.yearToDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Profitability Metrics */}
        <Card className="p-4 sm:p-6 bg-white lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Profitability Metrics</h3>
            <Button variant="outline" size="sm">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate ROI
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profitabilityMetrics.map((metric) => (
              <div
                key={metric.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-500">{metric.metric}</p>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-xs text-gray-500">Previous: {metric.previousPeriod}</span>
                  <span className={`text-xs ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.trend === 'up' ? '↑' : '↓'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 