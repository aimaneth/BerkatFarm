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
  MapPin,
  MoveRight,
  History,
  Calendar,
  Plus,
  AlertTriangle,
  Warehouse,
  X,
  Users,
  ArrowRight,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Animal } from '../types';

interface MovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

export function MovementModal({ isOpen, onClose, animal }: MovementModalProps) {
  const [activeTab, setActiveTab] = React.useState('current');
  const [selectedPen, setSelectedPen] = React.useState('');
  const [movementDate, setMovementDate] = React.useState<Date>(new Date());
  const [movementReason, setMovementReason] = React.useState('');

  // Mock pen data
  const availablePens = [
    { id: 'A-12', name: 'Pen A-12', capacity: '85%', type: 'Standard', animals: 12 },
    { id: 'B-05', name: 'Pen B-05', capacity: '60%', type: 'Premium', animals: 8 },
    { id: 'C-03', name: 'Pen C-03', capacity: '75%', type: 'Isolation', animals: 3 },
  ];

  // Mock movement history
  const movementHistory = [
    { date: '2024-01-20', from: 'Pen A-11', to: 'Pen A-12', reason: 'Routine rotation', duration: '30 days' },
    { date: '2023-12-21', from: 'Pen B-05', to: 'Pen A-11', reason: 'Health monitoring', duration: '30 days' },
    { date: '2023-11-21', from: 'Pen B-03', to: 'Pen B-05', reason: 'Feed optimization', duration: '30 days' },
    { date: '2023-10-22', from: 'Quarantine', to: 'Pen B-03', reason: 'Post-quarantine', duration: '30 days' },
    { date: '2023-10-15', from: 'Intake', to: 'Quarantine', reason: 'New arrival', duration: '7 days' },
  ];

  // Mock location metrics
  const locationMetrics = {
    currentPen: 'Pen A-12',
    daysInLocation: '15 days',
    nextRotation: '2024-02-19',
    penCapacity: '85%',
  };

  // Mock scheduled movements
  const scheduledMovements = [
    { date: '2024-02-19', from: 'Pen A-12', to: 'Pen B-01', reason: 'Planned rotation' },
    { date: '2024-03-20', from: 'Pen B-01', to: 'Pen C-02', reason: 'Feed change' },
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
          <DialogTitle>Location Tracking - {animal.tag}</DialogTitle>
          <DialogDescription>
            Monitor and manage animal location changes
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="move">Move</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {/* Current Location Overview */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Current Location
                </h3>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MoveRight className="h-4 w-4" />
                  Move Animal
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(locationMetrics).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pen Details */}
            <Card className="p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Warehouse className="h-4 w-4" />
                Current Pen Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Pen Type</p>
                    <p className="font-medium">Standard Housing</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="font-medium">24°C</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="font-medium">65%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ventilation</p>
                    <p className="font-medium">Optimal</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Current Occupants</span>
                  </div>
                  <Badge>12 Animals</Badge>
                </div>
              </div>
            </Card>

            {/* Location Alerts */}
            <Card className="p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <AlertTriangle className="h-4 w-4" />
                Location Alerts
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Upcoming Rotation</p>
                      <p className="text-sm text-yellow-600">Scheduled pen rotation in 15 days</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Warehouse className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-600">Pen Status</p>
                      <p className="text-sm text-blue-600">Current pen capacity is optimal</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="move" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Move Animal</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Location</label>
                    <Input value={locationMetrics.currentPen} disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Location</label>
                    <Select value={selectedPen} onValueChange={setSelectedPen}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pen" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePens.map((pen) => (
                          <SelectItem key={pen.id} value={pen.id}>
                            {pen.name} ({pen.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Move Date</label>
                    <Input
                      type="date"
                      value={movementDate.toISOString().split('T')[0]}
                      onChange={(e) => setMovementDate(new Date(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reason</label>
                    <Select value={movementReason} onValueChange={setMovementReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rotation">Routine Rotation</SelectItem>
                        <SelectItem value="health">Health Management</SelectItem>
                        <SelectItem value="feed">Feed Optimization</SelectItem>
                        <SelectItem value="breeding">Breeding Program</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">Confirm Movement</Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Available Pens</h3>
              <div className="space-y-2">
                {availablePens.map((pen) => (
                  <div key={pen.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{pen.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {pen.type} • {pen.animals} animals
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{pen.capacity}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedPen(pen.id)}>
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Scheduled Movements</h3>
              <div className="space-y-2">
                {scheduledMovements.map((movement, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{movement.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{movement.from}</span>
                      <ArrowRight className="h-4 w-4" />
                      <span>{movement.to}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{movement.reason}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">Schedule New Movement</Button>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Movement Calendar</h3>
              <div className="p-4 border rounded-lg">
                <div className="text-center text-muted-foreground">
                  Calendar view will be implemented here
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Movement History
                </h3>
                <Button variant="outline" size="sm">Export History</Button>
              </div>
              <div className="space-y-4">
                {movementHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{record.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{record.from}</span>
                        <ArrowRight className="h-4 w-4" />
                        <span>{record.to}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{record.duration}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{record.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col items-center gap-0 mt-0 border-t pt-0">
          <Button className="w-[200px]">Record Movement</Button>
          <Button variant="outline" onClick={onClose} className="w-[200px]">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 