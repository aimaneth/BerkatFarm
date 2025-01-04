import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardShell } from './DashboardShell';
import { Header } from '../shared/Header';
import { DashboardMetrics } from './DashboardMetrics';
import { DashboardActions } from './DashboardActions';

export interface DashboardBaseProps {
  children: ReactNode;
  role: 'manager' | 'accountant' | 'supervisor' | 'staff' | 'veterinarian';
  metrics: {
    key: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon?: ReactNode;
  }[];
  actions: {
    label: string;
    href: string;
    icon: ReactNode;
    description?: string;
  }[];
}

export function DashboardBase({
  children,
  role,
  metrics,
  actions
}: DashboardBaseProps) {
  const { data: session } = useSession();

  return (
    <DashboardShell role={role}>
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            <div className="grid gap-6">
              <DashboardMetrics metrics={metrics} />
              <DashboardActions actions={actions} />
              {children}
            </div>
          </div>
        </main>
      </div>
    </DashboardShell>
  );
} 