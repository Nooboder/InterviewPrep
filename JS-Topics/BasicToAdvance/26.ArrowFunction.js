// 🔥 What is an Arrow Function?

// 👉 A shorter syntax to write functions
// 👉 Introduced in ES6
// 👉 But the real difference is in this behavior

// 🧠 Basic Syntax
// ✅ Normal Function:
// function add(a, b) {
//   return a + b;
// }
// ✅ Arrow Function:
// const add = (a, b) => {
//   return a + b;
// };
// ⚡ Shorter Version (Implicit Return)
// const add = (a, b) => a + b;

// ✔️ No {} → no need for return

// 🧠 Key Features (VERY IMPORTANT)
// 1. 🔹 No Own this (Biggest Difference)

// 👉 Arrow functions don’t have their own this
// 👉 They inherit this from parent scope

// ❌ Normal Function Problem
// const obj = {
//   name: "Sapta",
//   greet: function () {
//     setTimeout(function () {
//       console.log(this.name);
//     }, 0);
//   }
// };

// obj.greet();

// 👉 Output:

// undefined
// ✅ Arrow Function Fix
// const obj = {
//   name: "Sapta",
//   greet: function () {
//     setTimeout(() => {
//       console.log(this.name);
//     }, 0);
//   }
// };

// obj.greet();

// 👉 Output:

// Sapta

// ✔️ Arrow function inherits this from greet()

// 2. 🔹 No arguments Object
// const fn = () => {
//   console.log(arguments);
// };

// 👉 ❌ Error / not defined

// ✔️ Use rest operator:

// const fn = (...args) => console.log(args);
// 3. 🔹 Cannot be Used as Constructor
// const Person = (name) => {
//   this.name = name;
// };

// new Person("Sapta"); // ❌ Error

// ✔️ Arrow functions don’t work with new

// 4. 🔹 No this Binding Methods
// const fn = () => console.log(this);

// fn.call({ name: "Sapta" });

// 👉 ❌ this won’t change

// 🔥 When to Use Arrow Functions

// ✔️ Callbacks (map, filter, setTimeout)
// ✔️ When you want to preserve this
// ✔️ Functional programming

// ⚠️ When NOT to Use

// ❌ Object methods
// ❌ Constructors
// ❌ When dynamic this is needed

// 🧠 Tricky Interview Questions
// 🧠 1. Output?
// const obj = {
//   name: "Sapta",
//   greet: () => {
//     console.log(this.name);
//   }
// };

// obj.greet();

// 👉 Answer:

// undefined

// 💥 Arrow → no own this

// 🧠 2. Output?
// function test() {
//   return () => {
//     console.log(this);
//   };
// }

// const fn = test();
// fn();

// 👉 Answer:
// 👉 Depends on where test() is called
// ✔️ Arrow inherits this from test

// 🧠 3. Output?
// const obj = {
//   name: "Sapta",
//   greet() {
//     return () => {
//       console.log(this.name);
//     };
//   }
// };

// obj.greet()();

// 👉 Answer:

// Sapta

// ✔️ Arrow inherits from greet()
