import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Phone,
  Shield,
  Users,
} from 'lucide-react';
import { format } from 'date-fns';

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  isOnCall: boolean;
}

interface Alert {
  id: string;
  type: 'Emergency' | 'Urgent' | 'Warning';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  status: 'Active' | 'Resolved' | 'Pending';
  assignedTo?: string[];
  updates?: {
    timestamp: Date;
    content: string;
    author: string;
  }[];
}

const mockContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    role: 'Senior Veterinarian',
    phone: '+1234567890',
    isOnCall: true
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    role: 'Emergency Veterinarian',
    phone: '+1234567891',
    isOnCall: true
  },
  {
    id: '3',
    name: 'Mike Wilson',
    role: 'Farm Manager',
    phone: '+1234567892',
    isOnCall: false
  }
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'Emergency',
    title: 'Medical Emergency - Cattle',
    description: 'Multiple cattle showing signs of distress in Barn 2',
    location: 'Barn 2',
    timestamp: new Date(),
    status: 'Active',
    assignedTo: ['Dr. John Smith', 'Dr. Sarah Johnson'],
    updates: [
      {
        timestamp: new Date(),
        content: 'Veterinary team dispatched',
        author: 'System'
      }
    ]
  },
  {
    id: '2',
    type: 'Warning',
    title: 'Equipment Malfunction',
    description: 'Ventilation system showing irregular readings',
    location: 'Barn 1',
    timestamp: new Date(Date.now() - 3600000),
    status: 'Pending',
    assignedTo: ['Mike Wilson']
  }
];

const alertColors = {
  Emergency: 'bg-red-100 text-red-800',
  Urgent: 'bg-orange-100 text-orange-800',
  Warning: 'bg-yellow-100 text-yellow-800'
};

const statusColors = {
  Active: 'bg-red-100 text-red-800',
  Resolved: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800'
};

export function EmergencyAlert() {
  const [showResolved, setShowResolved] = useState(false);

  const filteredAlerts = showResolved
    ? mockAlerts
    : mockAlerts.filter(alert => alert.status !== 'Resolved');

  const activeEmergencies = mockAlerts.filter(
    alert => alert.status === 'Active' && alert.type === 'Emergency'
  ).length;

  return (
    <Card className="p-4 sm:p-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Emergency Alert System</h3>
            <p className="text-sm text-gray-500">Monitor and respond to farm emergencies</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Raise Emergency Alert
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-red-50">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-red-800">Active Emergencies</div>
              <Badge variant="outline" className="bg-red-100 text-red-800">
                {activeEmergencies}
              </Badge>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">On-Call Staff</div>
              <Badge variant="outline" className="bg-green-100">
                {mockContacts.filter(c => c.isOnCall).length}
              </Badge>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">Pending Alerts</div>
              <Badge variant="outline" className="bg-yellow-100">
                {mockAlerts.filter(a => a.status === 'Pending').length}
              </Badge>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">Total Alerts</div>
              <Badge variant="outline" className="bg-gray-100">
                {mockAlerts.length}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">On-Call Emergency Contacts</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockContacts.filter(contact => contact.isOnCall).map((contact) => (
              <Card key={contact.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-grow">
                    <div className="font-medium text-gray-900">{contact.name}</div>
                    <div className="text-sm text-gray-500">{contact.role}</div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-1" />
                      {contact.phone}
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    On Call
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">Active Alerts</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowResolved(!showResolved)}
            >
              {showResolved ? 'Hide Resolved' : 'Show Resolved'}
            </Button>
          </div>

          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="p-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={alertColors[alert.type]}>
                    {alert.type}
                  </Badge>
                  <Badge variant="outline" className={statusColors[alert.status]}>
                    {alert.status}
                  </Badge>
                  <div className="flex-grow" />
                  <div className="text-sm text-gray-500">
                    {format(alert.timestamp, 'MMM d, yyyy h:mm a')}
                  </div>
                </div>

                <div>
                  <h5 className="text-base font-medium text-gray-900">{alert.title}</h5>
                  <p className="mt-1 text-sm text-gray-500">{alert.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    {alert.location}
                  </div>
                  {alert.assignedTo && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {alert.assignedTo.join(', ')}
                    </div>
                  )}
                </div>

                {alert.updates && alert.updates.length > 0 && (
                  <div className="border-t pt-3 mt-3">
                    <div className="text-sm font-medium text-gray-900 mb-2">Updates</div>
                    {alert.updates.map((update, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="text-gray-500">
                          {format(update.timestamp, 'h:mm a')}:
                        </div>
                        <div className="flex-grow">
                          <span className="text-gray-900">{update.content}</span>
                          <span className="text-gray-500"> - {update.author}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    Add Update
                  </Button>
                  {alert.status !== 'Resolved' && (
                    <Button size="sm" variant="outline" className="text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Mark as Resolved
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
} 