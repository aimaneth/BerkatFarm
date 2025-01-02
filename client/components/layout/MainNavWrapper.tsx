'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';

function shouldShowMainNav(pathname: string) {
  // Don't show main nav on dashboard or auth routes
  return !pathname.startsWith('/dashboard') && !pathname.startsWith('/auth');
}

export function MainNavWrapper() {
  const pathname = usePathname();
  
  if (!shouldShowMainNav(pathname)) {
    return null;
  }

  return <Navigation />;
} 