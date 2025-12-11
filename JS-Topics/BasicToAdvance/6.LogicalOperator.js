// 🔥 Logical Operators in JavaScript

// JS has 3 logical operators:

//1. && (AND)

//2. || (OR)

//3. ! (NOT)

// ✅ 1. Logical AND (&&)
// ✔ Returns first falsy value OR last value if all are truthy.
// true && true      // true
// true && false     // false

// 🔥 With non-boolean values
// "hello" && 10     // 10  (both truthy → returns last)
// "" && "world"     // ""  (first falsy)
// 0 && "test"       // 0

// ✔ Used for:
// isLoggedIn && showDashboard();

// ✅ 2. Logical OR (||)
// ✔ Returns first truthy value OR last value if all are falsy.
// true || false     // true
// false || true     // true

// 🔥 With non-boolean values
// "" || "default"   // "default"
// 0 || 5            // 5
// null || "hi"      // "hi"
// "hello" || 0      // "hello" (first truthy)

// ✔ Used for default values:
// const name = userName || "Guest";

// ✅ 3. Logical NOT (!)

// Negates the value after converting to boolean.

// !true        // false
// !false       // true
// !0           // true
// !""          // true
// !"hello"     // false

// Double NOT → convert to boolean:
// !!"hello"   // true
// !!0         // false











// ⚠ Important: Logical Operators RETURN values, not booleans

// This is what confuses 90% of beginners + appears in interviews.

// Example:

// console.log(2 && 5);  // 5
// console.log(0 || 7);  // 7
// console.log("A" && "B"); // "B"
// console.log("A" || "B"); // "A"

// 🔥 Tricky Interview Questions
// 1. What is the output?
// console.log(true && "Hello");


// ✔ "Hello"

// 2. What is the output?
// console.log(false || "Hello");


// ✔ "Hello"

// 3. What is the output?
// console.log(null && "test");


// ✔ null

// 4. What is the output?
// console.log("hi" || 0 || null);


// ✔ "hi" (first truthy)

// 5. What is the output?
// console.log("" || 0 || null);


// ✔ null (all falsy → return last)

// 6. What is the output?
// console.log("" && 5);


// ✔ "" (first falsy)

// 7. What is the output?
// console.log(!"0");


// ✔ false (non-empty string is truthy → negated)

// 8. What is the output?
// console.log(![]);


// ✔ false (array is truthy)
