// 🔹 1. Value vs Reference (Foundation)
// ✅ Primitive (Value Copy)
// let a = 10;
// let b = a;

// b = 20;
// console.log(a); // 10

// ❌ Non-Primitive (Reference Copy)
// const obj1 = { name: "Sapta" };
// const obj2 = obj1;

// obj2.name = "Singha";
// console.log(obj1.name); // "Singha" ❌


// 👉 Objects & arrays share memory reference.

// 🔹 2. Shallow Copy (⚠️ One-Level Deep)

// A shallow copy copies the top level only.
// Nested objects still share reference.

// ✅ Object Shallow Copy
// 1️⃣ Spread Operator (Most Common)
// const user = { name: "Sapta", address: { city: "Kolkata" } };
// const copy = { ...user };

// copy.address.city = "Delhi";

// console.log(user.address.city); // Delhi ❌

// 2️⃣ Object.assign()
// const copy = Object.assign({}, user);

// ✅ Array Shallow Copy
// const arr = [1, 2, [3, 4]];
// const copy = [...arr];

// copy[2][0] = 99;
// console.log(arr[2][0]); // 99 ❌






// 🔹 3. Deep Copy (✅ Completely Independent)

// A deep copy duplicates all nested levels.

// 🟢 Method 1: structuredClone() (BEST – Modern JS)
// const user = {
//   name: "Sapta",
//   skills: ["JS", "React"],
// };

// const deepCopy = structuredClone(user);
// deepCopy.skills.push("Go");

// console.log(user.skills); // ["JS", "React"] ✅


// ✔ Handles:

// Objects

// Arrays

// Maps, Sets

// Dates

// Circular references

// ❌ Not supported in very old browsers

// 🟡 Method 2: JSON Method (Common but LIMITED)
// const deepCopy = JSON.parse(JSON.stringify(obj));


// ❌ Problems:

// Loses undefined

// Loses function

// Loses Date, Map, Set

// Breaks circular references

// 🚫 Avoid in production

// 🟢 Method 3: Recursive Deep Copy (Interview Favorite)
// function deepClone(obj) {
//   if (obj === null || typeof obj !== "object") return obj;

//   const copy = Array.isArray(obj) ? [] : {};

//   for (let key in obj) {
//     copy[key] = deepClone(obj[key]);
//   }
//   return copy;
// }

// 🟢 Method 4: Lodash (_.cloneDeep)
// import cloneDeep from "lodash/cloneDeep";

// const copy = cloneDeep(obj);


// ✔ Battle-tested
// ✔ Production safe







// 🔥 Interview Tricky Question
// const a = { x: 1 };
// const b = { ...a };

// console.log(a === b); // false

// const a = { x: { y: 1 } };
// const b = { ...a };

// console.log(a.x === b.x); // true ⚠️











// 🟢 BASIC LEVEL (Warm-up)
// 1️⃣
// const a = { x: 1 };
// const b = a;
// b.x = 2;
// console.log(a.x);


// A. 1
// B. 2 ✅
// C. undefined
// D. Error

// 2️⃣
// const a = { x: 1 };
// const b = { ...a };
// b.x = 5;
// console.log(a.x);


// A. 1 ✅
// B. 5
// C. undefined
// D. Error

// 3️⃣
// const a = [1, 2, 3];
// const b = a;
// b.push(4);
// console.log(a.length);


// A. 3
// B. 4 ✅
// C. Error
// D. undefined

// 4️⃣
// const a = [1, 2];
// const b = [...a];
// b.push(3);
// console.log(a);


// A. [1,2,3]
// B. [1,2] ✅
// C. Error
// D. undefined

// 🟡 INTERMEDIATE LEVEL (Nested Confusion)
// 5️⃣
// const a = { x: { y: 1 } };
// const b = { ...a };
// b.x.y = 10;
// console.log(a.x.y);


// A. 1
// B. 10 ✅
// C. undefined
// D. Error

// 6️⃣
// const a = { x: { y: 1 } };
// const b = structuredClone(a);
// b.x.y = 5;
// console.log(a.x.y);


