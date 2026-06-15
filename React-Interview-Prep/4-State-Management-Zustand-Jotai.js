/**
 * ZUSTAND & JOTAI — Modern State Management
 * Big4/MNC Frequency: ⭐⭐⭐⭐ (RTK is being replaced in many teams — Zustand is the new standard)
 *
 * Topics: Zustand store setup, slices, middleware (devtools, persist, immer),
 *         Jotai atoms, derived atoms, async atoms, comparing with Redux/Context
 */

import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { atom, useAtom, useAtomValue, useSetAtom, atomWithStorage, atomFamily } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

// ============================================================
// PART 1: ZUSTAND
// ============================================================

// ============================================================
// Q1: Basic Zustand store (replace 80% of Redux use cases)
// ============================================================

const useCartStore = create((set, get) => ({
  // State
  items: [],
  total: 0,

  // Actions (methods)
  addItem: (product) => set((state) => {
    const existing = state.items.find(i => i.id === product.id);

    if (existing) {
      return {
        items: state.items.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        total: state.total + product.price,
      };
    }

    return {
      items: [...state.items, { ...product, quantity: 1 }],
      total: state.total + product.price,
    };
  }),

  removeItem: (productId) => set((state) => {
    const item = state.items.find(i => i.id === productId);
    if (!item) return state;

    return {
      items: state.items.filter(i => i.id !== productId),
      total: state.total - item.price * item.quantity,
    };
  }),

  clearCart: () => set({ items: [], total: 0 }),

  // get() reads current state — useful for computed values or actions that depend on state
  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

// Usage in components
function CartIcon() {
  // Select only what you need — prevents unnecessary re-renders
  const itemCount = useCartStore((state) => state.getItemCount());
  return <span>{itemCount}</span>;
}

function CartTotal() {
  const total = useCartStore((state) => state.total);
  return <span>${total.toFixed(2)}</span>;
}

function AddToCartButton({ product }) {
  // Grab only the action — component NEVER re-renders when state changes
  const addItem = useCartStore((state) => state.addItem);
  return <button onClick={() => addItem(product)}>Add to Cart</button>;
}

// ============================================================
// Q2: Zustand with middleware — devtools + persist + immer
// ============================================================

const useUserStore = create(
  devtools(           // Redux DevTools support
    persist(          // localStorage persistence
      immer(          // Immer for mutating drafts directly
        (set, get) => ({
          user: null,
          preferences: {
            theme: 'light',
            notifications: true,
            language: 'en',
          },
          isLoading: false,

          setUser: (user) => set((draft) => {
            // Immer lets you mutate directly (produces immutable update under hood)
            draft.user = user;
          }),

          updatePreference: (key, value) => set((draft) => {
            draft.preferences[key] = value;
          }),

          login: async (credentials) => {
            set((draft) => { draft.isLoading = true; });

            try {
              const user = await authService.login(credentials);
              set((draft) => {
                draft.user = user;
                draft.isLoading = false;
              });
            } catch (err) {
              set((draft) => { draft.isLoading = false; });
              throw err;
            }
          },

          logout: () => set((draft) => {
            draft.user = null;
          }),
        })
      ),
      {
        name: 'user-storage',         // localStorage key
        partialize: (state) => ({     // only persist preferences, not user (security)
          preferences: state.preferences,
        }),
      }
    ),
    { name: 'UserStore' }             // DevTools display name
  )
);

// ============================================================
// Q3: Zustand with subscribeWithSelector — listen outside React
// ============================================================
/*
subscribeWithSelector: subscribe to specific slice of state outside React components.
Useful for: analytics, logging, syncing to external systems, integration tests.
*/

const useNotificationStore = create(
  subscribeWithSelector((set) => ({
    notifications: [],
    unreadCount: 0,

    addNotification: (notification) => set((state) => ({
      notifications: [{ ...notification, id: Date.now(), read: false }, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),

    markAllRead: () => set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  }))
);

// Subscribe outside React (e.g., for analytics)
const unsub = useNotificationStore.subscribe(
  (state) => state.unreadCount, // selector
  (unreadCount) => {
    // Called only when unreadCount changes
    analytics.track('notification_badge', { count: unreadCount });
  }
);

// Cleanup subscription
unsub();

// ============================================================
// Q4: Zustand slice pattern for large stores (scalable)
// ============================================================
/*
For large apps: split store into "slices" and combine.
This is the Zustand equivalent of Redux's combineReducers.
*/

// authSlice.js
const createAuthSlice = (set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  clearAuth: () => set({ user: null, token: null }),
});

// cartSlice.js
const createCartSlice = (set) => ({
  cartItems: [],
  addToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
  clearCart: () => set({ cartItems: [] }),
});

// Combined store
const useAppStore = create(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createCartSlice(...args),
  }), { name: 'AppStore' })
);

// ============================================================
// PART 2: JOTAI
// ============================================================

// ============================================================
// Q5: Jotai atoms — bottom-up state management
// ============================================================
/*
Jotai: atomic state management.
  - No store/provider required for basic use (uses React context under the hood)
  - Atoms are standalone — composable, reusable
  - No selectors needed — atoms are derived directly
  - Minimal boilerplate — each atom is just one line
  - Great for: component-level shared state, form state, UI state
  - Philosophy: "only re-render what actually depends on the atom that changed"
*/

// Basic atoms
const countAtom = atom(0);
const nameAtom = atom('');
const isLoggedInAtom = atom(false);

// Using atoms in components
function Counter() {
  const [count, setCount] = useAtom(countAtom); // like useState, but SHARED

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}

// Read-only in one component, write in another
function DisplayCount() {
  const count = useAtomValue(countAtom); // read-only, no setter
  return <span>Count: {count}</span>;
}

function ResetButton() {
  const setCount = useSetAtom(countAtom); // write-only, no re-render when count changes
  return <button onClick={() => setCount(0)}>Reset</button>;
}

// ============================================================
// Q6: Derived atoms (read-only computed values)
// ============================================================

const cartItemsAtom = atom([]);
const taxRateAtom = atom(0.1); // 10%

// Derived atom — computed from other atoms
const cartSubtotalAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const cartTaxAtom = atom((get) => {
  const subtotal = get(cartSubtotalAtom);
  const taxRate = get(taxRateAtom);
  return subtotal * taxRate;
});

const cartTotalAtom = atom((get) => {
  return get(cartSubtotalAtom) + get(cartTaxAtom);
});

// Read-write derived atom
const cartCountAtom = atom(
  (get) => get(cartItemsAtom).reduce((sum, item) => sum + item.quantity, 0), // getter
  (get, set, delta) => {
    // setter — update the underlying atom
    const items = get(cartItemsAtom);
    // ... logic to update quantities
    set(cartItemsAtom, updatedItems);
  }
);

// ============================================================
// Q7: Async atoms — data fetching with Jotai
// ============================================================

// Async atom (React suspends automatically when unresolved)
const userAtom = atom(async () => {
  const response = await fetch('/api/user');
  return response.json();
});

// Parameterized async atom
const productAtom = atom(null); // holds the product ID
const productDetailsAtom = atom(async (get) => {
  const productId = get(productAtom);
  if (!productId) return null;

  const response = await fetch(`/api/products/${productId}`);
  return response.json();
});

// Usage with Suspense
function ProductDetails({ productId }) {
  useEffect(() => {
    setProductId(productId); // set param
  }, [productId]);

  const product = useAtomValue(productDetailsAtom); // suspends until loaded
  return <div>{product?.name}</div>;
}

// Wrap in Suspense
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductDetails productId={1} />
    </Suspense>
  );
}

