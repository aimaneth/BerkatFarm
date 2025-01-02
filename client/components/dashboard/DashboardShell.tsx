'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from './Navigation';
import Header from './Header';

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const toggleButton = document.getElementById('sidebar-toggle');
      
      if (isMobile && isSidebarOpen && sidebar && !sidebar.contains(event.target as Node) && 
          toggleButton && !toggleButton.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    const handleError = (error: Error) => {
      if (error.message.includes('ethereum')) {
        return;
      }
      setError(error);
    };

    window.addEventListener('error', (event) => handleError(event.error));
    return () => window.removeEventListener('error', (event) => handleError(event.error));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600">{error.message}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      {/* Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg z-30
          transition-all duration-300 ease-in-out
          ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''}
          ${!isMobile && isSidebarCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <Navigation isCollapsed={!isMobile && isSidebarCollapsed} />
      </aside>

      {/* Main content */}
      <main 
        className={`
          min-h-screen transition-all duration-300
          ${!isMobile && (isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64')}
        `}
      >
        <Header 
          isSidebarCollapsed={isSidebarCollapsed} 
          onToggleSidebar={() => isMobile ? setIsSidebarOpen(!isSidebarOpen) : setIsSidebarCollapsed(!isSidebarCollapsed)}
          showToggle={true}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
