// reverse a string without using built in functions

function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

const inputString = "Hello, World!";
const reversedString = reverseString(inputString);
console.log(reversedString); // Output: !dlroW ,olleH


// reversed an array without using built in functions


function reverseArray(arr) {
  const reversed = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }

  return reversed;
}

const arr = [1, 2, 3, 4, 5];
console.log(reverseArray(arr)); // [5, 4, 3, 2, 1]





// 3. Reverse Without Modifying Original Array
const arr = [1, 2, 3, 4, 5];

const reversed = [...arr].reverse();

console.log(reversed); // [5, 4, 3, 2, 1]
console.log(arr);      // [1, 2, 3, 4, 5]