let a;
let b;

a = 1;
b = (a++, a++, a => a + 1)(a);

console.log(b); // Output: 4


// ✋✋ Explanation: Expression and IFFE (Immediately Invoked Function Expression) combined.

// a++ increments the value of a by 1 each time it is called.
// The first a++ makes a = 2.
// The second a++ makes a = 3.
// The function a => a + 1 takes the current value of a (which is now 3) and returns a + 1 IFFE, which is 4.
// So, the final value of b is 4. ✋✋ 