import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';
import { UserRole } from '@/shared/types/auth';

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/auth/error', '/about', '/contact', '/products'];

// TODO: Set this to false in production
const DEVELOPMENT_MODE = true;

const ROLE_ROUTES: Record<string, UserRole[]> = {
  '/': ['ADMIN', 'MANAGER', 'STAFF', 'VETERINARIAN', 'ACCOUNTANT', 'SUPERVISOR'],
  '/team': ['ADMIN', 'MANAGER', 'SUPERVISOR'],
  '/livestock': ['ADMIN', 'MANAGER', 'VETERINARIAN', 'STAFF'],
  '/distribution': ['ADMIN', 'MANAGER', 'STAFF'],
  '/finance': ['ADMIN', 'MANAGER', 'ACCOUNTANT'],
  '/settings': ['ADMIN', 'MANAGER'],
  '/profile': ['ADMIN', 'MANAGER', 'STAFF', 'VETERINARIAN', 'ACCOUNTANT', 'SUPERVISOR']
};

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    try {
      const token = req.nextauth.token;
      const path = req.nextUrl.pathname;

      // If user is on login/register page and is already authenticated, redirect to dashboard
      if ((path === '/auth/login' || path === '/auth/register') && token?.role) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      // Allow public paths for non-authenticated users
      if (PUBLIC_PATHS.some(p => path === p || path.startsWith(`${p}/`))) {
        return NextResponse.next();
      }

      // Allow static files and API routes
      if (
        path.startsWith('/_next') || 
        path.startsWith('/api') || 
        path.includes('/static/') ||
        path.includes('.') // files with extensions
      ) {
        return NextResponse.next();
      }

      // If no token for protected routes, redirect to login
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }

      // In development mode, allow access to all routes
      if (DEVELOPMENT_MODE) {
        return NextResponse.next();
      }

      // Check role-based access for protected routes
      const matchingRoute = Object.entries(ROLE_ROUTES).find(([route]) => {
        // Exact match or starts with route + /
        return path === route || path.startsWith(`${route}/`);
      });

      const allowedRoles = matchingRoute?.[1];

      if (allowedRoles && !allowedRoles.includes(token.role as UserRole)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/auth/error', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return true; // Let the middleware function handle authorization
      }
    }
  }
);

// Make sure to include all paths that need middleware protection
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * - images (image files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|images/).*)',
  ]
}; 