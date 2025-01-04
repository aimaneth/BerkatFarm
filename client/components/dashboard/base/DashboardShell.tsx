import { ReactNode } from 'react';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        {children}
      </div>
    </div>
  );
} 