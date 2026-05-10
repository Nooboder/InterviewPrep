// Array fill reference type
let arr = new Array(3).fill([]);

arr[0].push(1);
console.log(arr); // Output: [ [ 1 ], [ 1 ], [ 1 ] ]

// .fill method fills all the elements of an array with a static value. When we use .fill([]), it fills all the elements with the same reference to the empty array. Therefore, when we push a value into one of the arrays, it affects all the elements since they all point to the same array in memory.

// To avoid this issue, we can use .fill().map(() => []) to create a new array for each element. This way, each element in the array will have its own reference to a different empty array, and pushing a value into one of them will not affect the others.
