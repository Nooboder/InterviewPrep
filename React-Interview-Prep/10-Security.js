// ============================================================
// SECURITY IN REACT - COMPLETE INTERVIEW GUIDE
// ============================================================
// Topics: XSS, CSRF, CORS, Token Storage, CSP, Auth, Secrets
// Interview Level: Mid to Senior
// ============================================================

/**
 * WHY SECURITY MATTERS IN INTERVIEWS
 * - Big 4 & enterprise companies handle sensitive data
 * - Security vulnerabilities = liability, regulatory fines
 * - Senior roles are expected to own security decisions
 */

// ============================================================
// 1. CROSS-SITE SCRIPTING (XSS) IN REACT
// ============================================================

/**
 * Q: How does React protect against XSS, and when does it NOT?
 *
 * A: React auto-escapes JSX expressions — {userInput} is safe by default.
 * React converts HTML entities, so <script> becomes literal text.
 *
 * Bypass vectors (where you CAN introduce XSS in React):
 * 1. dangerouslySetInnerHTML
 * 2. href/src with javascript: URLs
 * 3. Server-side rendering without proper escaping
 * 4. eval() or Function() with user data
 */

// ✅ SAFE: React escapes this automatically
function SafeDisplay({ userInput }) {
  return <div>{userInput}</div>;
  // If userInput = "<script>alert('xss')</script>"
  // Output: literal text, not executed
}

// ❌ DANGEROUS: dangerouslySetInnerHTML with raw user content
function DangerousComponent({ userContent }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: userContent }} /> // 🚨 XSS risk!
  );
}

// ✅ SAFE: Sanitize before using dangerouslySetInnerHTML
import DOMPurify from 'dompurify';

function SafeRichContent({ htmlContent }) {
  const sanitized = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

// ❌ DANGEROUS: javascript: URL in href
function BadLink({ url }) {
  return <a href={url}>Click</a>; // if url = "javascript:alert('xss')"
}

// ✅ SAFE: Validate URL protocol
function SafeLink({ url, children }) {
  const isValidUrl = (str) => {
    try {
      const parsed = new URL(str);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  if (!isValidUrl(url)) {
    return <span>{children}</span>;
  }

  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

// ============================================================
// 2. CONTENT SECURITY POLICY (CSP)
// ============================================================

/**
 * Q: What is CSP and how does it help React apps?
 *
 * A: CSP is an HTTP header that tells the browser which sources of
 * scripts, styles, images are allowed to execute/load.
 * It's a second layer of XSS defense even if code injection occurs.
 *
 * Set via HTTP header or <meta> tag.
 */

// Example CSP header for a React app (set server-side):
// Content-Security-Policy:
//   default-src 'self';
//   script-src 'self' 'nonce-{random}';   ← nonces for inline scripts
//   style-src 'self' 'unsafe-inline';      ← needed for CSS-in-JS
//   img-src 'self' data: https:;
//   connect-src 'self' https://api.example.com;
//   font-src 'self' https://fonts.googleapis.com;
//   frame-ancestors 'none';                ← prevents clickjacking
//   form-action 'self';

// In Next.js (next.config.js):
const nextConfig = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{
        key: 'Content-Security-Policy',
        value: `
          default-src 'self';
          script-src 'self' 'nonce-RANDOM_NONCE';
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: https:;
          connect-src 'self' https://api.example.com;
          frame-ancestors 'none';
        `.replace(/\s+/g, ' ').trim()
      }]
    }];
  }
};

// ============================================================
// 3. AUTHENTICATION TOKEN STORAGE
// ============================================================

