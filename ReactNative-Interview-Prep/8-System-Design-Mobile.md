# 🏗️ React Native System Design - Mobile Architecture Patterns

## SYSTEM DESIGN SCENARIO 1: E-Commerce Mobile App (Scalable)

### Problem Statement
Design a scalable e-commerce mobile app for millions of users. Consider performance, offline support, real-time updates, and different device capabilities.

### Constraints
- iOS and Android support
- Works on low-end and high-end devices
- Offline functionality required
- Real-time product updates
- 5+ pages with complex navigation
- Heavy images and media

### Solution Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                       │
│  (Home, Product, Cart, Checkout, Orders - React Nav)   │
├─────────────────────────────────────────────────────────┤
│                STATE MANAGEMENT                         │
│  ┌──────────────┐  ┌──────────┐  ┌──────────────┐     │
│  │ Redux Store  │  │ Local    │  │ AsyncStorage │     │
│  │ (Redux)      │  │ Storage  │  │ (Persistence)│     │
│  └──────────────┘  └──────────┘  └──────────────┘     │
├─────────────────────────────────────────────────────────┤
│              NETWORK & CACHING LAYER                    │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Axios    │  │ React Query  │  │ Interceptors │     │
│  │ (HTTP)   │  │ (Caching)    │  │ (Auth, Error)│     │
│  └──────────┘  └──────────────┘  └──────────────┘     │
├─────────────────────────────────────────────────────────┤
│              OFFLINE-FIRST LAYER                        │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │ SQLite/Realm │  │ Sync Engine  │                   │
│  │ (Local DB)   │  │ (Diff Sync)  │                   │
│  └──────────────┘  └──────────────┘                   │
├─────────────────────────────────────────────────────────┤
│                  NATIVE LAYER                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ iOS      │  │ Android  │  │ Shared   │            │
│  │ (Swift)  │  │ (Kotlin) │  │ Bridge   │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
```

### Key Design Decisions

**1. State Management Strategy**
```
Global State (Redux):
├── User (auth, profile)
├── Products (catalog, cache)
├── Cart (items, total)
└── Orders (history)

Local State (useState):
├── UI state (modal open/close)
├── Form state (search input)
└── Loading states
```

**2. Image Optimization**
```javascript
// Strategy: Serve different sizes
- Thumbnail: 100x100 (low quality)
- List view: 300x300 (medium quality)
- Detail view: 800x800 (high quality)

// Cache strategy:
- Cache thumbnails aggressively (7 days)
- Cache medium quality (3 days)
- Cache high quality on demand

// Implementation:
- Use fast-image library
- CDN with resizing endpoints
- Progressive loading
```

**3. Offline-First Approach**
```javascript
// Local first:
- Check local cache first
- If found and fresh, use it
- If stale, fetch in background
- If offline, show cached version

// Sync:
- Queue all mutations offline
- Sync when online
- Conflict resolution (server wins)
- User notification on success/failure
```

**4. Navigation Structure**
```
Root Navigator (Stack)
├── Auth Stack (Login, Register)
├── App Stack
│   ├── Home (Tab)
│   ├── Products (Tab)
│   │   └── ProductDetail (Modal)
│   ├── Cart (Tab)
│   │   └── Checkout (Stack)
│   │       └── OrderConfirmation
│   └── Account (Tab)
│       ├── Profile
│       ├── Orders
│       └── Settings
```

**5. Performance Considerations**
```
Bundle Size: ~5-8 MB
- Code split by route
- Remove unused dependencies
- Lazy load screens

Startup Time: <3 seconds
- Use Hermes
- Optimize images
- Lazy initialize services

Memory:
- Use FlatList with optimization
- Clean up listeners
- Limit cache size
- Pagination for lists
```

---

## SYSTEM DESIGN SCENARIO 2: Real-Time Chat Application

### Problem Statement
Design a real-time chat app with message history, typing indicators, read receipts, and image sharing.

### Solution Architecture

```
                    React Navigation
                    ├── Chats List
                    ├── Chat Room
                    └── Profile

                    State Management
                    ├── Active Chat
                    ├── Users
                    ├── Messages
                    └── UI State

                    WebSocket Connection
                    ├── Real-time events
                    ├── Typing indicators
                    └── Read receipts

                    Storage
                    ├── Realm DB
                    │   ├── Messages
                    │   ├── Users
                    │   └── Chats
                    └── AsyncStorage
                        └── Settings
