/**
 * ADVANCED JAVASCRIPT — Generators, WeakMap/WeakSet, Proxy/Reflect
 * Big4/MNC Frequency: ⭐⭐⭐⭐ (Asked in senior JS deep-dive rounds)
 *
 * Topics: Generator functions, iterators, WeakRef, WeakMap/WeakSet use cases,
 *         Proxy traps, Reflect, Symbol, async generators
 */

// ============================================================
// Q1: Generators — function* and yield
// ============================================================
/*
Generator: a function that can PAUSE and RESUME execution.
Returns an iterator with a .next() method.
Each .next() call runs until the next yield and pauses.

WHY generators matter:
  - Lazy evaluation — generate values on-demand, not all at once
  - Infinite sequences without infinite loops
  - Custom iterators for any data structure
  - Foundation of async/await (async functions ARE generators internally)
*/

// Basic generator
function* counter(start = 0) {
  while (true) {
    yield start++;
  }
}

const gen = counter(1);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
// Infinite sequence — never exhausted, lazy evaluation

// Finite generator
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

// Use with for...of (any iterable works)
for (const num of range(0, 10, 2)) {
  console.log(num); // 0, 2, 4, 6, 8
}

// Spread generator
console.log([...range(1, 6)]); // [1, 2, 3, 4, 5]

// ============================================================
// Q2: Generators as custom iterators
// ============================================================
/*
Any object with Symbol.iterator that returns an iterator is iterable.
Generators make this trivial to implement.
*/

// Make a binary tree iterable
class BinaryTree {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  // Generator for in-order traversal
  *[Symbol.iterator]() {
    if (this.left) yield* this.left; // yield* delegates to another iterable
    yield this.value;
    if (this.right) yield* this.right;
  }
}

const tree = new BinaryTree(4,
  new BinaryTree(2, new BinaryTree(1), new BinaryTree(3)),
  new BinaryTree(6, new BinaryTree(5), new BinaryTree(7))
);

console.log([...tree]); // [1, 2, 3, 4, 5, 6, 7] — sorted!

// Paginated API fetcher with generator
async function* fetchAllPages(url) {
  let page = 1;
  while (true) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();

    if (data.items.length === 0) return; // done

    yield data.items;
    page++;
  }
}

// Usage
async function processAllProducts() {
  for await (const items of fetchAllPages('/api/products')) {
    // process each page lazily — only fetches next page when needed
    items.forEach(item => console.log(item));
  }
}

// ============================================================
// Q3: WeakMap — memory-safe key-value with object keys
// ============================================================
/*
WeakMap: like Map, but:
  - Keys MUST be objects (not primitives)
  - Keys are held WEAKLY — if no other reference exists, key can be garbage collected
  - Not iterable (no .keys(), .values(), .forEach(), no .size)
  - No way to inspect all entries

WHY this matters:
  Regular Map PREVENTS garbage collection:
    const map = new Map();
    let obj = { id: 1 };
    map.set(obj, 'data');
    obj = null;  // Object NOT garbage collected — Map still holds reference!

  WeakMap ALLOWS garbage collection:
    const wmap = new WeakMap();
    let obj = { id: 1 };
    wmap.set(obj, 'data');
    obj = null;  // Object CAN be garbage collected — WeakMap releases it
*/

// USE CASE 1: Private data for class instances
const _private = new WeakMap();

class BankAccount {
  constructor(balance) {
    _private.set(this, { balance, transactions: [] });
  }

  deposit(amount) {
    const data = _private.get(this);
    data.balance += amount;
    data.transactions.push({ type: 'deposit', amount, date: new Date() });
  }

  get balance() {
    return _private.get(this).balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.balance); // 1500
// account._private → undefined, account['_private'] → undefined — truly private

// USE CASE 2: DOM node metadata without memory leak
const nodeMetadata = new WeakMap();

function attachMetadata(node, data) {
  nodeMetadata.set(node, data);
}

// When the DOM node is removed, metadata is automatically garbage collected
// With regular Map, you'd have to manually clean up

// USE CASE 3: Memoization cache (auto-cleanup when arg is GC'd)
function memoizeWeak(fn) {
  const cache = new WeakMap();
  return function(obj) {
    if (cache.has(obj)) return cache.get(obj);
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}

// ============================================================
// Q4: WeakSet — memory-safe set of unique objects
// ============================================================
/*
WeakSet: like Set, but:
  - Values MUST be objects
  - Held weakly (garbage collectable)
  - Not iterable, no .size, no .forEach()

MAIN USE CASE: tracking "has this object been processed?" without memory leaks
*/

const processedRequests = new WeakSet();

async function processRequest(request) {
  if (processedRequests.has(request)) {
    console.log('Already processed');
    return;
  }

  processedRequests.add(request);
  await doWork(request);
  // When `request` object is garbage collected, entry auto-removed
}

// USE CASE: Circular reference detection
function deepClone(obj, seen = new WeakSet()) {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (seen.has(obj)) return '[Circular]'; // handle circular refs
  seen.add(obj);

  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    clone[key] = deepClone(obj[key], seen);
  }
  return clone;
}

// ============================================================
// Q5: Proxy — intercept object operations
// ============================================================
/*
Proxy: wraps an object and intercepts operations on it.
Used in: Vue 3 reactivity, validation, logging, API mocking, sandboxing.

new Proxy(target, handler)
  target: original object
  handler: object with "trap" methods (get, set, has, deleteProperty, apply, ...)
*/

// TRAP 1: get — intercept property reads
const loggedObject = new Proxy({ name: 'Alice', age: 30 }, {
  get(target, property, receiver) {
    console.log(`Reading: ${String(property)}`);
    return Reflect.get(target, property, receiver); // Reflect = safe default behavior
  },
});

console.log(loggedObject.name); // logs "Reading: name", returns "Alice"

// TRAP 2: set — intercept property writes (validation)
function createValidatedUser(data) {
  return new Proxy(data, {
    set(target, property, value) {
      if (property === 'age') {
        if (typeof value !== 'number' || value < 0 || value > 150) {
          throw new TypeError(`Invalid age: ${value}`);
        }
      }
      if (property === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          throw new TypeError(`Invalid email: ${value}`);
        }
      }
      return Reflect.set(target, property, value);
    },
  });
}

