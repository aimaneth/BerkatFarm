import { useQuery } from '@tanstack/react-query';

interface DashboardMetric {
  key: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
}

interface DashboardAction {
  label: string;
  href: string;
  description?: string;
}

interface ChartDataPoint {
  name: string;
  value: number;
}

interface DashboardData {
  metrics: DashboardMetric[];
  actions: DashboardAction[];
  recentActivities: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }[];
  charts: {
    livestock: ChartDataPoint[];
    revenue: ChartDataPoint[];
    tasks: {
      total: number;
      completed: number;
      pending: number;
    };
  };
}

const mockDashboardData: Record<string, DashboardData> = {
  manager: {
    metrics: [],
    actions: [],
    recentActivities: [],
    charts: {
      livestock: [
        { name: 'Cattle', value: 150 },
        { name: 'Sheep', value: 300 },
        { name: 'Goats', value: 200 }
      ],
      revenue: [
        { name: 'Jan', value: 45000 },
        { name: 'Feb', value: 52000 },
        { name: 'Mar', value: 49000 },
        { name: 'Apr', value: 58000 },
        { name: 'May', value: 55000 },
        { name: 'Jun', value: 62000 }
      ],
      tasks: {
        total: 45,
        completed: 32,
        pending: 13
      }
    }
  }
};

async function fetchDashboardData(role: string): Promise<DashboardData> {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardData[role] || mockDashboardData.manager);
    }, 1000);
  });
}

export function useDashboardData(role: string) {
  return useQuery({
    queryKey: ['dashboard', role],
    queryFn: () => fetchDashboardData(role),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
} 