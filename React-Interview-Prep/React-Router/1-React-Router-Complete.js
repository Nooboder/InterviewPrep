// ============================================================
// REACT ROUTER v6 - COMPLETE INTERVIEW GUIDE
// ============================================================
// Topics: v6 API, Nested Routes, Data Router, Protected Routes,
//         useNavigate, Lazy Loading, loaders/actions
// Interview Level: Mid to Senior
// ============================================================

// ============================================================
// 1. CORE CONCEPTS & BREAKING CHANGES FROM v5 to v6
// ============================================================

/**
 * Q: What major changes did React Router v6 introduce?
 *
 * A:
 * 1. <Switch> replaced by <Routes> (exact matching by default)
 * 2. element prop instead of component prop on <Route>
 * 3. Relative paths in nested routes (no need to repeat parent path)
 * 4. <Outlet /> for nested route rendering
 * 5. useNavigate() replaces useHistory()
 * 6. Index routes for default nested content
 * 7. Route-level data loading via loaders and actions (v6.4+)
 * 8. useRoutes() hook for dynamic route configs
 */

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
  useOutletContext,
} from 'react-router-dom';

// Basic setup
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Nested routes with shared layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />       {/* /dashboard */}
          <Route path="profile" element={<Profile />} />    {/* /dashboard/profile */}
          <Route path="settings" element={<Settings />} />  {/* /dashboard/settings */}
        </Route>

        {/* Dynamic segment */}
        <Route path="/users/:userId" element={<UserDetail />} />

        {/* Multiple segments */}
        <Route path="/blog/:year/:month/:slug" element={<BlogPost />} />

        {/* Optional segment */}
        <Route path="/products/:category?" element={<Products />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Layout component uses <Outlet />
function DashboardLayout() {
  return (
    <div>
      <nav>
        {/* NavLink adds active class automatically */}
        <NavLink to="/dashboard" end className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }>
          Overview
        </NavLink>
        <NavLink to="/dashboard/profile">Profile</NavLink>
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>
      <main>
        <Outlet /> {/* child route renders here */}
      </main>
    </div>
  );
}

// ============================================================
// 2. NAVIGATION HOOKS
// ============================================================

// useNavigate — programmatic navigation
function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    await login(credentials);

    // Navigate to previous page or dashboard
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true }); // replace: don't add login to history
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}

// Navigate with state
navigate('/checkout', {
  state: { items: cart, total: 99.99 },
  replace: false,  // default: push to history
});

// Navigate back/forward
navigate(-1);  // go back
navigate(1);   // go forward

// useParams — read URL params
function UserDetail() {
  const { userId } = useParams(); // matches :userId in path
  // userId is always string (parse as needed)
  const id = parseInt(userId, 10);
  return <div>User {id}</div>;
}

// useSearchParams — read/write query strings
function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);

  function handleSearch(value) {
    // setSearchParams preserves existing params by default when using function form
    setSearchParams(prev => {
      prev.set('q', value);
      prev.set('page', '1'); // reset page on new search
      return prev;
    });
  }

  function handleCategoryChange(cat) {
    setSearchParams({ q: query, category: cat, page: '1' });
  }

  return (
    <div>
      <input value={query} onChange={e => handleSearch(e.target.value)} />
      <select value={category} onChange={e => handleCategoryChange(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
      </select>
    </div>
  );
}

// useLocation — access current location object
function useQueryParams() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

// ============================================================
// 3. PROTECTED ROUTES (AUTH GUARDS)
// ============================================================

/**
 * Q: How do you implement protected/private routes in React Router v6?
 */

// Option 1: Wrapper component
function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Save the attempted URL for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Option 2: Layout route (cleaner for multiple protected routes)
function ProtectedLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageSpinner />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}

// Usage:
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* All these routes are protected */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

// Role-based protection
function RequireRole({ role, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!user.roles.includes(role)) return <Navigate to="/unauthorized" replace />;

  return children;
}

// ============================================================
// 4. LAZY LOADING ROUTES
// ============================================================

/**
 * Q: How do you code-split routes in React Router v6?
 *
 * A: Use React.lazy() + <Suspense> — each route loads its bundle on demand.
 */

import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<ProtectedLayout requiredRole="admin" />}>
            <Route path="/admin/*" element={<AdminPanel />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Preload on hover/focus (improve perceived performance)
const DashboardModule = () => import('./pages/Dashboard');

function NavLink({ to, children }) {
  const preload = () => DashboardModule(); // preload on hover
  return (
    <Link to={to} onMouseEnter={preload} onFocus={preload}>
      {children}
    </Link>
  );
}

// ============================================================
// 5. DATA ROUTER — LOADERS & ACTIONS (React Router v6.4+)
// ============================================================

/**
 * Q: What are loaders and actions in React Router v6.4+?
 *
 * A: Data Router (createBrowserRouter) enables route-level data fetching:
 * - loader: fetches data BEFORE rendering the route component
 * - action: handles form submissions / mutations
 *
 * Benefits over useEffect data fetching:
 * - Data available immediately on render (no loading flicker)
 * - Parallel loading across nested routes
 * - Built-in error/loading states
 * - Works with <Form> component for progressive enhancement
 */

import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
  useActionData,
  Form,
  redirect,
} from 'react-router-dom';

