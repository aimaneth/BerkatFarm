'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TwoFactorAuth } from '@/components/auth/TwoFactorAuth';
import { AuditLog } from '@/components/audit/AuditLog';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Shield,
  History,
  Database,
  Settings as SettingsIcon,
  Bell,
  Smartphone,
  Lock,
  Key,
  Users,
  Laptop,
  AlertTriangle,
  Building,
  FileText,
  Link as LinkIcon,
  Mail,
  Calendar,
  MapPin,
  Phone,
  Globe,
  Currency,
  Clock,
} from 'lucide-react';

// Add role types
type Role = 'ADMIN' | 'MANAGER' | 'STAFF' | 'VETERINARIAN' | 'ACCOUNTANT';

interface Device {
  id: string;
  name: string;
  lastActive: string;
  browser: string;
  location: string;
  isCurrent: boolean;
}

interface ApiKey {
  id: string;
  name: string;
  lastUsed: string;
  createdAt: string;
  permissions: string[];
}

interface FarmProfile {
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  currency: string;
  timezone: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'invited' | 'disabled';
  lastActive: string;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [auditLogData, setAuditLogData] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Mock devices data
  const [devices] = useState<Device[]>([
    {
      id: '1',
      name: 'Windows PC',
      lastActive: 'Now',
      browser: 'Chrome',
      location: 'Lagos, Nigeria',
      isCurrent: true,
    },
    {
      id: '2',
      name: 'iPhone 12',
      lastActive: '2 hours ago',
      browser: 'Safari',
      location: 'Lagos, Nigeria',
      isCurrent: false,
    },
  ]);

