/**
 * TESTING - Jest, Supertest, Integration Tests
 * Big4/MNC Frequency: ⭐⭐⭐⭐⭐ (Big4 audits code coverage — this is non-negotiable)
 *
 * Topics: Unit Tests, Integration Tests, API Tests, Mocking, Coverage
 */

// ============================================================
// Q1: Testing pyramid — what Big4 expects
// ============================================================
/*
Testing Pyramid:
         /\
        /E2E\        (few — Playwright/Cypress)
       /------\
      /Integr. \     (some — Supertest hitting real DB)
     /----------\
    / Unit Tests  \  (many — Jest, isolated functions)
   /--------------\

Big4 standard: 80% code coverage minimum
Unit tests: fast, isolated, mock dependencies
Integration tests: test real HTTP + real DB (use test DB, not mocks)
E2E: simulate real user flows
*/

// ============================================================
// Q2: Unit testing pure functions
// ============================================================
// src/utils/validation.js
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function calculateDiscount(price, discountPercent) {
  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid input');
  }
  return price - (price * discountPercent) / 100;
}

module.exports = { isValidEmail, calculateDiscount };

// __tests__/utils/validation.test.js
const { isValidEmail, calculateDiscount } = require('../../src/utils/validation');

describe('isValidEmail', () => {
  test('returns true for valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  test.each([
    ['missing @', 'userexample.com'],
    ['missing domain', 'user@'],
    ['empty string', ''],
  ])('%s is invalid', (_, email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

describe('calculateDiscount', () => {
  test('applies 20% discount correctly', () => {
    expect(calculateDiscount(100, 20)).toBe(80);
  });

  test('throws on negative price', () => {
    expect(() => calculateDiscount(-10, 20)).toThrow('Invalid input');
  });

  test('throws on discount > 100', () => {
    expect(() => calculateDiscount(100, 110)).toThrow('Invalid input');
  });
});

// ============================================================
// Q3: Mocking external dependencies
// ============================================================
// src/services/emailService.js (the real service)
const nodemailer = require('nodemailer');

async function sendWelcomeEmail(to, name) {
  const transporter = nodemailer.createTransport({ /* smtp config */ });
  await transporter.sendMail({
    from: 'noreply@app.com',
    to,
    subject: `Welcome ${name}!`,
    text: `Hello ${name}, welcome to our platform.`,
  });
}

// src/services/userService.js
async function registerUser(db, emailService, userData) {
  const user = await db.create(userData);
  await emailService.sendWelcomeEmail(user.email, user.name);
  return user;
}

module.exports = { registerUser };

// __tests__/services/userService.test.js
const { registerUser } = require('../../src/services/userService');

describe('registerUser', () => {
  let mockDb;
  let mockEmailService;

  beforeEach(() => {
    // Reset mocks before each test
    mockDb = { create: jest.fn() };
    mockEmailService = { sendWelcomeEmail: jest.fn() };
  });

  test('creates user and sends welcome email', async () => {
    const userData = { email: 'test@test.com', name: 'Test User' };
    const createdUser = { id: 1, ...userData };
    mockDb.create.mockResolvedValue(createdUser);
    mockEmailService.sendWelcomeEmail.mockResolvedValue();

    const result = await registerUser(mockDb, mockEmailService, userData);

    expect(mockDb.create).toHaveBeenCalledWith(userData);
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
      'test@test.com',
      'Test User'
    );
    expect(result).toEqual(createdUser);
  });

  test('throws if DB creation fails', async () => {
    mockDb.create.mockRejectedValue(new Error('DB error'));

    await expect(registerUser(mockDb, mockEmailService, {})).rejects.toThrow('DB error');
    expect(mockEmailService.sendWelcomeEmail).not.toHaveBeenCalled();
  });
});

// ============================================================
// Q4: API Integration Tests with Supertest
// ============================================================
/*
Supertest: HTTP assertion library — tests Express routes end-to-end
WITHOUT spinning up a real server. Uses http.Server directly.
*/

// src/app.js (export app, don't call listen here!)
const express = require('express');
const userRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);

module.exports = app; // Export app without listening

// server.js (entry point — separate from app)
const app = require('./app');
app.listen(process.env.PORT || 3000);

// __tests__/integration/users.test.js
const request = require('supertest');
const app = require('../../src/app');
const { sequelize, User } = require('../../src/models');

describe('Users API', () => {
  // Setup: sync test DB before tests
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // use test DB via env
  });

  // Cleanup: clear data between tests
  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  // Teardown: close DB connection
  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/users', () => {
    test('creates user with valid data', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Alice', email: 'alice@test.com', password: 'SecurePass1!' })
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(Number),
        name: 'Alice',
        email: 'alice@test.com',
      });
      expect(response.body.password).toBeUndefined(); // never return password
    });

    test('returns 422 for invalid email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Alice', email: 'not-an-email', password: 'SecurePass1!' })
        .expect(422);

      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'email' })
        ])
      );
    });

    test('returns 409 for duplicate email', async () => {
      await User.create({ name: 'Alice', email: 'alice@test.com', password: 'hashed' });

      await request(app)
        .post('/api/users')
        .send({ name: 'Alice2', email: 'alice@test.com', password: 'SecurePass1!' })
        .expect(409);
    });
  });

  describe('GET /api/users/:id', () => {
    test('returns user by id', async () => {
      const user = await User.create({ name: 'Bob', email: 'bob@test.com', password: 'hashed' });

      const response = await request(app)
        .get(`/api/users/${user.id}`)
        .expect(200);

      expect(response.body.email).toBe('bob@test.com');
    });

    test('returns 404 for non-existent user', async () => {
      await request(app).get('/api/users/99999').expect(404);
    });
  });
});

