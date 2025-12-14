// JavaScript Object (Complete & Interview-Ready Guide)

// In JavaScript, objects are used to store key–value pairs. Almost everything in JS is an object (arrays, functions, dates, etc.).

// 1️⃣ What is an Object?

// An object groups related data and behavior.

// const user = {
//   name: "Sapta",
//   age: 24,
//   isDeveloper: true
// };


// name, age, isDeveloper → properties

// Values can be any data type

// 2️⃣ Creating Objects
// ✅ Object Literal (Most Common)
// const car = {
//   brand: "BMW",
//   price: 5000000
// };

// ✅ Using new Object()
// const obj = new Object();
// obj.name = "JS";

// ✅ Using Constructor Function
// function User(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const u1 = new User("Sapta", 24);

// ✅ Using Object.create()
// const proto = { greet() { console.log("Hi"); } };
// const obj = Object.create(proto);

// 3️⃣ Accessing Object Properties
// 🔹 Dot Notation
// user.name

// 🔹 Bracket Notation (Dynamic keys)
// user["age"]

// const key = "name";
// user[key]


// ✅ Use bracket notation when key is dynamic or has spaces

// 4️⃣ Adding / Updating / Deleting Properties
// user.city = "Kolkata";      // add
// user.age = 25;             // update
// delete user.isDeveloper;   // delete

// 5️⃣ Object Methods

// Functions inside objects are called methods.

// const user = {
//   name: "Sapta",
//   greet() {
//     console.log("Hello " + this.name);
//   }
// };

// user.greet();


// 👉 this refers to the current object

// 6️⃣ Looping Through Objects
// 🔁 for...in
// for (let key in user) {
//   console.log(key, user[key]);
// }

// 🔁 Object Methods
// Object.keys(user);    // ['name', 'age']
// Object.values(user); // ['Sapta', 24]
// Object.entries(user);// [['name','Sapta'], ['age',24]]

// 7️⃣ Object Destructuring (🔥 Interview Favorite)
// const user = { name: "Sapta", age: 24 };

// const { name, age } = user;

// ✅ Rename + Default Value
// const { name: userName, role = "Developer" } = user;

// ⚠️ Tricky Case
// const { a: x = 10, b: y = 20 } = { a: undefined, b: null };
// console.log(x, y); // 10 null

// 8️⃣ Copying Objects (Important!)
// ❌ Reference Copy
// const obj2 = obj1;

// ✅ Shallow Copy
// const obj2 = { ...obj1 };
// const obj3 = Object.assign({}, obj1);

// ⚠️ Deep Copy
// const deep = JSON.parse(JSON.stringify(obj));

// 9️⃣ Object Comparison (Trick Question)
// {} === {}        // false


// 👉 Objects are compared by reference, not value.

// 🔟 this in Objects (Interview Trap)
// const obj = {
//   name: "JS",
//   arrow: () => console.log(this.name),
//   normal() { console.log(this.name); }
// };

// obj.arrow();  // undefined
// obj.normal(); // JS


// 👉 Arrow functions don’t have their own this




// | Method            | Can Add | Can Delete | Can Modify |
// | ----------------- | ------- | ---------- | ---------- |
// | `Object.freeze()` | ❌       | ❌          | ❌          |
// | `Object.seal()`   | ❌       | ❌          | ✅          |





// 1️⃣2️⃣ Common Interview MCQs
// const obj = { a: 1 };
// obj.b = 2;
// console.log(obj); // {a:1, b:2}

// const obj = { a: 1 };
// Object.freeze(obj);
// obj.a = 10;
// console.log(obj.a); // 1

// const obj = {};
// obj["1"] = "a";
// obj[1] = "b";
// console.log(obj["1"]); // b
















// 🔥 Advanced JavaScript Object MCQs (Interview Level – Tricky & Conceptual)
// (Designed for React / Redux / Senior Frontend interviews)

// 1️⃣ Object Reference vs Value
// const a = { x: 1 };
// const b = a;
// b.x = 2;
// console.log(a.x);


// A. 1
// B. 2 ✅
// C. undefined
// D. Error

// 👉 Objects are copied by reference

// 2️⃣ Object Comparison
// console.log({} === {});


// A. true
// B. false ✅
// C. undefined
// D. Error

// 👉 Different memory locations

// 3️⃣ Property Key Conversion
// const obj = {};
// obj[true] = "yes";
// obj["true"] = "no";
// console.log(obj[true]);


// A. yes
// B. no ✅
// C. undefined
// D. Error

// 👉 Keys are converted to strings

// 4️⃣ Deleting Properties
// const obj = { a: 1 };
// delete obj.a;
// console.log(obj.a);


// A. 1
// B. null
// C. undefined ✅
// D. Error

// 5️⃣ this Inside Arrow Function
// const obj = {
//   name: "JS",
//   getName: () => this.name
// };

// console.log(obj.getName());


