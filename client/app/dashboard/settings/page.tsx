'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Settings2, Bell, Shield, Users, Save, Lock, Mail, Smartphone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedSection, setSelectedSection] = React.useState('general');

  React.useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <LoadingScreen message="Loading settings..." />;
  }

  return (
    <div className="p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      {/* Settings Navigation */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mt-6">
        <Card className="p-6 md:col-span-1">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              <h3 className="font-semibold">Settings Menu</h3>
            </div>
            <nav className="space-y-2">
              <Button
                variant={selectedSection === 'general' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedSection('general')}
              >
                <Settings2 className="h-4 w-4 mr-2" />
                General
              </Button>
              <Button
                variant={selectedSection === 'notifications' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedSection('notifications')}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button
                variant={selectedSection === 'security' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedSection('security')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Security
              </Button>
              <Button
                variant={selectedSection === 'team' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedSection('team')}
              >
                <Users className="h-4 w-4 mr-2" />
                Team Access
              </Button>
            </nav>
          </div>
        </Card>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6">
          {selectedSection === 'general' && (
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">General Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure your basic preferences</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Zone</label>
                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">EST</SelectItem>
                        <SelectItem value="pst">PST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {selectedSection === 'notifications' && (
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Manage your notification settings</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Email Notifications</label>
                      <p className="text-xs text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Mobile Notifications</label>
                      <p className="text-xs text-muted-foreground">Get alerts on your phone</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {selectedSection === 'security' && (
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage your account security</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Two-Factor Authentication</label>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Lock className="h-4 w-4 mr-2" />
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Password</label>
                      <p className="text-xs text-muted-foreground">Change your password</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Lock className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {selectedSection === 'team' && (
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Team Access</h3>
                  <p className="text-sm text-muted-foreground">Manage team member permissions</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Role Management</label>
                      <p className="text-xs text-muted-foreground">Configure team roles and permissions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 