import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import type { ComponentType, ReactElement } from 'react';
import type { Session } from 'next-auth';
import { UserRole, Permission, hasPermission, isAdmin, isManager, isStaff } from '@/shared/types/auth';

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
  };
}

export function useAuth(requiredPermission?: Permission) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const userRole = (session as CustomSession)?.user?.role;

  const checkPermission = (permission: Permission): boolean => {
    if (!userRole) return false;
    return hasPermission(userRole, permission);
  };

  if (requiredPermission && userRole && !checkPermission(requiredPermission)) {
    router.push('/unauthorized');
    return {
      session: null,
      status: 'loading',
      isAdmin: false,
      isManager: false,
      isStaff: false,
      hasPermission: checkPermission,
    };
  }

  return {
    session,
    status,
    isAdmin: userRole ? isAdmin(userRole) : false,
    isManager: userRole ? isManager(userRole) : false,
    isStaff: userRole ? isStaff(userRole) : false,
    hasPermission: checkPermission,
  };
}

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  requiredPermission?: Permission
): ComponentType<P> {
  return function ProtectedComponent(props: P): JSX.Element | null {
    const { session, status } = useAuth(requiredPermission);

    if (status === 'loading' || !session) {
      return null;
    }

    return <Component {...props} />;
  };
} 