// A. 1 ✅
// B. 5
// C. undefined
// D. Error

// 7️⃣
// const a = [{ x: 1 }];
// const b = [...a];
// b[0].x = 2;
// console.log(a[0].x);


// A. 1
// B. 2 ✅
// C. undefined
// D. Error

// 8️⃣
// const a = [{ x: 1 }];
// const b = structuredClone(a);
// b[0].x = 9;
// console.log(a[0].x);


// A. 1 ✅
// B. 9
// C. undefined
// D. Error

// 🔵 ADVANCED LEVEL (JSON, Dates, Functions)
// 9️⃣
// const a = { date: new Date() };
// const b = JSON.parse(JSON.stringify(a));
// console.log(b.date instanceof Date);


// A. true
// B. false ✅
// C. Error
// D. undefined

// 🔟
// const a = { fn: () => 10 };
// const b = JSON.parse(JSON.stringify(a));
// console.log(b.fn);


// A. function
// B. undefined ✅
// C. Error
// D. null

// 1️⃣1️⃣
// const a = { x: undefined };
// const b = JSON.parse(JSON.stringify(a));
// console.log(b.x);


// A. undefined
// B. null
// C. Error
// D. undefined key removed ✅

// 1️⃣2️⃣
// const a = { x: NaN };
// const b = JSON.parse(JSON.stringify(a));
// console.log(b.x);


// A. NaN
// B. null ✅
// C. Error
// D. undefined

// 🟣 EXPERT LEVEL (Reference Traps)
// 1️⃣3️⃣
// const a = { x: { y: 1 } };
// const b = Object.assign({}, a);
// console.log(a.x === b.x);


// A. true ✅
// B. false
// C. Error
// D. undefined

// 1️⃣4️⃣
// const a = {};
// a.self = a;
// const b = JSON.parse(JSON.stringify(a));


// A. Works fine
// B. Returns empty object
// C. Throws error ✅
// D. undefined

// 1️⃣5️⃣
// const a = {};
// a.self = a;
// const b = structuredClone(a);
// console.log(b.self === b);


// A. true ✅
// B. false
// C. Error
// D. undefined

// 🔥 REACT / REDUX SCENARIOS
// 1️⃣6️⃣
// const state = { user: { name: "A" } };
// const newState = { ...state };
// newState.user.name = "B";

// console.log(state.user.name);


// A. A
// B. B ✅
// C. Error
// D. undefined

// 1️⃣7️⃣

// Correct immutable update?

// setUser(prev => ({
//   ...prev,
//   address: {
//     ...prev.address,
//     city: "Delhi"
//   }
// }));


// A. Shallow copy
// B. Deep immutable update ✅
// C. Mutation
// D. Error

// 1️⃣8️⃣

// Redux Toolkit avoids mutation by using:
// A. Spread
// B. JSON clone
// C. Immer ✅
// D. useMemo

// 🧠 TRICKY OUTPUT QUESTIONS
// 1️⃣9️⃣
// const a = { x: 1 };
// const b = structuredClone(a);
// console.log(a === b);


// A. true
// B. false ✅
// C. Error
// D. undefined

// 2️⃣0️⃣
// const a = [{ x: 1 }];
// const b = a.map(item => item);
// b[0].x = 7;
// console.log(a[0].x);


// A. 1
// B. 7 ✅
// C. undefined
// D. Error

// 🚀 FINAL RAPID-FIRE (10 MORE)

// 21️⃣ Spread deep copies nested objects? ❌
// 22️⃣ structuredClone handles circular refs? ✅
// 23️⃣ JSON clone preserves functions? ❌
// 24️⃣ Object.assign is deep copy? ❌
// 25️⃣ Arrays are reference types? ✅
// 26️⃣ Redux requires immutability? ✅
// 27️⃣ Immer allows “mutating” syntax? ✅
// 28️⃣ Deep copy is always faster? ❌
// 29️⃣ JSON clone safe for Dates? ❌
// 30️⃣ Shallow copy safe for flat objects? ✅