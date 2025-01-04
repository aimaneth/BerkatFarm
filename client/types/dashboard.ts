import { LucideIcon } from 'lucide-react';

export interface ChartData {
  name: string;
  value: number;
}

export interface Activity {
  id: string;
  description: string;
  timestamp: string;
  type: string;
}

export interface DashboardMetric {
  key: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
}

export interface DashboardAction {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export interface DashboardData {
  charts: {
    livestock: ChartData[];
    tasks: {
      total: number;
      completed: number;
      pending: number;
    };
    revenue: ChartData[];
  };
  recentActivities: Activity[];
}

export type Role = 'manager' | 'accountant' | 'supervisor' | 'staff' | 'veterinarian'; 