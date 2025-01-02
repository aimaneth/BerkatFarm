import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Baby, Dna, Clock, AlertCircle } from 'lucide-react';

const breedingRecords = [
  {
    id: 1,
    tag: 'COW-123',
    type: 'Artificial Insemination',
    date: '2024-01-15',
    sire: 'BULL-456',
    status: 'Confirmed',
    dueDate: '2024-10-15',
  },
  {
    id: 2,
    tag: 'COW-234',
    type: 'Natural Breeding',
    date: '2024-01-20',
    sire: 'BULL-789',
    status: 'Pending Confirmation',
    dueDate: 'TBD',
  },
];

const pregnancyTracking = [
  {
    id: 1,
    tag: 'COW-567',
    conception: '2023-09-01',
    dueDate: '2024-06-10',
    stage: 'Third Trimester',
    status: 'Normal',
    lastCheck: '2024-01-10',
  },
  {
    id: 2,
    tag: 'COW-890',
    conception: '2023-10-15',
    dueDate: '2024-07-24',
    stage: 'Second Trimester',
    status: 'Monitoring Required',
    lastCheck: '2024-01-12',
  },
];

const genealogyData = [
  {
    id: 1,
    tag: 'COW-123',
    sire: 'BULL-456',
    dam: 'COW-789',
    birthDate: '2021-03-15',
    breed: 'Holstein',
    pedigree: 'Pure',
    offspring: ['COW-234', 'COW-345'],
  },
];

export function BreedingManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breeding Records */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Breeding Records</h3>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Breeding
            </Button>
          </div>
          <div className="space-y-4">
            {breedingRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Dna className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{record.tag}</p>
                    <p className="text-sm text-gray-500">{record.type}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs text-gray-500">Sire: {record.sire}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">Date: {record.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    record.status === 'Confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {record.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Due: {record.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pregnancy Tracking */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pregnancy Tracking</h3>
            <Button variant="outline" size="sm">
              <Baby className="w-4 h-4 mr-2" />
              Add Pregnancy
            </Button>
          </div>
          <div className="space-y-4">
            {pregnancyTracking.map((pregnancy) => (
              <div
                key={pregnancy.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Baby className="w-5 h-5 text-blue-500" />
                    <p className="font-medium text-gray-900">{pregnancy.tag}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    pregnancy.status === 'Normal'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {pregnancy.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Stage</p>
                    <p className="text-sm font-medium text-gray-900">{pregnancy.stage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className="text-sm font-medium text-gray-900">{pregnancy.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Check</p>
                    <p className="text-sm font-medium text-gray-900">{pregnancy.lastCheck}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Conception</p>
                    <p className="text-sm font-medium text-gray-900">{pregnancy.conception}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Genealogy Tracking */}
        <Card className="p-4 sm:p-6 bg-white lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Genealogy Records</h3>
            <Button variant="outline" size="sm">
              <Dna className="w-4 h-4 mr-2" />
              View Full Pedigree
            </Button>
          </div>
          <div className="space-y-4">
            {genealogyData.map((record) => (
              <div
                key={record.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Dna className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="font-medium text-gray-900">{record.tag}</p>
                      <p className="text-sm text-gray-500">{record.breed} • {record.pedigree}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Born: {record.birthDate}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Sire</p>
                    <p className="text-sm font-medium text-gray-900">{record.sire}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dam</p>
                    <p className="text-sm font-medium text-gray-900">{record.dam}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Offspring</p>
                    <div className="flex flex-wrap gap-1">
                      {record.offspring.map((off) => (
                        <span
                          key={off}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                        >
                          {off}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 