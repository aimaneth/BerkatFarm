'use client';

import { useSession } from 'next-auth/react';

export default function DistributionPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Distribution Management</h1>
      <p className="mt-2">Welcome, {session?.user?.name}</p>
    </div>
  );
} 