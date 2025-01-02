'use client';

import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Bell as BellIcon, BellRing as BellRingIcon, X as XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  showToggle: boolean;
  isMobile: boolean;
  isSidebarOpen: boolean;
}

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: 'Health Alert',
    message: 'Cattle #245 requires immediate veterinary attention',
    type: 'urgent',
    time: '5 minutes ago',
    read: false
  },
  {
    id: 2,
    title: 'Feed Stock Low',
    message: 'Grain inventory is below 20%. Reorder recommended.',
    type: 'warning',
    time: '30 minutes ago',
    read: false
  },
  {
    id: 3,
    title: 'Milk Production Update',
    message: 'Daily production target exceeded by 15%',
    type: 'success',
    time: '2 hours ago',
    read: true
  },
  {
    id: 4,
    title: 'Maintenance Required',
    message: 'Scheduled maintenance for milking equipment due tomorrow',
    type: 'info',
    time: '4 hours ago',
    read: true
  }
];

export default function Header({ 
  isSidebarCollapsed, 
  onToggleSidebar, 
  showToggle,
  isMobile,
  isSidebarOpen
}: HeaderProps) {
  const { data: session } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2); // Unread notifications count

  // Function to mark notification as read
  const markAsRead = (id: number) => {
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  // Function to mark all as read
  const markAllAsRead = () => {
    setNotificationCount(0);
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
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-full hover:bg-gray-50"
            >
              {notificationCount > 0 ? (
                <BellRingIcon className="w-6 h-6" />
              ) : (
                <BellIcon className="w-6 h-6" />
              )}
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notifications Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-emerald-600 hover:text-emerald-800"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                        !notification.read ? 'bg-emerald-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="ml-4 text-gray-400 hover:text-gray-600"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-full px-4 py-2 text-sm text-center text-emerald-600 hover:text-emerald-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="text-sm text-gray-600 hidden md:inline">
            Welcome, {session?.user?.name || session?.user?.email}
          </span>
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              <span className="hidden md:inline">Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 