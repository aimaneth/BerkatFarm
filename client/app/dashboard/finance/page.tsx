'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank, Download, Plus, Filter, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FinancePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedPeriod, setSelectedPeriod] = React.useState('month');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [showExport, setShowExport] = React.useState(false);

  React.useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <LoadingScreen message="Loading finance..." />;
  }

  return (
    <div className="p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Financial Overview</h2>
        <p className="text-muted-foreground">
          Monitor and analyze your farm's financial performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$245,800</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profit</p>
                <p className="text-2xl font-bold">$85,200</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-red-50 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expenses</p>
                <p className="text-2xl font-bold">$160,600</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-blue-50 rounded-lg">
                <PiggyBank className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Savings</p>
                <p className="text-2xl font-bold">$45,400</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button onClick={() => {}} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
        <Button variant="outline" onClick={() => setShowExport(true)} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Finance
        </Button>
      </div>

      {/* Filters */}
      <div className="mt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="purchases">Purchases</SelectItem>
              <SelectItem value="payroll">Payroll</SelectItem>
              <SelectItem value="investments">Investments</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Financial Analysis */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Revenue Analysis</h3>
            <p className="text-sm text-muted-foreground">Monthly revenue breakdown</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Revenue Chart Component */}
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Expense Distribution</h3>
            <p className="text-sm text-muted-foreground">Breakdown by category</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Expense Chart Component */}
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="mt-6">
        <Card className="p-6">
          <div className="space-y-2 mb-4">
            <h3 className="font-semibold">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground">Latest financial activities</p>
          </div>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Transaction rows would go here */}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
} 