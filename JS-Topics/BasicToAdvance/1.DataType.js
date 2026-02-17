// JAVASCRIPT IS A INTEPRETED & COMPILER LANGUAGE.

// 🔹 Step 1: Compilation

// The engine first:
// Parses the code
// Converts it into bytecode
// Uses Just-In-Time (JIT) compilation
// Compiles frequently used parts into optimized machine code

// 🔹 Step 2: Execution

// Then:
// The compiled code runs on your machine
// So technically:
// JavaScript is compiled just before execution (JIT compilation).




// DATATYPES:

// 1. PRIMITIVE DATATYPES:
// ✔ Primitive = immutable values
// ✔ Stored directly in memory (not by reference)

//     a. NUMBER
//     b. STRING
//     c. BOOLEAN
//     d. NULL
//     e. UNDEFINED
//     f. SYMBOL

// 2. NON-PRIMITIVE DATATYPES:
// Reference types store a reference (pointer) to memory.

//     a. OBJECT
//     b. ARRAY
//     c. FUNCTION
//     d. DATE
//     e. REGEX
//     f. ERROR
//     g. MAP
//     h. SET




// STRING TO NUMBER : ----

// ✅ 1. Number() — Most Common & Clean
// Number("123");    // 123
// Number("12.5");   // 12.5
// Number("abc");    // NaN

// ✅ 2. Unary + Operator — Short & Fast
// +"123"    // 123
// +"12.5"   // 12.5
// +"abc"    // NaN

// ✅ 3. parseInt() — Converts to Integer
// parseInt("42")          // 42
// parseInt("42px")        // 42   (stops at non-digit)
// parseInt("10+2")        // 10

// ✅ 4. parseFloat() — For Decimal Numbers
// parseFloat("12.34")     // 12.34
// parseFloat("12.34px")   // 12.34

// ❗ parseInt vs Number difference
// Number("42px")     // NaN
// parseInt("42px")   // 42

// ✅ 5. Using Math for quick conversion
// Math.floor("12.8")   // 12
// Math.ceil("12.8")    // 13
// Math.round("12.8")   // 13

// 🔐 Extra: Check if it’s a valid number
// const num = Number(str);
// if (!isNaN(num)) {
//     console.log("Valid number:", num);
// }

// ⭐ Best Practice

// Use Number() or +str, unless you specifically need integer parsing with prefixes — then use parseInt(str, 10).






//  NUMBER TO STRING : ----


// ✅ 1. String() — Clean & Recommended
// String(123);      // "123"
// String(12.5);     // "12.5"

// ✅ 2. .toString()
// (123).toString();   // "123"
// (12.5).toString();  // "12.5"


// ⚠️ Works only on numbers (not null or undefined)

// ✅ 3. Template Literals
// `${123}`         // "123"
// `${num}`         // "456"

// ✅ 4. Concatenation with ""
// 123 + ""         // "123"

// 🧠 Bonus: Convert and format
// Convert number with fixed decimals:
// (12.345).toFixed(2)    // "12.35"

// Convert number to locale string:
// (1000000).toLocaleString()  // "1,000,000"

// ⭐ Best Practice

// Use String(number) or ${number} — they’re clean, simple, and safe.







// 3. How is null different from undefined?
// Value	Meaning
// undefined	Variable declared but not assigned
// null	Developer sets it intentionally to “no value”

// Example:

// let a;
// console.log(a);  // undefined

// let b = null;
// console.log(b);  // null



// 4. Why does typeof null === "object"?

// Because of a bug in the original JavaScript design (1995).

// Objects were tagged with the type code 0.
// null mistakenly got tagged with 0 as well.

// This bug became part of the spec → cannot be fixed.

// 5. What does typeof NaN return? Why?
// typeof NaN === "number"


// Because NaN is a special numeric value that represents “Not a valid number”.

// Still belongs to the number type.



// ✅ 2. Type Conversion / Coercion
// 6. Convert string "123" into a number?

// Ways:

// Number("123");
// +"123";
// parseInt("123");




// 7. Difference between Number("123") and parseInt("123abc")?
// Number("123abc") → NaN
// parseInt("123abc") → 123


// parseInt() stops reading at first non-digit.
// Number() must convert entire string to a valid number.





// 8. What happens?
// "5" - 2  // 3
// "5" + 2  // "52"


// Explanation:

// - forces numeric conversion → 5 - 2 = 3

// + prefers string concatenation if ANY operand is string → "5" + 2 = "52"






// 9. What is implicit type coercion?

