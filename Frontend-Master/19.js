let a = NaN;
let b = NaN;

console.log(a == b);// Output: false
console.log(a === b); // Output: false

//✋✋ Explaination:
// In JavaScript, `NaN` (Not-a-Number) is a special value that represents an undefined or unrepresentable numerical result. According to the IEEE 754 standard, `NaN` is not equal to any value, including itself. Therefore, both the loose equality (`==`) and strict equality (`===`) comparisons between two `NaN` values will return `false`. This behavior is consistent across all JavaScript engines, making `NaN` a unique case in equality comparisons.✋✋




// 🤖 Q. how can i compare a and b so that results comes out to be true ? 🤖


// let a = NaN;
// let b = NaN;

// console.log(Number.isNaN(a) && Number.isNaN(b)); // Output: true

// ✋✋ Explanation: here we are using the `Number.isNaN()` method to check if both `a` and `b` are `NaN`. This method correctly identifies `NaN` values, and since both `a` and `b` are `NaN`, the expression evaluates to `true`. This is a reliable way to check for `NaN` values in JavaScript.✋✋


// let a = NaN;
// let b = NaN;

// console.log(Object.is(a, b)); // Output: true

//✋✋ Explanation:
// The `Object.is()` method determines whether two values are the same value. In the case of `NaN`, `Object.is()` treats two `NaN` values as equal, which is different from the behavior of the equality operators (`==` and `===`). Therefore, when you compare two `NaN` values using `Object.is(a, b)`, it returns `true`. This is a useful way to check for equality specifically for `NaN` values, as it aligns with the expectation that two `NaN` values should be considered equal.✋✋
