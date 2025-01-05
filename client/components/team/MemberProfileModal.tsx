'use client';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { 
  Phone as PhoneIcon, 
  Mail as MailIcon,
  Building as BuildingIcon,
  Calendar as CalendarIcon,
  Award as AwardIcon,
  X as CloseIcon,
  Leaf as LeafIcon
} from 'lucide-react';

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
  avatar?: string;
}

interface MemberProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: string;
  member: TeamMember;
  onClose: () => void;
}

export function MemberProfileModal({
  open,
  onOpenChange,
  memberId,
  member,
  onClose
}: MemberProfileModalProps) {
  if (!open || !member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl overflow-hidden bg-white p-0 mx-4 sm:mx-0">
        {/* Header Background */}
        <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-emerald-500/10 to-transparent" />
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 sm:right-4 sm:top-4 hover:bg-gray-100 z-10"
          >
            <CloseIcon className="h-4 w-4" />
          </Button>

          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 pb-0 text-center sm:text-left">
              <Avatar className="h-20 w-20 mx-auto sm:mx-0 ring-4 ring-white">
                <AvatarImage
                  src={member.avatar || `/images/avatars/default.png`}
                  alt={member.name}
                />
                <AvatarFallback className="bg-emerald-500 text-white text-xl">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
                  {member.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                <Badge 
                  variant={member.status === 'ACTIVE' ? 'default' : 'secondary'}
                  className="mt-2"
                >
                  {member.status}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 pb-6 space-y-4 sm:space-y-6">
              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MailIcon className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-sm truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <PhoneIcon className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-sm">{member.emergencyContact}</span>
                  </div>
                </div>
              </div>

              {/* Work Info */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <BuildingIcon className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-sm">{member.department}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <CalendarIcon className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-sm">{member.shift} Shift</span>
                  </div>
                </div>
              </div>

              {/* Specializations & Experience */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="flex items-center space-x-2 text-gray-700 mb-2 sm:mb-3">
                  <AwardIcon className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="font-medium text-sm sm:text-base">Specialization & Experience</span>
                </div>
                <div className="pl-6">
                  <p className="text-gray-600 text-sm">{member.specialization}</p>
                  <p className="text-sm text-gray-500 mt-1">{member.yearsOfExperience} years of experience</p>
                </div>
              </div>

              {/* Animal Specialties */}
              {member.animalSpecialties && member.animalSpecialties.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2 text-gray-700 mb-2 sm:mb-3">
                    <LeafIcon className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="font-medium text-sm sm:text-base">Animal Specialties</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {member.animalSpecialties.map((specialty, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-white text-xs sm:text-sm whitespace-nowrap"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {member.certifications && member.certifications.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2 text-gray-700 mb-2 sm:mb-3">
                    <AwardIcon className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="font-medium text-sm sm:text-base">Certifications</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {member.certifications.map((cert, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-white text-xs sm:text-sm whitespace-nowrap"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 