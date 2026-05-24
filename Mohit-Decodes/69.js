// longest word in string using reduce

const longestWord = (str) => {
  return str.split(" ").reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, "");
};

const input = "The quick brown fox jumps over the lazy dog";
const output = longestWord(input);
console.log(output); // Output: "jumps"
