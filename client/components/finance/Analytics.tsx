'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  DollarSign as DollarSignIcon,
  ArrowUpRight as ArrowUpRightIcon,
  ArrowDownRight as ArrowDownRightIcon,
  Download as DownloadIcon,
} from 'lucide-react';

interface AnalyticsProps {
  transactions: Array<{
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

interface Metric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

export function Analytics({ transactions }: AnalyticsProps) {
  const [period, setPeriod] = useState('monthly');

  const metrics: Metric[] = [
    {
      label: 'Total Revenue',
      value: 25000.00,
      change: 12.5,
      trend: 'up',
      icon: <DollarSignIcon className="h-5 w-5 text-emerald-600" />,
    },
    {
      label: 'Total Expenses',
      value: 18500.00,
      change: 8.2,
      trend: 'up',
      icon: <TrendingUpIcon className="h-5 w-5 text-red-600" />,
    },
    {
      label: 'Net Profit',
      value: 6500.00,
      change: -4.8,
      trend: 'down',
      icon: <TrendingDownIcon className="h-5 w-5 text-blue-600" />,
    },
  ];

  const expensesByCategory = [
    { category: 'Feed & Supplies', amount: 8500.00, percentage: 45 },
    { category: 'Equipment Maintenance', amount: 4200.00, percentage: 23 },
    { category: 'Veterinary Services', amount: 3100.00, percentage: 17 },
    { category: 'Labor', amount: 2700.00, percentage: 15 },
  ];

  const recentTransactions = [
    {
      id: 1,
      description: 'Feed Purchase',
      amount: -2500.00,
      date: '2024-02-20',
      type: 'expense',
    },
    {
      id: 2,
      description: 'Livestock Sale',
      amount: 5000.00,
      date: '2024-02-19',
      type: 'income',
    },
    {
      id: 3,
      description: 'Veterinary Services',
      amount: -800.00,
      date: '2024-02-18',
      type: 'expense',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Financial Analytics</h2>
        <div className="flex items-center gap-3">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="weekly" className="hover:bg-gray-100">Weekly</SelectItem>
              <SelectItem value="monthly" className="hover:bg-gray-100">Monthly</SelectItem>
              <SelectItem value="yearly" className="hover:bg-gray-100">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="bg-white"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {metric.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${metric.value.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUpRightIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownRightIcon className="h-4 w-4" />
                )}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Expenses by Category */}
      <Card className="p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-medium text-gray-900">Expenses by Category</h3>
          <p className="text-sm text-gray-500">Total: $18,500.00</p>
        </div>
        <div className="space-y-4">
          {expensesByCategory.map((expense, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{expense.category}</span>
                <span className="text-gray-900">${expense.amount.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${expense.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6 bg-white">
        <h3 className="text-base font-medium text-gray-900 mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <p className={`text-sm font-medium ${
                transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 