/**
 * Q: Where should you store JWT tokens in a React app — localStorage, sessionStorage, or cookies?
 *
 * A: This is a nuanced question. The answer is httpOnly cookies.
 *
 * localStorage:
 * - Persists across sessions
 * - ❌ Accessible via JS — XSS can steal tokens
 * - ❌ NOT recommended for sensitive auth tokens
 *
 * sessionStorage:
 * - Cleared when tab closes
 * - ❌ Still accessible via JS — XSS risk
 * - ❌ NOT recommended for auth tokens
 *
 * httpOnly Cookies:
 * - ✅ NOT accessible via JS (XSS can't steal them)
 * - ✅ Automatically sent with requests
 * - ✅ Recommended for auth tokens
 * - ⚠️ Requires CSRF protection (see below)
 * - Set via: Set-Cookie: token=xxx; HttpOnly; Secure; SameSite=Strict; Path=/
 *
 * In-Memory (React state):
 * - ✅ XSS can't persist it across page loads
 * - ✅ Good for short-lived access tokens
 * - Pair with refresh token in httpOnly cookie
 */

// Recommended pattern: access token in memory + refresh token in httpOnly cookie
class AuthService {
  #accessToken = null; // Private class field — in-memory only

  setAccessToken(token) { this.#accessToken = token; }
  getAccessToken() { return this.#accessToken; }
  clearAccessToken() { this.#accessToken = null; }

  // Refresh token is stored in httpOnly cookie by the server
  // This function calls the server to get a new access token using the cookie
  async refreshAccessToken() {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include', // sends httpOnly cookie
    });
    const { accessToken } = await res.json();
    this.setAccessToken(accessToken);
    return accessToken;
  }
}

// Axios interceptor: auto-refresh on 401
import axios from 'axios';

const api = axios.create({ baseURL: '/api', withCredentials: true });

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const newToken = await authService.refreshAccessToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return api(error.config);
    }
    return Promise.reject(error);
  }
);

// ============================================================
// 4. CSRF PROTECTION
// ============================================================

/**
 * Q: What is CSRF and how do you prevent it in React apps?
 *
 * A: CSRF (Cross-Site Request Forgery) tricks a user's browser into
 * making authenticated requests to your server from a malicious site.
 * It exploits the fact that cookies are sent automatically.
 *
 * Prevention strategies:
 * 1. SameSite cookie attribute (SameSite=Strict or Lax)
 * 2. CSRF tokens (double-submit cookie or synchronizer token)
 * 3. Verify Origin/Referer header server-side
 * 4. Use Authorization header (Bearer tokens) instead of cookies
 *    (XHR/fetch requests don't auto-send non-cookie headers)
 */

// CSRF token pattern (read from cookie, send in header):
function getCsrfToken() {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
}

// Attach CSRF token to all mutating requests
const csrfApi = axios.create({ baseURL: '/api' });

csrfApi.interceptors.request.use(config => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    config.headers['X-CSRF-Token'] = getCsrfToken();
  }
  return config;
});

// ============================================================
// 5. CORS (CROSS-ORIGIN RESOURCE SHARING)
// ============================================================

/**
 * Q: How does CORS work in the context of React apps?
 *
 * A: CORS is a browser security mechanism that restricts cross-origin
 * requests. React (frontend) hitting a different-origin API will trigger
 * CORS checks. CORS is enforced by the browser — it's a server-configured policy.
 *
 * React dev proxy (avoid CORS in development):
 * In package.json: "proxy": "http://localhost:5000"
 * Or in vite.config: server.proxy
 *
 * Production: configure CORS on the API server.
 * Never use Access-Control-Allow-Origin: * with credentials!
 */

// Vite dev proxy config (vite.config.ts):
const viteConfig = {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};

