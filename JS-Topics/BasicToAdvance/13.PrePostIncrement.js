// 🔢 Pre-Increment vs Post-Increment in JavaScript

// In JavaScript, the increment operator ++ increases a number by 1, but when the value is increased depends on where the operator is placed.

// 1️⃣ Pre-Increment (++x)

// 👉 First increment, then use the value

// let x = 5;
// let y = ++x;

// console.log(x); // 6
// console.log(y); // 6

// 🔍 What happened?

// x becomes 6

// That updated value (6) is assigned to y

// 📌 Rule

// Pre-increment increments the variable before returning its value.

// 2️⃣ Post-Increment (x++)

// 👉 First use the value, then increment

// let x = 5;
// let y = x++;

// console.log(x); // 6
// console.log(y); // 5

// 🔍 What happened?

// x’s current value (5) is assigned to y

// Then x becomes 6

// 📌 Rule

// Post-increment returns the value before incrementing.

// | Expression | Initial `x` | Assigned Value | Final `x` |
// | ---------- | ----------- | -------------- | --------- |
// | `y = ++x`  | 5           | 6              | 6         |
// | `y = x++`  | 5           | 5              | 6         |

// 4️⃣ Inside Expressions (Important for Interviews 🔥)
// let x = 10;

// console.log(++x + 5); // 16
// // x becomes 11 → 11 + 5

// x = 10;
// console.log(x++ + 5); // 15
// // 10 + 5 → x becomes 11 after

// 5️⃣ Multiple Increments (Tricky ⚠️)
// let x = 5;

// console.log(x++ + ++x);

// Step-by-step:

// x++ → returns 5, then x = 6

// ++x → x = 7, returns 7

// ✅ Output:

// 12

// 6️⃣ Common Pitfall ❌
// let x = 5;
// x = x++;
// console.log(x); // 5 😱

// Why?

// x++ returns 5

// Then increments x to 6

// Assignment x = 5 overwrites it

// 7️⃣ Best Practice (Industry Standard ✅)

// ✔ Avoid using ++ inside complex expressions
// ✔ Prefer clarity:

// x += 1; // cleaner, predictable

// 🧠 Interview One-Liner

// Pre-increment updates the value first, post-increment updates it after returning the current value.

// 🔥 Pre & Post Increment — Interview MCQs (Beginner → Advanced)
// (Very common in JS + React interviews)

// 🟢 Level 1: Basics
// 1️⃣
// let x = 5;
// console.log(++x);

// A) 5
// B) 6 ✅
// C) Error
// D) undefined

// 📌 Pre-increment → increment first, then use

// 2️⃣
// let x = 5;
// console.log(x++);

// A) 6
// B) 5 ✅
// C) undefined
// D) Error

// 📌 Post-increment → use first, then increment

// 3️⃣
// let x = 5;
// let y = x++;
// console.log(y);

// A) 6
// B) 5 ✅
// C) undefined
// D) Error

// 🟡 Level 2: Expression Based
// 4️⃣
// let x = 10;
// console.log(++x + 5);

// A) 15
// B) 16 ✅
// C) 17
// D) Error

// 5️⃣
// let x = 10;
// console.log(x++ + 5);

// A) 15 ✅
// B) 16
// C) 17
// D) Error

// 6️⃣
// let x = 5;
// console.log(x++ + ++x);

// A) 10
// B) 11
// C) 12 ✅
// D) 13

// 🧠 Execution:

// x++ → 5 (x = 6)

// ++x → 7

// 5 + 7 = 12

// 🟠 Level 3: Assignment Traps ⚠️
// 7️⃣
// let x = 5;
// x = x++;
// console.log(x);

// A) 6
// B) 5 ✅
// C) undefined
// D) Error

// 📌 Returned value overwrites the increment

// 8️⃣
// let x = 5;
// let y = ++x + x++;
// console.log(y);

// A) 11
// B) 12
// C) 13 ✅
// D) 14

// 🧠 Steps:

// ++x → 6

// x++ → 6 (x = 7)

// 6 + 6 = 12 ❌
// Wait—IMPORTANT 👇
// Final result:

// 6 + 7 = 13 ✅

// 🔴 Level 4: Function & Scope
// 9️⃣
// function test(x) {
//   return x++ + ++x;
// }
// console.log(test(5));

// A) 11
// B) 12
// C) 13
// D) 12 ✅

// 🧠 Steps:

// x++ → 5 (x = 6)

// ++x → 7

// 5 + 7 = 12

// 🔟
// let x = 1;
// console.log(x++ + x++ + ++x);

// A) 4
// B) 5
// C) 6
// D) 7 ✅

// 🧠 Steps:

// x++ → 1 (x=2)

// x++ → 2 (x=3)

// ++x → 4
// → 1 + 2 + 4 = 7

// 🔥 Level 5: Boolean + Increment
// 1️⃣1️⃣
// let x = 0;
// if (x++) {
//   console.log("A");
// } else {
//   console.log("B");
// }

// Output:
// ✅ B

// 📌 x++ returns 0 → falsy

// 1️⃣2️⃣
// let x = 1;
// if (++x === 2) {
//   console.log("YES");
// }

// Output:
// ✅ YES

// ⚛️ React / Production MCQ (Very Important)
// 1️⃣3️⃣
// const [count, setCount] = useState(0);
// setCount(count++);

