'use client';

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';

const inter = Inter({ subsets: ['latin'] });

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className={`min-h-screen bg-gray-100 ${inter.className} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
} 