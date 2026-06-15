/**
 * REDIS CACHING - Interview Prep
 * Big4/MNC Frequency: ⭐⭐⭐⭐ (Asked in every senior fullstack round)
 *
 * Topics: Data Structures, Caching Patterns, Sessions, Pub/Sub, Rate Limiting
 */

const redis = require('ioredis'); // ioredis recommended over redis package

// ============================================================
// Q1: Redis vs Memcached — when to choose Redis?
// ============================================================
/*
Redis vs Memcached:
- Redis: Persistent, multiple data structures, pub/sub, scripting, clustering
- Memcached: In-memory only, simple key-value, multi-threaded

ALWAYS choose Redis in Big4/enterprise projects — richer feature set.
*/

// ============================================================
// Q2: Redis connection with error handling
// ============================================================
const redisClient = new redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  tls: process.env.NODE_ENV === 'production' ? {} : undefined, // SSL in prod
  retryStrategy: (times) => {
    if (times > 10) return null; // stop retrying after 10 attempts
    return Math.min(times * 100, 3000); // exponential backoff, max 3s
  },
  maxRetriesPerRequest: 3,
});

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.on('connect', () => console.log('Redis connected'));

// ============================================================
// Q3: Redis data structures and use cases
// ============================================================
/*
STRING:  Single value — session tokens, counters, simple cache
HASH:    Object with fields — user profile, product info
LIST:    Ordered collection — queue, recent items
SET:     Unique values — tags, followers, online users
SORTED SET: Ranked data — leaderboard, feed ranking
*/

// String — cache a user profile
async function cacheUserProfile(userId, userData) {
  await redisClient.setex(
    `user:${userId}:profile`,
    3600, // TTL: 1 hour in seconds
    JSON.stringify(userData)
  );
}

async function getCachedProfile(userId) {
  const cached = await redisClient.get(`user:${userId}:profile`);
  return cached ? JSON.parse(cached) : null;
}

// Hash — store user session data
async function setUserSession(sessionId, sessionData) {
  await redisClient
    .multi()
    .hset(`session:${sessionId}`, sessionData)
    .expire(`session:${sessionId}`, 86400) // 24h
    .exec();
}

async function getUserSession(sessionId) {
  return redisClient.hgetall(`session:${sessionId}`);
}

// Sorted Set — leaderboard
async function updateLeaderboard(userId, score) {
  await redisClient.zadd('leaderboard:global', score, userId);
}

async function getTopPlayers(count = 10) {
  // ZREVRANGE returns members in descending order
  return redisClient.zrevrange('leaderboard:global', 0, count - 1, 'WITHSCORES');
}

async function getUserRank(userId) {
  // ZREVRANK returns 0-indexed rank from highest
  return redisClient.zrevrank('leaderboard:global', userId);
}

// ============================================================
// Q4: Cache-Aside pattern (most common in production)
// ============================================================
/*
Cache-Aside (Lazy Loading):
1. Check cache first
2. Cache miss → query DB → write to cache → return
3. Cache hit → return immediately

PROS: Only cache what's actually needed
CONS: First request always slow (cache miss), potential stale data
*/
async function getProduct(productId) {
  const cacheKey = `product:${productId}`;

  // Step 1: Check cache
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return { ...JSON.parse(cached), source: 'cache' };
  }

  // Step 2: Cache miss — query DB
  const product = await Product.findByPk(productId);
  if (!product) return null;

  // Step 3: Write to cache with TTL
  await redisClient.setex(cacheKey, 300, JSON.stringify(product)); // 5 min TTL

  return { ...product.toJSON(), source: 'db' };
}

// Cache invalidation on update
async function updateProduct(productId, updates) {
  const product = await Product.update(updates, { where: { id: productId } });

  // Invalidate cache immediately after update
  await redisClient.del(`product:${productId}`);

  return product;
}

// ============================================================
// Q5: Rate Limiting with Redis (Sliding Window)
// ============================================================
/*
Sliding Window algorithm: more accurate than fixed window.
Fixed window: 100 req/min — user can do 100 at 00:59 + 100 at 01:00 = 200 req in 2s
Sliding window: exactly 100 per any 60-second window
*/

