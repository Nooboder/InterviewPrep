// 📦 JavaScript Array Methods (Complete Guide)
// 🔑 1️⃣ Mutating vs Non-Mutating (VERY IMPORTANT)
// ❌ Mutating (changes original array)
// push, pop, shift, unshift,
// splice, sort, reverse,
// fill, copyWithin

// ✅ Non-Mutating (returns new array/value)
// map, filter, reduce, slice,
// concat, flat, flatMap,
// toSorted, toReversed, toSpliced


// ⚠️ In React / Redux → Prefer non-mutating

// 2️⃣ Adding & Removing Elements
// push() – add at end (mutates)
// arr.push(4); // returns new length

// pop() – remove from end
// arr.pop(); // returns removed element

// unshift() – add at start
// arr.unshift(0);

// shift() – remove from start
// arr.shift();

// 3️⃣ splice() – Swiss Army Knife (Mutates)
// arr.splice(start, deleteCount, ...items);

// const arr = [1, 2, 3, 4];
// arr.splice(1, 2, 99);

// console.log(arr); // [1, 99, 4]


// ⚠️ Avoid in React state

// 4️⃣ slice() – Safe Copy (Non-Mutating)
// arr.slice(start, end);

// arr.slice(0, 2); // copy first 2

// 5️⃣ Iteration & Transformation
// map() – transform elements
// arr.map(x => x * 2);


// ✔️ Same length
// ✔️ Returns new array

// forEach() – side effects only
// arr.forEach(x => console.log(x));


// ❌ Returns undefined

// filter() – remove items
// arr.filter(x => x > 2);


// ✔️ Length ≤ original

// reduce() – most powerful
// arr.reduce((acc, cur) => acc + cur, 0);


// Use cases:

// sum

// grouping

// flatten

// counting

// 6️⃣ Searching & Checking
// find() – first match
// arr.find(x => x > 10);

// findIndex()
// arr.findIndex(x => x === 5);

// includes() – modern
// arr.includes(3);

// indexOf()
// arr.indexOf(3);

// 7️⃣ Condition Checks
// some() – ANY match
// arr.some(x => x > 5);

// every() – ALL match
// arr.every(x => x > 0);

// 8️⃣ Sorting & Reversing
// sort() (⚠️ mutates)
// arr.sort((a, b) => a - b);

// reverse() (mutates)
// arr.reverse();

// 🆕 Safe Alternatives (ES2023+)
// arr.toSorted((a, b) => a - b);
// arr.toReversed();
// arr.toSpliced(1, 1);


// ✔️ React-safe

// 9️⃣ Flattening Arrays
// flat()
// [1, [2, [3]]].flat(2);

// flatMap()
// arr.flatMap(x => [x, x * 2]);

// 🔟 Copying & Merging
// Spread operator
// const copy = [...arr];

// concat()
// arr.concat([4, 5]);

// 1️⃣1️⃣ Filling & Internal Copy
// fill() (mutates)
// arr.fill(0);

// copyWithin() (mutates)
// arr.copyWithin(0, 1, 2);


// ⚠️ Rarely used in React

// 1️⃣2️⃣ Array Creation Helpers
// Array.from()
// Array.from("abc"); // ['a','b','c']

// Array.of()
// Array.of(5); // [5]

// new Array(5)
// Array(5); // empty slots

// 1️⃣3️⃣ Converting to String
// arr.join("-");
// arr.toString();

// 1️⃣4️⃣ Iterators
// arr.keys();
// arr.values();
// arr.entries();










// 1️⃣5️⃣ Array Method Return Table (Interview Gold)


// | Method  | Mutates | Return    |
// | ------- | ------- | --------- |
// | push    | ✅       | length    |
// | pop     | ✅       | element   |
// | map     | ❌       | array     |
// | filter  | ❌       | array     |
// | reduce  | ❌       | value     |
// | forEach | ❌       | undefined |
// | splice  | ✅       | array     |
// | slice   | ❌       | array     |
// | sort    | ✅       | array     |


// "map, filter, and reduce — because they’re immutable, predictable, and composable, ideal for React & Redux."
















