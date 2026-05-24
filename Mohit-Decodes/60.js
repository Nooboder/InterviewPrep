// Swap without using a temporary variable
// help of de-structuring assignment in JavaScript

let a = 5;
let b = 10;

[a, b] = [b, a];

console.log(a); // 10
console.log(b); // 5