// ============================================================
// Q8: atomWithStorage — persistent atoms
// ============================================================

// Persisted to localStorage (like Zustand persist but per-atom)
const themeAtom = atomWithStorage('theme', 'light');
const languageAtom = atomWithStorage('language', 'en');

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

// ============================================================
// Q9: atomFamily — dynamic atoms per entity
// ============================================================
/*
atomFamily: create an atom per unique key (like a Map of atoms).
Perfect for: per-item state (selection, expansion, edit state)
*/

const isSelectedAtom = atomFamily((id) => atom(false));
const isExpandedAtom = atomFamily((id) => atom(false));

function ProductItem({ product }) {
  const [isSelected, setSelected] = useAtom(isSelectedAtom(product.id));
  const [isExpanded, setExpanded] = useAtom(isExpandedAtom(product.id));

  return (
    <div className={isSelected ? 'selected' : ''}>
      <button onClick={() => setSelected(s => !s)}>{product.name}</button>
      {isExpanded && <ProductDetails product={product} />}
    </div>
  );
}

// ============================================================
// Q10: Zustand vs Jotai vs Redux — when to choose
// ============================================================
/*
ZUSTAND:
+ Simple API, minimal boilerplate
+ Works outside React (subscribe to store)
+ Middleware ecosystem (devtools, persist, immer)
+ Good for: global app state, auth state, cart, settings
USE WHEN: replacing Redux in a new or migrating project

JOTAI:
+ Atom-level granularity (only affected components re-render)
+ Async atoms with Suspense integration
+ No provider needed for simple cases
+ Good for: shared UI state, form fields, per-item state
USE WHEN: fine-grained reactivity, server state with Suspense

REDUX TOOLKIT (RTK):
+ Industry standard, huge ecosystem
+ Redux DevTools time-travel debugging
+ RTK Query for API caching
+ Good for: large teams, strict conventions, complex async flows
USE WHEN: large teams needing enforced patterns, existing Redux codebase

CONTEXT + useReducer:
+ Built-in, no dependencies
+ Good for: low-frequency updates, theme, locale
USE WHEN: simple state, small apps, avoiding dependencies

TANSTACK QUERY (for server state):
+ Best-in-class for server/remote state
+ Handles caching, stale-while-revalidate, pagination, optimistic updates
USE WHEN: any server data fetching — don't use Zustand/Redux for API data
*/

// ============================================================
// INTERVIEW QUESTIONS
/*
Q: How is Zustand different from Redux?
A: Zustand has much less boilerplate — no actions, reducers, or dispatch.
   You just define state and functions together in one create() call.
   Zustand works outside React via subscribe(). Redux has a larger ecosystem
   (RTK, DevTools time-travel, RTK Query). For new projects, Zustand is often
   preferred for its simplicity.

Q: What is the key difference between Zustand and Jotai?
A: Zustand: top-down single store, select slices to use in components.
   Jotai: bottom-up atoms, each component subscribes to specific atoms.
   Zustand is better for structured global state. Jotai is better for
   granular shared state where you want minimal re-renders.

Q: How do you prevent unnecessary re-renders with Zustand?
A: Use selectors — pass a function to useStore to extract only what you need.
   const name = useStore(state => state.user.name)
   Component re-renders ONLY when name changes, not on any store update.
   Without a selector (const state = useStore()), you re-render on every change.

Q: How does Jotai handle async data fetching differently from useState?
A: Jotai async atoms integrate with React Suspense. When an async atom is
   pending, React automatically shows the Suspense fallback. No loading states,
   no null checks. useState requires manual loading/error state management.

Q: When should you NOT use Zustand/Jotai for state?
A: Don't use them for server/remote state (API data). Use TanStack Query instead.
   It handles caching, stale detection, refetching, pagination, and optimistic
   updates out of the box — Zustand/Jotai don't do any of that.
*/
