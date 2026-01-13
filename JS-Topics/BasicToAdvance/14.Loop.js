// 1️⃣ for loop

// 👉 Best when you know how many times the loop should run.

// Syntax
// for (initialization; condition; increment/decrement) {
//   // code to execute
// }

// Example
// for (let i = 1; i <= 5; i++) {
//   console.log(i);
// }

// Output
// 1 2 3 4 5

// Flow

// Initialize (let i = 1)

// Check condition (i <= 5)

// Execute code

// Increment (i++)

// Repeat

// 2️⃣ while loop

// 👉 Best when iterations are unknown and depend on a condition.

// Syntax
// while (condition) {
//   // code to execute
// }

// Example
// let i = 1;

// while (i <= 5) {
//   console.log(i);
//   i++;
// }

// Output
// 1 2 3 4 5

// ⚠️ Important: If the condition never becomes false → infinite loop.

// 3️⃣ do...while loop

// 👉 Executes at least once, even if the condition is false.

// Syntax
// do {
//   // code to execute
// } while (condition);

// Example
// let i = 6;

// do {
//   console.log(i);
//   i++;
// } while (i <= 5);

// Output
// 6

// ✔️ Runs once because condition is checked after execution.

// 🔥 Key Differences (Interview Favorite)

// | Loop Type    | Condition Check | Minimum Execution |
// | ------------ | --------------- | ----------------- |
// | `for`        | Before          | 0 times           |
// | `while`      | Before          | 0 times           |
// | `do...while` | After           | **1 time**        |

// 🧠 When to Use What?

// | Scenario                   | Best Loop    |
// | -------------------------- | ------------ |
// | Known number of iterations | `for`        |
// | Unknown iterations         | `while`      |
// | Must run at least once     | `do...while` |

// 🔥 Tricky JavaScript Loop Output Questions (Interview Level)
// (Answer first → explanation below each)

// 1️⃣ for loop with missing parts
// for (let i = 0; i < 3;) {
//   console.log(i);
//   i++;
// }

// ✅ Output

// 0
// 1
// 2

// 🧠 Why?
// Increment is inside the loop body, not in for().

// 2️⃣ Infinite loop or not?
// let i = 0;

// for (; i < 3; ) {
//   console.log(i);
//   i++;
// }

// ✅ Output

// 0
// 1
// 2

// 🧠 for loop does not require initialization or increment inside parentheses.

// 3️⃣ while with post-increment
// let i = 0;

// while (i++ < 3) {
//   console.log(i);
// }

// ✅ Output

// 1
// 2
// 3

// 🧠 i++ returns old value, but increments before console.log.

// 4️⃣ do...while executes once
// let i = 5;

// do {
//   console.log(i);
//   i++;
// } while (i < 5);

// ✅ Output

// 5

// 🧠 Condition checked after execution.

// 5️⃣ break vs continue
// for (let i = 0; i < 5; i++) {
//   if (i === 2) continue;
//   if (i === 4) break;
//   console.log(i);
// }

// ✅ Output

// 0
// 1
// 3

// 🧠 continue skips iteration, break stops loop.

// 6️⃣ Nested loops confusion
// for (let i = 1; i <= 2; i++) {
//   for (let j = 1; j <= 2; j++) {
//     console.log(i, j);
//   }
// }

// ✅ Output

// 1 1
// 1 2
// 2 1
// 2 2

// 🧠 Inner loop runs fully for each outer iteration.

// 7️⃣ let vs var in loops
// for (var i = 0; i < 3; i++) {}

// console.log(i);

// ✅ Output

// 3

// 🧠 var is function scoped, not block scoped.

// 8️⃣ Same code with let
// for (let i = 0; i < 3; i++) {}

// console.log(i);

// ❌ Error

// ReferenceError: i is not defined

// 🧠 let is block scoped.

// 9️⃣ Tricky while
// let i = 3;

// while (i--) {
//   console.log(i);
// }

// ✅ Output

// 2
// 1
// 0

// 🧠 Loop runs while old value is truthy.

// 🔟 do...while with false
// let i = 0;

// do {
//   console.log("Hello");
// } while (false);

// ✅ Output

// Hello

// 🧠 Always runs at least once.

