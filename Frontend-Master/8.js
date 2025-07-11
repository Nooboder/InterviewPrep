const a = 4 ** 2

console.log(a) // 16



// 💥💣 Meaning of double astrix 
// ** is the exponentiation operator in JavaScript, used to raise a number to the power of another number.
// For example, 4 ** 2 means 4 raised to the power of 2


const b = 4 ** 4

console.log(b) // 256

// this is exactly same as 
const c = Math.pow(4, 4)

console.log(c) // 256


// 💥💥 Follow up Question 💥💥

// What is the best way to use between ** and Math.pow()?

// 🤞🤞 if you are working with BigInt then double astrix is the best way to use because Math.pow() does not support BigInt 🤞🤞