export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 