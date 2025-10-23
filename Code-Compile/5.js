// 5. Function Constructor 

const sum = new Function('a', 'b', 'return a+b');

console.log(sum(2, 3))

// -------------------------------------------------------------------------------------------------------------------------



function Person(name, age) {
    this.name = name;
    this.age = age;
}
// When you call it with the new keyword:

// js
// Copy code
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

console.log(person1.name); // "Alice"
console.log(person2.age);  // 30

// ⚙️ How It Works
// When you use new Person("Alice", 25):

// A new empty object is created.

// The this keyword inside the function refers to that new object.

// The properties are assigned (this.name = name, etc.).

// The new object is automatically returned.

// So effectively:

// js
// Copy code
// const person1 = {
//   name: "Alice",
//   age: 25
// };



// 🧱 ES6 Class Equivalent

// In modern JavaScript, we often use classes instead of constructor functions:
// This works exactly like the constructor function approach.

// ✅ Key Points

// Must be called with new.

// this refers to the new object.

// Methods should be added on the prototype to save memory.

// Classes in ES6 are syntactic sugar over constructor functions.