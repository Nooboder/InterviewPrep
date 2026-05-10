// Difference between largest and samllest

function findDifference(arr) {
  let max = arr[0];
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return max - min;
}

console.log(findDifference([1, 2, 3, 4, 5])); // Output: 4
console.log(findDifference([10, 20, 30, 40, 50])); // Output: 40
