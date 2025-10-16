// 35. split, map, filter , join 

const str = "Hello World, Welcome to JavaScript";

// Split the string into an array of words
const wordsArray = str.split(" ");
console.log(wordsArray); // [ 'Hello', 'World,', 'Welcome', 'to', 'JavaScript' ]

// Map over the array to get the length of each word
const wordLengths = wordsArray.map((word) => word.length);
console.log(wordLengths); // [ 5, 6, 7, 2, 10 ]

// Filter the array to get words with length greater than 4
const longWords = wordsArray.filter((word) => word.length > 4);
console.log(longWords); // [ 'Hello', 'World,', 'Welcome', 'JavaScript' ]

// Join the array back into a string with hyphens
const joinedString = longWords.join("-");
console.log(joinedString); // Hello-World,-Welcome-JavaScript

// Explanation:
// 1. split(" ") - Splits the string into an array of substrings based on the specified delimiter (space in this case).
// 2. map((word) => word.length) - Creates a new array by applying the provided function (getting the length of each word) to each element in the original array.
// 3. filter((word) => word.length > 4) - Creates a new array containing only the elements that satisfy the provided condition (words with length greater than 4).
// 4. join("-") - Joins all elements of the array into a single string, with each element separated by the specified delimiter (hyphen in this case).

