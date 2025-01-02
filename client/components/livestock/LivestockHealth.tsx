import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Calendar, CheckCircle, Clock } from 'lucide-react';

const upcomingCheckups = [
  {
    id: 1,
    tag: 'COW-123',
    type: 'Vaccination',
    date: '2024-02-15',
    status: 'scheduled',
    priority: 'high',
  },
  {
    id: 2,
    tag: 'COW-456',
    type: 'Routine Checkup',
    date: '2024-02-16',
    status: 'scheduled',
    priority: 'medium',
  },
  {
    id: 3,
    tag: 'COW-789',
    type: 'Pregnancy Check',
    date: '2024-02-17',
    status: 'scheduled',
    priority: 'high',
  },
];

const healthAlerts = [
  {
    id: 1,
    tag: 'COW-234',
    issue: 'Reduced Feed Intake',
    severity: 'medium',
    reportedAt: '2 hours ago',
  },
  {
    id: 2,
    tag: 'COW-567',
    issue: 'Limping',
    severity: 'high',
    reportedAt: '4 hours ago',
  },
];

const recentTreatments = [
  {
    id: 1,
    tag: 'COW-890',
    treatment: 'Antibiotics',
    date: '2024-02-10',
    status: 'completed',
    notes: 'Follow-up required in 7 days',
  },
  {
    id: 2,
    tag: 'COW-345',
    treatment: 'Hoof Trimming',
    date: '2024-02-09',
    status: 'completed',
    notes: 'Recovery progressing well',
  },
];

export function LivestockHealth() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Checkups */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Checkups</h3>
            <Button variant="outline" size="sm" className="text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingCheckups.map((checkup) => (
              <div
                key={checkup.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      checkup.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{checkup.tag}</p>
                    <p className="text-sm text-gray-500">{checkup.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{checkup.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Health Alerts */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Alerts</h3>
          <div className="space-y-4">
            {healthAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <AlertTriangle
                    className={`w-5 h-5 ${
                      alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{alert.tag}</p>
                    <p className="text-sm text-gray-600">{alert.issue}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{alert.reportedAt}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Treatments */}
        <Card className="p-4 sm:p-6 bg-white lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Treatments</h3>
          <div className="space-y-4">
            {recentTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">{treatment.tag}</p>
                      <span className="px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full">
                        {treatment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{treatment.treatment}</p>
                    <p className="text-sm text-gray-500 mt-1">{treatment.notes}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{treatment.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 