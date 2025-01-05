'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/Dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/Badge';
import { LineChart, Activity, Calendar as CalendarIcon, Syringe, Pill, Stethoscope, AlertCircle } from 'lucide-react';
import { Animal } from '../types';

interface HealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

export function HealthModal({ isOpen, onClose, animal }: HealthModalProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  // New state for enhanced features
  const [vitalSigns, setVitalSigns] = React.useState({
    temperature: '',
    heartRate: '',
    respiratoryRate: '',
    weight: '',
  });

  const [medication, setMedication] = React.useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date(),
    endDate: new Date(),
    notes: '',
  });

  const [vaccinations, setVaccinations] = React.useState([
    { name: 'FMD Vaccine', date: new Date(), nextDue: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) },
    { name: 'Anthrax Vaccine', date: new Date(), nextDue: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) },
  ]);

  const healthMetrics = [
    { label: 'Overall Health Score', value: '92/100', trend: 'up' },
    { label: 'Last Checkup', value: '3 days ago', trend: 'neutral' },
    { label: 'Vaccination Status', value: 'Up to date', trend: 'up' },
    { label: 'Risk Level', value: 'Low', trend: 'down' },
  ];

  if (!animal) return null;

  return (
    <div className="relative z-50">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border shadow-xl backdrop-blur-sm rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Health Records - {animal.tag}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {healthMetrics.map((metric, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <Activity className={`h-4 w-4 ${
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
                <h3 className="font-semibold mb-4">Upcoming Health Events</h3>
                <div className="space-y-3">
                  {vaccinations.map((vac, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Syringe className="h-4 w-4 text-blue-500" />
                        <span>{vac.name}</span>
                      </div>
                      <Badge variant="outline">Due {vac.nextDue.toLocaleDateString()}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Record Vital Signs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm">Temperature (°C)</label>
                    <Input
                      type="number"
                      value={vitalSigns.temperature}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, temperature: e.target.value })}
                      placeholder="38.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Heart Rate (bpm)</label>
                    <Input
                      type="number"
                      value={vitalSigns.heartRate}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, heartRate: e.target.value })}
                      placeholder="60-70"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Respiratory Rate (bpm)</label>
                    <Input
                      type="number"
                      value={vitalSigns.respiratoryRate}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, respiratoryRate: e.target.value })}
                      placeholder="10-30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Weight (kg)</label>
                    <Input
                      type="number"
                      value={vitalSigns.weight}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, weight: e.target.value })}
                      placeholder="500"
                    />
                  </div>
                </div>
                <Button className="mt-4">Save Vital Signs</Button>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Vital Signs History</h3>
                <div className="h-[200px] w-full">
                  {/* Add Chart.js or other charting library implementation here */}
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <LineChart className="h-6 w-6 mr-2" />
                    Vital signs trend chart
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="treatments" className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Add Treatment</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Medication Name</label>
                      <Input
                        value={medication.name}
                        onChange={(e) => setMedication({ ...medication, name: e.target.value })}
                        placeholder="Enter medication name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Dosage</label>
                      <Input
                        value={medication.dosage}
                        onChange={(e) => setMedication({ ...medication, dosage: e.target.value })}
                        placeholder="Enter dosage"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Frequency</label>
                      <Select
                        value={medication.frequency}
                        onValueChange={(value) => setMedication({ ...medication, frequency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once">Once</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Treatment Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medication">Medication</SelectItem>
                          <SelectItem value="vaccine">Vaccine</SelectItem>
                          <SelectItem value="procedure">Procedure</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Notes</label>
                    <Textarea
                      value={medication.notes}
                      onChange={(e) => setMedication({ ...medication, notes: e.target.value })}
                      placeholder="Enter treatment notes"
                    />
                  </div>
                  <Button>Add Treatment</Button>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Treatment Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-blue-500" />
                      <span>Antibiotics Course</span>
                    </div>
                    <Badge>Daily - 3 days remaining</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Syringe className="h-4 w-4 text-green-500" />
                      <span>Vitamin B Complex</span>
                    </div>
                    <Badge>Weekly - Next: 2 days</Badge>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Health History</h3>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Filter by Date
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-500 pl-4 ml-2">
                    <p className="text-sm text-muted-foreground">Today</p>
                    <p className="font-medium">Routine Health Check</p>
                    <p className="text-sm text-muted-foreground">All vital signs normal</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-4 ml-2">
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                    <p className="font-medium">Vaccination</p>
                    <p className="text-sm text-muted-foreground">FMD Vaccine administered</p>
                  </div>
                  <div className="border-l-2 border-red-500 pl-4 ml-2">
                    <p className="text-sm text-muted-foreground">2 weeks ago</p>
                    <p className="font-medium">Health Issue Reported</p>
                    <p className="text-sm text-muted-foreground">Treated for mild fever</p>
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