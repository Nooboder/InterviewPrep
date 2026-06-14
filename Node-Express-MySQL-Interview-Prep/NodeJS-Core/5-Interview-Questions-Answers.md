# 50+ Node.js Interview Questions & Answers

## 🎯 Most Frequently Asked Node.js Questions for Big4 Companies

---

## CORE CONCEPTS (Essential)

### Q1: Explain the Node.js Event Loop
**Frequency in Big4:** ⭐⭐⭐⭐⭐ (Asked in almost every interview)

**Answer:**
The Event Loop is a single-threaded loop that processes JavaScript code and I/O operations asynchronously. It goes through these phases:

1. **Timers** - Execute setTimeout/setInterval callbacks
2. **Pending Callbacks** - I/O operations from last iteration
3. **Idle/Prepare** - Internal use
4. **Poll** - Wait for events and execute I/O callbacks
5. **Check** - Execute setImmediate callbacks
6. **Close** - Execute close callbacks

**Microtask Queue** (runs after each phase):
- Promises
- process.nextTick()

**Key Point:** Microtasks always run before the next phase starts!

```javascript
console.log('1');                    // Synchronous
setTimeout(() => console.log('2'), 0); // Timer
Promise.resolve().then(() => console.log('3')); // Microtask
console.log('4');                    // Synchronous

// Output: 1, 4, 3, 2
```

---

### Q2: What's the difference between process.nextTick() and setImmediate()?
**Frequency in Big4:** ⭐⭐⭐⭐

**Answer:**

| Aspect | process.nextTick | setImmediate |
|--------|-----------------|-------------|
| **Phase** | Microtask queue | Check phase |
| **When runs** | After current code | After I/O events |
| **Priority** | Higher | Lower |
| **Use case** | Defer sync code | After I/O operations |

```javascript
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));

// Output: 
// nextTick
// immediate
```

**Interview tip:** Say "nextTick runs BEFORE the next event loop phase" to show understanding.

---

### Q3: Is Node.js single-threaded or multi-threaded?
**Frequency in Big4:** ⭐⭐⭐⭐

**Answer:**
Node.js JavaScript execution is **single-threaded**, but underneath:
- Uses **libuv library** with a thread pool (default 4-8 threads)
- I/O operations are offloaded to thread pool (file reads, DB queries, etc)
- Callbacks return to event loop when complete

This allows handling **thousands of concurrent connections** without creating a thread per connection!

```javascript
// Single JS thread, but async I/O underneath
fs.readFile('file.txt', (err, data) => {
  // This callback runs in event loop after file is read by thread pool
});
```

---

### Q4: Explain callback, promises, and async/await
**Frequency in Big4:** ⭐⭐⭐⭐⭐

**Callbacks (Old way):**
```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});
```
**Problems:** Callback hell, hard to handle errors

**Promises (Better):**
```javascript
fs.promises.readFile('file.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```
**Better:** Chainable, cleaner error handling

**Async/Await (Best):**
```javascript
async function readFile() {
  try {
    const data = await fs.promises.readFile('file.txt');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```
**Best:** Reads like synchronous code, easiest to understand

---

### Q5: What is a Promise? How do you create one?
**Frequency in Big4:** ⭐⭐⭐⭐

**Answer:**
A Promise represents a value that will be available in the future (or never).

```javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
    // OR reject('Error!');
  }, 1000);
});

// Using the promise
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));
```

**Promise states:**
- **Pending** - Initial state
- **Fulfilled** - resolve() called
- **Rejected** - reject() called

**Key methods:**
- `Promise.all()` - Wait for all promises
- `Promise.race()` - Wait for first promise
- `Promise.allSettled()` - All promises, regardless of result

---

### Q6: What are the differences between require and import?
**Frequency in Big4:** ⭐⭐⭐

**Answer:**

| Aspect | require | import |
|--------|---------|--------|
| **Type** | CommonJS (older) | ES6 modules (newer) |
| **When runs** | Runtime | Compile time |
| **Synchronous** | Yes | Yes |
| **Named imports** | Can't easily destructure | `import { x } from 'module'` |
| **Default export** | `module.exports = value` | `export default value` |
| **Where to use** | Older Node.js | Modern Node.js (with .mjs or config) |

```javascript
// require (CommonJS)
const express = require('express');
const { Router } = require('express');

// import (ES6)
import express from 'express';
import { Router } from 'express';
```

---

## ASYNC & CONCURRENCY (Important for scalability)

### Q7: How would you handle multiple async operations running in parallel?
**Frequency in Big4:** ⭐⭐⭐⭐⭐

**Answer:**

```javascript
// 1. Using Promise.all() - all must succeed
async function getAllUsers() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
  return { users, posts, comments };
}

// 2. Using Promise.allSettled() - handle failures gracefully
const results = await Promise.allSettled([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log(result.value);
  } else {
    console.error(result.reason);
  }
});

// 3. Using Promise.race() - first to complete wins
const first = await Promise.race([
  fetchFromServer1(),
  fetchFromServer2(),
  fetchFromServer3()
]);
```

