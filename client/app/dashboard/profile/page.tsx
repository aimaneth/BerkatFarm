'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';

export default function ProfilePage() {
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
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Personal Information</h3>
            <p className="text-sm text-gray-500">Update your personal details</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{session?.user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{session?.user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 text-sm text-gray-900">{session?.user?.role}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 