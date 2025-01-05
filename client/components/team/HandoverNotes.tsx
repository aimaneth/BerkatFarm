import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  MessageSquare,
  Stethoscope,
} from 'lucide-react';
import { format } from 'date-fns';

interface HandoverNote {
  id: string;
  timestamp: Date;
  author: string;
  shift: string;
  category: 'General' | 'Medical' | 'Emergency' | 'Tasks';
  content: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  attachments?: { name: string; url: string }[];
}

const mockNotes: HandoverNote[] = [
  {
    id: '1',
    timestamp: new Date(),
    author: 'Dr. John Smith',
    shift: 'Morning',
    category: 'Medical',
    content: 'Cattle in Pen 3 showing signs of respiratory issues. Administered initial treatment. Monitor closely.',
    status: 'In Progress',
    priority: 'High',
    attachments: [
      { name: 'Treatment_Plan.pdf', url: '/docs/treatment_plan.pdf' }
    ]
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000),
    author: 'Sarah Johnson',
    shift: 'Night',
    category: 'Tasks',
    content: 'Completed evening feed inventory. Low stock on dairy feed - order needed.',
    status: 'Completed',
    priority: 'Medium'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 7200000),
    author: 'Mike Wilson',
    shift: 'Afternoon',
    category: 'Emergency',
    content: 'Power outage in Barn 2 backup generator activated. Maintenance team notified.',
    status: 'Completed',
    priority: 'High'
  }
];

const categoryColors = {
  General: 'bg-gray-100 text-gray-800',
  Medical: 'bg-blue-100 text-blue-800',
  Emergency: 'bg-red-100 text-red-800',
  Tasks: 'bg-green-100 text-green-800'
};

const priorityColors = {
  Low: 'bg-gray-100 text-gray-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800'
};

const statusColors = {
  Pending: 'bg-gray-100 text-gray-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800'
};

export function HandoverNotes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const filteredNotes = selectedCategory === 'all'
    ? mockNotes
    : mockNotes.filter(note => note.category === selectedCategory);

  return (
    <Card className="p-4 sm:p-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Shift Handover Notes</h3>
            <p className="text-sm text-gray-500">Track and manage shift transitions and important updates</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="General">General</option>
              <option value="Medical">Medical</option>
              <option value="Emergency">Emergency</option>
              <option value="Tasks">Tasks</option>
            </select>
            <Button onClick={() => setIsAddingNote(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">Total Notes</div>
              <Badge variant="outline" className="bg-gray-100">
                {mockNotes.length}
              </Badge>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">Pending Tasks</div>
              <Badge variant="outline" className="bg-yellow-100">
                {mockNotes.filter(n => n.status === 'Pending').length}
              </Badge>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">High Priority</div>
              <Badge variant="outline" className="bg-red-100">
                {mockNotes.filter(n => n.priority === 'High').length}
              </Badge>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">Completed</div>
              <Badge variant="outline" className="bg-green-100">
                {mockNotes.filter(n => n.status === 'Completed').length}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="p-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={categoryColors[note.category]}>
                    {note.category}
                  </Badge>
                  <Badge variant="outline" className={priorityColors[note.priority]}>
                    {note.priority} Priority
                  </Badge>
                  <Badge variant="outline" className={statusColors[note.status]}>
                    {note.status}
                  </Badge>
                  <div className="flex-grow" />
                  <div className="text-sm text-gray-500">
                    {format(note.timestamp, 'MMM d, yyyy h:mm a')}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-grow">
                    <div className="text-sm text-gray-500">
                      {note.author} • {note.shift} Shift
                    </div>
                    <div className="mt-1 text-gray-900">{note.content}</div>
                  </div>
                </div>

                {note.attachments && note.attachments.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    {note.attachments.map((attachment, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {attachment.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
} 