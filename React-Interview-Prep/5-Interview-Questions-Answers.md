// ============================================================
// REACT INTERVIEW QUESTIONS & ANSWERS
// ============================================================

/\*\*

- 50+ frequently asked React questions at MNC/Big4 companies
- Focus: Advanced concepts for 5+ years of experience
  \*/

// ============================================================
// CORE CONCEPTS
// ============================================================

/\*
Q1: Explain React Fiber and its benefits
A: React Fiber is the new reconciliation engine (React 16+):

- Enables incremental rendering: split rendering work into chunks and spread it out over multiple frames
- Can pause, abort, or reuse work as new updates come in
- Enables concurrent rendering
- Supports priority levels for different types of updates (e.g., user input vs. data fetching)
- Better performance and user experience

Q2: What's the difference between state and props?
A: State is internal, managed by component. Props are external, passed from parent.

- State is mutable (via setState)
- Props are immutable, read-only
- State changes trigger re-render
- Prop changes trigger child re-render

Q3: Explain React reconciliation algorithm
A: React compares old and new Virtual DOM:

1.  If element types differ, recreate entire tree
2.  If attributes differ, update only those
3.  Recursively process children
4.  Keys help identify which items changed

- This is why keys are important in lists

Q4: What's the virtual DOM and why does React use it?
A: Virtual DOM is in-memory representation of real DOM:

- React creates new virtual tree
- Compares with old tree (diffing)
- Updates only changed parts in real DOM
- Batch updates for better performance

Q5: Explain controlled vs uncontrolled components
A: Controlled: React state controls input value
Uncontrolled: DOM controls input value

- Controlled: <input value={state} onChange={handleChange} />
- Uncontrolled: <input ref={inputRef} />
- Use controlled for validation, conditional rendering
  \*/

// ============================================================
// HOOKS
// ============================================================

/\*
Q6: What's the rules of hooks?
A: 1. Call hooks at top level (not in loops, conditions, nested functions) 2. Call hooks in React components (or custom hooks) 3. React relies on call order to match state 4. Violations cause "hooks mismatch" bugs

Q7: Explain useEffect cleanup function
A: Cleanup function runs:

- Before next effect (if dependencies changed)
- Before component unmounts
- Used for: unsubscribing, clearing timers, canceling requests