// Fetch with credentials (triggers CORS preflight for cross-origin):
fetch('https://api.example.com/data', {
  credentials: 'include',   // sends cookies
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

// ============================================================
// 6. ENVIRONMENT VARIABLES & SECRETS
// ============================================================

/**
 * Q: How do you safely handle secrets and environment variables in React?
 *
 * A: CRITICAL: Never put secrets in client-side React code.
 * React bundles are served to the browser — ALL code is visible.
 *
 * Rules:
 * 1. Only expose variables prefixed REACT_APP_ (CRA) or VITE_ (Vite)
 *    — these are intentionally public
 * 2. API keys that should be secret: keep them server-side
 * 3. Never commit .env files with real values — use .env.example
 * 4. Use a secrets manager (AWS Secrets Manager, Vault) for prod
 *
 * What CAN go in REACT_APP_/VITE_ env vars:
 * - API base URLs (not keys)
 * - Feature flags
 * - Public OAuth client IDs (not secrets)
 * - Analytics IDs
 */

// .env.example (commit this)
// VITE_API_URL=https://api.example.com
// VITE_STRIPE_PUBLIC_KEY=pk_test_...

// .env.local (never commit)
// VITE_API_URL=http://localhost:3001

// Usage in code:
const API_URL = import.meta.env.VITE_API_URL;  // Vite
const API_URL_CRA = process.env.REACT_APP_API_URL;  // CRA

// ❌ NEVER do this in React frontend code:
const SECRET_API_KEY = process.env.VITE_MY_SECRET_KEY; // visible to users!

// ✅ DO: Call your own backend, which holds the secret
async function fetchProtectedData() {
  // Your backend makes the call with the secret key
  const res = await fetch('/api/protected-resource');
  return res.json();
}

// ============================================================
// 7. DEPENDENCY SECURITY
// ============================================================

/**
 * Q: How do you manage dependency vulnerabilities in React projects?
 *
 * A:
 * 1. npm audit / yarn audit — check for known vulnerabilities
 * 2. npm audit fix — auto-fix low-risk vulnerabilities
 * 3. Dependabot / Renovate — automated PRs for updates
 * 4. Lock files (package-lock.json/yarn.lock) — ensure deterministic installs
 * 5. Review third-party packages before adding (stars, maintenance, publisher trust)
 * 6. Use npm ls / bundlephobia to audit bundle and dependency chains
 */

// Check for vulnerabilities:
// $ npm audit
// $ npm audit --audit-level=high  (only fail on high/critical)

// GitHub Actions dependency audit:
const auditWorkflow = `
name: Security Audit
on: [push, pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm audit --audit-level=high
`;

// ============================================================
// 8. SECURE AUTHENTICATION PATTERNS
// ============================================================

/**
 * Q: Describe a secure authentication flow for a React SPA.
 *
 * A: OAuth 2.0 PKCE (Proof Key for Code Exchange) is the recommended
 * flow for SPAs — it's secure even without a client secret.
 *
 * Flow:
 * 1. Generate code_verifier (random string) and code_challenge (SHA-256 hash)
 * 2. Redirect to auth provider with code_challenge
 * 3. Receive auth code via redirect
 * 4. Exchange code + code_verifier for tokens at token endpoint
 * 5. Store access token in memory, refresh token in httpOnly cookie
 * 6. On expiry: use refresh token to get new access token silently
 */

// PKCE implementation
async function generatePKCE() {
  const codeVerifier = crypto.randomUUID().replace(/-/g, '') +
    crypto.randomUUID().replace(/-/g, '');

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);

  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return { codeVerifier, codeChallenge };
}

// React auth context with token management
const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null); // In memory

  const login = React.useCallback(async (credentials) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include', // receives httpOnly refresh token cookie
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const { user, accessToken } = await res.json();
    setUser(user);
    setAccessToken(accessToken); // Store in memory only
  }, []);

  const logout = React.useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================
// 9. CLICKJACKING & SECURITY HEADERS
// ============================================================

/**
 * Q: What HTTP security headers should a React app have?
 *
 * A: These are set server-side but the frontend team must know them:
 *
 * X-Frame-Options: DENY
 *   → Prevents your app from being embedded in iframes (clickjacking)
 *   → Replaced by CSP frame-ancestors, but include both for older browsers
 *
 * X-Content-Type-Options: nosniff
 *   → Prevents MIME-type sniffing attacks
 *
 * Strict-Transport-Security: max-age=31536000; includeSubDomains
 *   → Forces HTTPS (HSTS)
 *
 * Referrer-Policy: strict-origin-when-cross-origin
 *   → Controls what's sent in the Referer header
 *
 * Permissions-Policy: camera=(), microphone=(), geolocation=()
 *   → Disables browser features you don't use
 */

