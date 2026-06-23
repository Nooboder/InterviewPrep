# MNC + Big 4 React Native Interview Crack Guide (Android + iOS)

## Goal
This guide is a complete roadmap to crack React Native interviews in MNCs and Big 4 style companies.

You will prepare in this order:
1. Most asked basics (easy)
2. Real implementation topics (medium)
3. Senior trade-offs and architecture (hard)

It is written for cross-platform mobile roles where interviewers expect Android and iOS awareness.

---

## 1) Interview Pattern You Should Expect

Most companies run 3 to 6 rounds.

1. Resume + screening call
2. JavaScript + React Native fundamentals
3. Coding round (DSA or practical RN coding)
4. Mobile architecture + performance
5. Android/iOS platform depth
6. Hiring manager + behavioral round

Big 4 and enterprise MNCs usually emphasize:
- Stability, debugging, release quality, maintainability
- Security, offline behavior, and scalability
- Clear communication and structured thinking

Product companies additionally emphasize:
- Performance under scale
- Trade-off discussion
- Strong coding quality in limited time

---

## 2) Most Asked Topics (Frequency Map)

### Tier A: Asked in almost every interview
- React Native architecture (Bridge, JSI, Fabric, TurboModules)
- FlatList performance and rerender control
- Hooks, stale closures, memoization
- State management choice (Redux vs Context vs Zustand)
- Navigation patterns and deep linking
- API calls, caching, pagination, error handling
- Android vs iOS differences and platform-specific code

### Tier B: Asked very often in mid/senior rounds
- Memory leaks, profiling, startup optimization
- Offline-first strategy and sync conflict handling
- Native module integration (Swift/Kotlin basics)
- Push notifications and background behavior
- Testing strategy (unit/integration/e2e)
- CI/CD and release process for both stores

### Tier C: Asked in strong product/senior rounds
- New Architecture migration strategy
- Large app modularization and monorepo strategy
- Observability (crash, logs, metrics, tracing)
- Security hardening and secret handling
- System design for high scale mobile workflows

---

## 3) Easy -> Medium -> Hard Preparation Path

## Easy (Week 1-2)
Objective: Build confident answers for high-frequency basics.

### What to master
1. RN rendering model and app lifecycle
2. Core hooks and component re-render triggers
3. FlatList basics and keyExtractor/getItemLayout
4. Navigation stack/tab flow + params
5. Platform.select and .ios/.android split
6. API integration with loading/error/empty states

### Must-answer questions
1. What happens from JS state update to native UI update?
2. FlatList vs ScrollView: when and why?
3. useMemo vs useCallback vs React.memo differences?
4. How do you avoid unnecessary re-renders?
5. How do you write one feature differently for Android and iOS?

### Easy coding drills
1. Build searchable paginated list with debounced API
2. Build login flow with form validation
3. Build settings screen with persistent theme/language

---

## Medium (Week 3-5)
Objective: Solve practical app problems interviewers ask in real projects.

### What to master
1. Performance profiling with Flipper and React DevTools
2. Memory leak detection (listeners/timers/subscriptions)
3. Robust networking (retry, cancellation, idempotency)
4. Offline queue and sync retry strategy
5. State architecture for medium-large app
6. Testing pyramid for RN apps

### Must-answer questions
1. App is slow on low-end Android. How do you diagnose and fix?
2. Chat list with images lags. What exact optimizations do you apply?
3. How do you handle flaky network and avoid duplicate API writes?
4. How do you design offline create/update/delete with sync?
5. What would you unit test vs integration test in RN?

### Medium coding drills
1. Infinite feed with skeleton loaders, pull-to-refresh, retry
2. Offline notes app with local storage + sync queue
3. Analytics event tracker with reusable hook and batching

---

## Hard (Week 6-8)
Objective: Demonstrate senior-level thinking and cross-platform depth.

### What to master
1. New Architecture (Fabric/TurboModules) practical impact
2. Native module boundary design and error handling
3. Secure auth/session handling and token lifecycle
4. Crash-free release strategy, feature flags, staged rollout
5. System design for large-scale app modules and teams
6. Trade-offs: velocity vs quality vs performance

### Must-answer questions
1. When should you write native module vs pure JS solution?
2. How do you migrate incrementally to New Architecture?
3. How do you reduce cold start from 4.5s to under 2.5s?
4. How do you design mobile observability stack?
5. How do you organize a large RN codebase for 10+ developers?

### Hard coding/design drills
1. Design notification system with deep links and permission flow
2. Build conflict-resolving offline sync engine (LWW vs merge)
3. Design ecommerce architecture for millions of users

---

## 4) Android + iOS Most-Asked Checklist

