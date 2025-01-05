'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { LineChart, BarChart, PieChart, TrendingUp, Download, Filter, Plus, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AnalyticsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedPeriod, setSelectedPeriod] = React.useState('month');
  const [selectedMetric, setSelectedMetric] = React.useState('all');
  const [showExport, setShowExport] = React.useState(false);

  React.useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <LoadingScreen message="Loading analytics..." />;
  }

  return (
    <div className="p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Farm Analytics</h2>
        <p className="text-muted-foreground">
          Monitor and analyze your farm's performance metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center">
                <LineChart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue Growth</p>
                <p className="text-2xl font-bold">+12.5%</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-green-50 rounded-lg">
                <BarChart className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Production Rate</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-blue-50 rounded-lg">
                <PieChart className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resource Usage</p>
                <p className="text-2xl font-bold">87.3%</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-yellow-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold">91.8%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button onClick={() => {}} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Report
        </Button>
        <Button variant="outline" onClick={() => setShowExport(true)} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Data
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
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="resources">Resources</SelectItem>
              <SelectItem value="efficiency">Efficiency</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Revenue Trends</h3>
            <p className="text-sm text-muted-foreground">Monthly revenue analysis</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Revenue Chart Component */}
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Production Output</h3>
            <p className="text-sm text-muted-foreground">Daily production metrics</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Production Chart Component */}
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Resource Allocation</h3>
            <p className="text-sm text-muted-foreground">Resource distribution</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Resource Chart Component */}
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Efficiency Metrics</h3>
            <p className="text-sm text-muted-foreground">Performance indicators</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Efficiency Chart Component */}
          </div>
        </Card>
      </div>
    </div>
  );
} 