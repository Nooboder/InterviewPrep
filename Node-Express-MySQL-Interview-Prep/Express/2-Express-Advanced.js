/**
 * EXPRESS.JS ADVANCED - Interview Prep
 * Big4/MNC Frequency: ⭐⭐⭐⭐⭐
 *
 * Topics: Security Headers, Rate Limiting, CORS, File Upload,
 *         Input Validation, Graceful Shutdown, API Versioning
 */

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { body, param, validationResult } = require('express-validator');
const multer = require('multer');
const compression = require('compression');

const app = express();

// ============================================================
// Q1: Production security middleware stack (what Big4 expects)
// ============================================================
/*
Order matters! Security headers FIRST, then body parsers, then routes.
*/

// 1. Security headers — prevents XSS, clickjacking, MIME sniffing
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'nonce-{nonce}'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));

// 2. Compression — reduces response size by 70-80%
app.use(compression());

// 3. CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // allow cookies
  maxAge: 86400, // preflight cache 24h
};
app.use(cors(corsOptions));

// 4. Body parser with size limits (prevent DoS via huge payloads)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ============================================================
// Q2: Rate limiting — different strategies
// ============================================================

// Global rate limit
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,  // Return rate limit info in headers
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

// Strict limit for auth endpoints — prevents brute force
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // max 10 login attempts per IP per hour
  skipSuccessfulRequests: true, // don't count successful logins
  message: { error: 'Too many login attempts. Account locked for 1 hour.' },
});

app.use(globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// ============================================================
// Q3: Input validation with express-validator (production pattern)
// ============================================================
/*
Never trust user input. Validate at the API boundary.
Big4 auditors specifically look for injection vulnerability prevention.
*/

const createUserValidation = [
  body('email')
    .isEmail().normalizeEmail()
    .withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape() // sanitize HTML
    .withMessage('Name must be 2-100 characters'),
  body('age')
    .optional()
    .isInt({ min: 18, max: 120 })
    .withMessage('Age must be between 18 and 120'),
];

// Reusable validation error handler
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: 'Validation failed',
      details: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

app.post('/api/users', createUserValidation, handleValidationErrors, async (req, res) => {
  const { email, password, name } = req.body;
  // safe to use — already validated and sanitized
});

// ============================================================
// Q4: API Versioning strategies
// ============================================================
/*
3 Approaches:
1. URL versioning: /api/v1/users (most common — easy to test in browser)
2. Header versioning: Accept: application/vnd.api+json;version=1
3. Query param: /api/users?version=1

Big4 preference: URL versioning — explicit and easy to document in Swagger
*/

const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get('/users', (req, res) => res.json({ version: 1, users: [] }));
v2Router.get('/users', (req, res) => res.json({ version: 2, users: [], meta: { total: 0 } }));

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// ============================================================
// Q5: File upload with Multer (security-focused)
// ============================================================
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({
  storage: multer.memoryStorage(), // store in memory, then upload to S3/cloud
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return callback(new Error('File type not allowed'), false);
    }
    callback(null, true);
  },
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });

  // ALWAYS re-validate file contents server-side — never trust mimetype header
  // Use file-type library: const { fileTypeFromBuffer } = require('file-type');
  // const type = await fileTypeFromBuffer(req.file.buffer);

  // Upload to S3 or save to disk
  res.json({ url: 'https://cdn.example.com/file.jpg' });
});

// ============================================================
// Q6: Centralized error handling middleware
// ============================================================
/*
Express error handler: 4 parameters (err, req, res, next)
Must be registered LAST after all routes.
Big4 expects structured error responses, not leaking stack traces.
*/

class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // expected errors — don't crash
  }
}

// Async wrapper — eliminates try/catch in every route
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage with asyncHandler
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  res.json(user);
}));

// Global error handler
app.use((err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  }

  // Unexpected errors — log but don't expose internals
  console.error('Unexpected error:', err);
  res.status(500).json({
    error: 'An unexpected error occurred',
    ...(isDev && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ============================================================
// Q7: Graceful shutdown (production critical)
// ============================================================
/*
Why: In-flight requests should complete before the server dies.
K8s/Docker sends SIGTERM before killing the container.
Big4 production systems REQUIRE graceful shutdown.
*/

const server = app.listen(process.env.PORT || 3000);

function gracefulShutdown(signal) {
  console.log(`${signal} received. Starting graceful shutdown...`);

  server.close(async () => {
    console.log('HTTP server closed');

    try {
      // Close DB connections
      await sequelize.close();
      await redisClient.quit();
      console.log('DB connections closed');
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  });

  // Force exit after 30s if graceful shutdown hangs
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Kubernetes/Docker
process.on('SIGINT', () => gracefulShutdown('SIGINT'));   // Ctrl+C

// Unhandled promise rejections — log and exit (Node 15+ crashes by default)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// ============================================================
// Q8: Request logging with Morgan + correlation IDs
// ============================================================
/*
Correlation IDs: unique ID per request, passed through microservices
Allows tracing a request across all services in logs — mandatory at Big4
*/
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

// Assign unique ID to every request
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || uuidv4();
  res.setHeader('x-request-id', req.id);
  next();
});

// Add request ID to Morgan logs
morgan.token('id', (req) => req.id);
app.use(morgan(':id :method :url :status :response-time ms'));

// ============================================================
// INTERVIEW QUESTIONS (Big4 Level)
/*
Q: What is the difference between app.use() and app.get()?
A: app.use() matches any HTTP method and partial paths.
   app.get() only matches GET requests on exact paths.
   Middleware uses app.use(); routes use specific methods.

Q: How does Express middleware chain work?
A: Express processes middleware in registration order.
   Each middleware must call next() to pass control to the next middleware.
   Calling next(err) skips to the error handler.

Q: How do you prevent SQL injection in Express?
A: Use parameterized queries (Sequelize, knex) — never string concatenate SQL.
   Use express-validator to whitelist and sanitize inputs.

Q: What is the difference between 401 and 403?
A: 401 Unauthorized = not authenticated (send auth credentials)
   403 Forbidden = authenticated but not authorized (you don't have permission)

Q: How do you implement request timeout?
A: Use connect-timeout middleware or set server.timeout.
   Always implement at the infrastructure level (load balancer/nginx) too.
*/
