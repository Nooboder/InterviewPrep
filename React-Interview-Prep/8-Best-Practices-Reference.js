// ============================================================
// REACT BEST PRACTICES & QUICK REFERENCE
// ============================================================

/**
 * Quick reference guide for React best practices
 * Use this during interview prep and coding sessions
 */

// ============================================================
// DO'S
// ============================================================

/*
✅ DO:

1. Component Structure
   - Small, single-responsibility components
   - Clear prop types (TypeScript)
   - Meaningful component names
   - One component per file (generally)

2. State Management
   - Keep state as local as possible
   - Lift state only when needed
   - Use Context for shared state
   - Split contexts by domain

3. Performance
   - Memoize expensive components (React.memo)
   - Use useMemo for expensive calculations
   - Use useCallback for function references
   - Virtualize long lists
   - Code split by route

4. Hooks
   - Call hooks at top level
   - Include all dependencies in useEffect
   - Custom hooks for reusable logic
   - Cleanup in useEffect return

5. Testing
   - Test behavior, not implementation
   - Use React Testing Library
   - Test async operations with waitFor
   - Mock external APIs
   - Aim for >80% coverage

6. Accessibility
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation
   - Color contrast
   - Test with screen readers

7. Styling
   - CSS modules for component-scoped styles
   - CSS-in-JS for dynamic styles
   - Utility CSS (Tailwind) for quick prototyping
   - Consistent naming conventions

8. Error Handling
   - Use Error Boundaries for render errors
   - Try-catch for async operations
   - Provide user-friendly error messages
   - Log errors to service

9. TypeScript
   - Type props interface
   - Type state values
   - Export types for components
   - Use strict mode
   - Avoid `any` type
*/

// ============================================================
// DON'TS
// ============================================================

/*
❌ DON'T:

1. Anti-patterns
   - Don't use index as key in lists
   - Don't call hooks conditionally
   - Don't mutate state directly
   - Don't create new objects/arrays in render
   - Don't use props as state
   - Don't wrap everything in memo

2. Performance mistakes
   - Don't memoize everything (has overhead)
   - Don't useCallback for simple functions
   - Don't useMemo for simple values
   - Don't inline object creation in props

3. Styling mistakes
   - Don't use inline styles for complex styles
   - Don't forget to handle responsive design
   - Don't use !important (usually)
   - Don't forget dark mode

4. State mistakes
   - Don't skip useEffect dependencies
   - Don't set state in render
   - Don't pass new object to useState
   - Don't directly modify array/object state

5. Component mistakes
   - Don't pass all props with spread
   - Don't create components inside components
   - Don't forget to cleanup (timers, listeners)
   - Don't make components too smart

6. Testing mistakes
   - Don't test implementation details
   - Don't over-mock
   - Don't forget edge cases
   - Don't test third-party libraries

7. Type mistakes (TypeScript)
   - Don't use `any`
   - Don't forget to type event handlers
   - Don't use `type Props = any`
   - Don't ignore TypeScript errors

8. Security mistakes
   - Don't store secrets in frontend
   - Don't use dangerouslySetInnerHTML without sanitizing
   - Don't trust user input
   - Don't log sensitive data
*/

// ============================================================
// COMMON PATTERNS QUICK REFERENCE
// ============================================================

/*
1. Fetching Data
   ✅ DO:
   useEffect(() => {
     let cancelled = false;
     fetchData().then(data => {
       if (!cancelled) setData(data);
     });
     return () => { cancelled = true; };
   }, []);

2. Form Handling
   ✅ DO:
   const [values, setValues] = useState({ name: '', email: '' });
   const handleChange = (e) => {
     const { name, value } = e.target;
     setValues(prev => ({ ...prev, [name]: value }));
   };

3. Controlled Input
   ✅ DO:
   <input value={value} onChange={(e) => setValue(e.target.value)} />

4. List Rendering
   ✅ DO:
   {items.map(item => (
     <div key={item.id}>{item.name}</div>
   ))}

5. Conditional Rendering
   ✅ DO:
   {isLoading ? <Spinner /> : <Content />}

6. Event Handling
   ✅ DO:
   const handleClick = useCallback(() => { }, [dependency]);

7. Memoization
   ✅ DO:
   const memoized = useMemo(() => computeValue(data), [data]);

8. Ref Usage
   ✅ DO:
   const ref = useRef(null);
   useEffect(() => {
     ref.current?.focus();
   }, []);
*/

