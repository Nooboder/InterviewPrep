// Input : 'aaabbc'

// Output : { a: 3, b: 2, c: 1 }

function countCharacters(str) {
  const freq = {};
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

const input = "aaabbc";
const output = countCharacters(input);
console.log(output); // Output: { a: 3, b: 2, c: 1 }
