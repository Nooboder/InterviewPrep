// 🌍 Global Scope vs 🏠 Local Scope in JavaScript

// Understanding scope is critical for writing bug-free, predictable JavaScript—especially in interviews and production apps.

// 🌍 Global Scope

// A variable declared outside all functions or blocks is in the global scope.

// ✅ Characteristics

// Accessible from anywhere in the program

// Exists as long as the program runs

// In browsers, var globals become part of window

// Example
// let globalVar = "I am global";

// function show() {
//   console.log(globalVar); // ✅ accessible
// }

// show();
// console.log(globalVar);   // ✅ accessible

// ⚠️ Problem with global scope

// Name collisions

// Harder debugging

// Unintended overwrites

// 🏠 Local Scope (Function Scope)

// A variable declared inside a function is local to that function.

// ✅ Characteristics

// Accessible only inside the function

// Created when function runs

// Destroyed after execution

// Example
// function test() {
//   let localVar = "I am local";
//   console.log(localVar); // ✅
// }

// test();
// console.log(localVar);   // ❌ ReferenceError

// 🧱 Block Scope (let & const)

// Blocks {} create scope only for let and const, not var.

// Example
// if (true) {
//   let a = 10;
//   const b = 20;
//   var c = 30;
// }

// console.log(a); // ❌ ReferenceError
// console.log(b); // ❌ ReferenceError
// console.log(c); // ✅ 30 (var ignores block scope)

// 🔄 Scope Chain (Very Important 🔥)

// JavaScript looks for variables from inner → outer → global.

// Example
// let x = 10;

// function outer() {
//   let y = 20;

//   function inner() {
//     let z = 30;
//     console.log(x, y, z); // ✅ 10 20 30
//   }

//   inner();
// }

// outer();

// 🧠 Lexical Scope (Interview Favorite)

// Scope is determined by where code is written, not where it is called.

// let a = 100;

// function foo() {
//   console.log(a);
// }

// function bar() {
//   let a = 200;
//   foo(); // still prints 100
// }

// bar();

// ⚔️ Global vs Local (Quick Comparison)

// | Feature       | Global Scope     | Local Scope                |
// | ------------- | ---------------- | -------------------------- |
// | Accessibility | Everywhere       | Only inside function/block |
// | Lifetime      | Entire program   | Function execution         |
// | Risk          | High (pollution) | Safe & predictable         |
// | Best Practice | ❌ Avoid          | ✅ Prefer                   |

// ✅ Best Practices (Production Level)

// ❌ Avoid global variables

// ✅ Use let / const

// ✅ Wrap logic in functions/modules

// ✅ Prefer closures & modules

// 🔥 Common Interview Trap
// for (var i = 0; i < 3; i++) {}

// console.log(i); // ✅ 3

// for (let i = 0; i < 3; i++) {}

// console.log(i); // ❌ ReferenceError

// 🔥 25 Ultra-Tricky JavaScript Scope MCQs (Interview Level)

// 👉 Rule: Read carefully. Most mistakes happen due to var vs let, scope chain, and hoisting.

// 🔥 MCQ-1 (Global vs Local)
// var a = 10;

// function test() {
//   console.log(a);
//   var a = 20;
// }

// test();

// Output?

// A) 10
// B) 20
// C) undefined
// D) ReferenceError

// ✅ Answer: C
// 🧠 var a is hoisted → shadows global → undefined

// 🔥 MCQ-2 (let hoisting)
// console.log(a);
// let a = 5;

// A) 5
// B) undefined
// C) ReferenceError
// D) SyntaxError

// ✅ Answer: C
// 🧠 TDZ (Temporal Dead Zone)

// 🔥 MCQ-3 (Block scope)
// {
//   var x = 10;
//   let y = 20;
// }
// console.log(x, y);

// A) 10 20
// B) 10 undefined
// C) 10 ReferenceError
// D) ReferenceError ReferenceError

// ✅ Answer: C

// 🔥 MCQ-4 (Shadowing)
// let a = 10;

// {
//   let a = 20;
//   console.log(a);
// }
// console.log(a);

// A) 10 10
// B) 20 20
// C) 20 10
// D) ReferenceError

// ✅ Answer: C

// 🔥 MCQ-5 (Illegal shadowing)
// let a = 10;

// {
//   var a = 20;
// }

// A) 10
// B) 20
// C) SyntaxError
// D) undefined

// ✅ Answer: C
// 🧠 var cannot shadow let in same scope chain

// 🔥 MCQ-6 (Function scope)
// function foo() {
//   var x = 10;
// }
// console.log(x);

// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: C

// 🔥 MCQ-7 (Scope chain)
// let a = 1;

