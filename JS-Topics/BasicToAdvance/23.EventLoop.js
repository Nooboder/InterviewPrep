// 🔁 JavaScript Event Loop & Execution Context Connection

// (One of the MOST IMPORTANT interview topics)

// 1️⃣ Big Picture (Mental Model)
// Call Stack (Execution Contexts)
//         ↑
//         │
//    Event Loop
//         │
//         ↓
// Task Queues (Callback Queues)

// 🧠 Execution Context runs code
// 🧠 Event Loop decides when queued code can run

// 2️⃣ Components Involved
// 🔹 Call Stack

// Stores Execution Contexts

// Executes code synchronously

// LIFO (Last In, First Out)

// 🔹 Web APIs / Node APIs

// Handles async operations

// setTimeout, fetch, DOM events, promises

// 🔹 Queues
// Queue	Contains
// Microtask Queue	Promise.then, catch, finally, queueMicrotask
// Macrotask Queue	setTimeout, setInterval, I/O, UI events
// 🔹 Event Loop

// Monitors Call Stack

// Pushes tasks into stack only when stack is empty

// 3️⃣ Step-by-Step Flow

// Global Execution Context pushed to stack

// Synchronous code executes

// Async code → sent to Web APIs

// Completed async callbacks → queues

// Event Loop checks:

// Stack empty?

// Microtasks first

// Then Macrotasks

// Callback pushed as new execution context

// 4️⃣ Basic Example
// console.log("A");

// setTimeout(() => console.log("B"), 0);

// console.log("C");

// ✅ Output

// A
// C
// B

// 🧠 setTimeout waits in macrotask queue.

// 5️⃣ Execution Context Creation (IMPORTANT)
// setTimeout(function cb() {
//   console.log("Hello");
// }, 0);

// 🧠 When cb enters stack:

// New Function Execution Context created

// Runs

// Pops from stack

// 6️⃣ Microtask Priority (CRITICAL)
// console.log("Start");

// setTimeout(() => console.log("Timeout"), 0);

// Promise.resolve().then(() => console.log("Promise"));

// console.log("End");

// ✅ Output

// Start
// End
// Promise
// Timeout

// 🧠 Microtasks always run before macrotasks.

// 7️⃣ Nested Microtasks
// Promise.resolve().then(() => {
//   console.log("A");
//   Promise.resolve().then(() => console.log("B"));
// });

// ✅ Output

// A
// B

// 🧠 Microtask queue is fully drained.

// 8️⃣ Execution Context + Event Loop Combo
// function main() {
//   console.log("1");

//   setTimeout(() => {
//     console.log("2");
//   }, 0);

//   Promise.resolve().then(() => {
//     console.log("3");
//   });

//   console.log("4");
// }

// main();

// Execution Order

// 1️⃣ GEC → main() context
// 2️⃣ Sync logs → 1, 4
// 3️⃣ Microtask → 3
// 4️⃣ Macrotask → 2

// ✅ Output

// 1
// 4
// 3
// 2

// 9️⃣ Call Stack Visualization
// | cb()          | ← pushed by Event Loop
// | main()        |
// | Global EC     |

// After execution:

// | Global EC     |

// 🔥 Ultra-Tricky Interview Question
// console.log(1);

// setTimeout(() => console.log(2));

// Promise.resolve().then(() => {
//   console.log(3);
//   setTimeout(() => console.log(4));
// });

// Promise.resolve().then(() => console.log(5));

// console.log(6);

// Step-by-step

// Sync → 1 6

// Microtasks → 3 5

// Macrotasks → 2 4

// ✅ Output

// 1
// 6
// 3
// 5
// 2
// 4

// 🔟 Why Execution Context Matters

// Every callback:

// Gets its own Execution Context

// Uses scope chain

// Has its own this

// Event Loop decides when that context is created.

// 🧠 Interview One-Liner (POWERFUL)

// “Execution Context defines how code runs, Event Loop defines when async code is allowed to run.”

// 🚨 Common Mistakes

// ❌ Thinking setTimeout(fn, 0) runs immediately
// ❌ Ignoring microtask priority
// ❌ Mixing async code without mental model

// 🔥 What is Event Loop?

// 👉 The Event Loop is the brain of JavaScript async behavior

