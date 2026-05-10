// check if array contains a value in JavaScript

const array = [1, 2, 3, 4, 5];
const valueToCheck = 3;

if (array.includes(valueToCheck)) {
  console.log(`${valueToCheck} is present in the array.`);
} else {
  console.log(`${valueToCheck} is not present in the array.`);
}

// Output: 3 is present in the array.
// Method-2
function containsValue(arr, value) {
  return arr.includes(value);
}

console.log(containsValue(array, valueToCheck)); // Output: true
// Method-3
function containsValue(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
}

console.log(containsValue(array, valueToCheck)); // Output: true
