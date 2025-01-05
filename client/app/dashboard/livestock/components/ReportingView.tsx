'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  FileText, 
  BarChart3, 
  PieChart,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Printer,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportingViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportingView({ isOpen, onClose }: ReportingViewProps) {
  const [reportType, setReportType] = React.useState('financial');
  const [timeRange, setTimeRange] = React.useState('month');
  const [category, setCategory] = React.useState('all');

  const handleGenerateReport = () => {
    // Implement report generation logic
    console.log('Generating report:', { reportType, timeRange, category });
  };

  const reportTypes = [
    {
      id: 'financial',
      name: 'Financial Report',
      description: 'Revenue, costs, and profitability analysis',
      icon: TrendingUp,
    },
    {
      id: 'production',
      name: 'Production Report',
      description: 'Milk, meat, and wool production metrics',
      icon: BarChart3,
    },
    {
      id: 'health',
      name: 'Health Report',
      description: 'Vaccination records and health status',
      icon: PieChart,
    },
    {
      id: 'inventory',
      name: 'Inventory Report',
      description: 'Current stock and movement history',
      icon: FileText,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[90vh] overflow-y-auto border bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Reports
          </DialogTitle>
          <DialogDescription>
            Create detailed reports for your livestock management
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Report Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            {reportTypes.map((type) => (
              <Card 
                key={type.id}
                className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                  reportType === type.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setReportType(type.id)}
              >
                <div className="flex items-center gap-3">
                  <type.icon className="h-5 w-5" />
                  <div className="flex-1">
                    <h3 className="font-medium">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Report Options */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cattle">Cattle</SelectItem>
                  <SelectItem value="sheep">Sheep</SelectItem>
                  <SelectItem value="goats">Goats</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Report Preview */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Report Preview</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Customize
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Report preview will appear here</span>
            </div>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
          <Button onClick={handleGenerateReport} className="w-[200px]">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={onClose} className="w-[200px]">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 