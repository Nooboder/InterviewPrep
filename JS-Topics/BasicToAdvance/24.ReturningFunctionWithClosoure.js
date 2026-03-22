// 🔥 What is Closure?

// 👉 A closure is when a function:
// ✔️ “remembers” variables from its outer scope
// ✔️ even after the outer function has finished execution

// 🧠 Returning Function with Closure

// 👉 When you return a function, it still has access to the outer variables → that’s closure

// ✅ Example (Most Important)
// function outer() {
//   let count = 0;

//   return function inner() {
//     count++;
//     console.log(count);
//   };
// }

// const counter = outer();

// counter(); // 1
// counter(); // 2
// counter(); // 3
// 💡 Why this works?
// outer() finishes execution ❌
// But inner() still remembers count ✅

// 👉 Because of closure

// 🔥 Visual Understanding
// outer() execution → returns inner()
// BUT memory of count is preserved
// 🧪 Another Example (Interview Favorite)
// function multiply(x) {
//   return function (y) {
//     return x * y;
//   };
// }

// const double = multiply(2);
// console.log(double(5)); // 10

// 👉 x is remembered even after multiply() is done

// 🚀 Real-Life Use Cases
// ✅ 1. Data Privacy (Encapsulation)
// function secret() {
//   let password = "12345";

//   return function () {
//     console.log(password);
//   };
// }

// const getPassword = secret();
// getPassword(); // still accessible

// 👉 password is private

// ✅ 2. Function Factory
// function greet(msg) {
//   return function (name) {
//     console.log(msg + ", " + name);
//   };
// }

// const sayHello = greet("Hello");
// sayHello("Sapta");
// ⚠️ Tricky Interview Question
// 🧠 Q: Will this work?
// function test() {
//   let x = 10;

//   return function () {
//     console.log(x);
//   };
// }

// const fn = test();
// test();
// fn();

// 👉 Answer:

// 10

// ✔️ Because fn has closure over x

// 🧠 Another Trap
// function outer() {
//   let x = 10;

//   return function () {
//     console.log(x);
//   };
// }

// const fn1 = outer();
// const fn2 = outer();

// fn1();
// fn2();

// 👉 Output:

// 10
// 10

// 💥 BUT:
// 👉 They have separate memory (different closures)

// 🎯 One-Line Interview Answer

// “A closure is created when a function is returned and it retains access to its lexical scope variables even after the outer function has executed.”

// 🚀 Pro-Level Line (Use This 💥)

// “Closures enable data encapsulation and function factories by preserving the execution context of outer variables.”

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// 🧠 Question 1 (Closure + var + async)
// for (var i = 0; i < 3; i++) {
//   setTimeout(function () {
//     console.log(i);
//   }, i * 100);
// }

// 👉 Answer:

// 3
// 3
// 3

// 💥 Why?

// var → function scoped (single shared binding)
// By the time callbacks run → i = 3
// 🧠 Question 2 (Closure Fix with IIFE)
// for (var i = 0; i < 3; i++) {
//   (function (i) {
//     setTimeout(function () {
//       console.log(i);
//     }, i * 100);
//   })(i);
// }

// 👉 Answer:

// 0
// 1
// 2

// 💡 IIFE creates new closure per iteration

// 🧠 Question 3 (Mutating Closure Variable)
// function outer() {
//   let x = 1;

//   return function () {
//     x++;
//     return x;
//   };
// }

// const fn1 = outer();
// const fn2 = outer();

// console.log(fn1());
// console.log(fn1());
// console.log(fn2());

// 👉 Answer:

// 2
// 3
// 2

// 💥 Each function has its own closure memory

// 🧠 Question 4 (Object Reference Trap)
// function outer() {
//   let obj = { count: 0 };

//   return function () {
//     obj.count++;
//     console.log(obj.count);
//   };
// }

// const a = outer();
// const b = outer();

// a();
// a();
// b();

// 👉 Answer:

// 1
// 2
// 1

// 💡 Closures store reference, but each call creates new object

// 🧠 Question 5 (setTimeout inside closure + let)
// function test() {
//   for (let i = 0; i < 3; i++) {
//     setTimeout(() => console.log(i), 0);
//   }
// }

// test();

// 👉 Answer:

// 0
// 1
// 2

// 💥 let creates block scope per iteration

// 🧠 Question 6 (Closure + Default Parameter Trap)
// function outer(x) {
//   return function (y = x) {
//     x = 10;
//     console.log(y);
//   };
// }

// const fn = outer(5);
// fn();

// 👉 Answer:

// 5

// 💡 Default param evaluated before function body runs

// 🧠 Question 7 (Closure + Reassignment)
// function outer() {
//   let x = 10;

//   return function () {
//     console.log(x);
//   };
// }

// let fn = outer();

// fn();

// fn = function () {
//   console.log("New Function");
// };

// fn();

// 👉 Answer:

// 10
// New Function

// 💥 Closure lost when reference replaced

// 🧠 Question 8 (Nested Closures 🔥)
// function outer() {
//   let x = 1;

//   return function inner() {
//     let y = 2;

//     return function innerMost() {
//       console.log(x + y);
//     };
//   };
// }

// outer()()();

// 👉 Answer:

// 3

