/**
 * HTTP NETWORKING — HTTP/2, HTTP/3, WebSockets, SSE, Caching Headers
 * Big4/MNC Frequency: ⭐⭐⭐⭐ (Senior frontend — "how do browsers communicate?" rounds)
 *
 * Topics: HTTP/1.1 vs HTTP/2 vs HTTP/3, WebSocket API, Server-Sent Events,
 *         Cache-Control, ETag, Vary header, connection optimization
 */

// ============================================================
// Q1: HTTP/1.1 vs HTTP/2 vs HTTP/3
// ============================================================
/*
HTTP/1.1 (1997):
  - One request per TCP connection at a time
  - HOL blocking: request B waits for request A to complete
  - Workarounds: connection pooling (max 6 per domain), domain sharding, bundling
  - Text-based protocol (human readable)
  - Header repetition: same headers sent with every request

HTTP/2 (2015):
  - MULTIPLEXING: multiple requests over ONE TCP connection simultaneously
  - No more HOL blocking at application layer
  - BINARY framing: more efficient to parse than text
  - HEADER COMPRESSION (HPACK): duplicate headers sent as references, not full text
  - SERVER PUSH: server sends resources before client asks (largely deprecated in practice)
  - Stream priority: hint which responses are more important
  - Result: most apps no longer need domain sharding or JS bundling for performance reasons

HTTP/3 (2022):
  - Built on QUIC (UDP-based) instead of TCP
  - Solves TCP HOL blocking (packet loss on one stream doesn't block others)
  - 0-RTT connection resumption (faster reconnects)
  - Built-in TLS 1.3 (QUIC includes security — can't use HTTP/3 without TLS)
  - Better performance on unreliable networks (mobile, lossy connections)

PRACTICAL IMPLICATIONS FOR FRONTEND:
  HTTP/1.1:  bundle JS aggressively, use sprites, domain shard
  HTTP/2:    smaller modules OK, tree-shaking more important, no domain sharding
  HTTP/3:    check with navigator.connection for adaptive loading strategies
*/

// Check HTTP version in browser
async function checkHttpVersion(url) {
  const response = await fetch(url);
  // ALT-SVC header in response indicates HTTP/3 support
  console.log(response.headers.get('alt-svc'));
  // "h3=":443"; ma=2592000"  ← supports HTTP/3 on port 443

  // Can't directly read protocol from Fetch API — use PerformanceResourceTiming
  const entries = performance.getEntriesByType('resource');
  const entry = entries.find(e => e.name === url);
  console.log(entry?.nextHopProtocol); // "h2", "h3", "http/1.1"
}

// ============================================================
// Q2: HTTP Caching Headers — must know for senior interviews
// ============================================================
/*
Cache-Control:  most important header for caching behavior
ETag:           version identifier for conditional requests
Last-Modified:  timestamp-based version for conditional requests
Vary:           which request headers affect cache key

CACHE-CONTROL DIRECTIVES:

max-age=N:        browser caches for N seconds from request time
s-maxage=N:       CDN/proxy caches for N seconds (overrides max-age for shared caches)
no-cache:         MUST revalidate with server before using cached response (not "no caching")
no-store:         never cache — always fetch from server (for sensitive data)
private:          browser can cache, but CDN/proxies must NOT (for user-specific data)
public:           CDNs may cache (safe for shared resources)
must-revalidate:  if cached response is stale, must revalidate before using
immutable:        resource will NEVER change — browser skips revalidation (use with hashed filenames)
stale-while-revalidate=N: serve stale response while fetching fresh in background

COMMON PATTERNS:

HTML files: Cache-Control: no-cache
  (always check if file changed, but use cached if 304 Not Modified)

JS/CSS with content hash (main.a1b2c3.js): Cache-Control: max-age=31536000, immutable
  (cache for 1 year, never revalidate — filename changes when content changes)

API responses (public data): Cache-Control: public, max-age=300, s-maxage=60
  (browser 5 min, CDN 1 min)

User-specific API: Cache-Control: private, no-cache
  (browser can cache but must revalidate, CDN must not cache)

Sensitive data (banking, medical): Cache-Control: no-store
  (never save to cache)
*/