// A. JS
// B. undefined ✅
// C. Error
// D. null

// 👉 Arrow functions don’t bind this

// 6️⃣ this Inside Normal Function
// const obj = {
//   name: "JS",
//   getName() {
//     return this.name;
//   }
// };

// console.log(obj.getName());


// A. JS ✅
// B. undefined
// C. Error
// D. null

// 7️⃣ Freeze vs Modify
// const obj = { a: 1 };
// Object.freeze(obj);
// obj.a = 10;
// console.log(obj.a);


// A. 10
// B. undefined
// C. 1 ✅
// D. Error

// 8️⃣ Freeze vs Add Property
// const obj = { a: 1 };
// Object.freeze(obj);
// obj.b = 2;
// console.log(obj.b);


// A. 2
// B. undefined ✅
// C. Error
// D. null

// 9️⃣ Seal Behavior
// const obj = { a: 1 };
// Object.seal(obj);
// obj.a = 5;
// delete obj.a;
// console.log(obj.a);


// A. undefined
// B. 1
// C. 5 ✅
// D. Error

// 🔟 Object Keys Order
// const obj = { b: 2, a: 1 };
// console.log(Object.keys(obj));


// A. ["a","b"]
// B. ["b","a"] ✅
// C. Random
// D. Error

// 👉 Order = insertion order (non-integer keys)

// 1️⃣1️⃣ Numeric Key Ordering
// const obj = { 2: "b", 1: "a", c: "x" };
// console.log(Object.keys(obj));


// A. ["2","1","c"]
// B. ["1","2","c"] ✅
// C. ["c","1","2"]
// D. Error

// 👉 Numbers sorted first

// 1️⃣2️⃣ Spread Operator (Shallow Copy)
// const obj = { a: { x: 1 } };
// const copy = { ...obj };
// copy.a.x = 10;
// console.log(obj.a.x);


// A. 1
// B. 10 ✅
// C. undefined
// D. Error

// 1️⃣3️⃣ Object.assign() Behavior
// const a = { x: 1 };
// const b = { x: 2 };
// const c = Object.assign(a, b);
// console.log(a.x, c.x);


// A. 1 2
// B. 2 2 ✅
// C. 1 1
// D. Error

// 1️⃣4️⃣ Computed Property
// const key = "age";
// const obj = { [key]: 25 };
// console.log(obj.age);


// A. undefined
// B. Error
// C. 25 ✅
// D. null

// 1️⃣5️⃣ Destructuring Default Value
// const { a = 10 } = { a: undefined };
// console.log(a);


// A. undefined
// B. 10 ✅
// C. null
// D. Error

// 1️⃣6️⃣ Destructuring with null
// const { a = 10 } = { a: null };
// console.log(a);


// A. 10
// B. undefined
// C. null ✅
// D. Error

// 1️⃣7️⃣ in Operator
// const obj = { a: 1 };
// console.log("a" in obj, "toString" in obj);


// A. true false
// B. true true ✅
// C. false true
// D. false false

// 👉 Checks prototype chain too

// 1️⃣8️⃣ Prototype Access
// const obj = {};
// console.log(obj.__proto__ === Object.prototype);


// A. true ✅
// B. false
// C. undefined
// D. Error

// 1️⃣9️⃣ JSON.stringify Trap
// const obj = { a: 1, b: undefined };
// console.log(JSON.stringify(obj));


// A. {"a":1,"b":undefined}
// B. {"a":1,"b":null}
// C. {"a":1} ✅
// D. Error

// 2️⃣0️⃣ Method Extraction Trap
// const obj = {
//   name: "JS",
//   getName() {
//     return this.name;
//   }
// };

// const fn = obj.getName;
// console.log(fn());


// A. JS
// B. undefined ✅
// C. Error
// D. null

// 👉 this lost when method is detached
















// 🔥 SUPER-TRICKY JavaScript Object Output Questions
// (These break even experienced devs – asked in product-company interviews)

// 1️⃣ Property Override Trap
// const obj = {
//   a: 1,
//   a: 2
// };

// console.log(obj.a);

// ✅ Output
// 2


// 👉 Last key wins

// 2️⃣ Object Key Type Coercion
// const obj = {};

// obj[1] = "one";
// obj["1"] = "string one";

// console.log(obj[1]);

// ✅ Output
// "string one"


// 👉 All object keys → string

// 3️⃣ Object as Key 😈
// const a = {};
// const b = {};

// const obj = {};
// obj[a] = "first";
// obj[b] = "second";

// console.log(obj);

// ✅ Output
// { "[object Object]": "second" }


// 👉 Objects stringify as keys

// 4️⃣ this Binding Nightmare
// const user = {
//   name: "Sapta",
//   getName() {
//     return this.name;
//   }
// };

// const fn = user.getName;
// console.log(fn());

// ✅ Output
// undefined


// 👉 this lost when method is detached

