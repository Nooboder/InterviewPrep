/**
 * EXPRESS.JS FUNDAMENTALS - INTERVIEW PREPARATION
 *
 * This file covers:
 * ✅ Express app setup & initialization
 * ✅ Routing (GET, POST, PUT, DELETE, PATCH)
 * ✅ Middleware & how it works
 * ✅ Request/Response objects
 * ✅ Error handling
 * ✅ Static file serving
 * ✅ Templating engines
 *
 * Interview Level: MEDIUM to HARD
 * Time to read: 2-3 hours
 */

const express = require('express');
const app = express();

// ============================================================================
// SECTION 1: EXPRESS SETUP & BASICS
// ============================================================================

/**
 * Q1: What is Express.js and why use it?
 *
 * Express is a minimal, flexible web framework for Node.js
 *
 * Why use it?
 * ✓ Easy routing
 * ✓ Middleware support
 * ✓ Lightweight
 * ✓ Large ecosystem of packages
 * ✓ Used in production by many companies
 *
 * Is it used in Big4? YES - Very commonly!
 */

// Basic Express server setup
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ============================================================================
// SECTION 2: MIDDLEWARE (The Heart of Express)
// ============================================================================

/**
 * Q2: What is middleware in Express?
 *
 * Middleware are functions that have access to:
 * - req (request object)
 * - res (response object)
 * - next (function to pass control to next middleware)
 *
 * Middleware executes in the order it's defined!
 */

// Example: Simple middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Pass to next middleware
});

// Example: Middleware with parameters
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

// Example: Conditional middleware
app.use('/api', (req, res, next) => {
  // Only runs for paths starting with /api
  console.log('API request');
  next();
});

/**
 * Q3: What's the difference between app.use() and app.get()?
 *
 * app.use(): Middleware that runs for ALL requests (or matching path)
 * app.get(): Route handler that runs only for GET requests matching path
 *
 * Example:
 */

// Middleware - runs for all requests
app.use((req, res, next) => {
  console.log('Middleware runs here');
  next();
});

// Route handler - runs only for GET /hello
app.get('/hello', (req, res) => {
  res.send('Hello!');
});

/**
 * Q4: What is the order of middleware execution?
 *
 * Middleware executes in the order it's defined!
 *
 * Important for Big4 interviews:
 * Being able to explain middleware order shows you understand Express!
 */

// This middleware runs FIRST
app.use((req, res, next) => {
  console.log('1. First middleware');
  next();
});

// This runs SECOND
app.use((req, res, next) => {
  console.log('2. Second middleware');
  next();
});

// This runs THIRD (if you visit /hello)
app.get('/hello', (req, res) => {
  res.send('Hello!');
});

/**
 * Q5: How do you handle errors in Express?
 *
 * Error handling middleware has 4 parameters: (err, req, res, next)
 * Must be defined AFTER all other middleware and routes!
 */

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

// ============================================================================
// SECTION 3: ROUTING
// ============================================================================

/**
 * Q6: What are the HTTP methods and how do you handle them?
 *
 * GET - Fetch data (safe, cacheable)
 * POST - Create new data
 * PUT - Replace entire resource
 * PATCH - Partial update to resource
 * DELETE - Delete resource
 * OPTIONS - Get allowed methods
 *
 * For Big4: You should know the differences!
 */

// GET route
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// POST route
app.post('/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});

// PUT route (replace entire resource)
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  res.json(updatedUser);
});

// PATCH route (partial update)
app.patch('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updates = req.body; // Only fields to update
  res.json({ id: userId, ...updates });
});

// DELETE route
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.status(204).send();
});

/**
 * Q7: What are route parameters and query strings?
 *
 * Route parameters: /users/:id
 * Query strings: /users?page=2&limit=10
 */

// Route parameters: /users/123
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id: id });
});

// Query strings: /users?age=25&city=NYC
app.get('/users', (req, res) => {
  const age = req.query.age;
  const city = req.query.city;
  res.json({ age, city });
});

// Multiple route parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

/**
 * Q8: What's req.body and how do you use it?
 *
 * req.body contains the request payload (JSON, form data, etc)
 * To use it, you need body parsing middleware!
 */

// Parse JSON body
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Now you can use req.body
app.post('/users', (req, res) => {
  console.log('Received body:', req.body);
  res.json(req.body);
});

/**
 * Q9: How do you serve static files in Express?
 *
 * Use express.static() middleware
 */

// Serve files from public directory
app.use(express.static('public'));

// Serve files with custom path
app.use('/images', express.static('images'));

// Now:
// GET /style.css -> serves public/style.css
// GET /images/logo.png -> serves images/logo.png

// ============================================================================
// SECTION 4: RESPONSE METHODS
// ============================================================================

