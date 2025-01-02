import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { RoleBasedComponent } from '@/components/auth/RoleBasedComponent';
import { 
  HeartIcon, 
  ClipboardDocumentIcon, 
  BeakerIcon, 
  CalendarIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

export function VeterinarianDashboard() {
  const router = useRouter();

  return (
    <RoleBasedComponent requiredPermission="MANAGE_HEALTH">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <HeartIcon className="w-5 h-5" />
            Health Monitoring
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/health/monitoring')} className="w-full">
              View Health Status
            </Button>
            <Button onClick={() => router.push('/dashboard/health/alerts')} className="w-full">
              Health Alerts
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ClipboardDocumentIcon className="w-5 h-5" />
            Medical Records
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/medical/records')} className="w-full">
              View Records
            </Button>
            <Button onClick={() => router.push('/dashboard/medical/update')} className="w-full">
              Update Records
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BeakerIcon className="w-5 h-5" />
            Treatment Plans
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/treatment/plans')} className="w-full">
              View Plans
            </Button>
            <Button onClick={() => router.push('/dashboard/treatment/create')} className="w-full">
              Create Plan
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Appointments
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/appointments')} className="w-full">
              View Schedule
            </Button>
            <Button onClick={() => router.push('/dashboard/appointments/book')} className="w-full">
              Book Appointment
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <DocumentChartBarIcon className="w-5 h-5" />
            Reports & Analytics
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/reports')} className="w-full">
              View Reports
            </Button>
            <Button onClick={() => router.push('/dashboard/reports/generate')} className="w-full">
              Generate Report
            </Button>
          </div>
        </Card>
      </div>
    </RoleBasedComponent>
  );
} 