// ============================================================
// Q3: ETag and Conditional Requests
// ============================================================
/*
ETag: opaque identifier representing resource version (hash or version number)

FLOW:
1. Client requests /api/users/1
2. Server responds: 200 OK + ETag: "abc123" + body

3. Client requests /api/users/1 again
   → sends: If-None-Match: "abc123"
4a. Resource unchanged → server responds: 304 Not Modified (no body!)
   → browser uses cached body — saves bandwidth
4b. Resource changed → server responds: 200 OK + ETag: "def456" + new body

Last-Modified works the same but with dates:
  Server sends: Last-Modified: Wed, 15 Jan 2025 10:00:00 GMT
  Client sends: If-Modified-Since: Wed, 15 Jan 2025 10:00:00 GMT

ETag vs Last-Modified:
  ETag is more reliable (timestamps can be inaccurate, sub-second changes missed)
  Last-Modified is simpler (no hash computation)
  Use both when possible
*/

// Implementing ETag-like caching in frontend
const responseCache = new Map();

async function fetchWithCache(url) {
  const cached = responseCache.get(url);
  const headers = {};

  if (cached?.etag) {
    headers['If-None-Match'] = cached.etag;
  }

  const response = await fetch(url, { headers });

  if (response.status === 304) {
    // Not modified — return cached data
    return cached.data;
  }

  const data = await response.json();
  const etag = response.headers.get('etag');

  responseCache.set(url, { data, etag });
  return data;
}

// ============================================================
// Q4: Vary Header
// ============================================================
/*
Vary: tells CDNs/proxies which REQUEST headers are part of the cache key.
If the Vary header includes "Accept-Encoding", the CDN stores separate cached
versions for each encoding (gzip, br, identity).

COMMON USE CASES:
  Vary: Accept-Encoding    ← different cached versions for gzip/brotli/identity
  Vary: Accept-Language    ← different cached versions per language
  Vary: Authorization      ← DANGEROUS! Each token gets its own cache entry → cache explodes
  Vary: Origin             ← CORS: different response per origin

AVOID: Vary: * (cache nothing from CDN)
AVOID: Vary: Authorization (use private + no-cache for auth'd responses instead)
*/

// ============================================================
// Q5: Server-Sent Events (SSE) — EventSource API
// ============================================================
/*
SSE: Server sends a stream of events to the browser over a single HTTP connection.
     Client CANNOT send data back (unlike WebSockets).
     Automatic reconnection built in.

SSE vs WebSocket vs Long Polling:
  SSE: server→client only, simple HTTP, auto-reconnect, text-only, HTTP/2 multiplexed
  WebSocket: bi-directional, persistent TCP, binary+text, custom protocol
  Long Polling: HTTP request held open until data, no streaming, higher overhead

USE WHEN: notifications, live updates, dashboards, progress indicators
          (any one-way stream from server to client)
*/

// Client-side SSE
function useSSE(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    const eventSource = new EventSource(url, {
      withCredentials: true, // send cookies (authenticated streams)
    });

    eventSource.onopen = () => setStatus('connected');

    // Default 'message' event
    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    // Custom named events
    eventSource.addEventListener('notification', (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev]);
    });

    eventSource.addEventListener('order-update', (event) => {
      const update = JSON.parse(event.data);
      updateOrder(update);
    });

    eventSource.onerror = (err) => {
      setStatus('error');
      setError(err);
      // EventSource auto-reconnects after delay — no need to manually reconnect
    };

    return () => {
      eventSource.close();
      setStatus('closed');
    };
  }, [url]);

  return { data, error, status };
}

