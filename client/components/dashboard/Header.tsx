'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export default function Header({ isSidebarCollapsed, onToggleSidebar }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="bg-white rounded-full p-1 hover:bg-gray-50 transition-all duration-200"
          >
            {isSidebarCollapsed ? (
              <ChevronRightIcon className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
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
          <span className="text-sm text-gray-600">
            Welcome, {session?.user?.name || session?.user?.email}
          </span>
        </div>
      </div>
    </header>
  );
} 