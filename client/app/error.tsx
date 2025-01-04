'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-900">Something went wrong!</h1>
        <p className="text-gray-600">
          {error.message || 'An unexpected error occurred. Please try again later.'}
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 