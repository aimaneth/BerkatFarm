import { Card } from '@/components/ui/Card';

function SkeletonPulse() {
  return <div className="animate-pulse bg-gray-200 rounded-lg h-full" />;
}

export function DashboardSkeleton() {
  return (
    <div className="grid gap-6 mt-6">
      {/* Metrics Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <div className="h-4 w-24">
                <SkeletonPulse />
              </div>
              <div className="h-8 w-16">
                <SkeletonPulse />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart Skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 w-48">
            <SkeletonPulse />
          </div>
          <div className="h-[300px]">
            <SkeletonPulse />
          </div>
        </div>
      </Card>

      {/* Grid Charts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="space-y-4">
              <div className="h-6 w-36">
                <SkeletonPulse />
              </div>
              <div className="h-[300px]">
                <SkeletonPulse />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Activities Skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 w-48">
            <SkeletonPulse />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3 p-3">
              <div className="h-5 w-5 rounded-full">
                <SkeletonPulse />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4">
                  <SkeletonPulse />
                </div>
                <div className="h-3 w-1/4">
                  <SkeletonPulse />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 