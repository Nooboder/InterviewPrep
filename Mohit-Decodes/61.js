// Array.fill Reference Trap

const arr = new Array(5).fill([]);
arr[0].push(1);
console.log(arr); // Output: [[1], [1], [1], [1], [1]]

// explaination:In the code snippet, we create a new array of length 5 and fill it with empty arrays using the `fill` method. However, the `fill` method fills all positions in the array with the same reference to the empty array. This means that all elements in the array point to the same array in memory.

// When we push the value `1` into `arr[0]`, it modifies the single array that all elements of `arr` reference. As a result, all elements of `arr` show the updated array containing `1`, which is why we see `[[1], [1], [1], [1], [1]]` as the output.To avoid this issue, you can use a loop to create separate arrays for each element:
// const arr = new Array(5).fill().map(() => []);
// arr[0].push(1);
// console.log(arr); // Output: [[1], [], [], [], []]
// In this modified code, we use `map` to create a new empty array for each element in the original array, ensuring that each element references a different array in memory. Now, when we push `1` into `arr[0]`, it only modifies that specific array, resulting in the expected output.
