// ============================================================
// REACT 18 & 19 - LATEST FEATURES INTERVIEW GUIDE
// ============================================================
// Topics: Concurrent Mode, Transitions, Suspense, Server Components,
//         Server Actions, use(), useActionState, React Compiler
// Interview Level: Mid to Senior
// ============================================================

/**
 * WHY THIS MATTERS IN INTERVIEWS
 * Knowing the latest React features signals you're current and
 * production-ready. Senior interviewers test whether you know
 * WHAT changed and WHY it matters architecturally.
 */

// ============================================================
// REACT 18 FEATURES
// ============================================================

// ============================================================
// 1. AUTOMATIC BATCHING (React 18)
// ============================================================

/**
 * Q: What changed with batching in React 18?
 *
 * A: In React 17, batching only happened inside React event handlers.
 * In React 18, ALL state updates are batched automatically, including:
 * - setTimeout/setInterval callbacks
 * - Promises (.then)
 * - Native event listeners
 *
 * This means fewer re-renders and better performance by default.
 */

// React 17: 2 renders (setTimeout was NOT batched)
setTimeout(() => {
  setCount(c => c + 1); // render 1
  setFlag(f => !f);     // render 2
}, 1000);

// React 18: 1 render (ALL updates are batched automatically)
setTimeout(() => {
  setCount(c => c + 1); // 1 render total
  setFlag(f => !f);     //
}, 1000);

// If you need to opt OUT of batching (rare):
import { flushSync } from 'react-dom';

flushSync(() => {
  setCount(c => c + 1); // renders immediately
});
flushSync(() => {
  setFlag(f => !f);     // renders immediately
});

// ============================================================
// 2. CONCURRENT RENDERING & createRoot (React 18)
// ============================================================

/**
 * Q: What is createRoot and why was it introduced in React 18?
 *
 * A: createRoot replaces ReactDOM.render() and opts into concurrent mode.
 * Without it, React 18 features (transitions, Suspense improvements) don't work.
 * Concurrent rendering lets React interrupt, pause, and resume renders.
 */

// React 17: (synchronous, blocking)
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// React 18: (concurrent, non-blocking)
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Concurrent mode allows React to:
// - Pause low-priority renders to handle urgent updates
// - Discard in-progress renders if better data arrives
// - Render in the background without blocking the UI thread

// ============================================================
// 3. useTransition (React 18)
// ============================================================

/**
 * Q: What is useTransition and when do you use it?
 *
 * A: useTransition marks state updates as non-urgent ("transitions").
 * React can interrupt these to handle urgent updates (typing, clicking).
 *
 * Use case: filtering a large list while keeping the input responsive.
 */

import { useTransition, useState } from 'react';

function SearchableList({ items }) {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value); // URGENT: update input immediately

    startTransition(() => {
      // NON-URGENT: filtering can be deferred
      setFilteredItems(items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      ));
    });
  }

  return (
    <>
      <input value={query} onChange={handleSearch} placeholder="Search..." />
      {isPending && <span>Loading...</span>}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

// ============================================================
// 4. useDeferredValue (React 18)
// ============================================================

/**
 * Q: What is useDeferredValue and how does it differ from useTransition?
 *
 * A:
 * - useTransition: you control the state update (wrap it in startTransition)
 * - useDeferredValue: defers a VALUE you receive (e.g., from parent or prop)
 *
 * Use useDeferredValue when you can't wrap the state update (external prop, library).
 */

import { useDeferredValue, memo } from 'react';

function SearchParent({ searchQuery }) {
  // Defer the query value — keeps UI responsive
  const deferredQuery = useDeferredValue(searchQuery);

  return (
    <>
      {/* Show stale indicator during defer */}
      <div style={{ opacity: deferredQuery !== searchQuery ? 0.5 : 1 }}>
        {/* ExpensiveList re-renders with stale query while new one is computing */}
        <ExpensiveList query={deferredQuery} />
      </div>
    </>
  );
}

// Memoize expensive child so it only re-renders when deferredQuery changes
const ExpensiveList = memo(function ExpensiveList({ query }) {
  const results = computeExpensiveFilter(query); // heavy computation
  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
});

// ============================================================
// 5. SUSPENSE IMPROVEMENTS (React 18)
// ============================================================

/**
 * Q: What improved about Suspense in React 18?
 *
 * A:
 * - React 17: Suspense only worked with React.lazy (code splitting)
 * - React 18: Suspense works with data fetching (via frameworks like Next.js)
 * - Streaming SSR: server sends HTML in chunks as Suspense boundaries resolve
 * - Selective hydration: hydrate parts of the page as they stream in
 */

import { Suspense, lazy } from 'react';

// Code splitting (React 17+)
const LazyComponent = lazy(() => import('./HeavyComponent'));

// Nested Suspense (each boundary can have its own fallback)
function Dashboard() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<FeedSkeleton />}>
        <NewsFeed /> {/* data-fetching component */}
      </Suspense>
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar /> {/* data-fetching component */}
      </Suspense>
    </Suspense>
  );
}

