/**
 * 💻 REACT NATIVE CODING CHALLENGES - 8 Problems (Beginner to Expert)
 * 
 * Instructions:
 * 1. Read the problem
 * 2. Solve it without looking at hints
 * 3. Test your solution
 * 4. Compare with solution
 * 5. Understand the approach
 * 
 * Time allocations:
 * 1-2: 30-40 mins
 * 3-5: 45-60 mins
 * 6-8: 60-90 mins
 */

// ============================================
// CHALLENGE 1: Custom useFetch Hook (30 mins)
// ============================================

/**
 * Problem: Create a custom hook that fetches data from an API
 * 
 * Requirements:
 * - Handle loading, data, error states
 * - Support retry functionality
 * - Cancel request on unmount
 * - Support manual refetch
 * 
 * Usage:
 * const { data, loading, error, refetch } = useFetch('/api/users');
 */

// HINT: Use useEffect, useRef, useCallback
// SOLUTION BELOW:

export const useFetch = (url) => {
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  const abortControllerRef = React.useRef(null);

  const fetchData = React.useCallback(async () => {
    abortControllerRef.current = new AbortController();
    setState({ data: null, loading: true, error: null });

    try {
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      if (error.name !== 'AbortError') {
        setState({ data: null, loading: false, error });
      }
    }
  }, [url]);

  React.useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
};

// ============================================
// CHALLENGE 2: Debounced Search (40 mins)
// ============================================

/**
 * Problem: Implement a debounced search that:
 * 1. Fetches results as user types
 * 2. Cancels previous requests if new one comes in
 * 3. Waits 500ms after user stops typing
 * 4. Shows loading while fetching
 * 5. Displays results/errors
 * 
 * UI: TextInput + FlatList
 */

// HINT: Use useState for search, useEffect for debouncing
// SOLUTION BELOW:

import { FlatList, TextInput, View, Text, ActivityIndicator } from 'react-native';

