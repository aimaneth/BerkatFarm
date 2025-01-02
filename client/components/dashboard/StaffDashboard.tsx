import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { RoleBasedComponent } from '@/components/auth/RoleBasedComponent';
import { 
  ClipboardIcon, 
  CalendarIcon, 
  ShieldCheckIcon, 
  WrenchIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

export function StaffDashboard() {
  const router = useRouter();

  return (
    <RoleBasedComponent requiredPermission="VIEW_TASKS">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ClipboardIcon className="w-5 h-5" />
            Daily Tasks
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/tasks')} className="w-full">
              View Tasks
            </Button>
            <Button onClick={() => router.push('/dashboard/tasks/create')} className="w-full">
              Report Progress
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Work Schedule
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/schedule')} className="w-full">
              View Schedule
            </Button>
            <Button onClick={() => router.push('/dashboard/schedule/requests')} className="w-full">
              Time Off Requests
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5" />
            Safety & Compliance
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/safety')} className="w-full">
              Safety Guidelines
            </Button>
            <Button onClick={() => router.push('/dashboard/safety/report')} className="w-full">
              Report Incident
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <WrenchIcon className="w-5 h-5" />
            Equipment & Supplies
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/equipment')} className="w-full">
              Check Equipment
            </Button>
            <Button onClick={() => router.push('/dashboard/supplies')} className="w-full">
              Request Supplies
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5" />
            Training & Support
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/training')} className="w-full">
              Training Materials
            </Button>
            <Button onClick={() => router.push('/dashboard/support')} className="w-full">
              Get Support
            </Button>
          </div>
        </Card>
      </div>
    </RoleBasedComponent>
  );
} 