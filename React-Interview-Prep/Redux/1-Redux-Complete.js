// ============================================================
// REDUX - COMPLETE INTERVIEW PREPARATION
// ============================================================

/**
 * Redux is widely used in enterprise apps (Google, Meta, Amazon, TCS, Cognizant)
 * Interview focus: Core concepts, middleware, async actions, optimization
 */

// ============================================================
// 1. REDUX FUNDAMENTALS
// ============================================================

/*
Q1: What is Redux and why use it?
A: Redux is predictable state management:
   - Single source of truth (store)
   - Time-travel debugging
   - Middleware support
   - Predictable data flow
   - Large app scalability

   When to use Redux:
   - Complex state logic
   - Multiple reducers/actions
   - Shared state across many components
   - Need for debugging tools

Q2: Explain the three principles of Redux
A: 1. Single source of truth: One global store
   2. State is read-only: Only dispatch actions
   3. Changes are pure functions: Reducers don't mutate

Q3: What's the Redux action-reducer-state cycle?
A: 1. Component dispatches action: { type: 'INCREMENT', payload: 5 }
   2. Action goes to reducer (pure function)
   3. Reducer returns new state (immutably)
   4. Store updates and notifies subscribers
   5. Components re-render with new state

Q4: What's the difference between actions and action creators?
A: Action: Plain object with type
   ```
   { type: 'SET_USER', payload: user }
   ```

   Action creator: Function that returns action
   ```
   const setUser = (user) => ({
     type: 'SET_USER',
     payload: user
   });
   ```

Q5: What makes a reducer pure?
A: A pure function:
   - No side effects
   - Same input → same output
   - Doesn't mutate arguments
   - Doesn't call API, timers, etc.
   - Deterministic

   ✅ GOOD:
   (state, action) => ({ ...state, count: state.count + 1 })

   ❌ BAD:
   (state) => { state.count++; return state; } // Mutation!
*/

// ============================================================
// 2. REDUX STORE & REDUCERS
// ============================================================

/*
Q6: How to create a Redux store?
A: ```
   import { createStore } from 'redux';

   const store = createStore(rootReducer);
   ```

Q7: What's a reducer and how to structure it?
A: Reducer is pure function: (state, action) => newState
   ```
   const initialState = { count: 0 };

   function counterReducer(state = initialState, action) {
     switch(action.type) {
       case 'INCREMENT':
         return { ...state, count: state.count + 1 };
       case 'DECREMENT':
         return { ...state, count: state.count - 1 };
       default:
         return state;
     }
   }
   ```

Q8: What's combineReducers?
A: Combine multiple reducers into one:
   ```
   import { combineReducers } from 'redux';

   const rootReducer = combineReducers({
     user: userReducer,
     products: productsReducer,
     ui: uiReducer
   });
   ```

Q9: How does Redux prevent direct state mutations?
A: Redux doesn't prevent mutations technically, but:
   - Redux checks: nextState !== prevState
   - If mutations: nextState === prevState (same reference)
   - Redux Devtools shows no change
   - Causes bugs (components won't re-render)

Q10: How to debug Redux issues?
A: - Redux DevTools extension
   - Console logs in reducer
   - Middleware logging
   - Check state shape
   - Verify immutability
*/

// ============================================================
// 3. REDUX MIDDLEWARE & ASYNC
// ============================================================

/*
Q11: What's Redux middleware?
A: Middleware intercepts actions:
   ```
   const middleware = store => next => action => {
     console.log('Dispatching:', action);
     const result = next(action);
     console.log('New state:', store.getState());
     return result;
   };
   ```

Q12: What's redux-thunk?
A: Middleware that allows dispatching functions:
   ```
   const fetchUser = (id) => async (dispatch, getState) => {
     dispatch({ type: 'LOADING' });
     try {
       const user = await fetch(`/api/users/${id}`).then(r => r.json());
       dispatch({ type: 'SET_USER', payload: user });
     } catch (error) {
       dispatch({ type: 'ERROR', payload: error });
     }
   };

   dispatch(fetchUser(1));
   ```

Q13: What's redux-saga?
A: More powerful middleware for complex async logic:
   - Generator functions
   - Better testability
   - Complex side effects
   - Built-in cancellation
   - Watchers and takeEvery

Q14: How to handle async actions in Redux?
A: Options:
   1. Redux Thunk: Dispatch functions
   2. Redux Saga: Generator functions
   3. Redux Observable: RxJS streams
   4. Async reducers: Custom middleware

   Recommendation: Redux Toolkit (handles async better)

Q15: What's Redux Toolkit?
A: Modern Redux with less boilerplate:
   - createSlice: Combines actions + reducer
   - createAsyncThunk: Handles async actions
   - RTK Query: Data fetching (replaces redux-saga)
   - Built-in immer (allows mutations)
   - Best practice setup out of box
*/

// ============================================================
// 4. REDUX OPTIMIZATION
// ============================================================

