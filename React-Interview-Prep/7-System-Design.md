// ============================================================
// REACT SYSTEM DESIGN & ARCHITECTURE
// ============================================================

/**
 * Real-world system design questions at Big4 companies
 * Focus: Scalability, maintainability, performance
 */

// ============================================================
// Q1: DESIGN A COMPONENT LIBRARY
// ============================================================

/*
Scenario: Build a reusable component library for your company's products

Key considerations:
1. Component API design
   - Props should be clear, typed (TypeScript)
   - Support composition over configuration
   - Avoid prop drilling

2. Theming system
   - CSS variables or CSS-in-JS?
   - Light/dark mode support
   - Customizable design tokens
   - Runtime vs build-time theming

3. Documentation & Storybook
   - Each component story
   - Props documentation
   - Usage examples
   - Accessibility guidelines

4. Performance
   - Code splitting
   - Lazy loading for large components
   - Memoization where needed
   - Bundle size monitoring

5. Testing
   - Unit tests for each component
   - Visual regression tests
   - Accessibility tests
   - Integration tests

Solution approach:
- Use Storybook for documentation
- Create base components (Button, Input, Card)
- Build composite components (Form, Modal)
- Version using semver
- Publish to npm
- Auto-generate documentation
- CI/CD for testing and deployment

Key files:
- Button.tsx (base component)
- Button.stories.tsx (Storybook)
- Button.test.tsx (tests)
- Button.css.ts or themed styles
- index.ts (exports)
*/

// ============================================================
// Q2: DESIGN A STATE MANAGEMENT SOLUTION
// ============================================================

/*
Scenario: App with complex state, 50+ pages, 100+ developers

Requirements:
1. Scalability
   - Handle growth without major refactoring
   - Multiple developers working independently
   - Easy to locate state logic
   - Prevent cascading updates

2. Developer experience
   - Simple mental model
   - Easy debugging
   - Time-travel debugging
   - Clear data flow

3. Performance
   - Selective subscriptions
   - Prevent unnecessary renders
   - Lazy load reducers/stores

4. Type safety
   - Full TypeScript support
   - Autocompletion
   - Runtime validation

Solutions comparison:

Redux:
- ✅ Predictable, mature ecosystem
- ✅ Time-travel debugging, devtools
- ✅ Clear separation of concerns
- ❌ Boilerplate heavy
- ❌ Steep learning curve

Redux Toolkit:
- ✅ Less boilerplate
- ✅ Built-in immer for mutations
- ✅ Slice-based organization
- ✅ Good for large apps

Zustand:
- ✅ Minimal API
- ✅ Excellent DX
- ✅ No provider needed (optional)
- ❌ Smaller ecosystem

Recoil:
- ✅ Flexible, granular state
- ✅ Suspense integration
- ✅ Good for complex apps
- ❌ Still experimental

Decision: Use Redux Toolkit for large enterprise app
- Clear patterns
- Great ecosystem
- Widely known
- Strong typing with TypeScript

Structure:
/store
  /slices
    - userSlice.ts
    - productsSlice.ts
    - uiSlice.ts
  - store.ts
  - hooks.ts
  - selectors.ts
*/

// ============================================================
// Q3: DESIGN AUTHENTICATION & AUTHORIZATION
// ============================================================

/*
Scenario: Secure authentication system for multi-tenant app

Architecture:
1. Authentication (who are you?)
   - Login with credentials
   - OAuth/SSO support
   - Token-based (JWT)
   - Session management

2. Authorization (what can you do?)
   - Role-based access control (RBAC)
   - Permission-based access control (PBAC)
   - Route protection
   - Component-level access

Implementation:

Step 1: Auth context provider
- Store user info
- Store token (secure storage)
- Handle login/logout
- Redirect on auth change

Step 2: Protected routes
- Check auth before rendering
- Redirect to login if needed
- Show loading state

Step 3: Token management
- Store in secure cookie (httpOnly)
- Refresh token rotation
- Handle token expiry
- Automatic logout

Step 4: Permission checks
- Can user access page?
- Can user see component?
- Can user perform action?

Code structure:
/auth
  - AuthContext.tsx
  - useAuth.ts
  - ProtectedRoute.tsx
  - usePermission.ts
  - authService.ts

API security:
- Send token in Authorization header
- Server validates token
- Return 401 on invalid token
- Handle refresh transparently
*/

// ============================================================
// Q4: DESIGN ERROR HANDLING & LOGGING
// ============================================================

/*
Scenario: Enterprise app needs comprehensive error tracking

Architecture:

1. Error boundaries
   - Catch render errors
   - Show fallback UI
   - Log to service

2. Async error handling
   - Try-catch in promises
   - Retry logic
   - Exponential backoff

3. API error handling
   - Specific error codes
   - User-friendly messages
   - Retry for network errors
   - Circuit breaker pattern

4. Logging system
   - Debug, info, warn, error levels
   - Structured logging
   - Send to logging service
   - Avoid logging PII

5. Monitoring & Alerting
   - Track error rates
   - Alert on critical errors
   - Performance metrics
   - User session tracking

Code:
/error
  - ErrorBoundary.tsx
  - errorHandler.ts
  - logger.ts
  - errorService.ts

Services:
- Sentry (error tracking)
- LogRocket (session replay)
- Datadog (monitoring)
- New Relic (performance)

Best practices:
- Don't show technical errors to users
- Provide actionable error messages
- Include context for debugging
- Handle retry scenarios gracefully
*/

// ============================================================
// Q5: DESIGN REAL-TIME COLLABORATION FEATURES
// ============================================================

