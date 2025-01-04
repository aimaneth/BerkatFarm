'use client';

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/base/DashboardShell';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <ErrorBoundary>
        <DashboardShell>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </DashboardShell>
      </ErrorBoundary>
    </div>
  );
} 