/*
Q16: How to avoid unnecessary re-renders in Redux?
A: - Use selectors to select specific state
   - Memoize selectors with reselect
   - Connect only needed components
   - Use containers/presentational pattern

Q17: What's reselect and why use it?
A: Memoize selectors to prevent re-renders:
   ```
   const selectUsers = state => state.users;
   const selectUserNames = createSelector(
     selectUsers,
     users => users.map(u => u.name)
   );
   ```
   - Recomputes only if input changed
   - Same reference if dependencies same

Q18: How to structure Redux state?
A: ✅ GOOD:
   ```
   {
     entities: {
       users: { 1: {...}, 2: {...} },
       products: { 1: {...} }
     },
     ui: {
       isLoading: false,
       error: null
     }
   }
   ```

   ❌ BAD:
   - Too nested (> 3 levels)
   - Duplicate data
   - Storing computed values

Q19: When should you normalize Redux state?
A: Normalize when:
   - Same data appears in multiple places
   - Need to update related data
   - Performance critical
   - Deeply nested structures

Q20: How many stores should you have?
A: Only ONE Redux store (principle)
   But use multiple reducers combined with combineReducers
*/

// ============================================================
// 5. REDUX ANTI-PATTERNS & BEST PRACTICES
// ============================================================

/*
Q21: What are common Redux mistakes?
A: 1. ❌ Mutating state directly
   2. ❌ Putting too much in Redux (forms, UI state)
   3. ❌ Creating new arrays/objects in selector
   4. ❌ Dispatching in render
   5. ❌ Storing API responses directly
   6. ❌ Not normalizing data

Q22: Should you store everything in Redux?
A: No! Only store:
   ✅ Global state (user, auth, theme)
   ✅ Shared data (products, items)
   ✅ Critical for multiple components

   ❌ DON'T store:
   - Form values (unless complex)
   - UI state (modals, tabs)
   - Temporary UI state
   - Derived data

Q23: Redux vs Context API vs Zustand
A: Redux:
   - ✅ Predictable, mature, large ecosystem
   - ❌ Boilerplate, learning curve
   - Use: Complex enterprise apps

   Context API:
   - ✅ Built-in, no dependencies
   - ❌ Re-renders all consumers
   - Use: Simple global state

   Zustand:
   - ✅ Minimal, simple API
   - ❌ Smaller ecosystem
   - Use: Medium apps

Q24: How to test Redux reducers?
A: ```
   test('INCREMENT action', () => {
     const state = { count: 0 };
     const action = { type: 'INCREMENT' };
     const result = counterReducer(state, action);
     expect(result).toEqual({ count: 1 });
   });
   ```

Q25: How to handle errors in Redux?
A: Store error state:
   ```
   const initialState = { data: null, error: null, loading: false };

   case 'ERROR':
     return { ...state, error: action.payload, loading: false };
   ```
*/

// ============================================================
// REDUX INTERVIEW TIPS
// ============================================================

/*
TCS/Cognizant (Junior to Mid):
- Know action-reducer-state cycle
- Understand immutability
- Know combineReducers
- Can write basic reducers

Big4 (Mid to Senior):
- Understand middleware
- Know Redux Thunk/Saga
- Can optimize with selectors
- Know when NOT to use Redux
- Redux best practices
- How to handle errors

Most asked questions:

1. "Explain Redux data flow"
   - Action → Reducer → State → Components

2. "What's Redux Thunk?"
   - Middleware allowing functions as actions

3. "How to avoid unnecessary re-renders?"
   - Selectors, reselect, connect specific components

4. "Should you store forms in Redux?"
   - Generally no (unless complex multi-step forms)

5. "How do you handle async in Redux?"
   - Redux Thunk or Redux Saga

6. "Redux vs Context API?"
   - Redux for complex apps, Context for simple
*/

export const REDUX_INTERVIEW_TOPICS = {
  FUNDAMENTALS: [1, 2, 3, 4, 5],
  STORE_REDUCERS: [6, 7, 8, 9, 10],
  MIDDLEWARE_ASYNC: [11, 12, 13, 14, 15],
  OPTIMIZATION: [16, 17, 18, 19, 20],
  ANTI_PATTERNS: [21, 22, 23, 24, 25],
};

// ============================================================
// REDUX CODE PATTERNS
// ============================================================

/*
Pattern 1: Redux Toolkit Slice
```
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  }
});

export const { setUser } = userSlice.actions;
```

Pattern 2: Redux Thunk Async Action
```
const fetchUser = (id) => async (dispatch, getState) => {
  dispatch({ type: 'user/setLoading', payload: true });
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    dispatch({ type: 'user/setUser', payload: user });
  } catch (error) {
    dispatch({ type: 'user/setError', payload: error.message });
  }
};
```

Pattern 3: Selector with Reselect
```
import { createSelector } from 'reselect';

const selectUsers = state => state.users.items;
const selectUserId = (_, userId) => userId;

export const selectUserById = createSelector(
  [selectUsers, selectUserId],
  (users, userId) => users[userId]
);
```
*/
