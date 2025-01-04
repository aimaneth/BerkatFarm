'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { 
  Phone as PhoneIcon, 
  Mail as MailIcon,
  Building as BuildingIcon,
  Calendar as CalendarIcon,
  MapPin as LocationIcon,
  Award as AwardIcon,
  X as CloseIcon
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  shift: string;
  startDate: string;
  avatar?: string;
  specializations?: string;
  location?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface MemberProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: string;
  onClose: () => void;
}

export function MemberProfileModal({
  open,
  onOpenChange,
  memberId,
  onClose
}: MemberProfileModalProps) {
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && memberId) {
      fetchMemberDetails();
    }
  }, [open, memberId]);

  const fetchMemberDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/team/${memberId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch member details');
      }
      const data = await response.json();
      setMember(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        {isLoading ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : member ? (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <CloseIcon className="h-4 w-4" />
            </Button>

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={member.avatar || `/images/avatars/default.png`}
                    alt={member.name}
                  />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{member.name}</h2>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  <Badge 
                    variant={member.status === 'ACTIVE' ? 'default' : 'secondary'}
                    className="mt-2"
                  >
                    {member.status}
                  </Badge>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-500">
                  <MailIcon className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <PhoneIcon className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
              </div>

              {/* Work Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-500">
                  <BuildingIcon className="h-4 w-4" />
                  <span>{member.department}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{member.shift} Shift</span>
                </div>
                {member.location && (
                  <div className="flex items-center space-x-3 text-gray-500">
                    <LocationIcon className="h-4 w-4" />
                    <span>{member.location}</span>
                  </div>
                )}
              </div>

              {/* Specializations */}
              {member.specializations && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <AwardIcon className="h-4 w-4" />
                    <span className="font-medium">Specializations</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.specializations.split(',').map((spec: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {spec.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">No member data available</div>
        )}
      </DialogContent>
    </Dialog>
  );
} 