// ✔️ It continuously checks:

// Is the Call Stack empty?
// If yes → take tasks from queue and execute
// 🧠 Core Components (Must Know)
// 1. Call Stack

// 👉 Where code executes (synchronous)

// console.log("Hello");

// ✔️ Runs immediately in stack

// 2. Web APIs (Browser/Node)

// 👉 Handles async tasks like:

// setTimeout
// setInterval
// DOM events
// API calls
// 3. Callback Queue (Macrotask Queue)

// 👉 Stores callbacks from:

// setTimeout
// setInterval
// events
// 4. Microtask Queue (Very Important 🔥)

// 👉 Stores:

// Promises (.then, .catch)
// queueMicrotask

// ✔️ Higher priority than callback queue

// ⚙️ How Event Loop Works (Step-by-Step)
// Run all synchronous code (Call Stack)
// Async tasks go to Web APIs
// Completed async callbacks go to:
// Microtask Queue (Promises)
// Callback Queue (setTimeout)
// Event Loop checks:
// First → Microtask Queue ✅
// Then → Callback Queue
// 🧪 Example (Most Asked)
// console.log("Start");

// setTimeout(() => console.log("Timeout"), 0);

// Promise.resolve().then(() => console.log("Promise"));

// console.log("End");
// ✅ Output:
// Start
// End
// Promise
// Timeout
// 💡 Explanation:
// "Start" → Call Stack
// setTimeout → Web API → Callback Queue
// Promise → Microtask Queue
// "End" → Call Stack
// Event Loop:
// Executes Microtask first → "Promise"
// Then Callback Queue → "Timeout"
// 🔥 Visual Flow (Easy to Remember)
// Call Stack → Web APIs → Queues → Event Loop → Call Stack

// Priority:

// Microtask Queue > Callback Queue
// ⚠️ Tricky Points (Interview Gold)
// 🧠 1. setTimeout(0) is NOT immediate

// 👉 It still waits for:

// Call stack to be empty
// Microtasks to finish
// 🧠 2. Promises always run first
// setTimeout(() => console.log("Timeout"), 0);
// Promise.resolve().then(() => console.log("Promise"));

// 👉 Output:

// Promise
// Timeout
// 🧠 3. Blocking code delays everything
// setTimeout(() => console.log("Hi"), 0);

// for (let i = 0; i < 1e9; i++) {}

// console.log("Done");

// 👉 Output:

// Done
// Hi
// 🎯 One-Line Interview Answer

// “The Event Loop continuously monitors the call stack and executes tasks from the microtask queue first, followed by the callback queue, enabling asynchronous behavior in JavaScript.”

// 🚀 Pro Level Explanation (Say This 💥)

// “JavaScript is single-threaded, but asynchronous behavior is achieved using Web APIs, queues, and the event loop, which prioritizes microtasks over macrotasks.”

//         ┌───────────────────────┐
//         │     Call Stack        │
//         │  (Executes code)      │
//         └─────────┬─────────────┘
//                   │
//                   ▼
//         ┌───────────────────────┐
//         │      Web APIs         │
//         │ (setTimeout, fetch,   │
//         │  DOM events, etc.)    │
//         └─────────┬─────────────┘
//                   │
//       ┌───────────┴───────────┐
//       ▼                       ▼
// ┌───────────────┐     ┌──────────────────┐
// │ Microtask     │     │ Callback Queue   │
// │ Queue         │     │ (Macrotask)      │
// │ (Promises,    │     │ (setTimeout,     │
// │ queueMicrotask)│    │  setInterval)    │
// └───────┬───────┘     └────────┬─────────┘
//         │                      │
//         └──────────┬───────────┘
//                    ▼
//             ┌──────────────┐
//             │  Event Loop  │
//             │ (Scheduler)  │
//             └──────┬───────┘
//                    │
//                    ▼
//         ┌───────────────────────┐
//         │     Call Stack        │
//         │ (Executes next task)  │
//         └───────────────────────┘

// ⚙️ Execution Priority Flow
// 1. Call Stack (sync code)
// 2. Microtask Queue (Promises) ✅ HIGH PRIORITY
// 3. Callback Queue (setTimeout) ⏳
