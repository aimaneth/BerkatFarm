import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Line Chart Component
interface LineChartProps {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
  height?: string;
}

export function LineChartComponent({ data, options = {}, height = '300px' }: LineChartProps) {
  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Line data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
}

// Bar Chart Component
interface BarChartProps {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
  height?: string;
}

export function BarChartComponent({ data, options = {}, height = '300px' }: BarChartProps) {
  const defaultOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
}

// Pie Chart Component
interface PieChartProps {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
  height?: string;
}

export function PieChartComponent({ data, options = {}, height = '300px' }: PieChartProps) {
  const defaultOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Pie data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
}

// Helper function to generate gradient colors
export function generateGradient(ctx: CanvasRenderingContext2D, color: string) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, `${color}33`);
  return gradient;
}

// Theme colors
export const chartColors = {
  primary: '#2563eb',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  gray: '#6b7280',
}; 