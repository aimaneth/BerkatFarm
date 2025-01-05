'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from '@/components/ui/Dialog';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { LineChart, Milk, Scale, TrendingUp, History, Calendar } from 'lucide-react';
import { Animal } from '../types';
import { LineChartComponent, BarChartComponent, PieChartComponent, chartColors } from './charts';
import { ChartData } from 'chart.js';

interface ProductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

interface ProductionRecord {
  date: Date;
  type: string;
  quantity: string;
  quality: string;
  notes: string;
}

interface HistoryRecord {
  date: string;
  quantity: string;
  quality: string;
  notes: string;
}

export function ProductionModal({ isOpen, onClose, animal }: ProductionModalProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [productionRecord, setProductionRecord] = React.useState<ProductionRecord>({
    date: new Date(),
    type: 'milk',
    quantity: '',
    quality: 'A',
    notes: '',
  });

  // Production data for charts
  const productionTrendData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Daily Production',
        data: [25, 27, 28, 30, 29, 28],
        borderColor: chartColors.primary,
        backgroundColor: `${chartColors.primary}33`,
        tension: 0.4,
      }
    ]
  };

  const qualityDistributionData: ChartData<'pie'> = {
    labels: ['A+', 'A', 'B+', 'B', 'C'],
    datasets: [{
      data: [65, 20, 10, 4, 1],
      backgroundColor: [
        chartColors.success,
        chartColors.primary,
        chartColors.info,
        chartColors.warning,
        chartColors.danger,
      ],
      borderWidth: 1,
    }]
  };

  const monthlyComparisonData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'This Year',
        data: [840, 850, 860, 900, 870, 840],
        backgroundColor: chartColors.primary,
      },
      {
        label: 'Last Year',
        data: [800, 810, 820, 850, 830, 810],
        backgroundColor: chartColors.gray,
      }
    ]
  };

  const productionMetrics = [
    { label: 'Daily Average', value: '28L', trend: 'up' },
    { label: 'Monthly Total', value: '840L', trend: 'up' },
    { label: 'Quality Grade', value: 'A+', trend: 'neutral' },
    { label: 'Efficiency', value: '94%', trend: 'up' },
  ];

  const productionHistory: HistoryRecord[] = [
    { date: '2024-01-05', quantity: '30L', quality: 'A+', notes: 'Morning milking' },
    { date: '2024-01-04', quantity: '28L', quality: 'A', notes: 'Evening milking' },
    { date: '2024-01-04', quantity: '29L', quality: 'A+', notes: 'Morning milking' },
  ];

  const qualityGrades = ['A+', 'A', 'B+', 'B', 'C'] as const;
  type QualityGrade = typeof qualityGrades[number];

  if (!animal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30 fixed inset-0" />
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border shadow-xl backdrop-blur-sm rounded-lg p-6 z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Milk className="h-5 w-5" />
            Production Records - {animal.tag}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="record">Record</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productionMetrics.map((metric, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <LineChart className={`h-4 w-4 ${
                      metric.trend === 'up' ? 'text-green-500' :
                      metric.trend === 'down' ? 'text-red-500' :
                      'text-yellow-500'
                    }`} />
                  </div>
                  <p className="text-2xl font-bold mt-2">{metric.value}</p>
                </Card>
              ))}
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Production Trends</h3>
              <LineChartComponent data={productionTrendData} height="200px" />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Quality Distribution</h3>
                <PieChartComponent data={qualityDistributionData} height="200px" />
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Monthly Comparison</h3>
                <BarChartComponent data={monthlyComparisonData} height="200px" />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="record" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Record Production</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm">Date</label>
                  <Input
                    type="date"
                    value={productionRecord.date.toISOString().split('T')[0]}
                    onChange={(e) => setProductionRecord({
                      ...productionRecord,
                      date: new Date(e.target.value)
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Type</label>
                  <Select
                    value={productionRecord.type}
                    onValueChange={(value) => setProductionRecord({
                      ...productionRecord,
                      type: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="milk">Milk</SelectItem>
                      <SelectItem value="meat">Meat</SelectItem>
                      <SelectItem value="wool">Wool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Quantity</label>
                  <Input
                    type="text"
                    value={productionRecord.quantity}
                    onChange={(e) => setProductionRecord({
                      ...productionRecord,
                      quantity: e.target.value
                    })}
                    placeholder="e.g., 30L"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Quality Grade</label>
                  <Select
                    value={productionRecord.quality}
                    onValueChange={(value) => setProductionRecord({
                      ...productionRecord,
                      quality: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualityGrades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm">Notes</label>
                  <Input
                    value={productionRecord.notes}
                    onChange={(e) => setProductionRecord({
                      ...productionRecord,
                      notes: e.target.value
                    })}
                    placeholder="Add any notes..."
                  />
                </div>
              </div>
              <Button className="mt-4">Save Record</Button>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Production History</h3>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Filter by Date
                </Button>
              </div>
              <div className="space-y-4">
                {productionHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{record.quantity}</p>
                      <p className="text-sm text-muted-foreground">{record.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge>{record.quality}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{record.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Peak Production Times</h3>
                <BarChartComponent
                  data={{
                    labels: ['Morning', 'Afternoon', 'Evening'],
                    datasets: [{
                      label: 'Average Production (L)',
                      data: [30, 25, 28],
                      backgroundColor: [
                        chartColors.primary,
                        chartColors.info,
                        chartColors.success,
                      ],
                      borderWidth: 1,
                    }]
                  }}
                  height="200px"
                />
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Production by Season</h3>
                <LineChartComponent
                  data={{
                    labels: ['Spring', 'Summer', 'Fall', 'Winter'],
                    datasets: [{
                      label: 'Average Daily Production (L)',
                      data: [27, 25, 28, 26],
                      borderColor: chartColors.primary,
                      backgroundColor: `${chartColors.primary}33`,
                      tension: 0.4,
                    }]
                  }}
                  height="200px"
                />
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Production Factors Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Feed Impact</h4>
                  <PieChartComponent
                    data={{
                      labels: ['High', 'Medium', 'Low'],
                      datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: [
                          chartColors.success,
                          chartColors.warning,
                          chartColors.danger,
                        ],
                        borderWidth: 1,
                      }]
                    }}
                    height="150px"
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Weather Sensitivity</h4>
                  <PieChartComponent
                    data={{
                      labels: ['High', 'Medium', 'Low'],
                      datasets: [{
                        data: [30, 45, 25],
                        backgroundColor: [
                          chartColors.danger,
                          chartColors.warning,
                          chartColors.success,
                        ],
                        borderWidth: 1,
                      }]
                    }}
                    height="150px"
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Health Correlation</h4>
                  <PieChartComponent
                    data={{
                      labels: ['Strong', 'Moderate', 'Weak'],
                      datasets: [{
                        data: [70, 20, 10],
                        backgroundColor: [
                          chartColors.success,
                          chartColors.warning,
                          chartColors.danger,
                        ],
                        borderWidth: 1,
                      }]
                    }}
                    height="150px"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Year-over-Year Comparison</h3>
              <LineChartComponent
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: [
                    {
                      label: '2024',
                      data: [840, 850, 860, 900, 870, 840, 830, 850, 880, 870, 850, 860],
                      borderColor: chartColors.primary,
                      backgroundColor: `${chartColors.primary}33`,
                      tension: 0.4,
                    },
                    {
                      label: '2023',
                      data: [800, 810, 820, 850, 830, 810, 800, 820, 840, 830, 820, 830],
                      borderColor: chartColors.gray,
                      backgroundColor: `${chartColors.gray}33`,
                      tension: 0.4,
                    }
                  ]
                }}
                height="300px"
              />
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 