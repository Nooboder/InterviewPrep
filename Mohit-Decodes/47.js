// find minimum in array

function findMinimum(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

console.log(findMinimum([5, 2, 9, 1, 5])); // Output: 1
console.log(findMinimum([10, 20, 5, 30, 15])); // Output: 5
