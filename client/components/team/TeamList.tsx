'use client';

import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye as EyeIcon } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  department: string;
  shift: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface TeamListProps {
  members: TeamMember[];
  selectedMembers: string[];
  onSelect: (id: string) => void;
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
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          Error loading team members: {error.message}
        </div>
      </Card>
    );
  }

  if (!members.length) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          No team members found
        </div>
      </Card>
    );
  }

  return (
    <Card className="divide-y divide-gray-200">
      {members.map((member) => (
        <div
          key={member.id}
          className="p-4 flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={selectedMembers.includes(member.id)}
              onCheckedChange={() => onSelect(member.id)}
            />
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={member.avatar || `/images/avatars/default.png`}
                alt={member.name}
              />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-900">{member.name}</div>
              <div className="text-sm text-gray-500">{member.email}</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end">
              <Badge variant={member.status === 'ACTIVE' ? 'default' : 'secondary'}>
                {member.status}
              </Badge>
              <span className="text-sm text-gray-500 mt-1">{member.department}</span>
            </div>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{member.role}</span>
              <span className="text-sm text-gray-500">{member.shift} Shift</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewProfile(member.id)}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </Card>
  );
} 