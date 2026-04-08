// Find largest element in nested array

// Input : [[1, 2], [3, 4], [5, 6]]

// Output : 6

function findLargestElement(arr) {
  let max = arr[0][0]; // Initialize max with the first element of the first sub-array

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] > max) {
        max = arr[i][j]; // Update max if a larger element is found
      }
    }
  }

  return max; // Return the largest element found
}

console.log(
  findLargestElement([
    [1, 2],
    [3, 4],
    [5, 6],
  ]),
); // Output: 6
