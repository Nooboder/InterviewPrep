// 1️⃣ What is Hoisting?

// Hoisting is JavaScript’s behavior of moving declarations to the top of their scope during the memory creation phase of the Execution Context.

// ⚠️ Only declarations are hoisted, not initializations

// 2️⃣ Hoisting Happens in Two Phases
// 🔹 Phase 1: Memory Creation

// var → undefined

// let / const → uninitialized (TDZ)

// Function declarations → fully hoisted

// 🔹 Phase 2: Code Execution

// Values assigned

// Functions executed

// 3️⃣ var Hoisting
// console.log(a);
// var a = 10;

// ✅ Output

// undefined

// 🧠 var a is hoisted, assignment happens later.

// 4️⃣ let & const Hoisting (TDZ TRAP)
// console.log(b);
// let b = 20;

// ❌ Output

// ReferenceError: Cannot access 'b' before initialization

// 🧠 Variable exists in Temporal Dead Zone.

// 5️⃣ Function Declaration Hoisting
// sayHi();

// function sayHi() {
//   console.log("Hi");
// }

// ✅ Output

// Hi

// 🧠 Entire function body is hoisted.

// 6️⃣ Function Expression TRAP
// sayHello();

// var sayHello = function () {
//   console.log("Hello");
// };

// ❌ Output

// TypeError: sayHello is not a function

// 🧠 sayHello is undefined during memory phase.

// 7️⃣ Arrow Function Hoisting TRAP
// add(2, 3);

// const add = (a, b) => a + b;

// ❌ Output

// ReferenceError

// 🧠 Arrow functions behave like let / const.

// 8️⃣ Class Hoisting (VERY IMPORTANT)
// const p = new Person();

// class Person {}

// ❌ Output

// ReferenceError

// 🧠 Classes are hoisted but not initialized (TDZ).

// 9️⃣ Hoisting Inside Functions
// function test() {
//   console.log(x);
//   var x = 5;
// }

// test();

// ✅ Output

// undefined

// 🧠 Hoisting is scope-based.

// 🔥 Ultra-Tricky Output Question
// var x = 1;

// function test() {
//   console.log(x);
//   var x = 2;
// }

// test();

// ✅ Output

// undefined

// 🧠 Local x shadows global x.

// 🧠 Hoisting Comparison Table
// Keyword	Hoisted	Initialized	TDZ
// var	✅	undefined	❌
// let	✅	❌	✅
// const	✅	❌	✅
// function	✅	✅	❌
// class	✅	❌	✅
// 🧠 Interview One-Liner

// “Hoisting is the process where JavaScript allocates memory for variables and functions before execution.”

// 🚨 Best Practices

// ✔️ Declare variables at top
// ✔️ Prefer let / const
// ✔️ Avoid function expressions before use
// ✔️ Understand TDZ to avoid bugs

// 🏆 Final Summary

// Hoisting happens in execution context creation

// var → undefined

// let/const → TDZ

// Functions → fully hoisted

// Classes → TDZ

// Q1. What will be the output?
// console.log(a);
// var a = 10;

// Options:
// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: B) undefined
// 🧠 Explanation: var a is hoisted with undefined. Assignment happens later.

// Q2. What will be the output?
// console.log(a);
// let a = 5;

// Options:
// A) 5
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: C) ReferenceError
// 🧠 Explanation: let is hoisted but in Temporal Dead Zone (TDZ) until initialized.

// Q3. What will this print?
// foo();
// var foo = function() {
//   console.log("Hello");
// }

// Options:
// A) Hello
// B) undefined
// C) TypeError
// D) ReferenceError

// ✅ Answer: C) TypeError
// 🧠 Explanation: foo is hoisted as var foo = undefined. Calling undefined() → TypeError.

// Q4. Function declaration vs expression
// sayHi();

// function sayHi() {
//   console.log("Hi");
// }

// sayHello();

// var sayHello = function() {
//   console.log("Hello");
// }

// Options:
// A) Hi then Hello
// B) Hi then TypeError
// C) TypeError then Hi
// D) ReferenceError

// ✅ Answer: B) Hi then TypeError
// 🧠 Explanation: Function declaration is hoisted fully, function expression is undefined initially.

// Q5. Nested hoisting trap
// var x = 1;

// function test() {
//   console.log(x);
//   var x = 2;
// }

// test();

// Options:
// A) 1
// B) 2
// C) undefined
// D) ReferenceError

// ✅ Answer: C) undefined
// 🧠 Explanation: Local x is hoisted in test() → undefined. Shadows global x.

// Q6. Let/Const in function
// function test() {
//   console.log(a);
//   let a = 10;
// }

// test();

// Options:
// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: C) ReferenceError
// 🧠 Explanation: let is in TDZ until initialized.

// Q7. Hoisting + function
// var x = 21;

// var fun = function() {
//     console.log(x);
//     var x = 20;
// };

// fun();

// Options:
// A) 21
// B) 20
// C) undefined
// D) ReferenceError

// ✅ Answer: C) undefined
// 🧠 Explanation: Inside fun, local x is hoisted → undefined. Shadows global x.

// Q8. Arrow function hoisting
// sayHi();

// const sayHi = () => console.log("Hello");

// Options:
// A) Hello
// B) undefined
// C) ReferenceError
// D) TypeError

// ✅ Answer: C) ReferenceError
// 🧠 Explanation: const variables are hoisted but in TDZ. Cannot access before initialization.

// Q9. Class hoisting
// const p = new Person();

// class Person {
//   constructor() {
//     this.name = "Sapta";
//   }
// }

// Options:
// A) Works → "Sapta"
// B) undefined
// C) ReferenceError
// D) TypeError

// ✅ Answer: C) ReferenceError
// 🧠 Explanation: Classes are hoisted but not initialized (TDZ). Cannot use before declaration.

// Q10. Tricky combination
// console.log(foo);

// var foo = "Hello";

// function foo() {
//   console.log("Hi");
// }

// console.log(foo);

// Options:
// A) function foo() {} then "Hello"
// B) "Hello" then "Hello"
// C) function foo() {} then function foo() {}
// D) undefined then "Hello"

// ✅ Answer: A) function foo() {} then "Hello"
// 🧠 Explanation: Function declaration overrides var during hoisting. Later, assignment to foo = "Hello" replaces function.

// 💡 Interview Tip:

// “Hoisting rules differ for var, let, const, functions, and classes. Function declarations are fully hoisted, var is hoisted with undefined, let/const and classes enter TDZ.”
