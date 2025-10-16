// 18. Short method 


// a-b > 0 numbers are swap
// a-b < 0 numbers are not swap

// const numbers = [10, 2, 31, 1];

// const sortedNumbers = numbers.sort((a, b) => a - b); // Assending order

// //const sortedNumbers = numbers.sort((a,b)=> b-a); // descending order

// console.log(sortedNumbers);

// ---------------------------------------------------------------------------------------------------------------------------------------------
// apply sort in number array  and explain how it works, no sorting, ascending, descending

const numbers = [10, 2, 31, 1];

const sortedNumbers = numbers.sort();
console.log(sortedNumbers); // [1, 10, 2, 31] it is not sorting

["10", "2", "31", "1"]

// ASCII values compared 
// Lexicograohical order or dictionary order or alphabetical order

// 1. "1"  ASCII value is 49
// 2. "10" ASCII value is 49 and 48
// 3. "2"  ASCII value is 50
// 4. "31" ASCII value is 51 and 49

// for string array 
const names = ["John", "Alice", "Bob", "Charlie"];
const sortedNames = names.sort();
console.log(sortedNames); // [ 'Alice', 'Bob', 'Charlie', 'John' ]
// it is sorting in alphabetical order

// ASCII values compared
// Lexicograohical order or dictionary order or alphabetical order
// 1. "Alice"   ASCII value is 65
// 2. "Bob"     ASCII value is 66
// 3. "Charlie" ASCII value is 67
// 4. "John"    ASCII value is 74