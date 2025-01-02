'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface TeamLayoutProps {
  children: ReactNode;
}

export default function TeamLayout({ children }: TeamLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  // Check if user has permission to access team page
  const userRole = session?.user?.role;
  const allowedRoles = ['ADMIN', 'MANAGER', 'SUPERVISOR'];

  if (!allowedRoles.includes(userRole as string)) {
    router.push('/unauthorized');
    return null;
  }

  return <>{children}</>;
} 