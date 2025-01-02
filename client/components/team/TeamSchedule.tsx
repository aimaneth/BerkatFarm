import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock as ClockIcon,
  User as UserIcon,
} from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

type ShiftType = 'Morning' | 'Afternoon' | 'Night' | 'Off';

interface Shift {
  date: Date;
  type: ShiftType;
  time: string;
}

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  shifts: Shift[];
}

const scheduleData: TeamMember[] = [
  {
    id: 1,
    name: 'John Smith',
    avatar: '/images/avatars/1.jpg',
    shifts: [
      { date: new Date(2024, 2, 11), type: 'Morning', time: '6 AM - 2 PM' },
      { date: new Date(2024, 2, 12), type: 'Morning', time: '6 AM - 2 PM' },
      { date: new Date(2024, 2, 13), type: 'Morning', time: '6 AM - 2 PM' },
      { date: new Date(2024, 2, 14), type: 'Off', time: '' },
      { date: new Date(2024, 2, 15), type: 'Morning', time: '6 AM - 2 PM' },
    ],
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: '/images/avatars/2.jpg',
    shifts: [
      { date: new Date(2024, 2, 11), type: 'Afternoon', time: '2 PM - 10 PM' },
      { date: new Date(2024, 2, 12), type: 'Afternoon', time: '2 PM - 10 PM' },
      { date: new Date(2024, 2, 13), type: 'Off', time: '' },
      { date: new Date(2024, 2, 14), type: 'Afternoon', time: '2 PM - 10 PM' },
      { date: new Date(2024, 2, 15), type: 'Afternoon', time: '2 PM - 10 PM' },
    ],
  },
  {
    id: 3,
    name: 'Mike Wilson',
    avatar: '/images/avatars/3.jpg',
    shifts: [
      { date: new Date(2024, 2, 11), type: 'Night', time: '10 PM - 6 AM' },
      { date: new Date(2024, 2, 12), type: 'Night', time: '10 PM - 6 AM' },
      { date: new Date(2024, 2, 13), type: 'Night', time: '10 PM - 6 AM' },
      { date: new Date(2024, 2, 14), type: 'Night', time: '10 PM - 6 AM' },
      { date: new Date(2024, 2, 15), type: 'Off', time: '' },
    ],
  },
];

const shiftColors: Record<ShiftType, string> = {
  Morning: 'bg-emerald-100 text-emerald-800',
  Afternoon: 'bg-blue-100 text-blue-800',
  Night: 'bg-purple-100 text-purple-800',
  Off: 'bg-gray-100 text-gray-800',
};

export function TeamSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = startOfWeek(currentDate);

  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => addDays(prev, direction === 'next' ? 7 : -7));
  };

  return (
    <Card className="p-4 sm:p-6 bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg font-semibold text-gray-900">Team Schedule</h3>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek('prev')}
            className="p-2 bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">
              {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek('next')}
            className="p-2 bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Calendar Header */}
          <div className="grid grid-cols-[200px_repeat(7,1fr)] gap-2 mb-4">
            <div className="text-sm font-medium text-gray-500">Team Member</div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-sm font-medium text-gray-500 text-center"
              >
                <div>{format(day, 'EEE')}</div>
                <div>{format(day, 'd')}</div>
              </div>
            ))}
          </div>

          {/* Schedule Grid */}
          <div className="space-y-2">
            {scheduleData.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-[200px_repeat(7,1fr)] gap-2"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {member.name}
                  </span>
                </div>
                {weekDays.map((day, index) => {
                  const shift = member.shifts.find((s) =>
                    isSameDay(s.date, day)
                  );
                  return (
                    <div
                      key={index}
                      className={`p-2 rounded-md text-xs ${
                        shift ? shiftColors[shift.type] : 'bg-gray-50'
                      }`}
                    >
                      {shift && (
                        <>
                          <div className="font-medium">{shift.type}</div>
                          <div className="mt-1 flex items-center">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {shift.time}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="text-sm font-medium text-gray-500">Shift Types:</div>
        {Object.entries(shiftColors).map(([type, color]) => (
          <div key={type} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${color.split(' ')[0]}`} />
            <span className="text-sm text-gray-600">{type}</span>
          </div>
        ))}
      </div>
    </Card>
  );
} 