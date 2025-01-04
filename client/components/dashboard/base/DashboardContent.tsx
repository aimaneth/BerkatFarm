import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { ChartData, Activity } from '@/types/dashboard';
import { LineChartSection } from '../charts/LineChartSection';
import { PieChartSection } from '../charts/PieChartSection';
import { BarChartSection } from '../charts/BarChartSection';
import { RecentActivities } from './RecentActivities';

/**
 * Props for the DashboardContent component
 * @property {string} title - The title of the dashboard section
 * @property {ChartData[]} lineChartData - Data for the line chart
 * @property {ChartData[]} pieChartData - Data for the pie chart
 * @property {ChartData[]} barChartData - Data for the bar chart
 * @property {Activity[]} recentActivities - List of recent activities
 * @property {LucideIcon} ActivityIcon - Icon component for activities
 * @property {string[]} pieChartColors - Optional array of colors for pie chart
 */
interface DashboardContentProps {
  title: string;
  lineChartData: ChartData[];
  pieChartData: ChartData[];
  barChartData: ChartData[];
  recentActivities: Activity[];
  ActivityIcon: LucideIcon;
  pieChartColors?: string[];
}

export function DashboardContent({
  title,
  lineChartData,
  pieChartData,
  barChartData,
  recentActivities,
  ActivityIcon,
  pieChartColors
}: DashboardContentProps) {
  return (
    <div className="grid gap-6 mt-6">
      <LineChartSection title={title} data={lineChartData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChartSection title="Distribution" data={pieChartData} colors={pieChartColors} />
        <BarChartSection title="Categories" data={barChartData} />
      </div>

      <RecentActivities 
        activities={recentActivities} 
        ActivityIcon={ActivityIcon} 
      />
    </div>
  );
} 