// 🔥 JavaScript Functions & return Keyword (Deep + Tricky)
// 1️⃣ What is a Function?

// A function is a reusable block of code that performs a task and optionally returns a value.

// function add(a, b) {
//   return a + b;
// }

// add(2, 3); // 5

// 2️⃣ Types of Functions (Quick View)
// 🔹 Function Declaration
// function greet() {
//   return "Hello";
// }

// 🔹 Function Expression
// const greet = function () {
//   return "Hello";
// };

// 🔹 Arrow Function
// const greet = () => "Hello";

// 3️⃣ The return Keyword (VERY IMPORTANT)
// ✅ What return does

// Sends a value back

// Stops function execution immediately

// function test() {
//   console.log("A");
//   return;
//   console.log("B");
// }

// test();

// ✅ Output

// A

// 4️⃣ Function Without return
// function sum(a, b) {
//   a + b;
// }

// console.log(sum(2, 3));

// ✅ Output

// undefined

// 🧠 If no return, JS returns undefined.

// 5️⃣ Multiple return Statements
// function check(num) {
//   if (num > 0) return "Positive";
//   if (num < 0) return "Negative";
//   return "Zero";
// }

// check(0); // "Zero"

// 🧠 First return executed → function exits.

// 6️⃣ return vs console.log
// function calc(a, b) {
//   console.log(a + b);
// }

// const result = calc(2, 3);
// console.log(result);

// ✅ Output

// 5
// undefined

// 🧠 console.log prints, return gives value.

// 7️⃣ return in Arrow Functions
// Implicit return
// const square = n => n * n;

// Explicit return
// const square = n => {
//   return n * n;
// };

// ❌ Wrong

// const square = n => { n * n };

// 🧠 {} requires return.

// 8️⃣ return with Objects (TRAP)
// const getUser = () => {
//   return
//   {
//     name: "Sapta"
//   };
// };

// console.log(getUser());

// ❌ Output

// undefined

// ✅ Correct

// const getUser = () => {
//   return {
//     name: "Sapta"
//   };
// };

// 🧠 Automatic Semicolon Insertion (ASI) trap.

// 9️⃣ Early Return (Best Practice)
// function login(user) {
//   if (!user) return "Invalid user";
//   if (!user.isActive) return "Blocked";
//   return "Login success";
// }

// 🧠 Cleaner, faster, readable.

// 🔟 return Inside Loops
// function findEven(arr) {
//   for (let n of arr) {
//     if (n % 2 === 0) return n;
//   }
//   return null;
// }

// findEven([1,3,5,8,9]); // 8

// 🧠 return exits entire function, not just loop.

// 1️⃣1️⃣ Returning Functions (Closures)
// function outer() {
//   return function inner() {
//     return "Hello";
//   };
// }

// outer()(); // "Hello"

// 1️⃣2️⃣ Return vs Throw
// function test() {
//   return "OK";
//   throw new Error("Fail");
// }

// 🧠 Code after return is unreachable.

// // 🔥 INTERVIEW TRAPS (MEMORIZE)

// | Trap                      | Result              |
// | ------------------------- | ------------------- |
// | No `return`               | `undefined`         |
// | Code after `return`       | Never runs          |
// | `return` in `forEach`     | Exits callback only |
// | Arrow `{}` without return | `undefined`         |
// | New line after `return`   | ASI bug             |

// 🧠 One-Line Interview Answer

// "return sends data back and immediately stops function execution."

// 🔥 JavaScript return – Tricky Output Questions (Interview Level)
// (Predict output first — explanation after each)

// 1️⃣ Code after return
// function test() {
//   return "A";
//   console.log("B");
// }

// console.log(test());

// ✅ Output

// A

// 🧠 Code after return is unreachable.

// 2️⃣ Missing return
// function sum(a, b) {
//   a + b;
// }

// console.log(sum(2, 3));

// ✅ Output

// undefined

// 🧠 Expression without return is discarded.

// 3️⃣ return inside if
// function check(x) {
//   if (x > 10) {
//     return "Big";
//   }
// }

// console.log(check(5));

// ✅ Output

// undefined

// 🧠 Function ends without hitting return.

// 4️⃣ Multiple returns
// function test(x) {
//   if (x) return "Yes";
//   return "No";
// }

// console.log(test(0));

// ✅ Output

// No

// 🧠 0 is falsy.

// 5️⃣ return in loop
// function find(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === 3) return i;
//   }
//   return -1;
// }

// console.log(find([1,2,3,4]));

// ✅ Output

// 2

// 🧠 return exits entire function, not loop.

// 6️⃣ return inside forEach (TRAP)
// function test() {
//   [1,2,3].forEach(n => {
//     if (n === 2) return;
//     console.log(n);
//   });
//   return "Done";
// }

