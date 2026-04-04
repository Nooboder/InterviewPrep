// 🔹 What is Spread Operator?

// 👉 The spread operator (...) is used to expand (spread) elements of:

// Arrays
// Objects
// Iterables

// 👉 Think: “Take out everything inside”

// 🔹 1. Spread in Arrays
// ✅ Example:
// const arr1 = [1, 2];
// const arr2 = [3, 4];

// const result = [...arr1, ...arr2];

// console.log(result); // [1, 2, 3, 4]
// 🔥 Copy Array (IMPORTANT)
// const arr = [1, 2, 3];

// const copy = [...arr];

// console.log(copy); // [1, 2, 3]

// 👉 Shallow copy (not deep copy)

// 🔹 2. Spread in Objects
// ✅ Example:
// const user = { name: "Sapta" };
// const updatedUser = { ...user, age: 25 };

// console.log(updatedUser);
// // { name: "Sapta", age: 25 }
// 🔥 Override values
// const obj = { a: 1, b: 2 };

// const newObj = { ...obj, b: 100 };

// console.log(newObj); // { a: 1, b: 100 }

// 👉 Last value overrides

// 🔹 3. Spread in Function Arguments
// function sum(a, b, c) {
//   return a + b + c;
// }

// const nums = [1, 2, 3];

// console.log(sum(...nums)); // 6

// 🔥 Spread vs Rest (VERY IMPORTANT

//     | Feature  | Spread           | Rest             |
// | -------- | ---------------- | ---------------- |
// | Use      | Expand values    | Collect values   |
// | Position | RHS (right side) | LHS (parameters) |

// Example:
// function test(...args) { // rest
//   console.log(args);
// }

// const arr = [1, 2, 3];

// test(...arr); // spread
// 🚨 Interview Traps
// 1. Shallow Copy Problem
// const arr = [{ a: 1 }];

// const copy = [...arr];

// copy[0].a = 100;

// console.log(arr); // [{ a: 100 }]

// 👉 Objects still reference same memory 😈

// 2. Order matters
// const obj = { a: 1 };

// const result = { ...obj, a: 5, a: 10 };

// console.log(result); // { a: 10 }
// 3. Spread with strings
// const str = "abc";

// const result = [...str];

// console.log(result); // ["a", "b", "c"]
// 🚀 Real React Use Cases (VERY IMPORTANT)
// ✅ Update state (immutable)
// const [user, setUser] = useState({ name: "Sapta", age: 20 });

// setUser(prev => ({ ...prev, age: 25 }));
// ✅ Add item in array
// setList(prev => [...prev, newItem]);

// // ================================================================================================================================

// 🔥 1. Shallow copy trap
// const arr = [{ a: 1 }];

// const copy = [...arr];

// copy[0].a = 100;

// console.log(arr);
// ✅ Answer:
// [{ a: 100 }]

// 👉 Spread does shallow copy, objects still share reference

// 🔥 2. Object override order
// const obj = { a: 1, b: 2 };

// const result = { ...obj, a: 5, b: 10 };

// console.log(result);
// ✅ Answer:
// { a: 5, b: 10 }

// 👉 Last value wins 😈

// 🔥 3. Reverse override
// const obj = { a: 1, b: 2 };

// const result = { a: 5, ...obj };

// console.log(result);
// ✅ Answer:
// { a: 1, b: 2 }

// 👉 Spread comes later → overrides earlier values

// 🔥 4. Array + extra values
// const arr = [1, 2];

// const result = [...arr, 3, 4];

// console.log(result);
// ✅ Answer:
// [1, 2, 3, 4]
// 🔥 5. Spread string
// const str = "hello";

// const result = [...str];

// console.log(result);
// ✅ Answer:
// ["h", "e", "l", "l", "o"]

// 👉 String is iterable

// 🔥 6. Spread non-iterable
// const obj = { a: 1 };

// const result = [...obj];
// ❌ Answer:

// 👉 Error: object is not iterable

// 🔥 7. Nested object trap
// const obj = {
//   user: { name: "A" }
// };

// const copy = { ...obj };

// copy.user.name = "B";

// console.log(obj.user.name);
// ✅ Answer:
// "B"

// 👉 Nested object still same reference 😈

// 🔥 8. Spread with null / undefined
// const result = { ...null, ...undefined };

// console.log(result);
// ✅ Answer:
// {}

// 👉 No error → just ignored

// 🔥 9. Function arguments
// function test(a, b) {
//   console.log(a, b);
// }

// const arr = [1];

// test(...arr);
// ✅ Answer:
// 1 undefined

// 👉 Missing values → undefined

// 🔥 10. Mixing array + object
// const arr = [1, 2, 3];

// const obj = { ...arr };

// console.log(obj);
// ✅ Answer:
// { 0: 1, 1: 2, 2: 3 }

// 👉 Array becomes object with index keys

// 🧠 BONUS (VERY HARD 😈)
// const a = [1, 2];
// const b = [3, 4];

// const result = [...a, ...b].map(x => {
//   if (x > 2) return;
//   return x * 2;
// });

// console.log(result);
// ✅ Answer:
// [2, 4, undefined, undefined]

// 👉 Same trap as map() — missing return