// JavaScript automatically converting types.

// Examples:

// "5" * 2     // 10
// 1 + true    // 2
// false + 1   // 1










// 10. Output of:
// true + true       // 2
// false + 1         // 1
// "10" * "2"        // 20


// Reason:

// true → 1

// false → 0

// * always converts to numbers








// ✅ 3. Special Values
// 11. What is NaN? How to check correctly?

// NaN = Not a Number
// But ironically:

// NaN === NaN  // false


// Correct checks:

// Number.isNaN(value);        // Best








// 12. What is Infinity? When do you get it?

// Represents values beyond max limit.

// Examples:

// 1 / 0          // Infinity
// Math.pow(10, 400)  // Infinity








// 13. What is -0 in JavaScript?

// JavaScript has:

// 0

// -0 (negative zero)

// Difference is visible:

// 1 / 0   // Infinity
// 1 / -0  // -Infinity








// 14. Why does NaN === NaN return false?

// Because NaN is designed to mean “not equal to anything, including itself.”

// Spec rule.






// ✅ 4. Objects & References
// 15. Are arrays primitive or reference types?

// Reference types.

// typeof [] === "object"







// 16. What happens?
// let a = { x: 1 };
// let b = a;
// b.x = 10;

// console.log(a.x);  // 10


// Because both a and b reference same object in memory.








// 17. Shallow copy vs deep copy?
// Type	Description
// Shallow copy	Duplicates top-level object only
// Deep copy	Fully copies nested objects

// Shallow:

// let shallow = { ...obj };


// Deep:

// let deep = JSON.parse(JSON.stringify(obj));

// 18. Difference:
// const a = {};
// const b = {};

// a === b  // false


// They are different references.









// ✅ 5. Advanced Data Types
// 19. Map vs Object?
// Feature	Map	Object
// Key types	Any	Only string/symbol
// Order	Guaranteed	Not guaranteed
// Size	map.size	No size property
// Iteration	Easy	Harder



// 20. Set vs Array?
// Set	Array
// Unique values only	Allows duplicates
// Faster lookup	Slower lookup
// No indexing	Indexed











// 21. How do Symbols work?

// Unique identifiers.

// let id1 = Symbol("id");
// let id2 = Symbol("id");

// id1 === id2 // false


// Useful for:

// private object properties

// avoiding key collisions







// 22. What is BigInt?

// For handling large integers beyond 2^53 - 1.

// Example:

// let big = 12345678901234567890n;







// 23. Why:
// typeof [] === "object"
// typeof {} === "object"
// typeof null === "object"


// Because all three use the internal object type tag (0).







// ✅ 6. Trick Questions


// 24. Output?
// [] + []   // ""
// [] + {}   // "[object Object]"
// {} + []   // 0   (treated as empty block + array → 0)


// 25. Output of typeof:
// typeof NaN           // "number"
// typeof function(){}  // "function"
// typeof []            // "object"
// typeof null          // "object"

// 26. Output?
// let x;
// console.log(x++);


// x is undefined.

// undefined++ → NaN
// So:

// NaN

// 27. What does this return?
// "5" - "2" + "1"


// Step-by-step:

// "5" - "2" → 3

// 3 + "1" → "31"

// ✔ Output:

// "31"














// ✅ 1. Primitive vs Reference
// 1. Why are strings immutable but arrays are mutable?

// Strings are primitives, stored directly on the stack → cannot be changed.

// Arrays are objects, stored by reference → internal elements can change.

// Example:

// let s = "abc";
// s[0] = "z";   // No effect


// Internally, JS must create a NEW string every time.

// 2. Is a function a data type? What does typeof function(){} return and why?

// Yes.
// typeof function(){} === "function"

// Because JavaScript defines function as a callable object with internal [[Call]] property.

// 3. Why is typeof [] === 'object' but Array.isArray([]) is needed?

// Because arrays are specialized objects with:

// numeric keys

// length property

// prototype methods

// So:

// typeof []        // "object"
// Array.isArray([])  // true

// 4. Is "123" the same as new String("123")?

// No.

// "123" is a primitive string

// new String("123") is a String object

// typeof "123"        // "string"
// typeof new String() // "object"

// ✅ 2. Numbers / NaN / Infinity
// 5. Why does "10" - 5 work but "10" + 5 does not?

// Because:

// - operator → forces numeric conversion

// + operator → used for concatenation if any operand is string

// 6. Difference between isNaN() and Number.isNaN()?
// Function	Behavior
// isNaN()	Converts value to number first → may return incorrect results
// Number.isNaN()	Does NOT coerce → MOST accurate

