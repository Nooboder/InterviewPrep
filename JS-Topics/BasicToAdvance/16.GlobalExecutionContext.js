// 🌍 JavaScript Global Execution Context (GEC) — Deep + Interview Traps
// 1️⃣ What is Global Execution Context?

// The Global Execution Context (GEC) is the default environment where JavaScript code runs first.

// 👉 It is created before any code executes.

// Only ONE GEC exists per program

// 2️⃣ What happens when JS runs a file?
// JavaScript runs in two phases
// 🔹 Phase 1: Memory Creation (Hoisting)

// var → initialized with undefined

// let / const → allocated but uninitialized (TDZ)

// Functions → entire function stored

// this → set to global object

// 🔹 Phase 2: Code Execution

// Values assigned

// Functions invoked

// New execution contexts created

// 3️⃣ GEC Structure
// Global Execution Context
// │
// ├── Memory (Variable Environment)
// │   ├── var variables → undefined
// │   ├── function declarations → function body
// │
// ├── Lexical Environment
// │   ├── let / const (TDZ)
// │
// └── this
//     └── window (browser)
//     └── global (Node.js)

// 4️⃣ Example (Hoisting in GEC)
// console.log(a);
// console.log(b);

// var a = 10;
// let b = 20;

// ✅ Output

// undefined
// ReferenceError: Cannot access 'b' before initialization

// 🧠 var is hoisted, let is in TDZ.

// 5️⃣ Function Hoisting in GEC
// sayHi();

// function sayHi() {
//   console.log("Hi");
// }

// ✅ Output

// Hi

// 🧠 Function declarations are hoisted fully.

// 6️⃣ Function Expression TRAP
// sayHello();

// var sayHello = function () {
//   console.log("Hello");
// };

// ❌ Output

// TypeError: sayHello is not a function

// 🧠 sayHello exists as undefined in memory phase.

// 7️⃣ this in Global Context
// console.log(this);

// Browser
// window

// Node.js
// {}

// 🧠 this depends on runtime.

// 8️⃣ Global Variables & Pollution (TRAP)
// a = 10;
// console.log(window.a);

// ❌ Implicit global variable created.

// 🧠 Always use let, const, or var.

// 9️⃣ Execution Context Stack (Call Stack)
// function one() {
//   two();
// }

// function two() {
//   console.log("Hello");
// }

// one();

// Call Stack Flow
// Global EC
//  → one()
//    → two()
//    ← two()
//  ← one()

// 🔟 GEC vs Function Execution Context
// Feature	GEC	FEC
// Created	Once	Every function call
// this	Global object	Depends on call
// Scope	Global	Local + parent
// 🔥 Interview Traps (VERY IMPORTANT)
// Trap 1️⃣
// console.log(x);
// var x = 5;

// Output:

// undefined

// Trap 2️⃣
// console.log(x);
// let x = 5;

// Output:

// ReferenceError

// Trap 3️⃣
// console.log(add(2,3));

// function add(a,b) {
//   return a+b;
// }

// Output:

// 5

// Trap 4️⃣
// console.log(add);

// var add = function(a,b){
//   return a+b;
// };

// Output:

// undefined

// 🧠 Interview One-Liner

// “The Global Execution Context is the first execution environment created by JavaScript where variables, functions, and this are set up before code runs.”
