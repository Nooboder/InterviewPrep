// 🔹 1. Callback Functions (Basics First)

// A callback function is simply:

// 👉 A function passed as an argument to another function
// 👉 And executed later

// ✅ Example:
// function greet(name, callback) {
//   console.log("Hello " + name);
//   callback();
// }

// function sayBye() {
//   console.log("Goodbye!");
// }

// greet("Sapta", sayBye);
// 💡 Output:
// Hello Sapta
// Goodbye!

// 👉 Here:

// sayBye is a callback function
// It runs after greet finishes its work
// 🔹 2. Higher Order Functions (HOF)

// A Higher Order Function is:

// 👉 A function that
// ✔️ Takes another function as input
// OR
// ✔️ Returns a function

// ✅ Example 1: Function as Argument
// function calculate(a, b, operation) {
//   return operation(a, b);
// }

// function add(x, y) {
//   return x + y;
// }

// console.log(calculate(2, 3, add)); // 5

// 👉 calculate is a Higher Order Function
// 👉 add is the callback

// ✅ Example 2: Function Returning Function
// function multiplier(factor) {
//   return function (num) {
//     return num * factor;
//   };
// }

// const double = multiplier(2);
// console.log(double(5)); // 10

// 👉 multiplier is a Higher Order Function

// 🔥 Real-Life JavaScript Examples (Very Important for Interviews)
// ✅ Array Methods (Most Asked)
// const numbers = [1, 2, 3, 4];

// const doubled = numbers.map(num => num * 2);

// 👉 map() is a Higher Order Function
// 👉 num => num * 2 is a callback

// ✅ setTimeout (Async Callback)
// setTimeout(() => {
//   console.log("Executed after 2 seconds");
// }, 2000);

// 👉 Arrow function = callback

// 🧠 Simple Way to Remember (Interview Trick)

// 👉 Callback = What you pass
// 👉 HOF = Who receives or returns function

// 🎯 One-Line Difference
// Callback Function → A function passed into another function
// Higher Order Function → A function that accepts or returns another function
// 🚀 Pro Tip (To Impress Interviewer)

// You can say:

// “All callbacks are used in higher-order functions, but not all higher-order functions require callbacks if they return functions.”
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 🔹 1. Callback Functions (Basics First)

// A callback function is simply:

// 👉 A function passed as an argument to another function
// 👉 And executed later

// ✅ Example:
// function greet(name, callback) {
//   console.log("Hello " + name);
//   callback();
// }

// function sayBye() {
//   console.log("Goodbye!");
// }

// greet("Sapta", sayBye);
// 💡 Output:
// Hello Sapta
// Goodbye!

// 👉 Here:

// sayBye is a callback function
// It runs after greet finishes its work
// 🔹 2. Higher Order Functions (HOF)

// A Higher Order Function is:

// 👉 A function that
// ✔️ Takes another function as input
// OR
// ✔️ Returns a function

// ✅ Example 1: Function as Argument
// function calculate(a, b, operation) {
//   return operation(a, b);
// }

// function add(x, y) {
//   return x + y;
// }

// console.log(calculate(2, 3, add)); // 5

// 👉 calculate is a Higher Order Function
// 👉 add is the callback

// ✅ Example 2: Function Returning Function
// function multiplier(factor) {
//   return function (num) {
//     return num * factor;
//   };
// }

// const double = multiplier(2);
// console.log(double(5)); // 10

// 👉 multiplier is a Higher Order Function

// 🔥 Real-Life JavaScript Examples (Very Important for Interviews)
// ✅ Array Methods (Most Asked)
// const numbers = [1, 2, 3, 4];

// const doubled = numbers.map(num => num * 2);

// 👉 map() is a Higher Order Function
// 👉 num => num * 2 is a callback

// ✅ setTimeout (Async Callback)
// setTimeout(() => {
//   console.log("Executed after 2 seconds");
// }, 2000);

// 👉 Arrow function = callback

// 🧠 Simple Way to Remember (Interview Trick)

// 👉 Callback = What you pass
// 👉 HOF = Who receives or returns function

// 🎯 One-Line Difference
// Callback Function → A function passed into another function
// Higher Order Function → A function that accepts or returns another function
// 🚀 Pro Tip (To Impress Interviewer)

// You can say:

// “All callbacks are used in higher-order functions, but not all higher-order functions require callbacks if they return functions.”