// Loader (runs before component renders)
async function userLoader({ params }) {
  const user = await fetchUser(params.userId);
  if (!user) throw new Response('Not Found', { status: 404 });
  return user; // returned value accessible via useLoaderData()
}

// Action (handles form POST/PUT/PATCH/DELETE)
async function updateUserAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const errors = validateUser(updates);
  if (Object.keys(errors).length) return errors; // return errors without redirect

  await updateUser(params.userId, updates);
  return redirect('/users'); // redirect on success
}

// Component uses hooks to access loader/action data
function UserEdit() {
  const user = useLoaderData(); // data from loader
  const errors = useActionData(); // data returned from action (e.g., validation errors)
  const navigation = useNavigation(); // navigation.state: 'idle' | 'loading' | 'submitting'

  return (
    // <Form> intercepts submission and calls the route's action
    <Form method="patch" action={`/users/${user.id}/edit`}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={user.name} />
        {errors?.name && <span>{errors.name}</span>}
      </div>
      <button type="submit" disabled={navigation.state === 'submitting'}>
        {navigation.state === 'submitting' ? 'Saving...' : 'Save'}
      </button>
    </Form>
  );
}

// Route config with createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'users',
        element: <UserList />,
        loader: usersLoader,
      },
      {
        path: 'users/:userId',
        element: <UserDetail />,
        loader: userLoader,
        errorElement: <UserError />,
        children: [
          {
            path: 'edit',
            element: <UserEdit />,
            loader: userLoader,
            action: updateUserAction,
          }
        ]
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// ============================================================
// 6. OUTLET CONTEXT — PASS DATA FROM LAYOUT TO CHILDREN
// ============================================================

function UserLayout() {
  const { userId } = useParams();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  if (!user) return <Spinner />;

  return (
    <div>
      <UserHeader user={user} />
      <Outlet context={{ user, setUser }} /> {/* pass context to child routes */}
    </div>
  );
}

function UserProfile() {
  const { user, setUser } = useOutletContext(); // access parent context
  return <ProfileForm user={user} onSave={setUser} />;
}

// ============================================================
// 7. useRoutes — PROGRAMMATIC ROUTE CONFIG
// ============================================================

import { useRoutes } from 'react-router-dom';

function App() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Overview /> },
        { path: 'profile', element: <Profile /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);

  return routes;
}

// ============================================================
// 8. HASH ROUTER vs BROWSER ROUTER vs MEMORY ROUTER
// ============================================================

/**
 * BrowserRouter: uses HTML5 History API (clean URLs: /users/1)
 *   ✅ Recommended for most apps
 *   ⚠️ Requires server-side catch-all config (return index.html for all paths)
 *
 * HashRouter: uses URL hash (/#/users/1)
 *   ✅ No server config needed
 *   ❌ No SSR, not ideal for SEO
 *   Use for: GitHub Pages, static hosting without server config
 *
 * MemoryRouter: stores history in memory (no URL changes)
 *   ✅ Testing environments
 *   ✅ React Native (no browser)
 *   Use for: unit testing, embedded UIs
 *
 * createStaticRouter: SSR rendering (used by frameworks)
 */

// ============================================================
// REACT ROUTER v6 INTERVIEW Q&A
// ============================================================

/**
 * Q: What is the index route?
 * A: The default child route when the parent matches exactly.
 *    <Route index element={<Overview />} /> renders at /dashboard (not /dashboard/something).
 *
 * Q: What's the difference between <Link> and <NavLink>?
 * A: NavLink receives isActive and isPending props in its className/style function,
 *    automatically applying active classes when the link's route matches.
 *
 * Q: How do you scroll to top on navigation?
 * A: Use a <ScrollRestoration /> component (Data Router) or a custom hook:
 *    useEffect(() => { window.scrollTo(0, 0); }, [location.pathname])
 *
 * Q: How does Navigate component differ from redirect?
 * A: <Navigate to="/login" replace /> renders a navigation declaratively.
 *    Use it in JSX. redirect() is used inside loaders/actions (imperative).
 *
 * Q: How do you pass state between routes?
 * A: navigate('/target', { state: { data } }) then const { data } = useLocation().state
 *    Note: state is lost on page refresh — only for ephemeral state.
 *
 * Q: What is useFetcher in v6.4+?
 * A: Lets you call loaders/actions without navigating.
 *    Great for: sidebar actions, optimistic UI, background refreshes.
 */
