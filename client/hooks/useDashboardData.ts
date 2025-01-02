import { useState, useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { livestockApi, teamApi, distributionApi, activityApi } from '@/services/api';
import { socketService } from '@/services/socket';
import type { Activity } from '@/types/api';

interface DashboardData {
  livestock: {
    count: number;
    isLoading: boolean;
    error: unknown;
  };
  team: {
    activeCount: number;
    isLoading: boolean;
    error: unknown;
  };
  distribution: {
    pendingCount: number;
    isLoading: boolean;
    error: unknown;
  };
  activities: {
    data: Activity[];
    isLoading: boolean;
    error: unknown;
  };
}

export function useDashboardData(): DashboardData {
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  // Fetch initial data
  const livestock = useQuery({
    queryKey: ['livestockCount'],
    queryFn: livestockApi.getCount
  });

  const team = useQuery({
    queryKey: ['teamActiveCount'],
    queryFn: teamApi.getActiveCount
  });

  const distribution = useQuery({
    queryKey: ['distributionPendingCount'],
    queryFn: distributionApi.getPendingCount
  });

  const activities = useQuery<Activity[]>({
    queryKey: ['recentActivities'],
    queryFn: () => activityApi.getRecent(5)
  });

  // Update recent activities when data changes
  useEffect(() => {
    if (activities.data) {
      setRecentActivities(activities.data);
    }
  }, [activities.data]);

  // Set up real-time updates
  useEffect(() => {
    socketService.onLivestockUpdate(() => {
      livestock.refetch();
    });

    socketService.onTeamUpdate(() => {
      team.refetch();
    });

    socketService.onDistributionUpdate(() => {
      distribution.refetch();
    });

    socketService.onNewActivity((activity) => {
      setRecentActivities(prev => [activity, ...prev].slice(0, 5));
    });

    return () => {
      socketService.disconnect();
    };
  }, [livestock.refetch, team.refetch, distribution.refetch]);

  return {
    livestock: {
      count: livestock.data ?? 0,
      isLoading: livestock.isLoading,
      error: livestock.error
    },
    team: {
      activeCount: team.data ?? 0,
      isLoading: team.isLoading,
      error: team.error
    },
    distribution: {
      pendingCount: distribution.data ?? 0,
      isLoading: distribution.isLoading,
      error: distribution.error
    },
    activities: {
      data: recentActivities,
      isLoading: activities.isLoading,
      error: activities.error
    }
  };
} 