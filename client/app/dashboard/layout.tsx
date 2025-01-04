'use client';

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { DashboardShell } from '@/components/dashboard/base/DashboardShell';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { RouteGuard } from '@/components/auth/RouteGuard';
import { showToast } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const handleError = (error: Error) => {
    console.error('Dashboard Error:', error);
    showToast(error.message || 'An unexpected error occurred', 'error');
  };

  return (
    <RouteGuard>
      <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
        <ErrorBoundary 
          onError={handleError}
          fallback={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Error</h1>
                <p className="text-gray-600">There was a problem loading the dashboard.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 text-sm text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  Reload Page
                </button>
              </div>
            </div>
          }
        >
          <DashboardShell>
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </DashboardShell>
        </ErrorBoundary>
      </div>
    </RouteGuard>
  );
} 