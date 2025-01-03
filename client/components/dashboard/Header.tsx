'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import {
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  showToggle: boolean;
  isMobile: boolean;
  isSidebarOpen: boolean;
}

export function Header({ 
  isSidebarCollapsed, 
  onToggleSidebar, 
  showToggle, 
  isMobile, 
  isSidebarOpen 
}: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {showToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              id="sidebar-toggle"
            >
              <Bars3Icon className="h-5 w-5" />
            </Button>
          )}
          <h2 className="text-lg font-semibold">Berkat Farm</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <BellIcon className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2">
                <NotificationCenter />
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon">
            <Cog6ToothIcon className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <UserCircleIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
} 