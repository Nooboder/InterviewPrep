// REverse a string using reduce

const reverseString = (str) => {
  return str.split("").reduce((reversed, char) => char + reversed, "");
};

const input = "Hello, World!";
const output = reverseString(input);
console.log(output); // Output: "!dlroW ,olleH"

// REVerse a Sentence using reduce
const reverseSentence = (sentence) => {
  return sentence
    .split(" ")
    .reduce((reversed, word) => word + " " + reversed, "")
    .trim();
};

const inputSentence = "Hello, World!";
const outputSentence = reverseSentence(inputSentence);
console.log(outputSentence); // Output: "World! Hello,"