// ============================================================
// REACT 19 FEATURES
// ============================================================

// ============================================================
// 6. SERVER COMPONENTS (React 19 / Next.js App Router)
// ============================================================

/**
 * Q: What are React Server Components (RSC) and how do they differ from SSR?
 *
 * A:
 * SSR: renders full component tree on server per request → sends HTML → hydrates client
 *      Components still ship JS to client for interactivity.
 *
 * RSC: components that ONLY run on the server — never shipped to the client.
 *      Result: smaller JS bundle, direct DB/file access, no hydration cost.
 *
 * Key rules:
 * - Server Components: can use async/await, access DB, no state/effects
 * - Client Components: marked "use client" — can use hooks, event handlers
 * - You can import Client Components into Server Components (not vice versa)
 */

// Server Component (default in Next.js App Router, no "use client")
async function UserProfile({ userId }) {
  // Direct DB access — runs ONLY on server, never shipped to browser
  const user = await db.users.findById(userId);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {/* Client Component for interactivity */}
      <FollowButton userId={userId} />
    </div>
  );
}

// Client Component (interactive, runs on client + server for initial HTML)
'use client';

import { useState } from 'react';

function FollowButton({ userId }) {
  const [following, setFollowing] = useState(false);
  return (
    <button onClick={() => setFollowing(f => !f)}>
      {following ? 'Unfollow' : 'Follow'}
    </button>
  );
}

// ============================================================
// 7. SERVER ACTIONS (React 19 / Next.js)
// ============================================================

/**
 * Q: What are Server Actions and why are they useful?
 *
 * A: Server Actions let you call server-side functions directly from
 * Client Components — without writing API routes.
 * They're async functions marked with "use server" directive.
 * Used primarily for form submissions and mutations.
 */

// Server Action (in a separate file or at top of Server Component file)
'use server';

async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  // Direct DB mutation — runs only on server
  await db.posts.create({ title, content, authorId: getSession().userId });

  revalidatePath('/posts'); // Next.js: revalidate cached data
  redirect('/posts');
}

// Using Server Action in a form
function NewPostForm() {
  return (
    <form action={createPost}> {/* action = server action function */}
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}

// ============================================================
// 8. use() HOOK (React 19)
// ============================================================

/**
 * Q: What is the use() hook in React 19?
 *
 * A: use() is a new hook that can:
 * 1. Unwrap Promises (like async/await inside components)
 * 2. Read Context (like useContext but more flexible)
 *
 * Unlike other hooks, use() CAN be called inside conditionals and loops.
 * When used with a Promise, the component suspends until it resolves.
 */

import { use, Suspense } from 'react';

// use() with a Promise
function UserCard({ userPromise }) {
  const user = use(userPromise); // suspends until promise resolves
  return <div>{user.name}</div>;
}

function App() {
  const userPromise = fetchUser(1); // start fetching early

  return (
    <Suspense fallback={<Skeleton />}>
      <UserCard userPromise={userPromise} />
    </Suspense>
  );
}

// use() with Context (can be inside if/else — unlike useContext)
const ThemeContext = React.createContext('light');

function ThemedButton({ isAdmin }) {
  if (isAdmin) {
    const theme = use(ThemeContext); // ✅ valid inside a conditional
    return <button className={theme}>Admin Button</button>;
  }
  return <button>Regular Button</button>;
}

// ============================================================
// 9. useActionState (React 19)
// ============================================================

/**
 * Q: What is useActionState and what problem does it solve?
 *
 * A: useActionState (renamed from useFormState in React 19) manages
 * the state of form submissions, including:
 * - Pending state during server action
 * - Return value from the action
 * - Automatic form reset
 *
 * It replaces manual useState for form submission tracking.
 */

import { useActionState } from 'react'; // React 19

async function submitLoginAction(prevState, formData) {
  // Server action
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    await login({ email, password });
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    submitLoginAction,
    { success: false, error: null } // initial state
  );

  return (
    <form action={formAction}>
      {state.error && <p role="alert">{state.error}</p>}
      {state.success && <p>Logged in!</p>}
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// ============================================================
// 10. useOptimistic (React 19)
// ============================================================

/**
 * Q: What is useOptimistic and how does optimistic UI work in React 19?
 *
 * A: useOptimistic lets you show an optimistic (assumed-success) UI state
 * while an async action is pending. If the action fails, it rolls back.
 *
 * Classic example: toggling a like button that updates immediately
 * before the server confirms.
 */

import { useOptimistic, useTransition } from 'react';

function LikeButton({ postId, initialLiked, initialCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  const [optimisticLiked, addOptimistic] = useOptimistic(
    liked,
    (current, newValue) => newValue // updater function
  );

  async function handleLike() {
    addOptimistic(!liked); // immediately update UI
    startTransition(async () => {
      try {
        const result = await toggleLike(postId);
        setLiked(result.liked);
        setCount(result.count);
      } catch {
        // useOptimistic reverts automatically on error/unmount
      }
    });
  }

  return (
    <button onClick={handleLike} disabled={isPending}>
      {optimisticLiked ? '❤️' : '🤍'} {count}
    </button>
  );
}

// ============================================================
// 11. ref AS PROP — NO MORE forwardRef (React 19)
// ============================================================

/**
 * Q: How does ref handling change in React 19?
 *
 * A: In React 19, ref is a regular prop — no more forwardRef wrapper needed.
 * Components receive ref directly in their props.
 */

// React 18: required forwardRef
import { forwardRef } from 'react';
const OldInput = forwardRef(function OldInput({ label }, ref) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} />
    </div>
  );
});

