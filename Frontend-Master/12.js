let obj

obj = { a: { b: undefined } }

console.log(obj?.a?.b?.c?.d ?? "X"); // Output: "X"


// ✋✋ When we get the b:undefined , optional chaning stops the track of nesxt value. so we get undefined after b. did not check c and d
// Null coaleasing operator checks if the left shold be null or undefined? it get undefined so it returns X ✋✋