// 🔥 SUPER TRICKY (Advanced)
// 1️⃣1️⃣ Labelled loop
// outer: for (let i = 1; i <= 3; i++) {
//   for (let j = 1; j <= 3; j++) {
//     if (j === 2) break outer;
//     console.log(i, j);
//   }
// }

// ✅ Output

// 1 1

// 🧠 break outer exits both loops.

// 1️⃣2️⃣ Empty loop body
// let i = 0;

// for (; i < 3; console.log(i++));

// ✅ Output

// 0
// 1
// 2

// 🧠 All work done in increment section.

// 🧠 Interview Tip (MEMORIZE THIS)

// i++ → use old value, then increment

// ++i → increment first, then use

// do...while → always executes once

// var leaks outside loop

// break stops, continue skips

// 🔥 forEach vs for Loop — Hidden Traps (Interview + Real Projects)
// (Most devs fail these in interviews)

// 1️⃣ ❌ You cannot break forEach
// [1, 2, 3, 4].forEach(n => {
//   if (n === 3) break;
// });

// ❌ Error

// Illegal break statement

// ✅ Correct way (for)

// for (let n of [1,2,3,4]) {
//   if (n === 3) break;
// }

// 🧠 Trap: forEach is a function call, not a loop construct.

// 2️⃣ ❌ return does NOT stop forEach
// [1, 2, 3].forEach(n => {
//   if (n === 2) return;
//   console.log(n);
// });

// ✅ Output

// 1
// 3

// 🧠 return only exits the callback, not the loop.

// 3️⃣ ❌ Async + forEach = BUG
// async function test() {
//   [1, 2, 3].forEach(async n => {
//     await new Promise(r => setTimeout(r, 1000));
//     console.log(n);
//   });
//   console.log("Done");
// }

// test();

// ✅ Output

// Done
// 1
// 2
// 3

// ❌ Expected sequential execution — but it runs in parallel.

// ✅ Correct (use for...of)
// async function test() {
//   for (const n of [1,2,3]) {
//     await new Promise(r => setTimeout(r, 1000));
//     console.log(n);
//   }
//   console.log("Done");
// }

// 4️⃣ ❌ await inside forEach is ignored
// await [1, 2, 3].forEach(async n => {
//   await fetchData(n);
// });

// 🧠 forEach does NOT return a promise.

// 5️⃣ ❌ Can't use continue
// [1,2,3,4].forEach(n => {
//   if (n % 2 === 0) continue;
// });

// ❌ Error

// Illegal continue statement

// ✅ Use return to skip

// [1,2,3,4].forEach(n => {
//   if (n % 2 === 0) return;
//   console.log(n);
// });

// 6️⃣ ❌ No early exit (Performance trap)
// let found = false;

// array.forEach(item => {
//   if (item === 5) {
//     found = true;
//     return;
//   }
// });

// 🧠 Loop still continues → unnecessary CPU work.

// ✅ Better

// const found = array.some(item => item === 5);

// 7️⃣ ❌ Modifying array while iterating
// let arr = [1,2,3];

// arr.forEach((n, i) => {
//   arr.push(n * 10);
// });

// ❌ Output

// Infinite loop / memory crash

// 🧠 forEach sees newly added elements.

// 8️⃣ ❌ this behaves differently
// const obj = {
//   value: 10,
//   run() {
//     [1,2].forEach(function() {
//       console.log(this.value);
//     });
//   }
// };

// obj.run();

// ❌ Output

// undefined
// undefined

// ✅ Fix with arrow

// [1,2].forEach(() => {
//   console.log(this.value);
// });

// 🧠 Arrow functions inherit this.

// 9️⃣ ❌ forEach returns undefined
// const result = [1,2,3].forEach(n => n * 2);
// console.log(result);

// ✅ Output

// undefined

// 🧠 Use map

// const result = [1,2,3].map(n => n * 2);

// 🔥 When NOT to use forEach

// ❌ Async/await
// ❌ Early exit needed
// ❌ Performance-sensitive logic
// ❌ Complex control flow

// ✅ When forEach is OK

// ✔️ Simple side-effects (logging, UI updates)
// ✔️ No break/continue
// ✔️ Synchronous logic only

// 🧠 Golden Rule (INTERVIEW LINE)

// “If you need control flow or async handling — never use forEach.”
