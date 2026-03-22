// 🔹 Function vs Method (Core Idea)

// 👉 Function
// A standalone block of code (independent)

// 👉 Method
// A function that is attached to an object

// 🧠 1. Function (Standalone)
// function greet(name) {
//   return "Hello " + name;
// }

// console.log(greet("Sapta"));

// ✔️ Not tied to any object
// ✔️ Can be called directly

// 🧠 2. Method (Inside Object)
// const user = {
//   name: "Sapta",
//   greet: function () {
//     return "Hello " + this.name;
//   }
// };

// console.log(user.greet());

// ✔️ Attached to object (user)
// ✔️ Uses this keyword

// 🔥 Key Differences (Interview Table)

// | Feature    | Function                   | Method           |
// | ---------- | -------------------------- | ---------------- |
// | Definition | Standalone                 | Inside object    |
// | Invocation | `greet()`                  | `obj.greet()`    |
// | `this`     | Depends (global/undefined) | Refers to object |
// | Use case   | General logic              | Object behavior  |

// ⚠️ Tricky Interview Point (VERY IMPORTANT)
// 🧠 this behavior
// Function:
// function test() {
//   console.log(this);
// }

// test();

// 👉 In browser → window
// 👉 In strict mode → undefined

// Method:
// const obj = {
//   name: "JS",
//   test() {
//     console.log(this.name);
//   }
// };

// obj.test();

// 👉 Output:

// JS

// 💥 this refers to the object

// 🧠 Trick Question (Asked Often)
// const obj = {
//   name: "Sapta",
//   greet: function () {
//     function inner() {
//       console.log(this.name);
//     }
//     inner();
//   }
// };

// obj.greet();

// 👉 Answer:

// undefined

// 💥 Why?

// inner() is a normal function, not a method
// So this is NOT obj
// ✅ Fix (Arrow Function)
// const obj = {
//   name: "Sapta",
//   greet: function () {
//     const inner = () => {
//       console.log(this.name);
//     };
//     inner();
//   }
// };

// 👉 Output:

// Sapta

// ✔️ Arrow function uses lexical this

// 🧠 Another Trap
// const obj = {
//   name: "Sapta",
//   greet: () => {
//     console.log(this.name);
//   }
// };

// obj.greet();

// 👉 Answer:

// undefined

// 💥 Why?

// Arrow functions don’t have their own this
// It takes from outer scope (not object)
// 🎯 One-Line Interview Answer

// “A method is simply a function that is a property of an object and is invoked using that object, which gives it access to the object via this.”

// 🚀 Pro-Level Answer (Say This 💥)

// “The key difference lies in how this is bound—methods have implicit context via the object, whereas standalone functions depend on how they are invoked.”

// // -----------------------------------------------------------------------------------------------------------------------------------------------------------------

// 🧠 1. (Classic Trap)
// const obj = {
//   name: "Sapta",
//   greet: function () {
//     console.log(this.name);
//   }
// };

// const fn = obj.greet;
// fn();

// 👉 Answer:

// undefined

// 💥 Why?

// Function is called standalone
// this → global (or undefined in strict mode)
// 🧠 2. (Method vs Call Context)
// const obj = {
//   name: "Sapta",
//   greet() {
//     console.log(this.name);
//   }
// };

// setTimeout(obj.greet, 0);

// 👉 Answer:

// undefined

// 💥 Lost context when passed as callback

// ✅ Fix:
// setTimeout(() => obj.greet(), 0);
// // OR
// setTimeout(obj.greet.bind(obj), 0);
// 🧠 3. (Arrow Function Trap 🔥)
// const obj = {
//   name: "Sapta",
//   greet: () => {
//     console.log(this.name);
//   }
// };

// obj.greet();

// 👉 Answer:

// undefined

// 💥 Arrow function has no own this

// 🧠 4. (Nested Function Trap)
// const obj = {
//   name: "Sapta",
//   greet() {
//     function inner() {
//       console.log(this.name);
//     }
//     inner();
//   }
// };

// obj.greet();

// 👉 Answer:

// undefined
// ✅ Fix:
// const obj = {
//   name: "Sapta",
//   greet() {
//     const inner = () => {
//       console.log(this.name);
//     };
//     inner();
//   }
// };

// 👉 Output:

// Sapta
// 🧠 5. (call / apply / bind)
// function greet() {
//   console.log(this.name);
// }

// const user = { name: "Sapta" };

// greet.call(user);
// greet.apply(user);
// const bound = greet.bind(user);
// bound();

// 👉 Answer:

// Sapta
// Sapta
// Sapta

// 💡 All explicitly bind this

