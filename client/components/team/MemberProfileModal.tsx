import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import {
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as LocationIcon,
  Calendar as CalendarIcon,
  Award as AwardIcon,
  Briefcase as BriefcaseIcon,
  Clock as ClockIcon,
  Star as StarIcon,
  Activity as ActivityIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  FileText as FileTextIcon,
  Edit2 as EditIcon
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  avatar: string;
  performance: number;
  tasksCompleted: number;
  attendance: number;
  shift: string;
  specialization: string[];
  recentActivity: string;
}

interface MemberProfileModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberProfileModal({ member, isOpen, onClose }: MemberProfileModalProps) {
  if (!member) return null;

  const performanceColor = member.performance >= 90 ? 'emerald' : member.performance >= 70 ? 'yellow' : 'red';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="fixed inset-0 bg-black/30" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto overflow-hidden">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-teal-400">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:space-x-5">
              <div className="relative inline-block">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white object-cover"
                />
                <span 
                  className={`absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white ${
                    member.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} 
                />
              </div>
              <div className="mt-6 sm:mt-0 flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
              <Button className="mt-4 sm:mt-0" variant="outline">
                <EditIcon className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Content Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MailIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <LocationIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ClockIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <span>{member.shift} Shift</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <ActivityIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span>Performance Score</span>
                    </div>
                    <span className={`font-semibold text-${performanceColor}-600`}>
                      {member.performance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span>Tasks Completed</span>
                    </div>
                    <span className="font-semibold">{member.tasksCompleted}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span>Attendance Rate</span>
                    </div>
                    <span className="font-semibold">{member.attendance}%</span>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {member.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700"
                    >
                      <StarIcon className="w-4 h-4 mr-1" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <div className="text-sm text-gray-500">
                  Last active {member.recentActivity}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" variant="outline">
                <FileTextIcon className="w-4 h-4 mr-2" />
                View Full Report
              </Button>
              <Button className="flex-1" variant="outline">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button className="flex-1">
                <MailIcon className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
} 