/**
 * Q10: What are different ways to send responses?
 *
 * Common response methods:
 */

app.get('/text', (req, res) => {
  res.send('Plain text response');
});

app.get('/json', (req, res) => {
  res.json({ message: 'JSON response' });
});

app.get('/status', (req, res) => {
  res.status(201).json({ created: true });
});

app.get('/file', (req, res) => {
  res.download('path/to/file.pdf');
});

app.get('/redirect', (req, res) => {
  res.redirect('/new-location');
});

app.get('/html', (req, res) => {
  res.send('<h1>HTML Response</h1>');
});

/**
 * Q11: What HTTP status codes should you use?
 *
 * 200 OK - Request successful
 * 201 Created - Resource created
 * 204 No Content - Successful but no content to return
 * 400 Bad Request - Client error in request
 * 401 Unauthorized - Authentication required
 * 403 Forbidden - Access denied
 * 404 Not Found - Resource not found
 * 500 Internal Server Error - Server error
 * 503 Service Unavailable - Temporary server issue
 */

app.post('/items', (req, res) => {
  const item = { id: 1, name: 'Item' };
  res.status(201).json(item); // 201 for creation
});

app.get('/items/:id', (req, res) => {
  const item = null;
  if (!item) {
    return res.status(404).json({ error: 'Not found' }); // 404
  }
  res.status(200).json(item); // 200
});

// ============================================================================
// SECTION 5: REQUEST OBJECT (req)
// ============================================================================

/**
 * Q12: What are common properties of the request object?
 */

app.use((req, res, next) => {
  // URL and method
  console.log(req.method); // GET, POST, etc.
  console.log(req.path); // /users/123
  console.log(req.url); // Full URL

  // Parameters
  console.log(req.params); // Route parameters
  console.log(req.query); // Query string
  console.log(req.body); // Request payload (needs body parser)

  // Headers
  console.log(req.headers); // All headers
  console.log(req.headers['user-agent']); // Specific header

  // Others
  console.log(req.ip); // Client IP
  console.log(req.hostname); // Host name

  next();
});

// ============================================================================
// SECTION 6: RESPONSE OBJECT (res)
// ============================================================================

/**
 * Q13: What are common response methods?
 */

app.use((req, res, next) => {
  // Setting headers
  res.set('X-Custom-Header', 'value');
  res.setHeader('Content-Type', 'application/json');

  // Setting cookies
  res.cookie('sessionId', '123', { maxAge: 3600000 });

  // You can also use:
  // res.send() - send string or object
  // res.json() - send JSON
  // res.status(code) - set HTTP status
  // res.redirect(url) - redirect
  // res.end() - end response

  next();
});

// ============================================================================
// SECTION 7: ROUTER (Organizing Routes)
// ============================================================================

/**
 * Q14: How do you organize routes in Express?
 *
 * Use express.Router() to create modular route groups!
 *
 * This is important for Big4 interviews - shows you know
 * how to structure larger applications!
 */

// router/users.js
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json({ users: [] });
});

userRouter.get('/:id', (req, res) => {
  res.json({ id: req.params.id });
});

userRouter.post('/', (req, res) => {
  res.status(201).json(req.body);
});

// In main app.js
app.use('/api/users', userRouter); // Mount at /api/users

// Now routes are:
// GET /api/users
// GET /api/users/:id
// POST /api/users

// ============================================================================
// SECTION 8: ADVANCED MIDDLEWARE PATTERNS
// ============================================================================

/**
 * Q15: How do you create custom middleware?
 *
 * Middleware pattern: (req, res, next) => { ... }
 */

// Authentication middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  // Verify token (simplified)
  req.user = { id: 1, name: 'User' }; // Attach to request
  next();
}

// Use the middleware
app.get('/protected', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Middleware that catches errors
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.get(
  '/data',
  asyncHandler(async (req, res) => {
    const data = await fetchData();
    res.json(data);
  })
);

// ============================================================================
// SECTION 9: NEXT STEPS & SUMMARY
// ============================================================================

/**
 * KEY CONCEPTS FOR BIG4 INTERVIEWS:
 *
 * 1. Middleware execution order matters!
 * 2. Error middleware needs 4 parameters (err, req, res, next)
 * 3. Use res.status() with appropriate codes
 * 4. Use res.json() for JSON responses
 * 5. Organize routes with express.Router()
 * 6. Always call next() in middleware (unless sending response)
 * 7. req.params for route params, req.query for query strings
 * 8. Use body parsing middleware before route handlers
 *
 * INTERVIEW TIP:
 * When asked about Express, draw a diagram of middleware flow!
 * Show that you understand the request-middleware-response cycle.
 */

/**
 * NEXT: Read 4-Interview-Questions-Answers.md
 * for 30+ detailed Express interview questions!
 */

module.exports = app;
