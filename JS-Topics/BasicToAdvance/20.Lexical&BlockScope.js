// 🧠 Lexical Scope vs 🧱 Block Scope in JavaScript (Interview + Production Level)

// These two are core JS concepts and very frequently asked together.

// 🧠 Lexical Scope (Static Scope)

// Lexical scope means:

// Scope is decided by where the code is written, not where it is called.

// JavaScript uses lexical (static) scoping.

// ✅ Key Points

// Scope is determined at compile time

// Inner functions can access outer variables

// Forms the base of closures

// Does NOT change based on caller

// 🔥 Example
// let a = 10;

// function outer() {
//   let b = 20;

//   function inner() {
//     console.log(a, b);
//   }

//   inner();
// }

// outer();

// ✅ Output: 10 20
// 🧠 inner() can access a & b because of lexical position

// 🔥 Lexical vs Call location (TRAP)
// let x = 100;

// function foo() {
//   console.log(x);
// }

// function bar() {
//   let x = 200;
//   foo();
// }

// bar();

// ✅ Output: 100
// ❌ NOT 200 — because scope is lexical

// 🧱 Block Scope

// Block scope means:

// Variables declared with let and const exist only inside {} blocks.

// ✅ Key Points

// Introduced in ES6

// Applies to:

// if

// for

// while

// { }

// var ❌ does NOT follow block scope

// 🔥 Example
// if (true) {
//   let x = 10;
//   const y = 20;
// }

// console.log(x); // ❌ ReferenceError
// console.log(y); // ❌ ReferenceError

// 🔥 var ignores block scope
// if (true) {
//   var x = 10;
// }

// console.log(x); // ✅ 10

// ⚔️ Lexical Scope vs Block Scope

// | Feature       | Lexical Scope                  | Block Scope               |
// | ------------- | ------------------------------ | ------------------------- |
// | Meaning       | Scope decided by code location | Scope limited to `{}`     |
// | When decided  | Compile time                   | Runtime (block execution) |
// | Applies to    | Functions, nested functions    | `let`, `const`            |
// | Related to    | Closures                       | Safer variable access     |
// | `var` support | Yes (function-scoped)          | ❌ No                      |

// 🚫 Shadowing (Important 🔥)
// let a = 10;

// {
//   let a = 20;
//   console.log(a); // 20
// }

// console.log(a); // 10

// ✅ Valid shadowing

// ❌ Illegal Shadowing
// let a = 10;

// {
//   var a = 20; // ❌ SyntaxError
// }

// 🧠 Lexical Scope + Block Scope (Combined)
// function outer() {
//   let x = 10;

//   if (true) {
//     let y = 20;

//     function inner() {
//       console.log(x, y);
//     }

//     inner();
//   }
// }

// outer();

// 🧠 inner():

// x → lexical parent

// y → block scope

// Perfect combination of both

// 🔥 Interview One-Liner

// Lexical scope decides who can access what
// Block scope decides where a variable lives

// 🎯 Production Best Practices

// Always use let / const

// Avoid var

// Prefer smaller lexical scopes

// Use closures intentionally, not accidentally

// ⚔️ 30 Ultra-Tricky JavaScript MCQs
// 🔥 Scope + Closure (Interview / Senior Level)

// 👉 Rule: Don’t guess. Trace scope chain, hoisting, TDZ, and closures carefully.

// 🔥 MCQ-1 (Classic closure)
// function outer() {
//   let a = 10;
//   return function inner() {
//     console.log(a);
//   };
// }
// outer()();

// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: A

// 🔥 MCQ-2 (Closure after execution)
// function create() {
//   let count = 0;
//   return () => ++count;
// }

// const inc = create();
// console.log(inc(), inc());

// A) 1 1
// B) 1 2
// C) 0 1
// D) ReferenceError

// ✅ Answer: B

// 🔥 MCQ-3 (var closure trap)
// var arr = [];

// for (var i = 0; i < 3; i++) {
//   arr.push(() => console.log(i));
// }

// arr[1]();

// A) 0
// B) 1
// C) 2
// D) 3