// React 19: ref is just a prop
function NewInput({ label, ref }) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} />
    </div>
  );
}

// Usage (same in both versions):
function Parent() {
  const inputRef = React.useRef(null);
  return <NewInput label="Name" ref={inputRef} />;
}

// ============================================================
// 12. DOCUMENT METADATA IN COMPONENTS (React 19)
// ============================================================

/**
 * Q: What is the new way to manage document metadata in React 19?
 *
 * A: React 19 supports <title>, <meta>, and <link> tags directly
 * inside components — they're hoisted to <head> automatically.
 * No more react-helmet or Next.js <Head> component needed.
 */

function ProductPage({ product }) {
  return (
    <>
      {/* React 19: these are hoisted to <head> */}
      <title>{product.name} | My Store</title>
      <meta name="description" content={product.description} />
      <link rel="canonical" href={`https://example.com/products/${product.id}`} />

      {/* Page content */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </>
  );
}

// ============================================================
// 13. REACT COMPILER (formerly React Forget)
// ============================================================

/**
 * Q: What is the React Compiler and how does it change how we write React?
 *
 * A: The React Compiler (opt-in, shipping with React 19) automatically
 * memoizes components and hooks — you don't need to manually write:
 * - React.memo()
 * - useMemo()
 * - useCallback()
 *
 * The compiler analyzes your code and inserts memoization at the right places.
 * This means cleaner code with optimal performance.
 *
 * Rule of React (required for compiler): components must be pure functions.
 * Mutations during render, side effects in render → compiler won't optimize these.
 */

// Before React Compiler: manual memoization
const OldComponent = React.memo(function OldComponent({ data, onSubmit }) {
  const processed = useMemo(() => processData(data), [data]);
  const handleSubmit = useCallback(() => onSubmit(processed), [onSubmit, processed]);

  return <button onClick={handleSubmit}>{processed.label}</button>;
});

// After React Compiler: write clean code, compiler handles memoization
function NewComponent({ data, onSubmit }) {
  // No useMemo, no useCallback, no memo wrapper
  const processed = processData(data); // compiler memoizes automatically
  return <button onClick={() => onSubmit(processed)}>{processed.label}</button>;
}

// ============================================================
// REACT 18 vs 19 COMPARISON TABLE
// ============================================================

/**
 * Feature              | React 18          | React 19
 * ---------------------|-------------------|---------------------------
 * Concurrent rendering | ✅                | ✅ improved
 * Automatic batching   | ✅                | ✅
 * useTransition        | ✅                | ✅ + async actions support
 * useDeferredValue     | ✅                | ✅
 * Suspense (data)      | Framework only    | ✅ built-in use()
 * Server Components    | Experimental      | ✅ stable
 * Server Actions       | Experimental      | ✅ stable
 * use() hook           | ❌                | ✅ (Promises + Context)
 * useActionState       | useFormState      | ✅ renamed & improved
 * useOptimistic        | ❌                | ✅
 * forwardRef           | Required          | ✅ not needed (ref = prop)
 * Document metadata    | react-helmet      | ✅ native <title>/<meta>
 * React Compiler       | ❌                | ✅ opt-in
 */

// ============================================================
// INTERVIEW Q&A RAPID FIRE
// ============================================================

/**
 * Q: What problem does concurrent rendering solve?
 * A: It makes React non-blocking. Previously, a long render would freeze the UI.
 *    Concurrent mode lets React pause low-priority renders for urgent updates (typing).
 *
 * Q: When would you use useTransition vs useDeferredValue?
 * A: useTransition when you control the state update.
 *    useDeferredValue when you receive a value you can't control.
 *
 * Q: Can Server Components use useState?
 * A: No. Server Components have no lifecycle, hooks, or interactivity.
 *    They run once on the server and output HTML/RSC payload.
 *
 * Q: What makes use() different from other hooks?
 * A: It can be called inside conditionals and loops (other hooks cannot).
 *
 * Q: What is the "key" change in React 19 for refs?
 * A: forwardRef is no longer needed — ref is passed as a regular prop.
 *
 * Q: How does the React Compiler affect performance?
 * A: It removes the need for manual useMemo/useCallback — applies memoization
 *    automatically based on static analysis of component code.
 *
 * Q: What is streaming SSR in React 18?
 * A: Server sends HTML progressively as Suspense boundaries resolve,
 *    instead of waiting for the full page. Improves Time to First Byte (TTFB).
 *
 * Q: What is selective hydration?
 * A: React 18 can hydrate parts of the page independently.
 *    If a user interacts with a section, React prioritizes hydrating that part first.
 */
