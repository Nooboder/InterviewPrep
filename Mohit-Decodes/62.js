// count of length of a string without using length property

function countLength(str) {
  let count = 0;
  for (let char of str) {
    count++;
  }
  return count;
}

const myString = "Hello, World!";
const length = countLength(myString);
console.log(`The length of the string is: ${length}`); // Output: The length of the string is: 13
