'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Settings page error:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong!
        </h3>
        <p className="text-gray-500 mb-6">
          {error.message || 'An error occurred while loading the settings page.'}
        </p>
        <Button
          onClick={reset}
          className="inline-flex items-center"
        >
          Try again
        </Button>
      </div>
    </div>
  );
} 