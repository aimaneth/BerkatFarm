import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import DashboardShell from '@/components/dashboard/DashboardShell';

const inter = Inter({ subsets: ['latin'] });

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
} 