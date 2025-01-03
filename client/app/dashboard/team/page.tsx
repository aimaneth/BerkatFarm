'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TeamAnalytics } from '@/components/team/TeamAnalytics';
import { TeamSchedule } from '@/components/team/TeamSchedule';
import { BulkActions } from '@/components/team/BulkActions';
import {
  Filter as FilterIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  SlidersHorizontal as SlidersIcon,
} from 'lucide-react';
import { TeamForm } from '@/components/team/TeamForm';

const teamMembers = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Farm Manager',
    department: 'Management',
    shift: 'Morning',
    email: 'john.smith@example.com',
    phone: '+1 234-567-8901',
    avatar: '/images/avatars/1.jpg',
    status: 'active',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Veterinarian',
    department: 'Veterinary',
    shift: 'Afternoon',
    email: 'sarah.johnson@example.com',
    phone: '+1 234-567-8902',
    avatar: '/images/avatars/2.jpg',
    status: 'active',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    role: 'Feed Specialist',
    department: 'Feed & Nutrition',
    shift: 'Night',
    email: 'mike.wilson@example.com',
    phone: '+1 234-567-8903',
    avatar: '/images/avatars/3.jpg',
    status: 'on-leave',
  },
  // Add more team members as needed
];

export default function TeamPage() {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [isAddingMember, setIsAddingMember] = useState(false);

  const handleAddMember = (data: any) => {
    console.log('Adding new team member:', data);
    // TODO: Implement API call to add team member
    const newMember = {
      id: teamMembers.length + 1,
      ...data,
      avatar: '/images/avatars/1.jpg', // Default avatar
    };
    teamMembers.push(newMember);
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesShift = shiftFilter === 'all' || member.shift === shiftFilter;

    return matchesSearch && matchesDepartment && matchesShift;
  });

  const handleMemberSelect = (memberId: number) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleBulkAction = {
    assignTask: (memberIds: number[]) => {
      console.log('Assigning task to:', memberIds);
    },
    assignShift: (memberIds: number[]) => {
      console.log('Assigning shift to:', memberIds);
    },
    updatePermissions: (memberIds: number[]) => {
      console.log('Updating permissions for:', memberIds);
    },
    sendMessage: (memberIds: number[]) => {
      console.log('Sending message to:', memberIds);
    },
    export: () => {
      console.log('Exporting team data');
    },
    print: () => {
      console.log('Printing team data');
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your farm's team members, schedules, and performance
          </p>
        </div>
        <Button 
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white" 
          size="sm"
          onClick={() => setIsAddingMember(true)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Form Dialog */}
      <TeamForm
        isOpen={isAddingMember}
        onClose={() => setIsAddingMember(false)}
        onSubmit={handleAddMember}
        mode="add"
      />

      {/* Filters */}
      <Card className="p-4 bg-white">
        <div className="flex flex-col gap-4">
          {/* Search Row */}
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-white"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="hover:bg-gray-100">All Departments</SelectItem>
                  <SelectItem value="Management" className="hover:bg-gray-100">Management</SelectItem>
                  <SelectItem value="Veterinary" className="hover:bg-gray-100">Veterinary</SelectItem>
                  <SelectItem value="Feed & Nutrition" className="hover:bg-gray-100">Feed & Nutrition</SelectItem>
                  <SelectItem value="Operations" className="hover:bg-gray-100">Operations</SelectItem>
                </SelectContent>
              </Select>

              <Select value={shiftFilter} onValueChange={setShiftFilter}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Shift" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="hover:bg-gray-100">All Shifts</SelectItem>
                  <SelectItem value="Morning" className="hover:bg-gray-100">Morning</SelectItem>
                  <SelectItem value="Afternoon" className="hover:bg-gray-100">Afternoon</SelectItem>
                  <SelectItem value="Night" className="hover:bg-gray-100">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="w-10 h-10 p-0 bg-white shrink-0"
            >
              <SlidersIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Analytics */}
      {showAnalytics && (
        <div className="space-y-6">
          <TeamAnalytics />
          <TeamSchedule />
        </div>
      )}

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className={`p-4 cursor-pointer transition-shadow hover:shadow-md bg-white ${
              selectedMembers.includes(member.id) ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleMemberSelect(member.id)}
          >
            <div className="flex items-start space-x-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">{member.name}</h3>
                <p className="text-sm text-gray-500 truncate">{member.role}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                    {member.department}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                    {member.shift} Shift
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.status === 'active' ? 'Active' : 'On Leave'}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-gray-900 truncate">{member.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm text-gray-900">{member.phone}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bulk Actions */}
      <BulkActions
        selectedMembers={selectedMembers}
        onAssignTask={handleBulkAction.assignTask}
        onAssignShift={handleBulkAction.assignShift}
        onUpdatePermissions={handleBulkAction.updatePermissions}
        onSendMessage={handleBulkAction.sendMessage}
        onExport={handleBulkAction.export}
        onPrint={handleBulkAction.print}
      />
    </div>
  );
} 