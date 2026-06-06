// ============================================================
// WEB APIS & BROWSER APIs - FRONTEND DEVELOPER PREP
// ============================================================

/**
 * Critical Web APIs for frontend development
 * Required for: PWC, Deloitte, TCS, Cognizant, Google, Meta
 */

// ============================================================
// 1. FETCH API & HTTP REQUESTS
// ============================================================

// Basic fetch
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Fetch with options
async function fetchWithOptions() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token',
    },
    body: JSON.stringify({ name: 'John' }),
    timeout: 5000,
  };

  const response = await fetch('https://api.example.com/users', options);
  return response.json();
}

// Abort fetch request
function abortFetchExample() {
  const controller = new AbortController();

  // Abort after 5 seconds
  const timeout = setTimeout(() => controller.abort(), 5000);

  fetch('https://api.example.com/data', {
    signal: controller.signal
  })
    .then(r => r.json())
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      }
    })
    .finally(() => clearTimeout(timeout));
}

// ============================================================
// 2. LOCAL STORAGE & SESSION STORAGE
// ============================================================

// LocalStorage (persists across sessions)
function localStorageExample() {
  // Set
  localStorage.setItem('user', JSON.stringify({ name: 'John' }));

  // Get
  const user = JSON.parse(localStorage.getItem('user'));

  // Remove
  localStorage.removeItem('user');

  // Clear all
  localStorage.clear();
}

// SessionStorage (cleared when tab closes)
function sessionStorageExample() {
  sessionStorage.setItem('tempData', 'value');
  const data = sessionStorage.getItem('tempData');
  sessionStorage.removeItem('tempData');
}

// Custom storage wrapper
class StorageManager {
  static set(key, value, useSession = false) {
    const storage = useSession ? sessionStorage : localStorage;
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  }

  static get(key, useSession = false) {
    const storage = useSession ? sessionStorage : localStorage;
    try {
      return JSON.parse(storage.getItem(key));
    } catch (error) {
      return null;
    }
  }

  static remove(key, useSession = false) {
    const storage = useSession ? sessionStorage : localStorage;
    storage.removeItem(key);
  }
}

// ============================================================
// 3. INDEXEDDB (Large data storage)
// ============================================================

function indexedDBExample() {
  const DBOpenRequest = indexedDB.open('myDB', 1);

  DBOpenRequest.onerror = () => console.error('DB error');

  DBOpenRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    const objectStore = db.createObjectStore('users', { keyPath: 'id' });
    objectStore.createIndex('email', 'email', { unique: true });
  };

  DBOpenRequest.onsuccess = (event) => {
    const db = event.target.result;

    // Add data
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    objectStore.add({ id: 1, name: 'John', email: 'john@example.com' });

    // Read data
    const getRequest = objectStore.get(1);
    getRequest.onsuccess = () => {
      console.log('User:', getRequest.result);
    };
  };
}

// ============================================================
// 4. DOM MANIPULATION
// ============================================================

// Query selectors
const element = document.querySelector('.button'); // Single
const elements = document.querySelectorAll('.button'); // Multiple
const byId = document.getElementById('myId');
const byClass = document.getElementsByClassName('myClass');

// Create & modify elements
const div = document.createElement('div');
div.textContent = 'Hello';
div.className = 'container';
div.setAttribute('data-id', '123');
document.body.appendChild(div);

// Event handling
element.addEventListener('click', (event) => {
  console.log('Clicked:', event.target);
});

// Event delegation (handle events on parent)
document.addEventListener('click', (event) => {
  if (event.target.matches('.button')) {
    console.log('Button clicked');
  }
});

// Remove listener
const handler = () => console.log('Clicked');
element.addEventListener('click', handler);
element.removeEventListener('click', handler);

// ============================================================
// 5. GEOLOCATION API
// ============================================================

function getLocationExample() {
  if (!navigator.geolocation) {
    console.error('Geolocation not supported');
    return;
  }

  // Get current position
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    },
    (error) => {
      console.error('Error:', error.message);
    },
    {
      timeout: 5000,
      enableHighAccuracy: true,
    }
  );

  // Watch position
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      console.log('Position updated:', position.coords);
    },
    (error) => console.error('Error:', error.message)
  );

  // Stop watching
  navigator.geolocation.clearWatch(watchId);
}

// ============================================================
// 6. NOTIFICATION API
// ============================================================

function notificationExample() {
  // Request permission
  if (Notification.permission === 'granted') {
    new Notification('Hello!', {
      body: 'This is a notification',
      icon: 'icon.png',
      tag: 'notification-1', // Prevent duplicates
      requireInteraction: false,
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Permission granted!');
      }
    });
  }

  // Notification with actions
  const notification = new Notification('New message', {
    actions: [
      { action: 'reply', title: 'Reply' },
      { action: 'close', title: 'Close' },
    ],
  });

  notification.addEventListener('action', (event) => {
    if (event.action === 'reply') {
      console.log('User replied');
    }
  });
}