// 🧠 6. (Bind Trap 🔥)
// const obj = {
//   name: "Sapta",
//   greet() {
//     console.log(this.name);
//   }
// };

// const fn = obj.greet.bind(obj);
// fn.call({ name: "New" });

// 👉 Answer:

// Sapta

// 💥 bind is permanent — cannot override

// 🧠 7. (Object Inside Object)
// const obj = {
//   name: "Outer",
//   inner: {
//     name: "Inner",
//     greet() {
//       console.log(this.name);
//     }
//   }
// };

// obj.inner.greet();

// 👉 Answer:

// Inner

// 💡 this refers to calling object

// 🧠 8. (Chain Call Trap)
// const obj = {
//   name: "Sapta",
//   greet() {
//     return function () {
//       console.log(this.name);
//     };
//   }
// };

// obj.greet()();

// 👉 Answer:

// undefined

// 💥 Returned function is standalone

// ✅ Fix:
// greet() {
//   return () => {
//     console.log(this.name);
//   };
// }

// 👉 Output:

// Sapta
// 🧠 9. (Constructor Function Trap)
// function Person(name) {
//   this.name = name;
// }

// const p = new Person("Sapta");

// console.log(p.name);

// 👉 Answer:

// Sapta

// 💡 new binds this to new object

// 🧠 10. (Hardcore Mixed 🔥)
// const obj = {
//   name: "Sapta",
//   greet() {
//     console.log(this.name);

//     setTimeout(function () {
//       console.log(this.name);
//     }, 0);
//   }
// };

// obj.greet();

// 👉 Answer:

// Sapta
// undefined

// 💥 Inside setTimeout → lost context

// ✅ Fix:
// setTimeout(() => {
//   console.log(this.name);
// }, 0);
// 🧠 11. (Even Harder 🔥🔥)
// var name = "Global";

// const obj = {
//   name: "Sapta",
//   greet: function () {
//     console.log(this.name);

//     (function () {
//       console.log(this.name);
//     })();
//   }
// };

// obj.greet();

// 👉 Answer:

// Sapta
// Global

// 💥 IIFE runs as normal function → global this

// --------------------------------------------------------------------------------------------------------------------------------

// 🧠 INSANE LEVEL PUZZLE
// var name = "Global";

// const obj = {
//   name: "Sapta",

//   getFn: function () {
//     console.log("A:", this.name);

//     return function () {
//       console.log("B:", this.name);

//       setTimeout(() => {
//         console.log("C:", this.name);
//       }, 0);
//     };
//   }
// };

// const fn = obj.getFn();
// fn();
// ❓ What will be the output?

// Take 10 seconds… seriously 🙂

// ✅ FINAL ANSWER
// A: Sapta
// B: Global
// C: Global
// 🧠 STEP-BY-STEP BREAKDOWN
// 🔹 Step 1: obj.getFn()
// const fn = obj.getFn();

// 👉 Called as method

// ✔️ this = obj

// A: Sapta
// 🔹 Step 2: Returned Function Call
// fn();

// 👉 Called as normal function

// ✔️ this = global (or undefined in strict mode)

// B: Global
// 🔹 Step 3: setTimeout + Arrow Function
// setTimeout(() => {
//   console.log("C:", this.name);
// }, 0);

// 👉 Arrow function does NOT have its own this

// ✔️ It captures this from parent function

// 👉 Parent = fn()
// 👉 this = global

// C: Global
// 🔥 WHY THIS QUESTION IS POWERFUL

// It tests 3 concepts at once:

// ✔️ Closure (returned function)
// ✔️ this binding (method vs normal call)
// ✔️ Event loop + async behavior

// 🧠 EVEN HARDER VERSION 😈
// var name = "Global";

// const obj = {
//   name: "Sapta",

//   getFn: function () {
//     console.log("A:", this.name);

//     return () => {
//       console.log("B:", this.name);

//       setTimeout(function () {
//         console.log("C:", this.name);
//       }, 0);
//     };
//   }
// };

// const fn = obj.getFn();
// fn();
// ❓ Think again…
// ✅ ANSWER
// A: Sapta
// B: Sapta
// C: Global
// 💥 Why?
// ✔️ getFn() → method → this = obj

// → A: Sapta

// ✔️ Returned function = arrow

// → inherits this = obj
// → B: Sapta

// ✔️ Inside setTimeout → normal function

// → loses context → global

// → C: Global

// 🎯 FINAL INTERVIEW RULES (MEMORIZE THIS)
// 1. this depends on CALL SITE
// 2. Arrow function → inherits this
// 3. Normal function → has its own this
// 4. setTimeout → loses object context
// 5. Closures remember variables, NOT this
