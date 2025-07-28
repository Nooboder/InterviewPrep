// 18. Short method 


// a-b > 0 numbers are swap
// a-b < 0 numbers are not swap

const numbers = [10, 2, 31, 1];

const sortedNumbers = numbers.sort((a, b) => a - b); // Assending order

//const sortedNumbers = numbers.sort((a,b)=> b-a); // descending order

console.log(sortedNumbers);