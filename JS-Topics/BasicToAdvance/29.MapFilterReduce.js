// 🔹 1. map()
// 👉 Theory:
// Used to transform each element of an array
// Always returns a new array (same length)
// Does NOT modify original array

// 👉 Think: “Change every item”

// ✅ Syntax:
// array.map((item, index, arr) => {
//   return newItem;
// })
// 💻 Example:
// const nums = [1, 2, 3, 4];

// const doubled = nums.map(num => num * 2);

// console.log(doubled); // [2, 4, 6, 8]
// 🔹 2. filter()
// 👉 Theory:
// Used to select elements based on condition
// Returns a new array (can be smaller)
// Only keeps elements where condition is true

// 👉 Think: “Keep only what matches”

// ✅ Syntax:
// array.filter((item, index, arr) => {
//   return condition;
// })
// 💻 Example:
// const nums = [1, 2, 3, 4, 5];

// const even = nums.filter(num => num % 2 === 0);

// console.log(even); // [2, 4]
// 🔹 3. reduce()
// 👉 Theory:
// Used to convert array → single value
// Uses an accumulator to store result
// Most powerful but also most confusing

// 👉 Think: “Combine everything into one”

// ✅ Syntax:
// array.reduce((accumulator, currentValue) => {
//   return updatedAccumulator;
// }, initialValue)
// 💻 Example 1: Sum
// const nums = [1, 2, 3, 4];

// const sum = nums.reduce((acc, curr) => acc + curr, 0);

// console.log(sum); // 10
// 💻 Example 2: Count occurrences
// const fruits = ["apple", "banana", "apple", "orange"];

// const count = fruits.reduce((acc, fruit) => {
//   acc[fruit] = (acc[fruit] || 0) + 1;
//   return acc;
// }, {});

// console.log(count);
// // { apple: 2, banana: 1, orange: 1 }
// 🔥 Real Interview Combo Example
// const users = [
//   { name: "A", age: 20 },
//   { name: "B", age: 30 },
//   { name: "C", age: 25 }
// ];

// // Get names of users age > 21
// const result = users
//   .filter(user => user.age > 21)
//   .map(user => user.name);

// console.log(result); // ["B", "C"]

// ⚡ Key Differences (VERY IMPORTANT)

// | Method | Purpose   | Output                     | Changes Length? |
// | ------ | --------- | -------------------------- | --------------- |
// | map    | Transform | Array                      | ❌ No            |
// | filter | Select    | Array                      | ✅ Yes           |
// | reduce | Aggregate | Any (number, object, etc.) | ✅ N/A           |

// ------------------------------------------------------------------------------------------------------------------------------------------

// 🔥 1. Output Prediction
// const arr = [1, 2, 3, 4];

// const result = arr.map(num => {
//   if (num % 2 === 0) return num * 2;
// });

// console.log(result);
// ✅ Answer:
// [undefined, 4, undefined, 8]

// 👉 Why?
// map() always returns same length → if no return → undefined

// 🔥 2. filter vs map confusion
// const arr = [1, 2, 3, 4];

// const result = arr.filter(num => num * 2);

// console.log(result);
// ✅ Answer:
// [1, 2, 3, 4]

// 👉 Why?
// num * 2 is always truthy → nothing filtered

// 🔥 3. reduce without initial value
// const arr = [1, 2, 3];

// const result = arr.reduce((acc, curr) => acc + curr);

// console.log(result);
// ✅ Answer:
// 6

// 👉 Why?
// First value becomes acc → (1 + 2) + 3

// ⚠️ But dangerous for empty arrays!

// 🔥 4. Empty array reduce
// [].reduce((acc, curr) => acc + curr);
// ✅ Answer:

// ❌ Throws Error
// 👉 “Reduce of empty array with no initial value”

// 🔥 5. map chaining order
// const arr = [1, 2, 3];

// const result = arr
//   .map(x => x * 2)
//   .filter(x => x > 3);

// console.log(result);
// ✅ Answer:
// [4, 6]

// 👉 Step:
// [1,2,3] → map → [2,4,6] → filter >3 → [4,6]

// 🔥 6. Mutation trap
// const arr = [{ a: 1 }, { a: 2 }];

// const result = arr.map(obj => {
//   obj.a *= 2;
//   return obj;
// });

// console.log(arr);
// ✅ Answer:
// [{ a: 2 }, { a: 4 }]

// 👉 Why?
// Objects are reference types → original array mutated 😈

// 🔥 7. reduce as map
// const arr = [1, 2, 3];

// const result = arr.reduce((acc, curr) => {
//   acc.push(curr * 2);
//   return acc;
// }, []);

// console.log(result);
// ✅ Answer:
// [2, 4, 6]

// 👉 reduce can replace map

// 🔥 8. reduce as filter
// const arr = [1, 2, 3, 4];

// const result = arr.reduce((acc, curr) => {
//   if (curr % 2 === 0) acc.push(curr);
//   return acc;
// }, []);

// console.log(result);
// ✅ Answer:
// [2, 4]

// 👉 reduce can replace filter

// 🔥 9. Tricky return in arrow function
// const arr = [1, 2, 3];

// const result = arr.map(num => { num * 2 });

// console.log(result);
// ✅ Answer:
// [undefined, undefined, undefined]

// 👉 {} needs explicit return

// 🔥 10. Reduce object flattening
// const arr = [[1, 2], [3, 4], [5]];

// const result = arr.reduce((acc, curr) => acc.concat(curr), []);

// console.log(result);
// ✅ Answer:
// [1, 2, 3, 4, 5]

// 👉 Classic flatten question (VERY COMMON)

// 🧠 Bonus (VERY HIGH LEVEL)
// const users = [
//   { name: "A", age: 20 },
//   { name: "B", age: 20 },
//   { name: "C", age: 25 }
// ];

// const result = users.reduce((acc, user) => {
//   acc[user.age] = acc[user.age] || [];
//   acc[user.age].push(user.name);
//   return acc;
// }, {});

// console.log(result);
// ✅ Output:
// {
//   20: ["A", "B"],
//   25: ["C"]
// }

// 👉 Grouping problem (🔥 top interview favorite)
