'use client';

import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/Card';
import {
  BarChart2,
  Users,
  DollarSign,
  Beef,
  ShoppingCart,
  CheckSquare,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    {
      name: 'Total Revenue',
      value: '$24,000',
      change: '+4.75%',
      trend: 'up',
      icon: DollarSign,
      description: 'Total revenue this month'
    },
    {
      name: 'Active Livestock',
      value: '2,345',
      change: '+1.54%',
      trend: 'up',
      icon: Beef,
      description: 'Total active livestock'
    },
    {
      name: 'Team Members',
      value: '48',
      change: '+2.59%',
      trend: 'up',
      icon: Users,
      description: 'Active team members'
    },
    {
      name: 'Pending Orders',
      value: '15',
      change: '-0.91%',
      trend: 'down',
      icon: ShoppingCart,
      description: 'Orders awaiting processing'
    },
    {
      name: 'Active Tasks',
      value: '23',
      change: '+1.98%',
      trend: 'up',
      icon: CheckSquare,
      description: 'Tasks in progress'
    },
    {
      name: 'Performance',
      value: '92%',
      change: '+3.45%',
      trend: 'up',
      icon: BarChart2,
      description: 'Overall farm performance'
    }
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, {session?.user?.name}</h2>
        <p className="text-muted-foreground">
          Here's an overview of your farm's performance
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mt-6">
        {stats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <StatIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none text-muted-foreground">{stat.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className={cn(
                      "text-xs font-medium",
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    )}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3 mt-6">
        {/* Main Content Area */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">Your farm's latest updates and activities</p>
              </div>
            </div>
            {/* Activity content */}
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Livestock Overview</h3>
                <p className="text-sm text-muted-foreground">Current status of your farm animals</p>
              </div>
            </div>
            {/* Livestock content */}
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">Frequently used operations</p>
              </div>
            </div>
            {/* Quick actions content */}
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Upcoming Tasks</h3>
                <p className="text-sm text-muted-foreground">Tasks scheduled for today</p>
              </div>
            </div>
            {/* Tasks content */}
          </Card>
        </div>
      </div>
    </div>
  );
} 