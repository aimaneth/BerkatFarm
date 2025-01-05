'use client';

import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye as EyeIcon, Award, Clock, Phone } from 'lucide-react';
import * as React from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  department: string;
  shift: string;
  status: 'ACTIVE' | 'INACTIVE';
  specialization?: string;
  certifications?: string[];
  yearsOfExperience: number;
  animalSpecialties?: string[];
  emergencyContact?: string;
}

interface TeamListProps {
  members: TeamMember[];
  selectedMembers: string[];
  onSelect: (id: string | string[]) => void;
  onViewProfile: (id: string) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export function TeamList({
  members,
  selectedMembers,
  onSelect,
  onViewProfile,
  isLoading,
  error
}: TeamListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-3 bg-white rounded-lg border border-gray-200 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-2 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <div className="text-red-500 font-medium mb-2">Error loading team members</div>
        <div className="text-sm text-gray-500">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:-mx-6">
      <div className="inline-block min-w-full align-middle">
        {/* Table Header */}
        <div className="bg-gray-50 border-y border-gray-200">
          <div className="grid grid-cols-[auto,1fr,auto] sm:grid-cols-[auto,auto,1fr,auto,auto,auto] items-center gap-3 px-4 sm:px-6 py-3">
            <div className="w-8">
              <Checkbox
                checked={selectedMembers.length === members.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelect(members.map(m => m.id));
                  } else {
                    onSelect([]);
                  }
                }}
              />
            </div>
            <div className="w-10 hidden sm:block" /> {/* Avatar space */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,1fr] gap-3">
              <div className="text-sm font-medium text-gray-500">Name & Email</div>
              <div className="hidden sm:block text-sm font-medium text-gray-500">Role</div>
              <div className="hidden sm:block text-sm font-medium text-gray-500">Department</div>
            </div>
            <div className="hidden sm:block text-sm font-medium text-gray-500">Status</div>
            <div className="hidden sm:block text-sm font-medium text-gray-500">Shift</div>
            <div className="w-10" /> {/* Action space */}
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {members.length === 0 ? (
            <div className="px-4 sm:px-6 py-4 text-center text-gray-500">
              No team members found
            </div>
          ) : (
            members.map((member) => (
              <div
                key={member.id}
                className="group hover:bg-gray-50 transition-colors"
              >
                <div className="grid grid-cols-[auto,1fr,auto] sm:grid-cols-[auto,auto,1fr,auto,auto,auto] items-center gap-3 px-4 sm:px-6 py-3">
                  <Checkbox
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={() => onSelect(member.id)}
                    className="w-8"
                  />
                  <Avatar className="w-10 h-10 shrink-0 hidden sm:block">
                    <AvatarImage
                      src={member.avatar || `/images/avatars/default.png`}
                      alt={member.name}
                    />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 grid grid-cols-1 sm:grid-cols-[1fr,1fr,1fr] gap-1 sm:gap-3">
                    <div className="flex sm:block items-center gap-3">
                      <Avatar className="w-8 h-8 shrink-0 sm:hidden">
                        <AvatarImage
                          src={member.avatar || `/images/avatars/default.png`}
                          alt={member.name}
                        />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 truncate">{member.name}</div>
                        <div className="text-sm text-gray-500 truncate">{member.email}</div>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-sm text-gray-900 truncate">{member.role}</div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-sm text-gray-500 truncate">{member.department}</div>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <Badge variant={member.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm text-gray-500">{member.shift}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewProfile(member.id)}
                    className="w-10"
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span className="sr-only">View Profile</span>
                  </Button>
                </div>
                <div className="sm:hidden px-4 pb-3 flex items-center gap-3">
                  <div className="text-sm text-gray-900">{member.role}</div>
                  <div className="text-sm text-gray-500">{member.department}</div>
                  <Badge variant={member.status === 'ACTIVE' ? 'default' : 'secondary'}>
                    {member.status}
                  </Badge>
                  <div className="text-sm text-gray-500">{member.shift}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 