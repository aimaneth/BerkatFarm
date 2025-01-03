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
} from "@/components/ui/select";
import {
  Download as DownloadIcon,
  FileSpreadsheet as FileSpreadsheetIcon,
  FileText as FileTextIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Settings as SettingsIcon,
} from 'lucide-react';

interface ReportsProps {
  transactions: Array<{
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

export function Reports({ transactions }: ReportsProps) {
  const [selectedReport, setSelectedReport] = useState('financial');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reports = [
    {
      id: 1,
      name: 'Financial Statement',
      type: 'Excel',
      date: '2024-02-20',
      size: '245 KB',
      icon: <FileSpreadsheetIcon className="h-5 w-5 text-green-600" />,
    },
    {
      id: 2,
      name: 'Tax Summary',
      type: 'PDF',
      date: '2024-02-19',
      size: '180 KB',
      icon: <FileTextIcon className="h-5 w-5 text-red-600" />,
    },
    {
      id: 3,
      name: 'Expense Report',
      type: 'Excel',
      date: '2024-02-18',
      size: '156 KB',
      icon: <FileSpreadsheetIcon className="h-5 w-5 text-green-600" />,
    },
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Monthly Financial Summary',
      frequency: 'Monthly',
      nextRun: '2024-03-01',
      format: 'Excel',
    },
    {
      id: 2,
      name: 'Weekly Expense Report',
      frequency: 'Weekly',
      nextRun: '2024-02-26',
      format: 'PDF',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Reports & Exports</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Select defaultValue={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="financial" className="hover:bg-gray-100">Financial Statement</SelectItem>
              <SelectItem value="tax" className="hover:bg-gray-100">Tax Summary</SelectItem>
              <SelectItem value="expense" className="hover:bg-gray-100">Expense Report</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="weekly" className="hover:bg-gray-100">Weekly</SelectItem>
              <SelectItem value="monthly" className="hover:bg-gray-100">Monthly</SelectItem>
              <SelectItem value="yearly" className="hover:bg-gray-100">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Recent Reports */}
      <Card className="p-6 bg-white">
        <h3 className="text-base font-medium text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                {report.icon}
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{report.type}</span>
                    <span className="text-xs text-gray-500">{report.date}</span>
                    <span className="text-xs text-gray-500">{report.size}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white"
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card className="p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-medium text-gray-900">Scheduled Reports</h3>
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
          >
            <SettingsIcon className="h-4 w-4 mr-2" />
            Manage Schedules
          </Button>
        </div>
        <div className="space-y-4">
          {scheduledReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-blue-100">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <ClockIcon className="h-3 w-3" />
                      {report.frequency}
                    </div>
                    <span className="text-xs text-gray-500">Next: {report.nextRun}</span>
                    <span className="text-xs text-gray-500">{report.format}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                >
                  <SettingsIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-red-600 hover:text-red-700"
                >
                  Pause
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Custom Report Builder */}
      <Card className="p-6 bg-white">
        <h3 className="text-base font-medium text-gray-900 mb-4">Custom Report Builder</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Report Type</label>
              <Select>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="financial" className="hover:bg-gray-100">Financial Statement</SelectItem>
                  <SelectItem value="tax" className="hover:bg-gray-100">Tax Summary</SelectItem>
                  <SelectItem value="expense" className="hover:bg-gray-100">Expense Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <Select>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="last-week" className="hover:bg-gray-100">Last Week</SelectItem>
                  <SelectItem value="last-month" className="hover:bg-gray-100">Last Month</SelectItem>
                  <SelectItem value="last-quarter" className="hover:bg-gray-100">Last Quarter</SelectItem>
                  <SelectItem value="last-year" className="hover:bg-gray-100">Last Year</SelectItem>
                  <SelectItem value="custom" className="hover:bg-gray-100">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Include Sections</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-700">Income Statement</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-700">Balance Sheet</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-700">Cash Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-700">Tax Summary</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-700">Charts & Graphs</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="bg-white"
            >
              Save Template
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Generate Custom Report
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 