```

### Key Features

**1. Real-Time Messaging**
```javascript
// WebSocket connection for:
- Incoming messages
- Typing indicators
- Read receipts
- Online status

// Fallback to polling if WebSocket fails

// Message queue for offline scenarios:
- Store messages locally
- Send when online
- Server acknowledges receipt
```

**2. Message Storage**
```javascript
// Realm schema:
User {
  id: string (primary)
  name: string
  avatar: string
  status: 'online' | 'offline'
  lastSeen: Date
}

Chat {
  id: string (primary)
  participants: User[]
  lastMessage: Message
  unreadCount: number
  updatedAt: Date
}

Message {
  id: string (primary)
  chatId: string
  userId: string
  text: string
  images: Image[]
  sentAt: Date
  readAt: Date | null
  status: 'sending' | 'sent' | 'read'
}
```

**3. Pagination & Performance**
```javascript
// Load messages in pages:
- Initial load: Last 50 messages
- Load older: Previous 50
- New messages: Real-time push

// FlatList optimization:
- invertible={true} for inverted order
- removeClippedSubviews={true}
- getItemLayout for known heights
- maxToRenderPerBatch={10}
```

**4. Typing Indicators**
```javascript
// Debounced typing event:
- User types → Debounce 300ms
- Send typing event
- Server broadcasts to others
- Show "User typing..." indicator
- Clear after 3 seconds of inactivity
```

---

## SYSTEM DESIGN SCENARIO 3: Offline-First Notes App

### Problem Statement
Design a notes app that works completely offline with automatic sync when online. Handle conflicts and support rich text editing.

### Architecture

```
User writes note offline
         ↓
Save to local Realm DB
         ↓
Queue sync operation
         ↓
UI shows local version
         ↓
Device comes online
         ↓
Sync engine:
- Check for conflicts
- Merge if possible
- Show conflict resolution
         ↓
Update server
         ↓
Sync other devices
```

### Conflict Resolution Strategy

**Last-Write-Wins (Simple)**
```
Server version: "Hello World" (edited 2:00 PM)
Local version: "Hello" (edited 2:05 PM, offline)
Result: "Hello" (because local is newer)
```

**Operational Transformation (Complex)**
```
Server version at sync: "Hello World"
Server changes: Insert "Beautiful " at position 6
Local changes: Delete 6 chars (World)
Result: Merge operations intelligently
```

**Implementation Strategy:**
- Use timestamp comparison
- Server timestamp as source of truth
- Ask user for conflicts
- Provide merge preview

---

## SYSTEM DESIGN SCENARIO 4: Performance Monitoring Dashboard

### Problem Statement
Design a system to monitor React Native app performance in production, track crashes, and analyze user behavior.

### Solution

```
┌─────────────────────────────────┐
│   React Native App              │
│   - Performance monitoring      │
│   - Crash tracking              │
│   - User analytics              │
└──────────────┬──────────────────┘
               │
               ↓
┌─────────────────────────────────┐
│   Monitoring SDK                │
│   - Collect metrics             │
│   - Batch data                  │
│   - Local caching               │
└──────────────┬──────────────────┘
               │
               ↓
┌─────────────────────────────────┐
│   Analytics Server              │
│   - Process events              │
│   - Aggregate data              │
│   - Store in DB                 │
└──────────────┬──────────────────┘
               │
               ↓
┌─────────────────────────────────┐
│   Visualization Dashboard       │
│   - Real-time metrics           │
│   - Crash analysis              │
│   - User behavior               │
└─────────────────────────────────┘
```

### Metrics to Track

**Performance:**
- App startup time
- Screen load time
- FPS (Frames Per Second)
- Memory usage
- Battery consumption
- Network latency

**Reliability:**
- Crash rate
- Error rate
- ANR (App Not Responding)
- Frozen frames

**User Analytics:**
- DAU/MAU
- Session duration
- Feature usage
- Funnel analysis
- Retention

### Implementation

```javascript
// Send analytics events:
Analytics.trackEvent('screen_view', {
  screen_name: 'ProductDetail',
  product_id: '123',
  duration: 2500,
});

