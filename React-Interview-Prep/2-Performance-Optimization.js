// ============================================================
// PERFORMANCE OPTIMIZATION - ADVANCED TECHNIQUES
// ============================================================

/**
 * Performance is critical for interviews at Big4 companies
 * Key metrics: LCP, FID, CLS, INP
 */

// ============================================================
// 1. CODE SPLITTING & LAZY LOADING
// ============================================================

import React from 'react';
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function CodeSplittingExample() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}

// Route-based code splitting
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// ============================================================
// 2. VIRTUALIZATION FOR LARGE LISTS
// ============================================================

/**
 * Only render visible items - critical for performance with 1000+ items
 * Libraries: react-window, react-virtualized
 */

import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </List>
  );
}

// Custom virtualization implementation
function CustomVirtualization({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight }}>
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 3. IMAGE OPTIMIZATION
// ============================================================

/**
 * Images are often the largest resource
 * Techniques: lazy loading, responsive images, webp
 */

function OptimizedImage({ src, alt, width, height }) {
  return (
    <picture>
      <source srcSet={`${src}-small.webp`} media="(max-width: 600px)" type="image/webp" />
      <source srcSet={`${src}-large.webp`} media="(min-width: 601px)" type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

// ============================================================
// 4. REACT.MEMO WITH DEEP COMPARISON
// ============================================================

/**
 * Prevent unnecessary re-renders
 * But be careful: memo has overhead
 */

// Simple memoization
const UserCard = React.memo(({ user }) => {
  console.log('Rendering UserCard for', user.id);
  return <div>{user.name}</div>;
});

// Custom comparison for complex props
const ComplexComponent = React.memo(
  ({ user, posts, settings }) => {
    return (
      <div>
        <h1>{user.name}</h1>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (DON'T re-render)
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.posts.length === nextProps.posts.length &&
      prevProps.settings === nextProps.settings
    );
  }
);

// ============================================================
// 5. USEMEMO FOR EXPENSIVE CALCULATIONS
// ============================================================

/**
 * useMemo caches computation results
 * Use when computation is expensive
 */

function ExpensiveCalculation({ data, filter }) {
  // Only recalculate when data or filter changes
  const filteredData = React.useMemo(() => {
    console.log('Calculating filtered data');
    return data.filter((item) => item.category === filter);
  }, [data, filter]);

  const sortedData = React.useMemo(() => {
    console.log('Sorting data');
    return filteredData.sort((a, b) => b.priority - a.priority);
  }, [filteredData]);

  return <List items={sortedData} />;
}

// Memoizing object creation
const useStyle = (theme) => {
  return React.useMemo(() => ({
    container: { padding: theme.spacing.md },
    text: { color: theme.colors.text },
  }), [theme]);
};

// ============================================================
// 6. INTERSECTION OBSERVER FOR LAZY LOADING
// ============================================================

/**
 * Load content only when it becomes visible
 * Better than scroll event listening
 */

function IntersectionObserverExample() {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1, // Trigger when 10% visible
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? <ExpensiveComponent /> : <Placeholder />}
    </div>
  );
}

// Custom hook for lazy loading
function useLazyLoad(threshold = 0.1) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

// ============================================================
// 7. REQUEST DEDUPLICATION & CACHING
// ============================================================

/**
 * Prevent duplicate API calls
 * Cache responses
 */

class RequestCache {
  constructor() {
    this.cache = new Map();
    this.pending = new Map();
  }

  async fetch(url, options = {}) {
    const key = `${url}-${JSON.stringify(options)}`;

    // Return cached result
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    // Return pending request
    if (this.pending.has(key)) {
      return this.pending.get(key);
    }

    // Make new request
    const promise = fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        this.cache.set(key, data);
        this.pending.delete(key);
        return data;
      });

    this.pending.set(key, promise);
    return promise;
  }

  clear() {
    this.cache.clear();
  }
}

function useFetch(url, options) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;

    const cache = new RequestCache();
    cache.fetch(url, options)
      .then((data) => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url, options]);

  return { data, loading, error };
}

// ============================================================
// 8. PROFILING WITH REACT DEVTOOLS
// ============================================================

/**
 * Use React Profiler to identify performance bottlenecks
 * Measures render time, commit time
 */

import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

function ProfiledApp() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <App />
    </Profiler>
  );
}

// ============================================================
// INTERVIEW QUESTIONS
// ============================================================

/*
1. How would you optimize a list of 10,000 items?
   Answer: Virtualization (react-window), pagination, or infinite scroll
   with intersection observer.

2. When should you use React.memo?
   Answer: When a component receives the same props frequently and
   re-rendering is expensive. But memo itself has overhead.

3. What's the difference between useMemo and useCallback?
   Answer: useMemo memoizes a value, useCallback memoizes a function.

4. How does image lazy loading work?
   Answer: Set loading="lazy" on <img> or use IntersectionObserver
   to load when visible.

5. Explain code splitting and why it matters
   Answer: Load code only when needed. Reduces initial bundle size,
   improves FCP/LCP metrics.

6. What's request deduplication?
   Answer: If the same request is made multiple times, use a pending
   request instead of making a new one.

7. How would you profile a React app?
   Answer: React DevTools Profiler tab, or wrap components with
   React.Profiler to measure render times.
*/

export {
  CodeSplittingExample,
  App,
  VirtualizedList,
  CustomVirtualization,
  OptimizedImage,
  UserCard,
  ComplexComponent,
  ExpensiveCalculation,
  useStyle,
  IntersectionObserverExample,
  useLazyLoad,
  RequestCache,
  useFetch,
  ProfiledApp,
};
