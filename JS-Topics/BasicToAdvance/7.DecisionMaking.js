// 🔹 Decision Making in JavaScript (Control Flow)

// Decision-making lets your program choose different paths based on conditions.

// 1️⃣ if Statement

// Executes code only if the condition is true.

// let age = 20;

// if (age >= 18) {
//   console.log("You are eligible to vote");
// }


// ✔ Condition must evaluate to true or false

// 2️⃣ if...else

// Executes one block if condition is true, otherwise the else block runs.

// let isLoggedIn = false;

// if (isLoggedIn) {
//   console.log("Welcome back!");
// } else {
//   console.log("Please login");
// }

// 3️⃣ else if

// Used when you have multiple conditions.

// let marks = 75;

// if (marks >= 90) {
//   console.log("Grade A");
// } else if (marks >= 70) {
//   console.log("Grade B");
// } else if (marks >= 50) {
//   console.log("Grade C");
// } else {
//   console.log("Fail");
// }


// 👉 Conditions are checked top to bottom
// 👉 First true condition executes, rest are skipped

// 4️⃣ Nested if...else

// An if inside another if.

// let age = 22;
// let hasID = true;

// if (age >= 18) {
//   if (hasID) {
//     console.log("Entry allowed");
//   } else {
//     console.log("ID required");
//   }
// } else {
//   console.log("Underage");
// }


// ⚠️ Avoid deep nesting in production → hurts readability

// 5️⃣ switch Statement (Alternative)

// Best when checking multiple fixed values.

// let day = 3;

// switch (day) {
//   case 1:
//     console.log("Monday");
//     break;
//   case 2:
//     console.log("Tuesday");
//     break;
//   case 3:
//     console.log("Wednesday");
//     break;
//   default:
//     console.log("Invalid day");
// }


// ⚠️ break is mandatory to prevent fall-through

// 6️⃣ Ternary Operator (Short if...else)

// One-line decision making.

// let age = 16;

// let result = age >= 18 ? "Adult" : "Minor";
// console.log(result);


// ✅ Use only for simple conditions

// 7️⃣ Logical Operators in Conditions

// Combine multiple conditions.

// let age = 25;
// let hasLicense = true;

// if (age >= 18 && hasLicense) {
//   console.log("Can drive");
// }

// Operator	Meaning
// &&	AND
// `	
// !	NOT
// 8️⃣ Truthy & Falsy in if

// JavaScript auto-converts values to boolean.

// ❌ Falsy Values
// false, 0, "", null, undefined, NaN

// let username = "";

// if (username) {
//   console.log("Valid user");
// } else {
//   console.log("Invalid user");
// }

// 🔥 Interview Tricky Example
// if ("0") {
//   console.log("True");
// } else {
//   console.log("False");
// }


// ✅ Output: True ("0" is truthy)



























// 🔥 Decision-Making in JavaScript — Interview-Level MCQs

// (With tricky cases + explanations)

// 1️⃣
// if (true)
//   console.log("A");
//   console.log("B");


// Output?

// A) A
// B) B
// C) A B
// D) Error

// ✅ Answer: B

// 📌 Reason: Only the first statement belongs to if.
// Use {} to include multiple lines.

// 2️⃣
// let x = 0;

// if (x) {
//   console.log("True");
// } else {
//   console.log("False");
// }


// A) True
// B) False
// C) Error

// ✅ Answer: B

// 📌 0 is falsy

// 3️⃣
// if ("false") {
//   console.log("Yes");
// } else {
//   console.log("No");
// }


// A) Yes
// B) No

// ✅ Answer: A

// 📌 Non-empty strings are truthy

// 4️⃣
// let a = 10;

// if (a = 5) {
//   console.log("True");
// } else {
//   console.log("False");
// }


// A) True
// B) False
// C) Error

// ✅ Answer: A

// 📌 = is assignment, not comparison
// a = 5 → truthy

// 🔥 Very common interview trap

// 5️⃣
// if (null == undefined) {
//   console.log("Equal");
// }


// A) Equal
// B) Not Equal
// C) Error

// ✅ Answer: A

// 📌 == does type coercion

// 6️⃣
// if (null === undefined) {
//   console.log("Equal");
// } else {
//   console.log("Not Equal");
// }


// ✅ Answer: Not Equal

// 📌 === checks type + value

// 7️⃣
// let x = NaN;

// if (x) {
//   console.log("True");
// } else {
//   console.log("False");
// }


// A) True
// B) False

// ✅ Answer: B

// 📌 NaN is falsy

// 8️⃣
// if ([]){
//   console.log("Array");
// }


// A) Prints "Array"
// B) No output

// ✅ Answer: A

// 📌 Arrays & objects are truthy

// 9️⃣
// let a = 5;

// if (a > 3)
//   if (a < 10)
//     console.log("Yes");
//   else
//     console.log("No");


// A) Yes
// B) No
// C) Error

// ✅ Answer: A

// 📌 else belongs to the nearest if

// 🔟
// let result = 0 ? "A" : 1 ? "B" : "C";
// console.log(result);


// A) A
// B) B
// C) C

// ✅ Answer: B

// 📌 Ternary evaluates left → right
// 0 → falsy → check 1 → truthy

// 1️⃣1️⃣
// switch (2) {
//   case "2":
//     console.log("String");
//     break;
//   case 2:
//     console.log("Number");
// }


// A) String
// B) Number
// C) No output

// ✅ Answer: B

// 📌 switch uses strict comparison (===)

// 1️⃣2️⃣
// let x = 5;

// if (x > 10)
//   console.log("A");
// else if (x > 3)
//   console.log("B");
// else
//   console.log("C");


// ✅ Answer: B

// 📌 First matching condition wins

// 1️⃣3️⃣
// if (undefined) {
//   console.log("Yes");
// }


// A) Yes
// B) No output

// ✅ Answer: B

// 📌 undefined is falsy

// 1️⃣4️⃣
// if ({} == true) {
//   console.log("Yes");
// } else {
//   console.log("No");
// }


// ✅ Answer: No

// 📌 Object ≠ Boolean

// 1️⃣5️⃣ (Senior-Level)
// if ([]) console.log("A");
// if ({}) console.log("B");
// if ("") console.log("C");


// Output?

// A) A B
// B) A B C
// C) A C

// ✅ Answer: A B

// 📌 Empty string "" is falsy





// 🧠 Interview Golden Rules

// ✔ if() checks truthy/falsy, not boolean only
// ✔ Avoid == in production
// ✔ Always use {}
// ✔ switch uses ===
// ✔ Objects & arrays are always truthy