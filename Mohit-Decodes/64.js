// count vowels in a string

const str = "Hello, World!";

const count = str.match(/[aeiou]/gi).length || 0;

console.log(`The number of vowels in the string is: ${count}`); // Output: The number of vowels in the string is: 3