// function outer() {
//   let a = 2;
//   function inner() {
//     console.log(a);
//   }
//   inner();
// }
// outer();

// A) 1
// B) 2
// C) undefined
// D) ReferenceError

// ✅ Answer: B

// 🔥 MCQ-8 (Lexical scope)
// let x = 100;

// function foo() {
//   console.log(x);
// }

// function bar() {
//   let x = 200;
//   foo();
// }

// bar();

// A) 100
// B) 200
// C) undefined
// D) ReferenceError

// ✅ Answer: A

// 🔥 MCQ-9 (var in loop)
// for (var i = 0; i < 3; i++) {}

// console.log(i);

// A) 0
// B) 2
// C) 3
// D) ReferenceError

// ✅ Answer: C

// 🔥 MCQ-10 (let in loop)
// for (let i = 0; i < 3; i++) {}

// console.log(i);

// A) 0
// B) 2
// C) 3
// D) ReferenceError

// ✅ Answer: D

// 🔥 MCQ-11 (Implicit global - non-strict)
// function test() {
//   a = 10;
// }
// test();
// console.log(a);

// A) 10
// B) undefined
// C) ReferenceError
// D) SyntaxError

// ✅ Answer: A
// 🧠 Creates global variable (BAD PRACTICE)

// 🔥 MCQ-12 (Strict mode)
// "use strict";

// function test() {
//   a = 10;
// }
// test();

// A) 10
// B) undefined
// C) ReferenceError
// D) SyntaxError

// ✅ Answer: C

// 🔥 MCQ-13 (Function declaration scope)
// {
//   function foo() {}
// }
// console.log(typeof foo);

// A) function
// B) undefined
// C) ReferenceError
// D) object

// ✅ Answer: A (browser behavior)
// ⚠️ Interview note: block-scoped in strict mode / ES modules

// 🔥 MCQ-14 (Closure trap)
// function create() {
//   let x = 10;
//   return function () {
//     console.log(x);
//   };
// }
// let fn = create();
// fn();

// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: A

// 🔥 MCQ-15 (var hoisting)
// function test() {
//   console.log(a);
//   if (true) {
//     var a = 10;
//   }
// }
// test();

// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: B

// 🔥 MCQ-16 (TDZ inside block)
// {
//   console.log(x);
//   let x = 5;
// }

// A) 5
// B) undefined
// C) ReferenceError
// D) SyntaxError

// ✅ Answer: C

// 🔥 MCQ-17 (Parameter scope)
// let a = 10;

// function foo(a) {
//   console.log(a);
// }
// foo();

// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: B

// 🔥 MCQ-18 (Nested blocks)
// let a = 1;

// {
//   let a = 2;
//   {
//     let a = 3;
//     console.log(a);
//   }
// }

// A) 1
// B) 2
// C) 3
// D) ReferenceError

// ✅ Answer: C

// 🔥 MCQ-19 (Function inside loop)
// var arr = [];

// for (var i = 0; i < 3; i++) {
//   arr.push(function () {
//     console.log(i);
//   });
// }

// arr[0]();

// A) 0
// B) 1
// C) 2
// D) 3

// ✅ Answer: D
// 🧠 Same i reference

// 🔥 MCQ-20 (Fix with let)
// var arr = [];

// for (let i = 0; i < 3; i++) {
//   arr.push(function () {
//     console.log(i);
//   });
// }

// arr[0]();

// A) 0
// B) 1
// C) 2
// D) 3

// ✅ Answer: A

// 🔥 MCQ-21 (Function vs block scope)
// function test() {
//   if (true) {
//     var x = 10;
//   }
//   console.log(x);
// }
// test();

// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: A

// 🔥 MCQ-22 (Redeclaration)
// let a = 10;
// let a = 20;

// A) 10
// B) 20
// C) undefined
// D) SyntaxError

// ✅ Answer: D

// 🔥 MCQ-23 (const scope)
// const a = 10;
// {
//   const a = 20;
//   console.log(a);
// }
// console.log(a);

// A) 10 10
// B) 20 20
// C) 20 10
// D) ReferenceError

// ✅ Answer: C

// 🔥 MCQ-24 (Arrow function scope)
// let x = 10;

// (() => {
//   console.log(x);
//   let x = 20;
// })();

// A) 10
// B) 20
// C) undefined
// D) ReferenceError

// ✅ Answer: D (TDZ)

// 🔥 MCQ-25 (Global leak)
// (function () {
//   var a = b = 10;
// })();
// console.log(typeof a, typeof b);

// A) number number
// B) undefined number
// C) undefined undefined
// D) number undefined

// ✅ Answer: B
// 🧠 b becomes global, a is local

// 🎯 Interview Mastery Tip

// If you can explain WHY each answer works → you are senior-level JS ready.
