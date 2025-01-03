'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import {
  QrCode,
  Smartphone,
  Mail,
  Key,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { showNotification } from '@/lib/notifications';

interface TwoFactorAuthProps {
  onEnable: () => Promise<{ qrCode: string; secret: string }>;
  onVerify: (code: string) => Promise<boolean>;
  onDisable: () => Promise<boolean>;
}

export function TwoFactorAuth({
  onEnable,
  onVerify,
  onDisable,
}: TwoFactorAuthProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const handleEnable = async () => {
    try {
      setIsEnabling(true);
      const { qrCode, secret } = await onEnable();
      setQrCode(qrCode);
      // Generate backup codes
      const codes = Array.from({ length: 8 }, () =>
        Math.random().toString(36).substr(2, 8).toUpperCase()
      );
      setBackupCodes(codes);
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to enable 2FA. Please try again.",
        type: "error"
      });
    } finally {
      setIsEnabling(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      showNotification({
        title: "Error",
        message: "Please enter the verification code.",
        type: "error"
      });
      return;
    }

    try {
      setIsVerifying(true);
      const success = await onVerify(verificationCode);
      if (success) {
        setIsEnabled(true);
        setQrCode(null);
        showNotification({
          title: "Success",
          message: "Two-factor authentication has been enabled.",
          type: "success"
        });
      } else {
        showNotification({
          title: "Error",
          message: "Invalid verification code. Please try again.",
          type: "error"
        });
      }
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to verify code. Please try again.",
        type: "error"
      });
    } finally {
      setIsVerifying(false);
      setVerificationCode('');
    }
  };

  const handleDisable = async () => {
    try {
      const success = await onDisable();
      if (success) {
        setIsEnabled(false);
        setBackupCodes([]);
        showNotification({
          title: "Success",
          message: "Two-factor authentication has been disabled.",
          type: "success"
        });
      }
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to disable 2FA. Please try again.",
        type: "error"
      });
    }
  };

  return (
    <Card className="p-6 bg-white">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-emerald-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          {isEnabled ? (
            <Button
              variant="outline"
              onClick={handleDisable}
              className="bg-white"
            >
              Disable 2FA
            </Button>
          ) : (
            <Button
              onClick={handleEnable}
              disabled={isEnabling}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isEnabling ? 'Enabling...' : 'Enable 2FA'}
            </Button>
          )}
        </div>

        {qrCode && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <QrCode className="h-5 w-5 text-gray-400" />
                <h4 className="text-sm font-medium text-gray-900">
                  Scan QR Code
                </h4>
              </div>
              <div className="flex justify-center">
                <img
                  src={qrCode}
                  alt="2FA QR Code"
                  className="w-48 h-48"
                />
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Scan this QR code with your authenticator app
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Enter Verification Code
              </label>
              <div className="flex gap-3">
                <Input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="bg-white"
                  maxLength={6}
                />
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying || !verificationCode}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
            </div>

            {backupCodes.length > 0 && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <h4 className="text-sm font-medium text-yellow-800">
                    Backup Codes
                  </h4>
                </div>
                <p className="text-sm text-yellow-700 mb-4">
                  Save these backup codes in a secure place. You can use them to
                  access your account if you lose your authenticator device.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="p-2 bg-white rounded border border-yellow-200 text-sm font-mono text-center"
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isEnabled && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg text-emerald-700">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">
                Two-factor authentication is enabled
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Smartphone className="h-5 w-5 text-gray-400" />
                  <h4 className="text-sm font-medium text-gray-900">
                    Authenticator App
                  </h4>
                </div>
                <p className="text-sm text-gray-500">
                  Use your authenticator app to generate verification codes
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Key className="h-5 w-5 text-gray-400" />
                  <h4 className="text-sm font-medium text-gray-900">
                    Backup Codes
                  </h4>
                </div>
                <p className="text-sm text-gray-500">
                  Use backup codes when you can't access your authenticator app
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Recovery Options
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <h5 className="text-sm font-medium text-gray-900">
                    Recovery Email
                  </h5>
                  <p className="text-xs text-gray-500">
                    j***@example.com
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-white"
              >
                Update Email
              </Button>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Smartphone className="h-5 w-5 text-gray-400" />
                <div>
                  <h5 className="text-sm font-medium text-gray-900">
                    Recovery Phone
                  </h5>
                  <p className="text-xs text-gray-500">
                    +1 ••• ••• 1234
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-white"
              >
                Update Phone
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 