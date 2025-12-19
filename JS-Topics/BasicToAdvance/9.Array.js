// 📦 JavaScript Arrays — In-Depth Guide
// 1️⃣ What is an Array in JavaScript?

// An array is a special type of object used to store ordered collections of values.

// const arr = [10, 20, 30];

// Key properties

// Ordered (index-based)

// Zero-indexed

// Dynamic size

// Can store mixed data types

// const mix = [1, "hello", true, { a: 1 }, [10, 20]];

// 2️⃣ Arrays are Objects (Important 🔥)
// typeof [] // "object"
// Array.isArray([]) // true


// Internally:

// const arr = [10, 20];

// arr = {
//   0: 10,
//   1: 20,
//   length: 2
// }


// ➡️ That’s why arrays have methods and reference behavior.

// 3️⃣ Creating Arrays
// ✅ Literal (Recommended)
// const a = [1, 2, 3];

// ❌ Constructor (Avoid in interviews)
// new Array(5);     // empty array of length 5
// new Array(1, 2);  // [1, 2]


// ⚠️ Interview trap!

// 4️⃣ Array Length Behavior (Very Tricky)
// const arr = [1, 2, 3];
// arr.length = 5;

// console.log(arr); // [1, 2, 3, <2 empty items>]

// arr.length = 2;
// console.log(arr); // [1, 2]


// ➡️ length is mutable.

// 5️⃣ Accessing & Modifying Elements
// const arr = [10, 20, 30];

// arr[0];       // 10
// arr[10] = 99;

// console.log(arr.length); // 11


// ⚠️ Creates holes (sparse arrays)

// 6️⃣ Sparse Arrays (Performance Issue ⚠️)
// const arr = [];
// arr[100] = "hello";


// Memory inefficient

// Slower iteration

// Avoid in production

// 7️⃣ Reference Behavior (Critical Concept)
// const a = [1, 2];
// const b = a;

// b.push(3);

// console.log(a); // [1,2,3]


// ➡️ Arrays are reference types, not copied by value.

// Copy Properly
// const copy1 = [...a];
// const copy2 = a.slice();
// const copy3 = structuredClone(a);

// 8️⃣ Array Destructuring
// const arr = [10, 20, 30];

// const [a, b, c] = arr;

// Default Values
// const [x = 5, y = 10] = [undefined, 20];
// // x = 5, y = 20







// 9️⃣ Common Array Methods (Categorized)

// 🔹 Mutating Methods (Change Original Array)


// | Method  | Description            |
// | ------- | ---------------------- |
// | push    | add end                |
// | pop     | remove end             |
// | shift   | remove start           |
// | unshift | add start              |
// | splice  | add/remove anywhere    |
// | sort    | sort (⚠️ string-based) |
// | reverse | reverse                |


// arr.splice(1, 1, 99);



// 🔹 Non-Mutating Methods (Safe for React)

// | Method | Returns   |
// | ------ | --------- |
// | map    | new array |
// | filter | new array |
// | reduce | value     |
// | slice  | new array |
// | concat | new array |
// | flat   | new array |

// const newArr = arr.map(x => x * 2);










// 🔟 map vs forEach (Interview Favorite)
// arr.map(x => x * 2);      // returns new array
// arr.forEach(x => x * 2); // returns undefined


// ➡️ map → transformation
// ➡️ forEach → side-effects

// 1️⃣1️⃣ reduce — Most Powerful Method
// const sum = [1,2,3].reduce((acc, cur) => acc + cur, 0);

// Real Use-Cases

// Sum

// Grouping

// Flattening

// Counting frequency

// const freq = ["a","b","a"].reduce((acc, cur) => {
//   acc[cur] = (acc[cur] || 0) + 1;
//   return acc;
// }, {});

// 1️⃣2️⃣ Sorting Gotcha ⚠️
// [10, 2, 30].sort();
// // [10, 2, 30] ❌


// Correct way:

// [10, 2, 30].sort((a, b) => a - b);

// 1️⃣3️⃣ Flat & FlatMap
// [1, [2, [3]]].flat(2); // [1,2,3]

// arr.flatMap(x => [x, x * 2]);

// 1️⃣4️⃣ Iteration Techniques
// for (let i = 0; i < arr.length; i++) {}
// for (const value of arr) {}
// for (const index in arr) {} // ❌ avoid


// ➡️ for...in is for objects, not arrays

// 1️⃣5️⃣ Checking Array Content
// arr.includes(10);
// arr.indexOf(10);
// arr.some(x => x > 5);
// arr.every(x => x > 0);

// 1️⃣6️⃣ Arrays in React / Production (Important for You)

// Since you use React + Redux + TanStack Query:

// ✅ Avoid mutation

// // ❌
// state.items.push(newItem);

// // ✅
// state.items = [...state.items, newItem];


// Immutable operations prevent:

// Unexpected re-renders

// State bugs

// Redux issues






// 1️⃣8️⃣ Tricky Interview Questions 🔥
// console.log([] == []);
// // false

