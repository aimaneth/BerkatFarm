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

// Helper function to check if an error is extension-related
function isExtensionError(error: any): boolean {
  if (!error) return false;
  
  try {
    const errorString = JSON.stringify(error).toLowerCase();
    return (
      errorString.includes('chrome-extension') ||
      errorString.includes('extension') ||
      errorString.includes('ethereum') ||
      errorString.includes('solana') ||
      errorString.includes('mutation') ||
      errorString.includes('proxy') ||
      error?.message?.includes('observe') ||
      error?.message?.includes('MutationObserver')
    );
  } catch {
    return false;
  }
}

// Helper function to check if a request is for Next.js source maps
function isNextJsSourceMap(url: string): boolean {
  return url.includes('__nextjs_original-stack-frame') || 
         url.includes('webpack-internal:') ||
         url.includes('webpack://');
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Patch fetch to ignore Next.js source map requests for extension scripts
    const originalFetch = window.fetch;
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
      if (typeof input === 'string' && isNextJsSourceMap(input)) {
        // Return empty response for source map requests
        return Promise.resolve(new Response('{}', {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      return originalFetch.apply(this, [input, init]);
    };

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
                .catch((error: Error) => {
                  if (!isExtensionError(error)) {
                    console.log('Background sync registration failed:', error);
                  }
                });
            }
          })
          .catch((error: Error) => {
            if (!isExtensionError(error)) {
              console.log('ServiceWorker registration failed:', error);
            }
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

    // Handle errors
    const handleError = (event: ErrorEvent) => {
      if (isExtensionError(event.error) || isExtensionError(event)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    };

    // Handle unhandled rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (isExtensionError(event.reason)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    };

    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);

    return () => {
      window.removeEventListener('focus', updateLastSync);
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Berkat Farm" />
        <link rel="apple-touch-icon" href="/images/logo-192.png" />
        <meta name="color-scheme" content="light dark" />
        <meta name="forced-colors" content="none" />
        <meta httpEquiv="Content-Security-Policy" content={`
          default-src 'self';
          img-src 'self' data: blob: https:;
          connect-src 'self' ws: wss: *.mapbox.com api.mapbox.com events.mapbox.com localhost:* 127.0.0.1:*;
          script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:;
          style-src 'self' 'unsafe-inline';
          worker-src 'self' blob:;
          child-src 'self' blob:;
          frame-src 'self' blob:;
          font-src 'self' data:;
          media-src 'self' data: blob:;
        `.replace(/\s+/g, ' ').trim()} />
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