// ============================================================
// 7. INTERSECTION OBSERVER API
// ============================================================

function intersectionObserverExample() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is visible
          entry.target.classList.add('visible');
          // Optionally unobserve after loading
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5, // 50% visible
      rootMargin: '10px', // Start observing 10px before visible
    }
  );

  // Observe elements
  document.querySelectorAll('.lazy-image').forEach((el) => {
    observer.observe(el);
  });

  // Stop observing
  // observer.unobserve(element);
  // observer.disconnect();
}

// ============================================================
// 8. MUTATION OBSERVER API
// ============================================================

function mutationObserverExample() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        console.log('Children changed:', mutation.addedNodes);
      } else if (mutation.type === 'attributes') {
        console.log('Attribute changed:', mutation.attributeName);
      } else if (mutation.type === 'characterData') {
        console.log('Text changed');
      }
    });
  });

  observer.observe(document.body, {
    childList: true, // Monitor added/removed nodes
    attributes: true, // Monitor attribute changes
    characterData: true, // Monitor text changes
    subtree: true, // Monitor all descendants
    attributeFilter: ['class', 'id'], // Only watch specific attributes
  });
}

// ============================================================
// 9. WEB WORKERS
// ============================================================

/*
// main.js
function webWorkerExample() {
  const worker = new Worker('worker.js');

  // Send data to worker
  worker.postMessage({ command: 'calculate', data: [1, 2, 3, 4, 5] });

  // Receive result from worker
  worker.onmessage = (event) => {
    console.log('Result from worker:', event.data);
  };

  worker.onerror = (error) => {
    console.error('Worker error:', error.message);
  };
}

// worker.js
self.onmessage = (event) => {
  const { command, data } = event.data;

  if (command === 'calculate') {
    const result = data.reduce((sum, num) => sum + num, 0);
    self.postMessage(result);
  }
};
*/

// ============================================================
// 10. PERFORMANCE API
// ============================================================

function performanceExample() {
  // Mark performance
  performance.mark('operation-start');

  // Do something
  // ... code ...

  performance.mark('operation-end');

  // Measure
  performance.measure('operation', 'operation-start', 'operation-end');

  // Get measurements
  const measures = performance.getEntriesByName('operation');
  console.log('Time taken:', measures[0].duration);

  // Get navigation timing
  const timing = performance.timing;
  const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
  console.log('Page load time:', pageLoadTime);

  // Get Paint timing
  const paintEntries = performance.getEntriesByType('paint');
  paintEntries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.startTime}`);
  });
}

// ============================================================
// 11. SERVICE WORKER
// ============================================================

/*
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('SW registered'))
    .catch((err) => console.error('SW error:', err));
}

// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => new Response('Offline'))
  );
});
*/

// ============================================================
// INTERVIEW QUESTIONS - WEB APIS
// ============================================================

/*
Q1: "What's the difference between localStorage and sessionStorage?"
A: localStorage - persists across sessions, no expiry
   sessionStorage - cleared when tab closes

Q2: "How to handle large data storage?"
A: Use IndexedDB for structured data
   Use localStorage for small key-value pairs
   Use sessionStorage for temporary data

Q3: "Explain fetch API and its advantages"
A: Modern way to make HTTP requests
   Returns promises (easier than XMLHttpRequest)
   Better for async/await

Q4: "How to abort a fetch request?"
A: Use AbortController with signal parameter
   call controller.abort() to cancel

Q5: "What's Intersection Observer?"
A: Detects when elements become visible
   Used for: lazy loading, infinite scroll, ads
   More efficient than scroll event listener

Q6: "Explain Event Delegation"
A: Handle events on parent instead of individual elements
   Reduces event listeners
   Better for dynamically added elements

Q7: "What's a Service Worker?"
A: Background script for offline support
   Intercepts network requests
   Enables push notifications and caching

Q8: "How to optimize web performance?"
A: - Code splitting and lazy loading
   - Minify and compress
   - Cache static assets
   - Use CDN
   - Optimize images
   - Monitor with Performance API
*/

export const WEB_APIS = {
  FETCH: 'HTTP Requests',
  STORAGE: 'Data Storage',
  DOM: 'DOM Manipulation',
  OBSERVER: 'Observers (Intersection, Mutation)',
  NOTIFICATIONS: 'Notifications & Permissions',
  WORKERS: 'Web Workers',
  SERVICE_WORKER: 'Service Workers',
  PERFORMANCE: 'Performance Metrics',
};