// Track performance:
PerformanceMonitor.startSpan('api_call');
// ... make API call
PerformanceMonitor.endSpan('api_call');

// Track crashes:
CrashReporting.captureException(error);
```

---

## SYSTEM DESIGN SCENARIO 5: Cross-Device Synchronization

### Problem Statement
Design a system where users can start a task on phone, continue on tablet, and sync seamlessly across devices.

### Architecture

```
Device 1 (Phone)
- Make change to task
- Store locally
- Send to server
- Server broadcasts to other devices
           ↓
Server (Central)
- Receive update from Phone
- Process & validate
- Broadcast to other devices
- Store in DB
           ↓
Device 2 (Tablet)
- Receive update
- Merge with local state
- Update UI
```

### Sync Protocol

**Three-way merge:**
```
Server version (base): { text: "Hello", done: false }
Device A change: { text: "Hello World", done: false }
Device B change: { text: "Hello", done: true }

Merge result: { text: "Hello World", done: true }
(Text from A, Status from B)
```

**Change tracking:**
```javascript
// Each change has:
- ID (unique)
- Timestamp
- Device ID
- Operation (add/edit/delete)
- Data
- Checksum (detect conflicts)
```

---

## SYSTEM DESIGN SCENARIO 6: Background Sync & Push Notifications

### Problem Statement
Design a system where background jobs sync data and push notifications work reliably across iOS and Android.

### Architecture

```
Event Triggered
├── User action
├── Background refresh (iOS)
├── Work request (Android)
└── Push notification

           ↓

Background Task Queued
├── Persist to local DB
├── Register with native
└── Set retry policy

           ↓

Native Scheduler
├── iOS: BGProcessingTask
├── Android: WorkManager
└── Respects device constraints

           ↓

Execute Task
├── Check network
├── Retry if failed
├── Notify user if needed
└── Clean up

           ↓

Push Notification
├── iOS: APNs
├── Android: FCM
├── Handle deep link
└── Update UI
```

### Implementation

**Background Sync:**
```javascript
// Register background task:
registerBackgroundTask({
  name: 'SyncData',
  interval: 15 * 60 * 1000, // 15 minutes
  requiresNetwork: true,
  requiresCharging: false,
});

// Sync logic:
async function syncData() {
  const changes = await getLocalChanges();
  await pushToServer(changes);
  await updateLocalCache();
}
```

**Push Notifications:**
```javascript
// Firebase Cloud Messaging:
const token = await messaging().getToken();
sendTokenToServer(token);

// Listen for messages:
messaging().onMessage((message) => {
  displayNotification(message.data);
});

// Handle notification open:
messaging().onNotificationOpenedApp((message) => {
  navigate(message.data.screen);
});
```

---

## 🎯 Design Questions Practice

For each scenario, be ready to answer:

1. **Scalability**
   - How to handle 1M users?
   - How to reduce server load?
   - How to distribute data?

2. **Performance**
   - What's the memory footprint?
   - What's the startup time?
   - How to optimize?

3. **Reliability**
   - What if server is down?
   - What if network is slow?
   - How to handle conflicts?

4. **Security**
   - How to protect data?
   - How to handle authentication?
   - How to prevent unauthorized access?

5. **Trade-offs**
   - Consistency vs Availability
   - Performance vs Accuracy
   - Storage vs Speed
   - Battery vs Freshness

---

## 💡 Tips for System Design Interview

1. **Ask clarifying questions** - Don't assume
2. **Think out loud** - Explain your reasoning
3. **Consider trade-offs** - No perfect solution
4. **Discuss alternatives** - Show flexibility
5. **Focus on mobile constraints** - Battery, memory, network
6. **Real-world examples** - Reference actual apps
7. **Scalability from start** - Design for growth
8. **Test your design** - Think through edge cases

---

## 📌 Key Takeaways

- **Architecture matters** - Good design prevents problems
- **Offline-first** - Mobile users expect it
- **Performance first** - Low-end devices are common
- **Sync is hard** - Think through conflicts early
- **Real-time is complex** - Use proven libraries
- **Background tasks** - Important for user engagement
- **Test thoroughly** - Different devices, networks, states

---

Good luck with system design interviews! 🚀
