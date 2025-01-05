'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Search, Download, PlusCircle, Calendar, CheckCircle2, Clock, AlertCircle, ListTodo, Plus, CheckCircle, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Feed livestock',
    description: 'Distribute feed to all livestock pens',
    status: 'pending',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-01-05',
    category: 'Daily'
  },
  {
    id: '2',
    title: 'Health checkups',
    description: 'Perform routine health checks on all animals',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Jane Smith',
    dueDate: '2024-01-05',
    category: 'Health'
  },
  {
    id: '3',
    title: 'Clean pens',
    description: 'Clean and sanitize all animal pens',
    status: 'completed',
    priority: 'medium',
    assignee: 'Mike Johnson',
    dueDate: '2024-01-04',
    category: 'Maintenance'
  },
  {
    id: '4',
    title: 'Update records',
    description: 'Update animal health and feeding records',
    status: 'overdue',
    priority: 'low',
    assignee: 'Sarah Wilson',
    dueDate: '2024-01-03',
    category: 'Admin'
  }
];

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  category: string;
}

export default function TasksPage(): React.JSX.Element {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [showExport, setShowExport] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [selectedPriority, setSelectedPriority] = React.useState('all');
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  React.useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <LoadingScreen message="Loading task management..." />;
  }

  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = mockTasks.filter(t => t.status === 'In Progress').length;
  const pendingTasks = mockTasks.filter(t => t.status === 'Pending').length;
  const overdueTasks = mockTasks.filter(t => new Date(t.dueDate) < new Date()).length;

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === '' || task.category === categoryFilter;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowAddTask(true);
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task);
    // Add delete logic here
  };

  return (
    <div className="p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Task Management</h2>
        <p className="text-muted-foreground">
          Manage and track farm tasks and activities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center">
                <ListTodo className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedTasks}</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-yellow-50 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressTasks}</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-red-50 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{overdueTasks}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button onClick={() => setShowAddTask(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
        <Button variant="outline" onClick={() => setShowExport(true)} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Tasks
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:max-w-xs"
          />
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Filter priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="mt-6 rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Task</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Assignee</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Due Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">{task.description}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{task.assignee}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      task.status === 'completed' && "bg-green-100 text-green-800",
                      task.status === 'in-progress' && "bg-blue-100 text-blue-800",
                      task.status === 'pending' && "bg-yellow-100 text-yellow-800",
                      task.status === 'overdue' && "bg-red-100 text-red-800"
                    )}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTask(task)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTask(task)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showAddTask && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold tracking-tight">Add Task</h2>
          {/* Add Task Form Component */}
        </div>
      )}

      {showExport && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold tracking-tight">Export Tasks</h2>
          {/* Export Tasks Component */}
        </div>
      )}
    </div>
  );
} 