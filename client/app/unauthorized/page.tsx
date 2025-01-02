'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-12 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <ShieldExclamationIcon className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Access Denied
          </h1>
          <p className="mt-2 text-gray-600">
            You don't have permission to access this page. Please contact your administrator if you think this is a mistake.
          </p>
          <div className="mt-6 space-y-4">
            <Button
              onClick={() => router.back()}
              className="w-full group inline-flex items-center justify-center"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Go Back
            </Button>
            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="w-full"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 