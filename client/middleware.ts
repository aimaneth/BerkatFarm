import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';
import { UserRole } from '@/shared/types/auth';

const PUBLIC_PATHS = ['/', '/login', '/register', '/error', '/about', '/contact', '/products'];

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
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    
    console.log('=== Middleware Debug ===');
    console.log('Path:', path);
    console.log('Token:', token);
    console.log('User role:', token?.role);

    // If user is on login/register page and is already authenticated, redirect to dashboard
    if ((path === '/login' || path === '/register') && token?.role === 'ADMIN') {
      console.log('Admin user detected on auth page, redirecting to dashboard');
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
    const allowedRoles = ROLE_ROUTES[path] || 
                        Object.entries(ROLE_ROUTES)
                          .find(([route]) => path.startsWith(route))?.[1];

    console.log('Route check:', {
      path,
      allowedRoles,
      userRole: token.role,
      hasAccess: allowedRoles ? allowedRoles.includes(token.role as UserRole) : true
    });

    if (allowedRoles && !allowedRoles.includes(token.role as UserRole)) {
      console.log('Access denied - User role not in allowed roles');
      return NextResponse.redirect(new URL('/', req.url));
    }

    console.log('Access granted');
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('Auth callback - Token:', token);
        return true; // Let the middleware function handle authorization
      }
    }
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ]
}; 