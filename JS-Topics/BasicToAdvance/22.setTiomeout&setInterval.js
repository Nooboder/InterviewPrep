// 🔹 setTimeout

// 👉 Runs a function once after a delay

// ✅ Syntax:
// setTimeout(callback, delay);
// ✅ Example:
// setTimeout(() => {
//   console.log("Runs after 2 seconds");
// }, 2000);

// ✔️ Executes only one time

// 🔹 setInterval

// 👉 Runs a function repeatedly at fixed intervals

// ✅ Syntax:
// setInterval(callback, delay);
// ✅ Example:
// setInterval(() => {
//   console.log("Runs every 2 seconds");
// }, 2000);

// ✔️ Executes again and again

// 🧠 Key Differences (Interview Table)

// | Feature   | setTimeout   | setInterval   |
// | --------- | ------------ | ------------- |
// | Execution | Once         | Repeated      |
// | Use case  | Delay task   | Repeated task |
// | Control   | clearTimeout | clearInterval |

// 🔥 Important: How to Stop Them
// ✅ clearTimeout
// const id = setTimeout(() => {
//   console.log("Won't run");
// }, 2000);

// clearTimeout(id);
// ✅ clearInterval
// const id = setInterval(() => {
//   console.log("Running...");
// }, 1000);

// clearInterval(id);
// ⚠️ Tricky Interview Questions
// 🧠 1. Is delay guaranteed?

// 👉 ❌ No

// setTimeout(() => console.log("Hi"), 0);

// 👉 It does NOT run immediately

// 💡 Reason:

// Goes to Web APIs → Callback Queue → Event Loop
// Runs only when call stack is empty
// 🧠 2. What will be the output?
// console.log("Start");

// setTimeout(() => console.log("Timeout"), 0);

// console.log("End");

// 👉 ✅ Output:

// Start
// End
// Timeout

// 💥 This shows JavaScript is single-threaded but async via event loop

// 🧠 3. setInterval vs recursive setTimeout (Very Important)

// 👉 Better alternative to setInterval:

// function repeat() {
//   console.log("Running...");
//   setTimeout(repeat, 1000);
// }

// repeat();
// 💡 Why this is better?
// Avoids overlapping calls
// More control over execution

// 👉 Interview gold line:

// “Recursive setTimeout is safer than setInterval for controlled repeated execution.”

// 🧠 4. What happens if callback takes longer than interval?
// setInterval(() => {
//   console.log("Task");
// }, 1000);

// 👉 If task takes 2 seconds:

// Calls may overlap ❌
// Can cause performance issues
// 🧠 5. Return value of setTimeout?

// 👉 Returns a timer ID

// const id = setTimeout(() => {}, 1000);
// console.log(id);

// ✔️ Used to cancel timer

// -------------------------------------------------------------------------------------------------------------------------------------------------------

// 🧠 Question 1
// console.log("A");

// setTimeout(() => console.log("B"), 0);

// console.log("C");

// 👉 Your Guess?

// ✅ Answer:
// A
// C
// B

// 💡 Even 0ms goes to callback queue, waits for call stack

// 🧠 Question 2 (Tricky Loop)
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }

// 👉 Your Guess?

// ✅ Answer:
// 3
// 3
// 3

// 💥 Reason:

// var is function-scoped
// Same reference used
// ✅ Fix (Important)
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }

// 👉 Output:

// 0
// 1
// 2
// 🧠 Question 3 (Closure Trap)
// function x() {
//   for (var i = 1; i <= 3; i++) {
//     setTimeout(function () {
//       console.log(i);
//     }, i * 1000);
//   }
// }

// x();

// 👉 Answer:

// 4
// 4
// 4

// 💡 Loop ends → i = 4

// ✅ Fix using closure:
// function x() {
//   for (var i = 1; i <= 3; i++) {
//     function close(i) {
//       setTimeout(function () {
//         console.log(i);
//       }, i * 1000);
//     }
//     close(i);
//   }
// }

// 👉 Output:

// 1
// 2
// 3
// 🧠 Question 4 (Promise vs setTimeout 🔥)
// console.log("Start");

// setTimeout(() => console.log("Timeout"), 0);

// Promise.resolve().then(() => console.log("Promise"));

// console.log("End");

// 👉 Your Guess?

// ✅ Answer:
// Start
// End
// Promise
// Timeout

// 💥 Reason:

// Promise → Microtask queue (higher priority)
// setTimeout → Macrotask queue
// 🧠 Question 5 (Nested Async)
// setTimeout(() => {
//   console.log("1");

//   setTimeout(() => {
//     console.log("2");
//   }, 0);

// }, 0);

// console.log("3");

// 👉 Answer:

// 3
// 1
// 2

// 💡 Inner timeout waits again in queue

// 🧠 Question 6 (Heavy Task Blocking)
// setTimeout(() => console.log("Timeout"), 0);

// for (let i = 0; i < 1e9; i++) {}

// console.log("Done");

// 👉 Answer:

// Done
// Timeout

// 💥 JS is single-threaded

// Loop blocks everything
// 🧠 Question 7 (setInterval Trap)
// let count = 0;

// const id = setInterval(() => {
//   console.log(count);
//   count++;

//   if (count === 3) clearInterval(id);
// }, 1000);

// 👉 Answer:

// 0
// 1
// 2
// 🎯 Ultimate Interview Killer Line

// “JavaScript handles async operations using the event loop, where microtasks (Promises) are executed before macrotasks (setTimeout/setInterval), regardless of delay.”

// 🚀 Pro Tip (This impresses interviewer HARD)

// If interviewer asks:
// 👉 “Why setTimeout(fn, 0) is not immediate?”

// Say:

// “Because it goes through Web APIs → Callback Queue → Event Loop → Call Stack. Execution only happens when the call stack is empty.”
