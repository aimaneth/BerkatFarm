'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

interface SyncManager {
  register(tag: string): Promise<void>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful');
            
            // Set up background sync
            if ('sync' in registration && 'SyncManager' in window) {
              (registration as ServiceWorkerRegistration & { sync: SyncManager })
                .sync.register('sync-livestock-data')
                .catch((error: Error) => console.log('Background sync registration failed:', error));
            }
          })
          .catch((error: Error) => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }

    // Update last sync time
    const updateLastSync = () => {
      localStorage.setItem('lastSync', new Date().toISOString());
    };

    // Update last sync time when app loads and when it regains focus
    updateLastSync();
    window.addEventListener('focus', updateLastSync);

    return () => {
      window.removeEventListener('focus', updateLastSync);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Berkat Farm" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
} 