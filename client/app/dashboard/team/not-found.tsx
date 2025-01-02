import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { UsersIcon } from 'lucide-react';

export default function TeamNotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
          <UsersIcon className="h-6 w-6 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Team Page Not Found
        </h3>
        <p className="text-gray-500 mb-6">
          The team page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/dashboard">
          <Button>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
} 