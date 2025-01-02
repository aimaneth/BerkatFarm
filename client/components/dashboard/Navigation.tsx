'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  HomeIcon, 
  UsersIcon, 
  ChartBarIcon,
  CogIcon,
  UserCircleIcon,
  TruckIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { UserRole } from '@/shared/types/auth';

interface NavigationProps {
  isCollapsed: boolean;
}

interface NavItem {
  name: string;
  href: string;
  icon: typeof HomeIcon;
  allowedRoles: UserRole[];
}

const navigation: NavItem[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: HomeIcon,
    allowedRoles: ['ADMIN', 'MANAGER', 'STAFF', 'VETERINARIAN', 'ACCOUNTANT', 'SUPERVISOR']
  },
  { 
    name: 'Team', 
    href: '/dashboard/team', 
    icon: UsersIcon,
    allowedRoles: ['ADMIN', 'MANAGER', 'SUPERVISOR']
  },
  { 
    name: 'Livestock', 
    href: '/dashboard/livestock', 
    icon: BeakerIcon,
    allowedRoles: ['ADMIN', 'MANAGER', 'VETERINARIAN', 'STAFF']
  },
  { 
    name: 'Distribution', 
    href: '/dashboard/distribution', 
    icon: TruckIcon,
    allowedRoles: ['ADMIN', 'MANAGER', 'STAFF']
  },
  { 
    name: 'Finance', 
    href: '/dashboard/finance', 
    icon: ChartBarIcon,
    allowedRoles: ['ADMIN', 'MANAGER', 'ACCOUNTANT']
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: CogIcon,
    allowedRoles: ['ADMIN', 'MANAGER']
  },
  { 
    name: 'Profile', 
    href: '/dashboard/profile', 
    icon: UserCircleIcon,
    allowedRoles: ['ADMIN', 'MANAGER', 'STAFF', 'VETERINARIAN', 'ACCOUNTANT', 'SUPERVISOR']
  },
];

export default function Navigation({ isCollapsed }: NavigationProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role as UserRole;

  const filteredNavigation = navigation.filter(item => 
    item.allowedRoles.includes(userRole)
  );

  return (
    <nav className="mt-4">
      <ul className="space-y-1 px-3">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`
                  flex items-center px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                  }
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 