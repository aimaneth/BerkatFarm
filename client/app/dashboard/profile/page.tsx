'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as LocationIcon,
  Briefcase as RoleIcon,
  Calendar as CalendarIcon,
  Globe as LanguageIcon,
  Shield as PrivacyIcon,
  Bell as NotificationIcon,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <Card className="p-6 bg-white lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="h-16 w-16 text-gray-400" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <UserIcon className="h-4 w-4" />
              </label>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{session?.user?.name}</h2>
            <p className="text-sm text-gray-500">{session?.user?.role}</p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                Active
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                Verified
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <MailIcon className="h-5 w-5" />
              <span className="text-sm">{session?.user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <PhoneIcon className="h-5 w-5" />
              <span className="text-sm">+1 (555) 000-0000</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <LocationIcon className="h-5 w-5" />
              <span className="text-sm">San Francisco, CA</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-white">
                View Activity
              </Button>
              <Button variant="outline" className="bg-white">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Profile Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="p-6 bg-white">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <Input
                  type="text"
                  placeholder="John"
                  className="bg-white"
                  defaultValue={session?.user?.name?.split(' ')[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <Input
                  type="text"
                  placeholder="Doe"
                  className="bg-white"
                  defaultValue={session?.user?.name?.split(' ')[1]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-white"
                  defaultValue={session?.user?.email || ''}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <Input type="tel" placeholder="+1 (555) 000-0000" className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <Input type="date" className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border rounded-md shadow-md">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Professional Information */}
          <Card className="p-6 bg-white">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Professional Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Job Title</label>
                  <Input type="text" placeholder="Farm Manager" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  <Select>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-md shadow-md">
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="livestock">Livestock</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Skills</label>
                <Input
                  type="text"
                  placeholder="e.g., Livestock Management, Farm Operations, etc."
                  className="bg-white"
                />
              </div>
            </div>
          </Card>

          {/* Contact & Location */}
          <Card className="p-6 bg-white">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Contact & Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <Input type="text" placeholder="Street Address" className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">City</label>
                <Input type="text" placeholder="City" className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">State/Province</label>
                <Input type="text" placeholder="State" className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">ZIP/Postal Code</label>
                <Input type="text" placeholder="ZIP Code" className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Country</label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border rounded-md shadow-md">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Time Zone</label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border rounded-md shadow-md">
                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                    <SelectItem value="cst">Central Time (CT)</SelectItem>
                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="p-6 bg-white">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive updates and alerts via email</p>
                </div>
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">Receive updates via text message</p>
                </div>
                <input type="checkbox" className="rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Profile Visibility</h3>
                  <p className="text-sm text-gray-500">Control who can see your profile</p>
                </div>
                <Select>
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border rounded-md shadow-md">
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="team">Team Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" className="bg-white">
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 