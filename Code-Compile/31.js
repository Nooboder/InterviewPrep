// 31. Trick Question 


(function () {
    let a = b = 5;
})();

console.log(typeof a); // undefined
console.log(typeof b); // number
console.log(b); // 5
// Here, 'a' is not defined in the global scope, while 'b' is implicitly defined as a global variable.
// This is because the assignment 'b = 5' is treated as a global assignment, while 'let a' confines 'a' to the function scope.
// Hence, 'a' is undefined outside the function, while 'b' is accessible globally.