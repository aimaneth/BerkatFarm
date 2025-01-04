import { ReactNode } from 'react';
import Link from 'next/link';

interface ActionProps {
  label: string;
  href: string;
  icon: ReactNode;
  description?: string;
}

interface DashboardActionsProps {
  actions: ActionProps[];
}

export function DashboardActions({ actions }: DashboardActionsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
        >
          <div className="flex-shrink-0 p-2 bg-primary-50 rounded-lg">
            {action.icon}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{action.label}</p>
            {action.description && (
              <p className="mt-1 text-sm text-gray-500">{action.description}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
} 