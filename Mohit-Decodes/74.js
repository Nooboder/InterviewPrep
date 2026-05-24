// Reverse an array without using the built-in reverse method.

const reverseArray = (arr) => {
  return arr.reduce((reversed, item) => [item, ...reversed], []);
};

const input = [1, 2, 3, 4, 5];
const output = reverseArray(input);
console.log(output); // Output: [5, 4, 3, 2, 1]
