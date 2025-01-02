import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Bell,
  Calendar,
  Clock,
  Settings,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Zap,
  MessageSquare,
  Shield,
} from 'lucide-react';

const scheduledTasks = [
  {
    id: 1,
    type: 'Vaccination',
    animals: ['COW-123', 'COW-124', 'COW-125'],
    dueDate: '2024-02-15',
    priority: 'High',
    status: 'Scheduled',
    assignee: 'Dr. Smith',
  },
  {
    id: 2,
    type: 'Health Check',
    animals: ['COW-126', 'COW-127'],
    dueDate: '2024-02-10',
    priority: 'Medium',
    status: 'Pending',
    assignee: 'Dr. Johnson',
  },
];

const activeAlerts = [
  {
    id: 1,
    type: 'Health Alert',
    message: 'Temperature threshold exceeded for COW-128',
    timestamp: '2024-01-20 15:30',
    severity: 'High',
    status: 'Active',
  },
  {
    id: 2,
    type: 'Feed Alert',
    message: 'Feed stock running low in Storage A',
    timestamp: '2024-01-20 14:45',
    severity: 'Medium',
    status: 'Acknowledged',
  },
];

const automationRules = [
  {
    id: 1,
    name: 'Temperature Monitoring',
    trigger: 'Above 39.5°C',
    action: 'Send alert to veterinarian',
    status: 'Active',
    lastTriggered: '2024-01-20 12:30',
  },
  {
    id: 2,
    name: 'Feed Stock Alert',
    trigger: 'Below 20% capacity',
    action: 'Create purchase order',
    status: 'Active',
    lastTriggered: '2024-01-19 16:45',
  },
];

export function Automation() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Tasks */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Tasks</h3>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>
          <div className="space-y-4">
            {scheduledTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{task.type}</p>
                      <p className="text-sm text-gray-500">
                        {task.animals.length} animals
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.priority === 'High'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className="text-sm font-medium text-gray-900">{task.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Assignee</p>
                    <p className="text-sm font-medium text-gray-900">{task.assignee}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium text-gray-900">{task.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Alerts */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Manage Alerts
            </Button>
          </div>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.severity === 'High' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{alert.type}</p>
                      <p className="text-sm text-gray-500">{alert.message}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    alert.status === 'Active'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Timestamp</p>
                  <p className="text-sm font-medium text-gray-900">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Automation Rules */}
        <Card className="p-4 sm:p-6 bg-white lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Automation Rules</h3>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure Rules
            </Button>
          </div>
          <div className="space-y-4">
            {automationRules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-gray-900">{rule.name}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Trigger: {rule.trigger}
                        </span>
                        <MessageSquare className="w-3 h-3 text-gray-400 mx-2" />
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Action: {rule.action}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      rule.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {rule.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Last triggered: {rule.lastTriggered}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 