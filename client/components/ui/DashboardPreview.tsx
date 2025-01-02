'use client';

import { useState } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  UserIcon,
  ShoppingBagIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';

const navigationItems = [
  { name: 'Dashboard', icon: HomeIcon, active: true },
  { name: 'Team', icon: UsersIcon, active: false },
  { name: 'Livestock', icon: ClipboardDocumentListIcon, active: false },
  { name: 'Distribution', icon: TruckIcon, active: false },
  { name: 'Finance', icon: BanknotesIcon, active: false },
  { name: 'Settings', icon: Cog6ToothIcon, active: false },
  { name: 'Profile', icon: UserCircleIcon, active: false },
];

const statsCards = [
  { 
    title: 'Total Livestock',
    value: '1,234',
    trend: '↑ 12% from last month',
    icon: ClipboardDocumentListIcon,
    color: 'emerald'
  },
  { 
    title: 'Active Orders',
    value: '56',
    trend: '↑ 8% from last week',
    icon: ShoppingCartIcon,
    color: 'blue'
  },
  { 
    title: 'Revenue',
    value: '$12.4k',
    trend: '↑ 15% from last month',
    icon: CurrencyDollarIcon,
    color: 'purple'
  }
];

const recentOrders = [
  { 
    id: 'ORD001', 
    customer: 'John Doe', 
    status: 'completed', 
    amount: '$1,234',
    icon: BuildingOfficeIcon 
  },
  { 
    id: 'ORD002', 
    customer: 'Jane Smith', 
    status: 'pending', 
    amount: '$567',
    icon: UserIcon
  },
  { 
    id: 'ORD003', 
    customer: 'Bob Johnson', 
    status: 'processing', 
    amount: '$890',
    icon: ShoppingBagIcon
  }
];

const livestockHealth = [
  { 
    type: 'Cattle', 
    count: 450, 
    status: 'healthy',
    icon: CheckCircleIcon
  },
  { 
    type: 'Sheep', 
    count: 280, 
    status: 'warning',
    icon: ExclamationTriangleIcon
  },
  { 
    type: 'Goats', 
    count: 180, 
    status: 'critical',
    icon: BeakerIcon
  }
];

export function DashboardPreview() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent sm:text-4xl lg:text-5xl">
            Powerful Dashboard Interface
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Experience a modern and intuitive dashboard designed for efficient farm management. Monitor livestock, track orders, and analyze performance all in one place.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="relative w-full h-[700px] bg-white rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgb(0,0,0,0.25)] border border-gray-200">
          {/* Sidebar */}
          <aside 
            className={`${
              isSidebarCollapsed ? 'w-20' : 'w-64'
            } h-full bg-white shadow-sm transition-all duration-300 ease-in-out absolute top-0 left-0 z-30`}
          >
            {/* Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 z-50"
            >
              {isSidebarCollapsed ? (
                <ChevronRightIcon className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
              )}
            </button>

            {/* Header */}
            <div className={`p-4 mt-14 border-b border-gray-100 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo.png"
                  alt="Berkat Farm"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {!isSidebarCollapsed && (
                  <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text">
                    Berkat Farm
                  </h1>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-4">
              <ul className="space-y-1 px-3">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <button
                      className={`
                        flex items-center px-3 py-2 rounded-lg transition-all duration-200 w-full
                        ${item.active 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                        }
                        ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}
                      `}
                    >
                      <item.icon className={`${isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
                      {!isSidebarCollapsed && <span>{item.name}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <main className={`transition-all duration-300 h-full ${
            isSidebarCollapsed ? 'ml-20' : 'ml-64'
          }`}>
            <div className="p-8">
              {/* Welcome Section */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
                  <p className="text-sm text-gray-500 mt-1">Here's what's happening with your farm today.</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {statsCards.map((card) => (
                  <Card key={card.title} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{card.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                        <p className="text-xs text-emerald-600 mt-1">{card.trend}</p>
                      </div>
                      <div className={`w-12 h-12 bg-${card.color}-100 rounded-lg flex items-center justify-center`}>
                        <card.icon className={`w-6 h-6 text-${card.color}-500`} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View all</button>
                  </div>
                  <div className="space-y-5">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <order.icon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{order.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <StatusBadge status={order.status as any} />
                          <span className="text-sm font-medium text-gray-900">{order.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Livestock Health</h2>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View all</button>
                  </div>
                  <div className="space-y-5">
                    {livestockHealth.map((item) => (
                      <div key={item.type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.type}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.count} animals</p>
                          </div>
                        </div>
                        <StatusBadge status={item.status as any} />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
} 