// ✅ Answer: D

// 🔥 MCQ-4 (Fix with IIFE)
// var arr = [];

// for (var i = 0; i < 3; i++) {
//   (function (x) {
//     arr.push(() => console.log(x));
//   })(i);
// }

// arr[1]();

// A) 0
// B) 1
// C) 2
// D) 3

// ✅ Answer: B

// 🔥 MCQ-5 (let closure)
// var arr = [];

// for (let i = 0; i < 3; i++) {
//   arr.push(() => console.log(i));
// }

// arr[1]();

// A) 0
// B) 1
// C) 2
// D) 3

// ✅ Answer: B

// 🔥 MCQ-6 (Closure + shadowing)
// let x = 10;

// function outer() {
//   let x = 20;
//   return function inner() {
//     console.log(x);
//   };
// }

// outer()();

// A) 10
// B) 20
// C) undefined
// D) ReferenceError

// ✅ Answer: B

// 🔥 MCQ-7 (Lexical scope trap)
// let a = 1;

// function foo() {
//   console.log(a);
// }

// (function () {
//   let a = 2;
//   foo();
// })();

// A) 1
// B) 2
// C) undefined
// D) ReferenceError

// ✅ Answer: A

// 🔥 MCQ-8 (Block scope + closure)
// function test() {
//   let x = 10;

//   if (true) {
//     let x = 20;
//     return () => console.log(x);
//   }
// }

// test()();

// A) 10
// B) 20
// C) undefined
// D) ReferenceError

// ✅ Answer: B

// 🔥 MCQ-9 (Multiple closures)
// function make() {
//   let x = 0;
//   return [
//     () => ++x,
//     () => ++x
//   ];
// }

// const [a, b] = make();
// console.log(a(), b(), a());

// A) 1 1 2
// B) 1 2 3
// C) 1 2 2
// D) 0 1 2

// ✅ Answer: B

// 🔥 MCQ-10 (Closure reference)
// function outer() {
//   let obj = { count: 0 };
//   return () => obj.count++;
// }

// const fn = outer();
// fn();
// fn();
// console.log(fn());

// A) 0
// B) 1
// C) 2
// D) 3

// ✅ Answer: C

// 🔥 MCQ-11 (var hoisting)
// function test() {
//   console.log(a);
//   var a = 10;
//   return () => console.log(a);
// }

// test()();

// A) undefined then 10
// B) 10 then 10
// C) undefined then undefined
// D) ReferenceError

// ✅ Answer: A

// 🔥 MCQ-12 (TDZ inside closure)
// function test() {
//   return () => console.log(x);
//   let x = 10;
// }

// test()();

// A) 10
// B) undefined
// C) ReferenceError
// D) SyntaxError

// ✅ Answer: C

// 🔥 MCQ-13 (Closure in loop + timeout)
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 0);
// }

// A) 0 1 2
// B) 3 3 3
// C) 2 2 2
// D) ReferenceError

// ✅ Answer: B

// 🔥 MCQ-14 (let + timeout)
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 0);
// }

// A) 0 1 2
// B) 3 3 3
// C) ReferenceError
// D) undefined

// ✅ Answer: A

// 🔥 MCQ-15 (Closure mutation)
// function counter() {
//   let count = 0;
//   return {
//     inc() { count++; },
//     get() { return count; }
//   };
// }

// const c = counter();
// c.inc();
// c.inc();
// console.log(c.get());

// A) 0
// B) 1
// C) 2
// D) ReferenceError

// ✅ Answer: C

// 🔥 MCQ-16 (Function param shadowing)
// let x = 10;

// function foo(x) {
//   return () => console.log(x);
// }

// foo(20)();

// A) 10
// B) 20
// C) undefined
// D) ReferenceError

// ✅ Answer: B

// 🔥 MCQ-17 (Closure + reassignment)
// function test() {
//   let x = 5;
//   return () => {
//     x++;
//     console.log(x);
//   };
// }

// const fn = test();
// fn();
// fn();

// A) 5 5
// B) 6 6
// C) 6 7
// D) 5 6

// ✅ Answer: C

