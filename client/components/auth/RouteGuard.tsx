import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

// TODO: Set this to false in production
const DEVELOPMENT_MODE = true;

export function RouteGuard({ children, allowedRoles = [] }: RouteGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push(`/auth/login?returnUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    // Skip role check in development mode
    if (!DEVELOPMENT_MODE && allowedRoles.length > 0 && !allowedRoles.includes(session.user?.role as string)) {
      router.push('/unauthorized');
    }
  }, [session, status, router, pathname, allowedRoles]);

  if (status === 'loading') {
    return <LoadingScreen message="Checking authorization..." />;
  }

  if (!session) {
    return null;
  }

  // Skip role check in development mode
  if (!DEVELOPMENT_MODE && allowedRoles.length > 0 && !allowedRoles.includes(session.user?.role as string)) {
    return null;
  }

  return <>{children}</>;
} 