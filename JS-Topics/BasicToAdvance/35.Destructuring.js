// 🔹 What is Destructuring?

// 👉 Destructuring means extracting values from arrays or objects into variables

// 👉 Think: “Break structure into variables”

// 🔹 1. Array Destructuring
// ✅ Basic Example:
// const arr = [10, 20, 30];

// const [a, b, c] = arr;

// console.log(a, b, c); // 10 20 30
// 🔥 Skip values
// const arr = [1, 2, 3];

// const [a, , c] = arr;

// console.log(a, c); // 1 3
// 🔥 Default values
// const arr = [1];

// const [a, b = 5] = arr;

// console.log(a, b); // 1 5
// 🔥 Rest with array
// const arr = [1, 2, 3, 4];

// const [a, ...rest] = arr;

// console.log(rest); // [2, 3, 4]
// 🔹 2. Object Destructuring
// ✅ Basic Example:
// const user = { name: "Sapta", age: 25 };

// const { name, age } = user;

// console.log(name, age); // Sapta 25
// 🔥 Rename variables
// const user = { name: "Sapta" };

// const { name: userName } = user;

// console.log(userName); // Sapta
// 🔥 Default values
// const user = {};

// const { name = "Guest" } = user;

// console.log(name); // Guest
// 🔥 Rest with object
// const obj = { a: 1, b: 2, c: 3 };

// const { a, ...rest } = obj;

// console.log(rest); // { b: 2, c: 3 }
// 🔥 Nested Destructuring
// const user = {
//   name: "Sapta",
//   address: { city: "Kolkata" }
// };

// const {
//   address: { city }
// } = user;

// console.log(city); // Kolkata
// 🚨 Interview Traps
// 1. Undefined error
// const obj = {};

// const { a: { b } } = obj; // ❌ Error

// 👉 a is undefined → cannot read b

// 2. Reference issue
// const obj = { a: { b: 1 } };

// const { a } = obj;

// a.b = 100;

// console.log(obj.a.b); // 100

// 👉 Still reference 😈

// 3. Order matters (array)
// const arr = [10, 20];

// const [b, a] = arr;

// console.log(a, b); // 20 10
// 🔥 Function Parameter Destructuring
// function greet({ name, age }) {
//   console.log(name, age);
// }

// greet({ name: "Sapta", age: 25 });
// 🚀 React Use Cases (VERY IMPORTANT)
// ✅ Props destructuring
// const Card = ({ title, price }) => {
//   return <h1>{title} - {price}</h1>;
// };
// ✅ API response
// const { data, error } = useQuery();

// ⚡ Quick Summary

// | Type    | Syntax         |
// | ------- | -------------- |
// | Array   | `[a, b] = arr` |
// | Object  | `{a, b} = obj` |
// | Rename  | `{a: newName}` |
// | Default | `{a = 10}`     |
// | Rest    | `{...rest}`    |

// =======================================================================================================================================================

// 🔥 1. Order matters (array)
// const arr = [10, 20];

// const [a, b] = arr;

// console.log(a, b);
// ✅ Answer:
// 10 20

// 👉 Based on position, not variable name

// 🔥 2. Swap values
// let a = 1;
// let b = 2;

// [a, b] = [b, a];

// console.log(a, b);
// ✅ Answer:
// 2 1

// 👉 Classic interview trick

// 🔥 3. Default value only for undefined
// const arr = [null];

// const [a = 5] = arr;

// console.log(a);
// ✅ Answer:
// null

// 👉 Default works only for undefined, not null

// 🔥 4. Skipping values
// const arr = [1, 2, 3, 4];

// const [a, , , d] = arr;

// console.log(a, d);
// ✅ Answer:
// 1 4
// 🔥 5. Nested array
// const arr = [1, [2, 3]];

// const [a, [b, c]] = arr;

// console.log(a, b, c);
// ✅ Answer:
// 1 2 3
// 🔥 6. Object rename
// const obj = { name: "Sapta" };

// const { name: userName } = obj;

// console.log(name, userName);
// ❌ Answer:

// 👉 Error: name is not defined

// 👉 Only userName is created

// 🔥 7. Nested object destructuring
// const obj = {
//   user: { age: 25 }
// };

// const {
//   user: { age }
// } = obj;

// console.log(age);
// ✅ Answer:
// 25
// 🔥 8. Missing property
// const obj = {};

// const { a = 10 } = obj;

// console.log(a);
// ✅ Answer:
// 10
// 🔥 9. Rest operator in object
// const obj = { a: 1, b: 2, c: 3 };

// const { a, ...rest } = obj;

// console.log(rest);
// ✅ Answer:
// { b: 2, c: 3 }
// 🔥 10. Function parameter destructuring (VERY TRICKY)
// function test({ a = 1, b = 2 } = {}) {
//   console.log(a, b);
// }

// test({ a: 10 });
// test();
// ✅ Answer:
// 10 2
// 1 2

// 👉 = {} prevents crash when no argument passed

// 🧠 BONUS (INSANE LEVEL 😈)
// const obj = { a: { b: 1 } };

// const { a } = obj;

// a.b = 100;

// console.log(obj.a.b);
// ✅ Answer:
// 100

// 👉 Destructuring does NOT deep copy
