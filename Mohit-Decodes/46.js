// find the middle element of an array

function findMiddleElement(arr) {
  const middleIndex = Math.floor(arr.length / 2);
  return arr[middleIndex];
}

console.log(findMiddleElement([1, 2, 3, 4, 5])); // Output: 3
console.log(findMiddleElement([10, 20, 30, 40, 50])); // Output: 30
