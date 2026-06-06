// ============================================================
// REACT CORE CONCEPTS - FIBER ARCHITECTURE & RECONCILIATION
// ============================================================

/**
 * 1. REACT FIBER ARCHITECTURE
 * - React Fiber is the new reconciliation engine introduced in React 16
 * - Enables incremental rendering: split rendering work into chunks
 * - Can pause, abort, or reuse work
 * - Supports priority levels for different types of work
 */

// Understanding Fiber Structure
const fiberNode = {
  type: 'div',
  props: { className: 'container' },
  dom: DOMElement,
  parent: parentFiberNode,
  child: childFiberNode,
  sibling: siblingFiberNode,
  alternate: previousVersionOfThisFiber,
  effectTag: 'PLACEMENT' | 'UPDATE' | 'DELETION',
  hooks: [], // For hooks state
};

// ============================================================
// 2. RECONCILIATION ALGORITHM (DIFFING)
// ============================================================

/**
 * Keys for list items are critical for reconciliation:
 * - Helps React identify which items have changed
 * - Preserves component state across re-renders
 * - Impacts performance and correctness
 */

// ❌ BAD: Using index as key (causes bugs)
function BadList({ items }) {
  return items.map((item, index) => (
    <div key={index}>{item}</div> // 🚨 Wrong!
  ));
}

// ✅ GOOD: Using unique identifier
function GoodList({ items }) {
  return items.map((item) => (
    <div key={item.id}>{item.name}</div> // Correct
  ));
}

// ============================================================
// 3. BATCH UPDATES & AUTOMATIC BATCHING
// ============================================================

/**
 * React 18+ automatically batches updates:
 * - Reduces number of re-renders
 * - Improves performance
 * - Works in event handlers, promises, setTimeout, etc.
 */

function AutomaticBatching() {
  const [count, setCount] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);

  // React 18 batches these together into ONE render
  const handleClick = async () => {
    setCount((c) => c + 1); // Batched
    setToggle((t) => !t); // Batched

    await fetch('/api/data');

    setCount((c) => c + 1); // Also batched! (React 18+)
    setToggle((t) => !t); // Batched
  };

  return <button onClick={handleClick}>Update</button>;
}

// ============================================================
// 4. USEEFFECT CLEANUP & DEPENDENCY ARRAY
// ============================================================

/**
 * Understanding useEffect lifecycle:
 * - Setup runs after render
 * - Cleanup runs before unmount or next effect
 * - Dependency array controls when effect runs
 */

function AdvancedEffects() {
  const [count, setCount] = React.useState(0);

  // Runs after EVERY render
  React.useEffect(() => {
    console.log('Runs every render');
  });

  // Runs only once (like componentDidMount)
  React.useEffect(() => {
    console.log('Runs once on mount');
    return () => {
      console.log('Cleanup on unmount');
    };
  }, []);

  // Runs when count changes
  React.useEffect(() => {
    const subscription = subscribe(count);
    return () => subscription.unsubscribe(); // Cleanup
  }, [count]);

  // ⚠️ Common pitfall: Missing dependencies
  React.useEffect(() => {
    // If you use 'count' here, it must be in dependencies!
    console.log(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 🚨 Count won't update!
}

// ============================================================
// 5. RENDER PHASE VS COMMIT PHASE
// ============================================================

/**
 * Render Phase (can be paused):
 * - Pure, should not have side effects
 * - Can be called multiple times
 * - Async rendering
 *
 * Commit Phase (cannot be paused):
 * - Synchronous
 * - Updates DOM, runs effects
 */

function RenderVsCommitPhase() {
  // ✅ SAFE in Render Phase (pure)
  const formattedData = complexCalculation(data);

  // ❌ UNSAFE in Render Phase
  React.useEffect(() => {
    // Effects run in commit phase - safe
    logToAnalytics(); // Side effect
    updateDatabase(); // Side effect
  }, []);

  // ❌ UNSAFE in Render Phase (direct side effect)
  // logToAnalytics(); // 🚨 Don't do this!

  return <div>{formattedData}</div>;
}

// ============================================================
// 6. CONCURRENT RENDERING & SUSPENSE
// ============================================================

/**
 * Concurrent features (React 18+):
 * - useTransition: Low-priority updates
 * - useDeferredValue: Defer value updates
 * - Suspense: Handle async boundaries
 */

// useTransition for non-blocking updates
function SearchComponent() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [isPending, startTransition] = React.useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value); // Update immediately (urgent)

    // Search is non-blocking (low priority)
    startTransition(() => {
      const newResults = expensiveSearch(value);
      setResults(newResults);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleSearch} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </div>
  );
}

// useDeferredValue for derived state
function DeferredValueExample() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const deferredSearchTerm = React.useDeferredValue(searchTerm);

  // This component re-renders with old value while search happens
  return (
    <div>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <ExpensiveList query={deferredSearchTerm} />
    </div>
  );
}

