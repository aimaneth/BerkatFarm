'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Team Not Found</h2>
      <p className="text-gray-500 text-center mb-6">
        The team page you're looking for doesn't exist or you don't have access to it.
      </p>
      <Link href="/dashboard">
        <Button>Return to Dashboard</Button>
      </Link>
    </div>
  );
} 