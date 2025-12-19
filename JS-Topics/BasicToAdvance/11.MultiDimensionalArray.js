// 📦 Multi-Dimensional Arrays in JavaScript (In-Depth)
// 1️⃣ What is a Multi-Dimensional Array?

// A multi-dimensional array is an array of arrays.

// const matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];


// matrix.length → number of rows

// matrix[i].length → number of columns

// 2️⃣ Accessing Elements
// matrix[0][0]; // 1
// matrix[2][1]; // 8


// Think as:

// matrix[row][column]

// 3️⃣ Iterating Over 2D Arrays
// Using for loops (Fastest)
// for (let i = 0; i < matrix.length; i++) {
//   for (let j = 0; j < matrix[i].length; j++) {
//     console.log(matrix[i][j]);
//   }
// }

// Using for...of
// for (const row of matrix) {
//   for (const value of row) {
//     console.log(value);
//   }
// }

// Using map (React-friendly)
// matrix.map(row =>
//   row.map(cell => cell * 2)
// );

// 4️⃣ Creating Multi-Dimensional Arrays
// ⚠️ WRONG way (Common bug)
// const grid = Array(3).fill(Array(3).fill(0));


// ❌ All rows share the same reference

// ✅ Correct Way
// const grid = Array.from({ length: 3 }, () =>
//   Array(3).fill(0)
// );

// 5️⃣ Modifying Values (Mutation Trap)
// grid[0][0] = 99;

// console.log(grid);
// // All rows first column become 99 ❌ (if created wrongly)

// 6️⃣ Flattening Multi-Dimensional Arrays
// flat()
// matrix.flat();
// // [1,2,3,4,5,6,7,8,9]

// flat(depth)
// [[1,[2]]].flat(2);

// reduce Flatten (Interview Favorite)
// matrix.reduce((acc, row) => acc.concat(row), []);

// 7️⃣ Transforming 2D Arrays
// Multiply all elements
// const doubled = matrix.map(row =>
//   row.map(x => x * 2)
// );

// Convert to object list
// const users = [
//   ["Sapta", 27],
//   ["Amit", 25]
// ];

// const result = users.map(([name, age]) => ({ name, age }));

// 8️⃣ Matrix Operations (Interview Level)
// 🔹 Transpose a Matrix
// const transpose = matrix[0].map((_, col) =>
//   matrix.map(row => row[col])
// );

// 🔹 Row Sum
// matrix.map(row =>
//   row.reduce((a, b) => a + b, 0)
// );

// 🔹 Column Sum
// matrix[0].map((_, col) =>
//   matrix.reduce((sum, row) => sum + row[col], 0)
// );

// 9️⃣ Searching in 2D Array
// Find value
// let found = false;

// for (const row of matrix) {
//   if (row.includes(5)) {
//     found = true;
//     break;
//   }
// }

// 🔟 Deep Copy Multi-Dimensional Arrays
// ❌ Shallow copy (bug)
// const copy = [...matrix];

// ✅ Correct Deep Copy
// const deepCopy = matrix.map(row => [...row]);


// Or:

// structuredClone(matrix);

// 1️⃣1️⃣ Multi-Dimensional Arrays in React
// Rendering Table
// <table>
//   <tbody>
//     {matrix.map((row, i) => (
//       <tr key={i}>
//         {row.map((cell, j) => (
//           <td key={j}>{cell}</td>
//         ))}
//       </tr>
//     ))}
//   </tbody>
// </table>


// ⚠️ Avoid index keys in dynamic data

// 1️⃣2️⃣ Common Interview Traps 🔥
// Trap 1
// const arr = [[1], [2], [3]];
// console.log(arr.includes([1]));


// ❌ false (reference check)

// Trap 2
// console.log([[1], [2]] == [[1], [2]]);


// ❌ false

// Trap 3
// console.log([].concat([[1,2],[3,4]]));


// ✅ [[1,2],[3,4]]
















// 🔥 2D Array Output MCQs (Interview Level)
// 1️⃣
// const arr = [
//   [1, 2],
//   [3, 4]
// ];

// console.log(arr[1][0]);


// ✅ Output

// 3

// 2️⃣
// const arr = [[1], [2], [3]];
// console.log(arr.length, arr[0].length);


// ✅

// 3 1

// 3️⃣
// const arr = [[1, 2], [3, 4]];
// arr[0][1] = 99;

// console.log(arr);


// ✅

