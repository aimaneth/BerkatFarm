'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Smartphone,
  WifiOff,
  Database,
  RotateCcw,
  Camera,
  Share2,
  QrCode,
} from 'lucide-react';
import { showNotification } from '@/lib/notifications';

export function MobileFeatures() {
  const [isOnline, setIsOnline] = useState(true);
  const [hasPendingSync, setHasPendingSync] = useState(false);

  useEffect(() => {
    // Set up online/offline listeners
    const handleOnline = () => {
      setIsOnline(true);
      showNotification({
        title: "Back Online",
        message: "Your connection has been restored. Data will sync automatically.",
        type: "success"
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      showNotification({
        title: "Offline Mode",
        message: "You're now working offline. Changes will sync when connection is restored.",
        type: "warning"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial state
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    try {
      // Sync logic would go here
      showNotification({
        title: "Sync Complete",
        message: "Your data has been synchronized successfully.",
        type: "success"
      });
      setHasPendingSync(false);
    } catch (error) {
      showNotification({
        title: "Sync Failed",
        message: "Failed to synchronize data. Please try again.",
        type: "error"
      });
    }
  };

  const handleScanQR = () => {
    // QR scanning logic would go here
    showNotification({
      title: "QR Scanner",
      message: "QR scanning feature coming soon!",
      type: "info"
    });
  };

  const handleTakePhoto = () => {
    // Photo capture logic would go here
    showNotification({
      title: "Camera",
      message: "Photo capture feature coming soon!",
      type: "info"
    });
  };

  const handleShare = () => {
    // Sharing logic would go here
    showNotification({
      title: "Share",
      message: "Sharing feature coming soon!",
      type: "info"
    });
  };

  return (
    <Card className="p-4 bg-white space-y-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Smartphone className="w-5 h-5 text-emerald-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-yellow-500" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">
              {isOnline ? 'Online Mode' : 'Offline Mode'}
            </p>
            <p className="text-xs text-gray-500">
              {isOnline 
                ? 'All changes sync automatically' 
                : 'Changes will sync when connection is restored'}
            </p>
          </div>
        </div>
        {hasPendingSync && isOnline && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSync}
            className="bg-white"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Sync Now
          </Button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="flex flex-col items-center gap-1 h-auto py-3 bg-white"
          onClick={handleScanQR}
        >
          <QrCode className="w-5 h-5" />
          <span className="text-xs">Scan QR</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center gap-1 h-auto py-3 bg-white"
          onClick={handleTakePhoto}
        >
          <Camera className="w-5 h-5" />
          <span className="text-xs">Take Photo</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center gap-1 h-auto py-3 bg-white"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
          <span className="text-xs">Share</span>
        </Button>
      </div>

      {/* Offline Data */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5 text-gray-400" />
          <p className="text-sm font-medium text-gray-900">Offline Data</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Livestock Records</span>
            <span className="text-gray-900">Last synced: 5 mins ago</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Health Records</span>
            <span className="text-gray-900">Last synced: 10 mins ago</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Feed Data</span>
            <span className="text-gray-900">Last synced: 15 mins ago</span>
          </div>
        </div>
      </div>
    </Card>
  );
} 