async function isRateLimited(identifier, limit = 100, windowSec = 60) {
  const key = `rate_limit:${identifier}`;
  const now = Date.now();
  const windowStart = now - windowSec * 1000;

  // Atomic Lua script — prevents race conditions
  const script = `
    redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', ARGV[1])  -- remove old entries
    local count = redis.call('ZCARD', KEYS[1])
    if count < tonumber(ARGV[2]) then
      redis.call('ZADD', KEYS[1], ARGV[3], ARGV[3])
      redis.call('EXPIRE', KEYS[1], ARGV[4])
      return 0  -- not limited
    end
    return 1  -- rate limited
  `;

  const result = await redisClient.eval(
    script, 1, key,
    windowStart,     // ARGV[1]: window start
    limit,           // ARGV[2]: limit
    now,             // ARGV[3]: current timestamp (score and member)
    windowSec        // ARGV[4]: key TTL
  );

  return result === 1;
}

// Express middleware using Redis rate limiter
function redisRateLimit(limit, windowSec) {
  return async (req, res, next) => {
    const identifier = req.ip; // or req.user?.id for authenticated users
    const limited = await isRateLimited(identifier, limit, windowSec);

    if (limited) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: windowSec,
      });
    }
    next();
  };
}

// ============================================================
// Q6: Pub/Sub for real-time features
// ============================================================
/*
Redis Pub/Sub use cases:
- Real-time notifications
- Cache invalidation across multiple server instances
- Event-driven communication between services
*/

// Publisher (e.g., order service)
async function publishOrderEvent(event) {
  const publisher = redisClient.duplicate();
  await publisher.publish('orders:events', JSON.stringify(event));
  publisher.disconnect();
}

// Subscriber (e.g., notification service)
async function subscribeToOrders(handler) {
  const subscriber = redisClient.duplicate();
  await subscriber.subscribe('orders:events');

  subscriber.on('message', (channel, message) => {
    const event = JSON.parse(message);
    handler(event);
  });

  return subscriber; // return for cleanup
}

// ============================================================
// Q7: Distributed lock with Redis (prevent race conditions)
// ============================================================
/*
Problem: Multiple servers processing the same job (e.g., sending a payment)
Solution: Redis distributed lock — only one instance can hold the lock

SET key value NX PX timeout
NX = only set if Not eXists
PX = expire in milliseconds
*/

async function acquireLock(lockKey, ttlMs = 5000) {
  const lockValue = require('crypto').randomUUID(); // unique value per lock
  const acquired = await redisClient.set(lockKey, lockValue, 'NX', 'PX', ttlMs);
  return acquired === 'OK' ? lockValue : null;
}

async function releaseLock(lockKey, lockValue) {
  // Atomic script — only release if WE own the lock (prevent releasing another process's lock)
  const script = `
    if redis.call('GET', KEYS[1]) == ARGV[1] then
      return redis.call('DEL', KEYS[1])
    end
    return 0
  `;
  return redisClient.eval(script, 1, lockKey, lockValue);
}

// Usage
async function processPayment(orderId, paymentData) {
  const lockKey = `lock:payment:${orderId}`;
  const lockValue = await acquireLock(lockKey, 10000); // 10s lock

  if (!lockValue) {
    throw new Error('Payment already being processed');
  }

  try {
    // Process payment — only one instance runs this at a time
    const result = await paymentGateway.charge(paymentData);
    return result;
  } finally {
    await releaseLock(lockKey, lockValue); // always release
  }
}

// ============================================================
// INTERVIEW QUESTIONS (Big4 Level)
/*
Q: What is cache stampede and how do you prevent it?
A: Cache stampede = many requests hit DB simultaneously when a popular key expires.
   Prevention:
   1. Lock: First request acquires lock, others wait — prevents duplicate DB queries
   2. Probabilistic early expiry (PER): Randomly refresh before TTL expires
   3. Background refresh: Async refresh before key expires

Q: How do you handle Redis failure gracefully?
A: Use try-catch around all Redis calls. Fall through to DB on failure.
   Never let Redis outage break your app — cache is an optimization, not a requirement.

Q: What is Redis persistence and when do you need it?
A: RDB (snapshot) vs AOF (append-only log).
   For sessions/cache: no persistence needed.
   For pub/sub events: AOF to prevent message loss on restart.

Q: What is the difference between Redis Cluster and Redis Sentinel?
A: Sentinel: High Availability with failover — one primary, replicas, auto-promotion.
   Cluster: Horizontal sharding — data split across multiple nodes.
   Use Sentinel for <50GB. Use Cluster for massive scale or high write throughput.
*/
