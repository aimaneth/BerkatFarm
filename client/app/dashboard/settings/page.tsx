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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  User as UserIcon,
  Building as BuildingIcon,
  Bell as BellIcon,
  Lock as LockIcon,
  Database as DatabaseIcon,
  HelpCircle as HelpIcon,
  Settings as SettingsIcon,
  Languages as LanguageIcon,
  Palette as ThemeIcon,
  CreditCard as BillingIcon,
  Shield as PrivacyIcon,
  Activity as ActivityIcon,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  const handleSave = async (section: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings Updated",
        description: `${section} settings have been saved successfully.`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const settingsNavigation = [
    { id: 'profile', label: 'Profile Settings', icon: UserIcon },
    { id: 'farm', label: 'Farm Settings', icon: BuildingIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: LockIcon },
    { id: 'privacy', label: 'Privacy', icon: PrivacyIcon },
    { id: 'billing', label: 'Billing & Plans', icon: BillingIcon },
    { id: 'data', label: 'Data Management', icon: DatabaseIcon },
    { id: 'appearance', label: 'Appearance', icon: ThemeIcon },
    { id: 'language', label: 'Language & Region', icon: LanguageIcon },
    { id: 'activity', label: 'Activity Log', icon: ActivityIcon },
    { id: 'help', label: 'Help & Support', icon: HelpIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your farm's system settings and preferences
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <Card className="lg:w-64 p-2 bg-white">
          <nav className="space-y-1">
            {settingsNavigation.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === id
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Settings Content */}
        <div className="flex-1">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <Button variant="outline" className="bg-white">
                    Change Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <Input type="text" placeholder="John" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input type="text" placeholder="Doe" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input type="email" placeholder="john@example.com" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" className="bg-white" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Privacy Settings</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Profile Visibility</h3>
                      <p className="text-sm text-gray-500">Control who can see your profile information</p>
                    </div>
                    <Select>
                      <SelectTrigger className="w-40 bg-white">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="team">Team Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Data Sharing</h3>
                      <p className="text-sm text-gray-500">Share analytics data to improve services</p>
                    </div>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Activity Status</h3>
                      <p className="text-sm text-gray-500">Show when you're active on the platform</p>
                    </div>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Connected Services</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Google Calendar</p>
                        <p className="text-xs text-gray-500">Sync farm events with your calendar</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white">
                        Connect
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Weather Service</p>
                        <p className="text-xs text-gray-500">Access detailed weather data</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleSave('Privacy')}
                    isLoading={isLoading}
                  >
                    Save Privacy Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Billing & Plans */}
          {activeTab === 'billing' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Billing & Plans</h2>
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-emerald-900">Current Plan</h3>
                      <p className="text-sm text-emerald-700">Professional Plan</p>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
                      Active
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Plan Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900">Unlimited Users</h4>
                      <p className="text-sm text-gray-500">Add as many team members as needed</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900">Advanced Analytics</h4>
                      <p className="text-sm text-gray-500">Access detailed reports and insights</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900">Priority Support</h4>
                      <p className="text-sm text-gray-500">24/7 dedicated support team</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900">Custom Integration</h4>
                      <p className="text-sm text-gray-500">Connect with your existing tools</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-12 bg-gray-200 rounded"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">•••• 4242</p>
                        <p className="text-xs text-gray-500">Expires 12/24</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white">
                      Update
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Billing History</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Professional Plan - Monthly</p>
                        <p className="text-xs text-gray-500">Feb 1, 2024</p>
                      </div>
                      <span className="text-sm text-gray-900">$49.99</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Professional Plan - Monthly</p>
                        <p className="text-xs text-gray-500">Jan 1, 2024</p>
                      </div>
                      <span className="text-sm text-gray-900">$49.99</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" className="bg-white">
                    Download Invoices
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Appearance Settings</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-emerald-500 rounded-lg p-4 text-center cursor-pointer">
                      <div className="h-20 bg-white rounded mb-2"></div>
                      <span className="text-sm font-medium text-gray-900">Light</span>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 text-center cursor-pointer">
                      <div className="h-20 bg-gray-900 rounded mb-2"></div>
                      <span className="text-sm font-medium text-gray-900">Dark</span>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 text-center cursor-pointer">
                      <div className="h-20 bg-gradient-to-b from-white to-gray-900 rounded mb-2"></div>
                      <span className="text-sm font-medium text-gray-900">System</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Color Scheme</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-emerald-500 mx-auto mb-2"></div>
                      <span className="text-sm text-gray-600">Emerald</span>
                    </div>
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-blue-500 mx-auto mb-2"></div>
                      <span className="text-sm text-gray-600">Blue</span>
                    </div>
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-purple-500 mx-auto mb-2"></div>
                      <span className="text-sm text-gray-600">Purple</span>
                    </div>
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-orange-500 mx-auto mb-2"></div>
                      <span className="text-sm text-gray-600">Orange</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Layout Density</h3>
                  <Select>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select layout density" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-md shadow-md">
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleSave('Appearance')}
                    isLoading={isLoading}
                  >
                    Save Appearance Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Language & Region */}
          {activeTab === 'language' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Language & Region Settings</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Language</label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date Format</label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Time Format</label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="12">12-hour</SelectItem>
                        <SelectItem value="24">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Currency</label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Day of Week</label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select first day" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleSave('Language & Region')}
                    isLoading={isLoading}
                  >
                    Save Language & Region Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Activity Log */}
          {activeTab === 'activity' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Activity Log</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <Select>
                      <SelectTrigger className="w-40 bg-white">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="all">All Activities</SelectItem>
                        <SelectItem value="login">Login Activity</SelectItem>
                        <SelectItem value="changes">Changes</SelectItem>
                        <SelectItem value="exports">Data Exports</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="date"
                      className="bg-white"
                      placeholder="Filter by date"
                    />
                  </div>
                  <Button variant="outline" className="bg-white">
                    Export Log
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 pl-4 py-2">
                    <p className="text-sm font-medium text-gray-900">Settings Updated</p>
                    <p className="text-xs text-gray-500">Profile settings were updated</p>
                    <p className="text-xs text-gray-400 mt-1">Today at 10:30 AM</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-sm font-medium text-gray-900">Login Detected</p>
                    <p className="text-xs text-gray-500">New login from Chrome on Windows</p>
                    <p className="text-xs text-gray-400 mt-1">Today at 09:15 AM</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <p className="text-sm font-medium text-gray-900">Data Export</p>
                    <p className="text-xs text-gray-500">Livestock data was exported</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday at 03:45 PM</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <p className="text-sm font-medium text-gray-900">Password Changed</p>
                    <p className="text-xs text-gray-500">Account password was updated</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday at 02:30 PM</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" className="bg-white">
                    Load More
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Farm Settings */}
          {activeTab === 'farm' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Farm Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Farm Name</label>
                    <Input type="text" placeholder="Green Acres Farm" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Business Type</label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="livestock">Livestock Farm</SelectItem>
                        <SelectItem value="dairy">Dairy Farm</SelectItem>
                        <SelectItem value="mixed">Mixed Farm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <Input type="text" placeholder="Farm Address" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Time Zone</label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Farm Description</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white"
                    placeholder="Brief description of your farm..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Save Farm Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <input type="checkbox" className="rounded border-gray-300" />
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
                      <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Receive mobile push notifications</p>
                    </div>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Notification Categories</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Livestock Updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Financial Reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">System Alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Team Updates</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Save Notification Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Current Password</label>
                      <Input type="password" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">New Password</label>
                      <Input type="password" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                      <Input type="password" className="bg-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Enable two-factor authentication for enhanced security</p>
                    </div>
                    <Button variant="outline" className="bg-white">
                      Enable 2FA
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Login History</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Last login from Chrome on Windows</p>
                        <p className="text-xs text-gray-500">IP: 192.168.1.1 • Feb 20, 2024 09:30 AM</p>
                      </div>
                      <span className="text-xs text-green-600">Current</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Login from Safari on iPhone</p>
                        <p className="text-xs text-gray-500">IP: 192.168.1.2 • Feb 19, 2024 03:15 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Save Security Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Data Management */}
          {activeTab === 'data' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Data Management</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Data Export</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="bg-white">
                      Export Livestock Data
                    </Button>
                    <Button variant="outline" className="bg-white">
                      Export Financial Data
                    </Button>
                    <Button variant="outline" className="bg-white">
                      Export Team Data
                    </Button>
                    <Button variant="outline" className="bg-white">
                      Export Complete Backup
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Data Import</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="space-y-2">
                      <div className="flex justify-center">
                        <DatabaseIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">
                        Drag and drop files here or click to select files
                      </p>
                      <Button variant="outline" className="bg-white">
                        Select Files
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Data Retention</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Automatic Data Cleanup</label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="1year">After 1 Year</SelectItem>
                        <SelectItem value="2years">After 2 Years</SelectItem>
                        <SelectItem value="5years">After 5 Years</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Save Data Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Help & Support */}
          {activeTab === 'help' && (
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Help & Support</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Documentation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="bg-white">
                      User Guide
                    </Button>
                    <Button variant="outline" className="bg-white">
                      API Documentation
                    </Button>
                    <Button variant="outline" className="bg-white">
                      FAQs
                    </Button>
                    <Button variant="outline" className="bg-white">
                      Video Tutorials
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Contact Support</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Subject</label>
                      <Input type="text" placeholder="What do you need help with?" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Message</label>
                      <textarea
                        rows={4}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white"
                        placeholder="Describe your issue..."
                      />
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Send Message
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">System Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Version</span>
                      <span className="text-sm text-gray-900">1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Last Updated</span>
                      <span className="text-sm text-gray-900">Feb 20, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Environment</span>
                      <span className="text-sm text-gray-900">Production</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 