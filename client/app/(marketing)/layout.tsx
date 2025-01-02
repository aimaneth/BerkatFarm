import { ReactNode } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { MainNavWrapper } from '@/components/layout/MainNavWrapper';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CustomCursor } from '@/components/ui/CustomCursor';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Navigation />
      <MainNavWrapper />
      <main>
        {children}
      </main>
      <ScrollProgress />
      <CustomCursor />
    </>
  );
} 