'use client';

import { useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-2">Welcome, {session?.user?.name}</p>
    </div>
  );
} 