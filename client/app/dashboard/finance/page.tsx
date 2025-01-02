'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';

export default function FinancePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your farm's finances and transactions
          </p>
        </div>
      </div>

      <Card className="p-6">
        <p>Financial management content will go here.</p>
      </Card>
    </div>
  );
} 