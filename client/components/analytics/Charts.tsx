'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartProps {
  type: 'pie' | 'line' | 'bar' | 'mixed';
  data: any;
  options?: any;
}

export function ChartComponent({ type, data, options = {} }: ChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: type === 'mixed' ? 'bar' : type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
        },
        ...options,
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return <canvas ref={chartRef} />;
}

export function PieChart({ data }: { data: any }) {
  return (
    <ChartComponent
      type="pie"
      data={{
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: [
              'rgba(16, 185, 129, 0.2)',  // emerald
              'rgba(245, 158, 11, 0.2)',  // yellow
              'rgba(239, 68, 68, 0.2)',   // red
            ],
            borderColor: [
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}

export function LineChart({ labels, data }: { labels: string[]; data: number[] }) {
  return (
    <ChartComponent
      type="line"
      data={{
        labels,
        datasets: [
          {
            label: 'Trend',
            data,
            fill: false,
            borderColor: 'rgb(16, 185, 129)',
            tension: 0.1,
          },
        ],
      }}
    />
  );
}

export function BarChart({ labels, data }: { labels: string[]; data: number[] }) {
  return (
    <ChartComponent
      type="bar"
      data={{
        labels,
        datasets: [
          {
            label: 'Values',
            data,
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}

export function MixedChart({ 
  labels, 
  barData, 
  lineData 
}: { 
  labels: string[]; 
  barData: number[]; 
  lineData: number[]; 
}) {
  return (
    <ChartComponent
      type="mixed"
      data={{
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Orders',
            data: barData,
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1,
          },
          {
            type: 'line',
            label: 'Revenue',
            data: lineData,
            fill: false,
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.1,
          },
        ],
      }}
    />
  );
} 