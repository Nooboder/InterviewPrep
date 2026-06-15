/**
 * PWA & SERVICE WORKERS — Production Patterns
 * Big4/MNC Frequency: ⭐⭐⭐ (Asked for senior roles, digital transformation projects)
 *
 * Topics: Web App Manifest, Service Worker lifecycle, caching strategies,
 *         Workbox, offline-first, background sync, push notifications
 */

// ============================================================
// Q1: What is a PWA? What makes a web app installable?
// ============================================================
/*
PWA (Progressive Web App): Web app that can be installed on device and work offline.
Three pillars: HTTPS + Service Worker + Web App Manifest

INSTALLABILITY CRITERIA (Chrome/Edge):
  1. Served over HTTPS
  2. Has a Web App Manifest with name, icons (192px + 512px), and start_url
  3. Has a registered Service Worker with a fetch handler
  4. Not already installed

WHY Big4 cares:
  - Client-facing apps need offline capability for field workers
  - Digital transformation projects replace native apps with PWAs
  - Better performance (cached resources = faster loads)
*/

// ============================================================
// Q2: Web App Manifest
// ============================================================
// public/manifest.json
const manifest = {
  "name": "My Awesome App",
  "short_name": "AwesomeApp",       // used on home screen
  "description": "The best app ever",
  "start_url": "/",
  "scope": "/",                     // which URLs are "in-app"
  "display": "standalone",          // fullscreen | standalone | minimal-ui | browser
  "orientation": "portrait",
  "theme_color": "#2563EB",         // browser chrome color
  "background_color": "#FFFFFF",    // splash screen background
  "icons": [
    { "src": "/icons/icon-72.png",  "sizes": "72x72",   "type": "image/png" },
    { "src": "/icons/icon-96.png",  "sizes": "96x96",   "type": "image/png" },
    { "src": "/icons/icon-128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/icons/icon-144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "screenshots": [
    { "src": "/screenshots/home.png", "sizes": "1280x720", "type": "image/png" }
  ],
  "shortcuts": [
    {
      "name": "New Order",
      "url": "/orders/new",
      "icons": [{ "src": "/icons/shortcut-order.png", "sizes": "96x96" }]
    }
  ]
};

// In HTML
// <link rel="manifest" href="/manifest.json">
// <meta name="theme-color" content="#2563EB">
// <meta name="apple-mobile-web-app-capable" content="yes">  ← iOS

// ============================================================
// Q3: Service Worker Lifecycle
// ============================================================
/*
Service Worker (SW) lifecycle:
  1. REGISTER: browser downloads and parses SW file
  2. INSTALL: SW installs, install event fires → great time to precache
  3. WAITING: new SW waits for existing SW to finish (all tabs must close)
  4. ACTIVATE: SW activates, activate event fires → clean up old caches
  5. IDLE: SW idles between events (fetch, push, sync)
  6. FETCH: intercepts network requests

SCOPE: SW only controls pages within its scope (determined by file location).
  /sw.js → scope: /          (controls entire origin)
  /app/sw.js → scope: /app/  (only controls /app/*)
*/

// public/sw.js
const CACHE_VERSION = 'v2';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/static/js/main.bundle.js',
  '/static/css/main.css',
  '/icons/icon-192.png',
];

// Install: precache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
    .then(() => self.skipWaiting()) // Activate immediately (skips waiting)
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => caches.delete(name)) // delete old version caches
      );
    })
    .then(() => self.clients.claim()) // Take control of all tabs immediately
  );
});

// ============================================================
// Q4: Caching Strategies (the most asked SW topic)
// ============================================================

// STRATEGY 1: Cache First (Offline First)
// Serve from cache, fall back to network
// USE FOR: static assets (JS, CSS, fonts, images), app shell
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'script' || event.request.destination === 'style') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;

        return fetch(event.request).then((response) => {
          const cloned = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, cloned));
          return response;
        });
      })
    );
  }
});

// STRATEGY 2: Network First (Fresh data preferred)
// Try network, fall back to cache if offline
// USE FOR: API calls, user-specific data
async function networkFirst(request, cacheName = DYNAMIC_CACHE) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    // Network failed — try cache
    const cached = await caches.match(request);
    if (cached) return cached;

    // Both failed — return offline page
    return caches.match('/offline.html');
  }
}

// STRATEGY 3: Stale While Revalidate (Best balance)
// Serve from cache immediately, then update cache from network in background
// USE FOR: frequently updated resources where slightly stale is acceptable
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);

  // Start network fetch regardless (update in background)
  const networkPromise = fetch(request).then((response) => {
    if (response.ok) {
      caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, response.clone()));
    }
    return response;
  });

  // Return cached immediately if available, otherwise wait for network
  return cached ?? networkPromise;
}