```
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

Q8: What's the difference between useCallback and useMemo?
A: useCallback: Memoizes a function
useMemo: Memoizes a value

- useCallback(fn, deps) === fn reference stays same
- useMemo(() => computeValue(), deps) === value stays same
- Use when passing to memoized children or as dependency

Q9: Explain useRef and its use cases
A: useRef creates mutable reference that persists across renders:

- Accessing DOM directly (focus, play video)
- Storing mutable values (timer IDs)
- Doesn't cause re-render when changed

```
const inputRef = useRef();
inputRef.current.focus();
```

Q10: When would you use useReducer?
A: - Multiple related state updates

- Complex state logic
- State depends on previous state
- Sharing logic with other components
- Testing easier than setState with hooks
  \*/

// ============================================================
// PERFORMANCE & OPTIMIZATION
// ============================================================

/\*
Q11: How to prevent unnecessary re-renders?
A: - React.memo for functional components

- useMemo for expensive calculations
- useCallback for function references
- Split contexts to prevent cascading updates
- Keys in lists
- Lazy loading with React.lazy

Q12: What's the purpose of React.memo?
A: Prevents re-render if props are shallowly equal:

- Accepts custom comparison function
- Has overhead (comparison cost)
- Use: when same props received frequently AND rendering is expensive
- Don't use: on every component (false optimization)

Q13: Explain code splitting and its benefits
A: Load code only when needed:

- Dynamic imports: const LazyComponent = React.lazy(() => import('./Component'))
- Route-based splitting
- Suspense boundary: <Suspense fallback={<Loading />}>
- Reduces initial bundle size
- Improves FCP, LCP metrics

Q14: How would you optimize a list of 10,000 items?
A: - Virtualization (react-window, react-virtualized)

- Only render visible items
- Pagination or infinite scroll
- Intersection Observer for lazy loading
- Memoize row components
- useCallback for handlers

Q15: What's request deduplication?
A: If same request made multiple times:

- Cache first request
- Return cached result for duplicates
- Prevents unnecessary API calls
- Example: Multiple components fetch same data
  \*/

// ============================================================
// STATE MANAGEMENT
// ============================================================

/\*
Q16: What's the difference between local state and global state?
A: Local state: Specific to component (useState)
Global state: Shared across components (Context, Redux)

- Local: Theme, form values, UI state
- Global: User info, auth state, app config

Q17: When would you use Context API vs Redux?
A: Context API:

- ✅ Built-in, no dependencies
- ✅ Simple apps
- ❌ All consumers re-render on change
  Redux:
- ✅ Predictable, time-travel debugging
- ✅ Middleware support
- ✅ Large, complex apps
- ❌ Boilerplate

Q18: How do you optimize Context API to prevent unnecessary re-renders?
A: - Split contexts by domain

- Memoize context value: useMemo(() => ({ state, dispatch }), [state])
- Use useContext selectors (custom hook)
- Keep provider high in tree
- Consider Redux for frequently changing state

Q19: Explain Redux action-reducer-state flow
A: 1. Component dispatches action: { type: 'SET_USER', payload: user } 2. Reducer receives action and current state 3. Reducer returns new state (pure function) 4. Store updates, notifies subscribers 5. Components re-render with new state

Q20: What's Redux middleware and how does it work?
A: Middleware intercepts actions before reaching reducer:

- Example: redux-thunk for async actions
- Example: redux-logger for logging
- Middleware pattern: store => next => action => { ... }
- Can modify action, async operations, or pass through
  \*/

// ============================================================
// TESTING
// ============================================================

/\*
Q21: How would you test a custom hook?
A: Use @testing-library/react-hooks or renderHook:

```
const { result } = renderHook(() => useCounter());
expect(result.current.count).toBe(0);
act(() => result.current.increment());
expect(result.current.count).toBe(1);
```

Q22: What's the difference between unit and integration testing?
A: Unit: Test component in isolation
Integration: Test components together

- Unit: Mock dependencies
- Integration: Real dependencies (except API)
- Use React Testing Library for integration tests

Q23: How to test async behavior in React?
A: - Use async/await in test

- waitFor(() => expect(...).toBe(...))
- Mock fetch/axios
- screen.findByText (waits for element)

```
test('loads data', async () => {
  render(<Component />);
  await screen.findByText('data');
});
```

Q24: What's the purpose of mocking in tests?
A: - Isolate component for true unit test

- Mock API responses
- Mock child components
- Control side effects
- Make tests fast and deterministic

Q25: Explain snapshot testing
A: Take snapshot of component output, compare in future:

- Detects unintended changes
- Review carefully before updating
- Good for: UI regression, form outputs
- Bad for: Everything (over-reliance)
  \*/

// ============================================================
// ADVANCED PATTERNS
// ============================================================

/\*
Q26: What are the benefits of custom hooks?
A: - Reuse logic across components

- Extract component logic
- Testing easier
- Cleaner component code
- Share stateful logic
  Examples: useFetch, useLocalStorage, useDebounce

Q27: Explain Higher-Order Component (HOC) pattern
A: Function that takes component and returns enhanced component:

```
const EnhancedComponent = withSubscription(MyComponent);
```

- Props manipulation
- State extraction
- Render hijacking
- Modern alternative: Custom hooks

Q28: What's the render props pattern?
A: Component receives function as prop/child:

```
<MouseTracker>
  {(mousePosition) => <div>{mousePosition}</div>}
</MouseTracker>
```

- Advantages: Explicit data flow, composable
- Disadvantages: Callback hell with multiple render props
- Modern alternative: Custom hooks

Q29: Explain compound components
A: Parent component with child components sharing state via context:

```
<Tabs>
  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>
```

- Flexible API
- Implicit state sharing
- Examples: Tabs, Select, Menu

Q30: What's prop drilling and how to solve it?
A: Passing props through many layers:

```
<A prop={prop} />  // A doesn't use it
<B prop={prop} />  // B doesn't use it
<C prop={prop} />  // C uses it
```

Solutions:

- Context API
- Redux / State Management
- Component composition
  \*/

// ============================================================
// TYPESCRIPT
// ============================================================

/\*
Q31: How to type React components with TypeScript?
A: ```
interface ComponentProps {
title: string;
count: number;
onClick: (id: number) => void;
}

function Component({ title, count, onClick }: ComponentProps) {
return <div>{title}</div>;
}

const TypedComponent: React.FC<ComponentProps> = ({ title }) => {
return <div>{title}</div>;
};

````

Q32: How to type hooks with TypeScript?
A: ```
function useCounter(initial: number): [number, () => void] {
  const [count, setCount] = useState<number>(initial);
  const increment = () => setCount(c => c + 1);
  return [count, increment];
}
````

Q33: How to type useRef with TypeScript?
A: ```
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<NodeJS.Timeout | null>(null);

````

