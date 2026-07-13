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


// 2.



function countVowels(str) {
  let count = 0;
  const ch = str.toLowerCase()
  for (let i of ch) {
    if (i === "a" ||
      i === "e" ||
      i === "i" ||
      i === "o" ||
      i === "u") {
      count++
    }
  }

  return count
}




const inputString = "Hello World!";
console.log(countVowels(inputString));
