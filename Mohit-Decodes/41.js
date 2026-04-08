// find first non-repeating character in a string

function firstNonRepeatingCharacter(str) {
  for (let i = 0; i < str.length; i++) {
    let count = 0; // Initialize count for the current character
    for (let j = 0; j < str.length; j++) {
      if (str[i] === str[j]) {
        count++; // Increment count if the characters match
      }
    }

    if (count === 1) {
      return str[i]; // Return the first non-repeating character
    }
  }
}

console.log(firstNonRepeatingCharacter("hello")); // Output: "h"
console.log(firstNonRepeatingCharacter("aabbcc")); // Output: undefined (no non-repeating character)
