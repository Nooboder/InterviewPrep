// Destructuring with default value

const user = {
  name: "Sapta",
  age: 0,
};

const { name, age = 25, city = "Kolkata" } = user;

console.log(name); // Sapta
console.log(age); // 0   (default NOT applied)
console.log(city); // Kolkata

// // Destructuring with new keyName

// const user = {
//   name: "Sapta",
//   age: 27,
// };

// const { name: userName } = user;

// console.log(userName); // Sapta

// Object Property Shorthand in JavaScript (ES6)

// ❌ Without Shorthand (Old Way)
// const name = "Sapta";
// const age = 27;

// const user = {
//   name: name,
//   age: age
// };

// ✅ With Object Property Shorthand
// const name = "Sapta";
// const age = 27;

// const user = {
//   name,
//   age
// };

// console.log(user);
// // { name: "Sapta", age: 27 }
