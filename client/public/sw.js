const CACHE_NAME = 'berkat-farm-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/logo-192.png',
  '/images/logo-512.png',
  '/images/livestock.png',
  '/images/orders.png',
  '/images/inventory.png'
];

// Check if a URL should be cached
function shouldCache(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache each asset individually to prevent complete failure if one fails
        return Promise.allSettled(
          STATIC_ASSETS.map(url =>
            fetch(new Request(url, { cache: 'reload' }))
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch ${url}`);
                }
                return cache.put(url, response);
              })
              .catch(error => {
                console.warn(`Failed to cache ${url}:`, error);
              })
          )
        );
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // Early return for non-GET requests or non-HTTP(S) URLs
  if (event.request.method !== 'GET' || !shouldCache(event.request.url)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        // Clone the request because it can only be used once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Only cache same-origin requests
            if (shouldCache(event.request.url) && 
                new URL(event.request.url).origin === location.origin) {
              try {
                // Clone the response because it can only be used once
                const responseToCache = response.clone();
                
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache)
                      .catch(error => {
                        console.warn('Cache put failed:', error);
                      });
                  })
                  .catch(error => {
                    console.warn('Cache open failed:', error);
                  });
              } catch (error) {
                console.warn('Caching failed:', error);
              }
            }

            return response;
          })
          .catch(() => {
            // Return fallback for image requests
            if (event.request.destination === 'image') {
              return caches.match('/images/logo-192.png')
                .catch(error => {
                  console.warn('Fallback image fetch failed:', error);
                });
            }
          });
      })
  );
}); 