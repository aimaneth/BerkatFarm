import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock as ClockIcon,
  Phone as PhoneIcon,
  AlertCircle,
  Stethoscope,
} from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

type ShiftType = 'Morning' | 'Afternoon' | 'Night' | 'Off';
type OnCallType = 'Primary' | 'Secondary' | 'None';

interface Shift {
  date: Date;
  type: ShiftType;
  time: string;
  onCallStatus?: OnCallType;
  emergencyContact?: string;
  specialDuties?: string[];
}

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
  shifts: Shift[];
  specializations?: string[];
  isVeterinarian?: boolean;
}

const scheduleData: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. John Smith',
    avatar: '/images/avatars/1.jpg',
    role: 'Senior Veterinarian',
    isVeterinarian: true,
    specializations: ['Large Animals', 'Emergency Care'],
    shifts: [
      { 
        date: new Date(2024, 2, 11), 
        type: 'Morning', 
        time: '6 AM - 2 PM',
        onCallStatus: 'Primary',
        emergencyContact: '+1234567890',
        specialDuties: ['Cattle Health Check', 'Emergency Response']
      },
      { 
        date: new Date(2024, 2, 12), 
        type: 'Morning', 
        time: '6 AM - 2 PM',
        onCallStatus: 'Secondary',
        emergencyContact: '+1234567890'
      },
      { 
        date: new Date(2024, 2, 13), 
        type: 'Off', 
        time: '',
        onCallStatus: 'None'
      },
      { 
        date: new Date(2024, 2, 14), 
        type: 'Morning', 
        time: '6 AM - 2 PM',
        onCallStatus: 'Primary',
        emergencyContact: '+1234567890',
        specialDuties: ['Vaccination Day']
      },
      { 
        date: new Date(2024, 2, 15), 
        type: 'Morning', 
        time: '6 AM - 2 PM',
        onCallStatus: 'None'
      },
    ],
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    avatar: '/images/avatars/2.jpg',
    role: 'Veterinarian',
    isVeterinarian: true,
    specializations: ['Small Animals', 'Surgery'],
    shifts: [
      { 
        date: new Date(2024, 2, 11), 
        type: 'Afternoon', 
        time: '2 PM - 10 PM',
        onCallStatus: 'Secondary',
        emergencyContact: '+1234567891'
      },
      { 
        date: new Date(2024, 2, 12), 
        type: 'Afternoon', 
        time: '2 PM - 10 PM',
        onCallStatus: 'Primary',
        emergencyContact: '+1234567891',
        specialDuties: ['Emergency Surgery Standby']
      },
      { 
        date: new Date(2024, 2, 13), 
        type: 'Off', 
        time: '',
        onCallStatus: 'None'
      },
      { 
        date: new Date(2024, 2, 14), 
        type: 'Afternoon', 
        time: '2 PM - 10 PM',
        onCallStatus: 'Secondary',
        emergencyContact: '+1234567891'
      },
      { 
        date: new Date(2024, 2, 15), 
        type: 'Afternoon', 
        time: '2 PM - 10 PM',
        onCallStatus: 'Primary',
        emergencyContact: '+1234567891'
      },
    ],
  },
  {
    id: 3,
    name: 'Mike Wilson',
    avatar: '/images/avatars/3.jpg',
    role: 'Animal Care Specialist',
    shifts: [
      { 
        date: new Date(2024, 2, 11), 
        type: 'Night', 
        time: '10 PM - 6 AM',
        specialDuties: ['Overnight Monitoring']
      },
      { 
        date: new Date(2024, 2, 12), 
        type: 'Night', 
        time: '10 PM - 6 AM'
      },
      { 
        date: new Date(2024, 2, 13), 
        type: 'Night', 
        time: '10 PM - 6 AM'
      },
      { 
        date: new Date(2024, 2, 14), 
        type: 'Night', 
        time: '10 PM - 6 AM'
      },
      { 
        date: new Date(2024, 2, 15), 
        type: 'Off', 
        time: ''
      },
    ],
  },
];

const shiftColors: Record<ShiftType, string> = {
  Morning: 'bg-emerald-100 text-emerald-800',
  Afternoon: 'bg-blue-100 text-blue-800',
  Night: 'bg-purple-100 text-purple-800',
  Off: 'bg-gray-100 text-gray-800',
};

const onCallColors: Record<OnCallType, string> = {
  Primary: 'bg-red-100 text-red-800',
  Secondary: 'bg-orange-100 text-orange-800',
  None: 'bg-gray-100 text-gray-800',
};

export function TeamSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showOnCallOnly, setShowOnCallOnly] = useState(false);
  const startDate = startOfWeek(currentDate);
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => addDays(prev, direction === 'next' ? 7 : -7));
  };

  const filteredMembers = showOnCallOnly 
    ? scheduleData.filter(member => member.isVeterinarian)
    : scheduleData;

  return (
    <Card className="p-4 sm:p-6 bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">Team Schedule</h3>
          <div className="flex items-center mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOnCallOnly(!showOnCallOnly)}
              className="text-xs"
            >
              <Stethoscope className="h-4 w-4 mr-1" />
              {showOnCallOnly ? 'Show All Staff' : 'Show Vets Only'}
            </Button>
          </div>
        </div>
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
          <div className="grid grid-cols-[250px_repeat(7,1fr)] gap-2 mb-4">
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
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-[250px_repeat(7,1fr)] gap-2"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">
                      {member.name}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      {member.role}
                    </span>
                  </div>
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
                          {shift.onCallStatus && shift.onCallStatus !== 'None' && (
                            <Badge 
                              variant="outline" 
                              className={`mt-1 ${onCallColors[shift.onCallStatus]}`}
                            >
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {shift.onCallStatus}
                            </Badge>
                          )}
                          {shift.emergencyContact && (
                            <div className="mt-1 flex items-center text-xs">
                              <PhoneIcon className="h-3 w-3 mr-1" />
                              {shift.emergencyContact}
                            </div>
                          )}
                          {shift.specialDuties && shift.specialDuties.length > 0 && (
                            <div className="mt-1 text-xs italic">
                              {shift.specialDuties.join(', ')}
                            </div>
                          )}
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
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500">Shift Types:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(shiftColors).map(([type, color]) => (
              <div key={type} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${color.split(' ')[0]}`} />
                <span className="text-sm text-gray-600">{type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500">On-Call Status:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(onCallColors).filter(([type]) => type !== 'None').map(([type, color]) => (
              <div key={type} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${color.split(' ')[0]}`} />
                <span className="text-sm text-gray-600">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
} 