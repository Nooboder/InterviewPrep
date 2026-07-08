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


// Optimized version using a frequency map


function firstNonRepeatingCharacter(str) {
  const freq = {};

  // Count frequency of each character
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  // Find the first character with frequency 1
  for (const ch of str) {
    if (freq[ch] === 1) {
      return ch;
    }
  }

  return undefined;
}

console.log(firstNonRepeatingCharacter("hello"));  // h
console.log(firstNonRepeatingCharacter("aabbcc")); // undefined
