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
import { Calendar, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Tag } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'vaccination' | 'checkup' | 'breeding' | 'movement' | 'other';
  animals: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface CalendarViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarView({ isOpen, onClose }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  // Mock events data
  const events: Event[] = [
    {
      id: '1',
      title: 'Vaccination Day',
      date: '2024-01-15',
      type: 'vaccination',
      animals: ['CTL-245', 'CTL-246', 'CTL-247'],
      status: 'scheduled',
    },
    {
      id: '2',
      title: 'Health Checkup',
      date: '2024-01-15',
      type: 'checkup',
      animals: ['CTL-248'],
      status: 'scheduled',
    },
    {
      id: '3',
      title: 'Breeding Program',
      date: '2024-01-20',
      type: 'breeding',
      animals: ['CTL-250', 'CTL-251'],
      status: 'scheduled',
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl max-h-[90vh] overflow-y-auto border bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Livestock Calendar
          </DialogTitle>
          <DialogDescription>
            View and manage scheduled events
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-7 gap-4 py-4">
          {/* Calendar Header */}
          <div className="col-span-7 flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-medium">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Weekday Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-medium text-sm text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {getDaysInMonth(currentDate).map((date, index) => (
            <div
              key={index}
              className={`min-h-[100px] border rounded-lg p-2 ${
                date ? 'cursor-pointer hover:bg-accent' : 'bg-muted'
              } ${
                selectedDate && date?.toDateString() === selectedDate.toDateString()
                  ? 'ring-2 ring-primary'
                  : ''
              }`}
              onClick={() => date && setSelectedDate(date)}
            >
              {date && (
                <>
                  <div className="text-sm font-medium">{date.getDate()}</div>
                  <div className="space-y-1 mt-1">
                    {getEventsForDate(date).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded ${
                          event.type === 'vaccination' ? 'bg-blue-100 text-blue-700' :
                          event.type === 'checkup' ? 'bg-green-100 text-green-700' :
                          event.type === 'breeding' ? 'bg-purple-100 text-purple-700' :
                          event.type === 'movement' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-4">
              Events for {selectedDate.toLocaleDateString()}
            </h3>
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map((event) => (
                <Card key={event.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>All day</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          <span>{event.animals.length} animals</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
          <Button variant="outline" onClick={onClose} className="w-[200px]">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 