'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from '@/components/ui/Dialog';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Leaf, Scale, Calendar, LineChart, AlertCircle } from 'lucide-react';
import { Animal } from '../types';

interface FeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

export function FeedModal({ isOpen, onClose, animal }: FeedModalProps) {
  const [activeTab, setActiveTab] = React.useState('overview');

  // New state for enhanced features
  const [feedRecord, setFeedRecord] = React.useState({
    date: new Date(),
    feedType: '',
    quantity: '',
    timeOfDay: 'morning',
    notes: '',
  });

  const feedMetrics = [
    { label: 'Daily Intake', value: '12.5 kg', trend: 'up' },
    { label: 'Feed Efficiency', value: '92%', trend: 'up' },
    { label: 'Cost per Day', value: '$3.50', trend: 'down' },
    { label: 'Nutrition Score', value: '95/100', trend: 'up' },
  ];

  const feedHistory = [
    { date: '2024-01-05', type: 'Hay', quantity: '5kg', time: 'Morning' },
    { date: '2024-01-05', type: 'Grain Mix', quantity: '2kg', time: 'Evening' },
    { date: '2024-01-04', type: 'Hay', quantity: '5kg', time: 'Morning' },
  ];

  const feedTypes = [
    { id: 'hay', name: 'Hay', nutritionValue: 'High' },
    { id: 'grain', name: 'Grain Mix', nutritionValue: 'High' },
    { id: 'silage', name: 'Silage', nutritionValue: 'Medium' },
    { id: 'supplement', name: 'Supplements', nutritionValue: 'High' },
  ];

  if (!animal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30 fixed inset-0" />
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border shadow-xl backdrop-blur-sm rounded-lg p-6 z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Feed Management - {animal.tag}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="record">Record</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedMetrics.map((metric, index) => (
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
              <h3 className="font-semibold mb-4">Current Feed Plan</h3>
              <div className="space-y-4">
                {feedTypes.map((feed) => (
                  <div key={feed.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium">{feed.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Nutrition Value: {feed.nutritionValue}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="record" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">New Feed Record</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm">Date</label>
                    <Input
                      type="date"
                      value={feedRecord.date.toISOString().split('T')[0]}
                      onChange={(e) => setFeedRecord({
                        ...feedRecord,
                        date: new Date(e.target.value)
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Feed Type</label>
                    <Select
                      value={feedRecord.feedType}
                      onValueChange={(value) => setFeedRecord({
                        ...feedRecord,
                        feedType: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select feed type" />
                      </SelectTrigger>
                      <SelectContent>
                        {feedTypes.map((feed) => (
                          <SelectItem key={feed.id} value={feed.id}>
                            {feed.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Quantity (kg)</label>
                    <Input
                      type="number"
                      value={feedRecord.quantity}
                      onChange={(e) => setFeedRecord({
                        ...feedRecord,
                        quantity: e.target.value
                      })}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Time of Day</label>
                    <Select
                      value={feedRecord.timeOfDay}
                      onValueChange={(value) => setFeedRecord({
                        ...feedRecord,
                        timeOfDay: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Notes</label>
                  <Input
                    value={feedRecord.notes}
                    onChange={(e) => setFeedRecord({
                      ...feedRecord,
                      notes: e.target.value
                    })}
                    placeholder="Add any notes"
                  />
                </div>
                <Button className="w-full">Add Feed Record</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Feeding Schedule</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Morning Feed (6:00 AM)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Hay</span>
                      <span className="font-medium">5 kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Grain Mix</span>
                      <span className="font-medium">2 kg</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Evening Feed (4:00 PM)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Hay</span>
                      <span className="font-medium">4 kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Grain Mix</span>
                      <span className="font-medium">1.5 kg</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Adjust Schedule</Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Feed History</h3>
              <div className="space-y-4">
                {feedHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{record.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {record.time} - {record.type}
                      </p>
                    </div>
                    <Badge>{record.quantity}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Nutritional Analysis</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Nutrient Intake</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Protein</span>
                        <span className="font-medium">16%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fiber</span>
                        <span className="font-medium">22%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Energy</span>
                        <span className="font-medium">12.5 MJ/kg</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Protein intake optimal</span>
                      </div>
                      <div className="flex items-center gap-2 text-yellow-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Consider increasing fiber</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Feed Cost Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Daily Cost</span>
                      <Badge className="bg-blue-100 text-blue-800">$3.50</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Monthly Estimate</span>
                      <Badge className="bg-blue-100 text-blue-800">$105.00</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Cost per kg</span>
                      <Badge className="bg-blue-100 text-blue-800">$0.28</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 