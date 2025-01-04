'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Filter as FilterIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  SlidersHorizontal as SlidersIcon,
} from 'lucide-react';
import { TeamAnalytics } from '@/components/team/TeamAnalytics';
import { TeamSchedule } from '@/components/team/TeamSchedule';
import { BulkActions } from '@/components/team/BulkActions';
import { MemberProfileModal } from '@/components/team/MemberProfileModal';
import { TeamForm } from '@/components/team/TeamForm';
import { TeamList } from '@/components/team/TeamList';
import { useTeamMembers } from '@/hooks/useTeamMembers';

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const {
    data: teamMembers,
    isLoading,
    error,
    mutate: refreshTeamMembers
  } = useTeamMembers();

  const handleMemberSelect = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleBulkAction = {
    assignTask: (memberIds: string[]) => {
      console.log('Assigning task to:', memberIds);
    },
    assignShift: (memberIds: string[]) => {
      console.log('Assigning shift to:', memberIds);
    },
    updatePermissions: (memberIds: string[]) => {
      console.log('Updating permissions for:', memberIds);
    },
    sendMessage: (memberIds: string[]) => {
      console.log('Sending message to:', memberIds);
    },
    export: () => {
      console.log('Exporting team data');
    },
    print: () => {
      console.log('Printing team data');
    },
  };

  const filteredMembers = teamMembers?.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesShift = shiftFilter === 'all' || member.shift === shiftFilter;

    return matchesSearch && matchesDepartment && matchesShift;
  }) || [];

  return (
    <div className="space-y-6 p-6">
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Veterinary">Veterinary</SelectItem>
                  <SelectItem value="Feed & Nutrition">Feed & Nutrition</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>

              <Select value={shiftFilter} onValueChange={setShiftFilter}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Shift" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Afternoon">Afternoon</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
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

      {/* Bulk Actions */}
      {selectedMembers.length > 0 && (
        <BulkActions
          selectedCount={selectedMembers.length}
          onAssignTask={() => handleBulkAction.assignTask(selectedMembers)}
          onAssignShift={() => handleBulkAction.assignShift(selectedMembers)}
          onUpdatePermissions={() => handleBulkAction.updatePermissions(selectedMembers)}
          onSendMessage={() => handleBulkAction.sendMessage(selectedMembers)}
          onExport={handleBulkAction.export}
          onPrint={handleBulkAction.print}
          onClearSelection={() => setSelectedMembers([])}
        />
      )}

      {/* Team List */}
      <TeamList
        members={filteredMembers}
        selectedMembers={selectedMembers}
        onSelect={handleMemberSelect}
        onViewProfile={(id) => {
          setSelectedMember(id);
          setShowProfile(true);
        }}
        isLoading={isLoading}
        error={error}
      />

      {/* Add Member Modal */}
      <TeamForm
        open={isAddingMember}
        onOpenChange={setIsAddingMember}
        onSuccess={() => {
          refreshTeamMembers();
          setIsAddingMember(false);
        }}
      />

      {/* Member Profile Modal */}
      {selectedMember && (
        <MemberProfileModal
          open={showProfile}
          onOpenChange={setShowProfile}
          memberId={selectedMember}
          onClose={() => {
            setSelectedMember(null);
            setShowProfile(false);
          }}
        />
      )}
    </div>
  );
} 