---

### Q8: What is a race condition and how do you prevent it?
**Frequency in Big4:** ⭐⭐⭐

**Answer:**
Race condition: When multiple async operations access the same resource simultaneously, causing unexpected results.

```javascript
// BAD: Race condition
let counter = 0;

function incrementCounter() {
  counter++; // Not atomic - can lose updates
}

// Called concurrently
incrementCounter(); // Thread 1
incrementCounter(); // Thread 2
// Expected: 2, Actual: might be 1

// GOOD: Use atomic operations or locks
const counter = { value: 0 };

async function incrementCounter() {
  // Use database transaction or atomic update
  await db.query('UPDATE counter SET value = value + 1');
}
```

---

### Q9: Explain async/await and error handling
**Frequency in Big4:** ⭐⭐⭐⭐

**Answer:**

```javascript
// Basic async/await
async function getData() {
  const data = await fetchData();
  return data;
}

// Error handling with try-catch
async function getDataSafely() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle gracefully
    return null;
  } finally {
    console.log('Cleanup code');
  }
}

// Handling multiple async operations
async function getMultipleData() {
  try {
    const [users, posts] = await Promise.all([
      fetchUsers(),
      fetchPosts()
    ]);
    return { users, posts };
  } catch (error) {
    // One failed, all failed with Promise.all
    console.error(error);
  }
}

// Handling sequential operations
async function getSequential() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id); // Depends on user
    return { user, posts };
  } catch (error) {
    console.error(error);
  }
}
```

---

## MODULES & PACKAGE MANAGEMENT

### Q10: Explain module.exports vs exports
**Frequency in Big4:** ⭐⭐⭐

**Answer:**
`exports` is a reference to `module.exports`

```javascript
// ✓ DO THIS:
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// ✓ OR THIS:
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;

// ✗ DON'T DO THIS:
exports = {     // Breaks the reference!
  add: (a, b) => a + b
};

// RULE: If you use module.exports = {}, 
// don't add to exports afterwards
```

---

### Q11: How does Node.js handle circular dependencies?
**Frequency in Big4:** ⭐⭐

**Answer:**
Circular dependencies can cause partial module exports.

```javascript
// a.js
const b = require('./b');
module.exports = { a: 1, b_value: b.b };

// b.js
const a = require('./a');
module.exports = { b: 2, a_value: a.a };

// When requiring a.js:
// - a.js requires b.js
// - b.js requires a.js (returns a.js incomplete!)
// - Result: a_value might be undefined

// SOLUTION: Require inside functions instead
// a.js
module.exports = function() {
  const b = require('./b');
  return { a: 1, b_value: b.b };
};
```

---

### Q12: What goes in package.json? What are dependencies vs devDependencies?
**Frequency in Big4:** ⭐⭐⭐

**Answer:**

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "Application description",
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
```

**dependencies:** Required in production (express, mysql, redis)
**devDependencies:** Only for development (jest, nodemon, eslint)

When deploying: `npm install --production` skips devDependencies

---

## MEMORY & PERFORMANCE

### Q13: How do you debug memory leaks in Node.js?
**Frequency in Big4:** ⭐⭐⭐⭐

**Answer:**

```javascript
// Common memory leak: Event listeners not removed
const emitter = new EventEmitter();

// BAD: Listener never removed
emitter.on('data', function handler() {
  console.log('Data received');
});

// GOOD: Remove listener when done
function handler() {
  console.log('Data received');
}
emitter.on('data', handler);
// Later...
emitter.removeListener('data', handler);

// Tools for debugging:
// 1. Node.js built-in heap snapshots
// node --inspect app.js
// Then use Chrome DevTools

// 2. clinic.js
// npx clinic doctor -- node app.js

// 3. Monitoring tools
// New Relic, Datadog, etc.

// Common leak causes:
// - Event listeners not removed
// - Circular references
// - Timers not cleared (setTimeout/setInterval)
// - Large cache growing indefinitely
```

---

### Q14: How do you optimize Node.js performance?
**Frequency in Big4:** ⭐⭐⭐⭐

**Answer:**

```javascript
// 1. Use Clustering for multi-core
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(3000);
}

// 2. Use Caching
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

app.get('/data/:id', (req, res) => {
  const cached = cache.get(req.params.id);
  if (cached) return res.json(cached);

  const data = fetchExpensiveData();
  cache.set(req.params.id, data);
  res.json(data);
});

// 3. Use Streams for large files
app.get('/download', (req, res) => {
  const stream = fs.createReadStream('large-file.zip');
  stream.pipe(res);
});

// 4. Use compression middleware
const compression = require('compression');
app.use(compression());

