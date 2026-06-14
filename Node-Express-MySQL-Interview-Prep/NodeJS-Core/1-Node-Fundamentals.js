/**
 * NODE.JS FUNDAMENTALS - INTERVIEW PREPARATION
 *
 * This file covers:
 * ✅ Node.js architecture & how it works
 * ✅ Event Loop (the most important concept)
 * ✅ Modules & package management
 * ✅ Async/Sync operations
 * ✅ Global objects
 * ✅ File system operations
 * ✅ Buffer & Streams basics
 *
 * Interview Level: HARD
 * Time to read: 2-3 hours
 * Recommended: Run each code example locally!
 */

// ============================================================================
// SECTION 1: WHAT IS NODE.JS & HOW DOES IT WORK?
// ============================================================================

/**
 * Q1: What is Node.js?
 *
 * A: Node.js is a JavaScript runtime built on Chrome's V8 engine that allows
 *    you to run JavaScript on the server-side.
 *
 * Key points:
 * - Single-threaded (event-driven, non-blocking I/O)
 * - Uses V8 engine (same as Chrome)
 * - Built for scalable, I/O-heavy applications
 * - NOT ideal for CPU-intensive tasks
 *
 * Why use Node.js?
 * ✓ Fast development (JavaScript everywhere)
 * ✓ Non-blocking I/O (great for real-time apps)
 * ✓ Lightweight & scalable
 * ✓ Large ecosystem (npm)
 */

// Example: Server using Node.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// ============================================================================
// SECTION 2: EVENT LOOP - THE HEART OF NODE.JS (MOST IMPORTANT!)
// ============================================================================

/**
 * Q2: Explain the Event Loop in Node.js
 *
 * A: The Event Loop is what allows Node.js to perform non-blocking operations.
 *    It's a single-threaded loop that picks up tasks from the call stack
 *    and executes them.
 *
 * Event Loop Phases (in order):
 * 1. Timers - Execute setTimeout/setInterval callbacks
 * 2. Pending Callbacks - Deferred I/O callbacks
 * 3. Idle/Prepare - Internal use
 * 4. Poll - Wait for events, execute I/O callbacks
 * 5. Check - Execute setImmediate callbacks
 * 6. Close Callbacks - Close callbacks
 *
 * MICROTASK QUEUE (runs after each phase):
 * - Promises (microtasks)
 * - process.nextTick() (highest priority)
 *
 * Diagram:
 *    ┌─────────────────────────────┐
 *    │         timers              │
 *    │    (setTimeout, etc)        │
 *    └──────────┬──────────────────┘
 *               ↓
 *    ┌─────────────────────────────┐
 *    │    pending callbacks        │
 *    └──────────┬──────────────────┘
 *               ↓
 *    ┌─────────────────────────────┐
 *    │     idle, prepare           │
 *    └──────────┬──────────────────┘
 *               ↓
 *    ┌─────────────────────────────┐
 *    │  poll (I/O callbacks)       │
 *    └──────────┬──────────────────┘
 *               ↓
 *    ┌─────────────────────────────┐
 *    │      setImmediate           │
 *    └──────────┬──────────────────┘
 *               ↓
 *    ┌─────────────────────────────┐
 *    │    close callbacks          │
 *    └─────────────────────────────┘
 */

// Example 1: Understanding execution order
console.log('1. Start');

setTimeout(() => {
  console.log('2. setTimeout (timers phase)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3. Promise (microtask queue)');
  });

process.nextTick(() => {
  console.log('4. process.nextTick (highest priority microtask)');
});

setImmediate(() => {
  console.log('5. setImmediate (check phase)');
});

console.log('6. End');

/*
Output:
1. Start
6. End
4. process.nextTick (runs first - highest priority)
3. Promise (microtasks)
2. setTimeout (timers phase)
5. setImmediate (check phase)

IMPORTANT: Microtasks (Promise, process.nextTick) run BEFORE
the next phase of event loop!
*/

// Example 2: Complex event loop puzzle (commonly asked)
console.log('\n--- Complex Event Loop Example ---');

