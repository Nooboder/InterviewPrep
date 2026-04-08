// Check if all numbers in the array are positive?

function areAllNumbersPositive(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= 0) {
      return false; // If any number is not positive, return false
    }
  }
  return true; // If all numbers are positive, return true
}

console.log(areAllNumbersPositive([1, 2, 3, 4])); // Output: true
console.log(areAllNumbersPositive([1, -2, 3, 4])); // Output: false
