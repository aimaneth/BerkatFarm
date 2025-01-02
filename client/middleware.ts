import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';
import { UserRole } from '@/shared/types/auth';

const PUBLIC_PATHS = ['/login', '/register', '/error', '/about', '/contact', '/products'];

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
    try {
      const token = req.nextauth.token;
      const path = req.nextUrl.pathname;
      
      console.log('=== Middleware Debug ===');
      console.log('Path:', path);
      console.log('Token:', JSON.stringify(token, null, 2));
      console.log('User role:', token?.role);

      // If user is on login/register page and is already authenticated, redirect to dashboard
      if ((path === '/login' || path === '/register') && token?.role) {
        console.log('Authenticated user detected on auth page, redirecting to dashboard');
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      
      // Allow public paths for non-authenticated users
      if (PUBLIC_PATHS.some(p => path === p || path.startsWith(`${p}/`))) {
        console.log('Public path, allowing access');
        return NextResponse.next();
      }

      // Allow static files and API routes
      if (
        path.startsWith('/_next') || 
        path.startsWith('/api') || 
        path.includes('/static/') ||
        path.includes('.') // files with extensions
      ) {
        console.log('Static/API path, allowing access');
        return NextResponse.next();
      }

      // If no token for protected routes, redirect to login
      if (!token) {
        console.log('No token found, redirecting to login');
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Check role-based access for protected routes
      const matchingRoute = Object.entries(ROLE_ROUTES).find(([route]) => {
        // Exact match or starts with route + /
        return path === route || path.startsWith(`${route}/`);
      });

      const allowedRoles = matchingRoute?.[1];

      console.log('Route check:', {
        path,
        matchingRoute: matchingRoute?.[0],
        allowedRoles,
        userRole: token.role,
        hasAccess: allowedRoles ? allowedRoles.includes(token.role as UserRole) : true
      });

      if (allowedRoles && !allowedRoles.includes(token.role as UserRole)) {
        console.log('Access denied - User role not in allowed roles');
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      console.log('Access granted');
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/error', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('Auth callback - Token:', JSON.stringify(token, null, 2));
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