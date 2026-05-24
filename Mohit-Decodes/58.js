console.log([] == ![]); // true

// explain why the above code is true

// In JavaScript, the `==` operator performs type coercion when comparing values of different types. When you compare an empty array `[]` with the negation of an empty array `![]`, the following happens:
// 1. The empty array `[]` is truthy, so `![]` evaluates to `false`.
// 2. Now the comparison is between `[]` and `false`.
// 3. When comparing an object (like an array) to a boolean, JavaScript converts the object to a primitive value. The empty array `[]` is converted to an empty string `""`.
// 4. Now the comparison is between `""` and `false`.
// 5. When comparing a string to a boolean, JavaScript converts the boolean to a number. `false` is converted to `0`.
// 6. Now the comparison is between `""` and `0`.
// 7. When comparing a string to a number, JavaScript converts the string to a number. An empty string `""` is converted to `0`.
// 8. Now the comparison is between `0` and `0`, which is `true`.

// console.log([] == false); // true
// console.log([] == 0); // true
// console.log([] == ""); // true
// console.log([] == []); // false
// console.log([] == ![]); // true
// console.log(![] == []); // true
// console.log(![] == ![]); // true
// console.log(![] == false); // true
// console.log(![] == 0); // true
// console.log(![] == ""); // true
// console.log(![] == []); // true
// console.log(false == []); // true
// console.log(false == ![]); // true
// console.log(false == false); // true
// console.log(false == 0); // true
// console.log(false == ""); // true
// console.log(false == []); // true
// console.log(0 == []); // true
// console.log(0 == ![]); // true
// console.log(0 == false); // true
// console.log(0 == 0); // true
// console.log(0 == ""); // true
// console.log(0 == []); // true
// console.log("" == []); // true
// console.log("" == ![]); // true
// console.log("" == false); // true
// console.log("" == 0); // true
// console.log("" == ""); // true
// console.log("" == []); // true
