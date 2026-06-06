// ============================================================
// REACT CODING CHALLENGES
// ============================================================

/**
 * Real-world React problems suitable for interviews
 * Difficulty: Medium to Hard
 * Time: 30-60 minutes each
 */

// ============================================================
// CHALLENGE 1: BUILD A CUSTOM USEFETCH HOOK
// ============================================================

/*
Requirements:
- Handle loading, success, error states
- Support cache
- Allow manual refetch
- Support abort when component unmounts
- Handle dependent requests (when URL changes)

Time: 30 mins

Solution approach:
1. Track state (data, loading, error)
2. Create AbortController for cleanup
3. Implement caching
4. Cleanup on unmount/URL change
5. Return state and refetch function
*/

import React from 'react';

function useFetchChallenge(url, options = {}) {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  const [cache] = React.useState(new Map());
  const abortControllerRef = React.useRef(null);

  const fetchData = React.useCallback(async () => {
    // Check cache first
    if (cache.has(url)) {
      setState({ data: cache.get(url), loading: false, error: null });
      return;
    }

    abortControllerRef.current = new AbortController();
    setState((s) => ({ ...s, loading: true }));

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      cache.set(url, data);

      setState({ data, loading: false, error: null });
    } catch (error) {
      if (error.name !== 'AbortError') {
        setState({ data: null, loading: false, error });
      }
    }
  }, [url, options, cache]);

  React.useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}

// ============================================================
// CHALLENGE 2: IMPLEMENT DEBOUNCE SEARCH
// ============================================================

/*
Requirements:
- Input debounces API calls
- Show results below input
- Cancel pending requests
- Handle loading state
- Show error messages

Time: 40 mins
*/

function SearchChallenge() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const timeoutRef = React.useRef(null);
  const abortControllerRef = React.useRef(null);

  const handleSearch = React.useCallback((value) => {
    setQuery(value);
    setError(null);

    // Clear pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!value.trim()) {
      setResults([]);
      return;
    }

    // Debounce API call
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);

      // Abort previous request
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(`/api/search?q=${value}`, {
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) throw new Error('Search failed');

        const data = await response.json();
        setResults(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }, 300); // Debounce 300ms
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <div>
      <input value={query} onChange={(e) => handleSearch(e.target.value)} placeholder="Search..." />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// CHALLENGE 3: VIRTUAL SCROLL FOR LARGE LISTS
// ============================================================

/*
Requirements:
- Render only visible items
- Smooth scrolling
- Support dynamic item heights
- Performance: 1000+ items without lag

Time: 60 mins
*/

function VirtualScrollChallenge({ items, itemHeight = 50, containerHeight = 600 }) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef(null);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
  const visibleItems = items.slice(startIndex, Math.min(endIndex + 1, items.length));

  const totalHeight = items.length * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
      }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, idx) => (
            <div
              key={startIndex + idx}
              style={{
                height: itemHeight,
                border: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHALLENGE 4: FORM WITH VALIDATION
// ============================================================

/*
Requirements:
- Real-time validation
- Touch tracking (validate only on blur)
- Show errors on touched fields
- Disable submit if invalid
- Async validation (email uniqueness)

Time: 45 mins
*/

function FormValidationChallenge() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validate = React.useCallback(async (data) => {
    const newErrors = {};

    if (!data.email) {
      newErrors.email = 'Email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Invalid email';
    } else {
      // Async validation
      const isUnique = await checkEmailUnique(data.email);
      if (!isUnique) {
        newErrors.email = 'Email already exists';
      }
    }

    if (!data.password) {
      newErrors.password = 'Password required';
    } else if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = await validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log('Form submitted:', formData);
    }

    setIsSubmitting(false);
  };

  const isFormValid = Object.keys(errors).length === 0 && Object.values(touched).some(Boolean);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
        />
        {touched.email && errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
        />
        {touched.password && errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm Password"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting || !isFormValid}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

async function checkEmailUnique(email) {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email !== 'taken@example.com');
    }, 500);
  });
}

// ============================================================
// CHALLENGE 5: INFINITE SCROLL
// ============================================================

/*
Requirements:
- Load more items when scrolling near bottom
- Show loading indicator
- Handle errors with retry
- Prevent duplicate requests
- No infinite loop

Time: 45 mins
*/

function InfiniteScrollChallenge() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [error, setError] = React.useState(null);

  const observerTarget = React.useRef(null);

  const fetchMoreItems = React.useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/items?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch');

      const newItems = await response.json();

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchMoreItems]);

  return (
    <div>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item.name}</li>
        ))}
      </ul>

      {error && (
        <div className="error">
          {error}
          <button onClick={() => fetchMoreItems()}>Retry</button>
        </div>
      )}

      <div ref={observerTarget} style={{ height: '20px', marginTop: '20px' }}>
        {loading && <div>Loading more...</div>}
        {!hasMore && <div>No more items</div>}
      </div>
    </div>
  );
}

// ============================================================
// CHALLENGE 6: TODO APP WITH UNDO/REDO
// ============================================================

/*
Requirements:
- Add, edit, delete todos
- Undo/Redo functionality
- Persist to localStorage
- Sort/filter todos
- Performance with 1000+ todos

Time: 60 mins (Advanced)
*/

// Simplified version
function useUndoRedo(initialState) {
  const [state, setState] = React.useState(initialState);
  const [history, setHistory] = React.useState([initialState]);
  const [historyStep, setHistoryStep] = React.useState(0);

  const updateState = (newState) => {
    const updated = typeof newState === 'function' ? newState(state) : newState;

    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(updated);

    setState(updated);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setState(history[historyStep - 1]);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      setState(history[historyStep + 1]);
    }
  };

  return { state, updateState, undo, redo };
}

export {
  useFetchChallenge,
  SearchChallenge,
  VirtualScrollChallenge,
  FormValidationChallenge,
  InfiniteScrollChallenge,
  useUndoRedo,
};
