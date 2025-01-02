import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { Permission } from '@/shared/types/auth';

interface RoleBasedComponentProps {
  requiredPermission?: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleBasedComponent({
  requiredPermission,
  children,
  fallback = null
}: RoleBasedComponentProps) {
  const { hasPermission } = useAuth();

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
} 