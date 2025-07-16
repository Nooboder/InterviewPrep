const YT = "Frontend-Master";
const IG = "https://www.youtube.com/@Frontend-Master";


const res = IG && YT
// const res = !!(IG && YT)  if we want to cast that value in boolean
console.log(res); // Output: Frontend-Master





//✋✋ Explaination  :
// here we are using the logical AND operator (`&&`) to evaluate two truthy values: `IG` and `YT`. Since both variables are truthy, the result of the expression is the value of the second operand, which is `YT`. Therefore, when we log `res`, it outputs 'Frontend-Master'. This demonstrates how the logical AND operator can be used to return a value based on the truthiness of its operands. If both operands are truthy, it returns the second operand; if either is falsy, it returns the first falsy operand.
// In this case, both `IG` and `YT` are truthy, so the result is 'Frontend-Master'. This behavior is often used in JavaScript to provide default values or to chain expressions together.✋✋