// ============================================================
// 7. KEYS AND RECONCILIATION
// ============================================================

/**
 * How React uses keys:
 * 1. Identifies which item changed, added, or removed
 * 2. Lets React preserve component state
 * 3. Helps maintain focus and input values
 */

// Complex reconciliation example
function DynamicList({ items, onRemove }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {/* Component state preserved when item moves in list */}
          <ListItem item={item} onRemove={() => onRemove(item.id)} />
        </li>
      ))}
    </ul>
  );
}

// ============================================================
// 8. REACT.MEMO & USECALLBACK OPTIMIZATION
// ============================================================

/**
 * React.memo prevents re-render if props are equal
 * But it only does shallow comparison
 */

// Without optimization - rerenders unnecessarily
const ExpensiveComponent = ({ data, onCallback }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{data.value}</div>;
};

// With React.memo - prevents rerenders
const MemoizedComponent = React.memo(
  ({ data, onCallback }) => {
    console.log('Rendering MemoizedComponent');
    return <div>{data.value}</div>;
  },
  (prevProps, nextProps) => {
    // Custom comparison
    return prevProps.data.value === nextProps.data.value;
  }
);

// useCallback to maintain callback reference
function ParentComponent() {
  const [count, setCount] = React.useState(0);

  // Without useCallback, handleClick reference changes every render
  const handleClick = React.useCallback(() => {
    console.log('Clicked');
  }, []); // Depends on nothing, so never changes

  return (
    <MemoizedChild onCallback={handleClick} />
  );
}

// ============================================================
// 9. COMPOUND COMPONENTS PATTERN
// ============================================================

/**
 * Share state implicitly via context
 * Flexible and composable API
 */

const AccordionContext = React.createContext();

function Accordion({ children }) {
  const [activeId, setActiveId] = React.useState(null);

  return (
    <AccordionContext.Provider value={{ activeId, setActiveId }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, title, children }) {
  const { activeId, setActiveId } = React.useContext(AccordionContext);
  const isActive = activeId === id;

  return (
    <div className="accordion-item">
      <button onClick={() => setActiveId(isActive ? null : id)}>
        {title}
      </button>
      {isActive && <div className="accordion-content">{children}</div>}
    </div>
  );
}

// Usage
function MyAccordion() {
  return (
    <Accordion>
      <AccordionItem id={1} title="Section 1">
        Content 1
      </AccordionItem>
      <AccordionItem id={2} title="Section 2">
        Content 2
      </AccordionItem>
    </Accordion>
  );
}

// ============================================================
// INTERVIEW QUESTIONS
// ============================================================

/*
1. Explain React Fiber and why it was introduced
   Answer: Improves rendering performance by breaking work into chunks,
   enabling pause/resume, and supporting priority levels.

2. What's the difference between render phase and commit phase?
   Answer: Render phase is pure and can be paused. Commit phase is
   synchronous and updates DOM/effects.

3. Why can't we use index as key in lists?
   Answer: Index changes when items are reordered, causing:
   - Component state bugs
   - Input focus issues
   - Form data loss

4. How does React batching work?
   Answer: React collects state updates and applies them together,
   reducing re-renders.

5. What's the purpose of useCallback?
   Answer: Maintains function reference across renders to prevent
   unnecessary re-renders of memoized children.

6. Explain useTransition and useDeferredValue difference
   Answer: useTransition marks updates as low-priority. useDeferredValue
   returns a deferred version of the value.

7. What's a compound component?
   Answer: Components that share state through context, providing a
   flexible and intuitive API.
*/

export {
  AutomaticBatching,
  AdvancedEffects,
  RenderVsCommitPhase,
  SearchComponent,
  DeferredValueExample,
  DynamicList,
  MemoizedComponent,
  ParentComponent,
  Accordion,
  AccordionItem,
  MyAccordion,
};