// 5️⃣ Arrow Function Trap
// const obj = {
//   name: "JS",
//   getName: () => this.name
// };

// console.log(obj.getName());

// ✅ Output
// undefined


// 👉 Arrow functions don’t bind this

// 6️⃣ Nested Mutation (Shallow Copy)
// const original = { a: { x: 1 } };
// const copy = { ...original };

// copy.a.x = 10;
// console.log(original.a.x);

// ✅ Output
// 10


// 👉 Spread is shallow

// 7️⃣ Freeze Illusion
// const obj = Object.freeze({ a: { x: 1 } });
// obj.a.x = 5;

// console.log(obj.a.x);

// ✅ Output
// 5


// 👉 freeze is shallow, nested objects still mutable

// 8️⃣ Seal vs Delete
// const obj = { a: 1 };
// Object.seal(obj);

// delete obj.a;
// console.log(obj.a);

// ✅ Output
// 1

// 9️⃣ Enumeration Order Madness
// const obj = {
//   b: 1,
//   2: "two",
//   a: 3,
//   1: "one"
// };

// console.log(Object.keys(obj));

// ✅ Output
// ["1", "2", "b", "a"]


// 👉 Numbers → sorted, strings → insertion order

// 🔟 JSON.stringify Surprise
// const obj = {
//   a: 1,
//   b: undefined,
//   c: function(){}
// };

// console.log(JSON.stringify(obj));

// ✅ Output
// {"a":1}


// 👉 undefined & functions are skipped

// 1️⃣1️⃣ Destructuring Default Trap
// const { a = 10 } = { a: null };
// console.log(a);

// ✅ Output
// null


// 👉 Defaults apply only to undefined

// 1️⃣2️⃣ in vs hasOwnProperty
// const obj = {};
// console.log("toString" in obj);
// console.log(obj.hasOwnProperty("toString"));

// ✅ Output
// true
// false

// 1️⃣3️⃣ Reference Mutation Through Function
// function update(obj) {
//   obj.value = 20;
// }

// const data = { value: 10 };
// update(data);

// console.log(data.value);

// ✅ Output
// 20


// 👉 Objects passed by reference

// 1️⃣4️⃣ Getter Execution
// const obj = {
//   get value() {
//     return 10;
//   }
// };

// console.log(obj.value);

// ✅ Output
// 10

// 1️⃣5️⃣ Getter with Side Effect 😈
// let count = 0;

// const obj = {
//   get value() {
//     return ++count;
//   }
// };

// console.log(obj.value);
// console.log(obj.value);

// ✅ Output
// 1
// 2

// 1️⃣6️⃣ Spread Override Order
// const obj = { a: 1 };
// const newObj = { ...obj, a: 2 };

// console.log(newObj.a);

// ✅ Output
// 2

// 1️⃣7️⃣ Method vs Function Context
// const obj = {
//   a: 10,
//   fn() {
//     return this.a;
//   }
// };

// console.log(obj.fn());
// console.log((obj.fn)());

// ✅ Output
// 10
// 10

// 1️⃣8️⃣ Prototype Property Access
// const obj = Object.create({ a: 1 });
// console.log(obj.a);

// ✅ Output
// 1

// 1️⃣9️⃣ Overwriting Prototype Property
// const proto = { a: 1 };
// const obj = Object.create(proto);

// obj.a = 10;
// console.log(obj.a, proto.a);

// ✅ Output
// 10 1

// 2️⃣0️⃣ delete Return Value
// const obj = { a: 1 };
// console.log(delete obj.a);

// ✅ Output
// true
















// 8️⃣ Interview Trap Question ⚠️
// let a = 10;

// function update(x) {
//   x = 20;
// }

// update(a);
// console.log(a);

// ✅ Output
// 10


// 👉 Because value copy is passed

// 9️⃣ Reference Type Trap
// let obj = { a: 1 };

// function update(o) {
//   o.a = 2;
// }

// update(obj);
// console.log(obj.a);

// ✅ Output
// 2


// 👉 Reference is copied, not object

// 🔟 Is JavaScript Pass-by-Value or Pass-by-Reference?
// ✅ JavaScript is ALWAYS pass-by-value

// BUT 👇

// Type	What is copied
// Primitive	Actual value
// Object	Reference (address)

// 🔥 This sentence alone can clear interviews.

// 1️⃣1️⃣ Equality Check Difference
// 10 === 10        // true
// {} === {}        // false


// 👉 Primitives → value comparison
// 👉 Objects → reference comparison

// 1️⃣2️⃣ Real-World React Example (Very Important)
// const state = { count: 0 };
// const newState = state;

// newState.count = 1;


// ❌ Mutates original state → BUG

// ✅ Correct way:

// const newState = { ...state, count: 1 };

// 🧠 Final Interview Answer (Memorize This)

// Primitives are value types because they store actual immutable values directly in stack memory.
// Non-primitives are reference types because they store a reference to heap memory, making large data structures efficient to manage and share.