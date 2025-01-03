'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Search,
  Shield,
  User,
  XCircle,
} from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  action: string;
  category: string;
  status: 'success' | 'warning' | 'error';
  details: string;
  ipAddress: string;
  userAgent: string;
}

interface AuditLogProps {
  data: AuditLogEntry[];
  isLoading?: boolean;
  onFilter: (filters: any) => void;
  onExport: () => void;
}

export function AuditLog({
  data,
  isLoading = false,
  onFilter,
  onExport,
}: AuditLogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedCategory, selectedStatus, dateRange);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchQuery, category, selectedStatus, dateRange);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    applyFilters(searchQuery, selectedCategory, status, dateRange);
  };

  const handleDateRangeChange = (
    field: 'start' | 'end',
    value: string
  ) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    applyFilters(searchQuery, selectedCategory, selectedStatus, newDateRange);
  };

  const applyFilters = (
    query: string,
    category: string,
    status: string,
    dates: { start: string; end: string }
  ) => {
    onFilter({
      query,
      category,
      status,
      dateRange: dates,
    });
  };

  const columns = [
    {
      key: 'timestamp',
      title: 'Timestamp',
      render: (entry: AuditLogEntry) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{new Date(entry.timestamp).toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'user',
      title: 'User',
      render: (entry: AuditLogEntry) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <div>
            <div className="font-medium">{entry.user.name}</div>
            <div className="text-sm text-gray-500">{entry.user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      render: (entry: AuditLogEntry) => (
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-gray-400" />
          <span>{entry.action}</span>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (entry: AuditLogEntry) => {
        const statusConfig = {
          success: {
            icon: CheckCircle,
            className: 'text-green-500',
          },
          warning: {
            icon: AlertTriangle,
            className: 'text-yellow-500',
          },
          error: {
            icon: XCircle,
            className: 'text-red-500',
          },
        };

        const StatusIcon = statusConfig[entry.status].icon;

        return (
          <div className="flex items-center gap-2">
            <StatusIcon
              className={`h-4 w-4 ${statusConfig[entry.status].className}`}
            />
            <span className="capitalize">{entry.status}</span>
          </div>
        );
      },
    },
    {
      key: 'details',
      title: 'Details',
      render: (entry: AuditLogEntry) => (
        <div className="max-w-md truncate">{entry.details}</div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 bg-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Audit Log</h3>
            <Button
              variant="outline"
              onClick={onExport}
              className="bg-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Log
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="auth">Authentication</SelectItem>
                <SelectItem value="data">Data Modification</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedStatus}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="bg-white"
              />
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
      />

      {/* Summary */}
      <Card className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">
                {data.filter((entry) => entry.status === 'success').length}
              </div>
              <div className="text-sm text-gray-500">Successful Operations</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">
                {data.filter((entry) => entry.status === 'warning').length}
              </div>
              <div className="text-sm text-gray-500">Warnings</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">
                {data.filter((entry) => entry.status === 'error').length}
              </div>
              <div className="text-sm text-gray-500">Security Events</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 