  // Mock API keys data
  const [apiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Livestock Integration',
      lastUsed: '1 hour ago',
      createdAt: '2024-01-01',
      permissions: ['read:livestock', 'write:livestock'],
    },
    {
      id: '2',
      name: 'Financial Reports',
      lastUsed: '1 day ago',
      createdAt: '2024-01-15',
      permissions: ['read:finance'],
    },
  ]);

  // Mock farm profile data
  const [farmProfile, setFarmProfile] = useState<FarmProfile>({
    name: 'Berkat Farm',
    type: 'Livestock',
    address: 'Lagos, Nigeria',
    phone: '+234 123 456 7890',
    email: 'contact@berkatfarm.com',
    website: 'www.berkatfarm.com',
    currency: 'NGN',
    timezone: 'Africa/Lagos',
  });

  // Mock team members data
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@berkatfarm.com',
      role: 'ADMIN',
      status: 'active',
      lastActive: 'Now',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@berkatfarm.com',
      role: 'VETERINARIAN',
      status: 'active',
      lastActive: '1 hour ago',
    },
  ]);

  // Mock functions for 2FA - replace with actual API calls
  const handle2FAEnable = async () => {
    // Mock API call
    return {
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/Example:user@example.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=Example',
      secret: 'HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ'
    };
  };

  const handle2FAVerify = async (code: string) => {
    // Mock verification
    return true;
  };

  const handle2FADisable = async () => {
    // Mock disable
    return true;
  };

  // Mock function for audit log filtering
  const handleAuditLogFilter = (filters: any) => {
    // Mock filtering logic
    console.log('Applying filters:', filters);
  };

  // Mock function for audit log export
  const handleAuditLogExport = () => {
    toast({
      title: 'Export Started',
      description: 'Your audit log export will be ready shortly.',
    });
  };

  // Handle password reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Mock API call - replace with actual password reset logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success',
        description: 'Your password has been updated successfully.',
      });
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle device removal
  const handleRemoveDevice = (deviceId: string) => {
    toast({
      title: 'Device Removed',
      description: 'The device has been removed from your account.',
    });
  };

  // Handle API key generation
  const handleGenerateApiKey = () => {
    toast({
      title: 'API Key Generated',
      description: 'Your new API key has been generated. Please copy it now as it wont be shown again.',
    });
  };

  // Handle API key removal
  const handleRemoveApiKey = (keyId: string) => {
    toast({
      title: 'API Key Removed',
      description: 'The API key has been revoked and can no longer be used.',
    });
  };

  // Handle farm profile update
  const handleFarmProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Profile Updated',
      description: 'Farm profile has been updated successfully.',
    });
  };

  // Handle team member invitation
  const handleInviteTeamMember = () => {
    toast({
      title: 'Invitation Sent',
      description: 'Team member invitation has been sent.',
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your security and system preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="farm" className="space-y-6">
        <div className="border-b border-gray-200">
          <div className="scrollbar-none overflow-x-auto">
            <TabsList className="w-full flex-none inline-flex min-w-full">
              <div className="flex gap-2 p-1">
                <TabsTrigger value="farm" className="flex items-center gap-2 whitespace-nowrap">
                  <Building className="h-4 w-4" />
                  Farm Profile
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2 whitespace-nowrap">
                  <Users className="h-4 w-4" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2 whitespace-nowrap">
                  <Shield className="h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2 whitespace-nowrap">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center gap-2 whitespace-nowrap">
                  <LinkIcon className="h-4 w-4" />
                  Integrations
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center gap-2 whitespace-nowrap">
                  <FileText className="h-4 w-4" />
                  Data
                </TabsTrigger>
                <TabsTrigger value="audit" className="flex items-center gap-2 whitespace-nowrap">
                  <History className="h-4 w-4" />
                  Audit
                </TabsTrigger>
              </div>
            </TabsList>
          </div>
        </div>

        <TabsContent value="farm" className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Farm Profile
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage your farm's basic information
                  </p>
                </div>
              </div>

              <form onSubmit={handleFarmProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Farm Name
                    </label>
                    <Input
                      value={farmProfile.name}
                      onChange={(e) => setFarmProfile({ ...farmProfile, name: e.target.value })}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Farm Type
                    </label>
                    <Input
                      value={farmProfile.type}
                      onChange={(e) => setFarmProfile({ ...farmProfile, type: e.target.value })}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <Input
                        value={farmProfile.address}
                        onChange={(e) => setFarmProfile({ ...farmProfile, address: e.target.value })}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <Input
                        value={farmProfile.phone}
                        onChange={(e) => setFarmProfile({ ...farmProfile, phone: e.target.value })}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        value={farmProfile.email}
                        onChange={(e) => setFarmProfile({ ...farmProfile, email: e.target.value })}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <Input
                        value={farmProfile.website}
                        onChange={(e) => setFarmProfile({ ...farmProfile, website: e.target.value })}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Currency
                    </label>
                    <div className="flex items-center gap-2">
                      <Currency className="h-4 w-4 text-gray-400" />
                      <Input
                        value={farmProfile.currency}
                        onChange={(e) => setFarmProfile({ ...farmProfile, currency: e.target.value })}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Time Zone
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <Input
                        value={farmProfile.timezone}
                        onChange={(e) => setFarmProfile({ ...farmProfile, timezone: e.target.value })}
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Team Management
                    </h3>
                    <p className="text-sm text-gray-500">
                      Manage your farm's team members and their roles
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleInviteTeamMember}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Invite Team Member
                </Button>
              </div>

              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {member.name}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          member.status === 'active' ? 'text-green-700 bg-green-100' :
                          member.status === 'invited' ? 'text-yellow-700 bg-yellow-100' :
                          'text-red-700 bg-red-100'
                        }`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {member.email} • {member.role} • Last active: {member.lastActive}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="bg-white"
                      >
                        Edit Role
                      </Button>
                      {member.status === 'active' && (
                        <Button
                          variant="outline"
                          className="bg-white text-red-600 hover:text-red-700"
                        >
                          Disable Access
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Password Reset Section */}
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Password Reset
                  </h3>
                  <p className="text-sm text-gray-500">
                    Change your account password
                  </p>
                </div>
              </div>

              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          </Card>

          {/* Login Security Section */}
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Login Security
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enhance your account security
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Require Strong Passwords</h4>
                    <p className="text-sm text-gray-500">Enforce minimum password requirements</p>
                  </div>
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Password Expiry</h4>
                    <p className="text-sm text-gray-500">Require password change every 90 days</p>
                  </div>
                  <input type="checkbox" className="form-checkbox" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Login Notifications</h4>
                    <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                  </div>
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                </div>
              </div>
            </div>
          </Card>

          {/* Two Factor Authentication Section */}
          <TwoFactorAuth
            onEnable={handle2FAEnable}
            onVerify={handle2FAVerify}
            onDisable={handle2FADisable}
          />

          {/* Device Management Section */}
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Laptop className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Device Management
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage devices that have access to your account
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {device.name}
                        </span>
                        {device.isCurrent && (
                          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Last active: {device.lastActive} • {device.browser} • {device.location}
                      </p>
                    </div>
                    {!device.isCurrent && (
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveDevice(device.id)}
                        className="bg-white text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* API Key Management Section */}
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      API Keys
                    </h3>
                    <p className="text-sm text-gray-500">
                      Manage API keys for external integrations
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleGenerateApiKey}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Generate New Key
                </Button>
              </div>

              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="p-4 bg-gray-50 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-gray-900">{key.name}</h4>
                        <p className="text-sm text-gray-500">
                          Created: {key.createdAt} • Last used: {key.lastUsed}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveApiKey(key.id)}
                        className="bg-white text-red-600 hover:text-red-700"
                      >
                        Revoke
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {key.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm text-yellow-700">
                    API keys provide full access to your account. Keep them secure and never share them.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Notification Rules
                  </h3>
                  <p className="text-sm text-gray-500">
                    Configure notifications for farm events
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Livestock Events</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Health Alerts</span>
                        <p className="text-xs text-gray-500">Get notified about animal health issues</p>
                      </div>
                      <input type="checkbox" className="form-checkbox" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Vaccination Due</span>
                        <p className="text-xs text-gray-500">Reminders for upcoming vaccinations</p>
                      </div>
                      <input type="checkbox" className="form-checkbox" defaultChecked />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Inventory Events</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Low Stock</span>
                        <p className="text-xs text-gray-500">Alert when inventory is running low</p>
                      </div>
                      <input type="checkbox" className="form-checkbox" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Expiry Dates</span>
                        <p className="text-xs text-gray-500">Alert for items nearing expiry</p>
                      </div>
                      <input type="checkbox" className="form-checkbox" defaultChecked />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Financial Events</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Payment Due</span>
                        <p className="text-xs text-gray-500">Reminders for upcoming payments</p>
                      </div>
                      <input type="checkbox" className="form-checkbox" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Budget Alerts</span>
                        <p className="text-xs text-gray-500">Alert when exceeding budget limits</p>
                      </div>
                      <input type="checkbox" className="form-checkbox" defaultChecked />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Integrations
                  </h3>
                  <p className="text-sm text-gray-500">
                    Connect with external services and tools
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-900">Weather Service</h4>
                    <p className="text-sm text-gray-500">Get local weather updates and forecasts</p>
                  </div>
                  <Button variant="outline" className="bg-white">
                    Connect
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-900">Accounting Software</h4>
                    <p className="text-sm text-gray-500">Sync financial data with your accounting system</p>
                  </div>
                  <Button variant="outline" className="bg-white">
                    Connect
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-900">SMS Gateway</h4>
                    <p className="text-sm text-gray-500">Send SMS notifications to team members</p>
                  </div>
                  <Button variant="outline" className="bg-white">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Data Management
                  </h3>
                  <p className="text-sm text-gray-500">
                    Export and import farm data
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Export Data</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full bg-white">
                      Export Livestock Data
                    </Button>
                    <Button variant="outline" className="w-full bg-white">
                      Export Financial Records
                    </Button>
                    <Button variant="outline" className="w-full bg-white">
                      Export Inventory Data
                    </Button>
                    <Button variant="outline" className="w-full bg-white">
                      Export Complete Backup
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Import Data</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Database className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Drag and drop files here or click to select
                      </p>
                      <Button variant="outline" className="mt-4 bg-white">
                        Select Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <AuditLog
            data={auditLogData}
            onFilter={handleAuditLogFilter}
            onExport={handleAuditLogExport}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
} 