// Count words in a string

function countWords(str) {
  let count = 1; // Initialize word count to 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      count++; // Increment count for each space followed by a non-space character
    }
  }
  return count; // Return the total word count
}

console.log(countWords("I love JAVASCRIPT")); // Output: 3
