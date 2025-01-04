import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  CowIcon,
  UsersIcon,
  TruckIcon,
  RevenueIcon,
  AnalyticsIcon,
  CalendarIcon,
  SettingsIcon,
  BellIcon
} from '@/components/icons';

interface NavigationProps {
  role: 'manager' | 'accountant' | 'supervisor' | 'staff' | 'veterinarian';
}

const roleBasedNavItems = {
  manager: [
    { name: 'Overview', href: '/dashboard', icon: AnalyticsIcon },
    { name: 'Livestock', href: '/dashboard/livestock', icon: CowIcon },
    { name: 'Team', href: '/dashboard/team', icon: UsersIcon },
    { name: 'Finance', href: '/dashboard/finance', icon: RevenueIcon },
    { name: 'Orders', href: '/dashboard/orders', icon: TruckIcon },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CalendarIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon }
  ],
  accountant: [
    { name: 'Overview', href: '/dashboard', icon: AnalyticsIcon },
    { name: 'Finance', href: '/dashboard/finance', icon: RevenueIcon },
    { name: 'Orders', href: '/dashboard/orders', icon: TruckIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon }
  ],
  supervisor: [
    { name: 'Overview', href: '/dashboard', icon: AnalyticsIcon },
    { name: 'Team', href: '/dashboard/team', icon: UsersIcon },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CalendarIcon },
    { name: 'Orders', href: '/dashboard/orders', icon: TruckIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon }
  ],
  veterinarian: [
    { name: 'Overview', href: '/dashboard', icon: AnalyticsIcon },
    { name: 'Livestock', href: '/dashboard/livestock', icon: CowIcon },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CalendarIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon }
  ],
  staff: [
    { name: 'Overview', href: '/dashboard', icon: AnalyticsIcon },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CalendarIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon }
  ]
};

export function Navigation({ role }: NavigationProps) {
  const pathname = usePathname();

  const navItems = roleBasedNavItems[role];

  return (
    <nav className="w-64 bg-white border-r border-gray-200 px-4 py-6">
      <div className="space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-lg',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 