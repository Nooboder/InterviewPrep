// 🔹 What is arguments?

// 👉 arguments is an array-like object available inside regular functions
// 👉 It contains all arguments passed to the function

// 🔹 Basic Example
// function sum() {
//   console.log(arguments);
// }

// sum(1, 2, 3);
// ✅ Output:
// {0: 1, 1: 2, 2: 3}

// 👉 Not a real array → it's array-like

// 🔹 Access values
// function test(a, b) {
//   console.log(arguments[0]); // a
//   console.log(arguments[1]); // b
// }

// test(10, 20);
// 🔥 Interview Trap: Not an Array
// function test() {
//   console.log(arguments.map(x => x * 2)); // ❌ Error
// }

// 👉 Why?
// arguments does NOT have array methods

// ✅ Convert to Array
// function test() {
//   const arr = Array.from(arguments);
//   console.log(arr.map(x => x * 2));
// }

// test(1, 2, 3); // [2, 4, 6]
// 🔥 Modern Alternative (VERY IMPORTANT)

// 👉 Use Rest Parameters (...args) instead of arguments

// function sum(...args) {
//   return args.reduce((acc, curr) => acc + curr, 0);
// }

// console.log(sum(1, 2, 3, 4)); // 10

// ✅ Real array
// ✅ Cleaner
// ✅ Preferred in modern JS

// 🚨 Arrow Function Trap
// const test = () => {
//   console.log(arguments);
// };

// test(1, 2, 3);
// ❌ Error:

// 👉 arguments is NOT available in arrow functions

// 🔥 arguments vs rest (...args)

// | Feature                 | arguments  | ...args       |
// | ----------------------- | ---------- | ------------- |
// | Type                    | Array-like | Real array    |
// | Works in arrow function | ❌ No       | ✅ Yes         |
// | Modern usage            | ❌ Avoid    | ✅ Recommended |

// 🚀 Real Interview Example
// function multiply() {
//   return Array.from(arguments).reduce((acc, curr) => acc * curr, 1);
// }

// console.log(multiply(2, 3, 4)); // 24
// 🧠 Pro Tips
// arguments is legacy (ES5)
// Always prefer rest operator (...args)
// Interviewers may ask:
// 👉 Difference between arguments & rest
// 👉 Why arguments fails in arrow function

// 🔥 1. arguments vs parameters sync
// function test(a) {
//   arguments[0] = 100;
//   console.log(a);
// }

// test(10);
// ✅ Answer:
// 100

// 👉 In non-strict mode, arguments is linked to parameters 😈

// 🔥 2. Strict mode behavior
// "use strict";

// function test(a) {
//   arguments[0] = 100;
//   console.log(a);
// }

// test(10);
// ✅ Answer:
// 10

// 👉 In strict mode, arguments is NOT linked to parameters

// 🔥 3. arguments length vs parameters
// function test(a, b) {
//   console.log(arguments.length);
// }

// test(1);
// ✅ Answer:
// 1

// 👉 Counts passed arguments, not defined parameters

// 🔥 4. Arrow function trap
// function outer() {
//   const inner = () => {
//     console.log(arguments);
//   };
//   inner(1, 2, 3);
// }

// outer(10, 20);
// ✅ Answer:
// {0: 10, 1: 20}

// 👉 Arrow function uses outer function's arguments

// 🔥 5. arguments with default parameters (VERY TRICKY)
// function test(a = 5) {
//   console.log(arguments[0]);
//   console.log(a);
// }

// test(undefined);
// ✅ Answer:
// undefined
// 5

// 👉 arguments stores actual passed value
// 👉 Default parameter works separately

// 🧠 BONUS (INSANE LEVEL)
// function test(a, b) {
//   a = 10;
//   arguments[1] = 20;
//   console.log(a, b);
// }

// test(1, 2);
// ✅ Answer:
// 10 20

// 👉 a updated directly
// 👉 b updated via arguments
