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
  ClipboardList,
  Activity,
  Calendar,
  HeartPulse,
  Baby,
  Scale,
  MoveRight,
} from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: {
    tag: string;
    breed: string;
  } | null;
}

export function HistoryModal({ isOpen, onClose, animal }: HistoryModalProps) {
  if (!animal) return null;

  // Mock history data
  const history = [
    {
      date: '2024-01-20',
      type: 'health',
      icon: HeartPulse,
      title: 'Health Check',
      description: 'Regular health inspection completed',
    },
    {
      date: '2024-01-15',
      type: 'weight',
      icon: Scale,
      title: 'Weight Recorded',
      description: 'Weight measured: 720kg',
    },
    {
      date: '2024-01-10',
      type: 'movement',
      icon: MoveRight,
      title: 'Location Change',
      description: 'Moved to Pen A-12',
    },
    {
      date: '2024-01-05',
      type: 'breeding',
      icon: Baby,
      title: 'Breeding Record',
      description: 'Artificial insemination performed',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[90vh] overflow-y-auto border bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Full History - {animal.tag}
          </DialogTitle>
          <DialogDescription>
            Complete history of events and records for {animal.breed}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {history.map((event, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-4">
                <div className={`rounded-lg p-2 ${
                  event.type === 'health' ? 'bg-blue-50 text-blue-600' :
                  event.type === 'weight' ? 'bg-green-50 text-green-600' :
                  event.type === 'movement' ? 'bg-orange-50 text-orange-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  <event.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
          <Button variant="outline" onClick={onClose} className="w-[200px]">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 