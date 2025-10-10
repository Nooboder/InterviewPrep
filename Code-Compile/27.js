// 27. Trick Question 6


let arr = [1, 2, 3, 4, 50]

for (var i = 0; i < arr.length; i++) {
    setTimeout(() => {
        console.log(i)
    }, 1000)
}


OUTPUT:
5
5
5
5
5



// Explanation:

// var is function-scoped, not block-scoped.

// The loop runs synchronously, incrementing i from 0 to 5 (arr.length is 5).

// setTimeout is asynchronous, so by the time the callbacks execute (~1 second later), the loop has already finished, and i = 5.

// Since var does not create a new binding per iteration, all setTimeout callbacks share the same i, which is 5 when they run.




// let arr = [1, 2, 3, 4, 50]

// for (let i = 0; i < arr.length; i++) {
//     setTimeout(() => {
//         console.log(i)
//     }, 1000)
// }


// OUTPUT:
// 0
// 1
// 2
// 3
// 4


// Explanation:

// let is block-scoped, meaning a new i is created for each iteration.

// Each setTimeout callback "remembers" its own i due to block scoping.

// Even though the loop runs quickly, each setTimeout gets its own separate copy of i (0, 1, 2, 3, 4).


// Why Does let Work Differently?
// var:

// Hoisted to the function scope.

// Only one i exists, shared across all iterations.

// By the time setTimeout runs, i is already 5.

// let:

// Creates a new i for each iteration (block scope).

// Each setTimeout captures its own i (0, 1, 2, 3, 4).


// How to Fix var to Work Like let?
// If you must use var, you can capture i in a closure using an IIFE (Immediately Invoked Function Expression):






// let arr = [1, 2, 3, 4, 50];

// for (var i = 0; i < arr.length; i++) {
//     (function (currentI) { // `currentI` captures the value of `i` per iteration
//         setTimeout(() => {
//             console.log(currentI); // 0, 1, 2, 3, 4
//         }, 1000);
//     })(i); // Pass `i` to the IIFE
// }








// The IIFE creates a new scope per iteration.

// currentI stores the value of i at each step (0, 1, 2, 3, 4).

// When setTimeout runs, it logs the correct currentI.







// const ar = ["mango", "banana", "strawberry", "apple", "orange"];



// const res = ar.sort(() => Math.random() - 0.5);

// console.log(res);


