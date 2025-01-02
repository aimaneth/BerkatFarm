import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/shared/types/auth';
import { cn } from '@/lib/utils';

// Navigation items by role
const navigationItems: Record<UserRole, Array<{ name: string; href: string; icon: string }>> = {
  ADMIN: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Team', href: '/dashboard/team', icon: '👥' },
    { name: 'Livestock', href: '/dashboard/livestock', icon: '🐄' },
    { name: 'Distribution', href: '/dashboard/distribution', icon: '🚚' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ],
  MANAGER: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Team', href: '/dashboard/team', icon: '👥' },
    { name: 'Livestock', href: '/dashboard/livestock', icon: '🐄' },
    { name: 'Distribution', href: '/dashboard/distribution', icon: '🚚' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  ],
  VETERINARIAN: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Health Records', href: '/dashboard/livestock/health', icon: '🏥' },
    { name: 'Treatments', href: '/dashboard/livestock/treatments', icon: '💉' },
    { name: 'Lab Results', href: '/dashboard/livestock/lab', icon: '🔬' },
    { name: 'Emergency', href: '/dashboard/livestock/emergency', icon: '🚨' },
  ],
  ACCOUNTANT: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Finances', href: '/dashboard/finance', icon: '💰' },
    { name: 'Payroll', href: '/dashboard/finance/payroll', icon: '💵' },
    { name: 'Expenses', href: '/dashboard/finance/expenses', icon: '📑' },
    { name: 'Reports', href: '/dashboard/finance/reports', icon: '📈' },
  ],
  SUPERVISOR: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Team', href: '/dashboard/team', icon: '👥' },
    { name: 'Tasks', href: '/dashboard/tasks', icon: '✅' },
    { name: 'Livestock', href: '/dashboard/livestock', icon: '🐄' },
    { name: 'Reports', href: '/dashboard/reports', icon: '📋' },
  ],
  STAFF: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Tasks', href: '/dashboard/tasks', icon: '✅' },
    { name: 'Livestock', href: '/dashboard/livestock', icon: '🐄' },
    { name: 'Schedule', href: '/dashboard/schedule', icon: '📅' },
  ],
};

export const RoleBasedNavigation = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const userRole = session?.user?.role as UserRole;

  if (!userRole) return null;

  const items = navigationItems[userRole];

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}; 