// 💡 Inner functions access all outer scopes

// 🧠 Question 9 (Closure + Async + Mutation 🔥 HARD)
// function outer() {
//   let x = 0;

//   setTimeout(() => {
//     x = 5;
//   }, 0);

//   return function () {
//     console.log(x);
//   };
// }

// const fn = outer();

// fn();

// setTimeout(fn, 10);

// 👉 Answer:

// 0
// 5

// 💥 Timeline:

// First fn() → before timeout → 0
// Later → x updated → 5
// 🧠 Question 10 (Loop + Closure + setTimeout HARDCORE)
// for (var i = 0; i < 3; i++) {
//   setTimeout(
//     ((i) => () => console.log(i))(i),
//     100
//   );
// }

// 👉 Answer:

// 0
// 1
// 2

// 💥 Trick:

// Immediately invoked arrow captures i

// 🧠 1. (IBM Style – Closure + Async Trap)
// function createFunctions() {
//   var result = [];

//   for (var i = 0; i < 3; i++) {
//     result.push(function () {
//       console.log(i);
//     });
//   }

//   return result;
// }

// const arr = createFunctions();
// arr[0]();
// arr[1]();
// arr[2]();

// 👉 Answer:

// 3
// 3
// 3

// 💥 Why:

// var → one shared binding
// All closures point to same i
// ✅ Fix (they often ask this follow-up)
// for (let i = 0; i < 3; i++) {

// 👉 Output:

// 0
// 1
// 2
// 🧠 2. (Deloitte Style – Event Loop Priority)
// console.log("A");

// setTimeout(() => console.log("B"), 0);

// Promise.resolve()
//   .then(() => console.log("C"))
//   .then(() => console.log("D"));

// console.log("E");

// 👉 Answer:

// A
// E
// C
// D
// B

// 💥 Key concept:

// Microtasks (Promise) run before Macrotasks (setTimeout)
// 🧠 3. (PwC Style – Closure + Mutation)
// function outer() {
//   let x = 10;

//   return {
//     increment: function () {
//       x++;
//       console.log(x);
//     },
//     decrement: function () {
//       x--;
//       console.log(x);
//     }
//   };
// }

// const obj = outer();

// obj.increment();
// obj.increment();
// obj.decrement();

// 👉 Answer:

// 11
// 12
// 11

// 💥 Shared closure → same x modified

// 🧠 4. (IBM Style – setTimeout + Loop + Scope)
// for (var i = 1; i <= 3; i++) {
//   setTimeout(() => console.log(i), i * 1000);
// }

// 👉 Answer:

// 4
// 4
// 4

// 💥 Loop ends → i = 4

// ✅ Expected Fix:
// for (let i = 1; i <= 3; i++) {

// 👉 Output:

// 1
// 2
// 3
// 🧠 5. (Deloitte Style – Function Hoisting + Closure)
// function test() {
//   console.log(a);
//   var a = 10;

//   return function () {
//     console.log(a);
//   };
// }

// const fn = test();
// fn();

// 👉 Answer:

// undefined
// 10

// 💥 Why:

// var a is hoisted → undefined
// Closure captures updated value
// 🧠 6. (PwC Style – Async + Closure HARD)
// function outer() {
//   let x = 1;

//   setTimeout(() => {
//     x = 5;
//   }, 0);

//   return function () {
//     console.log(x);
//   };
// }

// const fn = outer();

// fn();

// setTimeout(fn, 10);

// 👉 Answer:

// 1
// 5

// 💥 Timing + closure mutation

// 🧠 7. (IBM Style – Promise Chain Trap)
// console.log("Start");

// setTimeout(() => console.log("Timeout"), 0);

// Promise.resolve()
//   .then(() => {
//     console.log("Promise1");
//   })
//   .then(() => {
//     console.log("Promise2");
//   });

// console.log("End");

// 👉 Answer:

// Start
// End
// Promise1
// Promise2
// Timeout
// 🧠 8. (Deloitte Style – Nested Closure)
// function outer(a) {
//   return function inner(b) {
//     return function innerMost(c) {
//       console.log(a + b + c);
//     };
//   };
// }

// outer(1)(2)(3);

// 👉 Answer:

// 6

// 💡 Multi-level closure

// 🧠 9. (PwC Style – Trick with setTimeout)
// setTimeout(() => console.log("1"), 0);

// console.log("2");

// setTimeout(() => console.log("3"), 0);

// console.log("4");

// 👉 Answer:

// 2
// 4
// 1
// 3

// 💥 FIFO queue in macrotasks

// 🧠 10. (IBM Advanced – Closure + Reference Trap)
// function outer() {
//   let obj = { value: 1 };

//   return function () {
//     obj.value++;
//     console.log(obj.value);
//   };
// }

// const fn1 = outer();
// const fn2 = outer();

// fn1();
// fn1();
// fn2();

// 👉 Answer:

// 2
// 3
// 2

// 💥 Each closure has separate object reference

// 🎯 What Interviewers Are Actually Testing

// They’re checking if you understand:

// ✔️ Closures store reference, not value
// ✔️ Difference between var vs let
// ✔️ Event Loop (microtask vs macrotask)
// ✔️ Async timing behavior
// ✔️ Scope + hoisting
