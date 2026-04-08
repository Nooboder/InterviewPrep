// find the length of string without using length property

function getStringLength(str) {
  let length = 0; // Initialize length to 0
  while (str[length] !== undefined) {
    length++; // Increment length until we reach the end of the string
  }
  return length; // Return the calculated length
}

console.log(getStringLength("hello")); // Output: 5
console.log(getStringLength("worldhj")); // Output: 7
