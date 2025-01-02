'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: { [key: string]: string } = {
    default: 'An error occurred during authentication',
    configuration: 'There is a problem with the server configuration',
    accessdenied: 'Access denied. You do not have permission to sign in',
    verification: 'The verification failed or the token has expired',
  };

  const message = error ? errorMessages[error] || errorMessages.default : errorMessages.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <div className="mt-4 text-center text-red-600">{message}</div>
        </div>
        <div className="flex justify-center">
          <Link href="/auth/login">
            <Button>Return to Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 