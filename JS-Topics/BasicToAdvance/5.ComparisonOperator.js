// 🔰 1. Equality Operators
// ✅ Loose Equality (==)

// Does type coercion before comparison.

// 5 == "5"        // true
// 0 == false      // true
// "" == 0         // true
// null == undefined // true

// 🚫 Never use == in production (too unpredictable).
// ✅ Strict Equality (===)

// Compares value + type, no coercion.

// 5 === "5"     // false
// 0 === false   // false
// "hello" === "hello" // true
// null === undefined // false

// ✔ Always use === (recommended).
// 🔰 2. Inequality Operators
// ❌ Loose Inequality (!=)
// 5 != "5"  // false

// ✔ Strict Inequality (!==)
// 5 !== "5" // true

// 🔰 3. Relational Operators
// Greater than
// 5 > 3   // true

// Less than
// 5 < 3   // false

// Greater or equal
// 5 >= 5  // true

// Less or equal
// 5 <= 6  // true

// 🔰 4. Comparison with Strings

// JavaScript compares strings lexicographically (dictionary order based on UTF-16).

// "apple" < "banana"   // true
// "abc" < "Abc"        // false  (lowercase > uppercase)
// "2" > "100"          // true   ("2" > "1")

// 🔰 5. Comparison with Different Types

// JavaScript does coercion for <, >, <=, >=.

// "10" < 2   // false ("10" → 10)
// "5" > true // true  (5 > 1)

// 🔥 6. Special Cases / Tricky Questions
// ❓ null == 0?
// null == 0   // false ✔

// ❓ null >= 0?
// null >= 0   // true (!) because null → 0

// ❓ undefined == 0?
// undefined == 0 // false

// ❓ [] == false?
// [] == false // true

// ❓ [] == ![]?
// [] == ![] 
// // ![] → false → 0
// // [] → "" → 0
// // 0 == 0 → true

// 🔰 7. Object Comparison

// Objects are compared by reference, not value.

// {} === {}        // false
// [] === []        // false

// const a = {};
// const b = a;
// a === b          // true

// 🎯 Summary Table


// | Operator | Meaning           | Type Coercion | Example      |
// | -------- | ----------------- | ------------- | ------------ |
// | `==`     | loose equality    | ✔ yes         | `5 == "5"`   |
// | `===`    | strict equality   | ❌ no          | `5 === 5`    |
// | `!=`     | loose inequality  | ✔ yes         | `5 != "5"`   |
// | `!==`    | strict inequality | ❌ no          | `5 !== 5`    |
// | `<`      | less than         | ✔ yes         | `"5" < 10`   |
// | `>`      | greater than      | ✔ yes         | `2 > "1"`    |
// | `<=`     | less or equal     | ✔ yes         | `"10" <= 10` |
// | `>=`     | greater or equal  | ✔ yes         | `5 >= true`  |








// 🔥 1. What is the output?
// console.log(5 == "5");


// ✔ true
// Because == does type coercion.

// 🔥 2. What is the output?
// console.log(5 === "5");


// ✔ false
// Strict equality compares type + value.

// 🔥 3. What is the output?
// console.log(null == undefined);


// ✔ true
// They are equal only to each other with loose equality.

// 🔥 4. What is the output?
// console.log(null === undefined);


// ✔ false
// Strict check → type mismatch.

// 🔥 5. What is the output?
// console.log(null >= 0);


// ✔ true
// Because null → 0 for relational comparisons.

// 🔥 6. What is the output?
// console.log(null > 0);


// ✔ false
// null becomes 0, so 0 > 0 → false.

// 🔥 7. What is the output?
// console.log(null == 0);


// ✔ false
// null NEVER equals a number with ==.

// 🔥 8. What is the output?
// console.log([] == false);


// ✔ true
// [] → "" → 0
// false → 0

// 🔥 9. What is the output?
// console.log([] == []);


// ✔ false
// Different references.

// 🔥 10. What is the output?
// console.log([1] == 1);


// ✔ true
// [1] → "1" → 1.

// 🔥 11. What is the output?
// console.log([1,2] == "1,2");


// ✔ true
// Array → "1,2" via toString().

// 🔥 12. What is the output?
// console.log("2" > "12");


// ✔ true
// String comparison is lexicographical:
// "2" > "1".

// 🔥 13. What is the output?
// console.log("2" > 12);


// ✔ false
// "2" → 2 → 2 > 12 false.

// 🔥 14. What is the output?
// console.log("10" < "2");


// ✔ true
// String compare → first char "1" < "2".

// 🔥 15. What is the output?
// console.log(0 == []);


// ✔ true
// [] → "" → 0.

// 🔥 16. What is the output?
// console.log(0 == "");


// ✔ true
// "" → 0.

// 🔥 17. What is the output?
// console.log(false == "");


// ✔ true
// false → 0
// "" → 0.

// 🔥 18. What is the output?
// console.log(false == "0");


// ✔ true
// "0" → 0.

// 🔥 19. What is the output?
// console.log({} == {});


// ✔ false
// Different objects → different references.

// 🔥 20. What is the output?
// console.log([] == ![]);


// ✔ true

// Explanation:

// ![] → false

// false → 0

// [] → "" → 0
// → 0 == 0 is true.