// console.log(test());

// ✅ Output

// 1
// 3
// Done

// 🧠 return exits callback, not function.

// 7️⃣ Arrow function object return (ASI TRAP)
// const getUser = () => {
//   return
//   {
//     name: "Sapta"
//   };
// };

// console.log(getUser());

// ❌ Output

// undefined

// 🧠 Automatic Semicolon Insertion.

// 8️⃣ Correct object return
// const getUser = () => {
//   return {
//     name: "Sapta"
//   };
// };

// console.log(getUser());

// ✅ Output

// { name: "Sapta" }

// 9️⃣ Implicit return
// const add = (a, b) => a + b;

// console.log(add(2, 3));

// ✅ Output

// 5

// 🔟 Implicit return TRAP
// const add = (a, b) => { a + b };

// console.log(add(2, 3));

// ❌ Output

// undefined

// 🧠 {} requires explicit return.

// 1️⃣1️⃣ return vs console.log
// function demo() {
//   console.log("Hello");
//   return;
// }

// console.log(demo());

// ✅ Output

// Hello
// undefined

// 1️⃣2️⃣ Nested function return
// function outer() {
//   return function inner() {
//     return "Hi";
//   };
// }

// console.log(outer());
// console.log(outer()());

// ✅ Output

// ƒ inner() { ... }
// Hi

// 1️⃣3️⃣ return inside try
// function test() {
//   try {
//     return 1;
//   } finally {
//     return 2;
//   }
// }

// console.log(test());

// 🔥 Output

// 2

// 🧠 finally overrides return.

// 1️⃣4️⃣ Return + async (TRAP)
// async function test() {
//   return 10;
// }

// console.log(test());

// ✅ Output

// Promise { 10 }

// 1️⃣5️⃣ Awaited return
// async function test() {
//   return 10;
// }

// test().then(console.log);

// ✅ Output

// 10

// 🔥 ULTRA TRICKY
// 1️⃣6️⃣ return in constructor
// function Person() {
//   this.name = "Sapta";
//   return { name: "Singha" };
// }

// console.log(new Person().name);

// ✅ Output

// Singha

// 🧠 Returning object overrides this.

// 🧠 Interview Golden Rules

// return stops execution

// No return → undefined

// return in forEach ≠ function exit

// Arrow {} needs return

// finally beats return

// async always returns Promise

// 🔥 Arrow Function vs Normal Function — Output Traps (Interview Level)
// (Most developers get at least 50% wrong)

// 1️⃣ this inside object method
// const obj = {
//   value: 10,
//   normal() {
//     console.log(this.value);
//   },
//   arrow: () => {
//     console.log(this.value);
//   }
// };

// obj.normal();
// obj.arrow();

// ✅ Output

// 10
// undefined

// 🧠 Arrow function has no own this — it uses lexical this.

// 2️⃣ this inside setTimeout
// const user = {
//   name: "Sapta",
//   greet() {
//     setTimeout(function () {
//       console.log(this.name);
//     }, 0);
//   }
// };

// user.greet();

// ❌ Output

// undefined

// ✅ Fix using arrow
// setTimeout(() => {
//   console.log(this.name);
// }, 0);

// 🧠 Arrow inherits this from greet.

// 3️⃣ Arrow function as constructor ❌
// const Person = () => {
//   this.name = "Sapta";
// };

// const p = new Person();

// ❌ Error

// Person is not a constructor

// 🧠 Arrow functions cannot be used with new.

// 4️⃣ arguments object
// function normal(a, b) {
//   console.log(arguments);
// }

// const arrow = (a, b) => {
//   console.log(arguments);
// };

// normal(1, 2);
// arrow(1, 2);

// ✅ Output

// [1, 2]
// ReferenceError: arguments is not defined

// 🧠 Arrow functions don’t have arguments.

// 5️⃣ call, apply, bind TRAP
// const obj = { x: 10 };

// const arrow = () => console.log(this.x);
// const normal = function () {
//   console.log(this.x);
// };

// arrow.call(obj);
// normal.call(obj);

// ✅ Output

// undefined
// 10

// 🧠 bind/call/apply cannot change arrow this.

// 6️⃣ Implicit return
// const arrow = () => 5;
// const normal = function () {
//   return 5;
// };

// console.log(arrow(), normal());

// ✅ Output

// 5 5

// 7️⃣ Implicit return TRAP
// const arrow = () => { value: 10 };

// console.log(arrow());

// ❌ Output

// undefined

// 🧠 {} treated as block, not object.

// 8️⃣ Correct object return
// const arrow = () => ({ value: 10 });

// console.log(arrow());

// ✅ Output

// { value: 10 }

// 9️⃣ Hoisting difference
// sayHello();
// sayHi();