setTimeout(() => {
  console.log('setTimeout 1');
  Promise.resolve().then(() => console.log('Promise inside setTimeout'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    setTimeout(() => console.log('setTimeout inside Promise'), 0);
  })
  .then(() => {
    console.log('Promise 2');
  });

process.nextTick(() => {
  console.log('nextTick');
});

/*
Expected output:
nextTick
Promise 1
Promise 2
setTimeout 1
Promise inside setTimeout
setTimeout inside Promise
*/

/**
 * Q3: What is the difference between setTimeout, setImmediate,
 *      and process.nextTick?
 *
 * | Method | Phase | Priority | Use Case |
 * |--------|-------|----------|----------|
 * | process.nextTick | Microtask | Highest | Defer sync code |
 * | Promise.then | Microtask | High | Async operations |
 * | setTimeout | Timers | Medium | Delay execution |
 * | setImmediate | Check | Low | After I/O events |
 *
 * Rule: Microtasks always run before the next phase!
 */

// Example: Why this matters
function processData() {
  process.nextTick(() => {
    console.log('Processed immediately');
  });

  // This will run AFTER processData completes but BEFORE timers
}

// ============================================================================
// SECTION 3: CALL STACK, TASK QUEUE, & MICROTASK QUEUE
// ============================================================================

/**
 * Q4: Explain Call Stack, Task Queue, and Microtask Queue
 *
 * Call Stack:
 * - Where function execution context is stored
 * - LIFO (Last In, First Out)
 * - Synchronous code runs here
 *
 * Microtask Queue:
 * - Promises, process.nextTick
 * - Runs AFTER current execution context
 * - BEFORE next event loop phase
 *
 * Task Queue (Macrotask Queue):
 * - setTimeout, setInterval, setImmediate
 * - Runs AFTER microtask queue is empty
 * - One task per event loop iteration
 */

// Visual example:
function a() {
  console.log('a start');
  b();
  console.log('a end');
}

function b() {
  console.log('b');
}

a();

/*
Call Stack:
[a()] -> [a(), b()] -> [a()] -> []

Execution:
1. a start
2. b
3. a end
*/

// ============================================================================
// SECTION 4: MODULES & REQUIRE/IMPORT
// ============================================================================

/**
 * Q5: Explain CommonJS modules (require/exports)
 *
 * Module System:
 * - Each file is a module
 * - module.exports exports from a module
 * - require() imports a module
 * - Modules are cached after first load
 */

// Example module: calculator.js
// module.exports = {
//   add: (a, b) => a + b,
//   subtract: (a, b) => a - b
// };

// Using the module:
// const calc = require('./calculator');
// console.log(calc.add(5, 3)); // 8

/**
 * Q6: What is the difference between module.exports and exports?
 *
 * exports is a reference to module.exports
 *
 * ✓ DO THIS:
 * module.exports = { add: (a,b) => a+b };
 *
 * ✗ DON'T DO THIS:
 * exports = { add: (a,b) => a+b }; // Won't work - breaks reference
 *
 * ✓ THIS WORKS:
 * exports.add = (a,b) => a+b; // Modifying object is fine
 */

/**
 * Q7: What are ES6 modules (import/export)?
 *
 * Modern syntax (requires .mjs or "type": "module" in package.json)
 *
 * Named exports:
 * export const add = (a, b) => a + b;
 * import { add } from './utils.js';
 *
 * Default export:
 * export default function() { ... }
 * import someFunc from './utils.js';
 *
 * Key differences:
 * - import is synchronous, require is synchronous
 * - Imports are hoisted
 * - Better for tree-shaking (bundlers)
 * - More modern syntax
 */

/**
 * Q8: How does Node.js module caching work?
 *
 * Modules are cached after first require
 *
 * Example:
 * const module1 = require('./logger');
 * const module2 = require('./logger');
 * // module1 === module2 (same object - cached!)
 *
 * Cache location: require.cache
 * To clear: delete require.cache[require.resolve('./logger')];
 */

// Example: Module caching
const fs = require('fs');
const fsAgain = require('fs');
console.log('fs === fsAgain:', fs === fsAgain); // true

// ============================================================================
// SECTION 5: GLOBAL OBJECTS IN NODE.JS
// ============================================================================

/**
 * Q9: What is the global object in Node.js?
 *
 * In browsers: window
 * In Node.js: global
 *
 * Common global objects:
 * - global: The global object
 * - process: Current process information
 * - Buffer: Binary data handling
 * - __filename: Current file path
 * - __dirname: Current directory path
 * - console: Logging utility
 */

// Examples:
console.log('Global process.env:', process.env.NODE_ENV); // undefined or 'development'
console.log('Global __filename:', __filename); // Current file path
console.log('Global __dirname:', __dirname); // Current directory

// process object (very important):
console.log('Process ID:', process.pid);
console.log('Node version:', process.version);
console.log('Node argv:', process.argv); // Command line arguments

// Set environment variables:
process.env.MY_VAR = 'value';
console.log('My custom var:', process.env.MY_VAR);

/**
 * Q10: What is process.nextTick() and when would you use it?
 *
 * process.nextTick() executes a callback on the next iteration
 * of the event loop (as a microtask).
 *
 * Use cases:
 * - Defer execution until event loop continues
 * - Handle errors before event continues
 * - Ensure consistent ordering
 */

// Example: Ensuring callback runs after current execution
function doSomething(callback) {
  process.nextTick(callback);
}

doSomething(() => {
  console.log('This runs after current context');
});

// ============================================================================
// SECTION 6: SYNCHRONOUS vs ASYNCHRONOUS OPERATIONS
// ============================================================================

/**
 * Q11: What's the difference between sync and async file operations?
 *
 * Synchronous (Blocking):
 * - Blocks execution until operation completes
 * - Simple code, easy to understand
 * - BAD for servers (blocks everything)
 *
 * Asynchronous (Non-blocking):
 * - Returns immediately, executes in background
 * - GOOD for servers
 * - More complex code
 */

// Synchronous example (DO NOT USE IN PRODUCTION):
const fileSync = require('fs').readFileSync('./file.txt', 'utf8');
console.log('File contents:', fileSync); // Blocks here!

// Asynchronous example (CORRECT):
const fsAsync = require('fs').promises;

fsAsync
  .readFile('./file.txt', 'utf8')
  .then(data => {
    console.log('File contents:', data); // Non-blocking
  })
  .catch(err => console.error(err));

// Or with async/await (modern syntax):
async function readFile() {
  try {
    const data = await fsAsync.readFile('./file.txt', 'utf8');
    console.log('File contents:', data);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Q12: Why is Node.js single-threaded but can handle concurrent requests?
 *
 * Node.js is single-threaded at the JavaScript level, but underneath:
 * - libuv library provides thread pool (default 4 threads)
 * - I/O operations are offloaded to thread pool
 * - Callbacks return to event loop when done
 *
 * This allows:
 * - Handling many concurrent connections
 * - Without creating a thread per connection
 * - Much more memory efficient than traditional servers
 *
 * Example: 10,000 concurrent connections
 * - Traditional: 10,000 threads (huge memory!)
 * - Node.js: 1 thread + async I/O (lightweight)
 */

// ============================================================================
// SECTION 7: BUFFER AND STREAMS (QUICK INTRO)
// ============================================================================

/**
 * Q13: What is a Buffer in Node.js?
 *
 * Buffer is a fixed-size chunk of memory for handling raw binary data
 *
 * Why needed? JavaScript strings are not suitable for binary data
 * (images, videos, audio files)
 */

// Creating buffers:
const buf1 = Buffer.alloc(10); // 10 bytes of zeros
const buf2 = Buffer.from('hello'); // Buffer from string
const buf3 = Buffer.from([1, 2, 3]); // Buffer from array

console.log('Buffer:', buf2); // <Buffer 68 65 6c 6c 6f>
console.log('Buffer as string:', buf2.toString()); // 'hello'

/**
 * Q14: What are Streams in Node.js?
 *
 * Streams are objects that let you read/write data in chunks
 * instead of all at once.
 *
 * Types:
 * 1. Readable - Read data from source
 * 2. Writable - Write data to destination
 * 3. Duplex - Both readable & writable
 * 4. Transform - Modify data while streaming
 *
 * Why use streams?
 * ✓ Memory efficient (don't load entire file)
 * ✓ Backpressure handling
 * ✓ Perfect for large files
 */

// Example: Reading large file with stream
const readStream = require('fs').createReadStream('./large-file.txt');

readStream.on('data', (chunk) => {
  console.log('Chunk received:', chunk.length, 'bytes');
});

readStream.on('end', () => {
  console.log('File reading completed');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});

// ============================================================================
// SECTION 8: PACKAGE MANAGEMENT (NPM/YARN)
// ============================================================================

/**
 * Q15: Explain package.json
 *
 * package.json is the manifest file for a Node.js project
 *
 * Key fields:
 * - name: Project name
 * - version: Version (semantic versioning)
 * - dependencies: Production dependencies
 * - devDependencies: Development-only dependencies
 * - scripts: NPM scripts to run
 * - main: Entry point of the module
 */

// Example package.json:
/*
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mysql2": "^2.3.0"
  },
  "devDependencies": {
    "jest": "^27.0.0",
    "nodemon": "^2.0.0"
  }
}
*/

/**
 * Q16: What's the difference between dependencies and devDependencies?
 *
 * dependencies: Needed for production (express, mysql, redis, etc)
 * devDependencies: Only needed during development (jest, nodemon, etc)
 *
 * When you deploy, devDependencies are NOT installed
 * (npm install --production)
 *
 * This saves space and improves deploy time
 */

/**
 * Q17: What is package-lock.json?
 *
 * Locks exact versions of dependencies
 *
 * Why needed?
 * - Ensures same versions across all developers
 * - Reproducible builds
 * - Prevents "works on my machine" issues
 *
 * Example:
 * package.json: "express": "^4.18.0" (can be 4.18.x)
 * package-lock.json: "express": "4.18.2" (exact version)
 */

// ============================================================================
// SECTION 9: UNDERSTANDING require() MECHANISM
// ============================================================================

/**
 * Q18: How does require() work step by step?
 *
 * 1. Check if module is in require.cache
 *    - If yes, return cached module
 * 2. Create a new module object
 * 3. Find the module (resolve)
 *    - Check package.json "main" field
 *    - Look for index.js
 *    - Check node_modules/
 * 4. Load the module
 * 5. Wrap in function and execute
 * 6. Cache and return module.exports
 *
 * Resolution order for require('./logger'):
 * 1. ./logger.js
 * 2. ./logger/index.js
 * 3. ./logger/package.json (check "main" field)
 *
 * Resolution order for require('express'):
 * 1. ./node_modules/express/
 * 2. ../node_modules/express/
 * 3. ../../node_modules/express/
 * ... (walk up directory tree)
 */

/**
 * Q19: What is circular dependency and how to handle it?
 *
 * Circular dependency: Module A requires B, Module B requires A
 *
 * This can cause problems!
 *
 * Example problem:
 * // a.js
 * const b = require('./b');
 * module.exports = { a: 1 };
 *
 * // b.js
 * const a = require('./a');
 * module.exports = { b: 2 };
 *
 * Solution: Refactor code structure
 * - Create a third module c.js that both import from
 * - Import inside functions instead of at top level
 * - Restructure your code (best solution)
 */

// ============================================================================
// SUMMARY TABLE: KEY CONCEPTS
// ============================================================================

/**
 * QUICK REFERENCE TABLE:
 *
 * | Concept | Use When | Example |
 * |---------|----------|---------|
 * | setTimeout | Delay async task | setTimeout(() => {}, 1000) |
 * | Promise | Async operation | new Promise((resolve) => {}) |
 * | async/await | Clean async code | async function() {} |
 * | process.nextTick | Priority microtask | process.nextTick(() => {}) |
 * | setImmediate | After I/O | setImmediate(() => {}) |
 * | Callback | Older async | fs.readFile(..., (err, data) => {}) |
 * | Stream | Large files | fs.createReadStream(...) |
 * | Buffer | Binary data | Buffer.from('hello') |
 */

// ============================================================================
// PRACTICE QUESTIONS (Answers at bottom)
// ============================================================================

/**
 * PRACTICE QUESTION 1:
 * What will be the output of this code?
 *
 * console.log('1');
 *
 * setTimeout(() => {
 *   console.log('2');
 * }, 0);
 *
 * Promise.resolve().then(() => {
 *   console.log('3');
 * });
 *
 * console.log('4');
 *
 * Answer: 1, 4, 3, 2
 * Explanation: Sync code (1,4) -> Microtasks (3) -> Timers (2)
 */

/**
 * PRACTICE QUESTION 2:
 * Explain what happens in this code:
 *
 * function a() {
 *   b();
 *   console.log('a');
 * }
 *
 * function b() {
 *   console.log('b');
 * }
 *
 * a();
 *
 * Answer: 'b', then 'a'
 * Explanation: Function calls are synchronous (LIFO call stack)
 */

/**
 * PRACTICE QUESTION 3:
 * Why is this problematic?
 *
 * const data = fs.readFileSync('./large-file.txt');
 * const result = processData(data);
 *
 * Answer: Blocks the entire event loop
 * The file is read completely before any other code runs
 * If it's 1GB file, everything waits!
 *
 * Solution: Use async/await
 * const data = await fs.promises.readFile('./large-file.txt');
 */

/**
 * PRACTICE QUESTION 4:
 * Write a function that debounces another function
 * (common interview question)
 *
 * Expected behavior:
 * const debouncedFunc = debounce(expensiveFunc, 300);
 * debouncedFunc(); // Called 5 times rapidly
 * // expensiveFunc called only once after 300ms
 */

function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * PRACTICE QUESTION 5:
 * What's the output?
 *
 * const obj = {
 *   value: 42,
 *   getValue: function() {
 *     return this.value;
 *   }
 * };
 *
 * const getValue = obj.getValue;
 * console.log(getValue()); // What's the output?
 *
 * Answer: undefined (or error if strict)
 * Explanation: 'this' is lost when function is assigned to variable
 *
 * Solution:
 * const getValue = obj.getValue.bind(obj);
 */

// ============================================================================
// END OF NODE.JS FUNDAMENTALS
// ============================================================================

/**
 * KEY TAKEAWAYS:
 *
 * 1. Event Loop is the heart of Node.js
 * 2. Microtasks (Promises, nextTick) run before macrotasks (setTimeout)
 * 3. Node.js is single-threaded at JS level but async underneath
 * 4. Always use async operations (don't block)
 * 5. Understand require() and module caching
 * 6. Use streams for large data
 * 7. Know your globals: process, Buffer, __filename, __dirname
 *
 * NEXT: Read 5-Interview-Questions-Answers.md for 50+ Q&A!
 */