Q34: How to type useContext with TypeScript?
A: ```
interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
````

Q35: What's the difference between React.FC and regular function?
A: React.FC (FunctionComponent):

- Includes children prop by default
- Has defaultProps support
- Newer preference: omit FC, define props explicitly
  \*/

// ============================================================
// REAL-WORLD SCENARIOS
// ============================================================

/\*
Q36: How would you implement infinite scroll?
A: - Intersection Observer to detect when bottom reached

- Fetch next page when triggered
- Append to list
- Show loading indicator

Q37: How to handle errors in React?
A: - Error Boundaries (componentDidCatch)

- Try-catch in event handlers
- Async error handling with try-catch
- Global error handler
- Show user-friendly error UI

Q38: How to implement dark mode?
A: - Store theme in Context

- Provide toggle function
- Persist to localStorage
- Apply via CSS-in-JS or classes
- Sync with system preference (prefers-color-scheme)

Q39: How would you optimize bundle size?
A: - Code splitting (React.lazy)

- Tree shaking
- Remove unused dependencies
- Dynamic imports
- Compression (gzip, brotli)

Q40: How to implement authentication flow?
A: - Check auth token on mount

- Redirect to login if not authenticated
- Protected routes with HOC or Context
- Store token securely (httpOnly cookie)
- Handle token refresh
  \*/

// ============================================================
// EDGE CASES & GOTCHAS
// ============================================================

/\*
Q41: What happens if you don't include a dependency in useEffect?
A: Effect won't update when dependency changes:

- If dependency is function, will use stale closure
- Can cause bugs (e.g., outdated props in API call)
- Linter warns about missing dependencies

Q42: What's the issue with useEffect and event listeners?
A: Event listeners keep accumulating if cleanup not provided:

- Must remove listener in cleanup function
- Otherwise: memory leak + multiple listeners firing

```
useEffect(() => {
  const handler = () => { };
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

Q43: What's the closure problem in useEffect?
A: Effect captures variables from render:

- If dependency missing, uses stale value

```
useEffect(() => {
  // captures count from this render
  console.log(count); // might be stale
}, []); // ⚠️ Missing count in deps!
```

Q44: Can you call hooks conditionally?
A: No! Hooks must be called in same order every render:

```
if (condition) useEffect(...); // ❌ Don't do this!
```

Q45: What's the key problem in list reconciliation?
A: Using index as key causes bugs when list changes:

- Item moves: key changes, component state lost
- Item deleted: component state assigned to wrong item
- Use unique ID: key={item.id}
  \*/

// ============================================================
// SENIOR-LEVEL QUESTIONS
// ============================================================

/\*
Q46: How would you design a system to share state across multiple React apps (micro-frontends)?
A: - Separate store for each app

- Shared state service (EventEmitter)
- Cross-app context via window object
- Message passing between iframes
- Shared Redux store (complex setup)
- Web Components with custom events

Q47: Explain server-side rendering (SSR) considerations
A: - Render on server before sending to client

- Benefits: SEO, faster FCP
- Challenges: Hydration, differences between server/client
- Use: Next.js, Remix, etc.
- Avoid: Browser APIs on server, timer IDs mismatch

Q48: How would you handle memory leaks in React?
A: - Always cleanup in useEffect

- Unsubscribe from streams
- Clear intervals/timeouts
- Abort fetch requests
- Remove event listeners
- Test with React DevTools Profiler

Q49: What's the difference between client-side and server-side rendering?
A: Client-side: Browser renders component
Server-side: Server renders to HTML

- SSR: Better SEO, faster initial load
- CSR: Better interactivity, smaller server load

Q50: How to approach debugging a React performance issue?
A: 1. Identify slow renders (React DevTools Profiler) 2. Check: Unnecessary re-renders? Expensive calculations? 3. Optimize: useMemo, useCallback, React.memo 4. Profile: Chrome DevTools Performance tab 5. Measure: LCP, FCP, INP metrics 6. Test: Verify improvement
\*/

export const INTERVIEW_QUESTIONS = {
CORE_CONCEPTS: [1, 2, 3, 4, 5],
HOOKS: [6, 7, 8, 9, 10],
PERFORMANCE: [11, 12, 13, 14, 15],
STATE_MANAGEMENT: [16, 17, 18, 19, 20],
TESTING: [21, 22, 23, 24, 25],
ADVANCED_PATTERNS: [26, 27, 28, 29, 30],
TYPESCRIPT: [31, 32, 33, 34, 35],
REAL_WORLD: [36, 37, 38, 39, 40],
EDGE_CASES: [41, 42, 43, 44, 45],
SENIOR_LEVEL: [46, 47, 48, 49, 50],
};
