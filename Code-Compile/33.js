// 33. let , var , const  with example and difference between them

// var is function scoped, while let and const are block scoped.

// var can be redeclared and updated, let can be updated but not redeclared, and const cannot be updated or redeclared.
// Example:
function example() {
    if (true) {
        var x = 10;
        let y = 20;
        const z = 30;
        console.log(x);
        console.log(y);
        console.log(z);
    }
    console.log(x); // 10
    // console.log(y); // ReferenceError: y is not defined
    // console.log(z); // ReferenceError: z is not defined
}
example();

// var a = 1;
// var a = 2; // Redeclaration allowed
// a = 3; // Update allowed
// console.log(a); // 3
// let b = 1;
// // let b = 2; // SyntaxError: Identifier 'b' has already been declared
// b = 3; // Update allowed

// console.log(b); // 3
// const c = 1;
// // const c = 2; // SyntaxError: Identifier 'c' has already been declared
// // c = 3; // TypeError: Assignment to constant variable.
// console.log(c); // 1


