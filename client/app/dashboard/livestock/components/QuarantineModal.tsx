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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldAlert,
  Clock,
  History,
  Calendar,
  Plus,
  AlertTriangle,
  Stethoscope,
  ClipboardCheck,
  HeartPulse,
  X,
  Thermometer,
  Activity,
  Syringe,
  Users,
  CheckCircle,
} from 'lucide-react';
import { Animal } from '../types';

interface QuarantineModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

export function QuarantineModal({ isOpen, onClose, animal }: QuarantineModalProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [notes, setNotes] = React.useState('');

  // Mock quarantine data
  const quarantineData = {
    startDate: '2024-01-15',
    expectedEndDate: '2024-01-29',
    reason: 'Suspected respiratory infection',
    location: 'Quarantine Block B',
    assignedVet: 'Dr. Sarah Johnson',
    riskLevel: 'Medium',
  };

  // Mock health checks
  const healthChecks = [
    { date: '2024-01-20', type: 'Temperature', result: '39.5°C', status: 'Normal', notes: 'Stable condition' },
    { date: '2024-01-18', type: 'Respiratory', result: 'Improved', status: 'Good', notes: 'Reduced coughing' },
    { date: '2024-01-17', type: 'Blood Test', result: 'Pending', status: 'Awaiting', notes: 'Results in 24hrs' },
    { date: '2024-01-16', type: 'Temperature', result: '40.1°C', status: 'High', notes: 'Started medication' },
    { date: '2024-01-15', type: 'Initial Check', result: 'Quarantine', status: 'Required', notes: 'Symptoms observed' },
  ];

  // Mock treatment plan
  const treatmentPlan = [
    { medication: 'Antibiotics', dosage: '50mg/day', duration: '7 days', startDate: '2024-01-16' },
    { medication: 'Anti-inflammatory', dosage: '25mg/day', duration: '5 days', startDate: '2024-01-16' },
    { medication: 'Vitamins', dosage: '10ml/day', duration: '14 days', startDate: '2024-01-15' },
  ];

  // Mock vital signs
  const vitalSigns = {
    temperature: '39.5°C',
    heartRate: '75 bpm',
    respiratoryRate: '18 bpm',
    appetite: 'Normal',
    hydration: 'Good',
  };

  // Mock contact tracing
  const contactTracing = [
    { date: '2024-01-14', animal: 'TAG-045', duration: '2 hours', location: 'Pen A-12', status: 'Monitored' },
    { date: '2024-01-14', animal: 'TAG-046', duration: '2 hours', location: 'Pen A-12', status: 'Monitored' },
    { date: '2024-01-13', animal: 'TAG-032', duration: '4 hours', location: 'Grazing Area', status: 'Cleared' },
  ];

  if (!animal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[90vh] overflow-y-auto border bg-white shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground flex h-8 w-8 items-center justify-center"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle>Quarantine Management - {animal.tag}</DialogTitle>
          <DialogDescription>
            Monitor and manage quarantine status and health checks
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="treatment">Treatment</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Quarantine Status */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" />
                  Quarantine Status
                </h3>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Update Status
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(quarantineData).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Vital Signs */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Current Vital Signs
                </h3>
                <Button variant="outline" size="sm">Record Vitals</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(vitalSigns).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Release Criteria */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4" />
                  Release Criteria
                </h3>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Quarantine Period</p>
                      <p className="text-sm text-yellow-600">9 days remaining of 14-day quarantine</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-600">Next Assessment</p>
                      <p className="text-sm text-blue-600">Scheduled for 2024-01-22</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            {/* Health Checks */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  Health Checks
                </h3>
                <Button variant="outline" size="sm">Record Check</Button>
              </div>
              <div className="space-y-2">
                {healthChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{check.type}: {check.result}</span>
                        <span className={`text-sm font-medium ${
                          check.status === 'Normal' || check.status === 'Good' ? 'text-green-600' :
                          check.status === 'High' ? 'text-red-600' : 'text-yellow-600'
                        }`}>{check.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{check.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{check.notes}</span>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* New Health Check Form */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Record New Health Check</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      type="date"
                      value={selectedDate.toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="temperature">Temperature</SelectItem>
                        <SelectItem value="respiratory">Respiratory</SelectItem>
                        <SelectItem value="blood">Blood Test</SelectItem>
                        <SelectItem value="physical">Physical Exam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add check notes"
                  />
                </div>
                <Button className="w-full">Save Health Check</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="treatment" className="space-y-4">
            {/* Treatment Plan */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <HeartPulse className="h-4 w-4" />
                  Treatment Plan
                </h3>
                <Button variant="outline" size="sm">Modify Plan</Button>
              </div>
              <div className="space-y-2">
                {treatmentPlan.map((treatment, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <span className="text-sm font-medium">{treatment.medication}</span>
                      <p className="text-sm text-muted-foreground">
                        {treatment.dosage} for {treatment.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Started: {treatment.startDate}</span>
                      <Button variant="ghost" size="sm">Update</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* New Treatment Form */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Add New Treatment</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Medication</label>
                    <Input placeholder="Enter medication name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dosage</label>
                    <Input placeholder="Enter dosage" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Input placeholder="Enter duration" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Input placeholder="Add treatment notes" />
                </div>
                <Button className="w-full">Add Treatment</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            {/* Contact Tracing */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Contact Tracing
                </h3>
                <Button variant="outline" size="sm">Add Contact</Button>
              </div>
              <div className="space-y-2">
                {contactTracing.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{contact.animal}</span>
                        <Badge variant="outline">{contact.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {contact.date} • {contact.duration} • {contact.location}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* New Contact Form */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Record New Contact</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Animal</label>
                    <Input placeholder="Enter tag number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Input placeholder="Enter duration" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input placeholder="Enter location" />
                  </div>
                </div>
                <Button className="w-full">Add Contact Record</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
          <Button className="w-[200px]">Release from Quarantine</Button>
          <Button className="w-[200px] bg-red-600 hover:bg-red-700 text-white">Emergency Alert</Button>
          <Button variant="outline" onClick={onClose} className="w-[200px]">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 