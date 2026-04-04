// 🔹 1. every()
// 👉 Theory:
// Checks if ALL elements satisfy a condition
// Returns true / false
// Stops early when any element fails

// 👉 Think: “Does everything pass?”

// ✅ Example:
// const nums = [2, 4, 6];

// const result = nums.every(n => n % 2 === 0);

// console.log(result); // true

// 👉 All numbers are even ✔️

// ❌ Example:
// const nums = [2, 4, 5];

// const result = nums.every(n => n % 2 === 0);

// console.log(result); // false

// 👉 One element (5) fails ❌

// 🔹 2. some()
// 👉 Theory:
// Checks if AT LEAST ONE element satisfies condition
// Returns true / false
// Stops early when condition is true

// 👉 Think: “Does anything pass?”

// ✅ Example:
// const nums = [1, 3, 5, 6];

// const result = nums.some(n => n % 2 === 0);

// console.log(result); // true

// 👉 At least one even number ✔️

// ❌ Example:
// const nums = [1, 3, 5];

// const result = nums.some(n => n % 2 === 0);

// console.log(result); // false

// 👉 No even numbers ❌

// 🔥 Key Difference (VERY IMPORTANT)
// | Method | Condition      |
// | ------ | -------------- |
// | every  | ALL must pass  |
// | some   | ANY one passes |

// 🚨 Interview Traps
// 1. Empty array behavior
// [].every(x => x > 0); // true 😱
// [].some(x => x > 0);  // false

// 👉 Why?

// every → no element violates → true
// some → no element satisfies → false
// 2. Missing return
// const arr = [1, 2, 3];

// arr.some(x => { x > 2 }); // false

// 👉 {} needs return

// 3. Short-circuit behavior
// const arr = [1, 2, 3, 4];

// arr.some(x => {
//   console.log(x);
//   return x > 2;
// });

// 👉 Output:

// 1
// 2
// 3

// Stops after first true ✔️

// 🚀 Real Interview Use Cases
// ✅ Form validation
// const fields = ["name", "email", "password"];

// const allFilled = fields.every(f => f.length > 0);
// ✅ Check if any error exists
// const errors = ["", "", "Invalid email"];

// const hasError = errors.some(e => e !== "");
// 🧠 Pro Tip (React Dev 🔥)
// Use every() → validation
// Use some() → error detection / flags
// Both are faster than loops due to early exit

// ========================================================================================================================================

// 🔥 1. Empty array trap
// console.log([].every(x => x > 0));
// console.log([].some(x => x > 0));
// ✅ Answer:
// true
// false

// 👉 every → nothing fails → true
// 👉 some → nothing passes → false

// 🔥 2. Truthy trap
// const arr = [1, 2, 3];

// const result = arr.some(x => x);
// console.log(result);
// ✅ Answer:
// true

// 👉 All numbers are truthy → first element already returns true

// 🔥 3. Missing return
// const arr = [1, 2, 3];

// const result = arr.every(x => { x > 0 });
// console.log(result);
// ✅ Answer:
// false

// 👉 {} without return → returns undefined → falsy

// 🔥 4. Short-circuit (some)
// [1, 2, 3, 4].some(x => {
//   console.log(x);
//   return x > 2;
// });
// ✅ Output:
// 1
// 2
// 3

// 👉 Stops when condition becomes true

// 🔥 5. Short-circuit (every)
// [2, 4, 6, 7, 8].every(x => {
//   console.log(x);
//   return x % 2 === 0;
// });
// ✅ Output:
// 2
// 4
// 6
// 7

// 👉 Stops when condition fails (7)

// 🔥 6. Boolean coercion
// const arr = [0, null, "", 5];

// console.log(arr.some(Boolean));
// console.log(arr.every(Boolean));
// ✅ Answer:
// true
// false

// 👉 Boolean(5) → true → some = true
// 👉 Not all truthy → every = false

// 🔥 7. Comparing objects
// const arr = [{ a: 1 }, { a: 2 }];

// const result = arr.every(obj => obj.a);
// console.log(result);
// ✅ Answer:
// true

// 👉 1 and 2 are truthy

// 🔥 8. Nested arrays
// const arr = [[1], [], [3]];

// const result = arr.every(x => x.length);
// console.log(result);
// ✅ Answer:
// false

// 👉 [] → length = 0 → falsy

// 🔥 9. Mutation inside some
// const arr = [1, 2, 3];

// const result = arr.some((x, i, a) => {
//   a[i] = x * 2;
//   return x > 2;
// });

// console.log(arr);
// ✅ Answer:
// [2, 4, 6]

// 👉 Mutation happens before stop 😈

// 🔥 10. Index + condition confusion
// const arr = [10, 20, 30];

// const result = arr.every((x, i) => i < 2);
// console.log(result);
// ✅ Answer:
// false

// 👉 At index 2 → condition fails

// 🧠 BONUS (VERY HARD)
// const arr = [1, 2, 3];

// const result = arr.some(x => {
//   return arr.every(y => y < x);
// });

// console.log(result);
// ✅ Answer:
// true

// 👉 When x = 3 → all elements < 3 → true
