'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Baby, Calendar, Dna, History, LineChart } from 'lucide-react';
import { Animal } from '../types';

interface BreedingModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

export function BreedingModal({ isOpen, onClose, animal }: BreedingModalProps) {
  const [activeTab, setActiveTab] = React.useState('breeding');
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  // New state for enhanced features
  const [breedingRecord, setBreedingRecord] = React.useState({
    matingDate: new Date(),
    partner: '',
    method: 'natural',
    expectedDelivery: new Date(Date.now() + 280 * 24 * 60 * 60 * 1000), // 280 days for cattle
    notes: '',
  });

  const [geneticProfile, setGeneticProfile] = React.useState({
    breed: animal?.breed || '',
    bloodline: '',
    traits: [] as string[],
    geneticDefects: [] as string[],
    breedingValue: '',
  });

  const breedingHistory = [
    { date: '2023-12-01', partner: 'TAG-001', outcome: 'Successful', offspring: 1 },
    { date: '2023-06-15', partner: 'TAG-002', outcome: 'Failed', offspring: 0 },
  ];

  const breedingMetrics = [
    { label: 'Success Rate', value: '75%', trend: 'up' },
    { label: 'Total Offspring', value: '3', trend: 'up' },
    { label: 'Avg Gestation', value: '280 days', trend: 'neutral' },
    { label: 'Genetic Score', value: '8.5/10', trend: 'up' },
  ];

  if (!animal) return null;

  return (
    <div className="relative z-50">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border shadow-xl backdrop-blur-sm rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Baby className="h-5 w-5" />
              Breeding Management - {animal.tag}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="breeding">Breeding</TabsTrigger>
              <TabsTrigger value="genetics">Genetics</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
            </TabsList>

            <TabsContent value="breeding" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {breedingMetrics.map((metric, index) => (
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
                <h3 className="font-semibold mb-4">New Breeding Record</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Mating Date</label>
                      <Input
                        type="date"
                        value={breedingRecord.matingDate.toISOString().split('T')[0]}
                        onChange={(e) => setBreedingRecord({
                          ...breedingRecord,
                          matingDate: new Date(e.target.value)
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Partner Tag</label>
                      <Input
                        value={breedingRecord.partner}
                        onChange={(e) => setBreedingRecord({
                          ...breedingRecord,
                          partner: e.target.value
                        })}
                        placeholder="Enter partner tag"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Breeding Method</label>
                      <Select
                        value={breedingRecord.method}
                        onValueChange={(value) => setBreedingRecord({
                          ...breedingRecord,
                          method: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="natural">Natural</SelectItem>
                          <SelectItem value="artificial">Artificial Insemination</SelectItem>
                          <SelectItem value="embryo">Embryo Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Expected Delivery</label>
                      <Input
                        type="date"
                        value={breedingRecord.expectedDelivery.toISOString().split('T')[0]}
                        onChange={(e) => setBreedingRecord({
                          ...breedingRecord,
                          expectedDelivery: new Date(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                  <Button className="w-full">Add Breeding Record</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="genetics" className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Genetic Profile</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Breed</label>
                      <Input
                        value={geneticProfile.breed}
                        onChange={(e) => setGeneticProfile({
                          ...geneticProfile,
                          breed: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Bloodline</label>
                      <Input
                        value={geneticProfile.bloodline}
                        onChange={(e) => setGeneticProfile({
                          ...geneticProfile,
                          bloodline: e.target.value
                        })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Genetic Traits</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge>High Milk Production</Badge>
                      <Badge>Disease Resistant</Badge>
                      <Badge>Good Temperament</Badge>
                      <Button variant="outline" size="sm">
                        Add Trait
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Known Genetic Issues</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-red-500">None Reported</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">DNA Testing</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Last DNA Test</p>
                    <p>Never Tested</p>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Dna className="h-4 w-4" />
                    Schedule DNA Test
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Breeding History</h3>
                <div className="space-y-4">
                  {breedingHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{record.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Partner: {record.partner}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={record.outcome === 'Successful' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {record.outcome}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Offspring: {record.offspring}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="planning" className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Breeding Schedule</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Next Optimal Breeding Window</p>
                      <p className="text-sm text-muted-foreground">
                        Based on reproductive cycle and farm planning
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      In 15 Days
                    </Badge>
                  </div>
                  <Button className="w-full">
                    Schedule Breeding
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Recommended Partners</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">TAG-005</p>
                      <p className="text-sm text-muted-foreground">
                        Genetic Compatibility: 95%
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">TAG-008</p>
                      <p className="text-sm text-muted-foreground">
                        Genetic Compatibility: 88%
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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