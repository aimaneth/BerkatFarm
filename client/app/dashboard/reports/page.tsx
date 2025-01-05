'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { FileText, BarChart2, PieChart, LineChart, Download, Plus, Filter, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ReportsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedPeriod, setSelectedPeriod] = React.useState('month');
  const [selectedType, setSelectedType] = React.useState('all');
  const [showExport, setShowExport] = React.useState(false);

  React.useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <LoadingScreen message="Loading reports..." />;
  }

  return (
    <div className="p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Generate and analyze farm performance reports
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">124</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-green-50 rounded-lg">
                <BarChart2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Financial</p>
                <p className="text-2xl font-bold">45</p>
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
                <p className="text-sm font-medium text-muted-foreground">Operations</p>
                <p className="text-2xl font-bold">38</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-purple-50 rounded-lg">
                <LineChart className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Analytics</p>
                <p className="text-2xl font-bold">41</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button onClick={() => {}} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Generate Report
        </Button>
        <Button variant="outline" onClick={() => setShowExport(true)} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Reports
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
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="analytics">Analytics</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Report Analysis */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Report Generation Trends</h3>
            <p className="text-sm text-muted-foreground">Monthly report activity</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Report Trends Chart Component */}
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Report Distribution</h3>
            <p className="text-sm text-muted-foreground">By category</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Distribution Chart Component */}
          </div>
        </Card>
      </div>

      {/* Recent Reports */}
      <div className="mt-6">
        <Card className="p-6">
          <div className="space-y-2 mb-4">
            <h3 className="font-semibold">Recent Reports</h3>
            <p className="text-sm text-muted-foreground">Latest generated reports</p>
          </div>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Report Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Generated By</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Report rows would go here */}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
} 