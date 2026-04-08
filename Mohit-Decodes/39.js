// Swap two numbers without using a temporary variable

let a = 5;
let b = 10;

a = a + b; // a now holds the sum of a and b (15)
b = a - b; // b now holds the original value of a (5)
a = a - b; // a now holds the original value of b (10)

console.log("a:", a); // Output: a: 10
console.log("b:", b); // Output: b: 5
