// 🔹 What is the Call Stack?

// The Call Stack is a data structure (LIFO) that keeps track of where the program is while executing functions.

// Last In → First Out

// 🧠 What goes into the Call Stack?

// 👉 Execution Contexts

// Global Execution Context (first)

// Function Execution Contexts (for every function call)

// 🔄 How the Call Stack Works (Visual)
// Code
// function one() {
//   two();
// }

// function two() {
//   three();
// }

// function three() {
//   console.log("Hello");
// }

// one();

// Step-by-Step Stack State
// 1️⃣ Start
// | Global EC |

// 2️⃣ one() called
// | one()     |
// | Global EC|

// 3️⃣ two() called
// | two()     |
// | one()     |
// | Global EC|

// 4️⃣ three() called
// | three()  |
// | two()    |
// | one()    |
// | Global EC|

// 5️⃣ console.log executes → stack clears
// | Global EC |

// 🚨 Stack Overflow (VERY IMPORTANT)
// function infinite() {
//   infinite();
// }

// infinite();

// ❌ Error

// Maximum call stack size exceeded

// 🧠 Too many function calls → stack memory exhausted.

// 🔗 Call Stack & Event Loop Connection

// Call Stack runs synchronous code

// Async callbacks wait

// Event Loop pushes async callbacks only when stack is empty

// console.log("A");

// setTimeout(() => console.log("B"), 0);

// console.log("C");

// Stack Execution
// A
// C

// Then Event Loop pushes:

// B

// 🧠 Common Interview Traps
// ❓ Is JS multi-threaded?

// ❌ No — single call stack

// ❓ Can two functions run at same time?

// ❌ No — one at a time

// ❓ Why async feels parallel?

// ✅ Because of Web APIs + Event Loop, not call stack

// 🧠 One-Line Interview Answer

// “The Call Stack is a LIFO structure that keeps track of execution contexts and runs JavaScript code synchronously.”

// 🏆 Quick Summary
// Feature	Call Stack
// Type	LIFO
// Stores	Execution Contexts
// Executes	Synchronous code
// Limit	Can overflow
// Controlled by	JS Engine

// 🔁 Recursion in JavaScript — Visual + Tricky + Interview Ready
// 1️⃣ What is Recursion?

// Recursion is when a function calls itself until a base condition is met.

// 🧠 Every recursive call is pushed onto the Call Stack

// 2️⃣ Two MUST-HAVE Parts

// 1️⃣ Base Case → stops recursion
// 2️⃣ Recursive Case → function calls itself

// ❌ Missing base case = stack overflow

// 3️⃣ Simple Example
// function countDown(n) {
//   if (n === 0) return;     // base case
//   console.log(n);
//   countDown(n - 1);       // recursive call
// }

// countDown(3);

// Output
// 3
// 2
// 1

// 4️⃣ Call Stack Visualization
// countDown(3)
// | countDown(0) |
// | countDown(1) |
// | countDown(2) |
// | countDown(3) |
// | Global EC    |

// ➡️ Stack clears from top to bottom

// 5️⃣ Recursion with Return (IMPORTANT)
// function sum(n) {
//   if (n === 1) return 1;
//   return n + sum(n - 1);
// }

// sum(3);

// Execution
// sum(3)
// → 3 + sum(2)
// → 3 + 2 + sum(1)
// → 3 + 2 + 1

// Output
// 6

// 6️⃣ Tricky Output Question 🔥
// function test(n) {
//   if (n === 0) return 0;
//   console.log(n);
//   return test(n - 1);
// }

// console.log(test(3));

// Output
// 3
// 2
// 1
// 0

// 🧠 console.log(test(3)) prints returned value, not recursive logs.

// 7️⃣ Recursion vs Loop (Interview Favorite)
// Loop
// for (let i = 1; i <= 3; i++) {
//   console.log(i);
// }

// Recursion
// function print(n) {
//   if (n > 3) return;
//   console.log(n);
//   print(n + 1);
// }

// print(1);

// 8️⃣ Stack Overflow (TRAP)
// function boom() {
//   boom();
// }

// boom();

// ❌ Error

// Maximum call stack size exceeded

// 🧠 No base case → infinite recursion.

// 9️⃣ Real Interview Examples
// Factorial
// function fact(n) {
//   if (n === 0) return 1;
//   return n * fact(n - 1);
// }

// fact(5); // 120

// Fibonacci
// function fib(n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }

// ⚠️ Exponential time → optimize with memoization

// 🔟 Tail Recursion (Advanced)
// function sum(n, acc = 0) {
//   if (n === 0) return acc;
//   return sum(n - 1, acc + n);
// }

// 🧠 JS engines don’t guarantee tail-call optimization.

// 🔥 Recursion Interview Traps (MEMORIZE)
// Trap	Result
// No base case	Stack overflow
// Large input	Performance issue
// Heavy recursion	Memory crash
// JS TCO assumption	❌ Wrong
// 🧠 One-Line Interview Answer

// “Recursion is a technique where a function calls itself and relies on the call stack until a base case stops execution.”

// 🏆 When to Use Recursion

// ✔️ Tree traversal
// ✔️ Graph algorithms
// ✔️ Divide & conquer
// ✔️ DFS / backtracking

// ❌ Simple counting loops
// ❌ Large depth problems in JS
