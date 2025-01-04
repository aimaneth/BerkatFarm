import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Activity } from '@/types/dashboard';

interface RecentActivitiesProps {
  activities: Activity[];
  ActivityIcon: LucideIcon;
  emptyMessage?: string;
}

export function RecentActivities({ 
  activities, 
  ActivityIcon,
  emptyMessage = "No recent activities" 
}: RecentActivitiesProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <ActivityIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <EmptyState 
            message={emptyMessage} 
            icon={ActivityIcon}
          />
        )}
      </div>
    </Card>
  );
} 