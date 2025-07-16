// let n = "20";

// console.log(n + 1);// Output: 201
// console.log(++n);   // Output: 21
// console.log(n++); // Output: 21



let n = "20";

console.log(n + 1);// Output: 201
console.log(n++); // Output: 20
console.log(++n);   // Output: 22



//✋✋ Explaination:
// here the `n++` operation returns the current value of `n` (which is "20") before incrementing it, while `++n` increments `n` first and then returns the new value (which becomes "22"). The addition operation (`n + 1`) treats `n` as a string, resulting in string concatenation instead of numerical addition. Thus, the output reflects these behaviors accordingly.
// The first line concatenates the string "20" with the number 1, resulting in "201". The second line outputs the current value of `n` before incrementing it, which is "20". The third line increments `n` first, changing its value to "22", and then outputs that value. This illustrates how JavaScript handles type coercion and increment operations with strings and numbers.
// ✋✋ Note: The output of `n++` is "20" because it returns the value before incrementing, while `++n` returns the value after incrementing. The addition operation treats `n` as a string, leading to concatenation rather than numerical addition.✋✋ 




// Q2 -------------------------------------------------------------------------------------------------------




let a = 10;
let b = a++;

console.log(a + b); // Output: 21



//✋✋ Explaination :
//  here `a++` returns the current value of `a` (which is 10) before incrementing it, so `b` gets the value 10. After this operation, `a` becomes 11. Therefore, when we log `a + b`, it results in `11 + 10`, which equals 21. This demonstrates how the post-increment operator works in JavaScript, where the original value is used in the expression before the increment takes effect.
// ✋✋ Note: The post-increment operator (`a++`) returns the value before incrementing, so `b` gets the value of `a` before it is incremented. After the operation, `a` is incremented to 11, but `b` remains 10. Thus, the final output is 21.✋✋





// Q3 -------------------------------------------------------------------------------------------------------

let num = 1;

const sum = ++num + num++;

console.log(sum); // Output: 4



//✋✋ Explaination : here `++num` increments `num` first, changing its value from 1 to 2, and then returns the new value (2). The `num++` operation returns the current value of `num` (which is now 2) before incrementing it again, so it returns 2 and then increments `num` to 3. Therefore, the expression evaluates as `2 + 2`, resulting in a final sum of 4. This illustrates how both pre-increment and post-increment operators can be used together in an expression, affecting the final result based on their order of execution.
// ✋✋ Note: The pre-increment operator (`++num`) increments `num` before using it in the expression, while the post-increment operator (`num++`) uses the current value of `num` and then increments it afterward. Thus, the final output is 4.✋✋