import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { RoleBasedComponent } from '@/components/auth/RoleBasedComponent';
import { 
  BanknotesIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  CalculatorIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

export function AccountantDashboard() {
  const router = useRouter();

  return (
    <RoleBasedComponent requiredPermission="MANAGE_FINANCE">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BanknotesIcon className="w-5 h-5" />
            Financial Overview
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/finance/overview')} className="w-full">
              View Overview
            </Button>
            <Button onClick={() => router.push('/dashboard/finance/transactions')} className="w-full">
              Recent Transactions
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5" />
            Invoices & Bills
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/invoices')} className="w-full">
              Manage Invoices
            </Button>
            <Button onClick={() => router.push('/dashboard/bills')} className="w-full">
              Track Bills
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5" />
            Budget Management
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/budget')} className="w-full">
              View Budget
            </Button>
            <Button onClick={() => router.push('/dashboard/budget/planning')} className="w-full">
              Budget Planning
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CalculatorIcon className="w-5 h-5" />
            Payroll
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/payroll')} className="w-full">
              Process Payroll
            </Button>
            <Button onClick={() => router.push('/dashboard/payroll/history')} className="w-full">
              Payroll History
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <DocumentChartBarIcon className="w-5 h-5" />
            Reports
          </h3>
          <div className="mt-4 space-y-2">
            <Button onClick={() => router.push('/dashboard/reports/financial')} className="w-full">
              Financial Reports
            </Button>
            <Button onClick={() => router.push('/dashboard/reports/tax')} className="w-full">
              Tax Reports
            </Button>
          </div>
        </Card>
      </div>
    </RoleBasedComponent>
  );
} 