// 🔥 Array Method Output MCQs (30+)
// 1️⃣
// console.log([1, 2, 3].map(x => x + 1));


// ✅ [2, 3, 4]

// 2️⃣
// console.log([1, 2, 3].forEach(x => x * 2));


// ✅ undefined

// 3️⃣
// console.log([1, 2, 3].filter(x => x));


// ✅ [1, 2, 3]

// 4️⃣
// console.log([0, false, "", null, 5].filter(Boolean));


// ✅ [5]

// 5️⃣
// console.log([1, 2, 3].reduce((a, b) => a + b));


// ✅ 6

// 6️⃣
// console.log([].reduce((a, b) => a + b));


// ✅ TypeError

// 7️⃣
// console.log([1, 2, 3].slice(1, 2));


// ✅ [2]

// 8️⃣
// const arr = [1, 2, 3];
// console.log(arr.splice(1, 1));
// console.log(arr);


// ✅ [2]
// ✅ [1, 3]

// 9️⃣
// console.log([10, 2, 30].sort());


// ✅ [10, 2, 30]

// 🔟
// console.log([10, 2, 30].sort((a, b) => a - b));


// ✅ [2, 10, 30]

// 1️⃣1️⃣
// console.log([1, 2, 3].reverse());


// ✅ [3, 2, 1]

// 1️⃣2️⃣
// const arr = [1, 2, 3];
// console.log([...arr].reverse());
// console.log(arr);


// ✅ [3, 2, 1]
// ✅ [1, 2, 3]

// 1️⃣3️⃣
// console.log([1, 2, 3].map(parseInt));


// ✅ [1, NaN, NaN]

// 1️⃣4️⃣
// console.log([1, 2, 3].flatMap(x => [x, x * 2]));


// ✅ [1, 2, 2, 4, 3, 6]

// 1️⃣5️⃣
// console.log([1, [2, [3]]].flat(2));


// ✅ [1, 2, 3]

// 1️⃣6️⃣
// console.log([1, 2, 3].find(x => x > 1));


// ✅ 2

// 1️⃣7️⃣
// console.log([1, 2, 3].findIndex(x => x === 3));


// ✅ 2

// 1️⃣8️⃣
// console.log([1, 2, 3].includes(2));


// ✅ true

// 1️⃣9️⃣
// console.log([1, 2, 3].some(x => x > 2));


// ✅ true

// 2️⃣0️⃣
// console.log([1, 2, 3].every(x => x > 0));


// ✅ true

// 2️⃣1️⃣
// const arr = [1, 2, 3];
// arr.length = 1;
// console.log(arr);


// ✅ [1]

// 2️⃣2️⃣
// console.log(Array(3).map(x => 1));


// ✅ [empty × 3]

// 2️⃣3️⃣
// console.log(Array.from({ length: 3 }, (_, i) => i));


// ✅ [0, 1, 2]

// 2️⃣4️⃣
// console.log([1, 2, 3] + [4, 5]);


// ✅ "1,23,4,5"

// 2️⃣5️⃣
// console.log([].concat([1, 2], 3));


// ✅ [1, 2, 3]

// 2️⃣6️⃣
// console.log([1, 2, 3].fill(0, 1, 2));


// ✅ [1, 0, 3]

// 2️⃣7️⃣
// console.log([1, 2, 3].copyWithin(0, 1));


// ✅ [2, 3, 3]

// 2️⃣8️⃣
// console.log([1, , 3].map(x => x * 2));


// ✅ [2, empty, 6]

// 2️⃣9️⃣
// console.log([1, , 3].forEach(x => console.log(x)));


// ✅

// 1
// 3
// undefined

// 3️⃣0️⃣
// console.log([1, 2, 3].toSorted((a, b) => b - a));


// ✅ [3, 2, 1]

// 3️⃣1️⃣ (🔥 Bonus)
// const arr = [1, 2, 3];
// const res = arr.reduce((acc, cur) => {
//   acc.push(cur * 2);
//   return acc;
// }, []);

// console.log(res);


// ✅ [2, 4, 6]