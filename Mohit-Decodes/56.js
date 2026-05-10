// find longest string in an array

const arr = ["apple", "banana", "grapefruit", "kiwi"];

const longest = arr.reduce((longestStr, currentStr) => {
  return currentStr.length > longestStr.length ? currentStr : longestStr;
}, "");

console.log(`Longest string in the array: ${longest}`);