// console.log([] + []);
// // ""

// console.log([1,2] + [3,4]);
// // "1,23,4"

// console.log([,,,].length);
// // 3

// 1️⃣9️⃣ When NOT to Use Arrays

// Key-value data → use Object / Map

// Unique values → use Set

// Frequent insert/delete in middle → Linked list (conceptually)























// 🔥 JavaScript Array MCQs (Advanced Interview Level)



// MCQ 1️⃣
// const arr = [1, 2, 3];
// arr[10] = 99;

// console.log(arr.length);

// ✅ Answer:
// 11

// 🧠 Why?

// Arrays are objects

// Highest index + 1 = length

// Creates sparse array

// MCQ 2️⃣
// console.log([1, 2, 3] === [1, 2, 3]);

// ✅ Answer:
// false

// 🧠 Why?

// Arrays are reference types

// Two different memory locations

// MCQ 3️⃣
// const a = [1, 2];
// const b = a;

// b.push(3);
// console.log(a);

// ✅ Answer:
// [1, 2, 3]

// 🧠 Why?

// Same reference → mutation affects both.

// MCQ 4️⃣
// const arr = [1, 2, 3];

// const result = arr.map(x => {
//   if (x > 1) return;
//   return x * 2;
// });

// console.log(result);

// ✅ Answer:
// [2, undefined, undefined]

// 🧠 Why?

// map always returns same length

// Missing return ⇒ undefined

// MCQ 5️⃣
// const arr = [1, 2, 3];
// const result = arr.forEach(x => x * 2);

// console.log(result);

// ✅ Answer:
// undefined

// 🧠 Why?

// forEach returns nothing

// MCQ 6️⃣
// console.log([10, 2, 30].sort());

// ✅ Answer:
// [10, 2, 30]

// 🧠 Why?

// Default sort = string comparison

// MCQ 7️⃣
// const arr = [1, 2, 3];
// delete arr[1];

// console.log(arr.length, arr[1]);

// ✅ Answer:
// 3 undefined

// 🧠 Why?

// delete removes value, not index

// Leaves a hole

// MCQ 8️⃣
// console.log([,,,].length);

// ✅ Answer:
// 3

// 🧠 Why?

// Commas create empty slots

// MCQ 9️⃣
// console.log([] + []);

// ✅ Answer:
// ""

// 🧠 Why?

// + triggers string coercion

// [].toString() → ""

// MCQ 🔟
// console.log([1, 2] + [3, 4]);

// ✅ Answer:
// "1,23,4"

// 🧠 Why?

// Arrays → string → concatenation

// MCQ 1️⃣1️⃣
// const arr = [1, 2, 3];
// const res = arr.reduce((acc, cur) => acc + cur);

// console.log(res);

// ✅ Answer:
// 6

// 🧠 Why?

// First element used as acc

// Starts from index 1

// MCQ 1️⃣2️⃣
// console.log(
//   [1, 2, 3].reduce((a, b) => a + b, 10)
// );

// ✅ Answer:
// 16

// MCQ 1️⃣3️⃣
// const arr = [1, 2, 3];

// const res = arr.filter(x => {
//   x > 1;
// });

// console.log(res);

// ✅ Answer:
// []

// 🧠 Why?

// Missing return

// Filter expects boolean

// MCQ 1️⃣4️⃣
// const arr = [1, 2, 3];

// for (const i in arr) {
//   console.log(i);
// }

// ✅ Answer:
// 0
// 1
// 2

// 🧠 Why?

// for...in iterates keys, not values
// ⚠️ Dangerous for arrays

// MCQ 1️⃣5️⃣
// const arr = [1, 2, 3];

// arr.length = 0;

// console.log(arr);

// ✅ Answer:
// []

// 🧠 Why?

// Clearing array via length

// MCQ 1️⃣6️⃣
// const arr = [1, 2, 3];

// console.log(
//   arr.map(parseInt)
// );

// ✅ Answer:
// [1, NaN, NaN]

// 🧠 Why? 🔥
// parseInt(value, index)


// parseInt(2,1) → NaN

// parseInt(3,2) → NaN

// MCQ 1️⃣7️⃣
// const arr = [1, 2, 3];

// const res = arr.some(x => x > 2);
// console.log(res);

// ✅ Answer:
// true

// MCQ 1️⃣8️⃣
// const arr = [1, 2, 3];

// const res = arr.every(x => x > 1);
// console.log(res);

// ✅ Answer:
// false

// MCQ 1️⃣9️⃣
// const arr = [1, 2, 3];

// const res = arr.splice(1, 1);

// console.log(arr, res);

// ✅ Answer:
// [1, 3] [2]

// 🧠 Why?

// splice mutates

// Returns removed elements

// MCQ 2️⃣0️⃣ (🔥 Senior Level)
// const arr = [1, 2, 3];

// Object.freeze(arr);
// arr.push(4);

// console.log(arr);

// ✅ Answer:
// [1, 2, 3]


// ⚠️ In strict mode → TypeError