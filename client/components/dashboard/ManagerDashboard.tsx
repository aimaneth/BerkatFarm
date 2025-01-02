import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { RoleBasedComponent } from '@/components/auth/RoleBasedComponent';
import { 
  UsersIcon, 
  ClipboardIcon, 
  TruckIcon, 
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export function ManagerDashboard() {
  const router = useRouter();

  return (
    <RoleBasedComponent requiredPermission="MANAGE_TEAM">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />
            Team Management
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/team')} className="w-full">
              View Team
            </Button>
            <Button onClick={() => router.push('/dashboard/team/schedule')} className="w-full">
              Manage Schedules
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ClipboardIcon className="w-5 h-5" />
            Livestock Management
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/livestock')} className="w-full">
              View Livestock
            </Button>
            <Button onClick={() => router.push('/dashboard/livestock/health')} className="w-full">
              Health Records
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TruckIcon className="w-5 h-5" />
            Distribution
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/distribution')} className="w-full">
              View Distribution
            </Button>
            <Button onClick={() => router.push('/dashboard/distribution/suppliers')} className="w-full">
              Manage Suppliers
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5" />
            Analytics
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/analytics')} className="w-full">
              View Reports
            </Button>
            <Button onClick={() => router.push('/dashboard/analytics/performance')} className="w-full">
              Performance Metrics
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Cog6ToothIcon className="w-5 h-5" />
            Settings
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/settings')} className="w-full">
              System Settings
            </Button>
            <Button onClick={() => router.push('/dashboard/settings/notifications')} className="w-full">
              Notifications
            </Button>
          </div>
        </Card>
      </div>
    </RoleBasedComponent>
  );
} 