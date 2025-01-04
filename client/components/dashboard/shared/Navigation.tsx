import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Home,
  Beef,
  Users,
  DollarSign,
  ShoppingCart,
  CheckSquare,
  Settings,
  User,
  BarChart2,
  Calendar,
  FileText,
  PieChart,
  Target,
  Activity,
  HeartPulse,
  Calculator,
  LucideIcon,
} from 'lucide-react';

interface NavigationProps {
  role: 'admin' | 'manager' | 'accountant' | 'supervisor' | 'staff' | 'veterinarian';
}

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavigationSection {
  label: string;
  items: NavigationItem[];
}

type NavigationConfig = {
  [key: string]: NavigationSection;
}

// Navigation items grouped by section
const navigationConfig: NavigationConfig = {
  // Main Operations
  main: {
    label: 'Main',
    items: [
      { name: 'Overview', href: '/', icon: Home },
      { name: 'Livestock', href: '/livestock', icon: Beef },
      { name: 'Team', href: '/team', icon: Users },
      { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    ]
  },
  // Financial Management
  finance: {
    label: 'Finance',
    items: [
      { name: 'Finance', href: '/finance', icon: DollarSign },
      { name: 'Budget', href: '/budget', icon: Calculator },
      { name: 'ROI', href: '/roi', icon: PieChart },
    ]
  },
  // Planning & Analysis
  planning: {
    label: 'Planning',
    items: [
      { name: 'Schedule', href: '/schedule', icon: Calendar },
      { name: 'Goals', href: '/goals', icon: Target },
      { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    ]
  },
  // Health & Records
  health: {
    label: 'Health & Records',
    items: [
      { name: 'Health Records', href: '/health-records', icon: HeartPulse },
      { name: 'Reports', href: '/reports', icon: FileText },
    ]
  },
  // User
  user: {
    label: 'User',
    items: [
      { name: 'Settings', href: '/settings', icon: Settings },
      { name: 'Profile', href: '/profile', icon: User },
    ]
  }
};

// Role-based access configuration
const roleAccess: Record<NavigationProps['role'], string[]> = {
  admin: ['main', 'finance', 'planning', 'health', 'user'],
  manager: ['main', 'finance', 'planning', 'health', 'user'],
  accountant: ['finance', 'user'],
  supervisor: ['main', 'planning', 'user'],
  staff: ['main', 'user'],
  veterinarian: ['main', 'health', 'user'],
};

// Development mode flag
const DEVELOPMENT_MODE = true;

export function Navigation({ role }: NavigationProps) {
  const pathname = usePathname();
  
  // Get accessible sections based on role
  const accessibleSections = DEVELOPMENT_MODE ? 
    Object.keys(navigationConfig) : 
    roleAccess[role] || [];

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="flex flex-col gap-6 p-4">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg" />
          <span className="text-lg font-semibold text-gray-900">Berkat Farm</span>
        </div>

        {/* Navigation Sections */}
        <div className="flex flex-col gap-6">
          {accessibleSections.map(sectionKey => {
            const section = navigationConfig[sectionKey];
            return (
              <div key={sectionKey} className="flex flex-col gap-1">
                <div className="px-2 mb-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {section.label}
                  </p>
                </div>
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 