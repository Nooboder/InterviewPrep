// Input : "aaabbb"
// Output : 3

function longestSamePrefix(str) {
  if (str.length === 0) {
    return 0;
  }

  let count = 1;
  let first = str[0];

  for (let i = 1; i < str.length; i++) {
    if (str[i] === first) {
      count++;
    } else {
      break;
    }
  }
  return count;
}

const input = "aaabbb";
const result = longestSamePrefix(input);
console.log(result); // Output: 3
