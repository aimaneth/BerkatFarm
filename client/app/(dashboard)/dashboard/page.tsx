'use client';

import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {session?.user?.name || session?.user?.email}!
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">Dashboard content goes here</p>
      </div>
    </div>
  );
} 