const user = createValidatedUser({ name: 'Bob', age: 25 });
user.age = 30;       // OK
// user.age = -5;    // throws: Invalid age: -5
// user.email = 'x'; // throws: Invalid email: x

// TRAP 3: has — intercept `in` operator
const range2 = new Proxy({ min: 1, max: 10 }, {
  has(target, value) {
    return value >= target.min && value <= target.max;
  },
});

console.log(5 in range2);  // true
console.log(15 in range2); // false

// TRAP 4: apply — intercept function calls
function add(a, b) { return a + b; }

const timedAdd = new Proxy(add, {
  apply(target, thisArg, args) {
    const start = performance.now();
    const result = Reflect.apply(target, thisArg, args);
    console.log(`Execution: ${performance.now() - start}ms`);
    return result;
  },
});

timedAdd(2, 3); // logs execution time

// REAL-WORLD USE CASE: Reactive state (how Vue 3 works)
function reactive(data, onChange) {
  return new Proxy(data, {
    set(target, property, value) {
      const oldValue = target[property];
      Reflect.set(target, property, value);
      if (oldValue !== value) {
        onChange(property, oldValue, value); // trigger re-render
      }
      return true;
    },
  });
}

const state = reactive({ count: 0 }, (prop, oldVal, newVal) => {
  console.log(`${prop} changed: ${oldVal} → ${newVal}`);
  // re-render UI
});
state.count++; // logs: "count changed: 0 → 1"

// ============================================================
// Q6: Reflect — the companion to Proxy
// ============================================================
/*
Reflect: provides default behavior for Proxy traps.
  Reflect.get(target, prop, receiver)        ← same as target[prop]
  Reflect.set(target, prop, value, receiver) ← same as target[prop] = value
  Reflect.has(target, prop)                  ← same as prop in target
  Reflect.deleteProperty(target, prop)       ← same as delete target[prop]
  Reflect.apply(fn, thisArg, args)           ← same as fn.apply(thisArg, args)
  Reflect.construct(fn, args)                ← same as new fn(...args)

WHY use Reflect in Proxy traps instead of direct access?
  - Maintains correct `this` binding (the receiver)
  - Returns false instead of throwing for failed operations
  - Consistent API — the "official" way to invoke default behavior
  - Required for prototype chain to work correctly with Proxy
*/

// ============================================================
// Q7: Symbol — unique property keys
// ============================================================
/*
Symbol: primitive type, guaranteed unique value, useful for:
  - Private-like object properties (won't show in for...in, JSON.stringify)
  - Well-known symbols (Symbol.iterator, Symbol.toPrimitive, Symbol.hasInstance)
  - Avoiding property name collisions in shared objects
*/

const ID = Symbol('id');
const user2 = { [ID]: 123, name: 'Alice' };

console.log(user2[ID]); // 123
console.log(Object.keys(user2)); // ['name'] — Symbol excluded
console.log(JSON.stringify(user2)); // '{"name":"Alice"}' — Symbol excluded

// Well-known Symbol example: custom toPrimitive
const temperature = {
  celsius: 25,
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.celsius;
    if (hint === 'string') return `${this.celsius}°C`;
    return this.celsius; // default
  },
};

console.log(+temperature);   // 25
console.log(`${temperature}`); // "25°C"
console.log(temperature + 0); // 25

// ============================================================
// INTERVIEW QUESTIONS
/*
Q: What's the difference between Map and WeakMap?
A: Map can have any key type (string, number, object) and is iterable.
   WeakMap only accepts object keys, is not iterable, and holds keys weakly —
   allowing garbage collection when no other references exist.
   Use WeakMap for associating data with objects without memory leaks.

Q: When would you use a generator?
A: 1. Lazy sequences — generating values on demand (infinite ranges, pagination)
   2. Custom iterators for data structures
   3. Async workflows with redux-saga
   4. Cooperative multitasking / coroutines
   Example: a paginated API fetcher that fetches next page only when needed.

Q: How does Vue 3 reactivity system use Proxy?
A: Vue 3 wraps reactive objects in a Proxy. The get trap tracks which components
   read each property (dependency tracking). The set trap notifies watchers and
   triggers re-renders when a property changes. This replaced Vue 2's Object.defineProperty.

Q: What does yield* do?
A: Delegates to another iterable/generator, yielding all its values.
   Equivalent to a for...of loop that yields each value.
   Used to compose generators and make tree-traversal generators clean.

Q: Why use Reflect.get(target, prop, receiver) instead of target[prop] in Proxy?
A: The receiver maintains the correct prototype chain. If a getter on a prototype
   uses `this`, using target[prop] would set `this` to the Proxy target, not the
   Proxy receiver. Reflect.get with receiver ensures `this` is correct.
*/
