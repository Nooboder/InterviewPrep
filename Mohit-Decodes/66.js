Input: "aaabbc";

Output: "a3b2c1";

function countCharacters(str) {
  let result = "";
  let count = 1;
  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      result += str[i - 1] + count;
      count = 1;
    }
  }
  result += str[str.length - 1] + count;
  return result;
}

const input = "aaabbc";
const output = countCharacters(input);
console.log(output); // Output: "a3b2c1"
