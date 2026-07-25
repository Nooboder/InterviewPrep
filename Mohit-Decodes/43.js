// swap without using a temp variable

// Using distructuring

let a = 5;
let b = 10;

[a, b] = [b, a];

console.log(a); // Output: 10
console.log(b); // Output: 5


//But an empty array is not an empty object.
//so we need the constructor to check if the object is an array or not.