// ============================================================
// PERFORMANCE CHECKLIST
// ============================================================

/*
Before shipping:

□ React DevTools Profiler shows no unexpected re-renders
□ Bundle size < 100KB (gzipped)
□ LCP < 2.5s
□ FID < 100ms
□ CLS < 0.1
□ No console errors or warnings
□ Accessibility audit passes
□ Mobile performance is acceptable
□ Dark mode works
□ Images are optimized
□ Code splitting is in place
□ Error boundaries are implemented
□ Authentication works securely
□ Forms validate correctly
□ Tests pass with >80% coverage
□ No console.log statements
□ No sensitive data in localStorage
□ Lazy loading implemented for routes
□ Pagination/virtualization for large lists
*/

// ============================================================
// DEBUGGING TIPS
// ============================================================

/*
React-specific:
- React DevTools Profiler
- React DevTools Component Tree
- React DevTools Hook Inspector
- React.StrictMode for double-render detection

Performance:
- Chrome DevTools Performance tab
- Chrome DevTools Lighthouse
- Lighthouse CI
- Web Vitals library

State debugging:
- Log state changes
- Redux DevTools for Redux
- React Context devtool
- Browser console

Network:
- Chrome DevTools Network tab
- API mocking (msw)
- Throttle network in DevTools

Memory leaks:
- React DevTools Profiler
- Chrome DevTools Memory tab
- Heap snapshots
- Detached DOM node detection

Testing bugs:
- RTL debugging query options
- screen.debug()
- screen.logTestingPlaygroundURL()
*/

// ============================================================
// INTERVIEW MINDSET
// ============================================================

/*
1. Listen carefully
   - Understand requirements completely
   - Ask clarifying questions
   - Don't assume

2. Think out loud
   - Explain your approach
   - Discuss trade-offs
   - Show reasoning

3. Start simple
   - Basic solution first
   - Optimize after
   - Don't over-engineer

4. Discuss trade-offs
   - Performance vs readability
   - Simplicity vs features
   - Build vs buy

5. Show your experience
   - Real examples from projects
   - Problems you've solved
   - Lessons learned

6. Ask for feedback
   - "Does this approach make sense?"
   - "Any concerns with this solution?"
   - Shows collaboration

7. Know your fundamentals
   - JavaScript closures
   - Async/await, promises
   - Event loop
   - this binding

8. Stay calm
   - Bugs are normal
   - Think through problem
   - Rubber duck debugging
   - Break problem into steps
*/

// ============================================================
// TOPICS TO REVIEW BEFORE INTERVIEW
// ============================================================

/*
Must know:
- React fiber and reconciliation ✓
- Hooks and their rules ✓
- State management patterns ✓
- Performance optimization ✓
- Common hooks implementation ✓

Should know:
- System design thinking
- Testing strategies
- TypeScript with React
- Error handling
- Accessibility basics

Nice to have:
- Next.js SSR/SSG
- React Native basics
- Performance metrics
- DevOps concepts
- Security best practices

Practice:
- Coding challenges (60+ mins)
- System design (45 mins)
- Behavioral (tell stories)
- Ask your own questions
*/

export const QUICK_REFERENCE = {
  PERFORMANCE_TIPS: [
    'React.memo for expensive components',
    'useMemo for expensive calculations',
    'useCallback for function references',
    'Code splitting by route',
    'Virtualize long lists',
    'Lazy load images',
  ],
  COMMON_MISTAKES: [
    'Index as key in lists',
    'Calling hooks conditionally',
    'Missing useEffect dependencies',
    'Mutating state directly',
    'Creating objects in render',
    'Not cleaning up effects',
  ],
  DEBUGGING_TOOLS: [
    'React DevTools Profiler',
    'React DevTools Component Tree',
    'Chrome DevTools Network',
    'Chrome DevTools Performance',
    'Lighthouse',
    'Redux DevTools',
  ],
};
