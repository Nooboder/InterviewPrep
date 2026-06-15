# Full-Stack System Design — Big4 Interview Guide
**Frequency: ⭐⭐⭐⭐⭐ (PwC/Deloitte/EY always ask at least one system design)**

## How Big4 System Design Differs From Product Companies

Big4 consulting firms focus on **enterprise patterns**:
- Scalability under business growth (not 1M req/s but 100K users → 10M)
- Security and compliance (GDPR, SOC2, HIPAA awareness)
- Maintainability and team handoff
- Cost optimization (cloud spend matters to clients)

---

## Framework: RADIO (for every system design answer)

**R** — Requirements (functional + non-functional)  
**A** — API Design  
**D** — Data Model  
**I** — Infrastructure / High-Level Architecture  
**O** — Optimization (scale, cache, bottlenecks)

---

## Scenario 1: Design a REST API for an E-Commerce Platform

### Requirements
- Users can browse products, add to cart, place orders
- 100K daily active users, peak 10K concurrent
- High availability (99.9% uptime = 8.7 hours downtime/year)
- PCI DSS compliance for payments

### API Design
```
POST   /api/v1/auth/login
GET    /api/v1/products?page=1&limit=20&category=electronics
GET    /api/v1/products/:id
POST   /api/v1/cart/items          { productId, quantity }
DELETE /api/v1/cart/items/:id
POST   /api/v1/orders              { addressId, paymentToken }
GET    /api/v1/orders/:id
GET    /api/v1/orders?userId=:id&page=1
```

### Database Schema
```sql
users:    id, email, password_hash, role, created_at
products: id, name, description, price, stock_count, category_id
orders:   id, user_id, status, total_amount, created_at
order_items: id, order_id, product_id, quantity, unit_price
cart:     id, user_id, product_id, quantity
addresses: id, user_id, street, city, country
```

### Architecture
```
Client → CDN (static assets) → Load Balancer (nginx)
                                      ↓
                            [Node.js API Cluster]
                            /          |          \
                      Auth Service  Product API  Order Service
                           |              |             |
                         Redis         MySQL        MySQL + 
                        (sessions)   (products)   (orders, transactions)
                                          |
                                     S3 (product images)
```

### Key Design Decisions
- **Horizontal scaling**: Multiple Node.js instances behind nginx load balancer
- **Database**: MySQL with read replicas for product catalog (heavy reads)
- **Caching**: Redis for sessions, product catalog cache (TTL 5 min), rate limiting
- **Stock management**: Optimistic locking on `stock_count` to prevent overselling
- **Payments**: Never store card data — use Stripe/tokenization. Webhook for async confirmation.
- **Order state machine**: PENDING → CONFIRMED → SHIPPED → DELIVERED (never skip states)

### Stock Race Condition Solution
```sql
-- Atomic stock decrement — prevents overselling without application-level locks
UPDATE products 
SET stock_count = stock_count - ?
WHERE id = ? AND stock_count >= ?;
-- Check affected_rows == 1, else rollback
```

---

## Scenario 2: Design a Role-Based Multi-Tenant SaaS (Deloitte Favorite)

### Requirements
- Multiple organizations (tenants), each with own users, data, roles
- Roles: SuperAdmin, OrgAdmin, Manager, Viewer
- GDPR compliant — tenant data must be isolatable for deletion

### Multi-Tenancy Strategies
| Strategy | Isolation | Cost | Complexity |
|----------|-----------|------|------------|
| Separate DB per tenant | High | High | High |
| Shared DB, separate schema | Medium | Medium | Medium |
| Shared DB, shared schema + tenant_id | Low | Low | Low |

**Big4 answer**: Shared DB + `tenant_id` column for most cases.
Separate DB only for enterprise clients with compliance requirements.

### Schema (Row-Level Tenant Isolation)
```sql
organizations: id, name, plan, created_at
users: id, org_id, email, password_hash, global_role
user_roles: id, user_id, org_id, role  -- RBAC per org
projects: id, org_id, name, created_at  -- ALL tables have org_id
documents: id, org_id, project_id, title, content
```

### Middleware for Tenant Isolation
```javascript
// Every authenticated request resolves the tenant
async function tenantMiddleware(req, res, next) {
  const orgId = req.user.orgId; // from JWT
  const org = await Organization.findByPk(orgId);
  if (!org) return res.status(403).json({ error: 'Organization not found' });
  req.org = org;
  next();
}

// Scoped model queries — always filter by org_id
class ProjectRepository {
  constructor(orgId) { this.orgId = orgId; }
  
  findAll() {
    return Project.findAll({ where: { orgId: this.orgId } });
  }
  
  findById(id) {
    return Project.findOne({ where: { id, orgId: this.orgId } });
    // If org_id doesn't match — returns null, not 403 — prevents tenant enumeration
  }
}
```

---

## Scenario 3: Design a Real-Time Notification System

### Requirements
- Push notifications to users when events occur (new message, order update)
- 50K concurrent users, low latency (<1s delivery)
- Notification history, mark as read