// function sayHello() {
//   console.log("Hello");
// }

// const sayHi = () => {
//   console.log("Hi");
// };

// ✅ Output

// Hello
// ReferenceError

// 🧠 Function declarations are hoisted, arrow functions are not.

// 🔟 return inside arrow vs normal
// const arrow = () => {
//   return
//   10;
// };

// function normal() {
//   return
//   10;
// }

// console.log(arrow(), normal());

// ✅ Output

// undefined undefined

// 🧠 ASI affects both.

// 1️⃣1️⃣ Arrow in class method
// class Counter {
//   count = 0;

//   incArrow = () => {
//     this.count++;
//   };

//   incNormal() {
//     this.count++;
//   }
// }

// const c = new Counter();

// const fn1 = c.incArrow;
// const fn2 = c.incNormal;

// fn1();
// fn2();

// ❌ Output

// Error or undefined behavior

// ✅ Why

// Arrow keeps this

// Normal loses this when detached

// 1️⃣2️⃣ Performance TRAP
// class Test {
//   arrow = () => {};
//   normal() {}
// }

// 🧠 Arrow creates new function per instance
// Normal is on prototype → memory efficient.

// 🔥 JavaScript return vs throw — Tricky Output Traps (Interview Level)
// (Predict output first — explanation after each)

// 1️⃣ Basic difference
// function test() {
//   return "OK";
//   throw new Error("Fail");
// }

// console.log(test());

// ✅ Output

// OK

// 🧠 return ends function → throw is unreachable.

// 2️⃣ throw stops everything
// function test() {
//   console.log("A");
//   throw "Error";
//   console.log("B");
// }

// test();

// ✅ Output

// A
// Uncaught Error

// 🧠 Code after throw never executes.

// 3️⃣ return vs throw with try/catch
// function test() {
//   try {
//     return "Try";
//   } catch {
//     return "Catch";
//   }
// }

// console.log(test());

// ✅ Output

// Try

// 🧠 No error → catch skipped.

// 4️⃣ throw caught
// function test() {
//   try {
//     throw "Boom";
//   } catch {
//     return "Caught";
//   }
// }

// console.log(test());

// ✅ Output

// Caught

// 🧠 throw jumps to catch.

// 5️⃣ finally overrides return
// function test() {
//   try {
//     return 1;
//   } finally {
//     return 2;
//   }
// }

// console.log(test());

// 🔥 Output

// 2

// 🧠 finally wins over return.

// 6️⃣ finally overrides throw (ULTRA TRAP)
// function test() {
//   try {
//     throw "Error";
//   } finally {
//     return "Recovered";
//   }
// }

// console.log(test());

// 🔥 Output

// Recovered

// 🧠 return in finally swallows errors ❌

// 7️⃣ throw in finally
// function test() {
//   try {
//     return "OK";
//   } finally {
//     throw "Fail";
//   }
// }

// console.log(test());

// 🔥 Output

// Uncaught Fail

// 🧠 throw beats return.

// 8️⃣ return inside catch
// function test() {
//   try {
//     throw "Error";
//   } catch {
//     return "Handled";
//   } finally {
//     console.log("Cleanup");
//   }
// }

// console.log(test());

// ✅ Output

// Cleanup
// Handled

// 🧠 finally always executes.

// 9️⃣ throw vs return type
// function test() {
//   throw 123;
// }

// test();

// ✅ Output

// Uncaught 123

// 🧠 JS allows throwing any value, not just Error objects.

// 🔟 Async return vs throw
// async function test1() {
//   return 10;
// }

// async function test2() {
//   throw "Error";
// }

// console.log(test1());
// console.log(test2());

// ✅ Output

// Promise { 10 }
// Promise { <rejected> "Error" }

// 🧠 return → resolved promise
// 🧠 throw → rejected promise

// 1️⃣1️⃣ Catching async throw
// async function test() {
//   try {
//     throw "Boom";
//   } catch {
//     return "Safe";
//   }
// }

// test().then(console.log);

// ✅ Output

// Safe

// 1️⃣2️⃣ Return inside loop vs throw
// function test(arr) {
//   for (let n of arr) {
//     if (n === 3) return "Found";
//     if (n === 4) throw "Invalid";
//   }
// }

// console.log(test([1,2,3,4]));

// ✅ Output

// Found

// 🧠 return exits before error.

// 🔥 SUPER TRAP (Real bug)
// function test() {
//   try {
//     throw "Crash";
//   } catch {
//     return "Recovered";
//   } finally {
//     return "Finally";
//   }
// }

// console.log(test());

// 🔥 Output

// Finally

// ❌ Never return in finally in production code

// 🏆 One-Line Interview Answer

// "return ends execution normally, throw ends execution abnormally and propagates an error."
