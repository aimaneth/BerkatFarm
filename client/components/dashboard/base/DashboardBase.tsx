import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardShell } from './DashboardShell';
import { Navigation } from '../shared/Navigation';
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
    <DashboardShell>
      <Header user={session?.user} />
      <div className="flex h-screen">
        <Navigation role={role} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6">
            <DashboardMetrics metrics={metrics} />
            <DashboardActions actions={actions} />
            {children}
          </div>
        </main>
      </div>
    </DashboardShell>
  );
} 