## Android Focus
1. Activity lifecycle and RN app lifecycle interactions
2. BackHandler, hardware back behavior, deep link intent filters
3. Gradle build variants, Proguard/R8, ABI splits
4. ANR basics and startup optimization on low-end devices
5. Foreground/background limits and push delivery behavior

## iOS Focus
1. App states (active/background/inactive) and lifecycle callbacks
2. Universal links, URL schemes, and deep link routing
3. CocoaPods, build configurations, bitcode/signing basics
4. Memory warnings, image memory handling, smooth animations
5. APNs permission flow and notification edge cases

## Cross-platform expectation
1. Same feature, platform-specific UX differences
2. Keyboard/safe area/notch handling
3. Permission model differences and fallback UX
4. Store release constraints and rollout strategy

---

## 5) Most Asked Coding Questions (Easy to Hard)

## Easy
1. Reverse string / palindrome / frequency map
2. Array dedupe / group by key / flatten nested array
3. Debounce and throttle implementation
4. Promise.all vs Promise.allSettled usage

## Medium
1. LRU cache implementation
2. Merge overlapping intervals
3. Infinite scroll with pagination and cancellation
4. Build reusable useFetch hook with retry/backoff

## Hard
1. Task scheduler with concurrency limit
2. Offline mutation queue with rollback
3. Real-time list update without full re-render
4. Design scalable client-side cache strategy

Interview tip: Speak while coding. Explain constraints, complexity, and trade-offs.

---

## 6) System Design Questions (Most Asked)

1. Design WhatsApp-like chat in RN
2. Design offline-first field-service app
3. Design ecommerce app with heavy catalog and filters
4. Design push notification orchestration with deep linking
5. Design analytics + crash monitoring architecture

Use this answer format every time:
1. Clarify requirements and scale assumptions
2. Draw high-level modules
3. Data flow (online + offline)
4. Failure modes and retries
5. Performance strategy
6. Security and privacy
7. Release/monitoring plan

---

## 7) Behavioral Questions (Big 4 Style)

Most asked prompts:
1. Tell me about a production incident you handled.
2. How did you improve app performance measurably?
3. Describe conflict with backend/design and resolution.
4. How do you ensure quality under deadlines?
5. What trade-off did you make and why?

Prepare STAR stories with metrics:
- Startup time improved by X%
- Crash-free sessions improved from A to B
- Screen load time reduced by X ms
- App size reduced by X MB

---

## 8) 30-60-90 Day Interview Preparation Plan

## If you have 30 days
1. Day 1-10: Tier A topics + easy coding
2. Day 11-20: Tier B topics + medium coding
3. Day 21-26: System design + hard topics
4. Day 27-30: Mock interviews + revision

## If you have 60 days
1. Week 1-3: Fundamentals + practical projects
2. Week 4-6: Performance + native integration
3. Week 7-8: System design + behavioral mastery
4. Last week: Company-specific mocks

## If you have 90 days
1. Month 1: Foundation + daily coding
2. Month 2: Advanced architecture + platform depth
3. Month 3: Mock rounds + targeted weak-area repair

---

## 9) Mock Interview Blueprint (Use Weekly)

1. 45 min: RN fundamentals + platform questions
2. 60 min: Coding problem (progressive hints)
3. 45 min: System design discussion
4. 20 min: Behavioral round
5. 10 min: Feedback and improvement tasks

Score each section out of 10:
- Problem understanding
- Code quality
- Optimization depth
- Communication clarity
- Decision-making trade-offs

---

## 10) Senior Developer Strategy To Crack Interviews

1. Do not memorize answers. Build explanation frameworks.
2. Convert every project experience into measurable stories.
3. Practice Android and iOS differences for each major feature.
4. In coding rounds, write clean baseline first, then optimize.
5. In design rounds, discuss failure, monitoring, and rollout.
6. Always ask clarifying questions before jumping to solution.
7. End each answer with trade-off awareness.

---

## 11) Final Revision Checklist (Last 72 Hours)

1. Revise Tier A + Tier B questions only
2. Solve 2 easy + 2 medium + 1 hard coding question
3. Practice 2 system design scenarios end-to-end
4. Rehearse 5 STAR behavioral stories with metrics
5. Prepare intro pitch (60 sec) and project deep dive (5 min)
6. Sleep well and avoid heavy new topics

---

## 12) Company-Specific Focus Split

## Big 4 / Enterprise MNC
- Emphasize process, testing, release discipline, reliability
- Expect architecture governance and stakeholder communication

## Product companies
- Emphasize performance, scale, ownership, impact metrics
- Expect deeper low-level debugging and optimization reasoning

## Service companies
- Emphasize speed, adaptability, clear fundamentals, delivery
- Expect broad but practical knowledge across app lifecycle

---

## One-Line Rule For Every Round
Show that you can build fast, ship safely, and scale thoughtfully on both Android and iOS.