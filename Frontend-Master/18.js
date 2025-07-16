const obj = { a: 'JS' };

const { a, a: b, a: c } = obj;

console.log(a, b, c); // Output: JS JS JS


//✋✋ Explaination:
//
// In this code, we are using object destructuring to extract the property `a` from the object `obj`. The property `a` is assigned to three different variables: `a`, `b`, and `c`. All three variables will hold the same value, which is the string 'JS'. Therefore, when we log `a`, `b`, and `c`, the output will be 'JS JS JS'. This demonstrates how object destructuring can be used to create multiple variables from the same property of an object. Each variable references the same value, which is 'JS' in this case.✋✋