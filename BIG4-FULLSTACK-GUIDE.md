# Big4 Fullstack Developer — Complete Interview Guide
**Target: PwC | Deloitte | EY (and equivalent MNCs)**
**Stack: React + Node.js + MySQL + TypeScript**

---

## Current Prep Rating

| Codebase | Rating | Status |
|----------|--------|--------|
| React-Interview-Prep | **7.5 / 10** | Strong — mostly complete |
| Node-Express-MySQL | **6.5 / 10** | Gap filled — new files added |

**Combined Fullstack readiness: 7 / 10** → Get to 9/10 with this guide.

---

## What Was Added (New Files Created)

```
Node-Express-MySQL-Interview-Prep/
├── Integrations/
│   ├── 1-Authentication-JWT.js      ← JWT, OAuth 2.0, RBAC, bcrypt, refresh rotation
│   └── 3-Redis-Caching.js           ← Caching patterns, pub/sub, distributed locks
├── Express/
│   └── 2-Express-Advanced.js        ← Security headers, rate limiting, file upload, shutdown
├── Testing/
│   └── 1-Jest-Supertest.js          ← Unit tests, integration tests, API testing
├── TypeScript-Node/
│   └── 1-TypeScript-Node.ts         ← Generics, utility types, typed Express, Zod
├── MySQL/
│   └── 2-Advanced-SQL.sql           ← Window functions, CTEs, recursive queries
└── Full-Stack-Scenarios/
    ├── 1-System-Design.md           ← 5 enterprise scenarios (e-commerce, multi-tenant, etc.)
    └── 2-Behavioral-Big4.md         ← STAR method, Big4-specific questions, company profiles
```

---

## 4-Week Study Plan (Big4 Target)

### Week 1 — Node.js + Express Foundations
| Day | File | Focus |
|-----|------|-------|
| Mon | NodeJS-Core/1-Node-Fundamentals.js | Event loop, streams, module system |
| Tue | NodeJS-Core/5-Interview-Questions-Answers.md | Top 18 Node questions |
| Wed | Express/1-Express-Fundamentals.js | Middleware, routing, error handling |
| Thu | Express/2-Express-Advanced.js | Security, rate limiting, validation |
| Fri | Integrations/1-Authentication-JWT.js | JWT, OAuth, RBAC |
| Sat | TypeScript-Node/1-TypeScript-Node.ts | Types, generics, utility types |
| Sun | Review + practice coding 2-3 small Express APIs |

### Week 2 — Database + Integrations
| Day | File | Focus |
|-----|------|-------|
| Mon | MySQL/5-Interview-Questions-Answers.md | ACID, indexes, joins |
| Tue | MySQL/2-Advanced-SQL.sql | Window functions, CTEs |
| Wed | Integrations/3-Redis-Caching.js | Cache patterns, rate limiting |
| Thu | Testing/1-Jest-Supertest.js | Write actual tests for your Express API |
| Fri | Build: Create a typed Express API with auth + MySQL + Redis |
| Sat | System Design: Read 1-System-Design.md, practice explaining out loud |
| Sun | Behavioral: Read 2-Behavioral-Big4.md, prepare 5 STAR stories |

### Week 3 — React Deep Dive
| Day | File | Focus |
|-----|------|-------|
| Mon | React-Interview-Prep/1-React-Core-Concepts.js | Fiber, hooks, reconciliation |
| Tue | React-Interview-Prep/11-React-18-19-Latest.js | Server Components, Actions |
| Wed | React-Interview-Prep/Next-js/ | App Router, caching, Server Actions |
| Thu | React-Interview-Prep/4-State-Management.js + Redux/ | Redux Toolkit, Zustand |
| Fri | React-Interview-Prep/TypeScript/ + React-Interview-Prep/3-Advanced-Patterns.js | TS patterns |
| Sat | React-Interview-Prep/10-Security.js + 9-Accessibility-a11y.js | Security + a11y |
| Sun | React-Interview-Prep/6-Coding-Challenges.js — solve all 6 |

### Week 4 — Integration + Mock Interviews
| Day | Focus |
|-----|-------|
| Mon | Build a fullstack mini-project: Next.js + Express API + MySQL + Auth + TypeScript |
| Tue | System design practice: explain scenarios out loud (record yourself) |
| Wed | Mock coding round: 2-3 medium LeetCode (arrays, strings — Big4 rarely does hard) |
| Thu | Behavioral questions: practice with a friend or record yourself |
| Fri | PwC research + Deloitte research + EY research (specific practice areas) |
| Sat | Full mock interview with a timer |
| Sun | Rest + review weakest areas only |

