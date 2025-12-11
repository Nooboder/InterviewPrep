//🧠 Ultra-Simple Trick: “F.U.N + ZEN”


// F.U.N

// F → false

// U → undefined

// N → null

// ZEN

// Z → 0, -0, 0n

// E → "" (empty string)

// N → NaN

// Together → FUN ZEN
// Means → JS falsy values.






// 🧪 Tricky Interview Questions
// ✔ Why is "0" truthy but 0 falsy?

// "0" is a string, and non-empty strings are truthy.

// 0 is a number and one of the falsy values.

// ✔ Why is [] truthy?

// An empty array is an object → all objects are truthy.

// ✔ Why is [] == false true?

// Because of type coercion:

// [] == false  // true


// Steps:

// [] becomes ""

// "" becomes 0

// false becomes 0
// So 0 == 0 → true

// ✔ Why is {} == false false?

// {} cannot be coerced to a primitive cleanly → comparison fails.