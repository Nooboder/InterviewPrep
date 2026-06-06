// ============================================================
// STATE MANAGEMENT PATTERNS
// ============================================================

import React from 'react';

// ============================================================
// 1. CONTEXT API ADVANCED
// ============================================================

/**
 * Context API for prop drilling
 * Optimize: Split contexts, useMemo to prevent unnecessary renders
 */

// ❌ INEFFICIENT: Single context for everything
const BadAppContext = React.createContext();

function BadProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
  const [language, setLanguage] = React.useState('en');
  const [user, setUser] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);

  // Any change causes ALL consumers to re-render!
  const value = { theme, setTheme, language, setLanguage, user, setUser, notifications, setNotifications };

  return (
    <BadAppContext.Provider value={value}>
      {children}
    </BadAppContext.Provider>
  );
}

// ✅ EFFICIENT: Split contexts by domain
const ThemeContext = React.createContext();
const UserContext = React.createContext();
const NotificationContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const value = React.useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          <MainApp />
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

// ============================================================
// 2. REDUX PATTERN (SIMPLIFIED)
// ============================================================

/**
 * Redux: Predictable state container
 * Single source of truth
 * Time-travel debugging
 */

// Action types
const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
};

// Reducer
const initialState = {
  user: null,
  loading: false,
  todos: [],
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case ACTIONS.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

// Store
class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

const store = new Store(appReducer, initialState);

// React integration
const StoreContext = React.createContext();

function ReduxProvider({ children, store }) {
  const [state, setState] = React.useState(store.getState());

  React.useEffect(() => {
    const unsubscribe = store.subscribe(setState);
    return unsubscribe;
  }, [store]);

  const dispatch = React.useCallback((action) => {
    store.dispatch(action);
  }, [store]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

function useRedux() {
  return React.useContext(StoreContext);
}

// Async actions (middleware pattern)
function asyncActionMiddleware(store) {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(store.dispatch, store.getState);
    }
    return next(action);
  };
}

// Usage with async
function fetchUser(id) {
  return async (dispatch, getState) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const user = await fetch(`/api/users/${id}`).then((r) => r.json());
      dispatch({ type: ACTIONS.SET_USER, payload: user });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };
}

// ============================================================
// 3. ZUSTAND (LIGHTWEIGHT ALTERNATIVE)
// ============================================================

/**
 * Zustand: Lightweight state management
 * No boilerplate, simple API
 */

// Example implementation of Zustand-like store
const createStore = (initializer) => {
  let state;
  let listeners = new Set();

  const setState = (partial) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (!Object.is(state, nextState)) {
      state = Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener());
    }
  };

  state = initializer(setState);

  return () => {
    const snapshot = { ...state };
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    return [snapshot, subscribe];
  };
};

// Store
const useCounterStore = createStore((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Component
function Counter() {
  const [state, subscribe] = useCounterStore();
  const [, setRender] = React.useState();

  React.useEffect(() => {
    subscribe(() => setRender({}));
  }, [subscribe]);

  return (
    <div>
      Count: {state.count}
      <button onClick={state.increment}>+</button>
      <button onClick={state.decrement}>-</button>
    </div>
  );
}

// ============================================================
// 4. REDUCER HOOK WITH CONTEXT
// ============================================================

/**
 * Combine useReducer + useContext for local state management
 * Simpler than Redux for small apps
 */

const TodoContext = React.createContext();

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload }];
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.payload);
    case 'UPDATE':
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    default:
      return state;
  }
}

function TodoProvider({ children }) {
  const [todos, dispatch] = React.useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
}

// ============================================================
// 5. COMPARISON: WHEN TO USE WHAT
// ============================================================

/*
Context API:
- ✅ Avoid prop drilling
- ✅ No extra dependencies
- ❌ Re-renders all consumers on change
- ✅ Use: Theme, Auth, Locale

Redux:
- ✅ Predictable state management
- ✅ Time-travel debugging
- ✅ Middleware for side effects
- ❌ Boilerplate
- ✅ Use: Large apps, complex state

Zustand:
- ✅ Simple, minimal boilerplate
- ✅ Good performance
- ❌ Smaller ecosystem
- ✅ Use: Medium apps, lightweight solution

useReducer:
- ✅ No external dependencies
- ✅ Local state
- ❌ Not shared across components easily
- ✅ Use: Complex local state

MobX:
- ✅ Reactive, minimal code
- ✅ Automatic tracking
- ❌ Magic, less predictable
- ✅ Use: Complex domain models
*/

// ============================================================
// INTERVIEW QUESTIONS
// ============================================================

/*
1. Explain the difference between Context API and Redux
   Answer: Context is built-in, no boilerplate. Redux has more structure,
   middleware, time-travel debugging. Use Context for small state, Redux
   for complex apps.

2. What's the problem with Context API?
   Answer: All consumers re-render when value changes, even if specific
   value didn't change. Solution: Split contexts, memoize value.

3. When would you use useReducer over useState?
   Answer: Multiple related state updates, complex state logic,
   state depends on previous state.

4. Explain Redux middleware
   Answer: Middleware intercepts actions before they reach the reducer.
   Used for: logging, async actions, error handling.

5. What's the advantage of Zustand over Redux?
   Answer: Less boilerplate, simpler API, smaller bundle size, easier
   to learn.

6. How would you handle async actions in Redux?
   Answer: Use middleware (redux-thunk) to dispatch functions instead
   of plain actions.

7. Explain the Redux action-reducer-state cycle
   Answer: Action → Reducer (pure function) → New State → Components
   re-render. Time-travel debugging possible.
*/

export {
  ThemeProvider,
  UserProvider,
  App,
  Store,
  ReduxProvider,
  useRedux,
  fetchUser,
  Counter,
  TodoProvider,
  useTodos,
  ACTIONS,
};
