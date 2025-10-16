// 39. slice , splice 

let arr = [1, 2, 3, 4, 5];

// slice(start, end) - returns a new array from start to end (not including end)
let slicedArray = arr.slice(1, 4);
console.log(slicedArray); // [2, 3, 4]

// splice(start, deleteCount, item1, item2, ...) - modifies the array in place
let splicedArray = arr.splice(2, 2, 'a', 'b');

console.log(splicedArray); // [3, 4] - removed elements
console.log(arr); // [1, 2, 'a', 'b', 5] - modified original array

// Example of using splice to remove elements
let arr2 = [10, 20, 30, 40, 50];
arr2.splice(1, 2);
console.log(arr2); // [10, 40, 50]

// Example of using splice to add elements  
let arr3 = [100, 200, 300];
arr3.splice(1, 0, 'x', 'y');
console.log(arr3); // [100, 'x', 'y', 200, 300]

// Example of using splice to replace elements
let arr4 = ['a', 'b', 'c', 'd'];
arr4.splice(1, 2, 'x', 'y');
console.log(arr4); // ['a', 'x', 'y', 'd']

