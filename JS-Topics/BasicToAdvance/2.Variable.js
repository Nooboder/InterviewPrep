// let var and const 

// | Feature    | var                               | let                      | const                    |
// | ---------- | --------------------------------- | ------------------------ | ------------------------ |
// | Scope      | function-scoped                   | block-scoped             | block-scoped             |
// | Re-declare | ✔️ allowed                        | ❌ not allowed            | ❌ not allowed            |
// | Re-assign  | ✔️ allowed                        | ✔️ allowed               | ❌ not allowed            |
// | Hoisting   | ✔️ yes (initialized as undefined) | ✔️ yes (not initialized) | ✔️ yes (not initialized) |











// 3. What is hoisting?

// Answer:
// Hoisting means variables are moved to the top of their scope during compilation.

// Example:

// console.log(a); // undefined
// var a = 10;


// But:

// console.log(b); // ReferenceError
// let b = 20;

// 4. Why let and const are in the “Temporal Dead Zone”?

// Answer:
// Because they are hoisted but not initialized.
// They cannot be accessed until the actual line of declaration.

// 5. What is the Temporal Dead Zone (TDZ)?

// Answer:
// The time between hoisting and initialization of let or const variables.

// console.log(x); // TDZ → ReferenceError
// let x = 5;

// 6. Can const variables be changed?

// Answer:
// Primitive values: ❌ cannot change

// const x = 10;
// x = 20; // error


// Objects and arrays: ✔️ can change internal values

// const user = { name: "John" };
// user.name = "Doe"; // allowed

// 7. What is the scope of var?

// Answer:
// var is function-scoped, not block-scoped.

// if (true) {
//   var x = 10;
// }
// console.log(x); // 10

// 8. What is block scope?

// Answer:
// Variables declared inside { }.

// let and const follow block scope.

// {
//   let a = 10;
// }
// console.log(a); // error

// 9. What is global scope?

// Answer:
// Variables accessible everywhere.

// var x = 10; // global

// 10. What happens when we declare a variable without var/let/const?

// Answer:
// It becomes a global variable automatically (BAD practice).

// x = 10; // global variable

// 11. What is variable shadowing?

// Answer:
// When an inner variable (let/const) hides an outer variable with same name.

// let a = 10;
// {
//   let a = 20; // shadows outer a
// }

// 12. What is illegal shadowing?

// Answer:
// var cannot shadow let.

// let a = 10;
// {
//   var a = 20; // ❌ Illegal shadowing
// }

// 13. Can we redeclare variables?

// var: ✔️ yes

// let: ❌ no

// const: ❌ no

// 14. Can we reassign variables?

// var: ✔️ yes

// let: ✔️ yes

// const: ❌ no

// 15. What is the default value of variables?

// var: undefined
// let/const: no default (TDZ)

// 16. Why is using var considered bad?

// Because:

// It leaks out of blocks

// It supports redeclaration (causes bugs)

// It hoists differently

// 17. What is the difference between undefined and not defined?
// Error	Meaning
// undefined	Variable is declared but no value assigned
// not defined	Variable is not declared at all

// Example:

// let a;
// console.log(a); // undefined
// console.log(b); // ReferenceError: b is not defined

// 18. Does const make objects immutable?

// No. Only the reference is constant.
// Object contents can change.

// 19. What is an IIFE? (Variable related)

// Immediately Invoked Function Expression

// Used to avoid global variable pollution.

// (function() {
//   let a = 10;
// })();

// 20. What are local variables?

// Variables declared inside a function, accessible only inside.

// 21. What are global variables?

// Variables accessible everywhere (bad for security and memory leaks).

// 22. What is variable leakage?

// When variables accidentally become global.

// function test(){
//   a = 5; // leaks to global
// }

// 23. Why should we avoid using global variables?

// Security risks

// Hard to debug

// Naming conflicts

// Memory leaks

// 24. Difference between let and const in loops?

// const cannot be updated per iteration unless it's a block object.

// 25. Can we use const in a for loop?

// Yes, for constant object per iteration.

// for (const x of [1,2,3]) {
//   console.log(x);
// }












// ⚡ 20 Tricky JavaScript Variables MCQs (With Answers)


// Q1. What will be the output?
// console.log(a);
// var a = 10;


// A) 10
// B) undefined
// C) ReferenceError
// D) TypeError

// Q2. What will be the output?
// console.log(a);
// let a = 10;