// 🔥 MCQ-18 (Nested closures)
// function a() {
//   let x = 1;
//   return function b() {
//     let y = 2;
//     return function c() {
//       console.log(x + y);
//     };
//   };
// }

// a()()();

// A) 1
// B) 2
// C) 3
// D) ReferenceError

// ✅ Answer: C

// 🔥 MCQ-19 (Block + closure)
// let fn;

// {
//   let x = 10;
//   fn = () => console.log(x);
// }

// fn();

// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: A

// 🔥 MCQ-20 (Block cleanup myth)
// function test() {
//   {
//     let x = 10;
//     return () => console.log(x);
//   }
// }

// test()();

// A) 10
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: A
// 🧠 Block variables live if closure references them

// 🔥 MCQ-21 (Closure memory)
// function heavy() {
//   let big = new Array(1e6).fill(0);
//   return () => big.length;
// }

// const fn = heavy();

// Which is true?

// A) Memory freed after function
// B) Closure keeps memory alive
// C) GC deletes big
// D) Error

// ✅ Answer: B

// 🔥 MCQ-22 (Function redeclaration)
// function test() {
//   let a = 10;
//   {
//     function inner() {
//       console.log(a);
//     }
//   }
//   inner();
// }

// test();

// A) 10
// B) undefined
// C) ReferenceError
// D) SyntaxError

// ✅ Answer: A (non-strict mode)

// 🔥 MCQ-23 (Arrow lexical this + scope)
// let x = 10;

// const obj = {
//   x: 20,
//   foo: () => console.log(x)
// };

// obj.foo();

// A) 10
// B) 20
// C) undefined
// D) ReferenceError

// ✅ Answer: A

// 🔥 MCQ-24 (Closure overwrite)
// function test() {
//   let x = 1;
//   return [
//     () => console.log(x),
//     () => x++
//   ];
// }

// const [a, b] = test();
// b();
// a();

// A) 1
// B) 2
// C) undefined
// D) ReferenceError

// ✅ Answer: B

// 🔥 MCQ-25 (Closure + default param)
// let x = 10;

// function foo(y = x) {
//   let x = 20;
//   return y;
// }

// console.log(foo());

// A) 10
// B) 20
// C) undefined
// D) ReferenceError

// ✅ Answer: A
// 🧠 Default params have their own scope

// 🔥 MCQ-26 (var vs let capture)
// let fns = [];

// for (var i = 0; i < 2; i++) {
//   fns.push(() => i);
// }

// for (let j = 0; j < 2; j++) {
//   fns.push(() => j);
// }

// console.log(fns.map(fn => fn()));

// A) [2,2,0,1]
// B) [0,1,0,1]
// C) [2,2,2,2]
// D) Error

// ✅ Answer: A

// 🔥 MCQ-27 (Closure after reassignment)
// let x = 10;

// function foo() {
//   console.log(x);
// }

// x = 20;
// foo();

// A) 10
// B) 20
// C) undefined
// D) ReferenceError

// ✅ Answer: B
// 🧠 Closure keeps reference, not value

// 🔥 MCQ-28 (Closure inside return)
// function test() {
//   let x = 5;
//   return function () {
//     return function () {
//       console.log(x);
//     };
//   };
// }

// test()()();

// A) 5
// B) undefined
// C) ReferenceError
// D) null

// ✅ Answer: A

// 🔥 MCQ-29 (Temporal Dead Zone)
// function foo() {
//   return () => console.log(x);
//   const x = 10;
// }

// foo()();

// A) 10
// B) undefined
// C) ReferenceError
// D) SyntaxError

// ✅ Answer: C

// 🔥 MCQ-30 (Closure cleanup)
// function test() {
//   let x = 10;
//   return () => x = null;
// }

// const fn = test();
// fn();

// What happens?

// A) Memory released
// B) x still exists but null
// C) Error
// D) Closure destroyed

// ✅ Answer: B

// 🏆 Final Interview Insight

// Closures don’t copy values — they capture references to lexical environments.

// If you fully understand these 30 → You’re senior-level JS ready.