export const SearchComponent = () => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const timeoutRef = React.useRef(null);
  const abortRef = React.useRef(null);

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        abortRef.current = new AbortController();
        const response = await fetch(`/api/search?q=${query}`, {
          signal: abortRef.current.signal,
        });

        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      abortRef.current?.abort();
    };
  }, [query]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
        style={{ padding: 10, fontSize: 16 }}
      />

      {loading && <ActivityIndicator />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <FlatList
        data={results}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

// ============================================
// CHALLENGE 3: Infinite Scroll List (60 mins)
// ============================================

/**
 * Problem: Implement infinite scroll pagination
 * 
 * Requirements:
 * - Load initial 20 items
 * - Load more when scrolling to bottom
 * - Show loading indicator
 * - Handle errors gracefully
 * - Prevent duplicate requests
 * - Show "No more items" when end reached
 * 
 * Bonus: Implement pull-to-refresh
 */

// HINT: Use FlatList onEndReached + pagination state
// SOLUTION BELOW:

export const InfiniteScrollList = () => {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadMore = React.useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/items?page=${page}&limit=20`);
      const data = await response.json();

      if (data.items.length < 20) {
        setHasMore(false);
      }

      setItems((prev) => [...prev, ...data.items]);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  React.useEffect(() => {
    loadMore();
  }, []); // Initial load

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setItems([]);
    setPage(1);
    setHasMore(true);

    try {
      const response = await fetch('/api/items?page=1&limit=20');
      const data = await response.json();
      setItems(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <Text>{item.name}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator style={{ marginVertical: 20 }} />
        ) : !hasMore ? (
          <Text style={{ textAlign: 'center', marginVertical: 20 }}>
            No more items
          </Text>
        ) : null
      }
    />
  );
};

// ============================================
// CHALLENGE 4: Form with Validation (50 mins)
// ============================================

/**
 * Problem: Create a form component with:
 * 1. Multiple input fields
 * 2. Field-level validation
 * 3. Form-level validation
 * 4. Error messages
 * 5. Submit handling
 * 6. Loading state
 * 
 * Fields: Email, Password, Confirm Password, Terms checkbox
 */

// HINT: Use useState for form state, validation logic
// SOLUTION BELOW:

export const FormComponent = () => {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!form.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms';
    }

    return newErrors;
  };

  const handleSubmit = React.useCallback(async () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify(form),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
          setSubmitted(true);
        }
      } catch (err) {
        setErrors({ submit: err.message });
      } finally {
        setLoading(false);
      }
    }
  }, [form]);

  if (submitted) {
    return <Text>Form submitted successfully!</Text>;
  }

  return (
    <View style={{ padding: 20, gap: 15 }}>
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) =>
          setForm({ ...form, email: text })
        }
        editable={!loading}
      />
      {errors.email && (
        <Text style={{ color: 'red' }}>{errors.email}</Text>
      )}

      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) =>
          setForm({ ...form, password: text })
        }
        secureTextEntry
        editable={!loading}
      />
      {errors.password && (
        <Text style={{ color: 'red' }}>{errors.password}</Text>
      )}

      <TextInput
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChangeText={(text) =>
          setForm({ ...form, confirmPassword: text })
        }
        secureTextEntry
        editable={!loading}
      />
      {errors.confirmPassword && (
        <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007AFF',
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ============================================
// CHALLENGE 5: Todo with Undo/Redo (70 mins)
// ============================================

/**
 * Problem: Build a Todo app with undo/redo
 * 
 * Features:
 * 1. Add todo
 * 2. Toggle todo
 * 3. Delete todo
 * 4. Undo last action
 * 5. Redo action
 * 
 * State: todos, history, historyIndex
 */

// HINT: Use useReducer with history array
// SOLUTION BELOW:

const todoReducer = (state, action) => {
  const { todos, history, historyIndex } = state;

  switch (action.type) {
    case 'ADD_TODO': {
      const newTodos = [
        ...todos,
        { id: Date.now(), text: action.payload, completed: false },
      ];
      return {
        todos: newTodos,
        history: [...history.slice(0, historyIndex + 1), newTodos],
        historyIndex: historyIndex + 1,
      };
    }

    case 'TOGGLE_TODO': {
      const newTodos = todos.map((t) =>
        t.id === action.payload
          ? { ...t, completed: !t.completed }
          : t
      );
      return {
        todos: newTodos,
        history: [...history.slice(0, historyIndex + 1), newTodos],
        historyIndex: historyIndex + 1,
      };
    }

    case 'DELETE_TODO': {
      const newTodos = todos.filter((t) => t.id !== action.payload);
      return {
        todos: newTodos,
        history: [...history.slice(0, historyIndex + 1), newTodos],
        historyIndex: historyIndex + 1,
      };
    }

    case 'UNDO': {
      if (historyIndex > 0) {
        return {
          todos: history[historyIndex - 1],
          history,
          historyIndex: historyIndex - 1,
        };
      }
      return state;
    }

    case 'REDO': {
      if (historyIndex < history.length - 1) {
        return {
          todos: history[historyIndex + 1],
          history,
          historyIndex: historyIndex + 1,
        };
      }
      return state;
    }

    default:
      return state;
  }
};

export const TodoApp = () => {
  const [state, dispatch] = React.useReducer(todoReducer, {
    todos: [],
    history: [[]],
    historyIndex: 0,
  });

  const [input, setInput] = React.useState('');

  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  const { todos, historyIndex, history } = state;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
          placeholder="Add todo..."
          value={input}
          onChangeText={setInput}
          style={{ flex: 1, padding: 10, borderWidth: 1 }}
        />
        <TouchableOpacity onPress={addTodo}>
          <Text style={{ padding: 10 }}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => dispatch({ type: 'UNDO' })}
          disabled={historyIndex === 0}
        >
          <Text>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch({ type: 'REDO' })}
          disabled={historyIndex === history.length - 1}
        >
          <Text>Redo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <TouchableOpacity
              onPress={() =>
                dispatch({ type: 'TOGGLE_TODO', payload: item.id })
              }
            >
              <Text>{item.completed ? '✓' : '○'}</Text>
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                marginHorizontal: 10,
                textDecorationLine: item.completed ? 'line-through' : 'none',
              }}
            >
              {item.text}
            </Text>
            <TouchableOpacity
              onPress={() =>
                dispatch({ type: 'DELETE_TODO', payload: item.id })
              }
            >
              <Text>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

// ============================================
// CHALLENGE 6-8: ADVANCED (60-90 mins each)
// ============================================

/**
 * CHALLENGE 6: Offline-First Sync Engine (90 mins)
 * - Detect network state
 * - Queue mutations when offline
 * - Sync when online
 * - Handle conflicts (server wins)
 * - Persist to AsyncStorage
 *
 * CHALLENGE 7: Real-time Collaboration (90 mins)
 * - Share document between users
 * - Real-time updates via WebSocket
 * - Operational transformation
 * - Undo/redo for shared state
 *
 * CHALLENGE 8: Performance Optimization (90 mins)
 * - Large list rendering (10,000 items)
 * - Search + filter
 * - Sort functionality
 * - Maintain 60 FPS
 * - Memory under control
 */

// Implementation details available in solutions guide