// Example:

// isNaN("abc")            // true  (bad)
// Number.isNaN("abc")     // false (correct)

// 7. Why does Math.max(5, 10, "20") still work?

// Math.max() converts all arguments to numbers internally.

// So "20" → 20.

// 8. How do you detect negative zero -0?

// Use division check:

// Object.is(0, -0);     // false


// Or:

// 1 / -0 === -Infinity  // true

// 9. Why does '2' < '12' give false?

// String comparison → lexicographical:

// '2' vs '1'

// '2' > '1'

// So '2' < '12' → false

// 10. == vs === with numbers and strings?
// "5" == 5   // true  (coerces string to number)
// "5" === 5  // false (strict, no coercion)

// ✅ 3. Strings
// 11. Why does "abc"[0] = "z" not change the string?

// Strings are immutable → cannot modify characters by index.

// 12. What is a template literal?

// Uses backticks:

// `Hello ${name}`


// Features:

// multiline

// variables inside

// expressions inside

// 13. Why does "5" * "3" work but "5" / "a" gives NaN?

// Both * and / convert operands to numbers.

// "5" * "3" → 5 * 3

// "a" → NaN → entire result NaN

// ✅ 4. Boolean Coercion
// 14. List all falsy values.

// Only 7 falsy values:

// false

// 0

// -0

// 0n

// "" (empty string)

// null

// undefined

// NaN

// Everything else is truthy.

// 15. Why does Boolean([]) return true?

// Because arrays are objects, and all objects → truthy.

// 16. Why does Boolean({}) return true?

// Same reason → objects are truthy.

// ✅ 5. Type Conversion / Coercion
// 17. Steps for 1 + "1":

// Steps:

// JS checks if either operand is string.

// One operand is string → convert the other to string.

// Perform concatenation.

// Result: "11"

// 18. What happens in [] == ![] ?

// Step-by-step:

// ![] → false (array is truthy)

// [] == false

// [] → to primitive → ""

// "" → 0

// false → 0

// So:

// [] == ![]  // true

// 19. Why null == undefined returns true?

// Because the spec says:

// null only loosely equals:

// null

// undefined

// And nothing else.

// 20. parseInt("08") vs Number("08")
// parseInt("08")     // 8
// Number("08")       // 8


// Modern JS: both same.
// Older JS (ES3) interpreted leading 0 as octal → NOT anymore.

// 21. '5' - - '3' output?

// Steps:

// "5" → 5

// "3" → 3

// - - becomes +

// Result:

// 8

// ✅ 6. Objects, Arrays, and References
// 22. Why primitives compare by value but objects by reference?

// Primitives stored directly in stack → compared directly.
// Objects stored in heap → variables contain memory reference → compares pointer, not content.

// 23. What happens here?
// const a = { x: 1 };
// const b = { x: 1 };
// a == b  // false


// Different references in memory.

// 24. Does a copied array refer to same memory?

// Depends on how you copy:

// ❌ Same reference:
// const a = [1,2];
// const b = a;

// ✔ New array:
// const b = [...a];

// 25. Shallow vs Deep copy
// Shallow:

// Copies top level only.

// let copy = {...obj};

// Deep:

// Copies nested objects too.

// let deep = JSON.parse(JSON.stringify(obj));

// ✅ 7. Symbols & BigInt
// 26. Why can two Symbols with same description not be equal?

// Because Symbols are always unique.

// Symbol("id") === Symbol("id")  // false

// 27. Can you convert a Symbol to string or number?

// You can convert to string if explicit:

// String(Symbol("id"))


// You CANNOT convert to number → TypeError.

// 28. Can BigInt be used with numbers?

// No.

// 1n + 1   // TypeError


// Must convert manually.

// 29. What does the n suffix mean in BigInt?

// Marks a number literal as a BigInt.

// Example:

// 10n

// ✅ 8. Weird / Tricky Datatype Questions
// 30. typeof null
// typeof null === "object"


// Because of a historical bug.

// 31. typeof NaN
// "number"


// Because NaN is a special numeric value.

// 32. typeof (1n)
// "bigint"

// 33. typeof []
// "object"

// 34. Why does [] + {} return "[object Object]"?

// Steps:

// [] → ""

// {} → "[object Object]"

// So:

// "" + "[object Object]"

// 35. Why does {} + [] return 0?

// Because parser treats first {} as a block statement, not object.

// So effectively:

// +[]   // numeric coercion


// [] → "" → 0

// Result:

// 0
