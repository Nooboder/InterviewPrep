// 🔹 What is Rest Parameter?

// 👉 Rest parameter (...) is used to collect multiple values into a single array

// 👉 Think: “Gather everything into one”

// 🔹 Basic Example
// function sum(...nums) {
//   console.log(nums);
// }

// sum(1, 2, 3, 4);
// ✅ Output:
// [1, 2, 3, 4]

// 👉 nums is a real array (unlike arguments)

// 🔥 Use Case: Sum function
// function sum(...nums) {
//   return nums.reduce((acc, curr) => acc + curr, 0);
// }

// console.log(sum(1, 2, 3)); // 6
// 🔹 Rest with other parameters
// function test(a, b, ...rest) {
//   console.log(a);    // 1
//   console.log(b);    // 2
//   console.log(rest); // [3, 4, 5]
// }

// test(1, 2, 3, 4, 5);
// 🚨 Important Rule

// 👉 Rest parameter must be last

// function test(...a, b) {} // ❌ Error
// 🔥 Rest in Destructuring
// ✅ Array:
// const [a, b, ...rest] = [1, 2, 3, 4];

// console.log(a);    // 1
// console.log(rest); // [3, 4]
// ✅ Object:
// const obj = { a: 1, b: 2, c: 3 };

// const { a, ...rest } = obj;

// console.log(rest); // { b: 2, c: 3 }

// 🔥 Rest vs Spread (VERY IMPORTANT)

// | Feature  | Rest            | Spread           |
// | -------- | --------------- | ---------------- |
// | Purpose  | Collect values  | Expand values    |
// | Position | Left side (LHS) | Right side (RHS) |

// Example:
// function test(...args) { // rest
//   console.log(args);
// }

// const arr = [1, 2, 3];

// test(...arr); // spread
// 🚨 Interview Traps
// 1. arguments vs rest
// function test(...args) {
//   console.log(Array.isArray(args)); // true
// }

// 👉 Rest → real array
// 👉 arguments → array-like

// 2. Rest ignores named params
// function test(a, ...rest) {
//   console.log(rest);
// }

// test(1, 2, 3); // [2, 3]
// 3. Empty rest
// function test(...args) {
//   console.log(args);
// }

// test(); // []
// 🚀 Real React Use Case
// ✅ Pass dynamic props
// const Button = ({ title, ...props }) => {
//   return <button {...props}>{title}</button>;
// };

// 👉 Very common in React

// ============================================================================================================================================================

// 🔥 1. Rest must be last
// function test(...a, b) {
//   console.log(a, b);
// }
// ❌ Answer:

// 👉 Syntax Error

// 👉 Rest parameter must be last

// 🔥 2. Spread vs Rest confusion
// const arr = [1, 2, 3];

// function test(a, b, c) {
//   console.log(a, b, c);
// }

// test(...arr);
// ✅ Answer:
// 1 2 3

// 👉 Spread → expands array

// 🔥 3. Rest collecting values
// function test(a, ...rest) {
//   console.log(rest);
// }

// test(1, 2, 3, 4);
// ✅ Answer:
// [2, 3, 4]
// 🔥 4. Destructuring + rest
// const arr = [1, 2, 3, 4];

// const [a, ...rest] = arr;

// console.log(a, rest);
// ✅ Answer:
// 1 [2, 3, 4]
// 🔥 5. Object destructuring + rest
// const obj = { a: 1, b: 2, c: 3 };

// const { a, ...rest } = obj;

// console.log(rest);
// ✅ Answer:
// { b: 2, c: 3 }
// 🔥 6. Spread override order
// const obj1 = { a: 1 };
// const obj2 = { a: 2 };

// const result = { ...obj1, ...obj2 };

// console.log(result);
// ✅ Answer:
// { a: 2 }

// 👉 Last spread wins 😈

// 🔥 7. Nested destructuring trap
// const obj = { a: { b: 10 } };

// const { a } = obj;

// a.b = 20;

// console.log(obj.a.b);
// ✅ Answer:
// 20

// 👉 Reference copied, not deep copy

// 🔥 8. Array to object spread
// const arr = [10, 20, 30];

// const obj = { ...arr };

// console.log(obj);
// ✅ Answer:
// { 0: 10, 1: 20, 2: 30 }
// 🔥 9. Missing values in destructuring
// const arr = [1];

// const [a, b = 5] = arr;

// console.log(a, b);
// ✅ Answer:
// 1 5

// 👉 Default works when value is undefined

// 🔥 10. Mixing everything (VERY HARD 😈)
// const arr = [1, 2, 3];

// function test(x, ...rest) {
//   const [a, ...b] = rest;
//   console.log(a, b);
// }

// test(...arr);
// ✅ Answer:
// 2 [3]

// 👉 Step-by-step:

// test(1, 2, 3)
// rest = [2, 3]
// a = 2, b = [3]
// 🧠 BONUS (INSANE LEVEL 😈)
// const obj = { a: 1, b: 2 };

// const result = {
//   ...obj,
//   a: 10,
//   ...{ a: 20 }
// };

// console.log(result);
// ✅ Answer:
// { a: 20, b: 2 }

// 👉 Order matters → last wins