---

## Big4 Interview Process

### PwC Technology Consulting
```
Round 1: Online assessment (aptitude + basic coding)
Round 2: Technical interview (React/Node fundamentals, 1-2 coding problems)
Round 3: Case study (system design OR business problem with tech solution)
Round 4: Partner interview (behavioral, why consulting, career goals)
```

### Deloitte Technology
```
Round 1: Online test (aptitude + technical MCQ)
Round 2: Technical screening (30-45 min, fundamentals)
Round 3: Technical panel (2 interviewers — coding + system design)
Round 4: HR + behavioral
```

### EY Technology Consulting / EY Parthenon
```
Round 1: Technical aptitude test
Round 2: Technical interview (focus on architecture, security, data)
Round 3: Case interview (unique to EY — tech + business combined)
Round 4: Partner/Director interview
```

---

## Topics You STILL Need (Not In Codebase)

### Add to React prep:
- **Playwright/Cypress E2E testing** — Big4 quality gates require E2E
- **Storybook** — enterprise component documentation standard
- **Micro-frontends with Module Federation** — large enterprise teams use this

### Add to Node prep:
- **Prisma ORM** — modern alternative to Sequelize, increasingly standard
  ```
  npm install prisma @prisma/client
  ```
- **WebSockets (ws/socket.io)** — real-time features always come up
- **Bull/BullMQ** — background job queues (common in enterprise)
- **OpenAPI/Swagger** — Big4 expects documented APIs

### General fullstack gaps:
- **Docker + docker-compose** — know how to containerize your app
  (Docker file already covered in React prep, apply it to Node)
- **GitHub Actions CI/CD** — basic pipeline for lint + test + build
- **Environment management** — `.env`, dotenv, secrets management

---

## Top 30 Questions Big4 Actually Asks

### Node.js
1. Explain the Node.js event loop phases
2. What is the difference between `process.nextTick` and `setImmediate`?
3. How do you handle unhandled promise rejections?
4. What are streams and when do you use them?
5. How do you scale a Node.js application horizontally?

### Express/API
6. How does Express middleware chain work?
7. What is the difference between 401 and 403?
8. How do you prevent SQL injection in an Express API?
9. Explain CORS and how you configure it
10. How do you implement rate limiting?

### Authentication
11. How does JWT authentication work?
12. What is refresh token rotation and why is it important?
13. What is OAuth 2.0 and what is PKCE?
14. Why use bcrypt instead of SHA-256 for passwords?
15. Session vs JWT — when do you choose each?

### React
16. What is React Fiber and how does reconciliation work?
17. When do you use useCallback vs useMemo?
18. What is the difference between Server Components and Client Components in Next.js?
19. How do you prevent unnecessary re-renders?
20. Explain the React rendering phases

### Database
21. What is ACID and when do transactions matter?
22. Explain database normalization (1NF, 2NF, 3NF)
23. How do you optimize a slow SQL query?
24. What is the N+1 problem and how do you solve it?
25. Explain indexes — when to create, when NOT to create

### TypeScript
26. Interface vs Type — when do you use each?
27. What is a generic type and give a real use case
28. What does `strict: true` enable?
29. What is `unknown` vs `any`?
30. How do you type an Express request with custom properties?

---

## Quick Reference: Tools That Impress Big4

| Category | Tool | Why It Impresses |
|----------|------|-----------------|
| Validation | Zod | Type-safe, runtime validation, schema-first |
| ORM | Prisma | Type-safe queries, migrations, modern |
| Testing | Supertest + Jest | Real integration tests, not mocks |
| API Docs | Swagger/OpenAPI | Shows enterprise mindset |
| Logging | Winston/Pino | Structured JSON logs for aggregation |
| Auth | JWT + refresh rotation | Shows security awareness |
| Caching | Redis with patterns | Shows scalability thinking |
| TypeScript | Strict mode | Shows code quality discipline |

---

## The One Thing Most Candidates Miss at Big4

Big4 interviews are 40% technical, 60% "can I trust this person in front of a client?"

Every technical answer should end with:
- A trade-off you considered
- What you would do differently at scale
- How you communicated the decision to stakeholders

**Example**: "I used JWT for authentication because it's stateless and scales well.
The trade-off is that you can't invalidate tokens immediately — I addressed this 
by using short expiry (15 minutes) with refresh token rotation. In a higher-security context
like banking, I'd recommend sessions with Redis instead."

That answer alone separates you from 90% of candidates.
