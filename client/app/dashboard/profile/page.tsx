'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, MapPin, Building, Calendar, Edit, Camera } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <LoadingScreen message="Loading profile..." />;
  }

  return (
    <div className="p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Profile Header */}
      <Card className="p-6 mt-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <Button
              size="sm"
              variant="outline"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Farm Manager</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                john.doe@example.com
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +1 234 567 890
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                New York, USA
              </div>
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Profile Information */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Personal Information</h3>
              <p className="text-sm text-muted-foreground">Update your personal details</p>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="john.doe@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input defaultValue="+1 234 567 890" type="tel" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Work Information</h3>
              <p className="text-sm text-muted-foreground">Update your work details</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input defaultValue="Farm Manager" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select defaultValue="management">
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="livestock">Livestock</SelectItem>
                    <SelectItem value="crops">Crops</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input defaultValue="New York, USA" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input type="date" defaultValue="2020-01-01" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Email Notifications</label>
                  <p className="text-xs text-muted-foreground">Receive updates via email</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Mobile Notifications</label>
                  <p className="text-xs text-muted-foreground">Get alerts on your phone</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Account Settings</h3>
              <p className="text-sm text-muted-foreground">Manage your account preferences</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Language</label>
                  <p className="text-xs text-muted-foreground">Select your preferred language</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Time Zone</label>
                  <p className="text-xs text-muted-foreground">Set your local time zone</p>
                </div>
                <Select defaultValue="est">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">EST</SelectItem>
                    <SelectItem value="cst">CST</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end mt-6">
        <Button className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
} 