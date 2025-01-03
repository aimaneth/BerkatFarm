'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Bell as BellIcon } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { showNotification } from '@/lib/notifications';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  showToggle: boolean;
  isMobile: boolean;
  isSidebarOpen: boolean;
}

export default function Header({ 
  isSidebarCollapsed, 
  onToggleSidebar, 
  showToggle,
  isMobile,
  isSidebarOpen
}: HeaderProps) {
  const { data: session } = useSession();

  const handleNotificationClick = () => {
    showNotification({
      title: "Notifications",
      message: "Notification center coming soon!",
      type: "info",
      duration: 3000
    });
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center space-x-4">
          <button
            id="sidebar-toggle"
            onClick={onToggleSidebar}
            className="bg-white rounded-full p-1 hover:bg-gray-50 transition-all duration-200"
            aria-label="Toggle sidebar"
          >
            {isMobile ? (
              isSidebarOpen ? (
                <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronRightIcon className="w-6 h-6 text-gray-600" />
              )
            ) : (
              isSidebarCollapsed ? (
                <ChevronRightIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
              )
            )}
          </button>
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Berkat Farm"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text">
              Berkat Farm
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-full hover:bg-gray-50"
            >
              <BellIcon className="w-6 h-6" />
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-600">
                  {session?.user?.name?.[0] || 'U'}
                </span>
              </div>
              <span className="hidden md:inline-block text-sm font-medium">
                {session?.user?.name || 'User'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 