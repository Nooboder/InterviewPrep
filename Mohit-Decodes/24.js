// Pure and Impure Function diference with example

// 🔴 Impure Function

// A function is IMPURE if any one of these is true:

// ❌ Modifies external state

// ❌ Mutates input arguments

// ❌ Depends on external data (time, random, global variables)

// ❌ Produces side effects

// ❌ Impure
let taxRate = 0.18;

function calculatePrice(price) {
  return price + price * taxRate;
}

// 🟢 Pure Function

// A function is PURE if:

// ✅ Same input → Same output (always)

// ✅ No side effects

// Does NOT modify external variables

// Does NOT change input arguments

// Does NOT interact with outside world (API, DOM, Date, Math.random)

// ✅ Pure
function calculatePrice(price, taxRate) {
  return price + price * taxRate;
}
