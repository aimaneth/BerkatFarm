const CACHE_NAME = 'berkat-farm-cache-v1';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/offline.html',
  '/dashboard',
  '/dashboard/livestock',
  '/dashboard/orders',
  '/dashboard/inventory',
  '/dashboard/analytics',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If the request fails, return the offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
          });
      })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle sync events for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-livestock-data') {
    event.waitUntil(syncLivestockData());
  }
});

// Function to sync livestock data
async function syncLivestockData() {
  try {
    const db = await openDB();
    const offlineData = await db.getAll('offlineStore');
    
    if (offlineData.length === 0) return;

    // Attempt to sync each piece of offline data
    const syncPromises = offlineData.map(async (data) => {
      try {
        const response = await fetch('/api/livestock/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // Remove synced data from IndexedDB
          await db.delete('offlineStore', data.id);
        }
      } catch (error) {
        console.error('Sync failed for item:', data.id, error);
      }
    });

    await Promise.all(syncPromises);
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Helper function to open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BerkatFarmDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('offlineStore')) {
        db.createObjectStore('offlineStore', { keyPath: 'id' });
      }
    };
  });
} 