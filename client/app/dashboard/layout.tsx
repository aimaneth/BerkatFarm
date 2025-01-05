'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/base/DashboardShell';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <LoadingScreen message="Loading dashboard..." />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="h-screen w-full bg-background">
      <DashboardShell
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      >
        <div className={cn(
          "h-full w-full",
          isMobileMenuOpen && "lg:pointer-events-auto lg:opacity-100 opacity-50 pointer-events-none"
        )}>
          {children}
        </div>
      </DashboardShell>
    </div>
  );
} 