// ❓ What happens?

// A) count increments
// B) Infinite loop
// C) State doesn't update correctly ✅
// D) Error

// 📌 Correct Answer: ❌ BAD PRACTICE

// setCount(prev => prev + 1); // ✅ Correct

// 🔥 30+ Ultra-Tricky JavaScript Increment MCQs
// (These break even experienced devs — very common in product-based interviews)

// 🟢 SECTION-A: Output Prediction (Warm-up)
// 1️⃣
// let x = 3;
// console.log(x++ + x++ + ++x);

// Answer: ✅ 11
// (3 + 4 + 4)

// 2️⃣
// let x = 5;
// console.log(++x + x++ + ++x);

// Answer: ✅ 19
// (6 + 6 + 7)

// 3️⃣
// let x = 1;
// x = x++ + ++x;
// console.log(x);

// Answer: ✅ 4

// 4️⃣
// let x = 0;
// console.log(x++ && ++x);

// Answer: ✅ 0
// (short-circuit AND)

// 5️⃣
// let x = 0;
// console.log(++x || x++);

// Answer: ✅ 1
// (short-circuit OR)

// 🟡 SECTION-B: Assignment Traps ⚠️
// 6️⃣
// let x = 10;
// x += x++;
// console.log(x);

// Answer: ✅ 20

// 7️⃣
// let x = 10;
// x = x++ + x;
// console.log(x);

// Answer: ✅ 21

// 8️⃣
// let x = 5;
// let y = x++ + ++x + x;
// console.log(y);

// Answer: ✅ 18

// 9️⃣
// let x = 5;
// x = ++x + x++;
// console.log(x);

// Answer: ✅ 12

// 🔟
// let x = 2;
// x *= x++ + ++x;
// console.log(x);

// Answer: ✅ 10

// 🟠 SECTION-C: Logical + Increment (VERY TRICKY)
// 1️⃣1️⃣
// let x = 1;
// console.log(x++ && x++ && ++x);

// Answer: ✅ 3

// 1️⃣2️⃣
// let x = 0;
// console.log(++x && x++ && ++x);

// Answer: ✅ 0

// 1️⃣3️⃣
// let x = 5;
// console.log(x++ > 5 || ++x > 6);

// Answer: ✅ true

// 1️⃣4️⃣
// let x = 5;
// console.log(++x < 6 && x++ > 6);

// Answer: ✅ false

// 🔴 SECTION-D: Function & Scope Mind-Benders
// 1️⃣5️⃣
// function calc(x) {
//   return x++ + x++ + ++x;
// }
// console.log(calc(1));

// Answer: ✅ 6

// 1️⃣6️⃣
// function test(x) {
//   return ++x + x++ + x;
// }
// console.log(test(2));

// Answer: ✅ 9

// 1️⃣7️⃣
// let x = 5;
// function foo() {
//   return x++ + ++x;
// }
// console.log(foo());

// Answer: ✅ 12

// 🔥 SECTION-E: Loops & Control Flow
// 1️⃣8️⃣
// let i = 0;
// while (i++ < 3) {
//   console.log(i);
// }

// Output:

// 1
// 2
// 3

// 1️⃣9️⃣
// for (let i = 0; i++ < 3;) {
//   console.log(i);
// }

// Output:

// 1
// 2
// 3

// 2️⃣0️⃣
// let i = 5;
// do {
//   console.log(i);
// } while (i--);

// Output:

// 5 4 3 2 1 0

// ⚛️ SECTION-F: React / Redux Interview Traps
// 2️⃣1️⃣
// setCount(count++);

// Result: ❌ Buggy state update

// 2️⃣2️⃣
// dispatch(setValue(value++));

// Result: ❌ Wrong Redux state

// 2️⃣3️⃣
// useEffect(() => {
//   setCount(count++);
// }, []);

// Result: ❌ Stale closure bug

// 🧠 SECTION-G: WTF JavaScript 🤯
// 2️⃣4️⃣
// let x = "5";
// console.log(x++ + ++x);

// Answer: ✅ 12
// (string → number coercion)

// 2️⃣5️⃣
// let x = true;
// console.log(x++ + ++x);

// Answer: ✅ 4

// 2️⃣6️⃣
// let x = null;
// console.log(x++ + ++x);

// Answer: ✅ 1

// 2️⃣7️⃣
// let x = undefined;
// console.log(x++ + ++x);

// Answer: ❌ NaN

// 🏁 SECTION-H: Final Boss 💀
// 2️⃣8️⃣
// let x = 1;
// console.log(x++ + ++x + x++ + ++x);

// Answer: ✅ 11

// 2️⃣9️⃣
// let x = 3;
// x = x++ + ++x + x++;
// console.log(x);

// Answer: ✅ 11

// 3️⃣0️⃣
// let x = 0;
// console.log(x++ || ++x && x++);

// Answer: ✅ 1

// 3️⃣1️⃣ BONUS
// let x = 1;
// x = x++ + x++ + ++x + x;
// console.log(x);

// Answer: ✅ 9

// 🏆 Interview Takeaways (MEMORIZE)

// 🚫 Never mix ++ in expressions
// 🚫 Never use ++ in React/Redux state
// ✅ Use x += 1
// ✅ Use functional updates in React