// ============================================================
// 10. INPUT VALIDATION & SANITIZATION
// ============================================================

/**
 * Q: How do you handle input validation security in React?
 *
 * A:
 * - Client-side validation = UX improvement only (users can bypass it)
 * - Server-side validation = security requirement
 * - Sanitize inputs before displaying, not just on submit
 * - Use Zod/Yup for schema validation (type safety + runtime validation)
 */

import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email').max(255),
  password: z.string().min(8, 'Min 8 characters').max(128),
});

function validateLogin(data) {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  return { data: result.data };
}

// Prevent SQL injection: always use parameterized queries server-side
// This is a reminder — React doesn't directly hit DBs, but ORM/query usage matters

// ============================================================
// 11. REACT-SPECIFIC SECURITY PITFALLS
// ============================================================

/**
 * Q: What are React-specific security vulnerabilities to watch for?
 */

// 1. Server-Side Rendering (SSR) XSS
// ❌ DANGEROUS: Embedding raw JSON in SSR without escaping
function DangerousSSR({ data }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        // If data contains "</script>", it breaks out of the tag
        __html: `window.__INITIAL_DATA__ = ${JSON.stringify(data)}`
      }}
    />
  );
}

// ✅ SAFE: Use JSON.stringify with a sanitizer or serialize-javascript
import serialize from 'serialize-javascript';

function SafeSSR({ data }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__INITIAL_DATA__ = ${serialize(data, { isJSON: true })}`
        // serialize-javascript escapes </script> sequences
      }}
    />
  );
}

// 2. Prototype pollution via props spread
// ❌ DANGEROUS: Spreading untrusted data as props
function DangerousProps({ apiResponse }) {
  return <input {...apiResponse} />; // could inject onSubmit, onChange, etc.
}

// ✅ SAFE: Destructure only what you need
function SafeProps({ apiResponse }) {
  const { id, value, placeholder } = apiResponse;
  return <input id={id} defaultValue={value} placeholder={placeholder} />;
}

// 3. ReDoS (Regular Expression Denial of Service)
// ❌ DANGEROUS: Vulnerable regex with backtracking
// const emailRegex = /^([a-zA-Z0-9]+([-+.']*[a-zA-Z0-9]+)*)@... (complex) /;

// ✅ SAFE: Use Zod/validator.js for email validation
import { z } from 'zod';
const safeEmailCheck = z.string().email();

// ============================================================
// SECURITY CHECKLIST FOR REACT INTERVIEWS
// ============================================================

/**
 * Quick checklist to recite in interviews:
 *
 * ✅ XSS: Avoid dangerouslySetInnerHTML; sanitize with DOMPurify if needed
 * ✅ Token storage: httpOnly cookies for sensitive tokens, memory for access tokens
 * ✅ CSRF: SameSite cookies + CSRF token header for state-changing requests
 * ✅ CORS: Server configures policy; never use wildcard with credentials
 * ✅ Secrets: Never in frontend code; keep server-side
 * ✅ Dependencies: npm audit + Dependabot
 * ✅ CSP header: Restrict script/style sources
 * ✅ HTTPS: HSTS header + redirect all HTTP to HTTPS
 * ✅ Input validation: Client-side for UX, server-side for security
 * ✅ Auth flow: OAuth PKCE for SPAs; avoid implicit flow
 * ✅ URLs: Validate protocol (no javascript:) before using in href/src
 * ✅ Props: Never spread untrusted data as component props
 * ✅ SSR: Escape initial state data; use serialize-javascript
 */