### Technology Choice
```
WebSockets vs SSE vs Long Polling vs Polling

WebSockets: Bi-directional, persistent connection — best for chat
SSE (Server-Sent Events): Server → Client only, simpler, HTTP/2 multiplexed — best for notifications
Long Polling: HTTP, works everywhere — acceptable fallback
Short Polling: Worst — wasteful, don't use

ANSWER: Use SSE for notifications (simpler, less overhead), WebSockets only if you need client→server too
```

### SSE Implementation
```javascript
// Server-side SSE
app.get('/api/notifications/stream', authenticate, (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const userId = req.user.userId;
  
  // Subscribe to Redis pub/sub for this user
  const subscriber = redisClient.duplicate();
  subscriber.subscribe(`user:${userId}:notifications`);
  
  subscriber.on('message', (channel, message) => {
    res.write(`data: ${message}\n\n`);
  });

  // Cleanup on client disconnect
  req.on('close', () => {
    subscriber.unsubscribe();
    subscriber.quit();
  });
});

// Publishing a notification
async function sendNotification(userId, notification) {
  // Save to DB
  await Notification.create({ userId, ...notification });
  
  // Push to active SSE connections via Redis pub/sub
  await redisPublisher.publish(
    `user:${userId}:notifications`,
    JSON.stringify(notification)
  );
}
```

### Architecture for Scale
```
API Server → Redis Pub/Sub → Multiple SSE Server instances
                ↑
         Event Publishers
      (Order Service, Chat Service, etc.)
```
Redis Pub/Sub decouples notification publishing from delivery — any service can emit, any SSE server delivers to the right user.

---

## Scenario 4: Design an Authentication Service (PwC Favorite)

### Requirements
- Support email/password, Google OAuth, magic links
- MFA (TOTP/SMS)
- Session management, device tracking
- Audit log (GDPR/SOC2 requirement)

### Components
```
Auth Service:
├── POST /auth/register
├── POST /auth/login          → returns access_token + sets refresh_token cookie
├── POST /auth/refresh        → refresh token rotation
├── POST /auth/logout
├── GET  /auth/google         → OAuth redirect
├── GET  /auth/google/callback
├── POST /auth/mfa/setup      → generate TOTP QR code
├── POST /auth/mfa/verify     → verify TOTP code
└── GET  /auth/audit-log      → admin only
```

### Audit Logging (mandatory at Big4)
```sql
audit_logs: id, user_id, action, ip_address, user_agent, timestamp, metadata (JSON)
-- Actions: LOGIN, LOGOUT, PASSWORD_CHANGE, MFA_ENABLED, PERMISSION_CHANGE
-- Immutable — no UPDATE/DELETE allowed on this table
-- Retention: 1 year minimum (SOC2), 7 years (financial audit)
```

---

## Scenario 5: Caching Strategy

### When to cache and what cache policy to use
```
Cache-Aside (Lazy Loading) — read-heavy data
1. Check cache → hit? return.  miss? query DB → write to cache → return
USE FOR: product catalog, user profiles, reference data

Write-Through — data that must always be consistent
Write to cache AND DB simultaneously
USE FOR: session data, shopping cart

Write-Behind (Write-Back) — high-write throughput
Write to cache immediately, async flush to DB
USE FOR: view counts, analytics, non-critical data
RISK: data loss if cache dies before flush

TTL Strategy:
- Product catalog: 5-15 minutes
- User session: 24 hours (or session duration)
- Rate limit counters: 1 hour window
- OTP codes: 10 minutes
```

---

## Non-Functional Requirements Checklist (Big4 Expects These)

| Concern | Solution |
|---------|----------|
| High Availability | Load balancer, health checks, redundant DB |
| Scalability | Horizontal scaling, DB read replicas, Redis cache |
| Security | HTTPS, helmet, rate limiting, input validation, RBAC |
| Observability | Structured logging (Winston), APM (Datadog), health endpoints |
| GDPR | Data encryption, right-to-deletion, audit logs, consent tracking |
| Performance | Pagination, DB indexes, response compression, CDN |
| Resilience | Retry with backoff, circuit breaker, graceful degradation |

---

## Common Big4 Follow-Up Questions

**Q: How would you handle a DB migration with zero downtime?**
A: Expand-Contract pattern: 
1. Add new column as nullable (no downtime)
2. Backfill data in batches
3. Add NOT NULL constraint after backfill
4. Remove old column in next release

**Q: How do you monitor your Node.js application in production?**
A: 
- Health endpoint: `GET /health` returns DB status, Redis status, uptime
- Structured logging with Winston/Pino (JSON format for log aggregation)
- APM: Datadog/New Relic for distributed traces
- Alerts on error rate spike, p99 latency, CPU/memory

**Q: What is a circuit breaker and when do you use it?**
A: Prevents cascading failures when a downstream service is slow/down.
States: Closed (normal) → Open (fail fast) → Half-Open (test recovery)
Use when calling external APIs, payment providers, or other microservices.

**Q: How do you handle idempotency in payment APIs?**
A: Client sends unique `Idempotency-Key` header. Server checks if key was processed before.
If yes, return cached response. If no, process and save result.
Prevents double-charging if client retries due to network timeout.
