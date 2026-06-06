// ============================================================
// ADVANCED REACT PATTERNS
// ============================================================

import React, { useContext, createContext } from 'react';

// ============================================================
// 1. CUSTOM HOOKS
// ============================================================

/**
 * Custom hooks extract component logic
 * Reuse logic across components
 */

// useAsync hook for data fetching
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = React.useState('idle');
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const execute = React.useCallback(async () => {
    setStatus('pending');
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [asyncFunction]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

// useFetch hook
function useFetch(url) {
  return useAsync(
    React.useCallback(() => fetch(url).then((r) => r.json()), [url]),
    true
  );
}

// useLocalStorage hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = React.useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// usePrevious hook
function usePrevious(value) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// useDebounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// useThrottle hook
function useThrottle(value, interval) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastUpdated = React.useRef(Date.now());

  React.useEffect(() => {
    const now = Date.now();
    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const handler = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
      }, interval);
      return () => clearTimeout(handler);
    }
  }, [value, interval]);

  return throttledValue;
}

// ============================================================
// 2. HIGHER-ORDER COMPONENTS (HOC)
// ============================================================

/**
 * HOC wraps a component and returns enhanced component
 * Used for: props manipulation, state extraction, render hijacking
 */

// Authentication HOC
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      checkAuth().then((auth) => {
        setIsAuthenticated(auth);
        setLoading(false);
      });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated) return <div>Not authenticated</div>;

    return <Component {...props} />;
  };
}

// Theme HOC
const ThemeContext = createContext();

function withTheme(Component) {
  return function ThemedComponent(props) {
    const [theme, setTheme] = React.useState('light');

    const toggleTheme = () => {
      setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    };

    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Component {...props} />
      </ThemeContext.Provider>
    );
  };
}

// Usage
const ProtectedComponent = withAuth(({ user }) => (
  <div>Welcome {user.name}</div>
));

// ============================================================
// 3. RENDER PROPS PATTERN
// ============================================================

/**
 * Component receives a function as child
 * Child function receives component's state/logic
 */

class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Usage
function MouseTrackerApp() {
  return (
    <MouseTracker>
      {({ x, y }) => (
        <div>
          The mouse is at ({x}, {y})
        </div>
      )}
    </MouseTracker>
  );
}

// Data fetcher with render props
function DataFetcher({ url, children }) {
  const { data, loading, error } = useFetch(url);
  return children({ data, loading, error });
}

// Usage
function App() {
  return (
    <DataFetcher url="/api/users">
      {({ data, loading, error }) => (
        loading ? <div>Loading...</div> : <UserList users={data} />
      )}
    </DataFetcher>
  );
}

// ============================================================
// 4. COMPOUND COMPONENTS ADVANCED
// ============================================================

/**
 * Flexible component API using context
 * Example: Tabs, Menu, Select
 */

const TabsContext = createContext();

function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>;
}

function TabsContent({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div className="tabs-content">{children}</div>;
}

function TabsTrigger({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={`tab-trigger ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

// Usage
function TabsExample() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  );
}

// ============================================================
// 5. PROVIDER PATTERN
// ============================================================

/**
 * Manage complex state with reducer
 * Separate context creation and usage
 */

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

const UserContext = createContext();

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    user: null,
    loading: false,
    error: null,
  });

  const setUser = (user) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const value = { state, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Usage
function Profile() {
  const { state, setUser } = useUser();

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return <div>User: {state.user?.name}</div>;
}

// ============================================================
// 6. CONTAINER/PRESENTATIONAL PATTERN
// ============================================================

/**
 * Separate logic (container) from UI (presentational)
 * Modern approach: Hooks make this less necessary
 */

// Presentational component (pure, no side effects)
const UserListUI = ({ users, onLoadMore, isLoading }) => (
  <div>
    {users.map((user) => (
      <div key={user.id}>{user.name}</div>
    ))}
    <button onClick={onLoadMore} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load More'}
    </button>
  </div>
);

// Container component (logic)
function UserListContainer() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    const newUsers = await fetchUsers(page + 1);
    setUsers([...users, ...newUsers]);
    setPage(page + 1);
    setIsLoading(false);
  };

  return (
    <UserListUI
      users={users}
      onLoadMore={loadMore}
      isLoading={isLoading}
    />
  );
}

// ============================================================
// INTERVIEW QUESTIONS
// ============================================================

/*
1. What's a custom hook and why would you create one?
   Answer: A JavaScript function that uses React hooks. Reuse logic
   across components.

2. Explain HOC and render props - which do you prefer?
   Answer: HOC wraps component, render props passes function as child.
   Modern preference: Custom hooks (simpler, avoid wrapper hell).

3. What's compound components?
   Answer: Parent component (e.g., Tabs) with child components (TabsTrigger,
   TabsContent) sharing state via context.

4. When would you use useReducer over useState?
   Answer: Complex state logic, multiple state updates, state depends on
   previous state.

5. What's the container/presentational pattern?
   Answer: Container handles logic, presentational handles UI.
   Modern React: Hooks make this pattern less necessary.

6. Explain context API pitfalls
   Answer: Every context change causes re-render of all consumers.
   Solution: Split contexts, useMemo to prevent unnecessary updates.
*/

export {
  useAsync,
  useFetch,
  useLocalStorage,
  usePrevious,
  useDebounce,
  useThrottle,
  withAuth,
  withTheme,
  MouseTracker,
  MouseTrackerApp,
  DataFetcher,
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
  TabsExample,
  UserProvider,
  useUser,
  Profile,
  UserListContainer,
  UserListUI,
};
