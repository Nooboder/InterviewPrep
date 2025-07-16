console.log(z);
z = 1;

// output ReferenceError: z is not defined

// ✋✋here we are trying to log the value of `z` before it has been declared. In JavaScript, variables declared with `let` or `const` are not hoisted in the same way as those declared with `var`. This means that if you try to access a variable before it has been declared, you will get a `ReferenceError`. In this case, since `z` is not defined before the `console.log(z)` statement, it throws an error. To fix this, you should declare `z` before using it.✋✋ no information about z in js engine 