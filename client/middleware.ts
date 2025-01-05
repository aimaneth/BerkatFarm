import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';
import { UserRole } from '@/shared/types/auth';

// Paths that don't require authentication
const PUBLIC_PATHS = ['/', '/about', '/contact', '/products', '/features', '/pricing'];

// Auth paths (login/register)
const AUTH_PATHS = ['/auth/login', '/auth/register', '/auth/error', '/(auth)/login', '/(auth)/register', '/(auth)/error'];

const ROLE_ROUTES: Record<string, UserRole[]> = {
  '/dashboard': ['ADMIN', 'MANAGER', 'STAFF', 'VETERINARIAN', 'ACCOUNTANT', 'SUPERVISOR'],
  '/dashboard/team': ['ADMIN', 'MANAGER', 'SUPERVISOR'],
  '/dashboard/livestock': ['ADMIN', 'MANAGER', 'VETERINARIAN', 'STAFF'],
  '/dashboard/distribution': ['ADMIN', 'MANAGER', 'STAFF'],
  '/dashboard/finance': ['ADMIN', 'MANAGER', 'ACCOUNTANT'],
  '/dashboard/settings': ['ADMIN', 'MANAGER'],
  '/dashboard/profile': ['ADMIN', 'MANAGER', 'STAFF', 'VETERINARIAN', 'ACCOUNTANT', 'SUPERVISOR']
};

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { token } = req.nextauth;
    const path = req.nextUrl.pathname;

    // Allow public paths without any checks
    if (PUBLIC_PATHS.includes(path)) {
      return NextResponse.next();
    }

    // Handle auth paths (login/register)
    if (AUTH_PATHS.includes(path)) {
      // If user is already logged in, redirect to dashboard
      if (token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      // Allow access to auth pages for non-authenticated users
      return NextResponse.next();
    }

    // At this point, user should be authenticated for all other routes
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Check role-based access for protected routes
    for (const [routePath, allowedRoles] of Object.entries(ROLE_ROUTES)) {
      if (path.startsWith(routePath)) {
        if (!allowedRoles.includes(token.role as UserRole)) {
          return NextResponse.redirect(new URL('/', req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true // We'll handle authorization in the middleware function
    },
    pages: {
      signIn: '/auth/login',
      error: '/auth/error'
    }
  }
);

// Update the matcher to handle route groups correctly
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * - images (image files)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|images/|api/).*)',
  ]
}; 