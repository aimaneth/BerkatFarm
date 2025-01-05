'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, CheckCircle, AlertCircle, Download, Plus, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SchedulePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedPeriod, setSelectedPeriod] = React.useState('week');
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
    return <LoadingScreen message="Loading schedule..." />;
  }

  return (
    <div className="p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Schedule Management</h2>
        <p className="text-muted-foreground">
          Plan and organize your farm's activities and events
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">48</p>
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
                <p className="text-2xl font-bold">32</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-yellow-50 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-red-50 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button onClick={() => {}} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
        <Button variant="outline" onClick={() => setShowExport(true)} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Schedule
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
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="feeding">Feeding</SelectItem>
              <SelectItem value="health">Health Check</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="delivery">Delivery</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calendar View */}
      <div className="mt-6">
        <Card className="p-6">
          <div className="space-y-2 mb-4">
            <h3 className="font-semibold">Calendar</h3>
            <p className="text-sm text-muted-foreground">View and manage your schedule</p>
          </div>
          <div className="h-[600px]">
            {/* Calendar Component */}
          </div>
        </Card>
      </div>

      {/* Upcoming Events */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Upcoming Events</h3>
            <p className="text-sm text-muted-foreground">Next 7 days</p>
          </div>
          <div className="mt-4">
            <div className="space-y-4">
              {/* Event list would go here */}
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Event Distribution</h3>
            <p className="text-sm text-muted-foreground">By category</p>
          </div>
          <div className="h-[300px] mt-4">
            {/* Distribution Chart Component */}
          </div>
        </Card>
      </div>
    </div>
  );
} 