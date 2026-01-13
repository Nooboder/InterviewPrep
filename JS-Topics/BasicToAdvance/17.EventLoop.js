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
