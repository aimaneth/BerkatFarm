'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Target, Trophy, TrendingUp, CheckCircle, Download, Plus, Filter, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function GoalsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedPeriod, setSelectedPeriod] = React.useState('month');
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [showExport, setShowExport] = React.useState(false);

  React.useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <LoadingScreen message="Loading goals..." />;
  }

  return (
    <div className="p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Farm Goals</h2>
        <p className="text-muted-foreground">
          Set and track your farm's objectives and targets
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Goals</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">16</p>
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
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-blue-50 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Achievement Rate</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button onClick={() => {}} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Goal
        </Button>
        <Button variant="outline" onClick={() => setShowExport(true)} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Goals
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
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Period</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Goals List */}
      <div className="mt-6">
        <Card className="p-6">
          <div className="space-y-2 mb-4">
            <h3 className="font-semibold">Active Goals</h3>
            <p className="text-sm text-muted-foreground">Track your current objectives</p>
          </div>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Goal</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Target</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Progress</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {/* Goal rows would go here */}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Goal Progress</h3>
            <p className="text-sm text-muted-foreground">Overall completion rate</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Progress Chart Component */}
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Goal Categories</h3>
            <p className="text-sm text-muted-foreground">Distribution by type</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Categories Chart Component */}
          </div>
        </Card>
      </div>
    </div>
  );
} 