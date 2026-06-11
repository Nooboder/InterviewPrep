// ============================================================
// NEXT.JS - COMPLETE INTERVIEW GUIDE
// ============================================================
// Topics: App Router, Pages Router, SSR/SSG/ISR/CSR,
//         Server Components, Server Actions, Caching, Routing,
//         Image/Font optimization, Middleware, Deployment
// Interview Level: Mid to Senior
// ============================================================

/**
 * WHY NEXT.JS IS ESSENTIAL FOR REACT INTERVIEWS
 * - 90%+ of new enterprise React projects use Next.js
 * - Big 4 consulting firms deploy Next.js apps on Vercel/AWS/Azure
 * - Senior React = expected to know Next.js deeply
 */

// ============================================================
// 1. RENDERING STRATEGIES — CORE CONCEPT
// ============================================================

/**
 * Q: Explain SSR, SSG, ISR, and CSR in Next.js. When do you use each?
 *
 * A:
 * CSR (Client-Side Rendering):
 *   - React renders in the browser after blank HTML loads
 *   - Bad for SEO, fast TTFB but slow LCP
 *   - Use for: dashboards, admin panels, auth-gated content
 *
 * SSG (Static Site Generation):
 *   - HTML generated at BUILD TIME
 *   - Fastest delivery (CDN-cacheable), great SEO
 *   - Use for: marketing pages, blogs, docs, product listings
 *   - Limitation: stale until rebuild
 *
 * SSR (Server-Side Rendering):
 *   - HTML generated on server PER REQUEST
 *   - Always fresh data, good SEO
 *   - Use for: personalized pages, dashboards with auth, real-time data
 *   - Cost: slower TTFB, no CDN caching by default
 *
 * ISR (Incremental Static Regeneration):
 *   - Static + background revalidation on a timer
 *   - Best of both: CDN speed + fresh data
 *   - Use for: product pages, news, content that changes periodically
 */

// ============================================================
// 2. PAGES ROUTER (Legacy — Still Common in Enterprises)
// ============================================================

// SSG: getStaticProps + getStaticPaths
export async function getStaticProps(context) {
  const { params } = context;
  const post = await fetchPost(params.slug);

  if (!post) {
    return { notFound: true }; // renders 404 page
  }

  return {
    props: { post },
    revalidate: 60, // ISR: regenerate at most once per 60s
  };
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: 'blocking', // 'blocking' | true | false
    // false: 404 for unknown paths
    // true: show fallback, then load in background
    // 'blocking': SSR for unknown paths, then cache
  };
}

// SSR: getServerSideProps
export async function getServerSideProps(context) {
  const { req, res, params, query, locale } = context;

  // Access cookies, auth headers
  const token = req.cookies.token;
  if (!token) {
    return {
      redirect: { destination: '/login', permanent: false }
    };
  }

  const user = await getUser(token);
  return { props: { user } };
}

// API Routes (Pages Router)
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;
    res.status(201).json({ id: generateId(), name });
    return;
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

// ============================================================
// 3. APP ROUTER (Next.js 13+/14+ — Modern Standard)
// ============================================================

/**
 * Q: What is the App Router and how does it differ from Pages Router?
 *
 * A:
 * App Router (app/):
 *   - Based on React Server Components
 *   - File conventions: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx
 *   - Nested layouts with persistent state across navigations
 *   - Server Components by default (no JS shipped unless "use client")
 *   - Streaming with Suspense built-in
 *   - Route Handlers replace API routes
 *
 * Pages Router (pages/):
 *   - All components are Client Components
 *   - getStaticProps/getServerSideProps for data fetching
 *   - API routes in pages/api/
 *   - Simpler mental model, widely deployed
 */

// App Router file structure:
// app/
//   layout.tsx         ← root layout (wraps all pages)
//   page.tsx           ← homepage
//   loading.tsx        ← Suspense fallback
//   error.tsx          ← error boundary
//   not-found.tsx      ← 404 page
//   dashboard/
//     layout.tsx       ← nested layout (wraps all dashboard pages)
//     page.tsx         ← /dashboard
//     settings/
//       page.tsx       ← /dashboard/settings
//   blog/
//     [slug]/
//       page.tsx       ← /blog/:slug (dynamic segment)
//   (marketing)/       ← route group (no URL segment)
//     about/page.tsx   ← /about
//   [...slug]/page.tsx ← catch-all route

// Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// Nested Layout (persists across child route navigations)
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// ============================================================
// 4. SERVER COMPONENTS DATA FETCHING (App Router)
// ============================================================