// ============================================================
// Q6: WebSocket API (raw)
// ============================================================
/*
WebSocket: persistent, full-duplex (bidirectional) connection over a single TCP connection.
  Protocol: ws:// (insecure) or wss:// (secure — always use wss://)
  Handshake: starts as HTTP, then upgrades to WebSocket protocol
  Binary support: can send ArrayBuffer/Blob (not just text)

USE WHEN: real-time chat, multiplayer games, collaborative editing, trading platforms
*/

function useWebSocket(url) {
  const ws = useRef(null);
  const [status, setStatus] = useState('disconnected');
  const [messages, setMessages] = useState([]);

  const connect = useCallback(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setStatus('connected');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.current.onclose = (event) => {
      setStatus('disconnected');
      // Reconnect logic
      if (event.code !== 1000) { // 1000 = normal closure
        setTimeout(connect, 3000); // retry after 3s
      }
    };

    ws.current.onerror = () => {
      setStatus('error');
    };
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close(1000, 'Component unmounted');
    };
  }, [connect]);

  const send = useCallback((data) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  return { status, messages, send };
}

// WebSocket ready states:
// 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED

// ============================================================
// Q7: Resource Hints — preload, prefetch, preconnect
// ============================================================
/*
Resource hints let you tell the browser about resources it will need.

preload: HIGH PRIORITY — download resource NOW (will be needed in current page)
  Use for: fonts, critical images, above-the-fold CSS, hero images
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/hero.jpg" as="image">

prefetch: LOW PRIORITY — download for NEXT navigation
  Browser downloads in idle time, stores in cache
  <link rel="prefetch" href="/dashboard" as="document">
  <link rel="prefetch" href="/large-module.js" as="script">

preconnect: establish connection (DNS + TCP + TLS) early
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://api.myapp.com" crossorigin>

dns-prefetch: DNS lookup only (lighter than preconnect)
  <link rel="dns-prefetch" href="https://third-party.com">

modulepreload: preload + parse ES module (specific to JS modules)
  <link rel="modulepreload" href="/js/main-module.js">
*/

// Dynamic prefetch when user hovers (predict next navigation)
function PrefetchLink({ href, children }) {
  const prefetchRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    if (prefetchRef.current) return;
    prefetchRef.current = true;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    document.head.appendChild(link);
  }, [href]);

  return (
    <a href={href} onMouseEnter={handleMouseEnter}>
      {children}
    </a>
  );
}

// ============================================================
// INTERVIEW QUESTIONS
/*
Q: What is the main advantage of HTTP/2 over HTTP/1.1?
A: Multiplexing — multiple requests/responses share one TCP connection simultaneously.
   HTTP/1.1 could only handle one request per connection (or 6 per domain with pooling).
   HTTP/2 also adds binary framing, header compression (HPACK), and stream priority.

Q: What does Cache-Control: no-cache actually mean?
A: It does NOT mean "don't cache." It means "always revalidate before using cache."
   The browser stores the response but sends a conditional request (If-None-Match)
   to check if it's still fresh. Server returns 304 Not Modified if unchanged.
   To truly prevent caching: use Cache-Control: no-store.

Q: When would you use SSE vs WebSocket?
A: SSE: one-way server→client, simpler setup, works over standard HTTP/2,
   auto-reconnects. Good for: notifications, live feeds, progress bars.
   WebSocket: bidirectional, needed when client also sends data. Good for: chat,
   multiplayer games, collaborative editing, live trading.

Q: What is the Vary header?
A: Tells CDNs which request headers should be part of the cache key.
   Vary: Accept-Encoding means CDNs cache separate versions for gzip/brotli.
   Critical for CORS: Vary: Origin ensures CDNs don't serve one origin's response to another.

Q: What is ETag and what problem does it solve?
A: ETag is a version identifier for a resource. Enables conditional requests —
   client sends If-None-Match: <etag>, server returns 304 Not Modified if unchanged.
   Saves bandwidth (no body in 304 response) and enables cache validation.
*/
