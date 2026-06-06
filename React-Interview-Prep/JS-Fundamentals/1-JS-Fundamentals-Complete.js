// ============================================================
// JAVASCRIPT FUNDAMENTALS FOR INTERVIEWS
// ============================================================

/**
 * Core JavaScript concepts every interviewer will ask about
 * Critical for: PWC, Deloitte, TCS, Cognizant, Google, Meta
 */

// ============================================================
// 1. CLOSURES
// ============================================================

// Closure: Function accessing outer scope variables
function outer() {
  let count = 0; // Outer variable

  function inner() {
    count++; // Accesses outer variable
    return count;
  }

  return inner; // Return function, not calling it
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2 (count persisted!)

// Practical example: Private variable
function createSecretKeeper(secret) {
  let _secret = secret; // Private variable

  return {
    getSecret: () => _secret,
    setSecret: (newSecret) => {
      _secret = newSecret;
    },
  };
}

const keeper = createSecretKeeper('password123');
console.log(keeper.getSecret()); // 'password123'
keeper.setSecret('newPassword');
console.log(keeper.getSecret()); // 'newPassword'
// _secret cannot be accessed directly from outside

// Common closure gotcha
const funcs = [];
for (let i = 0; i < 3; i++) {
  // ✅ GOOD: let creates new scope
  funcs.push(() => i);
}
console.log(funcs[0]()); // 0
console.log(funcs[1]()); // 1
console.log(funcs[2]()); // 2

// ❌ BAD: var reuses same scope
const badFuncs = [];
for (var i = 0; i < 3; i++) {
  badFuncs.push(() => i);
}
console.log(badFuncs[0]()); // 3 (all reference same i!)
console.log(badFuncs[1]()); // 3
console.log(badFuncs[2]()); // 3

// ============================================================
// 2. PROTOTYPAL INHERITANCE
// ============================================================

// Prototype chain
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes sound`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks`;
};

const dog = new Dog('Rex', 'Labrador');
console.log(dog.speak()); // "Rex makes sound" (inherited)
console.log(dog.bark()); // "Rex barks" (own method)

// Check prototype chain
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(Dog.prototype.isPrototypeOf(dog)); // true

// ============================================================
// 3. THIS BINDING
// ============================================================

const person = {
  name: 'John',
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  },
  arrowGreet: () => {
    console.log(`Hello, I'm ${this.name}`); // 'this' from outer scope
  },
};

person.greet(); // "Hello, I'm John" (this = person)
person.arrowGreet(); // "Hello, I'm undefined" (arrow function)

// Explicit binding
const sayName = function() {
  console.log(this.name);
};

const obj1 = { name: 'Alice' };
const obj2 = { name: 'Bob' };

sayName.call(obj1); // "Alice" (call immediately)
sayName.apply(obj2); // "Bob" (apply with array)
const boundSayName = sayName.bind(obj1); // bind returns new function
boundSayName(); // "Alice"

// ============================================================
// 4. ASYNC/AWAIT & PROMISES
// ============================================================

// Promise
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ id: 1, name: 'John' });
  }, 1000);
});

fetchData.then((data) => {
  console.log('Data:', data);
}).catch((error) => {
  console.error('Error:', error);
});

// Async/await (cleaner)
async function getData() {
  try {
    const response = await fetch('https://api.example.com/users/1');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

getData().then((data) => console.log(data));

// Promise.all vs Promise.allSettled
async function multipleRequests() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json()),
  ]);

  return { users, posts, comments };
}

// Promise.allSettled - doesn't fail if one fails
async function multipleRequestsSafe() {
  const results = await Promise.allSettled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json()),
  ]);

  return results.map((result) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return { error: result.reason };
    }
  });
}

// ============================================================
// 5. SCOPE & HOISTING
// ============================================================

// Hoisting: var/function declarations moved to top
console.log(x); // undefined (hoisted)
var x = 5;

sayHi(); // "Hello!" (function hoisting)
function sayHi() {
  console.log('Hello!');
}

// ❌ let/const don't hoist (Temporal Dead Zone)
// console.log(y); // ReferenceError
let y = 10;

// Block scope
{
  let a = 1;
  var b = 2;
}
console.log(a); // ReferenceError
console.log(b); // 2 (var is function-scoped)

// ============================================================
// 6. EVENT LOOP & CALLBACK QUEUE
// ============================================================

// Understanding execution order
console.log('1'); // Synchronous - prints immediately

setTimeout(() => {
  console.log('2'); // Macrotask - goes to callback queue
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // Microtask - goes to microtask queue
});

console.log('4'); // Synchronous - prints immediately

