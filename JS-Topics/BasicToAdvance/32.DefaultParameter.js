// 🔹 What are Default Parameters?

// 👉 Default parameters allow you to assign default values to function parameters
// 👉 Used when no value or undefined is passed

// 🔹 Basic Example
// function greet(name = "Guest") {
//   console.log("Hello " + name);
// }

// greet("Sapta"); // Hello Sapta
// greet();        // Hello Guest
// 🔥 Important Rule

// 👉 Default value is used ONLY when argument is undefined

// function test(x = 10) {
//   console.log(x);
// }

// test(undefined); // 10 ✅
// test(null);      // null ❌
// test(0);         // 0 ❌
// 🔹 Multiple Default Parameters
// function sum(a = 1, b = 2) {
//   return a + b;
// }

// console.log(sum());       // 3
// console.log(sum(5));      // 7
// console.log(sum(5, 10));  // 15
// 🔥 Using Previous Parameter
// function test(a, b = a * 2) {
//   console.log(a, b);
// }

// test(5); // 5 10

// 👉 Later parameters can use earlier ones

// 🔥 Function as Default Value
// function getValue() {
//   return 100;
// }

// function test(x = getValue()) {
//   console.log(x);
// }

// test(); // 100

// 👉 Default values are evaluated at runtime

// 🔥 Tricky Interview Case
// function test(a = 10, b = a + 5) {
//   console.log(a, b);
// }

// test(20); // 20 25
// 🚨 arguments vs default parameter (VERY IMPORTANT)
// function test(a = 5) {
//   console.log(arguments[0]);
//   console.log(a);
// }

// test(undefined);
// ✅ Output:
// undefined
// 5

// 👉 arguments stores actual passed value
// 👉 default parameter works separately

// 🔥 Scope Trap
// let x = 10;

// function test(a = x) {
//   let x = 20;
//   console.log(a);
// }

// test(); // 10

// 👉 Default parameter uses outer scope, not function body

// 🔥 Arrow Function Example
// const greet = (name = "Guest") => {
//   console.log(name);
// };

// greet(); // Guest

// | Case                    | Result            |
// | ----------------------- | ----------------- |
// | No argument             | Default used      |
// | undefined               | Default used      |
// | null / 0 / false        | Passed value used |
// | Uses previous param     | ✅ Allowed         |
// | Works in arrow function | ✅ Yes             |

// 🚀 Real Use Case (React Dev 🔥)
// function fetchData(url = "/api/users", method = "GET") {
//   console.log(url, method);
// }