// Smart fetch handler combining all strategies
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests (don't cache POST/PUT/DELETE)
  if (event.request.method !== 'GET') return;

  // API calls: Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request, API_CACHE));
    return;
  }

  // Static assets: Cache First
  if (url.pathname.match(/\.(js|css|png|jpg|woff2)$/)) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached ?? fetch(event.request))
    );
    return;
  }

  // HTML pages: Stale While Revalidate
  event.respondWith(staleWhileRevalidate(event.request));
});

// ============================================================
// Q5: Service Worker Registration in React
// ============================================================

// src/registerSW.js
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service workers not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none', // always check for SW updates
    });

    // Check for updates periodically
    setInterval(() => registration.update(), 60 * 60 * 1000); // every hour

    // New SW waiting — prompt user to update
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New version available — show update prompt to user
          showUpdateNotification(registration);
        }
      });
    });

    console.log('SW registered:', registration.scope);
  } catch (err) {
    console.error('SW registration failed:', err);
  }
}

// React hook for "update available" banner
function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const registrationRef = useRef(null);

  useEffect(() => {
    navigator.serviceWorker?.ready.then((registration) => {
      registrationRef.current = registration;

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setUpdateAvailable(true);
          }
        });
      });
    });
  }, []);

  const applyUpdate = useCallback(() => {
    const registration = registrationRef.current;
    const waitingWorker = registration?.waiting;

    if (waitingWorker) {
      // Tell waiting SW to skip waiting and activate
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      // Reload page to use new SW
      window.location.reload();
    }
  }, []);

  return { updateAvailable, applyUpdate };
}

// Update banner component
function UpdateBanner() {
  const { updateAvailable, applyUpdate } = useServiceWorkerUpdate();

  if (!updateAvailable) return null;

  return (
    <div role="alert" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#2563EB', color: 'white', padding: '12px 24px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span>A new version is available!</span>
      <button onClick={applyUpdate}>Update Now</button>
    </div>
  );
}

// ============================================================
// Q6: Background Sync
// ============================================================
/*
Background Sync: defer network requests until connectivity is restored.
User fills a form while offline → SW stores request → sends when back online.
*/

// In your React app — attempt request with Background Sync fallback
async function submitFormWithSync(formData) {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    // Store data in IndexedDB
    await storeInIndexedDB('pending-forms', formData);

    // Register sync (fires when online)
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register('submit-form');
  } else {
    // Fallback: direct submission
    await fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) });
  }
}

// In sw.js
self.addEventListener('sync', (event) => {
  if (event.tag === 'submit-form') {
    event.waitUntil(
      (async () => {
        const pendingForms = await getFromIndexedDB('pending-forms');
        for (const form of pendingForms) {
          await fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' },
          });
          await removeFromIndexedDB('pending-forms', form.id);
        }
      })()
    );
  }
});

// ============================================================
// INTERVIEW QUESTIONS
/*
Q: What is a Service Worker and how is it different from a Web Worker?
A: Service Worker: runs as a network proxy, intercepts fetch requests,
   handles caching, push notifications, background sync. Persistent — survives
   page close. Registered to a scope/origin.
   Web Worker: runs heavy computation off the main thread. Not a proxy.
   Tied to the page lifecycle. Used for CPU-intensive tasks.

Q: What are the three main service worker caching strategies?
A: Cache First: serve from cache, fallback to network. Good for static assets.
   Network First: try network, fallback to cache. Good for APIs needing fresh data.
   Stale While Revalidate: serve cache immediately, update in background.
   Good for content where slightly stale is acceptable.

Q: Why does a new Service Worker wait before activating?
A: To prevent mismatches — if multiple tabs are open, the new SW would control
   some tabs while the old one controls others, potentially causing cache
   inconsistencies. All controlled pages must be closed first.
   Override with self.skipWaiting() in install + self.clients.claim() in activate.

Q: What is the "update available" notification pattern?
A: When a new SW is found, it goes to "waiting" state.
   Detect this with registration.installing + 'statechange' listener.
   Show user a "Update available" prompt. On confirm, send SKIP_WAITING message
   to the waiting SW, then reload the page to use the new SW.

Q: How do you handle offline form submissions?
A: Use Background Sync API. Store the form data in IndexedDB.
   Register a sync tag with registration.sync.register('sync-tag').
   In the SW, listen for the sync event — it fires when connectivity is restored.
   Retry the submission and clear from IndexedDB on success.
*/
