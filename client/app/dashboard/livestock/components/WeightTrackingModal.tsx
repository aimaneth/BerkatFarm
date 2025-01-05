'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Scale, TrendingUp, Calendar, LineChart, AlertCircle } from 'lucide-react';
import { Animal } from '../types';

interface WeightTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

export function WeightTrackingModal({ isOpen, onClose, animal }: WeightTrackingModalProps) {
  const [activeTab, setActiveTab] = React.useState('overview');

  // New state for enhanced features
  const [weightRecord, setWeightRecord] = React.useState({
    date: new Date(),
    weight: '',
    method: 'scale',
    condition: 'normal',
    notes: '',
  });

  const weightMetrics = [
    { label: 'Current Weight', value: '520 kg', trend: 'up' },
    { label: 'Monthly Gain', value: '15 kg', trend: 'up' },
    { label: 'Daily Gain', value: '0.5 kg', trend: 'neutral' },
    { label: 'Target Weight', value: '550 kg', trend: 'up' },
  ];

  const weightHistory = [
    { date: '2024-01-05', weight: '520 kg', gain: '+0.5 kg', condition: 'Normal' },
    { date: '2024-01-01', weight: '518 kg', gain: '+0.6 kg', condition: 'Normal' },
    { date: '2023-12-28', weight: '515 kg', gain: '+0.4 kg', condition: 'Normal' },
  ];

  const conditionScores = [
    { value: 'thin', label: 'Thin (1-3)' },
    { value: 'normal', label: 'Normal (4-6)' },
    { value: 'overweight', label: 'Overweight (7-9)' },
  ];

  if (!animal) return null;

  return (
    <div className="relative z-50">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border shadow-xl backdrop-blur-sm rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Weight Tracking - {animal.tag}
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
                {weightMetrics.map((metric, index) => (
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
                <h3 className="font-semibold mb-4">Weight Trends</h3>
                <div className="h-[200px] w-full">
                  {/* Add Chart.js or other charting library implementation here */}
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    Weight trend chart
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="record" className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">New Weight Record</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Date</label>
                      <Input
                        type="date"
                        value={weightRecord.date.toISOString().split('T')[0]}
                        onChange={(e) => setWeightRecord({
                          ...weightRecord,
                          date: new Date(e.target.value)
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Weight (kg)</label>
                      <Input
                        type="number"
                        value={weightRecord.weight}
                        onChange={(e) => setWeightRecord({
                          ...weightRecord,
                          weight: e.target.value
                        })}
                        placeholder="Enter weight"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Measurement Method</label>
                      <Select
                        value={weightRecord.method}
                        onValueChange={(value) => setWeightRecord({
                          ...weightRecord,
                          method: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scale">Digital Scale</SelectItem>
                          <SelectItem value="tape">Weight Tape</SelectItem>
                          <SelectItem value="visual">Visual Assessment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Body Condition</label>
                      <Select
                        value={weightRecord.condition}
                        onValueChange={(value) => setWeightRecord({
                          ...weightRecord,
                          condition: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditionScores.map((score) => (
                            <SelectItem key={score.value} value={score.value}>
                              {score.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Notes</label>
                    <Input
                      value={weightRecord.notes}
                      onChange={(e) => setWeightRecord({
                        ...weightRecord,
                        notes: e.target.value
                      })}
                      placeholder="Add any notes"
                    />
                  </div>
                  <Button className="w-full">Add Weight Record</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Weight History</h3>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Filter by Date
                  </Button>
                </div>
                <div className="space-y-4">
                  {weightHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{record.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Condition: {record.condition}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge>{record.weight}</Badge>
                        <Badge variant="outline" className={record.gain.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                          {record.gain}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Growth Analysis</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Growth Rate</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last 7 Days</span>
                          <span className="font-medium">0.5 kg/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last 30 Days</span>
                          <span className="font-medium">0.48 kg/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last 90 Days</span>
                          <span className="font-medium">0.45 kg/day</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Weight Goals</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Target Weight</span>
                          <span className="font-medium">550 kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Remaining</span>
                          <span className="font-medium">30 kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Est. Achievement</span>
                          <span className="font-medium">60 days</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Growth rate is on target</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Consider increasing protein intake</span>
                      </div>
                      <div className="flex items-center gap-2 text-yellow-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Monitor for seasonal weight fluctuations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
} 