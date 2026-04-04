// 🔥 What is forEach?

// 👉 forEach is an array method used to:
// ✔️ Iterate over each element
// ✔️ Execute a function on every item

// 🧠 Syntax
// array.forEach((element, index, array) => {
//   // logic
// });
// ✅ Basic Example
// const arr = [10, 20, 30];

// arr.forEach((num) => {
//   console.log(num);
// });

// 👉 Output:

// 10
// 20
// 30
// 🧠 Parameters Explained
// arr.forEach((value, index, array) => {
//   console.log(value, index);
// });

// ✔️ value → current element
// ✔️ index → position
// ✔️ array → original array

// 🔥 Key Characteristics (VERY IMPORTANT)
// 1. ❌ Does NOT return anything
// const result = [1, 2, 3].forEach(num => num * 2);

// console.log(result);

// 👉 Output:

// undefined

// 💥 This is a very common interview trap

// 2. ❌ Cannot break or return early
// [1, 2, 3].forEach(num => {
//   if (num === 2) return;
//   console.log(num);
// });

// 👉 Output:

// 1
// 3

// 💥 return only exits callback, NOT loop

// 3. ❌ Not suitable for async/await
// async function test() {
//   [1, 2, 3].forEach(async (num) => {
//     await new Promise(res => setTimeout(res, 1000));
//     console.log(num);
//   });
// }
// test();

// 👉 ❌ Output order is NOT guaranteed

// 💥 forEach doesn’t wait for async operations

// ✅ Correct Way (for async)
// async function test() {
//   for (let num of [1, 2, 3]) {
//     await new Promise(res => setTimeout(res, 1000));
//     console.log(num);
//   }
// }

// ✔️ Runs in sequence

// 🔥 forEach vs map (Interview Trap)

// | Feature  | forEach      | map            |
// | -------- | ------------ | -------------- |
// | Return   | ❌ undefined  | ✅ new array    |
// | Use case | Side effects | Transformation |

// ✅ Example:
// const arr = [1, 2, 3];

// arr.forEach(n => n * 2); // ❌ useless

// const result = arr.map(n => n * 2); // ✅ [2, 4, 6]
// 🧠 Tricky Question
// let sum = 0;

// [1, 2, 3].forEach(num => {
//   sum += num;
// });

// console.log(sum);

// 👉 Output:

// 6

// ✔️ Works for side effects

// ⚠️ When NOT to Use forEach

// ❌ When you need:

// Return value
// Break/continue
// Async control
// 🎯 One-Line Interview Answer

// “forEach is used for iterating over arrays to perform side effects, but it does not return a new array and cannot handle control flow like break or async/await properly.”

// 🚀 Pro-Level Line (Use This 💥)

// “forEach is ideal for side effects, but for transformations or async control, map or for...of should be preferred.”