// A) 10
// B) undefined
// C) ReferenceError
// D) TypeError

// Q3.
// var a = 10;
// {
//   let a = 20;
//   console.log(a);
// }
// console.log(a);


// A) 20 20
// B) 10 20
// C) 20 10
// D) ReferenceError

// Q4.
// let x = 1;
// let x = 2;
// console.log(x);


// A) 2
// B) 1
// C) undefined
// D) SyntaxError

// Q5.
// const obj = { a: 1 };
// obj.a = 2;
// console.log(obj.a);


// A) 1
// B) 2
// C) TypeError
// D) undefined

// Q6.
// console.log(a);
// {
//   var a = 100;
// }


// A) 100
// B) undefined
// C) ReferenceError
// D) TypeError

// Q7.
// console.log(a);
// {
//   let a = 100;
// }


// A) 100
// B) undefined
// C) ReferenceError
// D) TypeError

// Q8.
// function test() {
//   x = 10;
// }
// test();
// console.log(x);


// A) 10
// B) undefined
// C) ReferenceError
// D) TypeError

// Q9.
// for (var i = 0; i < 3; i++) {}
// console.log(i);


// A) 0
// B) 2
// C) 3
// D) ReferenceError

// Q10.
// for (let i = 0; i < 3; i++) {}
// console.log(i);


// A) 3
// B) 0
// C) ReferenceError
// D) undefined

// Q11.
// console.log(typeof x);
// var x = 5;


// A) number
// B) undefined
// C) object
// D) string

// Q12.
// console.log(typeof y);
// let y = 5;


// A) number
// B) undefined
// C) ReferenceError
// D) string

// Q13.
// let a = 10;
// {
//   var a = 20;
// }
// console.log(a);


// A) 10
// B) 20
// C) ReferenceError
// D) SyntaxError

// Q14.
// if (true) {
//   var x = 10;
// }
// console.log(x);


// A) 10
// B) undefined
// C) ReferenceError
// D) TypeError

// Q15.
// if (true) {
//   let x = 10;
// }
// console.log(x);


// A) 10
// B) undefined
// C) ReferenceError
// D) TypeError

// Q16.
// console.log(a);
// var a;
// a = 50;


// A) 50
// B) undefined
// C) ReferenceError
// D) TypeError

// Q17.
// const x;
// x = 10;
// console.log(x);


// A) 10
// B) undefined
// C) ReferenceError
// D) SyntaxError

// Q18.
// let x = 10;
// {
//   console.log(x);
//   let x = 20;
// }


// A) 10
// B) 20
// C) undefined
// D) ReferenceError

// Q19.
// var a = 5;
// var a = 10;
// console.log(a);


// A) 5
// B) 10
// C) undefined
// D) SyntaxError

// Q20.
// let a = 5;
// a = a + 10;
// console.log(a);


// A) 5
// B) 10
// C) 15
// D) NaN






// ✅ Answers + Explanations


// | Q  | Answer | Explanation                                    |
// | -- | ------ | ---------------------------------------------- |
// | 1  | **B**  | `var` hoisted → undefined                      |
// | 2  | **C**  | `let` hoisted but in TDZ → ReferenceError      |
// | 3  | **C**  | `let` block-scoped → prints 20 then 10         |
// | 4  | **D**  | `let` cannot redeclare                         |
// | 5  | **B**  | `const` object properties can change           |
// | 6  | **B**  | `var` hoisted → undefined                      |
// | 7  | **C**  | `let` in TDZ                                   |
// | 8  | **A**  | No declaration → becomes global variable       |
// | 9  | **C**  | `var` is function-scoped → i becomes 3         |
// | 10 | **C**  | `let` block-scoped → i not defined outside     |
// | 11 | **B**  | `var` hoisted → undefined                      |
// | 12 | **C**  | `let` in TDZ → ReferenceError                  |
// | 13 | **D**  | Illegal shadowing → var cannot shadow let      |
// | 14 | **A**  | var is not block scoped                        |
// | 15 | **C**  | let is block scoped                            |
// | 16 | **B**  | var hoisted → undefined                        |
// | 17 | **D**  | const must be initialized                      |
// | 18 | **D**  | Accessing `x` before its let declaration (TDZ) |
// | 19 | **B**  | var redeclaration allowed                      |
// | 20 | **C**  | 5 + 10 = 15                                    |