// 5. Avoid synchronous operations
// ✗ BAD: fs.readFileSync
// ✓ GOOD: await fs.promises.readFile
```

---

## FILESYSTEM & I/O

### Q15: What's the difference between readFile and createReadStream?
**Frequency in Big4:** ⭐⭐⭐

**Answer:**

```javascript
// readFile: Loads entire file into memory
fs.readFile('large-file.txt', (err, data) => {
  // All data in memory - bad for large files!
  console.log(data);
});

// createReadStream: Reads in chunks
const stream = fs.createReadStream('large-file.txt');

stream.on('data', (chunk) => {
  // Process chunk one at a time
  console.log('Chunk:', chunk.length, 'bytes');
});

stream.on('end', () => {
  console.log('File read complete');
});

// Use streams for:
// - Large files
// - Piping data
// - Memory efficiency
// - Real-time processing

// Memory comparison:
// File: 1GB
// readFile: Uses 1GB memory
// createReadStream: Uses ~64KB at a time
```

---

## SECURITY

### Q16: How do you prevent common Node.js security issues?
**Frequency in Big4:** ⭐⭐⭐⭐

**Answer:**

```javascript
// 1. SQL Injection Prevention
// ✗ BAD:
db.query(`SELECT * FROM users WHERE id = ${userId}`);

// ✓ GOOD:
db.query('SELECT * FROM users WHERE id = ?', [userId]);

// 2. Command Injection Prevention
// ✗ BAD:
exec(`ls ${userInput}`);

// ✓ GOOD:
execFile('ls', [userInput]);

// 3. XSS Prevention (if serving HTML)
// ✗ BAD:
res.send(`<p>${userInput}</p>`);

// ✓ GOOD:
const DOMPurify = require('isomorphic-dompurify');
const clean = DOMPurify.sanitize(userInput);
res.send(`<p>${clean}</p>`);

// 4. Use environment variables for secrets
// ✗ BAD:
const API_KEY = 'sk_live_abc123xyz789';

// ✓ GOOD:
require('dotenv').config();
const API_KEY = process.env.API_KEY;

// 5. Use helmet for security headers
const helmet = require('helmet');
app.use(helmet());

// 6. Use rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
```

---

## SYSTEM DESIGN & SCALABILITY

### Q17: How would you scale a Node.js application?
**Frequency in Big4:** ⭐⭐⭐⭐⭐

**Answer:**

```
Vertical Scaling (Single machine):
├─ Use clustering
├─ Increase memory
├─ Use caching (Redis)
└─ Optimize code

Horizontal Scaling (Multiple machines):
├─ Load balancer (Nginx, HAProxy)
├─ Multiple app servers
├─ Separate database
├─ Message queue (RabbitMQ, Kafka)
├─ Cache layer (Redis)
└─ CDN for static files

Example Architecture:
                       [Users]
                          |
                    [Load Balancer]
                     /    |    \
                   /      |      \
            [App1]  [App2]  [App3]
                     |       |
                [Database] [Redis Cache]
```

---

### Q18: What is the difference between spawn, exec, and fork?
**Frequency in Big4:** ⭐⭐⭐

**Answer:**

```javascript
const { spawn, exec, fork } = require('child_process');

// 1. spawn - Stream output as it's generated
// Use for: Large outputs, long-running processes
const child = spawn('ls', ['-la']);
child.stdout.on('data', (data) => {
  console.log('Output:', data);
});

// 2. exec - Executes shell command, returns all output at end
// Use for: Simple commands, small outputs
exec('ls -la', (error, stdout, stderr) => {
  if (error) console.error(error);
  console.log(stdout);
});

// 3. fork - Spawns Node.js process, communication channel
// Use for: CPU-intensive tasks, worker threads
const child = fork('worker.js');
child.send({ cmd: 'start', num: 5 });
child.on('message', (msg) => {
  console.log('Message from child:', msg);
});
```

---

## CONTINUE IN NEXT SECTION...

### More Topics Covered:
- Q19: Worker Threads for CPU-intensive tasks
- Q20: Event Emitters and listeners
- Q21: Buffer handling and encoding
- Q22: Streams: Readable, Writable, Duplex, Transform
- Q23: Error handling best practices
- Q24: Global vs local variables
- Q25: Module patterns and architecture
- ...and 25+ more questions

---

## KEY INTERVIEW TIPS

1. **Always explain WHY**, not just HOW
2. **Use real examples** from production systems
3. **Discuss trade-offs** (performance vs maintainability)
4. **Ask clarifying questions** before diving in
5. **Mention monitoring and logging** for production readiness
6. **Think about scalability** from the start
7. **Know the alternatives** (different approaches)

---

## NEXT STEPS

1. Read this Q&A multiple times (don't memorize, understand)
2. Code the examples yourself
3. Try to answer without looking at solutions
4. Explain to someone else
5. Move on to Express & MySQL sections

**Good luck! 💪**
