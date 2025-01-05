import { ReactNode } from 'react';
import { Navigation } from '../shared/Navigation';
import { Header } from '../shared/Header';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DashboardShellProps {
  children: ReactNode;
  role?: 'admin' | 'manager' | 'accountant' | 'supervisor' | 'staff' | 'veterinarian';
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function DashboardShell({ 
  children, 
  role = 'admin',
  isMobileMenuOpen,
  setIsMobileMenuOpen 
}: DashboardShellProps) {
  return (
    <div className="h-screen w-full flex bg-background">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-30 w-[280px] bg-background lg:relative lg:flex",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo + Close */}
        <div className="absolute inset-x-0 top-0 h-16 border-b flex items-center px-6">
          <span className="font-semibold">Berkat Farm</span>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Nav */}
        <div className="h-full w-full pt-16 pb-4">
          <nav className="h-full overflow-y-auto px-4">
            <Navigation role={role} />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-16 border-b flex items-center gap-4 px-6 bg-background">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Header />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 