'use client';

import { Card } from '@/components/ui/Card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface FinancialAnalyticsProps {
  transactions: Array<{
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

export function FinancialAnalytics({ transactions }: FinancialAnalyticsProps) {
  // Process monthly data
  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    const existingMonth = acc.find(item => item.month === monthYear);
    if (existingMonth) {
      if (transaction.type === 'income') {
        existingMonth.income += transaction.amount;
      } else {
        existingMonth.expenses += transaction.amount;
      }
      existingMonth.netIncome = existingMonth.income - existingMonth.expenses;
    } else {
      acc.push({
        month: monthYear,
        income: transaction.type === 'income' ? transaction.amount : 0,
        expenses: transaction.type === 'expense' ? transaction.amount : 0,
        netIncome: transaction.type === 'income' ? transaction.amount : -transaction.amount,
      });
    }
    return acc;
  }, []).sort((a, b) => a.month.localeCompare(b.month));

  // Process category data
  const categoryData = transactions.reduce((acc: any[], transaction) => {
    const existingCategory = acc.find(item => item.category === transaction.category);
    if (existingCategory) {
      existingCategory.amount += transaction.amount;
    } else {
      acc.push({
        category: transaction.category,
        amount: transaction.amount,
      });
    }
    return acc;
  }, []);

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
    '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1',
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Trends */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Financial Trends</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10B981" 
                name="Income"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#EF4444" 
                name="Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="netIncome" 
                stroke="#6366F1" 
                name="Net Income"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Income vs Expenses */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#10B981" />
              <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense by Category</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData.filter(item => 
                    transactions.find(t => t.category === item.category)?.type === 'expense'
                  )}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income by Category</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData.filter(item => 
                    transactions.find(t => t.category === item.category)?.type === 'income'
                  )}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
} 