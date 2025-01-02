export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mt-2"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
} 