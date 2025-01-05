'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/base/DashboardShell';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { TeamList } from '@/components/team/TeamList';
import { TeamForm } from '@/components/team/TeamForm';
import { BulkActions } from '@/components/team/BulkActions';
import { MemberProfileModal } from '@/components/team/MemberProfileModal';
import { TeamAnalytics } from '@/components/team/TeamAnalytics';
import { TeamSchedule } from '@/components/team/TeamSchedule';
import { Button } from '@/components/ui/Button';
import { UserPlus, Download, Search, Bell, Users, UserCheck, UserCog, Clock, Plus, Pencil, Trash2, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { SkillsMatrix } from '@/components/team/SkillsMatrix';
import { CertificationTracker } from '@/components/team/CertificationTracker';
import { HandoverNotes } from '@/components/team/HandoverNotes';
import { EmergencyAlert } from '@/components/team/EmergencyAlert';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  department: string;
  shift: string;
  status: 'ACTIVE' | 'INACTIVE';
  specialization?: string;
  certifications?: string[];
  yearsOfExperience: number;
  animalSpecialties?: string[];
  emergencyContact?: string;
}

// Mock data moved outside component to prevent recreation on each render
const mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Farm Manager',
    email: 'john@example.com',
    department: 'Management',
    shift: 'Morning',
    status: 'ACTIVE' as const,
    specialization: 'Livestock Management',
    certifications: ['Agricultural Management', 'Animal Welfare'],
    yearsOfExperience: 8,
    animalSpecialties: ['Cattle', 'Poultry'],
    emergencyContact: '+1234567890'
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Veterinarian',
    email: 'jane@example.com',
    department: 'Animal Health',
    shift: 'Afternoon',
    status: 'ACTIVE' as const,
    specialization: 'Large Animal Medicine',
    certifications: ['DVM', 'Animal Nutrition Specialist'],
    yearsOfExperience: 5,
    animalSpecialties: ['Cattle', 'Sheep', 'Goats'],
    emergencyContact: '+1234567891'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    role: 'Animal Nutritionist',
    email: 'mike@example.com',
    department: 'Animal Care',
    shift: 'Morning',
    status: 'ACTIVE' as const,
    specialization: 'Feed Management',
    certifications: ['Animal Nutrition', 'Feed Safety'],
    yearsOfExperience: 4,
    animalSpecialties: ['All Livestock'],
    emergencyContact: '+1234567892'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    role: 'Livestock Technician',
    email: 'sarah@example.com',
    department: 'Operations',
    shift: 'Night',
    status: 'ACTIVE' as const,
    specialization: 'Breeding Management',
    certifications: ['Animal Handling', 'Artificial Insemination'],
    yearsOfExperience: 3,
    animalSpecialties: ['Cattle', 'Pigs'],
    emergencyContact: '+1234567893'
  }
];

export default function TeamPage(): React.JSX.Element {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);
  const [viewingMember, setViewingMember] = React.useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isAddingMember, setIsAddingMember] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [departmentFilter, setDepartmentFilter] = React.useState('');
  const [shiftFilter, setShiftFilter] = React.useState('');
  const [members] = React.useState(mockMembers);
  const [selectedRole, setSelectedRole] = React.useState('all');
  const [selectedShift, setSelectedShift] = React.useState('all');
  const [roles, setRoles] = React.useState(['Farm Manager', 'Veterinarian', 'Animal Nutritionist', 'Livestock Technician']);
  const [shifts, setShifts] = React.useState(['Morning', 'Afternoon', 'Night']);
  const [activeMembers] = React.useState(members.filter(m => m.status === 'ACTIVE').length);
  const [onShiftMembers] = React.useState(members.filter(m => m.shift === 'Morning' || m.shift === 'Afternoon').length);
  const [showExport, setShowExport] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);
  const [isEditingMember, setIsEditingMember] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  React.useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  const filteredMembers = React.useMemo(() => {
    let filtered = [...members];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query) ||
        member.specialization?.toLowerCase().includes(query) ||
        member.certifications?.some(cert => cert.toLowerCase().includes(query))
      );
    }

    // Apply department filter
    if (departmentFilter) {
      filtered = filtered.filter(member => member.department === departmentFilter);
    }

    // Apply shift filter
    if (shiftFilter) {
      filtered = filtered.filter(member => member.shift === shiftFilter);
    }

    return filtered;
  }, [members, searchQuery, departmentFilter, shiftFilter]);

  const handleSelect = React.useCallback((id: string | string[]) => {
    if (Array.isArray(id)) {
      setSelectedMembers(id);
    } else {
      setSelectedMembers(prev =>
        prev.includes(id)
          ? prev.filter(memberId => memberId !== id)
          : [...prev, id]
      );
    }
  }, []);

  const handleViewProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setShowProfile(true);
  };

  const handleCloseProfile = React.useCallback(() => {
    setViewingMember(null);
    setIsProfileOpen(false);
  }, []);

  const handleBulkActions = React.useMemo(() => ({
    onAssignTask: () => console.log('Assign task'),
    onAssignShift: () => console.log('Assign shift'),
    onUpdatePermissions: () => console.log('Update permissions'),
    onSendMessage: () => console.log('Send message'),
    onExport: () => console.log('Export'),
    onPrint: () => console.log('Print'),
    onClearSelection: () => setSelectedMembers([]),
  }), []);

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsEditingMember(true);
  };

  const handleDeleteMember = (member: TeamMember) => {
    setSelectedMember(member);
    setShowDeleteConfirm(true);
  };

  if (status === 'loading' || !session) {
    return <LoadingScreen message="Loading team management..." />;
  }

  return (
    <div className="p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Team Management</h2>
        <p className="text-muted-foreground">
          Manage your farm's team members, roles, and permissions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mt-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{members.length}</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-green-50 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeMembers}</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-blue-50 rounded-lg">
                <UserCog className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Roles</p>
                <p className="text-2xl font-bold">{roles.length}</p>
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
                <p className="text-sm font-medium text-muted-foreground">On Shift</p>
                <p className="text-2xl font-bold">{onShiftMembers}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button onClick={() => setIsAddingMember(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
        <Button variant="outline" onClick={() => setShowExport(true)} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Team
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:max-w-xs"
          />
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedShift} onValueChange={setSelectedShift}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              {shifts.map((shift) => (
                <SelectItem key={shift} value={shift}>{shift}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Table */}
      <div className="mt-6 rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Shift</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-b">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary">
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{member.shift}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewProfile(member)}
                      >
                        <User className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditMember(member)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteMember(member)}
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
      <MemberProfileModal
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        member={members.find(m => m.id === viewingMember) || members[0]}
        memberId={viewingMember || members[0].id}
        onClose={handleCloseProfile}
      />
      <TeamForm
        open={isAddingMember}
        onOpenChange={setIsAddingMember}
        onSuccess={() => {
          setIsAddingMember(false);
          // You would typically refresh the team members list here
          console.log('Team member added successfully');
        }}
      />
    </div>
  );
} 