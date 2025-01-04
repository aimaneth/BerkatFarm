import Link from 'next/link';
import { FileQuestion, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <FileQuestion className="h-12 w-12 text-gray-400 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
        <p className="text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Link>
        </div>
      </div>
    </div>
  );
} 