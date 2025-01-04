import { ReactNode } from 'react';
import { Navigation } from '../shared/Navigation';
import { Header } from '../shared/Header';

interface DashboardShellProps {
  children: ReactNode;
  role?: 'admin' | 'manager' | 'accountant' | 'supervisor' | 'staff' | 'veterinarian';
}

// TODO: Set this to false in production
const DEVELOPMENT_MODE = true;

export function DashboardShell({ children, role = 'admin' }: DashboardShellProps) {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Fixed sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
        <Navigation role={role} />
      </div>
      
      {/* Main content area */}
      <div className="ml-64">
        {/* Fixed header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <Header />
        </div>
        
        {/* Main content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
} 