/**
 * Q: How do you fetch data in the App Router?
 *
 * A: Server Components can use async/await directly — no useEffect needed.
 * Next.js extends the native fetch() API with caching options.
 */

// Simple async Server Component
async function BlogPost({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`, {
    cache: 'force-cache', // SSG behavior (default — cache indefinitely)
  }).then(r => r.json());

  return <article><h1>{post.title}</h1><p>{post.content}</p></article>;
}

// Data fetching options:
const ssgData = await fetch(url, { cache: 'force-cache' });      // like getStaticProps
const ssrData = await fetch(url, { cache: 'no-store' });          // like getServerSideProps
const isrData = await fetch(url, { next: { revalidate: 60 } });   // like ISR (60s)
const taggedData = await fetch(url, { next: { tags: ['posts'] } }); // on-demand revalidation

// On-demand revalidation (Server Actions / Route Handlers)
import { revalidatePath, revalidateTag } from 'next/cache';

async function publishPost(id) {
  'use server';
  await updatePost(id, { published: true });
  revalidateTag('posts');     // revalidate all fetches tagged 'posts'
  revalidatePath('/blog');    // revalidate /blog page specifically
}

// Parallel data fetching (don't await sequentially)
async function Dashboard() {
  const [user, metrics, notifications] = await Promise.all([
    fetchUser(),
    fetchMetrics(),
    fetchNotifications(),
  ]);

  return (
    <div>
      <UserCard user={user} />
      <MetricsPanel metrics={metrics} />
      <NotificationsList items={notifications} />
    </div>
  );
}

// ============================================================
// 5. LOADING, ERROR, STREAMING (App Router)
// ============================================================

// loading.tsx — automatically wraps page in Suspense
export default function Loading() {
  return <DashboardSkeleton />;
}

// error.tsx — must be a Client Component (handles runtime errors)
'use client';

export default function Error({ error, reset }) {
  React.useEffect(() => {
    console.error(error);
    reportToErrorMonitoring(error);
  }, [error]);

  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// Streaming with granular Suspense boundaries
async function BlogPage({ params }) {
  return (
    <div>
      <BlogHeader />  {/* Instant */}
      <Suspense fallback={<PostSkeleton />}>
        <BlogPost slug={params.slug} />  {/* Streams when ready */}
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments postId={params.slug} />  {/* Streams independently */}
      </Suspense>
    </div>
  );
}

// ============================================================
// 6. ROUTE HANDLERS (App Router API Routes)
// ============================================================

// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  const users = await db.users.findMany({
    skip: (parseInt(page) - 1) * 10,
    take: 10,
  });

  return NextResponse.json({ users, page });
}

export async function POST(request) {
  const body = await request.json();
  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten() },
      { status: 400 }
    );
  }

  const user = await db.users.create({ data: result.data });
  return NextResponse.json(user, { status: 201 });
}

// app/api/users/[id]/route.ts — dynamic route handler
export async function GET(request, { params }) {
  const user = await db.users.findById(params.id);
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(user);
}

// ============================================================
// 7. MIDDLEWARE
// ============================================================

/**
 * Q: What is Next.js Middleware and what can you use it for?
 *
 * A: Middleware runs BEFORE requests are matched to pages/handlers.
 * Use it for: auth checks, redirects, A/B testing, geo-blocking, rate limiting.
 * It runs on the Edge runtime (no Node.js APIs — no fs, no full DB access).
 */

// middleware.ts (project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'value');
  return response;
}

// Limit middleware to specific paths (avoids running on _next/static, images etc.)
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};

// ============================================================
// 8. IMAGE OPTIMIZATION (next/image)
// ============================================================

/**
 * Q: What does next/image do and why should you use it?
 *
 * A:
 * - Automatic WebP/AVIF conversion (smaller file sizes)
 * - Responsive images (srcset generation)
 * - Lazy loading by default (Intersection Observer)
 * - Prevents Cumulative Layout Shift (CLS) via placeholder
 * - Served from Next.js optimization endpoint
 * - Supports blur placeholder for better UX
 */

import Image from 'next/image';

// Fixed size image
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority           // LCP image: preload, don't lazy-load
  quality={85}       // 75 default, range 1-100
/>

// Fill (parent must be position: relative)
<div style={{ position: 'relative', height: '400px' }}>
  <Image
    src="/background.jpg"
    alt="Background"
    fill
    style={{ objectFit: 'cover' }}
    sizes="100vw"
  />
</div>

// Remote images (require config in next.config.js)
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.example.com',
      port: '',
      pathname: '/uploads/**',
    }],
  },
};

// ============================================================
// 9. FONT OPTIMIZATION (next/font)
// ============================================================

/**
 * Q: What problem does next/font solve?
 *
 * A: Eliminates FOUT (Flash of Unstyled Text) and layout shift from fonts.
 * Fonts are downloaded at build time, self-hosted, and preloaded.
 * Zero external network requests for fonts.
 */

import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable for use in Tailwind
  display: 'swap',
});

const mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

// In RootLayout:
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

// ============================================================
// 10. METADATA API (App Router)
// ============================================================

/**
 * Q: How do you manage SEO metadata in the App Router?
 *
 * A: Export a metadata object (static) or generateMetadata function (dynamic).
 */

// Static metadata
export const metadata = {
  title: 'My App',
  description: 'Description of my app',
  openGraph: {
    title: 'My App',
    description: 'OG description',
    images: [{ url: 'https://example.com/og.jpg', width: 1200, height: 630 }],
  },
};

// Dynamic metadata
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [{ url: post.coverImage }],
    },
  };
}

// Title template (avoids repeating site name)
export const metadata = {
  title: {
    template: '%s | My Site',
    default: 'My Site',
  },
};

// ============================================================
// 11. CACHING IN NEXT.JS APP ROUTER
// ============================================================

/**
 * Q: Explain Next.js's 4 caching layers in the App Router.
 *
 * A:
 * 1. Request Memoization:
 *    Same fetch() URL in a render → deduplicated (called once)
 *    Scope: single server request lifecycle
 *
 * 2. Data Cache:
 *    Persistent fetch() results — survives across requests
 *    Controlled by: cache/revalidate options on fetch()
 *
 * 3. Full Route Cache:
 *    Cached rendered HTML of static routes on disk
 *    Invalidated by: revalidatePath, revalidateTag, build
 *
 * 4. Router Cache:
 *    Client-side cache of rendered Server Component payloads
 *    Scope: browser session — avoids re-fetching on back/forward
 *    Duration: 30s (dynamic) to 5min (static) by default
 */

// Opt out of all caching for a route:
export const dynamic = 'force-dynamic'; // equivalent to SSR always

// Control caching per route segment:
export const revalidate = 3600; // revalidate route every 1 hour

// ============================================================
// 12. NEXT.JS INTERVIEW Q&A RAPID FIRE
// ============================================================

/**
 * Q: What is the difference between a layout and a template in App Router?
 * A: Layout persists across navigations (state preserved, DOM not recreated).
 *    Template is remounted on every navigation (fresh state each time).
 *    Use template for animations, per-page tracking, or form reset on navigate.
 *
 * Q: When would you use a Route Group?
 * A: To share a layout without affecting the URL (e.g., (auth) group for login/signup
 *    to use a different layout than (marketing) pages).
 *
 * Q: How does parallel routes work in App Router?
 * A: @folderName convention creates named slots in a layout.
 *    Lets you render multiple pages in the same layout simultaneously.
 *    Example: dashboard with @analytics and @team slots.
 *
 * Q: What is an intercepting route?
 * A: (..), (.), (../../) conventions intercept a route to show it differently
 *    in context (e.g., clicking a photo shows a modal, but /photos/1 shows full page).
 *
 * Q: How do you handle authentication in App Router?
 * A: Check session in middleware for route protection.
 *    Use auth libraries like NextAuth.js (Auth.js) which integrates with App Router.
 *    Server Components can read cookies directly: cookies() from next/headers.
 *
 * Q: What is the difference between useRouter in Pages Router vs App Router?
 * A: Pages: import { useRouter } from 'next/router'
 *    App:   import { useRouter } from 'next/navigation'
 *    App Router also has usePathname, useSearchParams, useParams as separate hooks.
 *
 * Q: How do you run database queries in App Router?
 * A: Directly in Server Components via ORM (Prisma, Drizzle).
 *    No need for API routes — async Server Components can query DB directly.
 *
 * Q: What is generateStaticParams?
 * A: App Router equivalent of getStaticPaths.
 *    Returns array of params to pre-render at build time.
 *
 * Q: What happens at runtime for paths not in generateStaticParams?
 * A: Depends on dynamicParams export:
 *    true (default): SSR on first visit, then cached
 *    false: 404 for unknown paths
 */

// generateStaticParams example:
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}