// ============================================================
// Q5: Testing authenticated routes
// ============================================================
const jwt = require('jsonwebtoken');

// Helper to generate test tokens
function generateTestToken(userId, role = 'user') {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET || 'test-secret', {
    expiresIn: '1h',
  });
}

describe('Protected routes', () => {
  test('returns 401 without token', async () => {
    await request(app).get('/api/protected-route').expect(401);
  });

  test('returns 403 for insufficient role', async () => {
    const userToken = generateTestToken(1, 'user');
    await request(app)
      .delete('/api/admin/users/1')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);
  });

  test('allows admin access', async () => {
    const adminToken = generateTestToken(1, 'admin');
    await request(app)
      .delete('/api/admin/users/1')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });
});

// ============================================================
// Q6: Jest configuration for Node.js
// ============================================================
// jest.config.js
const config = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  // Use separate test DB
  globalSetup: './tests/setup.js',
  globalTeardown: './tests/teardown.js',
};

// tests/setup.js
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'myapp_test';
process.env.JWT_SECRET = 'test-secret';

// ============================================================
// INTERVIEW QUESTIONS (Big4 Level)
/*
Q: What is the difference between unit and integration tests?
A: Unit tests test a single function/module in isolation with mocked dependencies.
   Fast (ms), large quantity.
   Integration tests test multiple layers together (routes + DB) — slower,
   but catch issues unit tests miss (query bugs, constraint violations).

Q: Why should you NOT mock the database in integration tests?
A: Mocks can diverge from real DB behavior. A query that passes with a mock
   can fail against real MySQL due to constraints, type coercion, or transaction behavior.
   Use a dedicated test database with the same schema.

Q: How do you test asynchronous code in Jest?
A: Return the promise, use async/await, or use done callback.
   Always use await expect(fn()).rejects.toThrow() for rejection testing.

Q: What is code coverage and what does 100% coverage guarantee?
A: Coverage measures which lines/branches were executed during tests.
   100% coverage does NOT guarantee bug-free code — it only means every line
   was executed at least once. Tests can pass without asserting correct behavior.
   Aim for 80%+ and focus on business-critical paths.

Q: How do you test time-dependent code (setTimeout, Date.now)?
A: Use jest.useFakeTimers() — lets you control time.
   jest.advanceTimersByTime(1000) — fast-forward 1 second.
   jest.useRealTimers() — restore after test.
*/
