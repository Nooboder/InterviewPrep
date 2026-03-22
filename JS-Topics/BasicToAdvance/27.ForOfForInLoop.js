// Here’s a clean + interview-focused explanation of for...of vs for...in — this is a very common trap question 👇

// 🔥 Core Difference (One Line)

// 👉 for...in → keys (indexes / property names)
// 👉 for...of → values (actual elements)

// 🧠 1. for...in Loop

// 👉 Iterates over keys / property names

// ✅ Example (Array)
// const arr = [10, 20, 30];

// for (let i in arr) {
//   console.log(i);
// }

// 👉 Output:

// 0
// 1
// 2

// ✔️ Gives indexes, not values

// ✅ Example (Object)
// const user = {
//   name: "Sapta",
//   age: 25
// };

// for (let key in user) {
//   console.log(key);
// }

// 👉 Output:

// name
// age

// ✔️ Works great for objects

// 🧠 2. for...of Loop

// 👉 Iterates over values

// ✅ Example (Array)
// const arr = [10, 20, 30];

// for (let value of arr) {
//   console.log(value);
// }

// 👉 Output:

// 10
// 20
// 30

// ✔️ Gives actual elements

// ⚠️ Object with for...of?
// const user = { name: "Sapta" };

// for (let val of user) {
//   console.log(val);
// }

// 👉 ❌ Error:

// user is not iterable

// 💥 Objects are not iterable by default

// 🔥 Key Differences (Interview Table)

// | Feature       | `for...in`       | `for...of`               |
// | ------------- | ---------------- | ------------------------ |
// | Iterates over | Keys / indexes   | Values                   |
// | Works on      | Objects & arrays | Iterable (array, string) |
// | Output        | index/key        | actual value             |
// | Use case      | Object iteration | Array/string iteration   |

// 🧠 Tricky Interview Questions
// 🧠 1. What will this output?
// const arr = ["a", "b", "c"];

// for (let i in arr) {
//   console.log(arr[i]);
// }

// 👉 Answer:

// a
// b
// c

// 💡 Using index to access values

// 🧠 2. Hidden Trap (Prototype)
// Array.prototype.extra = "Hello";

// const arr = [1, 2, 3];

// for (let i in arr) {
//   console.log(i);
// }

// 👉 Answer:

// 0
// 1
// 2
// extra

// 💥 for...in also iterates inherited properties

// ✅ Fix:
// for (let i in arr) {
//   if (arr.hasOwnProperty(i)) {
//     console.log(i);
//   }
// }
// 🧠 3. Safe Loop (Recommended)

// 👉 For arrays → use for...of or .map()

// for (let val of arr) {
//   console.log(val);
// }

// ✔️ No prototype issues

// 🧠 4. String Example
// const str = "JS";

// for (let ch of str) {
//   console.log(ch);
// }

// 👉 Output:

// J
// S

// ✔️ Strings are iterable

// 🎯 Interview Trick Answer

// If asked:

// 👉 “Which one should you use?”

// Say:

// “Use for...of for arrays and iterables, and for...in for objects—but avoid for...in on arrays due to prototype pollution risks.”

// 🚀 Pro-Level Line (Use This 💥)

// “for...in iterates over enumerable properties including inherited ones, whereas for...of iterates over iterable values, making it safer for arrays.”