/*
Scenario: Figma-like collaborative editing

Requirements:
1. Real-time sync
   - Multiple users editing simultaneously
   - Conflict resolution
   - Operational transformation or CRDT

2. Presence awareness
   - See other users' cursors
   - Show who's typing
   - User avatars and colors

3. Undo/Redo
   - Collaborative undo
   - Works across all users
   - Respects user's own changes

4. Permissions & Locks
   - Prevent simultaneous edits
   - Temporary locks
   - Handle connection loss

Architecture:

Frontend:
- Local state changes immediately (optimistic updates)
- Send changes to server
- Merge incoming changes
- Handle conflicts

Backend (WebSocket):
- Broadcast changes to all connected users
- Apply operational transformation
- Persist to database
- Handle disconnections

Conflict resolution:
- Last-write-wins (simple)
- Operational transformation (complex)
- CRDT (Conflict-free Replicated Data Type)

Libraries:
- Yjs (CRDT)
- Automerge (JSON CRDT)
- Socket.io (WebSocket)

Data flow:
User action → Local state update → Send to server → Broadcast to others → Update local state
*/

// ============================================================
// Q6: DESIGN PERFORMANCE MONITORING
// ============================================================

/*
Scenario: Monitor and optimize app performance at scale

Key metrics (Web Vitals):

1. LCP (Largest Contentful Paint) - < 2.5s
   - Time to render largest visual element
   - Optimize: Code splitting, image optimization

2. FID (First Input Delay) - < 100ms
   - Time from user interaction to response
   - Optimize: Break up long tasks, useTransition

3. CLS (Cumulative Layout Shift) - < 0.1
   - Visual stability
   - Optimize: Reserve space, avoid late font loads

4. INP (Interaction to Next Paint) - < 200ms
   - Response time for interactions
   - Similar to FID, more comprehensive

Custom metrics:
- Time to interactive (TTI)
- First paint (FP)
- First contentful paint (FCP)
- Total blocking time (TBT)

Implementation:

// web-vitals library
import { getLCP, getFID, getFCPID } from 'web-vitals';

getLCP(console.log);
getFID(console.log);

// Send to analytics
function logWebVital(metric) {
  sendToAnalytics({
    name: metric.name,
    value: metric.value,
    id: metric.id,
  });
}

Tools:
- Google Analytics 4 (Web Vitals tracking)
- Datadog RUM (Real User Monitoring)
- New Relic Browser
- Sentry Performance Monitoring

Performance budget:
- JS bundle: < 100KB
- LCP: < 2.5s
- FID: < 100ms

Optimization strategies:
1. Code splitting by route
2. Lazy load images
3. Defer non-critical JS
4. CSS optimization
5. Minimize re-renders
6. Database optimization
7. CDN for static assets
*/

// ============================================================
// Q7: DESIGN MICRO-FRONTENDS ARCHITECTURE
// ============================================================

/*
Scenario: Large organization with multiple teams, shared infrastructure

Requirements:
1. Team independence
   - Separate development
   - Independent deployment
   - Different tech stacks

2. Shared infrastructure
   - Design system
   - Authentication
   - State management

3. Integration
   - Seamless navigation
   - Shared URL structure
   - Cross-app communication

Approaches:

1. Module Federation (Webpack 5)
   - Share code between apps
   - Dynamic imports
   - Shared dependencies
   - Good: Flexible, modern

2. iframes
   - Isolation
   - Simple integration
   - Bad: Performance, complexity

3. Web Components
   - Framework agnostic
   - Custom elements
   - Shadow DOM isolation

4. Runtime integration
   - Register micro-apps
   - Mount to DOM
   - Share context

Architecture:

Main app:
- Routes to micro-apps
- Shared authentication
- Shared design system
- Navigation shell

Micro-apps:
- Standalone apps
- Use shared components
- Own route prefix
- Own state (+ shared state)

Communication:
- Window events for cross-app
- Shared state service
- URL for routing
- localStorage/sessionStorage

Example: single-spa library
- Register apps
- Mount/unmount based on route
- Shared dependencies
- Activity functions
*/

// ============================================================
// INTERVIEW TIPS FOR SYSTEM DESIGN
// ============================================================

/*
1. Clarify requirements
   - What's the scale? (users, data, requests)
   - Performance requirements?
   - Team size and skills?
   - Existing constraints?

2. Propose high-level architecture
   - Diagrams help
   - Trade-offs for each decision
   - Scalability considerations

3. Go deep on interesting parts
   - How would you handle X?
   - What about edge cases?
   - Performance optimization?

4. Discuss tradeoffs
   - Simplicity vs features
   - Performance vs maintainability
   - Build time vs runtime complexity

5. Show knowledge of:
   - Common patterns (Redux, Context, etc.)
   - Performance optimization
   - Testing strategies
   - DevOps concerns

6. Ask clarifying questions
   - Shows thoughtfulness
   - Prevents wrong assumptions
   - Demonstrates communication

7. Reference real examples
   - "Similar to how Figma handles..."
   - "Like React Router's code splitting..."
   - Shows you've built things
*/

export const SYSTEM_DESIGN_QUESTIONS = {
  COMPONENT_LIBRARY: 'Design a component library for enterprise',
  STATE_MANAGEMENT: 'State management for large app',
  AUTH_SECURITY: 'Authentication and authorization system',
  ERROR_HANDLING: 'Error handling and logging',
  REAL_TIME: 'Real-time collaboration features',
  PERFORMANCE: 'Performance monitoring and optimization',
  MICRO_FRONTENDS: 'Micro-frontends architecture',
};