// Output: 1, 4, 3, 2
// Explanation:
// 1. All synchronous code runs first (1, 4)
// 2. Then microtasks (3)
// 3. Then macrotasks (2)

// ============================================================
// 7. DESTRUCTURING & SPREAD OPERATOR
// ============================================================

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest); // 1, 2, [3, 4, 5]

// Object destructuring
const { name, age, ...other } = { name: 'John', age: 30, city: 'NYC' };
console.log(name, age, other); // John, 30, {city: 'NYC'}

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a: 1, b: 2, c: 3}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// ============================================================
// 8. ARRAY METHODS - FUNCTIONAL PROGRAMMING
// ============================================================

const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter - keep elements matching condition
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce - accumulate to single value
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// find - first element matching condition
const firstEven = numbers.find(n => n % 2 === 0); // 2

// some - check if any element matches
const hasEven = numbers.some(n => n % 2 === 0); // true

// every - check if all elements match
const allPositive = numbers.every(n => n > 0); // true

// forEach - execute function for each element
numbers.forEach((n, index) => {
  console.log(`${index}: ${n}`);
});

// ============================================================
// 9. OBJECT METHODS
// ============================================================

const obj = { name: 'John', age: 30, city: 'NYC' };

// Keys, values, entries
Object.keys(obj); // ['name', 'age', 'city']
Object.values(obj); // ['John', 30, 'NYC']
Object.entries(obj); // [['name', 'John'], ['age', 30], ...]

// Assign
const copied = Object.assign({}, obj);
const merged = Object.assign({}, obj, { country: 'USA' });

// Create with specific properties
const restricted = Object.create(null); // No prototype
const withProperties = Object.create({}, {
  name: { value: 'John', writable: true },
  age: { value: 30, writable: false },
});

// Freeze/Seal
Object.freeze(obj); // Cannot modify, add, or delete
obj.name = 'Jane'; // Fails silently (or throws error in strict mode)

Object.seal(obj); // Can modify but not add/delete
obj.name = 'Jane'; // Works
obj.country = 'USA'; // Fails

// ============================================================
// 10. COMMON INTERVIEW GOTCHAS
// ============================================================

// Gotcha 1: == vs ===
console.log(0 == '0'); // true (type coercion)
console.log(0 === '0'); // false (strict equality)

// Gotcha 2: undefined vs null
console.log(typeof undefined); // 'undefined'
console.log(typeof null); // 'object' (quirk!)
console.log(undefined == null); // true
console.log(undefined === null); // false

// Gotcha 3: NaN
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true
console.log(Object.is(NaN, NaN)); // true

// Gotcha 4: Falsy values
const falsyValues = [false, 0, '', null, undefined, NaN];
falsyValues.forEach(value => {
  if (value) {
    console.log('Truthy'); // Never prints
  }
});

// Gotcha 5: Array.from vs slice
const arrLike = { 0: 'a', 1: 'b', length: 2 };
Array.from(arrLike); // ['a', 'b']
Array.prototype.slice.call(arrLike); // ['a', 'b']

// ============================================================
// INTERVIEW QUESTIONS
// ============================================================

/*
Q1: "Explain closures"
A: Function accessing variables from outer scope
   Useful for data privacy and state management

Q2: "What's the difference between var, let, and const?"
A: var - function scoped, hoisted, can be redeclared
   let - block scoped, hoisted (TDZ), cannot be redeclared
   const - block scoped, must be initialized, cannot be reassigned

Q3: "Explain 'this' binding"
A: Depends on how function is called
   - Object method: this = object
   - Regular function: this = undefined (strict) or global
   - Constructor: this = new object
   - Arrow function: this = outer scope

Q4: "What's the event loop?"
A: JavaScript runs synchronously code first,
   then microtasks (Promises),
   then macrotasks (setTimeout, setInterval)

Q5: "Explain async/await"
A: Syntactic sugar over Promises
   Makes asynchronous code look synchronous
   Use try/catch for error handling

Q6: "What's the difference between map and forEach?"
A: map - returns new array
   forEach - returns undefined, doesn't chain

Q7: "What's prototypal inheritance?"
A: Objects inherit from other objects
   Through prototype chain
   Different from class inheritance (syntactic sugar)
*/

export const JS_FUNDAMENTALS = {
  CLOSURES: 'Function scope & privacy',
  PROTOTYPES: 'Prototypal inheritance',
  THIS: 'This binding',
  ASYNC: 'Promises & async/await',
  SCOPE: 'Variable scoping',
  EVENT_LOOP: 'Callback queue',
  ARRAY_METHODS: 'Functional programming',
  GOTCHAS: 'Common mistakes',
};
