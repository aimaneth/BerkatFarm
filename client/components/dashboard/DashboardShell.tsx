'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Navigation from './Navigation';
import Header from './Header';

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } fixed top-0 left-0 z-30 h-full bg-white shadow-sm transition-all duration-300 ease-in-out`}
      >
        <Navigation isCollapsed={isSidebarCollapsed} />
      </aside>

      {/* Main content */}
      <main className={`min-h-screen transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <Header 
          isSidebarCollapsed={isSidebarCollapsed} 
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
