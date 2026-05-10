// count vowels in a string

function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}
// Example usage:
const inputString = "Hello World!";
const vowelCount = countVowels(inputString);
console.log(`Number of vowels in "${inputString}": ${vowelCount}`);