// [[1, 99], [3, 4]]

// 4️⃣ 🔥 (Reference Trap)
// const arr = Array(3).fill(Array(2).fill(0));
// arr[0][0] = 5;

// console.log(arr);


// ✅

// [[5,0],[5,0],[5,0]]


// 🧠 All rows share same reference

// 5️⃣
// const arr = [
//   [1, 2],
//   [3, 4]
// ];

// console.log(arr.flat());


// ✅

// [1, 2, 3, 4]

// 6️⃣
// const arr = [[1], [2, 3], [4]];
// console.log(arr.flat().length);


// ✅

// 4

// 7️⃣
// const arr = [[1, 2], [3, 4]];

// const res = arr.map(row => row.map(x => x * 2));
// console.log(res);


// ✅

// [[2,4],[6,8]]

// 8️⃣
// const arr = [[1, 2], [3, 4]];

// const res = arr.map(row => row.push(10));
// console.log(res);


// ✅

// [3, 3]


// 🧠 push returns length, and mutates rows

// 9️⃣
// const arr = [[1, 2], [3, 4]];
// const copy = [...arr];

// copy[0][0] = 99;
// console.log(arr);


// ✅

// [[99,2],[3,4]]


// 🧠 Shallow copy only

// 🔟
// const arr = [[1, 2], [3, 4]];

// const deepCopy = arr.map(row => [...row]);
// deepCopy[0][0] = 88;

// console.log(arr);


// ✅

// [[1,2],[3,4]]

// 1️⃣1️⃣
// const arr = [[1, 2], [3, 4]];

// console.log(arr.includes([1, 2]));


// ✅

// false


// 🧠 Reference comparison

// 1️⃣2️⃣
// const arr = [[1, 2], [3, 4]];

// console.log(arr.find(row => row.includes(3)));


// ✅

// [3,4]

// 1️⃣3️⃣
// const arr = [[1, 2], [3, 4]];

// console.log(arr.findIndex(row => row[0] === 3));


// ✅

// 1

// 1️⃣4️⃣
// const arr = [[1, 2], [3, 4]];

// const res = arr.reduce((acc, row) => acc.concat(row), []);
// console.log(res);


// ✅

// [1,2,3,4]

// 1️⃣5️⃣ 🔥
// const arr = [[1, 2], [3, 4]];

// const res = arr.map(row => row.reduce((a, b) => a + b));
// console.log(res);


// ✅

// [3, 7]

// 1️⃣6️⃣
// const arr = [[1, 2], [3, 4]];

// const res = arr[0].map((_, col) =>
//   arr.map(row => row[col])
// );

// console.log(res);


// ✅

// [[1,3],[2,4]]


// 🧠 Matrix transpose

// 1️⃣7️⃣
// const arr = [[1, 2], [3, 4]];

// for (let i in arr) {
//   for (let j in arr[i]) {
//     console.log(arr[i][j]);
//   }
// }


// ✅

// 1
// 2
// 3
// 4

// 1️⃣8️⃣
// const arr = [[1, , 3], [4, 5]];

// console.log(arr.flat());


// ✅

// [1, 3, 4, 5]


// 🧠 Empty slots skipped

// 1️⃣9️⃣
// const arr = [[1, 2], [3, 4]];

// console.log(arr.map(row => row.length));


// ✅

// [2, 2]

// 2️⃣0️⃣ 🔥 (Mutation Trap)
// const arr = [[1, 2], [3, 4]];

// arr.map(row => row.push(0));
// console.log(arr);


// ✅

// [[1,2,0],[3,4,0]]

// 2️⃣1️⃣
// const arr = [[1, 2], [3, 4]];

// console.log(arr.every(row => row.includes(2)));


// ✅

// false

// 2️⃣2️⃣
// const arr = [[1, 2], [3, 4]];

// console.log(arr.some(row => row.includes(2)));


// ✅

// true

// 2️⃣3️⃣
// const arr = [[1, 2], [3, 4]];

// const res = arr.flatMap(row => row);
// console.log(res);


// ✅

// [1,2,3,4]

// 2️⃣4️⃣
// const arr = Array.from({ length: 2 }, () =>
//   Array.from({ length: 2 }, (_, i) => i)
// );

// console.log(arr);


// ✅

// [[0,1],[0,1]]

// 2️⃣5️⃣ 🔥
// const arr = [[1, 2], [3, 4]];

// console.log(arr == arr.map(row => row));


// ✅

// false
