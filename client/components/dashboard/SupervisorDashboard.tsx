import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { RoleBasedComponent } from '@/components/auth/RoleBasedComponent';
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  ClipboardDocumentIcon, 
  ShieldCheckIcon,
  WrenchIcon
} from '@heroicons/react/24/outline';

export function SupervisorDashboard() {
  const router = useRouter();

  return (
    <RoleBasedComponent requiredPermission="MANAGE_TEAM">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <UserGroupIcon className="w-5 h-5" />
            Team Management
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/team/overview')} className="w-full">
              Team Overview
            </Button>
            <Button onClick={() => router.push('/dashboard/team/schedule')} className="w-full">
              Manage Schedules
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5" />
            Performance Tracking
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/performance')} className="w-full">
              View Metrics
            </Button>
            <Button onClick={() => router.push('/dashboard/performance/reviews')} className="w-full">
              Team Reviews
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ClipboardDocumentIcon className="w-5 h-5" />
            Task Management
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/tasks/assign')} className="w-full">
              Assign Tasks
            </Button>
            <Button onClick={() => router.push('/dashboard/tasks/monitor')} className="w-full">
              Monitor Progress
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5" />
            Quality Control
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/quality')} className="w-full">
              Quality Metrics
            </Button>
            <Button onClick={() => router.push('/dashboard/quality/reports')} className="w-full">
              Submit Reports
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <WrenchIcon className="w-5 h-5" />
            Resource Management
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/resources')} className="w-full">
              View Resources
            </Button>
            <Button onClick={() => router.push('/dashboard/resources/requests')} className="w-full">
              Handle Requests
            </Button>
          </div>
        </Card>
      </div>
    </RoleBasedComponent>
  );
} 